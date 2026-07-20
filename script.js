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
    
    // Fade out hint text immediately
    tapHint.style.opacity = '0';

    if(player && typeof player.playVideo === 'function') player.playVideo();

    // Trigger CSS Keyframes for Envelope
    container.classList.add('open');
    
    // Timeline of events:
    // 0.0s: Flap opens
    // 0.6s: Mini letter slides up (CSS transition)
    // 1.5s: Envelope drops away (CSS transition)
    // 2.0s: Screen crossfade begins
    
    setTimeout(() => {
        scene1.style.opacity = '0'; // Fade out entire scene 1
        
        setTimeout(() => {
            scene1.style.display = 'none';
            scene2.style.display = 'block'; 
            document.body.style.overflowY = 'auto'; // Unlock scrolling
            
            // Allow display:block to render before triggering opacity
            requestAnimationFrame(() => {
                initScrollAnimations();
            });
        }, 1000); // Wait for fade out
    }, 2200); // Wait for letter extraction to finish
}

// ==========================================
// 3. 3D Scroll Reveal (Intersection Observer)
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
let isArabic = false;
function toggleLanguage() {
    isArabic = !isArabic;
    document.body.style.fontFamily = isArabic ? "'Amiri', serif" : "'Cinzel', serif";
    document.querySelectorAll('[data-ar]').forEach(el => {
        if (!el.hasAttribute('data-en-saved')) el.setAttribute('data-en-saved', el.innerHTML);
        el.innerHTML = isArabic ? el.getAttribute('data-ar') : el.getAttribute('data-en-saved');
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
// 7. Cinematic Depth-of-Field Canvas
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
            this.type = Math.random() > 0.7 ? 'petal' : 'smoke';
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height : -50;
            
            // Depth of Field logic
            const depth = Math.random(); // 0 = Background, 1 = Foreground
            
            if (this.type === 'petal') {
                if (depth > 0.8) {
                    // FOREGROUND: Massive, fast, slightly transparent (simulating lens blur)
                    this.size = Math.random() * 15 + 15;
                    this.speedY = Math.random() * 3 + 2;
                    this.opacity = 0.8;
                    this.blur = true;
                } else if (depth < 0.3) {
                    // BACKGROUND: Tiny, slow, dark
                    this.size = Math.random() * 4 + 3;
                    this.speedY = Math.random() * 0.5 + 0.2;
                    this.opacity = 0.3;
                    this.blur = false;
                } else {
                    // MIDGROUND: Normal, sharp
                    this.size = Math.random() * 8 + 6;
                    this.speedY = Math.random() * 1.5 + 0.8;
                    this.opacity = 0.9;
                    this.blur = false;
                }
            } else {
                // Smoke is always mid/bg
                this.size = Math.random() * 60 + 30;
                this.speedY = Math.random() * 0.3 + 0.1;
                this.opacity = Math.random() * 0.05 + 0.01;
            }
            
            this.speedX = Math.random() * 1.5 - 0.75;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() * 2 - 1) * 0.02;
            this.flip = Math.random() * Math.PI; 
            this.flipSpeed = (Math.random() * 0.05) + 0.01;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * (this.size * 0.1); 
            this.rotation += this.rotationSpeed;
            this.flip += this.flipSpeed;

            if (this.y > canvas.height + 50) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            if (this.type === 'petal') {
                ctx.rotate(this.rotation);
                ctx.scale(1, Math.abs(Math.cos(this.flip))); 
                
                // Add cinematic drop shadow
                ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
                ctx.shadowBlur = this.size * 0.5;
                ctx.shadowOffsetY = this.size * 0.3;
                
                let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
                gradient.addColorStop(0, `rgba(100, 0, 0, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(180, 20, 20, ${this.opacity})`);
                
                ctx.fillStyle = gradient;
                
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.bezierCurveTo(this.size, -this.size/2, this.size, this.size/2, 0, this.size);
                ctx.bezierCurveTo(-this.size, this.size/2, -this.size, -this.size/2, 0, -this.size);
                ctx.fill();
            } else {
                ctx.fillStyle = `rgba(200, 200, 200, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Sort particles by size so foreground is drawn last (on top)
        particles.sort((a, b) => a.size - b.size).forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}
