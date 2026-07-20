// ==========================================
// 1. YouTube Audio Setup
// ==========================================
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0', width: '0', videoId: 'AJgE_dLWsuQ',
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': 'AJgE_dLWsuQ' }
    });
}

window.onload = function() {
    initCanvas();
};

// ==========================================
// 2. Cinematic Extraction Sequence
// ==========================================
function openEnvelope() {
    const container = document.querySelector('.envelope-wrapper');
    const scene1 = document.getElementById('envelope-scene');
    const scene2 = document.getElementById('invitation-content');
    const tapHint = document.querySelector('.tap-hint');
    
    tapHint.style.opacity = '0';

    if(player && typeof player.playVideo === 'function') player.playVideo();

    container.classList.add('open');
    
    setTimeout(() => {
        scene1.style.opacity = '0'; 
        
        setTimeout(() => {
            scene1.style.display = 'none';
            scene2.style.display = 'block'; 
            document.body.style.overflowY = 'auto'; 
            
            requestAnimationFrame(() => {
                initScrollAnimations();
            });
        }, 1000); 
    }, 2200); 
}

// ==========================================
// 3. 3D Scroll Reveal
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 }); 

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
}

// ==========================================
// 4. Countdown Timer
// ==========================================
const targetDate = new Date("September 4, 2026 20:00:00").getTime();
setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) return;
    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
}, 1000);

// ==========================================
// 5. Bilingual Toggle
// ==========================================
let isArabic = true; 

function toggleLanguage() {
    isArabic = !isArabic;
    const body = document.body;
    
    body.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    body.style.fontFamily = isArabic ? "'Amiri', serif" : "'Cinzel', serif";
    
    const namesEl = document.querySelector('.names');
    if (namesEl) {
        namesEl.style.fontFamily = isArabic ? "'Aref Ruqaa', serif" : "'Cinzel', serif";
    }

    document.querySelectorAll('[data-en]').forEach(el => {
        if (!el.hasAttribute('data-ar-saved')) {
            el.setAttribute('data-ar-saved', el.innerHTML); 
        }
        el.innerHTML = isArabic ? el.getAttribute('data-ar-saved') : el.getAttribute('data-en');
    });
}

// ==========================================
// 6. Action Buttons
// ==========================================
function downloadICS() {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Mohamed & Asmaa's Katb El Ketab\nDTSTART:20260904T170000Z\nDTEND:20260904T200000Z\nLOCATION:مسجد العلي العظيم, Almaza, Cairo\nDESCRIPTION:Join us to celebrate the Katb El Ketab of Mohamed & Asmaa.\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Mohamed_Asmaa_Wedding.ics';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

// ==========================================
// 7. Glowing Dust & Smoke Atmosphere
// ==========================================
function initCanvas() {
    const canvas = document.getElementById('atmosphere-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() { this.reset(true); }
        reset(initial = false) {
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height : canvas.height + 50;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = -(Math.random() * 0.5 + 0.1); 
            this.speedX = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulseDir = Math.random() > 0.5 ? 1 : -1;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5; 
            
            this.opacity += this.pulseSpeed * this.pulseDir;
            if(this.opacity >= 0.8 || this.opacity <= 0.1) this.pulseDir *= -1;

            if (this.y < -50) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
            ctx.shadowBlur = this.size * 3;
            ctx.fillStyle = `rgba(255, 235, 150, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < 150; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}
