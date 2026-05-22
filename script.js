// URL Parameters for Guest Name
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || 'Tamu Kehormatan';
    document.getElementById('guest-name').innerText = guestName;

    // Initialize AOS
    AOS.init({
        once: true,
        offset: 50
    });

    // Remove loading screen
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 1500);
    }, 1000);
});

// Particles.js (Gold Dust Effect)
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": ["#D4AF37", "#E5C78B", "#F5F2EB"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 3, "random": true, "anim": { "enable": false } },
        "line_linked": { "enable": false },
        "move": { "enable": true, "speed": 0.5, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true }
    },
    "retina_detect": true
});

// Opening Animation & Music
const audio = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let isPlaying = false;

function openInvitation() {
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    
    // Smooth cinematic transition
    openingScreen.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        openingScreen.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.style.opacity = '1';
            AOS.refresh();
        }, 100);
    }, 1500);

    // Play Music
    audio.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add("playing");
    }).catch(err => console.log("Audio autoplay prevented by browser"));
}

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicBtn.classList.remove("playing");
    } else {
        audio.play();
        musicBtn.classList.add("playing");
    }
    isPlaying = !isPlaying;
}

// Countdown Timer
const countdownDate = new Date("May 30, 2026 10:00:00").getTime();
const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("cd-hari").innerHTML = days < 10 ? '0'+days : days;
    document.getElementById("cd-jam").innerHTML = hours < 10 ? '0'+hours : hours;
    document.getElementById("cd-menit").innerHTML = minutes < 10 ? '0'+minutes : minutes;
    document.getElementById("cd-detik").innerHTML = seconds < 10 ? '0'+seconds : seconds;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("cd-hari").innerHTML = "00";
        document.getElementById("cd-jam").innerHTML = "00";
        document.getElementById("cd-menit").innerHTML = "00";
        document.getElementById("cd-detik").innerHTML = "00";
    }
}, 1000);

// Modal Gallery
const modal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');

function openModal(src) {
    modal.classList.add('show');
    modalImg.src = src;
    document.body.style.overflow = 'hidden'; // prevent scrolling
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Copy Rekening
function copyRekening() {
    const rek = document.getElementById('rekening').innerText;
    navigator.clipboard.writeText(rek).then(() => {
        Swal.fire({
            title: 'Berhasil!',
            text: 'Nomor rekening berhasil disalin',
            icon: 'success',
            background: '#141414',
            color: '#D4AF37',
            confirmButtonColor: '#D4AF37',
            confirmButtonText: 'Tutup'
        });
    });
}

// RSVP Submit
function submitRSVP(e) {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const kehadiran = document.getElementById('kehadiran').value;
    const ucapan = document.getElementById('ucapan').value;
    
    // Add to UI
    const container = document.getElementById('comments-container');
    const newDiv = document.createElement('div');
    newDiv.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
    newDiv.style.paddingBottom = '15px';
    newDiv.style.marginBottom = '15px';
    newDiv.style.animation = 'fadeInUp 0.8s ease forwards';
    
    const icon = kehadiran === 'Hadir' ? '<i class="fas fa-check-circle" style="color: var(--gold); font-size: 0.7rem; margin-left: 5px;"></i>' : '';
    
    newDiv.innerHTML = `
        <h4 class="sans-font" style="color: var(--gold-soft); font-size: 0.95rem; margin-bottom: 5px;">${nama} ${icon}</h4>
        <p class="sans-font text-muted" style="font-size: 0.85rem; line-height: 1.5; margin-bottom: 10px;">${ucapan}</p>
        <p class="sans-font" style="font-size: 0.65rem; color: rgba(255,255,255,0.3);"><i class="far fa-clock"></i> Baru saja</p>
    `;
    
    container.prepend(newDiv);
    
    // Reset and Alert
    document.getElementById('rsvp-form').reset();
    
    Swal.fire({
        title: 'Terima Kasih!',
        text: 'Doa dan konfirmasi kehadiran Anda telah terkirim.',
        icon: 'success',
        background: '#141414',
        color: '#D4AF37',
        confirmButtonColor: '#D4AF37',
        confirmButtonText: 'Tutup'
    });
}
