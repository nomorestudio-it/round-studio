const body = document.body;
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu-panel');

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 32);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

function closeMenu() {
  body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-hidden', 'true');
}

menuButton?.addEventListener('click', () => {
  const opening = !body.classList.contains('menu-open');
  body.classList.toggle('menu-open', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  menu?.setAttribute('aria-hidden', String(!opening));
});

document.querySelector('.menu-close')?.addEventListener('click', closeMenu);

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const data = new FormData(contactForm);
  const lines = [
    `Nome: ${data.get('nome') || ''}`,
    `Email: ${data.get('email') || ''}`,
    `Tipo di spazio: ${data.get('tipo') || 'Da definire'}`,
    `Luogo: ${data.get('luogo') || 'Da definire'}`,
    '',
    `${data.get('messaggio') || ''}`,
  ];
  const recipient = contactForm.dataset.recipient || '';
  const subject = encodeURIComponent('Nuovo progetto per ROUND Studio');
  const bodyText = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${bodyText}`;
});
