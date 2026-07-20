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

// ==========================================
// 2. Initialization & Tracking
// ==========================================
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('guest');
    if (guestParam) {
        document.getElementById('guest-tracking').value = guestParam.replace(/_/g, ' '); 
    }
    initCanvas();
};

// ==========================================
// 3. Envelope Logic & Scroll Unlock
// ==========================================
function openEnvelope() {
    const container = document.querySelector('.envelope-wrapper');
    const scene1 = document.getElementById('envelope-scene');
    const scene2 = document.getElementById('invitation-content');
    
    if(player && typeof player.playVideo === 'function') player.playVideo();

    container.classList.add('open');
    
    setTimeout(() => {
        scene1.style.opacity = '0';
        setTimeout(() => {
            scene1.style.display = 'none';
            scene2.style.display = 'block'; // Change to block so it naturally scrolls
            document.body.style.overflowY = 'auto'; // Unlock body scrolling!
            
            // Initialize Intersection Observer for scroll animations
            initScrollAnimations();
        }, 1500);
    }, 1200); 
}

// ==========================================
// 4. Scroll Reveal Animations (Intersection Observer)
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 }); // Triggers when 10% of the element is visible

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
}

// ==========================================
// 5. Countdown Timer
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
// 6. Bilingual Toggle
// ==========================================
let isArabic = false;
function toggleLanguage() {
    isArabic = !isArabic;
    document.body.style.fontFamily = isArabic ? "'Amiri', serif" : "'Cinzel', serif";

    document.querySelectorAll('[data-ar]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return; 
        if (!el.hasAttribute('data-en-saved')) el.setAttribute('data-en-saved', el.innerHTML);
        el.innerHTML = isArabic ? el.getAttribute('data-ar') : el.getAttribute('data-en-saved');
    });
}

// ==========================================
// 7. Action Buttons
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
// 8. Advanced Canvas (Realistic Petals & Smoke)
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
            this.type = Math.random() > 0.6 ? 'petal' : 'smoke';
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height : -50;
            
            // Petal Specifics
            this.size = this.type === 'petal' ? Math.random() * 8 + 8 : Math.random() * 40 + 20;
            this.speedY = this.type === 'petal' ? Math.random() * 1.5 + 1 : Math.random() * 0.5 + 0.1;
            this.speedX = Math.random() * 2 - 1;
            
            // 3D Math properties
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() * 2 - 1) * 0.02;
            this.flip = Math.random() * Math.PI; // For 3D tumbling
            this.flipSpeed = (Math.random() * 0.05) + 0.01;
            
            this.opacity = this.type === 'petal' ? Math.random() * 0.4 + 0.6 : Math.random() * 0.08 + 0.02;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 1.5; // Natural drift
            this.rotation += this.rotationSpeed;
            this.flip += this.flipSpeed;

            if (this.y > canvas.height + 50) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            if (this.type === 'petal') {
                ctx.rotate(this.rotation);
                // The magic of 3D flipping: scale Y using cosine
                ctx.scale(1, Math.abs(Math.cos(this.flip))); 
                
                // Realistic gradient (dark red center to brighter red edges)
                let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
                gradient.addColorStop(0, `rgba(139, 0, 0, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(200, 20, 20, ${this.opacity})`);
                
                ctx.fillStyle = gradient;
                
                // Draw bezier teardrop/petal shape
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.bezierCurveTo(this.size, -this.size/2, this.size, this.size/2, 0, this.size);
                ctx.bezierCurveTo(-this.size, this.size/2, -this.size, -this.size/2, 0, -this.size);
                ctx.fill();
            } else {
                // Smoke
                ctx.fillStyle = `rgba(200, 200, 200, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // Spawn initial particles
    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}
