import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const trustPoints = [
  { label: 'No accounts', desc: 'We never ask for your email, name, or any personal information.' },
  { label: 'No tracking', desc: 'No analytics cookies, no tracking pixels, no fingerprinting.' },
  { label: 'No history', desc: 'Messages are permanently deleted after 60 seconds. Nothing is archived.' },
  { label: 'No data selling', desc: 'We don\'t collect, sell, or share any data. There\'s nothing to sell.' },
  { label: 'Open source', desc: 'Our code is transparent. Anyone can verify what we do with your data.' },
  { label: 'End-to-end encrypted', desc: 'Messages are encrypted in transit using industry-standard protocols.' },
]

export default function TrustSection() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="relative overflow-hidden rounded-4xl border p-8 sm:p-12 lg:p-16 shadow-premium-lg"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 motion-safe:animate-drift" style={{ background: 'var(--accent-glow-bg)' }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 motion-safe:animate-drift-reverse" style={{ background: 'var(--blue-subtle)' }} />

          <div className="relative max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm motion-safe:animate-float"
                style={{ background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>

              <h2 className="text-display-sm sm:text-display-md tracking-tight mb-4 text-balance" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
                Your privacy is not a <span className="text-gradient-warm">feature</span>
              </h2>
              <p className="leading-relaxed text-base sm:text-lg max-w-xl mx-auto font-light" style={{ color: 'var(--color-text-secondary)', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
                VanishChat collects nothing. No accounts, no tracking, no profiles.
                The product is privacy itself.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {trustPoints.map((point, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border p-5 backdrop-blur-sm transition-all duration-300"
                  style={{
                    borderColor: hoveredIdx === i ? 'var(--color-border-hover)' : 'var(--color-border)',
                    background: hoveredIdx === i ? 'var(--color-surface-hover)' : 'var(--color-surface-muted)',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.06}s, background 0.2s ease, border-color 0.2s ease`,
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="flex items-start gap-3">
                    <svg className={`w-5 h-5 shrink-0 mt-0.5 transition-all duration-300 ${hoveredIdx === i ? 'scale-110' : ''}`} style={{ color: hoveredIdx === i ? 'var(--accent)' : 'var(--success)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{point.label}</span>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>{point.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 text-center" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s' }}>
              <div className="inline-flex items-center gap-3 rounded-2xl border px-6 py-4 hover:shadow-premium transition-shadow duration-300" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-muted)' }}>
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Built with <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Supabase Realtime</span> · Open source on{' '}
                  <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)] underline underline-offset-2 transition-colors">GitHub</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
