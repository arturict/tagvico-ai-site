(() => {
  const clean = (value, fallback) => value?.trim().replace(/\s+/g, " ").slice(0, 100) || fallback;
  const track = (name, data) => window.umami?.track(name, data);
  const seenSections = new Set();
  const seenDepths = new Set();

  const destination = (element) => {
    const href = element.getAttribute("href");
    if (!href) return element.id || element.getAttribute("type") || "button";
    if (href.startsWith("#")) return href;
    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin ? url.pathname : url.hostname;
  };

  document.addEventListener("click", (event) => {
    const element = event.target.closest("a, button, summary");
    if (!element || element.dataset.analyticsIgnore === "true") return;
    const section = element.closest("section[id]")?.id;
    track("interaction", {
      action: clean(element.dataset.analyticsAction, clean(element.getAttribute("aria-label"), clean(element.textContent, "unlabelled"))),
      element: element.tagName.toLowerCase(),
      location: clean(element.dataset.analyticsLocation, element.closest("header") ? "header" : element.closest("footer") ? "footer" : section || "page"),
      destination: clean(element.dataset.analyticsDestination, destination(element)),
      path: window.location.pathname,
    });
  }, true);

  document.addEventListener("toggle", (event) => {
    if (!(event.target instanceof HTMLDetailsElement)) return;
    track("faq-toggle", {
      item: clean(event.target.querySelector("summary")?.textContent, "unlabelled"),
      expanded: event.target.open,
      path: window.location.pathname,
    });
  }, true);

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.intersectionRatio < 0.5 || seenSections.has(entry.target.id)) return;
    seenSections.add(entry.target.id);
    track("section-view", { section: entry.target.id, path: window.location.pathname });
  }), { threshold: 0.5 });
  document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));

  const trackDepth = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const percent = available > 0 ? Math.round((window.scrollY / available) * 100) : 100;
    [25, 50, 75, 90, 100].forEach((depth) => {
      if (percent >= depth && !seenDepths.has(depth)) {
        seenDepths.add(depth);
        track("scroll-depth", { percent: depth, path: window.location.pathname });
      }
    });
  };
  window.addEventListener("scroll", trackDepth, { passive: true });
  trackDepth();

  [30, 60, 120].forEach((seconds) => window.setTimeout(() => {
    if (document.visibilityState === "visible") track("engagement", { seconds, path: window.location.pathname });
  }, seconds * 1000));

  window.addEventListener("tagvico:analytics", (event) => {
    if (event.detail?.name) track(event.detail.name, event.detail.data || {});
  });
})();
