// URL Parameter Logic for Guest Name
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    
    if (guestName) {
        document.getElementById('guest-name').innerText = guestName;
    }
});

// Cinematic Invitation Logic
function openInvitation() {
    const cover = document.getElementById('cover');
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    // Smooth cinematic transition
    cover.style.transform = 'scale(1.2)';
    cover.style.opacity = '0';

    setTimeout(() => {
        cover.style.display = 'none';
        revealOnScroll();
    }, 1200);

    // Play music
    if (music) {
        music.play().catch(e => console.log("Audio play blocked"));
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    // Enable scroll
    document.body.style.overflow = 'auto';
}

// Initial state
document.body.style.overflow = 'hidden';

// Music Toggle Function
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    if (music.paused) {
        music.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Reveal on Scroll Logic
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// Countdown Timer Logic
function startCountdown() {
    const weddingDate = new Date("May 30, 2026 08:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "HAPPY WEDDING DAY!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Initialize countdown
startCountdown();

// Mock Form Submission
document.getElementById('wedding-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Thank you! Your confirmation has been received.");
    this.reset();
});
