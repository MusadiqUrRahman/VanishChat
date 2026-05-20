import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPage() {
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Privacy Policy</h1>
            </div>
            <p className="text-sm mb-10 ml-[52px]" style={{ color: 'var(--color-text-tertiary)' }}>Last updated: May 2026</p>

            <div className="space-y-5 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              <section className="rounded-2xl border p-6 sm:p-8 border-l-4" style={{ borderColor: 'var(--color-border)', borderLeftColor: 'var(--accent)', background: 'var(--color-surface)' }}>
                <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Our Privacy Commitment</h2>
                <p className="font-light">
                  VanishChat is built on a simple principle: <strong style={{ color: 'var(--color-text-primary)' }}>we collect nothing that we don&apos;t need to make the service work</strong>. No accounts, no profiles, no tracking, no analytics.
                </p>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8 hover:bg-[var(--color-surface-hover)] transition-colors duration-200" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>1. Information We Collect</h2>
                <p className="mb-3 font-light">VanishChat collects minimal data by design:</p>
                <ul className="space-y-2">
                  {[
                    'Chat identifiers: Random 6-character IDs and secrets generated for each session',
                    'Message content: Temporarily stored for up to 60 seconds, then permanently deleted',
                    'Session timestamps: Used to determine when a chat should expire (5 minutes of inactivity)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--accent)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8 hover:bg-[var(--color-surface-hover)] transition-colors duration-200" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>2. Information We Do NOT Collect</h2>
                <ul className="space-y-2">
                  {[
                    'No personal information (name, email, phone, address)',
                    'No user accounts or profiles',
                    'No analytics or tracking data',
                    'No device fingerprints or browser telemetry',
                    'No IP address logging',
                    'No cookies beyond essential session functionality',
                    'No chat history or message archives',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--success)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8 hover:bg-[var(--color-surface-hover)] transition-colors duration-200" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>3. Data Retention</h2>
                <ul className="space-y-2">
                  {[
                    'Individual messages: Deleted after 60 seconds',
                    'Entire chat sessions: Messages deleted and session deactivated after 5 minutes of inactivity',
                    'No backups: Deleted messages are not recoverable from any backup',
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

              <section className="rounded-2xl border p-6 sm:p-8 hover:bg-[var(--color-surface-hover)] transition-colors duration-200" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>4. Third-Party Services</h2>
                <p className="font-light">VanishChat uses Supabase as its backend infrastructure. Supabase processes and stores data in accordance with our ephemeral design. Messages are deleted from Supabase databases per the retention policy above.</p>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8 hover:bg-[var(--color-surface-hover)] transition-colors duration-200" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>5. Local Storage</h2>
                <p className="font-light">VanishChat uses your browser&apos;s localStorage for theme preference and rules acknowledgment. This data is stored only on your device.</p>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8 hover:bg-[var(--color-surface-hover)] transition-colors duration-200" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>6. Security</h2>
                <p className="font-light">Access to chats requires both a chat ID and a secret token. However, because the secret is included in the URL, it may appear in browser history or server logs. Share links through secure channels.</p>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8 hover:bg-[var(--color-surface-hover)] transition-colors duration-200" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>7. Your Rights</h2>
                <p className="font-light">Since we collect virtually no personal data, there is no personal data to access, modify, or delete. If you have privacy concerns, simply stop using the service.</p>
              </section>

              <section className="rounded-2xl border p-6 sm:p-8 hover:bg-[var(--color-surface-hover)] transition-colors duration-200" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>8. Changes to This Policy</h2>
                <p className="font-light">We may update this privacy policy at any time. Changes take effect immediately upon posting.</p>
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
