function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
document.addEventListener('click', e => {
  const menu = document.getElementById('mobileMenu');
  const btn = document.querySelector('.mobile-menu-btn');
  if (menu && btn && menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('open');
  }
});

const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), i * 90);
  });
}, {threshold: 0.08});
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// Safety net: if for any reason the IntersectionObserver never fires
// (slow rendering, heavy page, background tab, etc.), force reveal
// fade-up content after 1.5s so the page can never get stuck blank.
setTimeout(() => {
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => el.classList.add('visible'));
}, 1500);

const scrollBar = document.getElementById('scrollProgress');
function updateScrollProgress() {
  if (!scrollBar) return;
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const max = h.scrollHeight - h.clientHeight;
  scrollBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
}
window.addEventListener('scroll', updateScrollProgress, {passive: true});
updateScrollProgress();

document.querySelectorAll('.hero-ctas a').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

const statNums = document.querySelectorAll('.hero-stats .stat-num');
function playStatCount() {
  statNums.forEach((el, i) => {
    const original = el.dataset.original || el.textContent.trim();
    el.dataset.original = original;
    const match = original.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const duration = 1800;
    const startDelay = i * 150;
    setTimeout(() => {
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = (target * eased).toFixed(decimals);
        el.textContent = prefix + val + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, startDelay);
  });
}
if (statNums.length) {
  const statsEl = document.querySelector('.hero-stats');
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) playStatCount(); });
  }, {threshold: 0.3});
  statsObs.observe(statsEl);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
