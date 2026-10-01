import React from 'react';
import { Arrow, CodeBlock, Mascot, Shot, SiteFooter, SiteHeader, track } from './components.jsx';
import { composeSnippet, dockerRunSnippet, links, models, trust } from './content.js';

/* __HAS_VIDEO__ is defined in vite.config.js and is true once public/video/tagvico-3-5.mp4 exists. */
const hasVideo = typeof __HAS_VIDEO__ !== 'undefined' && __HAS_VIDEO__;

export function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader home />
      <main id="main">
        <section id="hero" className="hero" aria-labelledby="hero-title">
          <div className="wrap">
            <Mascot pose="waving" className="mascot-hero" size={96} />
            <h1 id="hero-title">
              <span>Ask your archive.</span> <span className="muted">Approve what changes.</span>
            </h1>
            <p className="hero-lede">
              Tagvico is a self-hosted companion for Paperless-ngx. It answers from your documents, keeps track of what
              needs doing, and asks before it changes anything.
            </p>
            <div className="actions">
              <a className="button button-primary" href="#install" {...track('get-started', 'hero', 'install')}>Get started</a>
              <a className="text-link" href={links.docs} {...track('docs-open', 'hero', 'docs')}>Read the docs <Arrow /></a>
            </div>
            <p className="hero-meta">Version 3.5. MIT licence. One Docker container.</p>
            <Shot name="chat" priority />
          </div>
        </section>

        {hasVideo && (
          <section id="video" className="block" aria-labelledby="video-title">
            <div className="wrap">
              <h2 id="video-title" className="visually-hidden">Tagvico 3.5 video</h2>
              <video
                className="video"
                controls
                muted
                playsInline
                preload="none"
                poster="/video/tagvico-3-5-poster.webp"
                width="1280"
                height="720"
                {...track('video-play', 'video', 'release-video')}
              >
                <source src="/video/tagvico-3-5.mp4" type="video/mp4" />
              </video>
            </div>
          </section>
        )}

        <section id="companion" className="block" aria-labelledby="companion-title">
          <div className="wrap split">
            <div className="split-text">
              <h2 id="companion-title">Ask across the whole archive.</h2>
              <p>
                Ask in plain language about letters, contracts and receipts. Each answer lists the Paperless documents
                it is based on, so you can open the original.
              </p>
            </div>
            <Shot name="answer" />
          </div>
        </section>

        <section id="approvals" className="block" aria-labelledby="approvals-title">
          <div className="wrap split">
            <div className="split-text">
              <h2 id="approvals-title">Nothing changes until someone approves.</h2>
              <p>
                When the Companion wants to change something, it prepares a proposal. An owner or an adult approves or
                rejects it, and only then is it applied. Every decision is kept in an audit trail.
              </p>
            </div>
            <Shot name="approval" />
          </div>
        </section>

        <section id="needs-you" className="block" aria-labelledby="needs-you-title">
          <div className="wrap split split-reverse">
            <div className="split-text">
              <h2 id="needs-you-title">A short list of what needs you.</h2>
              <p>
                Deadlines, pending approvals and suggestions collect in one list called Needs you, so nothing depends on
                remembering to look in Paperless.
              </p>
            </div>
            <Shot name="needs-you" />
          </div>
        </section>

        <section id="household" className="block" aria-labelledby="household-title">
          <div className="wrap split">
            <div className="split-text">
              <h2 id="household-title">Made for a household.</h2>
              <p>
                Add the people you live with. Each member gets their own page with their open items and documents, and
                roles decide who may approve what.
              </p>
            </div>
            <Shot name="person" />
          </div>
        </section>

        <section id="models" className="block" aria-labelledby="models-title">
          <div className="wrap split split-even">
            <div className="split-text">
              <h2 id="models-title">Use the model you already pay for, or run your own.</h2>
              <ul className="rows">
                {models.map(({ name, note, text }) => (
                  <li key={name}>
                    <h3>{name}{note && <span className="row-note">{note}</span>}</h3>
                    <p>{text}</p>
                  </li>
                ))}
              </ul>
              <p className="small">
                Also supported: Ollama Cloud, OpenCode Go, GitHub Copilot, OpenAI-compatible endpoints such as LM Studio,
                LiteLLM and vLLM, and TypeSafe Jev for closed-list filing.
              </p>
              <a className="text-link" href={links.providers} {...track('providers-open', 'models', 'docs-providers')}>
                Provider guides <Arrow />
              </a>
            </div>
            <Shot name="models" />
          </div>
        </section>

        <section id="channels" className="block" aria-labelledby="channels-title">
          <div className="wrap split">
            <div className="split-text">
              <h2 id="channels-title">Telegram and Discord.</h2>
              <p>
                Household members you allow can search, upload documents, see open actions, and approve or reject
                proposals from a chat. Each person uses their own Paperless token, so Paperless still decides who can see
                what.
              </p>
            </div>
            <Shot name="channels" />
          </div>
        </section>

        <section id="filing" className="block" aria-labelledby="filing-title">
          <div className="wrap split split-reverse">
            <div className="split-text">
              <h2 id="filing-title">File new documents, review first.</h2>
              <p>
                Tagvico can suggest titles, tags, correspondents, document types and dates for new documents. Suggestions
                wait in a review queue until you apply or reject them. You can switch to full access later so metadata is
                applied automatically, and restore the original metadata if you change your mind.
              </p>
            </div>
            <Shot name="filing" />
          </div>
        </section>

        <section id="install" className="block" aria-labelledby="install-title">
          <div className="wrap statement statement-top">
            <div>
              <h2 id="install-title">Install with Docker.</h2>
              <p>You need Docker Compose, a running Paperless-ngx and a Paperless API token.</p>
              <ol className="steps">
                <li>Save the file as <code>docker-compose.yml</code> and run <code>docker compose up -d</code>.</li>
                <li>Open <code>http://localhost:8080/setup</code> on the Docker host.</li>
                <li>Connect Paperless-ngx, choose a model and create the owner account.</li>
              </ol>
              <p className="small">
                New installations start in review mode with scheduled scans paused. Pin the release tag when you upgrade.
              </p>
              <div className="actions">
                <a className="button button-primary" href={links.install} {...track('installation-open', 'install', 'docs-installation')}>
                  Installation guide
                </a>
                <a className="text-link" href={links.releases} {...track('releases-open', 'install', 'github-releases')}>
                  Release notes <Arrow external />
                </a>
              </div>
            </div>
            <div className="install-code">
              <CodeBlock code={composeSnippet} label="docker-compose.yml" action="compose-copy" />
              <details className="more">
                <summary>Prefer a single docker run command?</summary>
                <CodeBlock code={dockerRunSnippet} label="docker run" action="run-copy" />
              </details>
            </div>
          </div>
        </section>

        <section id="trust" className="block" aria-labelledby="trust-title">
          <div className="wrap statement statement-top">
            <div>
              <h2 id="trust-title">Where your data goes.</h2>
              <a className="text-link" href="/privacy" {...track('privacy-open', 'trust', 'privacy')}>
                Privacy notes <Arrow />
              </a>
            </div>
            <ul className="rows">
              {trust.map(({ title, text }) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="start" className="block closing" aria-labelledby="start-title">
          <div className="wrap closing-inner">
            <Mascot pose="idle" className="mascot-closing" size={96} />
            <h2 id="start-title">Run it next to Paperless-ngx.</h2>
            <div className="actions">
              <a className="button button-primary" href={links.install} {...track('installation-open', 'closing', 'docs-installation')}>
                Installation guide
              </a>
              <a className="text-link" href={links.github} {...track('github-open', 'closing', 'github')}>
                View on GitHub <Arrow external />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
