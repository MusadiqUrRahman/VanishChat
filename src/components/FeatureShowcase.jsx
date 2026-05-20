import { useState, useCallback } from 'react'
import { useInView } from '../hooks/useInView'

const features = [
  {
    id: 'ephemeral',
    title: 'Ephemeral by design',
    desc: 'Messages self-destruct after 60 seconds. No history, no archives, no traces left behind. Every conversation is a closed loop.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    size: 'large',
  },
  {
    id: 'no-accounts',
    title: 'No accounts. No sign-up.',
    desc: 'No email, no password, no profile. Just generate a link and instantly start a conversation.',
    size: 'small',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: 'realtime',
    title: 'Real-time, always',
    desc: 'Powered by Supabase Realtime. Messages appear the instant they\'re sent.',
    size: 'small',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 'oneonone',
    title: '1-on-1 conversations',
    desc: 'Strictly two people per chat. No group chats, no observers, no audience. Just you and who you shared the link with.',
    size: 'wide',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    id: 'encrypted',
    title: 'End-to-end encrypted',
    desc: 'Your conversations are encrypted in transit and never stored on our servers after they vanish.',
    size: 'small',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
]

export default function FeatureShowcase() {
  const [ref, inView] = useInView({ threshold: 0.05 })
  const [tiltedCard, setTiltedCard] = useState(null)

  const handleMouseMove = useCallback((e, id) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -8
    const rotateY = (x - 0.5) * 8
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }, [])

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    setTiltedCard(null)
  }, [])

  return (
    <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <span className="section-label">Features</span>
          <h2 className="text-display-md sm:text-display-lg tracking-tight text-balance" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
            Built for <span className="text-gradient-warm">privacy</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto text-base sm:text-lg mt-3 font-light" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
            Every feature eliminates a trace. Nothing is saved. Nothing is recoverable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, i) => {
            const isLarge = feature.size === 'large'
            const isWide = feature.size === 'wide'
            const spanClass = isLarge ? 'sm:col-span-2 lg:row-span-2' : isWide ? 'sm:col-span-2' : ''

            return (
              <div
                key={feature.id}
                className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-premium-lg ${spanClass}`}
                style={{
                  animationDelay: `${i * 100}ms`,
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-surface)',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'perspective(1000px) rotateX(0deg) rotateY(0deg)' : 'perspective(1000px) rotateX(5deg) translateY(30px)',
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
                  transformStyle: 'preserve-3d',
                }}
                onMouseMove={(e) => handleMouseMove(e, feature.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-hover)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 ${isLarge ? 'opacity-60' : 'opacity-30'} group-hover:opacity-80 transition-all duration-500`} />

                <div className={`relative p-6 sm:p-8 ${isLarge ? 'sm:p-10' : ''}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm mb-5 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300 ${isLarge ? 'w-12 h-12' : ''}`}
                    style={feature.id === 'realtime' || feature.id === 'encrypted' ? { background: 'linear-gradient(to bottom right, var(--info), #1d4ed8)', color: 'white' } : { background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))', color: 'white' }}>
                    <span className={isLarge ? 'scale-110' : ''}>{feature.icon}</span>
                  </div>

                  <h3 className={`font-semibold mb-2 ${isLarge ? 'text-xl' : 'text-base'}`} style={{ color: 'var(--color-text-primary)' }}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed font-light ${isLarge ? 'text-base' : 'text-sm'}`} style={{ color: 'var(--color-text-secondary)' }}>
                    {feature.desc}
                  </p>

                  {isLarge && (
                    <div className="mt-8 rounded-2xl border p-5" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-muted)' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex -space-x-2">
                          {[1, 2].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold text-white motion-safe:animate-float"
                              style={{ background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))', borderColor: 'var(--color-surface)', animationDelay: `${i * 0.3}s` }}>
                              {i === 1 ? 'A' : 'B'}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Connected · Secure</span>
                        <span className="ml-auto text-[10px] text-[var(--color-text-tertiary)] font-mono">59s</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-surface)' }}>
                        <div className="h-full rounded-full motion-safe:animate-progress-bar" style={{ transformOrigin: 'left', background: 'linear-gradient(to right, var(--accent), var(--accent-hover))' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
