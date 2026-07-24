import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Archive,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Database,
  FileText,
  GitBranch,
  KeyRound,
  Layers3,
  LockKeyhole,
  Network,
  RefreshCw,
  Route,
  ScanText,
  ShieldCheck,
  Sparkles,
  Tags,
  TimerReset,
  Workflow,
} from 'lucide-react';
import './styles.css';

const productFields = ['Title', 'Tags', 'Correspondent', 'Document type', 'Date', 'Language', 'Custom fields', 'Owner'];

const workflow = [
  {
    number: '01',
    title: 'Connect the archive you already trust',
    copy: 'Add your Paperless-ngx URL and API token, or use the built-in instance scan. Tagvico works through the official API and keeps Paperless as the source of truth.',
    Icon: Network,
  },
  {
    number: '02',
    title: 'Choose a live model boundary',
    copy: 'Discover models from a configured API, local Ollama, ChatGPT subscription, or GitHub Copilot account. Capabilities come from the runtime instead of a hardcoded list.',
    Icon: BrainCircuit,
  },
  {
    number: '03',
    title: 'Start with controlled automation',
    copy: 'Trigger tags are optional. Keep four tags as the default ceiling, reuse your existing vocabulary, add archive-specific instructions, and review changes before enabling Automatic mode.',
    Icon: Tags,
  },
  {
    number: '04',
    title: 'Ask, act, restore, and recover',
    copy: 'Research documents in persistent chats, turn letters into owned actions, inspect tool activity, restore original metadata, and recover failed or ignored documents.',
    Icon: ClipboardCheck,
  },
];

const reliability = [
  {
    title: 'Small, controlled taxonomies',
    copy: 'Tag Groups, existing-vocabulary mode, a four-tag default ceiling, and approval-first duplicate unification keep near-duplicates from taking over the archive.',
    Icon: Tags,
  },
  {
    title: 'A reversible write path',
    copy: 'Review first shows structured metadata changes before they land. Activity details, rescans, original snapshots, and exact restore make automation inspectable.',
    Icon: RefreshCw,
  },
  {
    title: 'Queues that do not forget',
    copy: 'AI and OCR work retries up to three times. Permanently failed and deliberately ignored documents stay visible and can be requeued without losing history.',
    Icon: TimerReset,
  },
];

const providers = [
  {
    label: 'Cloud routing',
    title: 'OpenRouter',
    copy: 'Configure a write-only API key and choose from the live model catalog returned by your account.',
    note: 'Live catalog · Vercel AI SDK',
    Icon: Cloud,
    featured: true,
  },
  {
    label: 'Local or hosted',
    title: 'Ollama',
    copy: 'Use a local or remote Ollama endpoint, or configure Ollama Cloud as its own independent runtime.',
    note: 'Ollama · Ollama Cloud',
    Icon: Database,
  },
  {
    label: 'Compatible API',
    title: 'OpenCode Go',
    copy: 'Use OpenCode Go through the shared OpenAI-compatible inference contract and its discovered model catalog.',
    note: 'Write-only key · live catalog',
    Icon: KeyRound,
  },
  {
    label: 'Account sign-in',
    title: 'GitHub Copilot',
    copy: 'Authenticate through the official Copilot SDK and choose only models exposed by the signed-in plan.',
    note: 'Device authentication · official SDK',
    Icon: GitBranch,
  },
  {
    label: 'Bring your endpoint',
    title: 'CLI Proxy / Compatible',
    copy: 'Connect CLIProxyAPI, LiteLLM, vLLM, LM Studio, or another OpenAI-compatible endpoint without a provider-specific UI fork.',
    note: 'Custom base URL · live catalog',
    Icon: Route,
  },
  {
    label: 'Native API',
    title: 'OpenAI',
    copy: 'Use the native OpenAI adapter with a write-only key, live account catalog, and model-specific capabilities.',
    note: 'Vercel AI SDK · live catalog',
    Icon: Cloud,
  },
  {
    label: 'Account sign-in',
    title: 'ChatGPT subscription',
    copy: 'Use the official Codex runtime and choose from the model list and reasoning efforts returned by the signed-in account.',
    note: 'Device authentication · live account catalog',
    Icon: KeyRound,
  },
  {
    label: 'Hosted Ollama',
    title: 'Ollama Cloud',
    copy: 'Keep hosted Ollama credentials, discovery, and selection separate from your local Ollama runtime.',
    note: 'Independent runtime · write-only key',
    Icon: Database,
  },
];

const releaseNotes = [
  ['One coherent application', 'Actions, Ask Tagvico, Automation, Activity, recovery, manual processing, setup, and Settings share the same green React shell.'],
  ['Runtime model catalogs', 'Eight supported runtimes expose live models and per-model options; embedding-only entries are filtered from chat in v3.1.2.'],
  ['Useful automation defaults', 'Trigger tags are optional, four tags is the default ceiling, and manual scans report exact eligibility and outcomes.'],
  ['Recoverable by design', 'Persistent chat, visible tool activity, exact restore, bounded retries, and failed/ignored queues make problems understandable.'],
];

function ExternalArrow() {
  return <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />;
}

function App() {
  const page = window.location.pathname;

  if (page === '/privacy') return <LegalPage type="privacy" />;
  if (page === '/terms') return <LegalPage type="terms" />;

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Tagvico home">
          <img src="/tagvico-icon.png" alt="" />
          <span>Tagvico</span>
        </a>
        <div className="nav-center">
          <a href="#product">Product</a>
          <a href="#workflow">Workflow</a>
          <a href="#providers">Providers</a>
          <a href="#reliability">Reliability</a>
          <a href="/docs/">Docs</a>
        </div>
        <a className="nav-github" href="https://github.com/arturict/tagvico-ai">
          <GitBranch size={15} aria-hidden="true" /> <span>Source</span>
        </a>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow-row">
            <p className="eyebrow"><span className="pulse-dot" /> Tagvico v3.1.2</p>
            <span className="alpha-chip">Stable</span>
          </div>
          <h1 id="hero-title">Documents in.<br /><em>Useful work out.</em></h1>
          <p className="hero-lead">Tagvico turns Paperless-ngx documents into clean metadata, persistent research conversations, assigned actions, deadlines, and recoverable automation — without replacing the archive you already trust.</p>
          <p className="hero-detail">Use local Ollama, a hosted API, ChatGPT subscription, or GitHub Copilot. Models and reasoning options come from each configured runtime, while sensitive writes remain visible and under your control.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="https://github.com/arturict/tagvico-ai#quick-start">
              Install v3.1.2 <ExternalArrow />
            </a>
            <a className="button button-docs" href="/docs/">
              Read the docs <ChevronRight size={16} aria-hidden="true" />
            </a>
            <a className="text-link" href="#release">What&apos;s new in v3.1.2 <ChevronRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="trust-row" aria-label="Project attributes">
            <span><ShieldCheck size={15} aria-hidden="true" /> Self-hosted</span>
            <span><LockKeyhole size={15} aria-hidden="true" /> MIT licensed</span>
            <span><Archive size={15} aria-hidden="true" /> Paperless-native</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Illustration of Tagvico reviewing a Paperless document">
          <div className="corner-label top-label">INBOX / 0042</div>
          <div className="archive-window">
            <div className="window-topbar">
              <div className="window-mark"><span /><span /><span /></div>
              <span>paperless → tagvico</span>
              <span className="live-state"><i /> scanning</span>
            </div>
            <div className="document-sheet">
              <div className="document-topline">
                <span className="file-mark"><FileText size={15} aria-hidden="true" /> PDF</span>
                <span>14 JUN 2026</span>
              </div>
              <h2>electricity<br />invoice_06.pdf</h2>
              <div className="redacted-lines"><i /><i /><i /><i /></div>
              <div className="scan-stamp"><ScanText size={16} aria-hidden="true" /> OCR read</div>
            </div>
            <div className="metadata-card">
              <div className="metadata-heading"><span>PROPOSED METADATA</span><CheckCircle2 size={18} aria-label="Validated" /></div>
              <div className="metadata-line"><span>title</span><b>Electricity bill · June</b></div>
              <div className="metadata-line"><span>tags</span><div className="tag-stack"><b>home</b><b>utilities</b></div></div>
              <div className="metadata-line"><span>type</span><b>invoice</b></div>
              <div className="review-note"><Sparkles size={15} aria-hidden="true" /> allowed by “Home” Tag Group</div>
            </div>
            <div className="write-strip"><span>REVIEW FIRST</span><b>Ready for review</b><ChevronRight size={17} aria-hidden="true" /></div>
          </div>
          <div className="corner-label bottom-label">REVIEW BEFORE WRITE</div>
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        </div>
      </section>

      <section className="field-ribbon" aria-label="Metadata Tagvico can help classify">
        <p>One document in. A usable archive out.</p>
        <div className="field-list">
          {productFields.map((field) => <span key={field}>{field}</span>)}
        </div>
      </section>

      <section id="product" className="section product-section" aria-labelledby="product-title">
        <div className="section-heading split-heading product-heading">
          <div>
            <p className="eyebrow">The actual product</p>
            <h2 id="product-title">See every decision.<br /><em>Trust every write.</em></h2>
          </div>
          <p>These are current v3.1.2 screens from a representative installation. They show the Action Center, persistent Ask Tagvico workspace, and the provider registry users actually configure.</p>
        </div>

        <div className="product-showcase">
          <div className="product-shot-stack">
            <figure className="product-shot">
              <div className="shot-toolbar"><span /><span /><span /><b>Action Center</b></div>
              <img src="/screenshots/action-center-v3.png" alt="Tagvico v3.1.2 Action Center" loading="lazy" />
              <figcaption><strong>Turn documents into owned work.</strong><span>Actions, due dates, priorities, owners, and checklists stay connected to Paperless.</span></figcaption>
            </figure>
            <figure className="product-shot">
              <div className="shot-toolbar"><span /><span /><span /><b>Ask Tagvico</b></div>
              <img src="/screenshots/companion-v3.png" alt="Tagvico v3.1.2 persistent Ask Tagvico workspace" loading="lazy" />
              <figcaption><strong>Research without a black box.</strong><span>Persistent conversations, configured models, visible tool activity, and approval-first writes.</span></figcaption>
            </figure>
            <figure className="product-shot">
              <div className="shot-toolbar"><span /><span /><span /><b>AI models</b></div>
              <img src="/screenshots/ai-models-v3.png" alt="Tagvico v3.1.2 AI model provider settings" loading="lazy" />
              <figcaption><strong>Configure every runtime once.</strong><span>Write-only credentials, live catalogs, connection probes, and account authentication.</span></figcaption>
            </figure>
          </div>
        </div>
        <p className="product-note"><ShieldCheck size={15} aria-hidden="true" /> Captured from the running v3.1.2 release installation. No document contents, credentials, endpoints, or account identifiers are shown.</p>
      </section>

      <section id="workflow" className="section workflow-section" aria-labelledby="workflow-title">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">The filing loop</p>
            <h2 id="workflow-title">Four decisions.<br /><em>One calmer inbox.</em></h2>
          </div>
          <p>Tagvico does not replace Paperless-ngx. It sits beside the archive you already use, with a setup flow built around making automation understandable before it becomes automatic.</p>
        </div>
        <div className="workflow-list">
          {workflow.map(({ number, title, copy, Icon }) => (
            <article className="workflow-card" key={number}>
              <div className="workflow-number">{number}</div>
              <Icon className="workflow-icon" size={25} strokeWidth={1.7} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reliability" className="section reliability-section" aria-labelledby="reliability-title">
        <div className="reliability-intro">
          <div className="paper-index">02 / RELIABLE BY DESIGN</div>
          <p className="eyebrow">No surprise taxonomy</p>
          <h2 id="reliability-title">A useful archive needs<br /><em>useful constraints.</em></h2>
          <p className="section-copy">The hard part is not asking a model for tags. It is making sure those tags stay coherent after the hundredth document. Tagvico v3.1.2 puts controls around the write, not just the prompt.</p>
          <a className="text-link dark-link" href="https://github.com/arturict/tagvico-ai#why-tagvico-ai">Read how it works <ExternalArrow /></a>
        </div>
        <div className="reliability-grid">
          {reliability.map(({ title, copy, Icon }, index) => (
            <article className="reliability-card" key={title}>
              <div className="card-topline"><span>0{index + 1}</span><Icon size={23} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
          <div className="taxonomy-card" aria-label="Sample tag group">
            <div className="taxonomy-header"><span>TAG GROUP</span><b>Home</b></div>
            <div className="taxonomy-nodes"><span>utilities</span><span>insurance</span><span>rental</span><span>repairs</span></div>
            <p><CheckCircle2 size={15} aria-hidden="true" /> Model output is constrained to this group.</p>
          </div>
        </div>
      </section>

      <section id="providers" className="section provider-section" aria-labelledby="providers-title">
        <div className="provider-heading">
          <p className="eyebrow">Your inference, your call</p>
          <h2 id="providers-title">Subscription, local model,<br /><em>or API key.</em></h2>
          <p className="section-copy">Different archives need different privacy, cost, and quality trade-offs. Tagvico keeps the provider choice visible instead of burying it behind one fixed model.</p>
        </div>
        <div className="provider-grid">
          {providers.map(({ label, title, copy, note, Icon, featured }) => (
            <article className={`provider-card${featured ? ' provider-featured' : ''}`} key={title}>
              <div className="provider-icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></div>
              <p className="provider-label">{label}</p>
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className="provider-note">{note}</span>
            </article>
          ))}
        </div>
        <p className="provider-footnote"><LockKeyhole size={15} aria-hidden="true" /> Hosted providers receive the document content needed for classification. Local endpoints keep it on infrastructure you control. Check each provider’s own terms before connecting sensitive records.</p>
      </section>

      <section id="release" className="section v2-section" aria-labelledby="release-title">
        <div className="release-stamp"><span>TAGVICO</span><b>3.1</b><i>STABLE</i></div>
        <div className="v2-content">
          <p className="eyebrow">Current stable release</p>
          <h2 id="release-title">Less prompt theatre.<br /><em>More operational clarity.</em></h2>
          <p className="section-copy">v3.1.2 completes the green application shell, runtime-driven model choice, durable Ask Tagvico experience, safer automation defaults, and recovery workflows introduced across v3.1.</p>
          <div className="release-grid">
            {releaseNotes.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <a className="button button-light" href="https://github.com/arturict/tagvico-ai/releases">
            Read release notes <ExternalArrow />
          </a>
        </div>
      </section>

      <section className="section start-section" aria-labelledby="start-title">
        <div className="start-copy">
          <p className="eyebrow">Open source / stable v3</p>
          <h2 id="start-title">Set up once.<br /><em>Keep filing.</em></h2>
          <p className="section-copy">Run one Docker container next to Paperless-ngx, start in Review first mode, and make the rules stricter as your archive grows.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="https://github.com/arturict/tagvico-ai#quick-start">Open quick start <ExternalArrow /></a>
            <a className="text-link" href="https://github.com/arturict/tagvico-ai/issues">Report feedback <ExternalArrow /></a>
          </div>
        </div>
        <aside className="start-checklist">
          <p>FIRST RUN / CHECKLIST</p>
          <ol>
            <li><span>01</span>Connect Paperless-ngx</li>
            <li><span>02</span>Choose an inference boundary</li>
            <li><span>03</span>Select fields and Tag Groups</li>
            <li><span>04</span>Review the first suggestion</li>
          </ol>
          <div className="checklist-footer"><Workflow size={18} aria-hidden="true" /> then let the scheduled scan do its work</div>
        </aside>
      </section>

      <footer className="footer">
        <a className="brand" href="/"><img src="/tagvico-icon.png" alt="" /> <span>Tagvico</span></a>
        <p>Self-hosted actions, research, and filing for Paperless-ngx.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/docs/">Docs</a>
          <a href="https://github.com/arturict/tagvico-ai">GitHub <ExternalArrow /></a>
        </div>
      </footer>
    </main>
  );
}

function LegalPage({ type }) {
  const isPrivacy = type === 'privacy';
  return (
    <main className="legal-main">
      <nav className="nav" aria-label="Legal navigation">
        <a className="brand" href="/" aria-label="Tagvico home"><img src="/tagvico-icon.png" alt="" /><span>Tagvico</span></a>
        <div className="nav-center"><a href="/">Home</a><a href="/docs/">Docs</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        <a className="nav-github" href="https://github.com/arturict/tagvico-ai"><GitBranch size={15} aria-hidden="true" /><span>Source</span></a>
      </nav>
      <section className="legal-section">
        <p className="eyebrow">{isPrivacy ? 'Privacy policy' : 'Terms of service'}</p>
        <h1>{isPrivacy ? 'Your documents stay yours.' : 'The short, human version.'}</h1>
        <p className="legal-updated">Last updated: July 24, 2026</p>
        {isPrivacy ? <PrivacyContent /> : <TermsContent />}
      </section>
      <footer className="footer legal-footer">
        <a className="brand" href="/"><img src="/tagvico-icon.png" alt="" /><span>Tagvico</span></a>
        <p>Self-hosted actions, research, and filing for Paperless-ngx.</p>
        <div className="footer-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/docs/">Docs</a><a href="https://github.com/arturict/tagvico-ai">GitHub <ExternalArrow /></a></div>
      </footer>
    </main>
  );
}

function PrivacyContent() {
  return (
    <div className="legal-card">
      <section><h2>Self-hosted by design</h2><p>Tagvico AI is software you run yourself. This website does not process your documents, OCR text, Paperless data, or provider credentials.</p></section>
      <section><h2>What the app connects to</h2><p>The app connects to your Paperless-ngx instance and the AI provider you choose. When processing is enabled, the OCR text and metadata needed to classify a document may be sent to that provider. A local endpoint such as Ollama can keep that processing inside infrastructure you control.</p></section>
      <section><h2>ChatGPT / Codex sign-in</h2><p>The subscription adapter starts the official Codex device-code login. The Codex runtime manages its authentication session and refresh flow; Tagvico does not expose credential values in the browser.</p></section>
      <section><h2>Credentials and website analytics</h2><p>App settings are stored in your own deployment configuration. Protect the deployment with authentication and transport security. This landing page currently has no analytics, tracking pixels, newsletter forms, or advertising cookies.</p></section>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="legal-card">
      <section><h2>No managed service</h2><p>Tagvico AI is self-hosted software. The public website is informational and does not provide a hosted document-processing service.</p></section>
      <section><h2>Self-hosted software</h2><p>Tagvico is under active development. Back up your data volume, pin an immutable release tag, and start in Review first mode before trusting automatic writes in an important workflow.</p></section>
      <section><h2>Your responsibility</h2><p>You are responsible for your deployment, credentials, backups, documents, provider selection, and compliance obligations. AI output can be wrong and should be reviewed for important workflows.</p></section>
      <section><h2>Provider terms</h2><p>If you connect OpenAI, OpenRouter, Ollama, OpenCode Go, ChatGPT subscription, GitHub Copilot, or a compatible endpoint, its own terms and privacy policies apply to that connection.</p></section>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
