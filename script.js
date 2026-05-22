// ── Guest Name from URL ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('to');
    if (guest) document.getElementById('guest-name').innerText = guest;

    AOS.init({ once: true, offset: 60, duration: 1200 });

    // Swiper Gallery
    new Swiper('.gallery-swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        effect: 'coverflow',
        coverflowEffect: { rotate: 20, stretch: 0, depth: 100, modifier: 1, slideShadows: false }
    });

    // Countdown
    const target = new Date('2026-05-30T10:00:00');
    setInterval(() => {
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) return;
        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);
        document.getElementById('cd-hari').textContent   = String(d).padStart(2,'0');
        document.getElementById('cd-jam').textContent    = String(h).padStart(2,'0');
        document.getElementById('cd-menit').textContent  = String(m).padStart(2,'0');
        document.getElementById('cd-detik').textContent  = String(s).padStart(2,'0');
    }, 1000);
});

// ── Particles (gold dust) ───────────────────────
particlesJS('particles-js', {
    particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: ['#F0DEC8', '#D4AF37', '#ffffff'] },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.05 } },
        size: { value: 2.5, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 0.4, direction: 'top', random: true, out_mode: 'out' }
    },
    interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    retina_detect: true
});

// ── Open Invitation ─────────────────────────────
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let playing = false;

function openInvitation() {
    const cover = document.getElementById('cover');
    const main  = document.getElementById('main');

    cover.style.opacity   = '0';
    cover.style.transform = 'scale(1.04)';
    setTimeout(() => {
        cover.style.display = 'none';
        main.style.display  = 'block';
        requestAnimationFrame(() => {
            main.style.opacity = '1';
            AOS.refresh();
        });
    }, 1400);

    // auto-play music
    audio.volume = 0;
    audio.play().then(() => {
        playing = true;
        musicBtn.classList.add('playing');
        // fade in volume
        let v = 0;
        const fade = setInterval(() => {
            v = Math.min(v + 0.04, 0.75);
            audio.volume = v;
            if (v >= 0.75) clearInterval(fade);
        }, 200);
    }).catch(() => {});
}

// ── Toggle Music ────────────────────────────────
function toggleMusic() {
    if (playing) {
        audio.pause();
        musicBtn.classList.remove('playing');
    } else {
        audio.play();
        musicBtn.classList.add('playing');
    }
    playing = !playing;
}

// ── RSVP Submit ─────────────────────────────────
function submitRSVP(e) {
    e.preventDefault();
    const nama     = document.getElementById('nama').value.trim();
    const kehadiran = document.getElementById('kehadiran').value;
    const ucapan   = document.getElementById('ucapan').value.trim();

    const container = document.getElementById('wishes-container');
    const card = document.createElement('div');
    card.className = 'wish-card';
    card.style.animation = 'wishAppear .6s ease forwards';
    card.innerHTML = `
        <div class="wish-name serif">${nama} <span style="font-size:.7rem;color:rgba(240,222,200,.5);">✦</span></div>
        <div class="wish-text">${ucapan}</div>
        <div class="wish-time">${kehadiran} · Baru saja</div>
    `;
    container.prepend(card);

    document.getElementById('rsvp-form').reset();

    // simple toast instead of external lib
    showToast('Terima kasih! Ucapan Anda telah terkirim 🤍');
}

// ── Copy Rekening ────────────────────────────────
function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => showToast('Nomor rekening berhasil disalin!'));
}

// ── Toast Notification ───────────────────────────
function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
            background:rgba(20,8,8,.85); color:#F0DEC8;
            border:1px solid rgba(240,222,200,.3); border-radius:30px;
            padding:12px 28px; font-family:'Jost',sans-serif; font-size:.78rem;
            letter-spacing:1px; z-index:99999; backdrop-filter:blur(10px);
            opacity:0; transition:opacity .4s ease; white-space:nowrap;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// ── Wish appear animation ───────────────────────
const style = document.createElement('style');
style.textContent = `@keyframes wishAppear { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(style);
