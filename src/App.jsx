import React from 'react';
import { createRoot } from 'react-dom/client';
import { Archive, BrainCircuit, Boxes, CheckCircle2, Fingerprint, GitBranch, PlugZap, Route, Sparkles, UsersRound } from 'lucide-react';
import './styles.css';

const features = [
  ['Auto-file documents', 'Titles, tags, correspondent, document type, dates and custom fields without prompt tinkering.', Archive],
  ['Person assignment', 'Learns Paperless users and routes documents to people like Artur, Lukas or Finance automatically.', UsersRound],
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

function App() {
  return (
    <main>
      <nav className="nav">
        <div className="brand"><span>AI</span> Archivista</div>
        <div className="navlinks">
          <a href="#features">Features</a>
          <a href="#setup">Setup</a>
          <a href="https://github.com/arturict/paperlesser">GitHub</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="kicker"><Sparkles size={16} /> Paperless-ngx autopilot</p>
          <h1>Stop sorting documents by hand.</h1>
          <p className="lead">Archivista AI is a ground-up AI extension for Paperless-ngx that reads incoming documents, writes useful metadata back, and assigns them to the right person with almost no setup.</p>
          <div className="actions">
            <a className="button primary" href="https://github.com/arturict/archivista-ai"><GitBranch size={18} /> View on GitHub</a>
            <a className="button" href="#setup"><Route size={18} /> See setup flow</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="window-dots"><span/><span/><span/></div>
          <div className="scan-card active"><CheckCircle2/> invoice-may.pdf <b>assigned to Artur</b></div>
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

      <section className="model-strip">
        <span>OpenAI</span><span>OpenRouter</span><span>Ollama</span><span>LM Studio</span><span>Paperless-ngx</span>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
