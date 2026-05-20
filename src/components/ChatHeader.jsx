import { Link } from 'react-router-dom'
import CopyButton from './CopyButton'
import StatusBadge from './StatusBadge'

function SessionTimer({ seconds }) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const isLow = seconds <= 60
  const label = `${minutes}:${secs.toString().padStart(2, '0')}`
  const pct = Math.max(0, (seconds / 300) * 100)

  return (
    <div className="flex flex-col items-end gap-1.5" role="timer" aria-label={`Session expires in ${minutes} minutes ${secs} seconds`}>
      <span className={`text-xs font-mono font-semibold tabular-nums ${isLow ? 'text-[var(--danger)] motion-safe:animate-pulse' : 'text-[var(--color-text-tertiary)]'}`}>
        {label}
      </span>
      <div className="w-20 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${isLow ? 'bg-[var(--danger)]' : 'bg-[var(--accent)]'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function ChatHeader({ id, connectionStatus, otherUserOnline, sessionSeconds }) {
  const shareUrl = window.location.href

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-4xl border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/"
            className="flex-shrink-0 rounded-lg p-1 hover:bg-[var(--color-surface-hover)] transition-colors duration-150"
            aria-label="Back to home"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))' }}>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            </div>
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm tracking-widest truncate" style={{ color: 'var(--color-text-primary)' }}>
                {id}
              </span>
              <CopyButton text={shareUrl} label="Copy" size="sm" />
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <StatusBadge
                status={connectionStatus === 'SUBSCRIBED' ? 'connected' : connectionStatus === 'CONNECTING' ? 'connecting' : 'disconnected'}
                label={connectionStatus === 'SUBSCRIBED' ? 'Connected' : connectionStatus === 'CONNECTING' ? 'Connecting...' : 'Offline'}
              />
              {otherUserOnline ? (
                <StatusBadge status="online" label="Other person here" />
              ) : connectionStatus === 'SUBSCRIBED' ? (
                <StatusBadge status="waiting" label="Waiting..." />
              ) : null}
            </div>
          </div>
        </div>

        {sessionSeconds !== null && (
          <SessionTimer seconds={sessionSeconds} />
        )}
      </div>
    </header>
  )
}
