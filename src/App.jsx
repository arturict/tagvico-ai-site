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
    copy: 'Add your Paperless-ngx URL and API token. Tagvico reads its OCR text and writes through Paperless’ official API — never directly to its database.',
    Icon: Network,
  },
  {
    number: '02',
    title: 'Choose where inference happens',
    copy: 'Use an API key, point at an Ollama instance on your network, or try the experimental ChatGPT/Codex device sign-in for a private, low-volume install.',
    Icon: BrainCircuit,
  },
  {
    number: '03',
    title: 'Give the model a real filing vocabulary',
    copy: 'Turn existing Paperless tags into controlled Tag Groups. A model can classify confidently without quietly inventing near-duplicate labels.',
    Icon: Tags,
  },
  {
    number: '04',
    title: 'Review the edge cases, automate the rest',
    copy: 'Start in dry-run mode, inspect the proposed metadata diff, and send uncertain tags to review instead of letting a bad guess become archive truth.',
    Icon: ClipboardCheck,
  },
];

const reliability = [
  {
    title: 'Controlled tagging',
    copy: 'Tag Groups constrain suggestions to the taxonomy you define. Unknown suggestions can be held for review, then approved into the right group or rejected.',
    Icon: Tags,
  },
  {
    title: 'A reversible write path',
    copy: 'Dry runs show structured metadata changes before they land. Processing history, rescans, and restore actions make the automation inspectable.',
    Icon: RefreshCw,
  },
  {
    title: 'Queues that do not forget',
    copy: 'Retry and terminal-failure queues keep troublesome OCR or provider jobs visible instead of silently losing a document in the background.',
    Icon: TimerReset,
  },
];

const providers = [
  {
    label: 'Subscription-first',
    title: 'ChatGPT / Codex',
    copy: 'Experimental device-code sign-in for one trusted, low-volume installation. The official Codex runtime owns the OAuth session and refresh flow.',
    note: 'Experimental · private use',
    Icon: KeyRound,
    featured: true,
  },
  {
    label: 'Subscription-first',
    title: 'GitHub Copilot',
    copy: 'Use the official Copilot SDK with an existing GitHub login or token. Tagvico disables tools and permission requests for a narrow classification session.',
    note: 'Experimental · Copilot plan required',
    Icon: GitBranch,
  },
  {
    label: 'Service key',
    title: 'OpenCode Go',
    copy: 'Use an OpenCode Go subscription key through its OpenAI-compatible API, with budget and higher-quality model choices kept explicit.',
    note: 'Subscription API · live model catalog',
    Icon: KeyRound,
  },
  {
    label: 'Local or cloud',
    title: 'Ollama',
    copy: 'Keep inference on your own Ollama host, or use Ollama Cloud with bearer-key authentication and cloud model slugs.',
    note: 'Local endpoint · Ollama Cloud',
    Icon: Database,
  },
  {
    label: 'Bring your key',
    title: 'OpenAI / OpenRouter',
    copy: 'Use a direct API key, including OpenRouter’s rotating free-model router. Stable defaults favor smaller models for repetitive filing work.',
    note: 'GPT-5.6 is gated preview access',
    Icon: Cloud,
  },
  {
    label: 'Bring your endpoint',
    title: 'More hosted or compatible',
    copy: 'Connect Anthropic, Azure OpenAI, LM Studio, LiteLLM, vLLM, llama.cpp, or another Chat Completions-compatible endpoint.',
    note: 'Provider-specific terms apply',
    Icon: Route,
  },
];

const releaseNotes = [
  ['Provider clarity', 'A searchable provider and model picker makes the data boundary and setup choice explicit.'],
  ['Tag group workflow', 'Move from free-form tags to controlled vocabularies with a dedicated exception queue.'],
  ['Safer operations', 'Provider health, durable recovery queues, and reviewable writes make issues easier to see and correct.'],
  ['Better first run', 'A guided setup starts with Paperless, model choice, and the fields you actually want automated.'],
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
          <a href="#workflow">Workflow</a>
          <a href="#providers">Providers</a>
          <a href="#reliability">Reliability</a>
        </div>
        <a className="nav-github" href="https://github.com/arturict/tagvico-ai">
          <GitBranch size={15} aria-hidden="true" /> <span>Source</span>
        </a>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow-row">
            <p className="eyebrow"><span className="pulse-dot" /> Tagvico v2</p>
            <span className="alpha-chip">Alpha</span>
          </div>
          <h1 id="hero-title">AI filing<br /><em>with a paper trail.</em></h1>
          <p className="hero-lead">Tagvico is the self-hosted AI companion for Paperless-ngx. It turns incoming OCR text into clean metadata — without handing your archive to a black box.</p>
          <p className="hero-detail">Run models locally, bring your own API key, or use the experimental ChatGPT/Codex device sign-in. Choose the boundary. Keep the filing rules.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="https://github.com/arturict/tagvico-ai#quick-start">
              Run the alpha <ExternalArrow />
            </a>
            <a className="text-link" href="#v2">What&apos;s new in v2 <ChevronRight size={16} aria-hidden="true" /></a>
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
            <div className="write-strip"><span>DRY RUN</span><b>Ready for review</b><ChevronRight size={17} aria-hidden="true" /></div>
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
          <p className="section-copy">The hard part is not asking a model for tags. It is making sure those tags stay coherent after the hundredth document. Tagvico v2 puts the controls around the write, not just the prompt.</p>
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

      <section id="v2" className="section v2-section" aria-labelledby="v2-title">
        <div className="release-stamp"><span>TAGVICO</span><b>V2</b><i>ALPHA</i></div>
        <div className="v2-content">
          <p className="eyebrow">The v2 direction</p>
          <h2 id="v2-title">Less prompt theatre.<br /><em>More operational clarity.</em></h2>
          <p className="section-copy">The v2 release brings the important filing decisions into the interface: which provider is in use, which vocabulary is allowed, what will change, and how to recover when a job fails.</p>
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
          <p className="eyebrow">Open source / alpha</p>
          <h2 id="start-title">Set up once.<br /><em>Keep filing.</em></h2>
          <p className="section-copy">Run one Docker container next to Paperless-ngx, start with a dry run, and make the rules stricter as your archive grows.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="https://github.com/arturict/tagvico-ai#quick-start">Open quick start <ExternalArrow /></a>
            <a className="text-link" href="https://github.com/arturict/tagvico-ai/issues">Give alpha feedback <ExternalArrow /></a>
          </div>
        </div>
        <aside className="start-checklist">
          <p>FIRST RUN / CHECKLIST</p>
          <ol>
            <li><span>01</span>Connect Paperless-ngx</li>
            <li><span>02</span>Choose an inference boundary</li>
            <li><span>03</span>Select fields and Tag Groups</li>
            <li><span>04</span>Review a dry run</li>
          </ol>
          <div className="checklist-footer"><Workflow size={18} aria-hidden="true" /> then let the scheduled scan do its work</div>
        </aside>
      </section>

      <footer className="footer">
        <a className="brand" href="/"><img src="/tagvico-icon.png" alt="" /> <span>Tagvico</span></a>
        <p>Self-hosted AI filing for Paperless-ngx.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
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
        <div className="nav-center"><a href="/">Home</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        <a className="nav-github" href="https://github.com/arturict/tagvico-ai"><GitBranch size={15} aria-hidden="true" /><span>Source</span></a>
      </nav>
      <section className="legal-section">
        <p className="eyebrow">{isPrivacy ? 'Privacy policy' : 'Terms of service'}</p>
        <h1>{isPrivacy ? 'Your documents stay yours.' : 'The short, human version.'}</h1>
        <p className="legal-updated">Last updated: July 9, 2026</p>
        {isPrivacy ? <PrivacyContent /> : <TermsContent />}
      </section>
      <footer className="footer legal-footer">
        <a className="brand" href="/"><img src="/tagvico-icon.png" alt="" /><span>Tagvico</span></a>
        <p>Self-hosted AI filing for Paperless-ngx.</p>
        <div className="footer-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="https://github.com/arturict/tagvico-ai">GitHub <ExternalArrow /></a></div>
      </footer>
    </main>
  );
}

function PrivacyContent() {
  return (
    <div className="legal-card">
      <section><h2>Self-hosted by design</h2><p>Tagvico AI is software you run yourself. This website does not process your documents, OCR text, Paperless data, or provider credentials.</p></section>
      <section><h2>What the app connects to</h2><p>The app connects to your Paperless-ngx instance and the AI provider you choose. When processing is enabled, the OCR text and metadata needed to classify a document may be sent to that provider. A local endpoint such as Ollama can keep that processing inside infrastructure you control.</p></section>
      <section><h2>ChatGPT / Codex sign-in</h2><p>The experimental Codex provider starts an official device-code login. The Codex runtime manages its authentication session and refresh flow; Tagvico does not expose credential values in the browser.</p></section>
      <section><h2>Credentials and website analytics</h2><p>App settings are stored in your own deployment configuration. Protect the deployment with authentication and transport security. This landing page currently has no analytics, tracking pixels, newsletter forms, or advertising cookies.</p></section>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="legal-card">
      <section><h2>No managed service</h2><p>Tagvico AI is self-hosted software. The public website is informational and does not provide a hosted document-processing service.</p></section>
      <section><h2>Alpha software</h2><p>Tagvico is under active development. Back up your data volume, pin a release tag, and start with dry runs before trusting automatic writes in an important workflow.</p></section>
      <section><h2>Your responsibility</h2><p>You are responsible for your deployment, credentials, backups, documents, provider selection, and compliance obligations. AI output can be wrong and should be reviewed for important workflows.</p></section>
      <section><h2>Provider terms</h2><p>If you connect OpenAI, OpenRouter, Ollama, Anthropic, Azure OpenAI, Codex, or another endpoint, its own terms and privacy policies apply to that connection.</p></section>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
