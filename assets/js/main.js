(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const decreaseButton = document.querySelector('[data-font-decrease]');
  const increaseButton = document.querySelector('[data-font-increase]');
  const textSizeStatus = document.getElementById('text-size-status');
  const themeMeta = document.getElementById('theme-color-meta');
  const textSizes = [14, 16, 18, 20, 22];

  const themeStatus = document.createElement('span');
  themeStatus.className = 'sr-only';
  themeStatus.setAttribute('role', 'status');
  themeStatus.setAttribute('aria-live', 'polite');
  themeStatus.setAttribute('aria-atomic', 'true');
  themeButton?.insertAdjacentElement('afterend', themeStatus);

  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch { /* Preferência válida apenas nesta página. */ }
    }
  };

  function applyTheme(theme, persist = true, announce = false) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = normalized;

    if (themeButton) {
      themeButton.textContent = normalized === 'dark' ? 'Modo claro' : 'Modo escuro';
    }

    if (themeMeta) {
      themeMeta.setAttribute('content', normalized === 'dark' ? '#171b18' : '#f4efe5');
    }

    if (persist) storage.set('souza_theme', normalized);

    if (announce) {
      themeStatus.textContent = normalized === 'dark' ? 'Modo escuro ativado.' : 'Modo claro ativado.';
    }
  }

  function announceTextSize(message) {
    if (!textSizeStatus) return;
    textSizeStatus.textContent = '';
    requestAnimationFrame(() => {
      textSizeStatus.textContent = message;
    });
  }

  function applyTextSize(size, announce = false) {
    const normalized = textSizes.includes(size) ? size : 16;
    const atMinimum = normalized === textSizes[0];
    const atMaximum = normalized === textSizes[textSizes.length - 1];

    root.style.setProperty('--text-size', `${normalized}px`);
    root.dataset.textSize = String(normalized);
    storage.set('souza_text_size', String(normalized));

    if (decreaseButton) {
      decreaseButton.removeAttribute('disabled');
      decreaseButton.setAttribute('aria-disabled', String(atMinimum));
      decreaseButton.setAttribute('aria-label', atMinimum ? 'Fonte mínima' : 'Diminuir fonte');
    }

    if (increaseButton) {
      increaseButton.removeAttribute('disabled');
      increaseButton.setAttribute('aria-disabled', String(atMaximum));
      increaseButton.setAttribute('aria-label', atMaximum ? 'Fonte máxima' : 'Aumentar fonte');
    }

    if (announce) {
      if (atMinimum) announceTextSize('Fonte mínima.');
      else if (atMaximum) announceTextSize('Fonte máxima.');
      else announceTextSize(`Tamanho da fonte: ${normalized} pixels.`);
    }
  }

  applyTheme(root.dataset.theme, false);
  applyTextSize(Number(root.dataset.textSize || storage.get('souza_text_size') || 16));

  themeButton?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true, true);
  });

  decreaseButton?.addEventListener('click', () => {
    const current = Number(root.dataset.textSize || 16);
    const currentIndex = textSizes.indexOf(current);
    if (currentIndex <= 0) {
      announceTextSize('Fonte mínima.');
      return;
    }
    const index = currentIndex - 1;
    applyTextSize(textSizes[index], true);
  });

  increaseButton?.addEventListener('click', () => {
    const current = Number(root.dataset.textSize || 16);
    const currentIndex = textSizes.indexOf(current);
    if (currentIndex >= textSizes.length - 1) {
      announceTextSize('Fonte máxima.');
      return;
    }
    const index = currentIndex + 1;
    applyTextSize(textSizes[index], true);
  });

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-menu');
  const submenuToggle = document.querySelector('.submenu-toggle');
  const submenu = document.getElementById('atuacao-menu');

  function isMainMenuOpen() {
    return Boolean(
      navToggle &&
      nav &&
      navToggle.getAttribute('aria-expanded') === 'true' &&
      nav.classList.contains('open')
    );
  }

  function focusableInMainMenu() {
    if (!navToggle || !nav) return [];
    const elements = [
      navToggle,
      ...nav.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ];
    return elements.filter((element) =>
      !element.hidden &&
      !element.closest('[hidden]') &&
      element.getClientRects().length > 0
    );
  }

  function keepFocusedItemVisible(element) {
    if (!nav || !(element instanceof HTMLElement) || !nav.contains(element)) return;
    const navRect = nav.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const margin = 12;

    if (elementRect.top < navRect.top + margin) {
      nav.scrollBy({ top: elementRect.top - navRect.top - margin, behavior: 'auto' });
    } else if (elementRect.bottom > navRect.bottom - margin) {
      nav.scrollBy({ top: elementRect.bottom - navRect.bottom + margin, behavior: 'auto' });
    }
  }

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
    document.documentElement.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    nav.scrollTop = 0;
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
    document.documentElement.classList.toggle('nav-open', willOpen);
    document.body.classList.toggle('nav-open', willOpen);
    const label = navToggle.querySelector('.sr-only');
    if (label) label.textContent = willOpen ? 'Fechar menu' : 'Abrir menu';
    if (willOpen) nav.scrollTop = 0;
    else closeSubmenu(false);
  });

  submenuToggle?.addEventListener('click', () => {
    if (!submenu) return;
    const willOpen = submenuToggle.getAttribute('aria-expanded') !== 'true';
    submenuToggle.setAttribute('aria-expanded', String(willOpen));
    submenu.hidden = !willOpen;
  });

  const submenuLinks = submenu ? Array.from(submenu.querySelectorAll('a')) : [];
  const lastSubmenuLink = submenuLinks[submenuLinks.length - 1];

  lastSubmenuLink?.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && !event.shiftKey && submenuToggle?.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      submenuToggle.focus();
    }
  });

  nav?.addEventListener('focusin', (event) => {
    requestAnimationFrame(() => keepFocusedItemVisible(event.target));
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
    if (event.key === 'Tab' && isMainMenuOpen() && !event.defaultPrevented) {
      const items = focusableInMainMenu();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !items.includes(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !items.includes(active))) {
        event.preventDefault();
        first.focus();
      }
      return;
    }

    if (event.key === 'Escape') {
      if (submenuToggle?.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        closeSubmenu(true);
      } else if (isMainMenuOpen()) {
        event.preventDefault();
        closeMainMenu();
        navToggle.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1240) closeMainMenu();
  });

  function focusFragmentTarget(fragment, updateHistory = false) {
    const id = fragment.replace(/^#/, '');
    if (!id) return false;
    const target = document.getElementById(id);
    if (!target) return false;
    const focusTarget = id === 'conteudo'
      ? target
      : target.matches('h1, h2, h3, h4, h5, h6')
        ? target
        : target.querySelector('h1, h2, h3, h4, h5, h6') || target;
    if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
    focusTarget.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start' });
    if (updateHistory && window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    return true;
  }

  document.querySelector('.skip-link')?.addEventListener('click', (event) => {
    event.preventDefault();
    focusFragmentTarget('#conteudo', true);
  });

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
    if (window.location.hash) {
      requestAnimationFrame(() => focusFragmentTarget(window.location.hash));
      return;
    }
    if (returnFocus && lastFocus instanceof HTMLElement && lastFocus !== document.body) lastFocus.focus();
    else document.getElementById('conteudo')?.focus();
  }

  if (!storedConsent && consentBox) showConsent();
  updateStatus();

  function focusCurrentFragment() {
    if (!window.location.hash || (consentBox && !consentBox.hidden)) return;
    requestAnimationFrame(() => focusFragmentTarget(window.location.hash));
  }

  if (document.readyState === 'complete') focusCurrentFragment();
  else window.addEventListener('load', focusCurrentFragment, { once: true });
  window.addEventListener('hashchange', focusCurrentFragment);

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

  if (!document.querySelector('.whatsapp-float')) {
    const whatsappLink = document.createElement('a');
    whatsappLink.className = 'whatsapp-float';
    whatsappLink.href = 'https://wa.me/5511988588232';
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    whatsappLink.title = 'Iniciar conversa pelo WhatsApp';
    whatsappLink.dataset.trackEvent = 'whatsapp_floating_click';
    whatsappLink.innerHTML = `
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.897 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
      </svg>
      <span class="sr-only">Iniciar conversa pelo WhatsApp (abre em nova aba)</span>`;
    document.body.appendChild(whatsappLink);
  }

  document.querySelectorAll('[data-track-event]').forEach((element) => {
    element.addEventListener('click', () => window.gtag('event', element.dataset.trackEvent));
  });
})();
