// URL Parameter for Guest Name
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let guest = params.get("to");
    
    if (guest) {
        // Decode and Title Case or UPPERCASE
        guest = decodeURIComponent(guest).toUpperCase();
    } else {
        guest = "TAMU UNDANGAN";
    }
    
    document.getElementById('guest-name-cover').innerText = guest;
});

// Open Invitation Animation
function openInvitation() {
    const cover = document.getElementById('cover-screen');
    const main = document.getElementById('main-content');
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    // Smooth transform up like a cinematic curtain
    cover.style.transform = 'translateY(-100vh)';
    
    setTimeout(() => {
        cover.style.display = 'none';
        main.style.display = 'block';
        
        // Initialize AOS after main content is visible
        AOS.init({
            duration: 1500,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });

        // Initialize Swiper for Cinematic Gallery
        new Swiper('.gallery-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 15,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            initialSlide: 1,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        });

        document.body.classList.remove('overflow-hidden');
    }, 1200);

    // Play Audio (Fade In effect can be simulated or just play)
    music.volume = 0;
    music.play().catch(e => console.log("Auto-play prevented by browser"));
    
    // Audio Fade-in
    let vol = 0;
    const fadeAudio = setInterval(() => {
        if (vol < 0.9) {
            vol += 0.1;
            music.volume = vol;
        } else {
            clearInterval(fadeAudio);
            music.volume = 1;
        }
    }, 200);

    musicBtn.classList.add('playing');
}

// Audio Control
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    if (music.paused) {
        music.play();
        musicBtn.classList.add('playing');
    } else {
        music.pause();
        musicBtn.classList.remove('playing');
    }
}

// Countdown Timer
function startCountdown() {
    const weddingDate = new Date("May 30, 2026 09:30:00").getTime();
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(timer);
            return;
        }
        
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? '0'+d : d;
        document.getElementById("hours").innerText = h < 10 ? '0'+h : h;
        document.getElementById("minutes").innerText = m < 10 ? '0'+m : m;
        document.getElementById("seconds").innerText = s < 10 ? '0'+s : s;
    }, 1000);
}
startCountdown();

// Toggle Gift Container
function toggleGift() {
    const container = document.getElementById('gift-container');
    const btn = document.getElementById('btn-gift');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        setTimeout(() => container.style.opacity = '1', 50);
        btn.innerHTML = '<i class="fas fa-gift mr-2"></i> Tutup';
    } else {
        container.style.opacity = '0';
        setTimeout(() => container.style.display = 'none', 500);
        btn.innerHTML = '<i class="fas fa-gift mr-2"></i> Kirim Hadiah';
    }
}

// Copy Rekening
function copyRekening() {
    const rek = document.getElementById('rek-bca').innerText;
    navigator.clipboard.writeText(rek).then(() => {
        alert('Nomor Rekening berhasil disalin: ' + rek);
    }).catch(err => {
        console.error('Gagal menyalin', err);
    });
}

// Reply to Comment
function replyTo(button) {
    const replyText = prompt("Masukkan balasan Anda:");
    if (replyText) {
        const replyDiv = document.createElement('div');
        replyDiv.style.marginTop = '15px';
        replyDiv.style.padding = '12px';
        replyDiv.style.background = 'rgba(197, 131, 142, 0.1)';
        replyDiv.style.borderRadius = '8px';
        replyDiv.style.borderLeft = '3px solid #C5838E';
        replyDiv.innerHTML = `
            <p style="font-weight: 600; font-size: 0.85rem; color: #5A353D; margin-bottom: 5px;">Mempelai <i class="fas fa-heart" style="color: #C5838E; font-size: 0.7rem;"></i></p>
            <p style="font-size: 0.85rem; color: #8A5A64;">${replyText}</p>
        `;
        button.parentElement.parentElement.appendChild(replyDiv);
    }
}

// RSVP Form Submit
document.getElementById('wedding-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const nama = document.getElementById('wish-nama').value;
    const ucapan = document.getElementById('wish-ucapan').value;
    const hadir = document.getElementById('wish-hadir').value;

    const newComment = document.createElement('div');
    newComment.classList.add('mb-4');
    newComment.style.padding = '20px';
    newComment.style.background = 'rgba(255,255,255,0.7)';
    newComment.style.borderRadius = '10px';
    newComment.style.border = '1px solid rgba(197, 131, 142, 0.2)';
    
    newComment.innerHTML = `
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 8px; color: #5A353D;">
            ${nama} <i class="fas fa-check-circle" style="color: ${hadir === 'Hadir' ? '#C5838E' : '#8A5A64'}; font-size: 0.8rem; margin-left: 5px;"></i>
        </p>
        <p style="font-size: 0.9rem; color: #8A5A64; margin-bottom: 10px; line-height: 1.5;">${ucapan}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <p style="font-size: 0.75rem; color: #9A5B66; font-family: 'Montserrat';"><i class="far fa-clock mr-1"></i> Baru saja</p>
            <button onclick="replyTo(this)" style="background: none; border: none; color: #C5838E; font-size: 0.75rem; cursor: pointer; font-weight: 600;">Balas</button>
        </div>
    `;

    document.getElementById('comments-container').prepend(newComment);

    const originalText = btn.innerText;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    
    setTimeout(() => {
        this.reset();
        btn.innerHTML = '<i class="fas fa-check"></i> Terkirim';
        setTimeout(() => {
            btn.innerText = 'Kirim Ucapan';
        }, 2000);
    }, 1000);
});

// Particles JS Init (Soft Floating Light / Bokeh effect)
if(window.particlesJS) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 1000 } },
            "color": { "value": ["#ffffff", "#FFD1DC", "#C5838E"] },
            "shape": { 
                "type": "image",
                "image": { "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMiAyMS4zNWwtMS40NS0xLjMyQzUuNCAxNS4zNiAyIDEyLjI4IDIgOC41IDIgNS40MiA0LjQyIDMgNy41IDNjMS43NCAwIDMuNDEuODEgNC41IDIuMDlDMTMuMDkgMy44MSAxNC43NiAzIDE2LjUgMyAxOS41OCAzIDIyIDUuNDIgMjIgOC41YzAgMy43OC0zLjQgNi44Ni04LjU1IDExLjU0TDEyIDIxLjM1eiIvPjwvc3ZnPg==", "width": 100, "height": 100 }
            },
            "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 15, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 8, "sync": false } },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 0.8, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": false }, "resize": true },
            "modes": { "bubble": { "distance": 250, "size": 8, "duration": 2, "opacity": 0.6, "speed": 3 } }
        },
        "retina_detect": true
    });
}
