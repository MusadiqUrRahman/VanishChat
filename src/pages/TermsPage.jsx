import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="motion-safe:animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: 'linear-gradient(to bottom right, var(--accent), var(--accent-hover))' }}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Terms of Service</h1>
            </div>
            <p className="text-sm mb-10 ml-[52px]" style={{ color: 'var(--color-text-tertiary)' }}>Last updated: May 2026</p>

            <div className="space-y-5 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              <section className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>1. Service Description</h2>
                <p className="font-light">VanishChat is a privacy-focused ephemeral messaging service that enables temporary, anonymous conversations between two people. Messages are automatically deleted after 60 seconds. Chat sessions expire after 5 minutes of inactivity.</p>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>2. No Accounts Required</h2>
                <p className="font-light">VanishChat does not require user registration, accounts, or personal information. Access is granted via unique, shareable links.</p>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>3. Ephemeral Nature</h2>
                <ul className="space-y-2 mt-2">
                  {[
                    'Messages are automatically deleted after 60 seconds',
                    'Chat sessions expire after 5 minutes of inactivity',
                    'No chat history is stored or recoverable',
                    'Once a message disappears, it cannot be retrieved',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--accent)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>4. Acceptable Use</h2>
                <ul className="space-y-2">
                  {[
                    'Transmitting illegal or harmful content',
                    'Harassment, threats, or abuse',
                    'Distributing malware or malicious links',
                    'Spamming or automated messaging',
                    'Violating any applicable laws or regulations',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-text-tertiary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>5. Disclaimer of Warranties</h2>
                <p className="font-light">VanishChat is provided &quot;as is&quot; without warranties of any kind. While we design the service to be ephemeral, we do not guarantee absolute deletion within specified timeframes.</p>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>6. Limitation of Liability</h2>
                <p className="font-light">VanishChat is not liable for any damages arising from your use of the service. You use VanishChat at your own risk.</p>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>7. Changes to Terms</h2>
                <p className="font-light">We may update these terms at any time. Continued use of the service constitutes acceptance of updated terms.</p>
              </section>
            </div>

            <div className="mt-12 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <Link
                to="/"
                className="btn-primary inline-flex"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-6 14h14" />
                </svg>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
