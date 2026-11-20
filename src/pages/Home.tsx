import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { experience, projects, site, stack, type Project } from '../content';
import TypedHeadline from '../components/TypedHeadline';

const HEADLINE_PHRASES = ['production CRMs.', 'internal tools.', 'study apps.', 'rovers.'];

const MODULES = [
  { num: '01 / chat', title: 'Real-time chat', sub: 'SignalR hubs', hot: true },
  { num: '02 / search', title: 'Household search', sub: 'Elasticsearch · 100K+' },
  { num: '03 / auth', title: 'JWT + TOTP', sub: 'two-factor sign-in' },
  { num: '04 / portals', title: 'Customer pages', sub: 'isolated portal auth' },
  { num: '05 / docs', title: 'PDF engine', sub: 'Playwright · Azure Blob' },
  { num: '06 / leads', title: 'Lead webhooks', sub: 'Smart Financial · EverQuote' },
];

const SEABOARD = [
  { k: 'invoicing', t: 'Invoicing app, from scratch', d: 'Tracks invoices and new orders, with a dispute workflow for flagging and resolving contested line items.' },
  { k: 'procurement', t: 'Multi-office purchase orders', d: 'Took over an in-progress procurement system and added multi-office support and billing office assignment, so orders route and report correctly across locations.' },
  { k: 'approvals', t: 'Spend-based approval routing', d: 'Routes each order to the right approver by spend threshold and classifies purchases as tangible or non-tangible, with CQRS keeping routing rules separate from request handling.' },
];

export default function Home() {
  const shown = projects.filter((p) => !p.hidden);

  useEffect(() => {
    document.title = `${site.name} — Full-stack engineer`;
  }, []);

  return (
    <>
      <header className="site-header">
        <nav className="wrap site-nav" aria-label="Main">
          <a href="#top" className="brand">
            <span className="monogram">JH</span>
            <span className="mono">{site.handle}</span>
          </a>
          <div className="nav-links">
            <a className="navlink" href="#work">/work</a>
            <a className="navlink" href="#about">/about</a>
            <a className="navlink" href="#contact">/contact</a>
            {site.resumeUrl && (
              <a className="nav-cta" href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé ↗</a>
            )}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className="hero">
          <div className="gridbg" aria-hidden="true" />
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <div className="eyebrow label">
                <span className="dot" />
                <span>// full-stack engineer · miramar, fl · open to internships</span>
              </div>
              <TypedHeadline prefix="I build" phrases={HEADLINE_PHRASES} />
              <p className="hero-lede">
                .NET and TypeScript developer, sole engineer behind a production CRM. Starting an M.S. in
                Robotics at UCF in Spring 2027, and wiring up ESP32s and hoverboard motors in the meantime.
              </p>
              <div className="actions">
                <a href="#work" className="btn btn-primary">See the work →</a>
                <a href={site.github} className="btn" target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
            </div>

            <div className="terminal" role="img" aria-label="Terminal showing Jordan's stack and current status">
              <div className="terminal-bar">
                <i /><i /><i />
                <span>~/jordan — zsh</span>
              </div>
              <div className="terminal-body">
                <div><span className="accent">~ $</span> whoami</div>
                <div className="muted">jordan hancock, full-stack engineer</div>
                <div className="gap"><span className="accent">~ $</span> cat stack.txt</div>
                <div className="muted">C# · ASP.NET Core · EF Core · SQL Server</div>
                <div className="muted">TypeScript · React · Angular</div>
                <div className="muted">Docker · SignalR · Elasticsearch · Playwright</div>
                <div className="gap"><span className="accent">~ $</span> status --now</div>
                <div>● open to internships</div>
                <div className="muted">◐ building: esp32 sunrise clock, campus rover</div>
                <div className="muted">→ next: m.s. robotics @ ucf, spring '27</div>
                <div className="gap"><span className="accent">~ $</span> <span className="cursor" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {stack.concat(stack).map((s, i) => (
              <span key={i}>{s}<span className="accent">✦</span></span>
            ))}
          </div>
        </div>

        {/* Featured */}
        <section className="wrap featured">
          <div className="featured-top">
            <div className="label">01 — featured</div>
            <div className="label" style={{ color: 'var(--dim)' }}>professional · in production</div>
          </div>
          <article className="card feature">
            <div className="feature-map">
              <div className="feature-map-top">
                <span>SYSTEM MAP · AGENTZ</span>
                <span className="badge">LIVE IN PRODUCTION</span>
              </div>
              <div className="module-grid">
                {MODULES.map((m) => (
                  <div key={m.num} className={`module${m.hot ? ' is-hot' : ''}`}>
                    <span className="num">{m.num}</span>
                    <span><strong>{m.title}</strong><small>{m.sub}</small></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="feature-body">
              <div>
                <h2>Agentz</h2>
                <p>
                  A full production CRM for insurance agents at Allstate, built end to end as the only developer:
                  real-time chat, search over the whole book of business, client portals, and the deployment
                  pipeline under it.
                </p>
              </div>
              <div className="stat-list">
                <div className="stat-row"><b>100K+</b><span>household records searchable in Elasticsearch</span></div>
                <div className="stat-row"><b>295K+</b><span>records migrated V1 → V2 with no data loss</span></div>
                <div className="stat-row"><b>1</b><span>developer, from schema to CI/CD</span></div>
              </div>
              <div className="tags">
                {['C# / .NET 8', 'React', 'SignalR', 'Elasticsearch', 'SQL Server', 'Docker'].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <Link to="/work/agentz" className="read-more">Read the case study <span>→</span></Link>
            </div>
          </article>

          <article className="card seaboard">
            <div className="seaboard-head">
              <div className="seaboard-meta">
                <span>SEABOARD MARINE · CONTRACT</span>
                <span>APR 2026 – OCT 2026</span>
              </div>
              <h2>Internal tools on .NET</h2>
              <p>Full-stack .NET developer building and extending the systems that track company invoices and purchase orders.</p>
            </div>
            <div className="cell-grid seaboard-grid">
              {SEABOARD.map((s) => (
                <div key={s.k} className="cell">
                  <span className="kicker">{s.k}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
            <div className="tags">
              {['ASP.NET Core Minimal APIs', 'EF Core', 'Angular', 'TypeScript', 'CQRS'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </article>
        </section>

        {/* Work bench */}
        <section id="work" className="wrap work">
          <div className="section-head">
            <div>
              <div className="label">02 — the work bench</div>
              <h2>Side projects, shipped and in progress.</h2>
            </div>
          </div>
          <div className="project-grid">
            {shown.map((p) => (
              <ProjectCard key={p.num} p={p} />
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="about">
          <div className="wrap about-inner">
            <div className="about-side">
              <div className="label">03 — about</div>
              <div className="portrait ph">
                {site.portrait ? <img src={site.portrait} alt="Jordan Hancock" /> : <span aria-hidden="true">PHOTO · 4:5 portrait</span>}
              </div>
            </div>
            <div className="about-main">
              <p>
                I'm Jordan, a full-stack developer in South Florida. I studied computer science at FIU and have
                spent my career so far on production systems: first as the only engineer on a CRM at Allstate,
                then building internal tools on .NET at Seaboard Marine. In Spring 2027 I start a master's in
                robotics at UCF.{' '}
                <span className="muted">
                  Until then I'm learning hardware on my own: ESP32s, motor drivers, and whatever I can salvage
                  from a broken hoverboard.
                </span>
              </p>
              <div className="timeline">
                {experience.map((e) => (
                  <div key={e.org} className="timeline-row">
                    <b>{e.org}</b>
                    <span>{e.role}</span>
                    <time>{e.when}</time>
                  </div>
                ))}
              </div>
              <div className="tools">
                <span className="label">AI in the loop, human on the merge →</span>
                <div className="tags">
                  {['Claude Code', 'GitHub Copilot', 'Cursor'].map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const body = (
    <>
      <div className="project-media ph">
        {p.video ? (
          <video src={p.video} autoPlay muted loop playsInline />
        ) : p.image ? (
          <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
        ) : (
          <span className="media-label">{p.media}</span>
        )}
        <span className="pnum">{p.num}</span>
        <span className="pcat">{p.cat === 'hardware' ? 'HARDWARE' : 'SOFTWARE'}</span>
      </div>
      <div className="project-body">
        <div className="project-title">
          <h3>{p.title}{p.href && <span className="accent" aria-hidden="true"> ↗</span>}</h3>
          <span className={`status ${p.status}`}><i />{p.status}</span>
        </div>
        <p>{p.blurb}</p>
        <div className="tags">
          {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </>
  );
  return p.href ? (
    <a href={p.href} aria-label={`${p.title}, opens the live site`} className="card project" style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noreferrer">
      {body}
    </a>
  ) : (
    <article className="card project">{body}</article>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="gridbg" aria-hidden="true" />
      <div className="wrap contact-inner">
        <div className="label">04 — contact</div>
        <h2>Let's build<br /><span className="accent">something.</span></h2>
        <p className="contact-lede">
          I'm looking for an internship on a team that ships, alongside my robotics master's at UCF. Got a hard problem in .NET, TypeScript, or
          somewhere between software and hardware? Let's talk.
        </p>
        <div className="actions">
          <a href={`mailto:${site.email}`} className="btn btn-primary">{site.email} →</a>
          <a href={site.linkedin} className="btn" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={site.github} className="btn" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} {site.name}</span>
        </footer>
      </div>
    </section>
  );
}
