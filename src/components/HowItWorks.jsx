import { useState, useCallback } from 'react'
import { useInView } from '../hooks/useInView'

const steps = [
  {
    num: '01',
    title: 'Generate a chat',
    desc: 'Click "New Chat" and we instantly create a secure, unique room with an ID and secret code.',
    visual: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Share the link',
    desc: 'Send the unique link to whoever you want to talk to. No sign-up needed on their end either.',
    visual: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.56a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.82 8.82" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Everything vanishes',
    desc: 'Messages disappear after 60 seconds. After 5 minutes of inactivity, the entire chat is permanently deleted.',
    visual: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636m15.364 4.364a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25m16.5 0a2.25 2.25 0 00-2.25-2.25H5.25a2.25 2.25 0 00-2.25 2.25m16.5 0v6a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-6" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [activeStep, setActiveStep] = useState(null)

  return (
    <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <span className="section-label">How it works</span>
          <h2 className="text-display-md sm:text-display-lg tracking-tight text-balance" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
            Three simple steps
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-md mx-auto text-base sm:text-lg mt-3 font-light" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
            From link to conversation in seconds
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <div className="hidden sm:block absolute top-16 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
          <div
            className="hidden sm:block absolute top-16 left-[calc(16.67%+40px)] h-px bg-gradient-to-r from-[var(--accent)]/60 to-transparent transition-all duration-1000"
            style={{ width: inView ? 'calc(66.66% - 80px)' : '0%' }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s`,
              }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="text-center">
                <div className="relative mx-auto mb-8 w-20 h-20">
                  <div className="absolute inset-0 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                    style={{ background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))' }} />
                  <div className={`relative w-20 h-20 rounded-3xl border backdrop-blur-xl flex items-center justify-center transition-all duration-500 ${activeStep === i ? 'shadow-glow' : ''}`}
                    style={{ borderColor: 'var(--color-border)', background: 'var(--accent-subtle)' }}>
                    <span className={`text-[var(--accent)] transition-all duration-500 ${activeStep === i ? 'scale-110' : ''} ${inView ? 'scale-100' : 'scale-0'}`}
                      style={{ transitionDelay: `${0.3 + i * 0.12}s` }}>
                      {step.visual}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm motion-safe:animate-float"
                    style={i === 1 ? { background: 'linear-gradient(to bottom right, var(--info), #1d4ed8)' } : { background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))' }}>
                    {step.num}
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-3 transition-colors duration-300" style={{ color: activeStep === i ? 'var(--color-text-primary)' : 'var(--color-text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed font-light max-w-xs mx-auto transition-all duration-300" style={{ color: activeStep === i ? 'var(--color-text-secondary)' : 'var(--color-text-tertiary)' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
