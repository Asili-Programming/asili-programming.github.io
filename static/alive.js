// Motion for the home hero: parallax on the banner, a particle field that reacts to the pointer,
// and a gentle reveal of sections. Everything here is decoration: it is skipped entirely under
// prefers-reduced-motion, stops when the hero is off screen, and never hides content.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stage = document.querySelector('[data-hero]');
  if (!stage) return;

  var art = stage.querySelector('.hero-art');
  var canvas = stage.querySelector('.hero-particles');
  var visible = true;

  // ---- Parallax -------------------------------------------------------------------------------
  var ticking = false;
  function parallax() {
    ticking = false;
    var y = Math.max(0, Math.min(stage.offsetHeight, window.scrollY));
    art.style.transform = 'translate3d(0,' + (y * 0.25).toFixed(1) + 'px,0) scale(1.12)';
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }

  // ---- Particles ------------------------------------------------------------------------------
  var ctx = canvas.getContext && canvas.getContext('2d');
  var particles = [];
  var pointer = { x: -9999, y: -9999 };
  var width = 0, height = 0, dpr = 1, raf = 0;

  function colours() {
    var cs = getComputedStyle(document.documentElement);
    return [cs.getPropertyValue('--copper').trim() || '#e0aa74', cs.getPropertyValue('--olive').trim() || '#a9bb72'];
  }
  var palette = colours();

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = stage.offsetWidth;
    height = stage.offsetHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.min(70, Math.round((width * height) / 9000));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: 0.8 + Math.random() * 1.8, c: palette[i % 2]
      });
    }
  }

  function step() {
    raf = 0;
    if (!visible) return;
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var dx = p.x - pointer.x, dy = p.y - pointer.y;
      var d2 = dx * dx + dy * dy;
      if (d2 < 9000) { // push away from the pointer
        var f = (9000 - d2) / 9000 * 0.6;
        p.vx += dx * f * 0.02;
        p.vy += dy * f * 0.02;
      }
      p.vx *= 0.985; p.vy *= 0.985;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x += width; if (p.x > width) p.x -= width;
      if (p.y < 0) p.y += height; if (p.y > height) p.y -= height;
    }
    ctx.globalAlpha = 0.95;
    for (var a = 0; a < particles.length; a++) {
      var A = particles[a];
      ctx.fillStyle = A.c;
      ctx.beginPath(); ctx.arc(A.x, A.y, A.r, 0, Math.PI * 2); ctx.fill();
      for (var b = a + 1; b < particles.length; b++) {
        var B = particles[b];
        var ex = A.x - B.x, ey = A.y - B.y;
        var dist = Math.sqrt(ex * ex + ey * ey);
        if (dist < 90) {
          ctx.globalAlpha = (1 - dist / 90) * 0.6;
          ctx.strokeStyle = A.c;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(step);
  }

  stage.addEventListener('pointermove', function (e) {
    var rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  });
  stage.addEventListener('pointerleave', function () { pointer.x = pointer.y = -9999; });

  // Start, pause and resume with visibility, so an off-screen hero costs nothing.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !raf && ctx && !reduce) raf = requestAnimationFrame(step);
    }).observe(stage);
  }

  if (!reduce) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { resize(); });
    if (ctx) {
      resize();
      raf = requestAnimationFrame(step);
    }
    parallax();
  }

  // ---- Section reveal -------------------------------------------------------------------------
  // Sections start visible; the class only adds a small fade-in once they scroll into view.
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.prose h2, .prose .grid, .prose ul.mods').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();
