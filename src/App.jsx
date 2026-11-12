import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Download, Mail, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import { Privacy, Terms, Cookies } from './pages/LegalPages';
import { SITE } from './data/siteConfig';

import categoriesData from './content/categories.json';
import rankingsData from './content/rankings.json';
import sponsorsData from './content/sponsors.json';
import eventData from './content/event.json';
import contactData from './content/contact.json';

// Makes sure an image or file path from the admin always starts with "/"
const asset = (p) => (!p ? '' : /^(https?:)?\/\//.test(p) || p.startsWith('/') ? p : `/${p}`);

const EVENT = eventData;
const RULEBOOK = asset(EVENT.ruleBook);
const SPONSORS = (sponsorsData.items || []).slice(0, 3);
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const categories = categoriesData.items.map((c) => ({ ...c, id: c.id || slug(c.label) }));
const totalEntries = categories.reduce((n, c) => n + c.players.length, 0);
const PEOPLE = contactData.people || [];
const telHref = (p) => {
  const d = String(p).replace(/\D/g, '');
  return `tel:+${d.length === 10 ? '91' + d : d}`;
};

// Dates are worked out from the start and end dates set in the admin, always in India time
const dateParts = (iso) => {
  try {
    const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'long', year: 'numeric' });
    const p = Object.fromEntries(f.formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
    return { d: p.day, m: p.month, y: p.year };
  } catch (e) {
    return null;
  }
};
const fullDate = (iso) => {
  const p = dateParts(iso);
  return p ? `${p.d} ${p.m} ${p.y}` : '';
};
const shortDates = (a, b) => {
  const s = dateParts(a);
  if (!s) return '';
  const e = b ? dateParts(b) : null;
  const sm = s.m.slice(0, 3);
  if (!e || (e.d === s.d && e.m === s.m && e.y === s.y)) return `${s.d} ${sm}`;
  if (e.m === s.m && e.y === s.y) return `${s.d}–${e.d} ${sm}`;
  return `${s.d} ${sm} – ${e.d} ${e.m.slice(0, 3)}`;
};

// Works with the old two-table rankings file and the newer list of tables
const RANK_TABLES = rankingsData.tables || [
  { label: "Men's Open", rows: rankingsData.open || [] },
  { label: "Men's 40+", rows: rankingsData.forty || [] },
];
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
          <a className="pill pill-lime" href={RULEBOOK} target="_blank" rel="noreferrer">
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
            <small>{EVENT.edition}</small>
            <strong>{shortDates(EVENT.start, EVENT.end)}</strong>
            <span className="round-arrow"><ArrowUpRight size={14} /></span>
          </div>
          <img src="/schedule-img.jpg" alt="" />
        </a>
        <div className="card card-benefits">
          <h2>Discover the championship</h2>
          <div className="chips">
            {chips.map((c) => <span key={c}>{c}</span>)}
            <span className="chip-count">{categories.length} categories</span>
          </div>
          <a href="#participants">Explore</a>
        </div>
        <div className="card card-stat">
          <div className="card-stat-head">
            <h3>Players entered</h3>
            <span className="round-arrow"><ArrowUpRight size={14} /></span>
          </div>
          <small>Across all categories</small>
          <strong>{totalEntries}</strong>
          <em>Entries confirmed so far</em>
        </div>
        <a className="card card-video" href={RULEBOOK} target="_blank" rel="noreferrer">
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
              {['ITE', 'TENNIS', 'EXCELLENCE', 'CHAMPIONSHIP', (EVENT.edition || '').toUpperCase()].map((w) => (
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
                <strong>{fullDate(EVENT.start)}</strong>
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
          <p>Knockouts commence at <b>{EVENT.knockoutsAt}</b>. No coaching, and every player calls their own lines.</p>
          <ul>{rules.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ul>
          <a className="pill pill-dark" href={RULEBOOK} target="_blank" rel="noreferrer">
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

        {/* Sponsor logos, taken from the admin (first three sponsors) */}
        {SPONSORS.map((s, i) => (
          <img key={s.name + i} className={`spons-photo sp-${i + 1}`} src={asset(s.image)} alt={s.name} />
        ))}

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
          {SPONSORS.map((s, i) => (
            <img key={s.name + i} src={asset(s.image)} alt={s.name} />
          ))}
        </div>

        <div className="spons-text">
          <p>The partners backing {EVENT.edition} of the Tennis Excellence Championship, and the players who compete in it.</p>
          <a href="#about">Discover more</a>
        </div>
      </div>
    </section>
  );
}

function Participants() {
  const [active, setActive] = useState(categories[0]?.id);
  const sel = categories.find((c) => c.id === active) || categories[0];
  if (!sel) return null;
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
                aria-selected={sel.id === c.id}
                onClick={() => setActive(c.id)}
              >
                {c.label}<span>{pad(c.players.length)}</span>
              </button>
            ))}
          </div>
          <div className="panel" role="tabpanel">
            <ol>{sel.players.map((p, i) => <li key={p + i}><span>{pad(i + 1)}</span>{p}</li>)}</ol>
            <p className="note">Entry list supplied by ITE. Contact the organiser for entry updates.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rankings() {
  const [idx, setIdx] = useState(0);
  const table = RANK_TABLES[idx] || RANK_TABLES[0];
  const rows = (table && table.rows) || [];
  return (
    <section className="dark-section" id="rankings">
      <div className="page-wrap">
        <h2 className="sec-title">Every point counts</h2>
        <div className="rankings-grid">
          <div className="rank-card">
            <div className="tabs tabs-row" role="tablist">
              {RANK_TABLES.map((t, i) => (
                <button key={t.label + i} role="tab" aria-selected={idx === i} onClick={() => setIdx(i)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th>Rank</th><th>Player</th><th>Points</th></tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.name + i}><td>{r.rank}</td><td>{r.name}</td><td>{r.points}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rankingsData.isPreview && (
              <p className="note"><ShieldCheck size={15} /> Preview data. Official ITE rankings will be published here once confirmed.</p>
            )}
          </div>

          <div className="contact-box" id="contact">
            <h3>Get in touch</h3>
            <p>For championship inquiries, registration updates, and partnerships:</p>
            <div className="contact-card-list">
              {PEOPLE.map((p, i) => (
                <div className="contact-person-card" key={p.name + i}>
                  <span className="contact-person-name">{p.name}</span>
                  {p.phone && (
                    <a className="contact-person-phone" href={telHref(p.phone)}>
                      <Phone size={14} /> {p.phone}
                    </a>
                  )}
                  {p.email && (
                    <a className="contact-person-phone" href={`mailto:${p.email}`}>
                      <Mail size={14} /> {p.email}
                    </a>
                  )}
                </div>
              ))}
              {contactData.email && (
                <div className="contact-person-card">
                  <span className="contact-person-name">Email</span>
                  <a className="contact-person-phone" href={`mailto:${contactData.email}`}>
                    <Mail size={14} /> {contactData.email}
                  </a>
                </div>
              )}
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
          <p>Built around competition, community and respect for the sport, ITE brings players together through organised events. {EVENT.edition} of the championship takes place at {EVENT.venue}.</p>
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
          {PEOPLE.length > 0 && (
            <div className="footer-contacts">
              {PEOPLE.map((p, i) => (
                <React.Fragment key={p.name + i}>
                  {i > 0 && <span className="footer-sep">•</span>}
                  <span>
                    {i === 0 && 'Contact: '}<b>{p.name}</b>{' '}
                    {p.phone && <a href={telHref(p.phone)}>{p.phone}</a>}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
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