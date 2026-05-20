import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'

export default function Footer() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <footer ref={ref} className="relative border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <div className="sm:col-span-1" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
            <Link to="/" className="flex items-center gap-2.5 group mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-shadow duration-300 group-hover:shadow-glow" style={{ background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))' }}>
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>VanishChat</span>
            </Link>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              Ephemeral, anonymous, two-person chat. Messages vanish after 60 seconds.
              No accounts. No history. No trace.
            </p>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-tertiary)' }}>Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm transition-all duration-150 hover:text-[var(--accent)]" style={{ color: 'var(--color-text-secondary)' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm transition-all duration-150 hover:text-[var(--accent)]" style={{ color: 'var(--color-text-secondary)' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm transition-all duration-150 hover:text-[var(--accent)]" style={{ color: 'var(--color-text-secondary)' }}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s' }}>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-tertiary)' }}>Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>Built with Supabase Realtime</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>Open source on GitHub</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>&copy; {new Date().getFullYear()} VanishChat</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--color-border-subtle)', opacity: inView ? 1 : 0, transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s' }}>
          <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
            Privacy is not a feature. It&apos;s the product.
          </p>
          <div className="flex items-center gap-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>All systems secure</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
