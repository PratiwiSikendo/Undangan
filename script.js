// ── Firebase Setup ──────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getDatabase, ref, push, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAU-rPvsMf1LOcfhiCObMA4qhv3m1-tmDg",
    authDomain: "undangan-5b4ae.firebaseapp.com",
    databaseURL: "https://undangan-5b4ae-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "undangan-5b4ae",
    storageBucket: "undangan-5b4ae.firebasestorage.app",
    messagingSenderId: "698963662272",
    appId: "1:698963662272:web:cf3d4f4bb123fa4ecee425",
    measurementId: "G-X57P5314DD"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// ── Guest Name from URL ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const guest  = params.get('to');
    if (guest) document.getElementById('guest-name').innerText = guest;

    AOS.init({ once: true, offset: 50, duration: 1000 });

    // Swiper Gallery
    new Swiper('.gallery-swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 18,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        effect: 'coverflow',
        coverflowEffect: { rotate: 18, stretch: 0, depth: 90, modifier: 1, slideShadows: false }
    });

    // Countdown
    const target = new Date('2026-05-30T10:00:00');
    setInterval(() => {
        const now  = new Date();
        const diff = target - now;
        if (diff <= 0) {
            ['cd-hari','cd-jam','cd-menit','cd-detik'].forEach(id => document.getElementById(id).textContent = '00');
            return;
        }
        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);
        document.getElementById('cd-hari').textContent  = String(d).padStart(2,'0');
        document.getElementById('cd-jam').textContent   = String(h).padStart(2,'0');
        document.getElementById('cd-menit').textContent = String(m).padStart(2,'0');
        document.getElementById('cd-detik').textContent = String(s).padStart(2,'0');
    }, 1000);

    // ── Load wishes dari Firebase ─────────────────
    loadWishes();

    // ── Lightbox setup ────────────────────────────
    const lb = document.createElement('div');
    lb.className = 'lightbox-overlay';
    lb.innerHTML = '<button class="lightbox-close" onclick="closeLightbox()">&times;</button><img id="lb-img" src="" alt="">';
    document.body.appendChild(lb);
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

    // Lightbox untuk foto kolase
    setTimeout(() => {
        document.querySelectorAll('.col-item img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => openLightbox(img.src));
        });
    }, 500);
});

// ── Particles (gold dust) ───────────────────────
particlesJS('particles-js', {
    particles: {
        number: { value: 45, density: { enable: true, value_area: 900 } },
        color: { value: ['#F0DEC8', '#D4AF37', '#ffffff'] },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true, anim: { enable: true, speed: 0.6, opacity_min: 0.04 } },
        size: { value: 2.2, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 0.35, direction: 'top', random: true, out_mode: 'out' }
    },
    interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    retina_detect: true
});

// ── Open Invitation ─────────────────────────────
const audio    = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let playing    = false;

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
    }, 1300);

    audio.volume = 0;
    audio.play().then(() => {
        playing = true;
        musicBtn.classList.add('playing');
        let v = 0;
        const fade = setInterval(() => {
            v = Math.min(v + 0.04, 0.72);
            audio.volume = v;
            if (v >= 0.72) clearInterval(fade);
        }, 200);
    }).catch(() => {});
}

window.openInvitation = openInvitation;

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

window.toggleMusic = toggleMusic;

// ── RSVP Submit → simpan ke Firebase ────────────
function submitRSVP(e) {
    e.preventDefault();
    const nama      = document.getElementById('nama').value.trim();
    const jumlah    = document.getElementById('jumlah').value;
    const kehadiran = document.getElementById('kehadiran').value;
    const ucapan    = document.getElementById('ucapan').value.trim();

    const wishRef = ref(db, 'wishes');
    push(wishRef, {
        nama,
        jumlah,
        kehadiran,
        ucapan,
        timestamp: serverTimestamp()
    }).then(() => {
        document.getElementById('rsvp-form').reset();
        showToast('Terima kasih! Ucapan Anda telah terkirim 🤍');
    }).catch(() => {
        showToast('Gagal mengirim, coba lagi ya 🙏');
    });
}

window.submitRSVP = submitRSVP;

// ── Load & Tampilkan Wishes dari Firebase ────────
function loadWishes() {
    const wishRef   = ref(db, 'wishes');
    const container = document.getElementById('wishes-container');

    onValue(wishRef, (snapshot) => {
        // Hapus semua card kecuali card default pertama
        container.innerHTML = '';

        if (!snapshot.exists()) {
            container.innerHTML = `
                <div class="wish-card">
                    <div class="wish-name serif">Keluarga Besar <span style="font-size:.7rem;color:rgba(240,222,200,.4);">✦</span></div>
                    <div class="wish-text">Selamat menempuh hidup baru. Semoga rumah tangga kalian selalu diberkati Tuhan dan penuh kebahagiaan.</div>
                    <div class="wish-time">Hadir · Baru saja</div>
                </div>`;
            return;
        }

        // Kumpulkan semua data lalu tampilkan terbaru di atas
        const wishes = [];
        snapshot.forEach(child => {
            wishes.push({ key: child.key, ...child.val() });
        });
        wishes.reverse();

        wishes.forEach(data => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.dataset.key = data.key;

            const waktu = data.timestamp
                ? new Date(data.timestamp).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })
                : 'Baru saja';

            card.innerHTML = `
                <div class="wish-name serif">${escHtml(data.nama)} <span style="font-size:.68rem;color:rgba(240,222,200,.4);">✦</span></div>
                <div class="wish-text">${escHtml(data.ucapan)}</div>
                <div class="wish-time">${escHtml(data.kehadiran)} · ${waktu} · ${data.jumlah || 1} pax</div>
                <button class="btn-reply" onclick="toggleReply(this)">
                    <i class="fas fa-reply"></i> Balas
                </button>
                <div class="reply-form" style="display:none;">
                    <input type="text" class="input-field reply-input"
                        placeholder="Tulis balasan dari Christian &amp; Anggita…"
                        style="margin-top:10px;margin-bottom:8px;font-size:.78rem;padding:10px 14px;">
                    <button class="btn-send-reply" onclick="sendReply(this)">Kirim Balasan</button>
                </div>
                <div class="reply-section"></div>
            `;
            container.appendChild(card);
        });
    });
}

// ── Helper: escape HTML ──────────────────────────
function escHtml(str) {
    return String(str)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;');
}

// ── Toggle Reply Form ────────────────────────────
function toggleReply(btn) {
    const card     = btn.closest('.wish-card');
    const form     = card.querySelector('.reply-form');
    const isHidden = form.style.display === 'none';
    form.style.display = isHidden ? 'block' : 'none';
    if (isHidden) setTimeout(() => card.querySelector('.reply-input').focus(), 50);
}

window.toggleReply = toggleReply;

// ── Send Reply ───────────────────────────────────
function sendReply(btn) {
    const card  = btn.closest('.wish-card');
    const input = card.querySelector('.reply-input');
    const text  = input.value.trim();
    if (!text) return;

    const replySection = card.querySelector('.reply-section');
    const replyEl      = document.createElement('div');
    replyEl.className  = 'reply-bubble';
    replyEl.innerHTML  = `
        <div class="reply-author">
            <i class="fas fa-heart" style="font-size:.6rem;margin-right:6px;color:rgba(180,130,130,.7);"></i>
            Christian &amp; Anggita
        </div>
        <div class="reply-text">${escHtml(text)}</div>
    `;
    replySection.appendChild(replyEl);
    input.value = '';
    card.querySelector('.reply-form').style.display = 'none';
    showToast('Balasan terkirim 🤍');
}

window.sendReply = sendReply;

// ── Copy Rekening ────────────────────────────────
function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => showToast('Nomor rekening berhasil disalin!'));
}

window.copyText = copyText;

// ── Toast ─────────────────────────────────────────
function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position:fixed; bottom:82px; left:50%; transform:translateX(-50%);
            background:rgba(20,8,8,.88); color:#F0DEC8;
            border:1px solid rgba(240,222,200,.28); border-radius:30px;
            padding:11px 26px; font-family:'Jost',sans-serif; font-size:.75rem;
            letter-spacing:1px; z-index:99999; backdrop-filter:blur(8px);
            opacity:0; transition:opacity .35s ease; white-space:nowrap;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2800);
}

// ── Wish appear animation ────────────────────────
const styleEl = document.createElement('style');
styleEl.textContent = `@keyframes wishAppear { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(styleEl);

// ── Lightbox ─────────────────────────────────────
function openLightbox(src) {
    const lb = document.querySelector('.lightbox-overlay');
    document.getElementById('lb-img').src = src;
    lb.classList.add('active');
}

function closeLightbox() {
    document.querySelector('.lightbox-overlay').classList.remove('active');
}

window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;