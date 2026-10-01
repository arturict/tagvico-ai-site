import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react';
import shots from './shots.json';
import { alts, links } from './content.js';

/* __MASCOT_SRC__ is defined in vite.config.js; it is null until public/mascot/ holds an image. */
const mascotSrc = typeof __MASCOT_SRC__ !== 'undefined' ? __MASCOT_SRC__ : null;

/** The Tagvico mascot, drawn as pixel art, so it is scaled without smoothing. */
export function Mascot({ className = '', size = 96 }) {
  if (!mascotSrc) return null;
  return <img className={`mascot ${className}`.trim()} src={mascotSrc} width={size} height={size} alt="" />;
}

export function Arrow({ external = false }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return <Icon className="arrow" size={16} strokeWidth={1.75} aria-hidden="true" />;
}

/** Wrapper for the data attributes the Umami tracker in public/analytics.js reads. */
export const track = (action, location, target) => ({
  'data-analytics-action': action,
  'data-analytics-location': location,
  'data-analytics-target': target,
});

/**
 * A product screenshot with AVIF, WebP and PNG sources and its pixel size, so the
 * page never shifts while it loads. Files are produced by scripts/optimize-shots.mjs.
 */
export function Shot({ name, priority = false }) {
  const { width, height, placeholder } = shots[name];
  const phone = shots[`${name}-mobile`];
  const sizes = '(min-width: 1180px) 1100px, 100vw';
  return (
    <figure
      className="shot"
      data-placeholder={placeholder ? 'true' : undefined}
      data-phone={phone ? 'true' : undefined}
      style={phone ? { '--phone-ratio': `${phone.width} / ${phone.height}` } : undefined}
    >
      <picture>
        {phone && <source media="(max-width: 767px)" type="image/avif" srcSet={`/shots/${name}-mobile-780.avif 780w`} />}
        {phone && <source media="(max-width: 767px)" type="image/webp" srcSet={`/shots/${name}-mobile-780.webp 780w`} />}
        <source type="image/avif" srcSet={`/shots/${name}-800.avif 800w, /shots/${name}-1600.avif ${width}w`} sizes={sizes} />
        <source type="image/webp" srcSet={`/shots/${name}-800.webp 800w, /shots/${name}-1600.webp ${width}w`} sizes={sizes} />
        <img
          src={`/shots/${name}.png`}
          width={width}
          height={height}
          alt={alts[name]}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
        />
      </picture>
    </figure>
  );
}

export function CodeBlock({ code, label, action }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="code">
      <div className="code-bar">
        <span className="code-label">{label}</span>
        <button type="button" className="code-copy" onClick={copy} {...track(action, 'install', 'clipboard')}>
          {copied ? <Check size={16} strokeWidth={1.75} aria-hidden="true" /> : <Copy size={16} strokeWidth={1.75} aria-hidden="true" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre tabIndex={0} aria-label={label}><code>{code}</code></pre>
      <span className="visually-hidden" role="status">{copied ? `${label} copied` : ''}</span>
    </div>
  );
}

export function SiteHeader({ home = false }) {
  const prefix = home ? '' : '/';
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href={prefix || '#hero'} aria-label="Tagvico home" {...track('home', 'header', 'top')}>
          <img src="/tagvico-icon.png" width="28" height="28" alt="" />
          <span>Tagvico</span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href={`${prefix}#companion`} {...track('companion', 'header', 'companion')}>Companion</a>
          <a href={`${prefix}#models`} {...track('models', 'header', 'models')}>Models</a>
          <a href={`${prefix}#install`} {...track('install', 'header', 'install')}>Install</a>
          <a href={`${prefix}#trust`} {...track('trust', 'header', 'trust')}>Privacy</a>
          <a href={links.docs} {...track('docs-open', 'header', 'docs')}>Docs</a>
        </nav>
        <div className="header-actions">
          <a className="header-github" href={links.github} {...track('github-open', 'header', 'github')}>GitHub</a>
          <a className="button button-primary button-small" href={`${prefix}#install`} {...track('get-started', 'header', 'install')}>Get started</a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <a className="brand" href="/" aria-label="Tagvico home">
            <img src="/tagvico-icon.png" width="28" height="28" alt="" />
            <span>Tagvico</span>
          </a>
          <p>Open source under the MIT licence.</p>
        </div>
        <nav aria-label="Product" className="footer-col">
          <h2>Product</h2>
          <a href="/#companion">Companion</a>
          <a href="/#models">Models</a>
          <a href="/#install">Install</a>
        </nav>
        <nav aria-label="Resources" className="footer-col">
          <h2>Resources</h2>
          <a href={links.docs} {...track('docs-open', 'footer', 'docs')}>Documentation</a>
          <a href={links.releases} {...track('releases-open', 'footer', 'github-releases')}>Releases</a>
          <a href={links.github} {...track('github-open', 'footer', 'github')}>GitHub</a>
        </nav>
        <nav aria-label="Legal" className="footer-col">
          <h2>Legal</h2>
          <a href="/privacy" {...track('privacy-open', 'footer', 'privacy')}>Privacy</a>
          <a href="/terms" {...track('terms-open', 'footer', 'terms')}>Terms</a>
          <a href={links.license} {...track('license-open', 'footer', 'license')}>MIT licence</a>
        </nav>
      </div>
    </footer>
  );
}
