import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>
          <div className="absolute inset-0 bg-grid pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[var(--accent-glow-bg)] to-transparent pointer-events-none" />

          <div className="w-full max-w-md motion-safe:animate-premium-scale">
            <div className="rounded-3xl border shadow-premium-lg p-8 sm:p-10 text-center" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--danger-subtle)' }}>
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'var(--danger)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Something went wrong</h1>
              <p className="text-sm mb-6 font-light" style={{ color: 'var(--color-text-secondary)' }}>
                An unexpected error occurred. Please try refreshing the page.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Refresh page
                </button>
                <Link
                  to="/"
                  className="btn-secondary"
                >
                  Go home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
