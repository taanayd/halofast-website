import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''

function HaloMark({ large = false }) {
  return (
    <svg className={large ? 'halo-mark halo-mark-large' : 'halo-mark'} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 8.5a23.5 23.5 0 1 1-16.6 40.1" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M8.5 29.4c.2-2.2.8-4.2 1.8-6.1" fill="none" stroke="#ffd16d" strokeWidth="7" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function DropIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2S6.2 10 6.2 14.4a5.8 5.8 0 0 0 11.6 0C17.8 10 12 3.2 12 3.2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9.2 15.2a2.9 2.9 0 0 0 2.8 2.3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}

function SocialIcon({ type }) {
  if (type === 'x') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h3.7l10.3 16h-3.7L5 4Zm0 16 6.5-7.4M12.5 11.4 19 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  if (type === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.7" cy="6.7" r="1" fill="currentColor"/></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8v11M6 4.5v.1M10.5 19v-6.2a3.2 3.2 0 0 1 6.4 0V19M10.5 10v9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="6" cy="5" r="1" fill="currentColor"/></svg>
}

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim()) return
    if (!FORMSPREE_ENDPOINT) {
      setStatus('not-configured')
      return
    }
    setStatus('loading')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'halofast.app launch waitlist' }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar wrap">
        <a className="brand" href="#top" aria-label="HaloFast home">
          <HaloMark />
          <span className="brand-word"><strong>Halo</strong>Fast</span>
        </a>
        <a className="top-link" href="#waitlist">Get launch updates <span aria-hidden="true">↗</span></a>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> A calmer way to fast</div>
            <h1>The fasting timer<br className="desktop-break" /> that <span>never breaks.</span></h1>
            <p className="hero-description">A reliable, offline-first fasting companion for real life — with water and food tracking that keeps you in control.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#waitlist">Get launch updates <ArrowIcon /></a>
              <span className="availability"><span className="status-dot" /> Coming soon to Android &amp; iOS</span>
            </div>
            <div className="trust-row">
              <span><span className="mini-check">✓</span> Works offline</span>
              <span><span className="mini-check">✓</span> Honest pricing</span>
              <span><span className="mini-check">✓</span> Your pace, your plan</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="HaloFast fasting timer preview">
            <div className="visual-glow" />
            <div className="timer-card">
              <div className="timer-card-top"><span className="live-indicator" /> YOUR FAST</div>
              <div className="timer-ring-wrap">
                <svg className="timer-ring" viewBox="0 0 260 260" aria-hidden="true">
                  <circle cx="130" cy="130" r="108" className="ring-track" />
                  <circle cx="130" cy="130" r="108" className="ring-progress" />
                </svg>
                <div className="timer-center">
                  <span className="timer-kicker">16:8 FAST</span>
                  <strong>12<span>:</span>48<span>:</span>36</strong>
                  <span className="timer-sub">elapsed · preview</span>
                </div>
              </div>
              <div className="timer-footer">
                <span className="device-icon">⌁</span>
                <span>Saved on this device</span>
                <span className="sync-pill">Offline ready</span>
              </div>
              <div className="float-chip chip-water"><span className="chip-icon"><DropIcon /></span><span><b>Water log</b><small>Stay hydrated</small></span></div>
              <div className="float-chip chip-food"><span className="food-dot"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8m0-12.8L5.6 18.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></span><span><b>Food tracking</b><small>Simple &amp; flexible</small></span></div>
            </div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
          </div>
        </section>

        <section className="proof-strip">
          <div className="wrap proof-inner">
            <div><span className="proof-number">01</span><span><b>Reliable by design</b><small>Your timer stays on your device.</small></span></div>
            <div><span className="proof-number">02</span><span><b>Calm, not cluttered</b><small>Only what helps you stay consistent.</small></span></div>
            <div><span className="proof-number">03</span><span><b>Clear before you pay</b><small>Pricing and renewal terms up front.</small></span></div>
          </div>
        </section>

        <section className="features section wrap" id="features">
          <div className="section-heading">
            <div className="eyebrow">Built around real life</div>
            <h2>Less friction.<br /><span>More consistency.</span></h2>
            <p>Fasting is personal. Your tracker should feel dependable, easy to understand, and ready when you are.</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card feature-card-tall">
              <div className="feature-icon icon-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.7" fill="none"/></svg></div>
              <h3>Your fast, uninterrupted</h3>
              <p>Start, end, or edit a fast even without a connection. Your progress is stored locally first.</p>
              <div className="feature-illustration offline-illustration"><span className="offline-ring">✓</span><span><b>Saved on device</b><small>Ready whenever you are</small></span><span className="tiny-signal">↯</span></div>
            </article>
            <article className="feature-card">
              <div className="feature-icon icon-yellow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg></div>
              <h3>Hydration that fits</h3>
              <p>Log your water simply and build a routine that works for you.</p>
              <div className="water-visual"><div className="water-glass"><span /></div><div><b>Water check-in</b><small>One small habit at a time</small></div></div>
            </article>
            <article className="feature-card">
              <div className="feature-icon icon-purple"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4zM8 9h8M8 13h5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <h3>Food tracking, with context</h3>
              <p>Record meals and adjust estimated portions. AI-assisted estimates are clearly labelled.</p>
              <div className="food-visual"><span className="food-emoji" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12.5a8 8 0 0 0 16 0H4Z M7 11.5 5.5 8m5.5 3.5L10 6m4 5.5L16 7m1 4.5L19 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span><b>Lunch</b><small>Review every estimate</small></span><span className="estimate-tag">ESTIMATE</span></div>
            </article>
            <article className="feature-card feature-card-wide">
              <div className="wide-copy"><div className="feature-icon icon-green"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18V6m0 12h16M7 15l4-4 3 2 5-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div><h3>Your history, without the noise</h3><p>See your progress, patterns, and streaks in a clean view — without turning your routine into a competition.</p></div>
              <div className="week-visual"><div className="week-label"><span>THIS WEEK</span><b>Consistency, your way</b></div><div className="week-bars"><i style={{height:'42%'}}/><i style={{height:'65%'}}/><i style={{height:'54%'}}/><i style={{height:'82%'}}/><i style={{height:'70%'}}/><i style={{height:'92%'}}/><i style={{height:'60%'}}/></div><div className="week-days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></div>
            </article>
          </div>
        </section>

        <section className="promise-section">
          <div className="wrap promise-layout">
            <div>
              <div className="eyebrow">Our promise</div>
              <h2>Honest pricing.<br /><span>Written down.</span></h2>
              <p className="promise-intro">Your focus should be on your routine — not on deciphering a subscription screen.</p>
            </div>
            <div className="promise-list">
              <div><span className="promise-check">✓</span><span><b>Useful basics stay free</b><small>Free forever: timer, history, streaks, calendar and widget.</small></span></div>
              <div><span className="promise-check">✓</span><span><b>No paywall over an active fast</b><small>Never a paywall over an active fast. Ever.</small></span></div>
              <div><span className="promise-check">✓</span><span><b>Clear subscription terms</b><small>Price and renewal date shown before you pay.</small></span></div>
              <div><span className="promise-check">✓</span><span><b>No surprise trial conversion</b><small>A reminder before any trial turns paid.</small></span></div>
              <p className="promise-note">These are HaloFast's product commitments. The app is still in development; features and availability may change before launch.</p>
            </div>
          </div>
        </section>

        <section className="waitlist-section section wrap" id="waitlist">
          <div className="waitlist-card">
            <div className="waitlist-orb" />
            <div className="waitlist-content">
              <div className="eyebrow"><span className="eyebrow-dot" /> Be first to know</div>
              <h2>A better fast<br />is <span>on the way.</span></h2>
              <p>Join the launch list for occasional HaloFast updates. No fake launch date, no spam — just news when there’s something real to share.</p>
              <form className="waitlist-form" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="email">Email address</label>
                <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => { setEmail(e.target.value); if (status !== 'loading') setStatus('idle') }} required disabled={!FORMSPREE_ENDPOINT} />
                <button type="submit" disabled={status === 'loading' || !FORMSPREE_ENDPOINT}>{status === 'loading' ? 'Joining…' : FORMSPREE_ENDPOINT ? 'Join the list' : 'Signups opening soon'} {FORMSPREE_ENDPOINT && <ArrowIcon />}</button>
              </form>
              <div className={`form-message ${status}`} aria-live="polite">
                {status === 'success' && 'You’re on the list — thanks for your interest.'}
                {status === 'error' && 'That didn’t go through. Please try again in a moment.'}
                {status === 'not-configured' && 'The launch list is not connected yet. Please check back soon.'}
                {status === 'idle' && !FORMSPREE_ENDPOINT && 'Email signup is temporarily unavailable while the launch list is being connected.'}
              </div>
              <div className="privacy-note"><span aria-hidden="true">⌑</span> Your email is for HaloFast launch updates only. <a href="/privacy.html">Privacy policy</a></div>
            </div>
            <div className="waitlist-art" aria-hidden="true"><HaloMark large /><span>HALOFAST</span><small>CALM. RELIABLE. HONEST.</small></div>
          </div>
        </section>
      </main>

      <footer className="footer wrap">
        <a className="brand" href="#top" aria-label="HaloFast home"><HaloMark /><span className="brand-word"><strong>Halo</strong>Fast</span></a>
        <span className="footer-tagline">The fasting timer that never breaks.</span>
        <div className="footer-right">
          <div className="social-links" aria-label="HaloFast social profiles">
            <a href="https://x.com/halofastapp" target="_blank" rel="noreferrer" aria-label="HaloFast on X"><SocialIcon type="x" /></a>
            <a href="https://www.instagram.com/halofastapp/" target="_blank" rel="noreferrer" aria-label="HaloFast on Instagram"><SocialIcon type="instagram" /></a>
            <a href="https://www.linkedin.com/company/halofastapp/" target="_blank" rel="noreferrer" aria-label="HaloFast on LinkedIn"><SocialIcon type="linkedin" /></a>
          </div>
          <span>Coming soon to Android &amp; iOS</span><span>© {new Date().getFullYear()} HaloFast</span>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
