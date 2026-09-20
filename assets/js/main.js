(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-menu');
  const submenuToggle = document.querySelector('.submenu-toggle');
  const submenu = document.getElementById('atuacao-menu');

  const closeSubmenu = (returnFocus = false) => {
    if (!submenuToggle || !submenu) return;
    submenuToggle.setAttribute('aria-expanded', 'false');
    submenu.hidden = true;
    if (returnFocus) submenuToggle.focus();
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
      const sr = navToggle.querySelector('.sr-only');
      if (sr) sr.textContent = open ? 'Abrir menu' : 'Fechar menu';
      if (open) closeSubmenu(false);
    });
  }

  if (submenuToggle && submenu) {
    const initiallyOpen = submenuToggle.getAttribute('aria-expanded') === 'true';
    submenu.hidden = !initiallyOpen;
    submenuToggle.addEventListener('click', () => {
      const open = submenuToggle.getAttribute('aria-expanded') === 'true';
      submenuToggle.setAttribute('aria-expanded', String(!open));
      submenu.hidden = open;
    });
    submenu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSubmenu(true);
      }
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.nav-submenu')) closeSubmenu(false);
    });
  }

  const consentKey = 'souza_analytics_consent';
  const measurementId = 'G-F6B87YSFC9';
  const stored = localStorage.getItem(consentKey);
  const initialAnalytics = stored === 'granted' ? 'granted' : 'denied';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
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

  function deleteAnalyticsCookies() {
    document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(name => name === '_ga' || name.startsWith('_ga_')).forEach(name => {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.souzaacessibilidade.com.br; SameSite=Lax`;
    });
  }

  function updateStatus() {
    const status = document.getElementById('analytics-status');
    if (!status) return;
    const value = localStorage.getItem(consentKey);
    status.textContent = value === 'granted' ? 'Preferência atual: Analytics com armazenamento ativado.' : 'Preferência atual: Analytics com armazenamento negado.';
  }

  function applyConsent(value, persist = true) {
    const normalized = value === 'granted' ? 'granted' : 'denied';
    if (persist) localStorage.setItem(consentKey, normalized);
    window.gtag('consent', 'update', { analytics_storage: normalized });
    if (normalized === 'denied') deleteAnalyticsCookies();
    updateStatus();
  }

  function focusableInConsent() {
    if (!consentBox) return [];
    return [...consentBox.querySelectorAll('button:not([disabled]),a[href]')].filter(el => !el.hidden && el.offsetParent !== null);
  }

  function showConsent() {
    if (!consentBox) return;
    lastFocus = document.activeElement;
    consentBox.hidden = false;
    requestAnimationFrame(() => consentBox.querySelector('[data-consent="granted"]')?.focus());
  }

  function hideConsent(returnFocus = true) {
    if (!consentBox) return;
    consentBox.hidden = true;
    if (returnFocus && lastFocus instanceof HTMLElement && lastFocus !== document.body) { lastFocus.focus(); } else { document.getElementById('conteudo')?.focus(); }
  }

  if (!stored && consentBox) showConsent();
  updateStatus();

  document.querySelectorAll('[data-consent]').forEach(button => {
    button.addEventListener('click', () => {
      applyConsent(button.dataset.consent);
      hideConsent(true);
    });
  });

  document.querySelector('[data-consent-close]')?.addEventListener('click', () => {
    applyConsent('denied');
    hideConsent(true);
  });

  document.querySelectorAll('[data-consent-setting]').forEach(button => {
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
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
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

  document.querySelectorAll('[data-track-event]').forEach(el => {
    el.addEventListener('click', () => window.gtag('event', el.dataset.trackEvent));
  });

  const sanitizeVLibras = () => {
    document.querySelectorAll('[vw-access-button]').forEach(el => {
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('tabindex', '-1');
      el.querySelectorAll('button,a,[tabindex]').forEach(child => {
        child.setAttribute('aria-hidden', 'true');
        child.setAttribute('tabindex', '-1');
      });
    });
  };
  sanitizeVLibras();
  const observer = new MutationObserver(sanitizeVLibras);
  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(sanitizeVLibras, 1200);
})();
