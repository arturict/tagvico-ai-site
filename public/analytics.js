(() => {
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  const SAFE_UTM_VALUE = /^[a-z0-9][a-z0-9._-]{0,63}$/i;
  const SAFE_EVENT_VALUE = /^[a-z0-9][a-z0-9-]{0,49}$/;
  const privacySignalEnabled = navigator.globalPrivacyControl !== true
    && navigator.doNotTrack !== "1"
    && window.doNotTrack !== "1";
  const campaign = UTM_KEYS.reduce((values, key) => {
    const value = new URLSearchParams(window.location.search).get(key);
    if (value && SAFE_UTM_VALUE.test(value)) values[key] = value.toLowerCase();
    return values;
  }, {});
  const campaignQuery = new URLSearchParams(campaign).toString();
  const analyticsUrl = `${window.location.pathname}${campaignQuery ? `?${campaignQuery}` : ""}`;
  const track = (name, data) => {
    if (!privacySignalEnabled || typeof window.umami?.track !== "function") return;
    window.umami.track((properties) => ({
      ...properties,
      url: analyticsUrl,
      name,
      data,
    }));
  };
  const seenSections = new Set();
  const seenDepths = new Set();
  const seenEngagement = new Set();

  document.addEventListener("click", (event) => {
    const element = event.target.closest("[data-analytics-action]");
    if (!element || element.dataset.analyticsIgnore === "true") return;
    const data = {
      action: element.dataset.analyticsAction,
      location: element.dataset.analyticsLocation,
      target: element.dataset.analyticsTarget,
    };
    if (!Object.values(data).every((value) => SAFE_EVENT_VALUE.test(value || ""))) return;
    track("landing-cta", data);
  }, true);

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.intersectionRatio < 0.5 || seenSections.has(entry.target.id)) return;
    seenSections.add(entry.target.id);
    if (SAFE_EVENT_VALUE.test(entry.target.id)) track("landing-section-view", { section: entry.target.id });
  }), { threshold: 0.5 });
  document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));

  const trackDepth = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const percent = available > 0 ? Math.round((window.scrollY / available) * 100) : 100;
    [25, 50, 75, 100].forEach((depth) => {
      if (percent >= depth && !seenDepths.has(depth)) {
        seenDepths.add(depth);
        track("landing-scroll-depth", { depth });
      }
    });
  };
  window.addEventListener("scroll", trackDepth, { passive: true });
  trackDepth();

  [30, 60, 120].forEach((seconds) => window.setTimeout(() => {
    if (document.visibilityState === "visible" && !seenEngagement.has(seconds)) {
      seenEngagement.add(seconds);
      track("landing-engaged-time", { seconds });
    }
  }, seconds * 1000));

  if (privacySignalEnabled && typeof window.umami?.track === "function") {
    window.umami.track((properties) => ({ ...properties, url: analyticsUrl, title: document.title }));
  }
})();
