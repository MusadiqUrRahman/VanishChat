import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { generateChatId } from '../lib/idGenerator'
import Particles from './Particles'
import { useInView } from '../hooks/useInView'

const CHAT_MOCKUPS = [
  { text: 'Hey, is this secure?', sender: 'other', time: '0:12' },
  { text: '100%. Messages vanish after 60s.', sender: 'mine', time: '0:14' },
  { text: 'No trace at all?', sender: 'other', time: '0:17' },
  { text: 'Not a single byte. That\'s the whole point.', sender: 'mine', time: '0:19' },
  { text: 'Even the server logs?', sender: 'other', time: '0:21' },
  { text: 'Especially the server logs. 🔥', sender: 'mine', time: '0:23' },
]

const TYPING_TEXTS = [
  'leave no trace',
  'self-destruct',
  'stay private',
  'vanish forever',
]

export default function HeroSection() {
  const navigate = useNavigate()
  const [generating, setGenerating] = useState(false)
  const [generateError, setGenerateError] = useState('')
  const [showJoin, setShowJoin] = useState(false)
  const [joinId, setJoinId] = useState('')
  const [joinSecret, setJoinSecret] = useState('')
  const [joining, setJoining] = useState(false)
  const [joinError, setJoinError] = useState('')
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [visibleIndex, setVisibleIndex] = useState(0)
  const [typingText, setTypingText] = useState('')
  const [typingIndex, setTypingIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const joinIdRef = useRef(null)
  const [heroRef, heroInView] = useInView({ threshold: 0.1 })
  const [mockupRef, mockupInView] = useInView({ threshold: 0.2 })
  const parallaxRef = useRef(null)

  useEffect(() => {
    if (showJoin && joinIdRef.current) {
      joinIdRef.current.focus()
    }
  }, [showJoin])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => {
        if (prev >= CHAT_MOCKUPS.length - 1) return 0
        return prev + 1
      })
      setVisibleMessages((prev) => Math.min(prev + 1, CHAT_MOCKUPS.length))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const currentText = TYPING_TEXTS[typingIndex]
    let timeout

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setTypingText(currentText.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setTypingText(currentText.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 40)
      } else {
        setIsDeleting(false)
        setTypingIndex((prev) => (prev + 1) % TYPING_TEXTS.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, typingIndex])

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  async function handleGenerate() {
    setGenerateError('')
    setGenerating(true)
    try {
      const { id, secret } = await generateChatId()
      const { error } = await supabase.from('chats').insert({ id, secret })
      if (error) throw error
      navigate(`/chat/${id}/${secret}`)
    } catch (err) {
      setGenerateError(err?.message || 'Failed to create chat. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  async function handleJoin(e) {
    e.preventDefault()
    setJoinError('')
    const id = joinId.trim().toUpperCase()
    const secret = joinSecret.trim().toUpperCase()
    if (id.length !== 6 || secret.length !== 6) {
      setJoinError('Chat ID and secret must each be 6 characters.')
      return
    }
    setJoining(true)
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('id, secret, active')
        .eq('id', id)
        .maybeSingle()
      if (error) throw error
      if (!data || data.secret !== secret) {
        setJoinError('Invalid chat ID or secret.')
        return
      }
      if (!data.active) {
        setJoinError('This chat has expired.')
        return
      }
      navigate(`/chat/${id}/${secret}`)
    } catch (err) {
      setJoinError(err?.message || 'Could not join chat. Please try again.')
    } finally {
      setJoining(false)
    }
  }

  const parallaxStyle = {
    '--mouse-x': mousePos.x,
    '--mouse-y': mousePos.y,
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      style={parallaxStyle}
    >
      <Particles density={35} />

      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] bg-gradient-radial from-[var(--accent-glow-bg)] via-[var(--accent-subtle)] to-transparent motion-safe:animate-glow-pulse"
        style={{ opacity: heroInView ? 1 : 0, transition: 'opacity 1s ease' }}
      />

      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full bg-[var(--accent-glow-bg)] blur-[160px] motion-safe:animate-drift" />
        <div className="absolute bottom-[15%] right-[15%] w-[500px] h-[500px] rounded-full bg-[var(--blue-subtle)] blur-[140px] motion-safe:animate-drift-reverse" />
        <div
          className="absolute top-[40%] right-[25%] w-[300px] h-[300px] rounded-full bg-[var(--accent-subtle)] blur-[100px] motion-safe:animate-float"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/15 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <div
              className="motion-safe:animate-fade-up"
              style={{ animationDelay: '0ms' }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--accent)] text-[11px] font-semibold px-4 py-1.5 mb-8 tracking-widest uppercase motion-safe:animate-fade-in">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75 motion-safe:animate-pulse-ring" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </span>
                Private by design
              </span>
            </div>

            <h1 className="text-display-lg sm:text-display-xl lg:text-display-2xl xl:text-display-3xl tracking-tight mb-6 motion-safe:animate-fade-up leading-[0.92] text-balance">
              Chats that
              <br />
              <span className="text-gradient-warm inline-block">
                {typingText}<span className="inline-block w-[3px] h-[0.85em] bg-[var(--accent)] ml-1 align-middle motion-safe:animate-typing-cursor" />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-lg motion-safe:animate-fade-up mb-10 font-light">
              Ephemeral, anonymous, two-person conversations.
              Messages vanish after 60 seconds.
              <span className="text-[var(--color-text-primary)]"> No accounts. No history. Nothing to worry about.</span>
            </p>

            <div className="motion-safe:animate-fade-up max-w-sm">
              <div className="card-elevated p-6 sm:p-8 relative overflow-hidden group" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent rounded-full blur-2xl group-hover:opacity-80 transition-opacity duration-700" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-radial from-[var(--blue-subtle)] to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />

                <div className="relative">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={generating}
                    className="btn-primary w-full min-h-[52px] text-base"
                  >
                    {generating ? (
                      <span className="flex items-center gap-2.5">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Creating your chat...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2.5">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Start a new chat
                      </span>
                    )}
                  </button>

                  {generateError && (
                    <div className="mt-3 rounded-xl border border-[var(--danger-subtle)] bg-[var(--danger-subtle)] text-[var(--danger)] text-sm px-4 py-3 motion-safe:animate-fade-in" role="alert">
                      {generateError}
                    </div>
                  )}

                  <div className="mt-5 relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t" style={{ borderColor: 'var(--color-border)' }} />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3 text-[var(--color-text-tertiary)]" style={{ background: 'var(--color-surface)' }}>or join an existing chat</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => { setShowJoin((v) => !v); setJoinError('') }}
                    className="btn-secondary w-full mt-4"
                  >
                    {showJoin ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.56a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.82 8.82" />
                        </svg>
                        Join with code
                      </>
                    )}
                  </button>

                  {showJoin && (
                    <form onSubmit={handleJoin} className="mt-5 space-y-3 motion-safe:animate-slide-up-sm">
                      <div>
                        <label htmlFor="hero-chat-id" className="block text-[11px] font-medium text-[var(--color-text-tertiary)] mb-1.5 uppercase tracking-wide">
                          Chat ID
                        </label>
                        <input
                          ref={joinIdRef}
                          id="hero-chat-id"
                          type="text"
                          value={joinId}
                          onChange={(e) => setJoinId(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                          maxLength={6}
                          autoComplete="off"
                          spellCheck={false}
                          placeholder="ABC234"
                          className="w-full min-h-[48px] rounded-2xl border px-4 py-3 text-sm transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]/40 font-mono tracking-[0.15em] uppercase text-center text-base"
                          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="hero-chat-secret" className="block text-[11px] font-medium text-[var(--color-text-tertiary)] mb-1.5 uppercase tracking-wide">
                          Secret Code
                        </label>
                        <input
                          id="hero-chat-secret"
                          type="text"
                          value={joinSecret}
                          onChange={(e) => setJoinSecret(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                          maxLength={6}
                          autoComplete="off"
                          spellCheck={false}
                          placeholder="XYZ789"
                          className="w-full min-h-[48px] rounded-2xl border px-4 py-3 text-sm transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]/40 font-mono tracking-[0.15em] uppercase text-center text-base"
                          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}
                        />
                      </div>

                      {joinError && (
                        <div className="rounded-xl border border-[var(--danger-subtle)] bg-[var(--danger-subtle)] text-[var(--danger)] text-sm px-4 py-3 motion-safe:animate-fade-in" role="alert">
                          {joinError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={joining}
                        className="btn-primary w-full"
                      >
                        {joining ? (
                          <span className="flex items-center gap-2.5">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Joining...
                          </span>
                        ) : (
                          'Join chat'
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div ref={mockupRef} className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent rounded-3xl motion-safe:animate-glow-pulse" />
            <div
              className={`relative transition-all duration-1000 ${mockupInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
            >
              <div className="rounded-3xl border shadow-premium-lg overflow-hidden" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80 motion-safe:animate-pulse-soft" style={{ animationDelay: '0ms', animationDuration: '3s' }} />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80 motion-safe:animate-pulse-soft" style={{ animationDelay: '200ms', animationDuration: '3s' }} />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80 motion-safe:animate-pulse-soft" style={{ animationDelay: '400ms', animationDuration: '3s' }} />
                    </div>
                    <span className="text-xs text-[var(--color-text-tertiary)] font-mono">vanishchat.app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">Connected</span>
                  </div>
                </div>

                <div className="p-5 space-y-3 min-h-[360px] flex flex-col justify-end">
                  {CHAT_MOCKUPS.slice(0, visibleMessages).map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'mine' ? 'justify-end' : 'justify-start'} motion-safe:animate-message-in`}
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                          msg.sender === 'mine'
                            ? 'text-white shadow-sm'
                            : 'backdrop-blur-xl border shadow-premium'
                        }`}
                        style={
                          msg.sender === 'mine'
                            ? { background: 'linear-gradient(to bottom, var(--accent), var(--accent-hover))' }
                            : { borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)', color: 'var(--color-text-primary)' }
                        }
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <div className={`flex items-center gap-1.5 mt-1 ${msg.sender === 'mine' ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-[10px] ${msg.sender === 'mine' ? 'text-white/60' : 'text-[var(--color-text-tertiary)]'}`}>{msg.time}</span>
                          {msg.sender === 'mine' && (
                            <svg className="w-3 h-3 text-white/60" viewBox="0 0 16 11" fill="currentColor">
                              <path d="M11.071.653a.457.457 0 00-.304-.102.493.493 0 00-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 00-.33-.153.457.457 0 00-.343.14.52.52 0 00-.127.362c0 .136.045.257.134.368l2.345 2.444c.09.096.198.164.325.204.127.04.254.032.38-.024a.533.533 0 00.29-.242l6.532-8.06a.528.528 0 00.114-.33.5.5 0 00-.134-.326z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 mt-2 text-[var(--color-text-tertiary)] text-xs font-mono">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)] motion-safe:animate-bounce-gentle" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)] motion-safe:animate-bounce-gentle" style={{ animationDelay: '200ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)] motion-safe:animate-bounce-gentle" style={{ animationDelay: '400ms' }} />
                    </div>
                    <span>waiting for message...</span>
                  </div>
                </div>

                <div className="px-5 py-3 border-t flex items-center gap-3" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex-1 h-10 rounded-xl border flex items-center px-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                    <span className="text-sm text-[var(--color-text-tertiary)]">Type a message...</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-glow" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center motion-safe:animate-fade-up">
          <div className="flex flex-col items-center gap-2 text-[var(--color-text-tertiary)] text-[11px] font-medium tracking-widest uppercase">
            <span>Scroll</span>
            <div className="w-5 h-8 rounded-full border flex items-start justify-center p-1 motion-safe:animate-float" style={{ borderColor: 'var(--color-border)' }}>
              <div className="w-1 h-2 rounded-full bg-[var(--color-text-tertiary)]/60 motion-safe:animate-bounce-gentle" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
