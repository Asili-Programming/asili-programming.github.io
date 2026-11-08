// Two small controls, both optional:
// - Language switch: remembers the language the visitor chose (localStorage "asili-lugha").
//   Links always open the page they name; nothing redirects.
// - Theme: System, Light or Dark, remembered in "asili-mandhari". "System" follows the OS setting.
// Storage can be blocked, so every access is guarded.
(function () {
  try {
    var links = document.querySelectorAll('a[data-lugha]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (ev) {
        try { localStorage.setItem('asili-lugha', ev.currentTarget.getAttribute('data-lugha')); } catch (e) { /* not remembered */ }
      });
    }
  } catch (e) { /* no DOM support */ }

  var btn = document.getElementById('theme-btn');
  if (!btn) return;
  var root = document.documentElement;
  var order = ['system', 'light', 'dark'];
  function current() {
    var t = root.getAttribute('data-theme');
    return t === 'light' || t === 'dark' ? t : 'system';
  }
  function show() {
    var c = current();
    btn.textContent = btn.getAttribute('data-label-' + c);
  }
  btn.addEventListener('click', function () {
    var next = order[(order.indexOf(current()) + 1) % order.length];
    if (next === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', next);
    try {
      if (next === 'system') localStorage.removeItem('asili-mandhari');
      else localStorage.setItem('asili-mandhari', next);
    } catch (e) { /* not remembered */ }
    show();
  });
  show();
})();
