// Mobile menu: toggle with class (responsive header)
const btn = document.querySelector('.hamburger');
const menu = document.getElementById('mobile-menu');

btn?.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    // show/hide + remove hidden attr for a11y
    menu.hidden = false;
    menu.classList.toggle('open', !open);
});

menu?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    })
);

document.getElementById('year').textContent = new Date().getFullYear();
