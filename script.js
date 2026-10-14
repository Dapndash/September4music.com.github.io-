(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    const close = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();