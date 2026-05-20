import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

export default function Header() {
  const { theme, toggle, isDark } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300" style={{ backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)' }}>
      <div className="absolute inset-0 transition-all duration-300" style={{ background: scrolled ? 'color-mix(in srgb, var(--color-surface) 80%, transparent)' : 'transparent', borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent' }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/15 to-transparent" />

      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:shadow-glow" style={{ background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))' }}>
            <svg className="w-4 h-4 text-white motion-safe:animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-[var(--color-text-primary)] tracking-tight">VanishChat</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/privacy"
            className="btn-ghost text-xs relative"
            onMouseEnter={() => setHoveredLink('privacy')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Privacy
            <span className={`absolute bottom-0 left-2 right-2 h-px bg-[var(--accent)] transition-all duration-300 ${hoveredLink === 'privacy' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
          </Link>
          <Link
            to="/terms"
            className="btn-ghost text-xs relative"
            onMouseEnter={() => setHoveredLink('terms')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Terms
            <span className={`absolute bottom-0 left-2 right-2 h-px bg-[var(--accent)] transition-all duration-300 ${hoveredLink === 'terms' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
          </Link>
          <div className="w-px h-5" style={{ background: 'var(--color-border)' }} />
          <button
            type="button"
            onClick={toggle}
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-all duration-150"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <div className="relative transition-transform duration-300 hover:scale-110">
              {isDark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636m15.364 4.364a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25m16.5 0a2.25 2.25 0 00-2.25-2.25H5.25a2.25 2.25 0 00-2.25 2.25m16.5 0v6a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-6" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </nav>
    </header>
  )
}
