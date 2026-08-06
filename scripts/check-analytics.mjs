import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';

const source = await readFile(resolve(process.cwd(), 'public/analytics.js'), 'utf8');

const runTracker = ({ doNotTrack = '0', globalPrivacyControl = false } = {}) => {
  const tracked = [];
  const documentListeners = new Map();
  const windowListeners = new Map();
  const timers = [];
  const observers = [];
  const sections = [{ id: 'hero' }];
  const document = {
    title: 'Tagvico',
    visibilityState: 'visible',
    documentElement: { scrollHeight: 1000 },
    addEventListener(name, listener) { documentListeners.set(name, listener); },
    querySelectorAll(selector) { return selector === 'section[id]' ? sections : []; },
  };
  const window = {
    location: {
      pathname: '/',
      search: '?utm_source=Reddit&utm_medium=community&utm_campaign=oss-sharing-2026&utm_content=tagvico-selfhosted-01&utm_term=private&email=person%40example.com',
    },
    doNotTrack,
    innerHeight: 0,
    scrollY: 0,
    umami: {
      track(callback) {
        tracked.push(callback({ url: '/?unsafe=secret', title: 'Tagvico' }));
      },
    },
    addEventListener(name, listener) { windowListeners.set(name, listener); },
    setTimeout(listener) { timers.push(listener); },
  };
  window.window = window;

  class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }
    observe() {}
  }

  vm.runInNewContext(source, {
    document,
    window,
    navigator: { doNotTrack, globalPrivacyControl },
    IntersectionObserver,
    URLSearchParams,
    Set,
  });

  return { tracked, documentListeners, windowListeners, timers, observers, window };
};

const active = runTracker();
assert.equal(active.tracked.length, 1, 'exactly one manual page view should be sent');
assert.equal(
  active.tracked[0].url,
  '/?utm_source=reddit&utm_medium=community&utm_campaign=oss-sharing-2026&utm_content=tagvico-selfhosted-01',
  'only bounded standard UTM parameters should reach Umami',
);
assert(!active.tracked[0].url.includes('utm_term'));
assert(!active.tracked[0].url.includes('email'));

const cta = {
  dataset: {
    analyticsAction: 'installation-open',
    analyticsLocation: 'install',
    analyticsTarget: 'docs-installation',
  },
};
active.documentListeners.get('click')({ target: { closest: () => cta } });
assert.deepEqual(JSON.parse(JSON.stringify(active.tracked.at(-1).data)), {
  action: 'installation-open',
  location: 'install',
  target: 'docs-installation',
});
assert.equal(active.tracked.at(-1).name, 'landing-cta');

active.observers[0].callback([{ target: { id: 'hero' }, isIntersecting: true, intersectionRatio: 0.75 }]);
active.observers[0].callback([{ target: { id: 'hero' }, isIntersecting: true, intersectionRatio: 0.75 }]);
assert.equal(active.tracked.filter(({ name }) => name === 'landing-section-view').length, 1);

const scrollListener = active.windowListeners.get('scroll');
active.tracked.length = 0;
active.window.scrollY = 1000;
scrollListener();
scrollListener();
assert.deepEqual(
  active.tracked.filter(({ name }) => name === 'landing-scroll-depth').map(({ data }) => data.depth),
  [25, 50, 75, 100],
  'scroll thresholds should fire once each',
);

active.tracked.length = 0;
active.timers.forEach((callback) => {
  callback();
  callback();
});
assert.deepEqual(
  active.tracked.filter(({ name }) => name === 'landing-engaged-time').map(({ data }) => data.seconds),
  [30, 60, 120],
  'engaged-time thresholds should fire once each',
);

const privacyEnabled = runTracker({ doNotTrack: '1' });
assert.equal(privacyEnabled.tracked.length, 0, 'Do Not Track must suppress all analytics');
const gpcEnabled = runTracker({ globalPrivacyControl: true });
assert.equal(gpcEnabled.tracked.length, 0, 'Global Privacy Control must suppress all analytics');

console.log('Analytics checks passed.');
