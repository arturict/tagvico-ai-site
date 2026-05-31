import React from 'react';
import { createRoot } from 'react-dom/client';
import { Archive, BrainCircuit, Boxes, CheckCircle2, Fingerprint, GitBranch, PlugZap, Route, Scale, ShieldCheck, UsersRound } from 'lucide-react';
import './styles.css';

const features = [
  ['Auto-file documents', 'Titles, tags, correspondent, document type, dates and custom fields without prompt tinkering.', Archive],
  ['Person assignment', 'Learns Paperless users and routes documents to people, teams, or departments automatically.', UsersRound],
  ['Fast onboarding', 'Scan Paperless-ngx, paste one API token, choose a model, start processing.', PlugZap],
  ['Model choice', 'OpenAI Direct, OpenRouter, Ollama, LM Studio and other OpenAI-compatible APIs.', BrainCircuit],
  ['Built for OCR context', 'Uses document text, metadata and visual thumbnails when available to improve decisions.', Fingerprint],
  ['Self-host friendly', 'Docker-first, simple volumes, no SaaS lock-in, designed for homelabs and small teams.', Boxes],
];

const steps = [
  'Connect Paperless-ngx',
  'Pick cloud or local AI',
  'Enable the metadata you want',
  'Let Archivista file new documents',
];

const comparisons = [
  ['Newer model support', 'OpenAI Direct exposes GPT-5.5, GPT-5.4, Mini, Nano, and GPT-5.3; OpenRouter and Ollama stay flexible for fresh models.'],
  ['Cleaner setup', 'Paperless discovery, one token, curated model choices, and advanced settings hidden until you need them.'],
  ['Safer person assignment', 'Reads Paperless users and assigns owners only when there is one clear match instead of guessing.'],
  ['Modern filing UX', 'Dashboard, provider picker, model discovery, guardrails, and custom fields are designed as one workflow rather than bolted-on prompts.'],
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
        <div className="brand"><img src="/archivista-icon.png" alt="Archivista AI" /> Archivista</div>
        <div className="navlinks">
          <a href="#features">Features</a>
          <a href="#setup">Setup</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="https://github.com/arturict/archivista-ai">GitHub</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <h1>Stop sorting documents by hand.</h1>
          <p className="lead">Archivista AI is a ground-up AI extension for Paperless-ngx that reads incoming documents, writes useful metadata back, and assigns them to the right person with almost no setup.</p>
          <div className="actions">
            <a className="button primary" href="https://github.com/arturict/archivista-ai"><GitBranch size={18} /> View on GitHub</a>
            <a className="button" href="#setup"><Route size={18} /> See setup flow</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="window-dots"><span/><span/><span/></div>
          <div className="scan-card active"><CheckCircle2/> invoice-may.pdf <b>assigned to owner</b></div>
          <div className="scan-card"><CheckCircle2/> health-letter.pdf <b>tagged: insurance</b></div>
          <div className="scan-card"><CheckCircle2/> rental-contract.pdf <b>type: contract</b></div>
        </div>
      </section>

      <section id="features" className="features">
        {features.map(([title, copy, Icon]) => <article className="feature" key={title}><Icon/><h3>{title}</h3><p>{copy}</p></article>)}
      </section>

      <section id="setup" className="setup">
        <div>
          <p className="kicker">Minimal setup</p>
          <h2>From zero to filed documents in minutes.</h2>
          <p className="lead small">Archivista is intentionally opinionated: the app owns the filing prompt and exposes simple controls instead of making you become a prompt engineer.</p>
        </div>
        <div className="steps">
          {steps.map((step, i) => <div className="step" key={step}><span>{i + 1}</span>{step}</div>)}
        </div>
      </section>

      <section className="comparison">
        <div>
          <p className="kicker">Why Archivista</p>
          <h2>Built after Paperless GPT and Paperless AI, with current model workflows in mind.</h2>
          <p className="lead small">Archivista keeps the useful idea of automatic Paperless filing, then modernizes the model layer, onboarding, owner matching, and day-to-day controls.</p>
        </div>
        <div className="comparison-grid">
          {comparisons.map(([title, copy]) => <article className="feature compact" key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="model-strip">
        <span>GPT-5.5</span><span>GPT-5.4</span><span>OpenRouter</span><span>Ollama</span><span>Paperless-ngx</span>
      </section>

      <footer className="footer-links">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms of Service</a>
        <a href="https://github.com/arturict/archivista-ai">GitHub</a>
      </footer>
    </main>
  );
}

function LegalPage({ type }) {
  const isPrivacy = type === 'privacy';
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="/"><img src="/archivista-icon.png" alt="Archivista AI" /> Archivista</a>
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
      <p>Archivista AI is software you run yourself. This website does not process your documents, OCR text, Paperless data, or API keys.</p>
      <h2>Data handled by the app</h2>
      <p>The app connects to your Paperless-ngx instance and your chosen AI provider. Document text and metadata may be sent to that provider when you enable processing.</p>
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
      <p>Archivista AI is provided as self-hosted software. The public website is informational and does not provide a hosted document-processing service.</p>
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
