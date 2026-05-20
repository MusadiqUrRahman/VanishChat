import { useCallback, useEffect, useRef, useState } from 'react'
import EmptyState from './EmptyState'

const MESSAGE_TTL_MS = 60 * 1000

function MessageBubble({ message, isMine, onExpire }) {
  const created = new Date(message.created_at).getTime()
  const age = Date.now() - created
  const remaining = Math.max(0, MESSAGE_TTL_MS - age)
  const progress = remaining / MESSAGE_TTL_MS
  const isExpiring = remaining < 15000
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (remaining <= 0) {
      setIsVisible(false)
      setTimeout(() => onExpire?.(message.id), 200)
    }
  }, [remaining, message.id, onExpire])

  const timeAgo = (age) => {
    const seconds = Math.floor(age / 1000)
    if (seconds < 5) return 'just now'
    if (seconds < 60) return `${seconds}s ago`
    return `${Math.floor(seconds / 60)}m ago`
  }

  if (!isVisible) return null

  return (
    <div className={`flex motion-safe:animate-message-in ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] sm:max-w-sm group ${isMine ? 'ml-12' : 'mr-12'}`}>
        <div
          className={`relative rounded-2xl px-4 py-2.5 text-sm sm:text-[15px] whitespace-pre-wrap break-words transition-all duration-150 ${
            isMine ? 'text-white shadow-sm rounded-br-sm' : 'backdrop-blur-xl border shadow-premium rounded-bl-sm'
          }`}
          style={
            isMine
              ? { background: 'linear-gradient(to bottom, var(--accent), var(--accent-hover))' }
              : { borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)', color: 'var(--color-text-primary)' }
          }
        >
          {message.content}
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden ${
              isMine ? 'bg-white/[0.1]' : 'bg-[var(--color-border-subtle)]'
            }`}
          >
            <div
              className={`h-full transition-all duration-1000 ease-linear ${
                isExpiring ? 'bg-[var(--danger)]' : isMine ? 'bg-white/30' : 'bg-[var(--accent)]/30'
              }`}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
        <div
          className={`mt-1 px-1 text-[11px] flex items-center gap-1 ${
            isMine ? 'justify-end' : 'justify-start'
          } ${isExpiring ? 'text-[var(--danger)]' : 'text-[var(--color-text-tertiary)]'}`}
        >
          <span>{timeAgo(age)}</span>
          {isExpiring && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {isMine && (
            <svg className="w-3 h-3 text-white/40" viewBox="0 0 16 11" fill="currentColor">
              <path d="M11.071.653a.457.457 0 00-.304-.102.493.493 0 00-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 00-.33-.153.457.457 0 00-.343.14.52.52 0 00-.127.362c0 .136.045.257.134.368l2.345 2.444c.09.096.198.164.325.204.127.04.254.032.38-.024a.533.533 0 00.29-.242l6.532-8.06a.528.528 0 00.114-.33.5.5 0 00-.134-.326z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MessageList({ messages, currentSender }) {
  const endRef = useRef(null)
  const containerRef = useRef(null)
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 200)
    }
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!showScrollBtn) {
      scrollToBottom()
    }
  }, [messages, showScrollBtn, scrollToBottom])

  const handleExpire = useCallback(() => {}, [])

  if (!messages || messages.length === 0) {
    return <EmptyState type="chat" />
  }

  return (
    <div className="relative h-full">
      <div ref={containerRef} className="h-full overflow-y-auto px-1 pb-2 scrollbar-none">
        <div className="flex flex-col gap-3 py-2">
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              isMine={m.sender === currentSender}
              onExpire={handleExpire}
            />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      {showScrollBtn && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 min-h-[44px] min-w-[44px] rounded-full border shadow-premium-lg flex items-center justify-center transition-all duration-150 motion-safe:animate-fade-in"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-tertiary)',
          }}
          aria-label="Scroll to bottom"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </div>
  )
}
