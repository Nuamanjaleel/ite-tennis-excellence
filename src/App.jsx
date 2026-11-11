import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Download, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import { Privacy, Terms, Cookies } from './pages/LegalPages';
import { SITE } from './data/siteConfig';

import categoriesData from './content/categories.json';
import rankingsData from './content/rankings.json';
import sponsorsData from './content/sponsors.json';
import eventData from './content/event.json';

const EVENT = eventData;
const SPONSORS = sponsorsData;
const categories = categoriesData;
const totalEntries = categories.reduce((n, c) => n + c.players.length, 0);
const sampleRankings = {
  open: rankingsData.open.map((r) => [r.rank, r.name, r.points]),
  forty: rankingsData.forty.map((r) => [r.rank, r.name, r.points]),
};
const rules = [
  ['Group matches', 'First to 6 games. Tie-break to 7 points at 5–5.'],
  ['Quarter and semi finals', 'First to 6 games. Tie-break to 7 points at 5–5.'],
  ['Final', 'First to 7 games. Tie-break to 7 points at 6–6.'],
  ['Deuce', 'One deuce per game. A second 40–40 is a Golden Point, and the receiver picks the side.'],
  ['Court conduct', 'Players call their own lines. Warm-up is 3 minutes. No coaching from the sidelines.'],
];

const pageRoutes = { '#/privacy': Privacy, '#/terms': Terms, '#/cookies': Cookies };

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 15000); return () => clearInterval(t); }, []);
  const diff = Math.max(0, new Date(EVENT.start).getTime() - now);
  return { days: Math.floor(diff / 864e5), hours: Math.floor((diff % 864e5) / 36e5), minutes: Math.floor((diff % 36e5) / 6e4), started: diff === 0 };
}
const pad = (n) => String(n).padStart(2, '0');

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Championship', '#championship'],
    ['Sponsors', '#sponsors'],
    ['Participants', '#participants'],
    ['Rankings', '#rankings'],
    ['About ITE', '#about'],
    ['Contact', '#contact'],
  ];
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#home" className="brand-logo" aria-label="ITE home">
          <img src="/ite-logo.png" alt="ITE Tennis Excellence" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([l, h]) => (
            <a key={h} href={h}>{l}</a>
          ))}
        </nav>
        <a className="pill pill-light header-cta" href="#championship">
          Explore event <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)}>
              {l}<ArrowRight size={18} />
            </a>
          ))}
          <a className="pill pill-lime" href={EVENT.ruleBook} target="_blank" rel="noreferrer">
            Rule book <Download size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const chips = ['Group stage', `Knockouts ${EVENT.knockoutsAt}`, 'No coaching'];
  return (
    <section className="hero" id="home">
      <img className="hero-photo" src="/hero-bg.jpg" alt="Tennis player serving on court" />
      <div className="hero-shade" />
      <div className="page-wrap hero-grid">
        <div className="hero-copy">
          <h1><span>Raise your game.</span> <b>Own the moment.</b></h1>
          <p>A new court for ambition. A community built around the game. Welcome to ITE.</p>
          <a className="pill pill-light pill-lg" href="#championship">
            <span className="pill-dot"><CalendarDays size={16} /></span>See the schedule
          </a>
        </div>
        <a className="card card-photo" href="#participants" aria-label="Meet the players">
          <div>
            <small>Edition 01</small>
            <strong>21–22 Nov</strong>
            <span className="round-arrow"><ArrowUpRight size={14} /></span>
          </div>
          <img src="/schedule-img.jpg" alt="" />
        </a>
        <div className="card card-benefits">
          <h2>Discover the championship</h2>
          <div className="chips">
            {chips.map((c) => <span key={c}>{c}</span>)}
            <span className="chip-count">4 categories</span>
          </div>
          <a href="#participants">Explore</a>
        </div>
        <div className="card card-stat">
          <div className="card-stat-head">
            <h3>Players entered</h3>
            <span className="round-arrow"><ArrowUpRight size={14} /></span>
          </div>
          <small>Across all four categories</small>
          <strong>{totalEntries}</strong>
          <em>Entries confirmed so far</em>
        </div>
        <a className="card card-video" href={EVENT.ruleBook} target="_blank" rel="noreferrer">
          <div>
            <span className="tag">Rule book</span>
            <h3>Know the rules before you step on court</h3>
            <p><Download size={14} /> Download PDF</p>
          </div>
          <div className="video-thumb"><img src="/rulebook-img.jpg" alt="" /></div>
        </a>
      </div>
      <div className="ticker" aria-hidden="true">
        <div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
              {['ITE', 'TENNIS', 'EXCELLENCE', 'CHAMPIONSHIP', 'EDITION 01'].map((w) => (
                <span key={w + i}>{w}<i>✦</i></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Countdown() {
  const c = useCountdown();
  return (
    <section className="count-section" id="championship">
      <div className="page-wrap count-grid">
        <div className="count-photo">
          <img src="/countdown-bg.jpg" alt="Player at full stretch" />
          <div className="count-card">
            <div className="count-card-title">Let's join our event</div>
            <div className="count-card-row">
              <div>
                <small>{EVENT.venue}</small>
                <strong>21 November 2026</strong>
              </div>
              <div className="count-box-wrap">
                <small>{c.started ? 'Under way' : 'Starts in'}</small>
                <div className="count-boxes">
                  {[['days', 'd'], ['hours', 'h'], ['minutes', 'm']].map(([k, u]) => (
                    <div key={k}><b>{pad(c[k])}</b><i>{u}</i></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="count-head">
          <h2>Push<br />your<br />limits,</h2>
          <p>Ace your game.<br />Master every swing.</p>
        </div>
        <div className="count-mid"><img src="/count-mid.jpg" alt="" /></div>
        <a className="pill pill-dark pill-block count-cta" href="#participants">Start serving success</a>
        <div className="count-info">
          <p>Knockouts commence at <b>{EVENT.knockoutsAt}</b>. Two days, four categories, no coaching, and every player calls their own lines.</p>
          <ul>{rules.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ul>
          <a className="pill pill-dark" href={EVENT.ruleBook} target="_blank" rel="noreferrer">
            Download the rule book <Download size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Sponsors() {
  return (
    <section className="spons-section" id="sponsors">
      <div className="page-wrap spons-stage">
        <div className="spons-title">
          <h2>ITE<br /><span>Sponsors</span></h2>
          <a className="menu-pill" href="#about">Menu <i /></a>
        </div>

        {/* The 3 main sponsor images */}
        <img className="spons-photo sp-1" src="/redbull.png" alt="Red Bull" />
        <img className="spons-photo sp-2" src="/gatorade.png" alt="Gatorade" />
        <img className="spons-photo sp-3" src="/wilson.png" alt="Wilson" />

        <div className="spons-hero">
          <img src="/spons-center.jpg" alt="Tennis player" />
          {SPONSORS.map((s) => (
            <a key={s.name} className={`pin ${s.cls}`} href="#about">
              <i />
              <span><small>{s.role}</small><b>{s.name}</b></span>
            </a>
          ))}
        </div>

        {/* Mobile sponsor logo row */}
        <div className="spons-mobile-bar">
          <img src="/redbull.png" alt="Red Bull" />
          <img src="/gatorade.png" alt="Gatorade" />
          <img src="/wilson.png" alt="Wilson" />
        </div>

        <div className="spons-text">
          <p>The partners backing Edition 01 of the Tennis Excellence Championship, and the players who compete in it.</p>
          <a href="#about">Discover more</a>
        </div>
      </div>
    </section>
  );
}

function Participants() {
  const [active, setActive] = useState(categories[0].id);
  const sel = categories.find((c) => c.id === active);
  return (
    <section className="light-section" id="participants">
      <div className="page-wrap">
        <h2 className="sec-title">Meet the contenders</h2>
        <div className="part-grid">
          <div className="tabs" role="tablist" aria-label="Categories">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
              >
                {c.label}<span>{pad(c.players.length)}</span>
              </button>
            ))}
          </div>
          <div className="panel" role="tabpanel">
            <ol>{sel.players.map((p, i) => <li key={p}><span>{pad(i + 1)}</span>{p}</li>)}</ol>
            <p className="note">Entry list supplied by ITE. Contact the organiser for entry updates.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rankings() {
  const [cat, setCat] = useState('open');
  return (
    <section className="dark-section" id="rankings">
      <div className="page-wrap">
        <h2 className="sec-title">Every point counts</h2>
        <div className="rankings-grid">
          <div className="rank-card">
            <div className="tabs tabs-row" role="tablist">
              {[['open', "Men's Open"], ['forty', "Men's 40+"]].map(([k, l]) => (
                <button key={k} role="tab" aria-selected={cat === k} onClick={() => setCat(k)}>
                  {l}
                </button>
              ))}
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th>Rank</th><th>Player</th><th>Points</th></tr>
                </thead>
                <tbody>
                  {sampleRankings[cat].map(([r, n, p]) => (
                    <tr key={n}><td>{r}</td><td>{n}</td><td>{p}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rankingsData.isPreview && (
              <p className="note"><ShieldCheck size={15} /> Preview data. Official ITE rankings follow the inaugural championship.</p>
            )}
          </div>

          <div className="contact-box" id="contact">
            <h3>Get in touch</h3>
            <p>For championship inquiries, registration updates, and partnerships:</p>
            <div className="contact-card-list">
              <div className="contact-person-card">
                <span className="contact-person-name">Pruthvi</span>
                <a className="contact-person-phone" href="tel:+919908744544">
                  <Phone size={14} /> 99087 44544
                </a>
              </div>
              <div className="contact-person-card">
                <span className="contact-person-name">Visakh VS</span>
                <a className="contact-person-phone" href="tel:+919908642864">
                  <Phone size={14} /> 99086 42864
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="light-section" id="about">
      <div className="page-wrap about">
        <h2 className="sec-title">More than a match</h2>
        <div>
          <p className="lead">ITE stands for Tennis Excellence, a platform for players who believe the game is always worth getting better at.</p>
          <p>Built around competition, community and respect for the sport, ITE brings players together through organised events. The inaugural championship at {EVENT.venue} marks the beginning.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-wrap">
        <div className="footer-main">
          <a href="#home" className="brand-logo"><img src="/ite-logo.png" alt="ITE" /></a>
          <p>Built for the love of tennis. Driven by the pursuit of excellence.</p>
          <div className="footer-contacts">
            <span>Contact: <b>Pruthvi</b> <a href="tel:+919908744544">99087 44544</a></span>
            <span className="footer-sep">•</span>
            <span><b>Visakh VS</b> <a href="tel:+919908642864">99086 42864</a></span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ITE Tennis Excellence</span>
          <nav aria-label="Footer">
            <a href="#championship">Championship</a>
            <a href="#sponsors">Sponsors</a>
            <a href="#about">About ITE</a>
            <a href="#contact">Contact</a>
            <a href="#/privacy">Privacy</a>
            <a href="#/terms">Terms</a>
            <a href="#/cookies">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const f = () => setHash(window.location.hash);
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  const Page = pageRoutes[hash];
  useEffect(() => {
    document.title = Page ? `${hash.slice(2)} | ITE Tennis Excellence` : 'ITE Tennis Excellence | Hyderabad';
    if (Page) window.scrollTo(0, 0);
  }, [hash, Page]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        {Page ? (
          <div className="legal-wrap"><Page /></div>
        ) : (
          <>
            <Hero />
            <Countdown />
            <Sponsors />
            <Participants />
            <Rankings />
            <About />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
