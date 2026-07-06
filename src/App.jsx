import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Archive, BrainCircuit, Boxes, CheckCircle2, Fingerprint, GitBranch, PlugZap, Route,
  Scale, ShieldCheck, UsersRound, Wallet, LineChart, Gauge, RefreshCw, Coins
} from 'lucide-react';
import './styles.css';

const features = [
  ['Auto-file documents', 'Titles, tags, correspondent, document type, dates and custom fields without prompt tinkering.', Archive],
  ['Live cost insights', 'A dashboard estimates your AI spend per document and in total, split into input vs output, so you always know what filing costs.', Wallet],
  ['Person assignment', 'Learns Paperless users and routes documents to people, teams, or departments automatically.', UsersRound],
  ['Any model, live prices', 'OpenAI, OpenRouter, Ollama, LM Studio and more. Token prices are pulled live from models.dev, so cost estimates cover new models automatically.', BrainCircuit],
  ['Built for OCR context', 'Uses document text, metadata and visual thumbnails when available to improve decisions.', Fingerprint],
  ['Self-host friendly', 'Docker-first, simple volumes, no SaaS lock-in, designed for homelabs and small teams.', Boxes],
];

const steps = [
  'Connect Paperless-ngx',
  'Pick cloud or local AI',
  'Enable the metadata you want',
  'Let Tagvico file new documents',
];

const comparisons = [
  ['Newer model support', 'OpenAI Direct exposes GPT-5.5, GPT-5.4, Mini, Nano, and GPT-5.3; OpenRouter and Ollama stay flexible for fresh models.'],
  ['Know what it costs', 'A built-in cost estimate — with live pricing from models.dev — turns token usage into real dollars, per document and overall.'],
  ['Cleaner setup', 'Paperless discovery, one token, curated model choices, a progress bar that never starts at zero, and advanced settings hidden until you need them.'],
  ['Safer person assignment', 'Reads Paperless users and assigns owners only when there is one clear match instead of guessing.'],
  ['Modern filing UX', 'Dashboard, provider picker, model discovery, guardrails, and custom fields are designed as one workflow rather than bolted-on prompts.'],
  ['Fully typed & tested', 'A strict TypeScript codebase with a growing test suite, so the filing engine stays predictable as it evolves.'],
];

const costMetrics = [
  ['Estimated spend', '$0.02', 'across 900 filed documents', Coins],
  ['Per document', '$0.00002', 'input + output tokens', Gauge],
  ['Manual filing', '$900', 'you saved ~ $899.98', Wallet],
];

const costBars = [
  ['Input tokens', 72, '#8b5cf6'],
  ['Output tokens', 28, '#22c55e'],
];

function App() {
  const page = window.location.pathname;

  if (page === '/privacy') {
    return <LegalPage type="privacy" />;
  }

  if (page === '/terms') {
    return <LegalPage type="terms" />;
  }

  return (
    <main>
      <nav className="nav">
        <div className="brand"><img src="/tagvico-icon.png" alt="Tagvico AI" /> Tagvico</div>
        <div className="navlinks">
          <a href="#features">Features</a>
          <a href="#insights">Cost insights</a>
          <a href="#setup">Setup</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="https://github.com/arturict/tagvico-ai">GitHub</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <h1>Stop sorting documents by hand.</h1>
          <p className="lead">Tagvico AI is a ground-up AI extension for Paperless-ngx that reads incoming documents, writes useful metadata back, assigns them to the right person, and shows you exactly what it costs — with almost no setup.</p>
          <div className="actions">
            <a className="button primary" href="https://github.com/arturict/tagvico-ai"><GitBranch size={18} /> View on GitHub</a>
            <a className="button" href="#insights"><LineChart size={18} /> See the dashboard</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="window-dots"><span/><span/><span/></div>
          <div className="scan-card active"><CheckCircle2/> invoice-may.pdf <b>assigned to owner</b></div>
          <div className="scan-card"><CheckCircle2/> health-letter.pdf <b>tagged: insurance</b></div>
          <div className="scan-card"><CheckCircle2/> rental-contract.pdf <b>type: contract</b></div>
          <div className="scan-cost"><Wallet size={15}/> Filing cost so far <b>~ $0.02</b></div>
        </div>
      </section>

      <section id="features" className="features">
        {features.map(([title, copy, Icon]) => <article className="feature" key={title}><Icon/><h3>{title}</h3><p>{copy}</p></article>)}
      </section>

      <section id="insights" className="insights">
        <div>
          <p className="kicker"><LineChart size={16} /> New: cost insights</p>
          <h2>See what AI filing actually costs.</h2>
          <p className="lead small">The dashboard turns tracked token usage into a clear, honest estimate — total spend, cost per document, and the input-vs-output split. Local models show as free, and every price is anchored against what manual filing would have cost.</p>
          <ul className="insight-points">
            <li><Coins size={16}/> Total and per-document spend at a glance</li>
            <li><RefreshCw size={16}/> Live token prices from models.dev — no hardcoded list</li>
            <li><ShieldCheck size={16}/> Clearly an estimate, never billed against you</li>
          </ul>
        </div>

        <div className="cost-card">
          <div className="window-dots"><span/><span/><span/></div>
          <div className="cost-metrics">
            {costMetrics.map(([label, value, sub, Icon]) => (
              <div className="cost-metric" key={label}>
                <span className="cost-metric-label"><Icon size={14}/> {label}</span>
                <span className="cost-metric-value">{value}</span>
                <span className="cost-metric-sub">{sub}</span>
              </div>
            ))}
          </div>
          <div className="cost-split">
            <div className="cost-split-head"><span>Token cost split</span><span>GPT-5.4 mini</span></div>
            {costBars.map(([label, pct, color]) => (
              <div className="cost-bar-row" key={label}>
                <span className="cost-bar-label">{label}</span>
                <span className="cost-bar-track"><span className="cost-bar-fill" style={{ width: pct + '%', background: color }} /></span>
                <span className="cost-bar-pct">{pct}%</span>
              </div>
            ))}
          </div>
          <p className="cost-foot">List price $0.75 / $4.50 per 1M input/output tokens &middot; actual billing may differ</p>
        </div>
      </section>

      <section id="setup" className="setup">
        <div>
          <p className="kicker">Minimal setup</p>
          <h2>From zero to filed documents in minutes.</h2>
          <p className="lead small">Tagvico is intentionally opinionated: the app owns the filing prompt and exposes simple controls instead of making you become a prompt engineer. Onboarding starts with real momentum — the progress bar credits you the moment you begin.</p>
        </div>
        <div className="steps">
          {steps.map((step, i) => <div className="step" key={step}><span>{i + 1}</span>{step}</div>)}
        </div>
      </section>

      <section className="comparison">
        <div>
          <p className="kicker">Why Tagvico</p>
          <h2>Built after Paperless GPT and Paperless AI, with current model workflows in mind.</h2>
          <p className="lead small">Tagvico keeps the useful idea of automatic Paperless filing, then modernizes the model layer, cost visibility, onboarding, owner matching, and day-to-day controls.</p>
        </div>
        <div className="comparison-grid">
          {comparisons.map(([title, copy]) => <article className="feature compact" key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="model-strip">
        <span>GPT-5.5</span><span>GPT-5.4</span><span>Claude</span><span>Gemini</span><span>OpenRouter</span><span>Ollama</span><span>models.dev pricing</span><span>Paperless-ngx</span>
      </section>

      <footer className="footer-links">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms of Service</a>
        <a href="https://github.com/arturict/tagvico-ai">GitHub</a>
      </footer>
    </main>
  );
}

function LegalPage({ type }) {
  const isPrivacy = type === 'privacy';
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="/"><img src="/tagvico-icon.png" alt="Tagvico AI" /> Tagvico</a>
        <div className="navlinks">
          <a href="/">Home</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </nav>

      <section className="legal">
        <p className="kicker">{isPrivacy ? <ShieldCheck size={16} /> : <Scale size={16} />} {isPrivacy ? 'Privacy' : 'Terms'}</p>
        <h1>{isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</h1>
        <p className="lead small">Last updated: May 31, 2026</p>

        {isPrivacy ? <PrivacyContent /> : <TermsContent />}
      </section>
    </main>
  );
}

function PrivacyContent() {
  return (
    <div className="legal-card">
      <h2>Self-hosted by design</h2>
      <p>Tagvico AI is software you run yourself. This website does not process your documents, OCR text, Paperless data, or API keys.</p>
      <h2>Data handled by the app</h2>
      <p>The app connects to your Paperless-ngx instance and your chosen AI provider. Document text and metadata may be sent to that provider when you enable processing.</p>
      <h2>Model pricing lookups</h2>
      <p>To show cost estimates, the app fetches public, non-personal token prices from models.dev and caches them locally. No document content or credentials are sent in that request.</p>
      <h2>API keys</h2>
      <p>Keys are stored in your own deployment configuration. Do not expose your deployment publicly without authentication and transport security.</p>
      <h2>Website analytics</h2>
      <p>This landing page currently has no analytics, tracking pixels, newsletter forms, or advertising cookies.</p>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="legal-card">
      <h2>No managed service</h2>
      <p>Tagvico AI is provided as self-hosted software. The public website is informational and does not provide a hosted document-processing service.</p>
      <h2>Cost estimates are informational</h2>
      <p>The in-app cost figures are best-effort estimates based on public list prices and tracked token counts. They are not a bill and may differ from what your provider actually charges.</p>
      <h2>Your responsibility</h2>
      <p>You are responsible for your deployment, credentials, backups, documents, provider selection, and compliance obligations.</p>
      <h2>No warranty</h2>
      <p>The software is provided as-is under its open-source license. AI output can be wrong and should be reviewed for important workflows.</p>
      <h2>Provider terms</h2>
      <p>If you connect OpenAI, OpenRouter, Ollama, or another provider, their own terms and privacy policies apply to that connection.</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
