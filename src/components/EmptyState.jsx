export default function EmptyState({ type = 'messages' }) {
  if (type === 'chat') {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm motion-safe:animate-fade-up">
          <div className="w-20 h-20 rounded-3xl border flex items-center justify-center mx-auto mb-6"
            style={{ borderColor: 'var(--color-border)', background: 'var(--accent-subtle)' }}>
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{ color: 'var(--accent)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>No messages yet</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>
            Share the chat link with someone to start the conversation.
            Messages will appear here in real-time.
          </p>
          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            Waiting for the other person to join...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-sm motion-safe:animate-fade-up">
        <div className="w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto mb-5"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{ color: 'var(--color-text-tertiary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
        <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--color-text-secondary)' }}>Nothing here yet</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>Content will appear here when available.</p>
      </div>
    </div>
  )
}
