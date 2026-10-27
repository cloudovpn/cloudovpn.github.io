/* Lightweight accessibility and navigation for the static CloudVPN website. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
      nav.classList.toggle('is-open', !expanded);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }));
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  const rail = document.querySelector('.gallery-rail');
  if (rail) {
    document.querySelectorAll('[data-scroll]').forEach(button => {
      button.addEventListener('click', () => {
        const direction = button.dataset.scroll === 'next' ? 1 : -1;
        const card = rail.querySelector('.shot-card');
        const distance = card ? card.getBoundingClientRect().width + 18 : 220;
        rail.scrollBy({left: direction * distance, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
      });
    });
  }
})();
