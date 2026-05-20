import { useEffect, useRef } from 'react'

export default function RulesModal({ chatId, onAccept }) {
  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current?.focus()
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') return
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleAccept() {
    try {
      localStorage.setItem('vanishchat_rules_accepted_' + chatId, 'true')
    } catch {
      // ignore storage failures
    }
    onAccept()
  }

  const rules = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      title: 'Two people only',
      desc: 'Only 2 people can chat at a time.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '1-minute retention',
      desc: 'Messages are visible for 60 seconds, then gone.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      ),
      title: '5-minute expiry',
      desc: 'No messages for 5 minutes? The entire chat is wiped.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      title: 'No history stored',
      desc: 'Nothing is saved. Nothing is recoverable.',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 motion-safe:animate-fade-in" style={{ background: 'var(--color-overlay)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute inset-0 bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent pointer-events-none" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rules-modal-title"
        className="w-full max-w-lg rounded-3xl border shadow-premium-xl motion-safe:animate-premium-scale"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))' }}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 id="rules-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Before you start
            </h2>
          </div>

          <p className="text-sm mb-6 font-light" style={{ color: 'var(--color-text-secondary)' }}>
            VanishChat is designed for ephemeral conversations. Please review how it works:
          </p>

          <div className="space-y-3 mb-8">
            {rules.map((rule, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl border motion-safe:animate-fade-in"
                style={{ animationDelay: `${i * 60}ms`, borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-muted)' }}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                  {rule.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{rule.title}</p>
                  <p className="text-xs mt-0.5 font-light" style={{ color: 'var(--color-text-tertiary)' }}>{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            ref={buttonRef}
            type="button"
            onClick={handleAccept}
            className="btn-primary w-full"
          >
            I understand, let&apos;s chat
          </button>
        </div>
      </div>
    </div>
  )
}
