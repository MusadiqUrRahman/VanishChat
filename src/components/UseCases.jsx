import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const useCases = [
  {
    title: 'Private conversations',
    desc: 'Share what you wouldn\'t put in a text message or email. When the conversation ends, the evidence disappears.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    iconBg: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))',
  },
  {
    title: 'Sensitive information',
    desc: 'Share passwords, credentials, or confidential data knowing they\'ll self-destruct. No permanent record, ever.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    iconBg: 'linear-gradient(135deg, #059669, #0d9488)',
  },
  {
    title: 'Temporary coordination',
    desc: 'Plan an event, coordinate a surprise, or discuss something time-sensitive. Once it\'s done, it\'s gone.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: 'linear-gradient(135deg, #f59e0b, #ea580c)',
  },
  {
    title: 'Anonymous feedback',
    desc: 'Give or receive honest feedback without it being traced back to you. No accounts means complete anonymity.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    iconBg: 'linear-gradient(135deg, #a855f7, #ec4899)',
  },
]

export default function UseCases() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <span className="section-label">Use cases</span>
          <h2 className="text-display-md sm:text-display-lg tracking-tight text-balance" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
            Privacy for <span className="text-gradient-warm">everyone</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto text-base sm:text-lg mt-3 font-light" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
            From personal conversations to professional coordination
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {useCases.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border p-6 sm:p-8 transition-all duration-500 hover:shadow-premium"
              style={{
                borderColor: hoveredIdx === i ? 'var(--color-border-hover)' : 'var(--color-border)',
                background: hoveredIdx === i ? 'var(--color-surface-elevated)' : 'var(--color-surface)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s, background 0.3s ease, border-color 0.3s ease`,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-hover)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:shadow-glow transition-all duration-300"
                  style={{ background: item.iconBg }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base mb-1.5" style={{ color: 'var(--color-text-primary)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
