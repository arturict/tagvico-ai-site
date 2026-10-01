import React from 'react';
import './styles/openai/variables-primitive.css';
import './styles/openai/variables-semantic.css';
import './styles/openai/variables-components.css';
import './styles.css';
import { Mascot, SiteFooter, SiteHeader, track } from './components.jsx';
import { Home } from './Home.jsx';

export function App({ path }) {
  if (path === '/privacy') return <LegalPage type="privacy" />;
  if (path === '/terms') return <LegalPage type="terms" />;
  if (path === '/404') return <NotFound />;
  return <Home />;
}

function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <div className="wrap not-found">
          <Mascot pose="searching" size={96} />
          <h1 className="legal-title">This page does not exist.</h1>
          <p>The link may be old or mistyped.</p>
          <a className="button button-primary" href="/" {...track('home', 'not-found', 'top')}>Back to the start page</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function LegalPage({ type }) {
  const isPrivacy = type === 'privacy';
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" className="legal">
        <div className="wrap legal-inner">
          <h1>{isPrivacy ? 'Privacy' : 'Terms'}</h1>
          <p className="small">Last updated 1 October 2026</p>
          {isPrivacy ? <PrivacyContent /> : <TermsContent />}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <section>
        <h2>Self-hosted software</h2>
        <p>
          Tagvico runs on your own server. This website does not process your documents, OCR text, Paperless data or
          provider credentials.
        </p>
      </section>
      <section>
        <h2>What the app connects to</h2>
        <p>
          The app connects to your Paperless-ngx instance and to the AI provider you choose. When a question or filing
          run needs it, the document text and metadata it requires are sent to that provider under its own terms. A local
          endpoint such as Ollama keeps that step on your network.
        </p>
      </section>
      <section>
        <h2>Sign in with ChatGPT</h2>
        <p>
          The ChatGPT plan provider uses OpenAI&rsquo;s Sign in with ChatGPT flow. Document text is sent to OpenAI with
          store set to false. Tagvico keeps the sign-in tokens on your server with owner-only file permissions and never
          sends them to the browser. Signing out revokes the session at OpenAI.
        </p>
      </section>
      <section>
        <h2>Telegram and Discord</h2>
        <p>
          If you enable the optional bots, questions, uploads and returned documents pass through Telegram or Discord
          under their terms, and they are not end-to-end encrypted. Only users you allowlist can use them, each with
          their own Paperless token.
        </p>
      </section>
      <section>
        <h2>Usage statistics in the app</h2>
        <p>
          Anonymous installation statistics are off by default. If an administrator turns them on, the app sends a small
          counter without document text, titles, names, addresses, keys or exact counts, and the exact payload can be
          previewed first. The full description is in the{' '}
          <a href="https://github.com/arturict/tagvico-ai/blob/main/PRIVACY_POLICY.md">project privacy notice</a>.
        </p>
      </section>
      <section>
        <h2>This website</h2>
        <p>
          The landing page uses self-hosted Umami for page views and coarse interactions such as link clicks, section
          views, scroll depth and standard campaign labels. Tracking stays off when Global Privacy Control or Do Not Track
          is enabled. It does not use cookies, local storage, persistent visitor identifiers or fingerprinting, and it
          does not collect arbitrary query parameters or free-form input. This page and the terms page are not tracked.
        </p>
      </section>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <section>
        <h2>No managed service</h2>
        <p>
          Tagvico is self-hosted software. This website is informational and does not provide a hosted document
          service.
        </p>
      </section>
      <section>
        <h2>Your responsibility</h2>
        <p>
          You are responsible for your deployment, credentials, backups, documents, provider choice and the rules that
          apply to your data. Back up the data volume, pin a release tag and start in review mode before you trust
          automatic writes with important documents. AI output can be wrong, so review what matters.
        </p>
      </section>
      <section>
        <h2>Provider terms</h2>
        <p>
          If you connect ChatGPT, OpenAI, OpenRouter, Ollama, OpenCode Go, GitHub Copilot or another endpoint, that
          provider&rsquo;s own terms and privacy notice apply to the connection.
        </p>
      </section>
      <section>
        <h2>Licence</h2>
        <p>
          Tagvico is open source under the{' '}
          <a href="https://github.com/arturict/tagvico-ai/blob/main/LICENSE">MIT licence</a>. The software is provided as
          is, without warranty.
        </p>
      </section>
    </>
  );
}
