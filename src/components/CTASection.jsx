import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { generateChatId } from '../lib/idGenerator'
import { useInView } from '../hooks/useInView'

export default function CTASection() {
  const navigate = useNavigate()
  const [generating, setGenerating] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.2 })

  async function handleGenerate() {
    setGenerating(true)
    try {
      const { id, secret } = await generateChatId()
      const { error } = await supabase.from('chats').insert({ id, secret })
      if (error) throw error
      navigate(`/chat/${id}/${secret}`)
    } catch {
      // Error is handled silently
    } finally {
      setGenerating(false)
    }
  }

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-surface" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--accent-glow-bg)] via-[var(--accent-subtle)] to-transparent motion-safe:animate-glow-pulse" />
        <div className="absolute inset-0 bg-grid pointer-events-none" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--accent)] text-[11px] font-semibold px-4 py-1.5 mb-6 tracking-widest uppercase motion-safe:animate-fade-in">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75 motion-safe:animate-pulse-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            Ready to vanish?
          </span>
        </div>

        <h2 className="text-display-md sm:text-display-lg tracking-tight mb-6 text-balance" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
          Start a conversation that{' '}
          <span className="text-gradient-warm">leaves no trace</span>
        </h2>

        <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto text-base sm:text-lg mb-10 font-light" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s' }}>
          No sign-up. No commitment. Just pure, ephemeral communication.
        </p>

        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s' }}>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="btn-primary inline-flex min-h-[56px] text-base"
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
                Create your first chat
              </span>
            )}
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 sm:gap-8 text-xs" style={{ color: 'var(--color-text-tertiary)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s' }}>
          <span className="flex items-center gap-1.5 group cursor-default">
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            No data collected
          </span>
          <span className="flex items-center gap-1.5 group cursor-default">
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            End-to-end encrypted
          </span>
          <span className="flex items-center gap-1.5 group cursor-default">
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Auto-destructs
          </span>
        </div>
      </div>
    </section>
  )
}
