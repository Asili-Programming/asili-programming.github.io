// Language switch. Each switch link names the language it opens and carries data-lugha; a click
// stores that choice in localStorage so the next visit can start there. The script never
// redirects: links always open the page they name. Storage can be blocked, so it is guarded.
(function () {
  var key = 'asili-lugha';
  var links = document.querySelectorAll('a[data-lugha]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (ev) {
      try { localStorage.setItem(key, ev.currentTarget.getAttribute('data-lugha')); } catch (e) { /* not remembered */ }
    });
  }
})();
