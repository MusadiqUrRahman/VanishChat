import { useEffect, useState, useCallback, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import RulesModal from './RulesModal'
import RoomFullModal from './RoomFullModal'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import Spinner from './Spinner'
import { useRealtimeMessages } from '../hooks/useRealtimeMessages'
import { usePresence } from '../hooks/usePresence'
import { useSessionExpiry } from '../hooks/useSessionExpiry'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const EXPIRY_MS = 5 * 60 * 1000

export default function ChatPage() {
  const { id, secret } = useParams()
  const [status, setStatus] = useState('loading')
  const [rulesAccepted, setRulesAccepted] = useState(false)
  const [initialLastActivity, setInitialLastActivity] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [otherUserOnline, setOtherUserOnline] = useState(false)
  const [sessionSeconds, setSessionSeconds] = useState(null)
  const [messageCount, setMessageCount] = useState(0)
  const inputRef = useRef(null)

  const activeChatId = status === 'valid' ? id : null

  const { messages, sendMessage, ready } = useRealtimeMessages(activeChatId)
  const { sender, blocked } = usePresence(activeChatId, setConnectionStatus, setOtherUserOnline)
  const { expired, bumpActivity } = useSessionExpiry(
    activeChatId,
    initialLastActivity,
    status === 'valid' && !blocked
  )

  useDocumentTitle(status === 'valid' ? `VanishChat - ${id}` : null, messageCount)

  useEffect(() => {
    if (expired && status === 'valid') setStatus('expired')
  }, [expired, status])

  useEffect(() => {
    if (rulesAccepted && inputRef.current) inputRef.current.focus()
  }, [rulesAccepted])

  const prevCountRef = useRef(0)
  useEffect(() => {
    if (document.hidden && messages?.length > prevCountRef.current) {
      const diff = messages.length - prevCountRef.current
      setMessageCount((c) => c + diff)
    }
    prevCountRef.current = messages?.length || 0
  }, [messages])

  useEffect(() => {
    if (status !== 'valid' || !initialLastActivity || blocked) {
      setSessionSeconds(null)
      return
    }
    const calc = () => {
      const last = new Date(initialLastActivity).getTime()
      const elapsed = Date.now() - last
      const remaining = Math.max(0, Math.floor((EXPIRY_MS - elapsed) / 1000))
      setSessionSeconds(remaining)
    }
    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [status, initialLastActivity, blocked])

  useEffect(() => setMessageCount(messages?.length || 0), [messages])

  useEffect(() => {
    let cancelled = false
    async function validate() {
      try {
        const { data, error } = await supabase
          .from('chats')
          .select('id, secret, active, last_activity')
          .eq('id', id)
          .maybeSingle()
        if (cancelled) return
        if (error) { setStatus('invalid'); return }
        if (!data) { setStatus('invalid'); return }
        if (data.secret !== secret) { setStatus('denied'); return }
        if (!data.active) { setStatus('expired'); return }
        try {
          setRulesAccepted(localStorage.getItem('vanishchat_rules_accepted_' + id) === 'true')
        } catch { setRulesAccepted(false) }
        setInitialLastActivity(data.last_activity || new Date().toISOString())
        setStatus('valid')
      } catch { if (!cancelled) setStatus('invalid') }
    }
    validate()
    return () => { cancelled = true }
  }, [id, secret])

  const handleSend = useCallback(async (content) => {
    await sendMessage(content, sender)
    setInitialLastActivity(new Date().toISOString())
    await bumpActivity()
  }, [sendMessage, sender, bumpActivity])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="absolute inset-0 bg-grid" />
        <div className="text-center motion-safe:animate-fade-in">
          <div className="w-16 h-16 rounded-3xl border flex items-center justify-center mx-auto mb-5"
            style={{ borderColor: 'var(--color-border)', background: 'var(--accent-subtle)' }}>
            <Spinner size="lg" className="text-[var(--accent)]" />
          </div>
          <p className="text-sm font-light" style={{ color: 'var(--color-text-tertiary)' }}>Loading chat...</p>
        </div>
      </div>
    )
  }

  if (status === 'invalid') {
    return <ErrorState title="Invalid chat link" description="We could not find a chat with that link. Check the URL or ask for a new link." />
  }

  if (status === 'denied') {
    return <ErrorState title="Access denied" description="The secret code in this link is incorrect." />
  }

  if (status === 'expired') {
    return <ErrorState title="Link expired" description="This chat has been cleared. All messages were permanently deleted." ctaLabel="Go home" />
  }

  if (blocked) {
    return (
      <div className="min-h-screen bg-surface">
        <RoomFullModal />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-surface">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[var(--accent-glow-bg)] via-[var(--accent-subtle)] to-transparent" />
        <div className="absolute inset-0 bg-grid" />
      </div>

      <ChatHeader
        id={id}
        connectionStatus={connectionStatus}
        otherUserOnline={otherUserOnline}
        sessionSeconds={sessionSeconds}
      />

      <main className="flex-1 overflow-hidden px-4 py-3 sm:px-6 sm:py-4 relative">
        <div className="mx-auto max-w-2xl h-full">
          <MessageList messages={messages} currentSender={sender} />
        </div>
      </main>

      <footer className="border-t px-4 py-3 sm:px-6 sm:py-4 safe-bottom relative"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
        <MessageInput ref={inputRef} onSend={handleSend} disabled={!ready || !sender} />
      </footer>

      {!rulesAccepted && (
        <RulesModal chatId={id} onAccept={() => setRulesAccepted(true)} />
      )}
    </div>
  )
}

function ErrorState({ title, description, ctaLabel = 'Back to home' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 sm:px-6">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent pointer-events-none" />

      <div className="w-full max-w-md motion-safe:animate-premium-scale">
        <div className="card-elevated p-8 sm:p-10 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--danger-subtle)' }}>
            <svg className="w-8 h-8 text-[var(--danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>{title}</h1>
          <p className="text-sm mb-8 font-light" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
          <Link
            to="/"
            className="btn-primary w-full"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
