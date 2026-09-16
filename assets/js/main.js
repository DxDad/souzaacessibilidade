
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-menu');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
      const sr = toggle.querySelector('.sr-only');
      if (sr) sr.textContent = open ? 'Abrir menu' : 'Fechar menu';
    });
  }

  const consentKey = 'souza_analytics_consent';
  const consentBox = document.getElementById('analytics-consent');
  let analyticsLoaded = false;

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-F6B87YSFC9', { anonymize_ip: true });
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-F6B87YSFC9';
    document.head.appendChild(s);
  }

  const stored = localStorage.getItem(consentKey);
  if (stored === 'granted') loadAnalytics();
  if (!stored && consentBox) consentBox.hidden = false;

  document.querySelectorAll('[data-consent]').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.consent;
      localStorage.setItem(consentKey, value);
      if (value === 'granted') loadAnalytics();
      if (consentBox) consentBox.hidden = true;
    });
  });

  const reset = document.querySelector('[data-reset-consent]');
  if (reset) reset.addEventListener('click', () => {
    localStorage.removeItem(consentKey);
    if (consentBox) consentBox.hidden = false;
    consentBox?.querySelector('button')?.focus();
  });
})();
