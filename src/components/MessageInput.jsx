import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

const MAX_LEN = 1000

const MessageInput = forwardRef(function MessageInput({ onSend, disabled }, ref) {
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const textareaRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus(),
  }))

  const remaining = MAX_LEN - content.length
  const trimmed = content.trim()
  const canSend = !disabled && !sending && trimmed.length > 0 && remaining >= 0

  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus()
    }
  }, [disabled])

  const autoResize = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }, [])

  useEffect(() => {
    autoResize()
  }, [content, autoResize])

  async function handleSend() {
    if (!canSend) return
    setSending(true)
    setError(null)
    try {
      await onSend(trimmed)
      setContent('')
    } catch (e) {
      setError(e?.message || 'Failed to send')
    } finally {
      setSending(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            rows={1}
            maxLength={MAX_LEN}
            value={content}
            onChange={(e) => { setContent(e.target.value); setError(null) }}
            onKeyDown={handleKeyDown}
            disabled={disabled || sending}
            placeholder="Type a message..."
            className="w-full resize-none rounded-2xl border px-4 py-3 pr-16 text-sm transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]/40 backdrop-blur-sm leading-relaxed"
            style={{
              minHeight: '48px',
              maxHeight: '160px',
              borderColor: 'var(--color-border)',
              background: 'var(--color-surface-muted)',
              color: 'var(--color-text-primary)',
            }}
            aria-label="Message input"
          />
          <div className="absolute right-3 bottom-3 text-[10px] pointer-events-none select-none hidden sm:flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded-md border text-[10px] font-mono"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-tertiary)' }}>Enter</kbd>
            <span style={{ color: 'var(--color-text-tertiary)' }}>send</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className="relative inline-flex items-center justify-center min-h-[48px] min-w-[48px] rounded-2xl text-white flex-shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(to bottom, var(--accent), var(--accent-hover))',
            boxShadow: 'var(--shadow-glow-accent)',
          }}
          aria-label="Send message"
        >
          {sending ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between min-h-[20px]">
        <div className="min-h-[20px] text-xs">
          {error && <span className="text-[var(--danger)]">{error}</span>}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span style={{ color: 'var(--color-text-tertiary)' }}>
            {trimmed.length > 0 ? `${remaining} remaining` : `${MAX_LEN} max`}
          </span>
          {remaining < 100 && remaining >= 0 && (
            <span className="text-[var(--danger)] font-semibold">{remaining}</span>
          )}
        </div>
      </div>
    </div>
  )
})

export default MessageInput
