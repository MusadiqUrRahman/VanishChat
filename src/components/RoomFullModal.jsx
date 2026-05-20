import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RoomFullModal() {
  const navigate = useNavigate()
  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  function handleGoHome() {
    navigate('/')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 motion-safe:animate-fade-in" style={{ background: 'var(--color-overlay)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute inset-0 bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent pointer-events-none" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-full-modal-title"
        className="w-full max-w-md rounded-3xl border shadow-premium-xl motion-safe:animate-premium-scale"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
      >
        <div className="p-6 sm:p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--warning-subtle)' }}>
            <svg className="w-8 h-8 text-[var(--warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0 0h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 id="room-full-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Chat is full
          </h2>
          <p className="text-sm mb-8 font-light" style={{ color: 'var(--color-text-secondary)' }}>
            Only 2 people can chat at a time. Please wait for one person to leave and try again.
          </p>
          <button
            ref={buttonRef}
            type="button"
            onClick={handleGoHome}
            className="btn-primary w-full"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}
