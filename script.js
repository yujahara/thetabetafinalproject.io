// ------- Mobile menu: accessible toggle with hidden handling -------
const btn = document.querySelector('.hamburger');
const menu = document.getElementById('mobile-menu');

function setMenu(open) {
    if (!btn || !menu) return;
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    menu.hidden = !open;
    if (open) menu.querySelector('a')?.focus();
}

btn?.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    setMenu(open);
});

menu?.addEventListener('click', e => {
    if (e.target.closest('a')) setMenu(false);
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ------- Fundraisers carousel -------

const FLYER_COUNT = 8;     // <-- update this
const FLYER_BASE  = 'photos/flyers';
const FLYER_EXT   = 'png';

const track = document.getElementById('flyer-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indexEl = document.getElementById('flyer-index');
const totalEl = document.getElementById('flyer-total');

(function buildFlyers(){
    if (!track) return;
    totalEl.textContent = String(FLYER_COUNT);

    for (let i = 1; i <= FLYER_COUNT; i++){
        const slide = document.createElement('div');
        slide.className = 'flyer-slide';

        const img = document.createElement('img');
        img.loading = i === 1 ? 'eager' : 'lazy';
        img.decoding = 'async';
        img.alt = `Fundraiser flyer ${i}`;
        img.src = `${FLYER_BASE}/${i}.${FLYER_EXT}`;

        slide.appendChild(img);
        track.appendChild(slide);
    }
    updateIndexFromScroll();
})();

function getSnapWidth(){
    // Each slide is 100% width; include the gap (12px) between slides.
    return track.clientWidth + 12;
}

function snapTo(direction){
    const delta = direction === 'next' ? getSnapWidth() : -getSnapWidth();
    track.scrollBy({ left: delta, behavior: 'smooth' });
}

prevBtn?.addEventListener('click', () => snapTo('prev'));
nextBtn?.addEventListener('click', () => snapTo('next'));

// Keyboard support when track is focused
track?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); snapTo('next'); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); snapTo('prev'); }
});

// Update index on scroll (debounced with rAF)
let raf = null;
track?.addEventListener('scroll', () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateIndexFromScroll);
});

function updateIndexFromScroll(){
    const x = track.scrollLeft;
    const w = getSnapWidth();
    const idx = Math.round(x / w) + 1; // 1-based
    const clamped = Math.min(Math.max(idx, 1), FLYER_COUNT);
    indexEl.textContent = String(clamped);
    if (prevBtn) prevBtn.disabled = clamped <= 1;
    if (nextBtn) nextBtn.disabled = clamped >= FLYER_COUNT;
}
