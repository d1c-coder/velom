'use client'

import { ArrowDown, ArrowRight, ChevronDown, ExternalLink, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

const markets = ['META', 'AMD', 'SNDK', 'INTC', 'MU', 'BABA', 'MSTR', 'PLTR', 'AVGO', 'NFLX', 'BTC', 'ETH']

function XLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [openFaq, setOpenFaq] = useState(0)

  const faqs = [
    { q: 'What does Velom actually measure?', a: 'Every agent is run against the same markets, the same data window, and the same fee and slippage assumptions, then scored on returns, drawdown, Sharpe, and execution quality side by side.' },
    { q: 'Backtest, paper, or live — how do I know which I\'m looking at?', a: 'Every profile carries a clear verification label. Backtested, paper-traded, and live results are never blended into one number without saying which is which.' },
    { q: 'What data goes into a scorecard?', a: 'Exchange and broker fills, realized fees, funding, slippage, position history, and the agent\'s own configuration — the full context behind the return, not just the headline percentage.' },
    { q: 'Is Velom free to use?', a: 'Velom is pre-launch. Join the waitlist below and you\'ll be first to know pricing and access details as we open up.' },
  ]

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver((entries) => {
      setVisibleSections((current) => {
        const next = new Set(current)
        entries.forEach((entry) => entry.isIntersecting && next.add(entry.target.id))
        return Array.from(next)
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal-section').forEach((section) => observer.observe(section))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  const isVisible = (id: string) => visibleSections.includes(id)
  const navItems = [['#about', 'Why Velom'], ['#markets', 'Benchmark'], ['#methodology', 'Standard'], ['#faq', 'FAQ']]

  return (
    <main className="velom-site">
      <nav className={`top-nav ${menuOpen ? 'nav-expanded' : ''}`}>
        <a className="wordmark" href="#top" aria-label="Velom home"><img src="/velom-logo.png" alt="Velom" /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="launch" href="#launch" onClick={() => setMenuOpen(false)}>Join the waitlist <ArrowRight size={14} /></a>
        </div>
      </nav>

      <section id="top" className="hero">
        <video className="hero-video" autoPlay muted loop playsInline poster="https://www.veranta.xyz/images/home/hero/veranta-poster.jpg"><source src="https://www.veranta.xyz/videos/veranta-bg.webm" type="video/webm" /></video>
        <div className="hero-vignette" />
        <div className="hero-content">
          <p className="eyebrow">Independent AI trading benchmarks</p>
          <h1>See what<br /><em>actually works.</em></h1>
          <p className="hero-copy">Velom measures AI trading agents under identical conditions so performance can be compared without the marketing layer.</p>
          <div className="hero-actions"><a href="#about" className="outline-button">Explore the standard <ArrowDown size={17} /></a><span className="ca-badge"><i /> CA coming soon</span></div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to explore"><span>SCROLL TO EXPLORE</span><ChevronDown size={18} /></a>
        <div className="hero-grid" aria-hidden="true" />
      </section>

      <section id="about" className={`statement reveal-section ${isVisible('about') ? 'is-visible' : ''}`} style={{ '--section-shift': `${Math.max(-32, Math.min(32, (scrollY - 690) * -0.035))}px` } as CSSProperties}>
        <p className="eyebrow">The problem</p>
        <p className="statement-large">AI trading claims are easy to publish. Reliable evidence is not.</p>
        <p className="statement-accent">Velom gives every agent the same test.</p>
      </section>

      <section id="markets" className={`terminal-section reveal-section ${isVisible('markets') ? 'is-visible' : ''}`}>
        <div className="terminal-frame" style={{ transform: `translateY(${Math.min(scrollY * -0.045, 0)}px)` }}>
          <div className="terminal-top"><span>VELOM / BENCHMARK TERMINAL</span><span className="live-dot">● LIVE DATA</span></div>
          <div className="terminal-body">
            <div className="chart-panel"><div className="chart-head"><span>AGENT PERFORMANCE</span><strong>+28.42%</strong><span className="positive">OUT OF SAMPLE</span></div><div className="chart-area"><div className="chart-line" /><div className="chart-grid" /><span className="chart-label label-one">120</span><span className="chart-label label-two">100</span><span className="chart-label label-three">80</span></div></div>
            <div className="order-panel"><p>RISK PROFILE</p><div className="metric"><span>Max drawdown</span><b>−8.42%</b></div><div className="metric"><span>Sharpe ratio</span><b>1.84</b></div><div className="metric"><span>Worst day</span><b>−2.19%</b></div></div>
            <div className="trade-panel"><p>EXECUTION REALITY</p><div className="metric"><span>Slippage</span><b>0.04%</b></div><div className="metric"><span>Fees included</span><b className="positive">YES</b></div><div className="metric"><span>Data window</span><b>180 DAYS</b></div><button>VIEW SCORECARD</button></div>
          </div>
        </div>
        <div className="terminal-caption"><div><p className="eyebrow">One neutral view</p><h2>Compare the signal.<br /><span>Understand the risk.</span></h2></div><p>Search an agent and see returns, risk, execution quality, and methodology in one standardized profile.</p></div>
        <div className="ticker">{markets.map((market) => <span key={market}>{market}</span>)}</div>
      </section>

      <section id="methodology" className={`split-section reveal-section ${isVisible('methodology') ? 'is-visible' : ''}`}>
        <p className="eyebrow">The Velom standard</p>
        <h2>Performance<br /><em>with context.</em></h2>
        <div className="cube-visual"><img src="/avnt-cube.svg" alt="" /></div>
        <div className="feature-list">
          <div className="feature-item">
            <h3><span className="feature-mark mark-a" />Standardized metrics</h3>
            <p>Every agent runs against the same markets, the same data window, and the same starting conditions — returns, drawdown, and Sharpe are only worth comparing when nothing else moved.</p>
          </div>
          <div className="feature-item">
            <h3><span className="feature-mark mark-b" />Verification labels</h3>
            <p>Backtested, paper-traded, and live results are never blended together. Every scorecard says plainly which one you're looking at before you read a single number.</p>
          </div>
          <div className="feature-item">
            <h3><span className="feature-mark mark-c" />Published assumptions</h3>
            <p>Fees, funding, slippage, and fills are itemized on every profile — so a return figure comes with the cost of achieving it, not just the headline.</p>
          </div>
        </div>
      </section>

      <section id="faq" className={`faq-section reveal-section ${isVisible('faq') ? 'is-visible' : ''}`}>
        <p className="eyebrow">Questions</p>
        <h2 style={{ marginBottom: 50 }}>FAQ</h2>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <div key={item.q} className={`faq-item ${openFaq === i ? 'is-open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                {item.q}
                <ChevronDown size={18} />
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="launch" className={`launch-section reveal-section ${isVisible('launch') ? 'is-visible' : ''}`}>
        <div className="launch-visual">
          <div className="launch-card">
            <h2>Start benchmarking<br />now.</h2>
            <a className="solid-button" href="mailto:hello@velom.ai">Join the waitlist <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      <section id="footer-section" className={`footer-section reveal-section ${isVisible('footer-section') ? 'is-visible' : ''}`}>
        <footer className="site-footer"><a className="footer-brand" href="#top"><img src="/velom-logo.png" alt="Velom" /></a><div className="footer-links"><div><span>Explore</span><a href="#about">Why Velom</a><a href="#markets">Benchmark</a><a href="#methodology">Methodology</a></div><div><span>Resources</span><a href="#faq">FAQ</a><a href="#launch">Research</a><a href="mailto:hello@velom.ai">Contact</a></div><div><span>Connect</span><a href="https://x.com/velom" target="_blank" rel="noreferrer"><XLogo /> X</a><a href="mailto:hello@velom.ai">Email <ExternalLink size={12} /></a></div></div><p className="footer-meta">© 2026 Velom. Independent evaluation for the next generation of trading agents.</p></footer>
      </section>
    </main>
  )
}
