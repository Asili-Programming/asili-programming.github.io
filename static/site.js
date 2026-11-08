// Two small controls, both optional:
// - Language switch: remembers the language the visitor chose (localStorage "asili-lugha").
//   Links always open the page they name; nothing redirects.
// - Theme: System, Light or Dark, remembered in "asili-mandhari". "System" follows the OS setting.
// Storage can be blocked, so every access is guarded.
(function () {
  // Language dropdown: choosing the other language opens its twin page, and remembers the choice
  // (localStorage "asili-lugha"). Nothing redirects on its own.
  var lang = document.getElementById('lang-select');
  if (lang) {
    lang.addEventListener('change', function () {
      var opt = lang.options[lang.selectedIndex];
      var target = opt.value;
      if (!target || target === window.location.href) return;
      try { localStorage.setItem('asili-lugha', opt.getAttribute('data-lugha') || opt.lang); } catch (e) { /* not remembered */ }
      window.location.href = target;
    });
  }

  // Theme dropdown: System, Light or Dark, remembered per visitor (localStorage "asili-mandhari").
  // The page itself is themed before first paint by the small script in base.html.
  var theme = document.getElementById('theme-select');
  if (theme) {
    var root = document.documentElement;
    var current = root.getAttribute('data-theme');
    theme.value = (current === 'light' || current === 'dark') ? current : 'system';
    theme.addEventListener('change', function () {
      var v = theme.value;
      if (v === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', v);
      try {
        if (v === 'system') localStorage.removeItem('asili-mandhari'); else localStorage.setItem('asili-mandhari', v);
      } catch (e) { /* not remembered */ }
    });
  }

  // Mobile menu: the hamburger opens the panel and becomes an X that closes it. Escape, the
  // backdrop and choosing a link also close it. On desktop the button is hidden, so this is inert.
  var header = document.querySelector('header.top');
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu');
  var backdrop = document.getElementById('menu-backdrop');
  if (header && menuBtn && menu && backdrop) {
    var setOpen = function (open) {
      if (open) header.setAttribute('data-open', ''); else header.removeAttribute('data-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? menuBtn.getAttribute('data-close-label') : menuBtn.getAttribute('data-open-label'));
      backdrop.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', function () {
      setOpen(!header.hasAttribute('data-open'));
      if (header.hasAttribute('data-open')) { var first = menu.querySelector('a'); if (first) first.focus(); }
    });
    backdrop.addEventListener('click', function () { setOpen(false); menuBtn.focus(); });
    menu.addEventListener('click', function (ev) { if (ev.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && header.hasAttribute('data-open')) { setOpen(false); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 641px)').addEventListener('change', function (ev) { if (ev.matches) setOpen(false); });
  }

  // Floating alert: shown on the Swahili home page, dismissed for the rest of the visit.
  var toast = document.getElementById('toast');
  if (toast) {
    var dismissed = false;
    try { dismissed = sessionStorage.getItem('asili-toast') === 'closed'; } catch (e) { /* storage blocked: show it */ }
    if (!dismissed) toast.hidden = false;
    var close = document.getElementById('toast-close');
    if (close) close.addEventListener('click', function () {
      toast.hidden = true;
      try { sessionStorage.setItem('asili-toast', 'closed'); } catch (e) { /* not remembered */ }
    });
  }
})();
