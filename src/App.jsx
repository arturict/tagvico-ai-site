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
  LockKeyhole,
  Network,
  Route,
  ScanText,
  ShieldCheck,
  Sparkles,
  Tags,
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
    title: 'Turn documents into accountable work',
    copy: 'Keep uncertain metadata in review, or open an Action Case with an owner, priority, due date, and checklist. Every write remains explicit and traceable.',
    Icon: ClipboardCheck,
  },
];

const reliability = [
  {
    title: 'Action Cases, not loose reminders',
    copy: 'Attach an owner, priority, due date, and up to 100 checklist steps to a Paperless document without replacing Paperless as the system of record.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Approval before automation',
    copy: 'The Companion can read allowed documents and prepare proposals. Any tool that writes requires an explicit approval, with the decision kept in the audit trail.',
    Icon: ShieldCheck,
  },
  {
    title: 'Household access without shared tokens',
    copy: 'Give each household member a role and an encrypted Paperless token. Permissions and Telegram actions stay tied to the person who performed them.',
    Icon: LockKeyhole,
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
    note: 'Model availability follows your provider account',
    Icon: Cloud,
  },
  {
    label: 'Bring your endpoint',
    title: 'CLI proxy / compatible',
    copy: 'Connect LM Studio, LiteLLM, vLLM, llama.cpp, a subscription CLI proxy, or another OpenAI-compatible chat endpoint.',
    note: 'Manual endpoint · live catalog when supported',
    Icon: Route,
  },
];

const releaseNotes = [
  ['Ask Tagvico that shows its work', 'Keep multiple chats, choose any configured chat model, and inspect privacy-safe Paperless research activity before trusting an answer.'],
  ['Automation you can understand', 'Trigger tags are optional, manual scans show exact outcomes, and four precise tags remain the default ceiling.'],
  ['Provider setup in one place', 'Configure keys, authenticate ChatGPT or GitHub Copilot, test connections, and browse each live model catalog from Settings.'],
  ['Recovery without lost history', 'Rescan, restore, validate history, recover failed documents, and keep permanent ignores explicit and reversible.'],
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
            <p className="eyebrow"><span className="pulse-dot" /> Tagvico v3.1</p>
            <span className="alpha-chip">3.1.1</span>
          </div>
          <h1 id="hero-title">From archived document<br /><em>to finished action.</em></h1>
          <p className="hero-lead">Tagvico is the self-hosted action and AI companion for Paperless-ngx. It keeps filing, follow-up work, and approvals beside the documents that created them.</p>
          <p className="hero-detail">Classify incoming documents, assign accountable Action Cases, and use an approval-gated Companion—without replacing Paperless or surrendering control of your archive.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="https://github.com/arturict/tagvico-ai#stable-quick-start-v311">
              Install v3.1.1 <ExternalArrow />
            </a>
            <a className="text-link" href="#v3">What&apos;s new in v3 <ChevronRight size={16} aria-hidden="true" /></a>
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

      <section id="product" className="section product-section" aria-labelledby="product-title">
        <div className="section-heading split-heading product-heading">
          <div>
            <p className="eyebrow">The actual product</p>
            <h2 id="product-title">See every decision.<br /><em>Trust every write.</em></h2>
          </div>
          <p>These are real Tagvico v3 screens. Actions, Companion answers, and filing controls stay visible instead of disappearing into configuration files.</p>
        </div>

        <div className="product-showcase">
          <figure className="product-shot product-shot-dashboard">
            <div className="shot-toolbar"><span /><span /><span /><b>Action Center</b></div>
            <img src="/screenshots/action-center-v3.png" alt="Tagvico v3 Action Center showing one synthetic renewal case, status, due date, steps, and priority" loading="lazy" />
            <figcaption><strong>Finish what the document started.</strong><span>Owners, deadlines, priorities, and checklists stay attached to the source document.</span></figcaption>
          </figure>

          <div className="product-shot-stack">
            <figure className="product-shot">
              <div className="shot-toolbar"><span /><span /><span /><b>Household Companion</b></div>
              <img src="/screenshots/companion-v3.png" alt="Tagvico v3 Companion answering a synthetic insurance deadline question beside the approval queue" loading="lazy" />
              <figcaption><strong>Ask, then keep control.</strong><span>Document-grounded answers sit beside a durable approval queue for proposed writes.</span></figcaption>
            </figure>
            <figure className="product-shot">
              <div className="shot-toolbar"><span /><span /><span /><b>Controlled vocabulary</b></div>
              <img src="/screenshots/controlled-tagging.png" alt="Controlled Tag Groups in Tagvico AI" loading="lazy" />
              <figcaption><strong>Constrain the taxonomy.</strong><span>Give models a useful vocabulary instead of cleaning up invented tags later.</span></figcaption>
            </figure>
          </div>
        </div>
        <p className="product-note"><ShieldCheck size={15} aria-hidden="true" /> Captured from the v3 release-acceptance instance using synthetic data only.</p>
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
          <p className="section-copy">The hard part is not asking a model for an answer. It is preserving ownership, permissions, and a recoverable decision trail after the hundredth document. Tagvico v3 puts controls around every write, not just the prompt.</p>
          <a className="text-link dark-link" href="https://github.com/arturict/tagvico-ai#why-tagvico">Read how it works <ExternalArrow /></a>
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
        <p className="provider-footnote"><LockKeyhole size={15} aria-hidden="true" /> Hosted providers receive the document content needed for classification and, when used, Companion questions plus relevant action context. Local endpoints keep inference on infrastructure you control. Check each provider’s own terms before connecting sensitive records.</p>
      </section>

      <section id="v3" className="section v2-section" aria-labelledby="v3-title">
        <div className="release-stamp"><span>TAGVICO</span><b>3.1</b><i>RELEASE</i></div>
        <div className="v2-content">
          <p className="eyebrow">New in v3.1.1</p>
          <h2 id="v3-title">Less AI theatre.<br /><em>More work completed.</em></h2>
          <p className="section-copy">v3 extends trustworthy filing into the work that follows: accountable cases, household-safe access, document-grounded assistance, and approval gates that keep people in control.</p>
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
          <p className="eyebrow">Open source / self-hosted</p>
          <h2 id="start-title">Set up once.<br /><em>Finish what arrives.</em></h2>
          <p className="section-copy">Run Tagvico next to Paperless-ngx, start with dry-run classification, then add Action Cases and the Companion when your household is ready.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="https://github.com/arturict/tagvico-ai#stable-quick-start-v311">Open quick start <ExternalArrow /></a>
            <a className="text-link" href="https://github.com/arturict/tagvico-ai/issues">Report an issue <ExternalArrow /></a>
          </div>
        </div>
        <aside className="start-checklist">
          <p>FIRST RUN / CHECKLIST</p>
          <ol>
            <li><span>01</span>Connect Paperless-ngx</li>
            <li><span>02</span>Choose an inference boundary</li>
            <li><span>03</span>Select fields and Tag Groups</li>
            <li><span>04</span>Review a dry run and first Action Case</li>
          </ol>
          <div className="checklist-footer"><Workflow size={18} aria-hidden="true" /> then keep every follow-up attached to its source</div>
        </aside>
      </section>

      <footer className="footer">
        <a className="brand" href="/"><img src="/tagvico-icon.png" alt="" /> <span>Tagvico</span></a>
        <p>Self-hosted action center for Paperless-ngx.</p>
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
        <div className="nav-center"><a href="/">Home</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        <a className="nav-github" href="https://github.com/arturict/tagvico-ai"><GitBranch size={15} aria-hidden="true" /><span>Source</span></a>
      </nav>
      <section className="legal-section">
        <p className="eyebrow">{isPrivacy ? 'Privacy policy' : 'Terms of service'}</p>
        <h1>{isPrivacy ? 'Your documents stay yours.' : 'The short, human version.'}</h1>
        <p className="legal-updated">Last updated: July 22, 2026</p>
        {isPrivacy ? <PrivacyContent /> : <TermsContent />}
      </section>
      <footer className="footer legal-footer">
        <a className="brand" href="/"><img src="/tagvico-icon.png" alt="" /><span>Tagvico</span></a>
        <p>Self-hosted action center for Paperless-ngx.</p>
        <div className="footer-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="https://github.com/arturict/tagvico-ai">GitHub <ExternalArrow /></a></div>
      </footer>
    </main>
  );
}

function PrivacyContent() {
  return (
    <div className="legal-card">
      <section><h2>Self-hosted by design</h2><p>Tagvico AI is software you run yourself. This website does not process your documents, OCR text, Paperless data, or provider credentials.</p></section>
      <section><h2>What the app connects to</h2><p>The app connects to your Paperless-ngx instance and the AI provider you choose. When processing is enabled, the OCR text and metadata needed to classify a document may be sent to that provider. When you use Companion, your question and the permitted document or action context needed to answer it may also be sent. A local endpoint such as Ollama can keep inference inside infrastructure you control.</p></section>
      <section><h2>ChatGPT / Codex sign-in</h2><p>The experimental Codex provider starts an official device-code login. The Codex runtime manages its authentication session and refresh flow; Tagvico does not expose credential values in the browser.</p></section>
      <section><h2>Credentials and website analytics</h2><p>App settings are stored in your own deployment configuration. Protect the deployment with authentication and transport security. This landing page currently has no analytics, tracking pixels, newsletter forms, or advertising cookies.</p></section>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="legal-card">
      <section><h2>No managed service</h2><p>Tagvico AI is self-hosted software. The public website is informational and does not provide a hosted document-processing service.</p></section>
      <section><h2>Self-hosted software</h2><p>Tagvico is under active development. Back up your data volume, pin a release tag, and start with dry runs before trusting automatic writes in an important workflow.</p></section>
      <section><h2>Your responsibility</h2><p>You are responsible for your deployment, credentials, backups, documents, provider selection, and compliance obligations. AI output can be wrong and should be reviewed for important workflows.</p></section>
      <section><h2>Provider terms</h2><p>If you connect OpenAI, OpenRouter, Ollama, Anthropic, Azure OpenAI, Codex, or another endpoint, its own terms and privacy policies apply to that connection.</p></section>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
