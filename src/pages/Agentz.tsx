import { useEffect } from 'react';
import { Link } from 'react-router';
import { agentz, site } from '../content';

const FEATURES = [
  { k: 'real-time', t: 'Chat & live notifications', d: 'SignalR hubs push messages and alerts to agents the moment they happen.' },
  { k: 'search', t: '100K+ households, instantly', d: 'Elasticsearch on its own machine, synced with SQL Server every second, so new and removed leads show up right away.' },
  { k: 'auth', t: 'JWT + TOTP sign-in', d: 'Token auth with two-factor codes, plus isolated portal auth for customer landing pages.' },
  { k: 'documents', t: 'Generated PDFs', d: "Playwright renders polished PDFs straight from the app's own views, stored in Azure Blob Storage." },
  { k: 'integrations', t: 'Lead webhooks', d: 'Smart Financial and EverQuote leads flow in automatically, with payload and routing bugs worked out.' },
  { k: 'ops', t: 'CI/CD & observability', d: 'GitHub Actions on a self-hosted runner deploys the on-prem Docker Compose stack, and Seq handles structured logs and alerts.' },
];

const STATS = [
  { n: '100K+', c: 'household records indexed for search' },
  { n: '295K+', c: 'records migrated from V1 to V2' },
  { n: '80%+', c: 'lower monthly hosting cost after leaving Azure' },
  { n: '2', c: 'lead sources wired in by webhook' },
  { n: '1', c: 'developer, start to finish', hot: true },
];

export default function Agentz() {
  useEffect(() => {
    document.title = `Agentz — Case study · ${site.name}`;
  }, []);

  return (
    <>
      <header className="site-header">
        <nav className="wrap site-nav" aria-label="Main">
          <Link to="/" className="navlink" style={{ minHeight: 44, display: 'flex', alignItems: 'center' }}>← back to all work</Link>
          <span style={{ color: 'var(--dim)' }}>~/work/agentz</span>
          <Link to="/" className="monogram" aria-label="Home">JH</Link>
        </nav>
      </header>

      <main>
        <section className="cs-hero">
          <div className="gridbg" aria-hidden="true" />
          <div className="wrap cs-hero-inner">
            <div className="eyebrow label" style={{ gap: 12, flexWrap: 'wrap' }}>
              <span className="badge">LIVE IN PRODUCTION</span>
              <span>case study · 01</span>
            </div>
            <h1>Agentz</h1>
            <p className="cs-hero-lede">
              A production CRM for insurance agents. I designed, built, deployed and kept it running as the only developer.
            </p>
            <div className="meta-grid">
              <div><small>Role</small><span>Sole developer</span></div>
              <div><small>Company</small><span>Allstate</span></div>
              <div><small>Timeline</small><span>{agentz.timeline}</span></div>
              <div><small>Stack</small><span>C# · .NET 8 · React · SQL Server</span></div>
            </div>
          </div>
        </section>

        <section className="wrap" style={{ paddingTop: 64 }}>
          <figure className="figure" style={{ margin: 0 }}>
            <figcaption className="figure-cap">
              <span>fig. 01 — system architecture</span>
              <span>every box here, I built and ran</span>
            </figcaption>
            <div className="figure-scroll">
              <Architecture />
            </div>
          </figure>
        </section>

        <section className="wrap split" style={{ paddingTop: 96, paddingBottom: 96 }}>
          <div className="split-side label">01 — the problem</div>
          <div className="split-main"><p className="big-para">{agentz.problem}</p></div>
        </section>

        <section className="wrap split" style={{ paddingBottom: 96 }}>
          <div className="split-side label">02 — what I built</div>
          <div className="split-main cell-grid features">
            {FEATURES.map((f) => (
              <div key={f.k} className="cell">
                <span className="kicker">{f.k}</span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap" style={{ paddingBottom: 96 }}>
          <div className="cell-grid stats">
            {STATS.map((s) => (
              <div key={s.c} className={`cell${s.hot ? ' is-hot' : ''}`} style={{ gap: 8 }}>
                <span className="big">{s.n}</span>
                <span className="cap">{s.c}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="band">
          <div className="wrap split" style={{ paddingTop: 96, paddingBottom: 96 }}>
            <div className="split-side">
              <span className="label">03 — infrastructure</span>
              <h2>Owning the whole stack.</h2>
            </div>
            <div className="split-main migrations">
              <Migration
                before={['Azure SQL', 'read and write traffic racked up egress fees']}
                after={['SQL Server in Docker, on-prem', 'self-hosted, with no egress fees']}
              />
              <Migration
                before={['Backend on Azure', 'easy to run, but added to the monthly bill']}
                after={['Docker + Kestrel behind a Cloudflare Tunnel', 'repeatable builds, certificates handled by Cloudflare']}
              />
              <p className="cost-line">
                Monthly hosting went from <b>$600+</b> on Azure to <b>under $100</b> <span style={{ whiteSpace: 'nowrap' }}>on-prem.</span>
              </p>
            </div>
          </div>
        </section>

        <section className="wrap split" style={{ paddingTop: 96, paddingBottom: 96 }}>
          <div className="split-side">
            <span className="label">04 — problems I solved</span>
            <h2>Production is where the interesting problems live.</h2>
          </div>
          <div className="split-main bugs">
            {agentz.bugs.map((b) => (
              <div key={b.id} className="bug">
                <span className="id">[{b.id}]</span>
                <div><b>{b.title}</b><span>{b.body}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-end">
          <div className="wrap cs-end-inner">
            <Link to="/" className="navlink mono" style={{ fontSize: 13, minHeight: 44, display: 'flex', alignItems: 'center' }}>← all work</Link>
            <Link to="/#contact" className="cta-big">
              <small>want this on your team?</small>
              <span>Get in touch →</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function Migration({ before, after }: { before: [string, string]; after: [string, string] }) {
  return (
    <div className="migration">
      <div className="mig-box"><small>BEFORE</small><b>{before[0]}</b><span>{before[1]}</span></div>
      <div className="mig-arrow" aria-hidden="true">→</div>
      <div className="mig-box after"><small>AFTER</small><b>{after[0]}</b><span>{after[1]}</span></div>
    </div>
  );
}

type NodeDef = { x: number; y: number; w: number; title: string; sub: string; core?: boolean };

// Canvas is 1088 x 432. Left: public/cloud side. Dashed zone: on-prem servers.
const NODES: NodeDef[] = [
  { x: 24, y: 120, w: 192, title: 'React front end', sub: 'Azure Static Web Apps' },
  { x: 24, y: 264, w: 192, title: 'Lead webhooks', sub: 'Smart Financial · EverQuote' },
  { x: 264, y: 40, w: 168, title: 'Azure Blob Storage', sub: 'documents' },
  { x: 264, y: 180, w: 168, title: 'Cloudflare Tunnel', sub: 'public API endpoint' },
  { x: 520, y: 168, w: 232, title: '.NET 8 API', sub: 'EF Core · SignalR hubs · JWT/TOTP', core: true },
  { x: 536, y: 40, w: 200, title: 'Playwright', sub: 'PDF generation' },
  { x: 840, y: 64, w: 216, title: 'SQL Server', sub: 'in Docker, on-prem' },
  { x: 840, y: 180, w: 216, title: 'Elasticsearch', sub: 'own machine · 1s sync' },
  { x: 840, y: 296, w: 216, title: 'Seq', sub: 'structured logs + alerts' },
];

function Architecture() {
  return (
    <div
      className="arch"
      role="img"
      aria-label="Architecture: a React front end on Azure Static Web Apps and incoming lead webhooks reach an on-prem C# .NET 8 API through a Cloudflare Tunnel, over HTTPS and WebSockets. On-prem, the API connects to SQL Server, Elasticsearch and Seq under Docker Compose, and uses Playwright to generate PDFs that are stored in Azure Blob Storage."
    >
      <div className="zone" />
      <svg width="1088" height="432" viewBox="0 0 1088 432" aria-hidden="true" fill="none" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <marker id="arrow" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
            <path d="M0 0 L4 2 L0 4 Z" fill="#8A8A8A" stroke="none" />
          </marker>
        </defs>
        {/* front end + webhooks -> tunnel */}
        <path d="M216 156 L240 156 L240 216 L259 216" markerEnd="url(#arrow)" />
        <path d="M216 300 L240 300 L240 216" />
        {/* tunnel -> API */}
        <path d="M432 216 L515 216" markerEnd="url(#arrow)" />
        {/* API -> Playwright -> Blob */}
        <path d="M636 168 L636 117" markerEnd="url(#arrow)" />
        <path d="M536 76 L437 76" markerEnd="url(#arrow)" />
        {/* API -> data stores */}
        <path d="M752 216 L835 216" markerEnd="url(#arrow)" />
        <path d="M796 100 L796 332" />
        <path d="M796 100 L835 100" markerEnd="url(#arrow)" />
        <path d="M796 332 L835 332" markerEnd="url(#arrow)" />
      </svg>
      {NODES.map((n) => (
        <div key={n.title} className={`node${n.core ? ' core' : ''}`} style={{ left: n.x, top: n.y, width: n.w }}>
          <span><b>{n.title}</b><small>{n.sub}</small></span>
        </div>
      ))}
      <div className="edge-label">HTTPS<br />+ WS</div>
      <div className="zone-label">ON-PREM · DOCKER COMPOSE</div>
    </div>
  );
}
