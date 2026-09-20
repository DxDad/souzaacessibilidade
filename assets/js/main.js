(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const decreaseButton = document.querySelector('[data-font-decrease]');
  const increaseButton = document.querySelector('[data-font-increase]');
  const textSizeStatus = document.getElementById('text-size-status');
  const themeMeta = document.getElementById('theme-color-meta');
  const textSizes = [14, 16, 18, 20, 22];

  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch { /* Preferência válida apenas nesta página. */ }
    }
  };

  function applyTheme(theme, persist = true) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = normalized;
    if (themeButton) themeButton.textContent = normalized === 'dark' ? 'Modo claro' : 'Modo escuro';
    if (themeMeta) themeMeta.setAttribute('content', normalized === 'dark' ? '#171b18' : '#f4efe5');
    if (persist) storage.set('souza_theme', normalized);
  }

  function applyTextSize(size, announce = false) {
    const normalized = textSizes.includes(size) ? size : 16;
    root.style.setProperty('--text-size', `${normalized}px`);
    root.dataset.textSize = String(normalized);
    storage.set('souza_text_size', String(normalized));
    if (decreaseButton) decreaseButton.disabled = normalized === textSizes[0];
    if (increaseButton) increaseButton.disabled = normalized === textSizes[textSizes.length - 1];
    if (announce && textSizeStatus) textSizeStatus.textContent = `Tamanho do texto: ${normalized} pixels.`;
  }

  applyTheme(root.dataset.theme, false);
  applyTextSize(Number(root.dataset.textSize || storage.get('souza_text_size') || 16));

  themeButton?.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  decreaseButton?.addEventListener('click', () => {
    const current = Number(root.dataset.textSize || 18);
    const index = Math.max(0, textSizes.indexOf(current) - 1);
    applyTextSize(textSizes[index], true);
  });

  increaseButton?.addEventListener('click', () => {
    const current = Number(root.dataset.textSize || 18);
    const index = Math.min(textSizes.length - 1, textSizes.indexOf(current) + 1);
    applyTextSize(textSizes[index], true);
  });

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-menu');
  const submenuToggle = document.querySelector('.submenu-toggle');
  const submenu = document.getElementById('atuacao-menu');

  function closeSubmenu(returnFocus = false) {
    if (!submenuToggle || !submenu) return;
    submenuToggle.setAttribute('aria-expanded', 'false');
    submenu.hidden = true;
    if (returnFocus) submenuToggle.focus();
  }

  function closeMainMenu() {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    const label = navToggle.querySelector('.sr-only');
    if (label) label.textContent = 'Abrir menu';
    closeSubmenu(false);
  }

  closeSubmenu(false);

  navToggle?.addEventListener('click', () => {
    if (!nav) return;
    const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(willOpen));
    nav.classList.toggle('open', willOpen);
    const label = navToggle.querySelector('.sr-only');
    if (label) label.textContent = willOpen ? 'Fechar menu' : 'Abrir menu';
    if (!willOpen) closeSubmenu(false);
  });

  submenuToggle?.addEventListener('click', () => {
    if (!submenu) return;
    const willOpen = submenuToggle.getAttribute('aria-expanded') !== 'true';
    submenuToggle.setAttribute('aria-expanded', String(willOpen));
    submenu.hidden = !willOpen;
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navToggle?.getAttribute('aria-expanded') === 'true') closeMainMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (submenuToggle && !event.target.closest('.nav-submenu')) closeSubmenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (submenuToggle?.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      closeSubmenu(true);
    } else if (navToggle?.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      closeMainMenu();
      navToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1240) closeMainMenu();
  });

  function focusFragmentTarget(fragment, updateHistory = false) {
    const id = fragment.replace(/^#/, '');
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start' });
    if (updateHistory && window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
  }

  document.querySelector('.skip-link')?.addEventListener('click', (event) => {
    event.preventDefault();
    focusFragmentTarget('#conteudo', true);
  });

  if (window.location.hash) requestAnimationFrame(() => focusFragmentTarget(window.location.hash));
  window.addEventListener('hashchange', () => focusFragmentTarget(window.location.hash));

  const consentKey = 'souza_analytics_consent';
  const measurementId = 'G-F6B87YSFC9';
  const storedConsent = storage.get(consentKey);
  const initialAnalytics = storedConsent === 'granted' ? 'granted' : 'denied';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: initialAnalytics,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: true });

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(gaScript);

  const consentBox = document.getElementById('analytics-consent');
  let lastFocus = null;
  let consentResizeObserver = null;

  function deleteAnalyticsCookies() {
    document.cookie.split(';')
      .map((cookie) => cookie.trim().split('=')[0])
      .filter((name) => name === '_ga' || name.startsWith('_ga_'))
      .forEach((name) => {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.souzaacessibilidade.com.br; SameSite=Lax`;
      });
  }

  function updateStatus() {
    const status = document.getElementById('analytics-status');
    if (!status) return;
    const value = storage.get(consentKey);
    status.textContent = value === 'granted'
      ? 'Preferência atual: Analytics com armazenamento ativado.'
      : 'Preferência atual: Analytics com armazenamento negado.';
  }

  function applyConsent(value, persist = true) {
    const normalized = value === 'granted' ? 'granted' : 'denied';
    if (persist) storage.set(consentKey, normalized);
    window.gtag('consent', 'update', { analytics_storage: normalized });
    if (normalized === 'denied') deleteAnalyticsCookies();
    updateStatus();
  }

  function focusableInConsent() {
    if (!consentBox) return [];
    return [...consentBox.querySelectorAll('button:not([disabled]),a[href]')]
      .filter((element) => !element.hidden && element.offsetParent !== null);
  }

  function reserveConsentSpace() {
    if (!consentBox || consentBox.hidden) return;
    document.body.style.setProperty('--consent-height', `${consentBox.getBoundingClientRect().height}px`);
  }

  function showConsent() {
    if (!consentBox) return;
    lastFocus = document.activeElement;
    consentBox.hidden = false;
    document.body.classList.add('consent-visible');
    reserveConsentSpace();
    if ('ResizeObserver' in window) {
      consentResizeObserver = new ResizeObserver(reserveConsentSpace);
      consentResizeObserver.observe(consentBox);
    }
    requestAnimationFrame(() => consentBox.querySelector('[data-consent="granted"]')?.focus());
  }

  function hideConsent(returnFocus = true) {
    if (!consentBox) return;
    consentBox.hidden = true;
    document.body.classList.remove('consent-visible');
    document.body.style.removeProperty('--consent-height');
    consentResizeObserver?.disconnect();
    consentResizeObserver = null;
    if (returnFocus && lastFocus instanceof HTMLElement && lastFocus !== document.body) lastFocus.focus();
    else document.getElementById('conteudo')?.focus();
  }

  if (!storedConsent && consentBox) showConsent();
  updateStatus();

  document.querySelectorAll('[data-consent]').forEach((button) => {
    button.addEventListener('click', () => {
      applyConsent(button.dataset.consent);
      hideConsent(true);
    });
  });

  document.querySelector('[data-consent-close]')?.addEventListener('click', () => {
    applyConsent('denied');
    hideConsent(true);
  });

  document.querySelectorAll('[data-consent-setting]').forEach((button) => {
    button.addEventListener('click', () => applyConsent(button.dataset.consentSetting));
  });

  consentBox?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      applyConsent('denied');
      hideConsent(true);
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusableInConsent();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const sample = document.getElementById('book-sample');
  let sampleTracked = false;
  sample?.addEventListener('toggle', () => {
    if (sample.open && !sampleTracked) {
      sampleTracked = true;
      window.gtag('event', 'book_sample_open');
    }
  });

  document.querySelectorAll('[data-track-event]').forEach((element) => {
    element.addEventListener('click', () => window.gtag('event', element.dataset.trackEvent));
  });
})();
