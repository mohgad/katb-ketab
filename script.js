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
            requestAnimationFrame(() => initScrollAnimations());
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
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ==========================================
// 4. Floating Lantern Logic (Section 6)
// ==========================================
function releaseLantern() {
    const container = document.getElementById('lantern-container');
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');
    // Randomize horizontal start position slightly
    lantern.style.left = Math.floor(Math.random() * 80 + 10) + '%';
    container.appendChild(lantern);
    
    // Remove from DOM after animation completes
    setTimeout(() => {
        lantern.remove();
    }, 6000);
}

// ==========================================
// 5. Bilingual Toggle
// ==========================================
let isArabic = true; 
function toggleLanguage() {
    isArabic = !isArabic;
    const body = document.body;
    body.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    body.style.fontFamily = isArabic ? "'Amiri', serif" : "'Cinzel', serif";
    
    const elementsToChangeFont = document.querySelectorAll('.names, .section-title, .basmala, .time-text, .location-name');
    elementsToChangeFont.forEach(el => {
        el.style.fontFamily = isArabic ? "'Aref Ruqaa', serif" : "'Cinzel', serif";
    });

    document.querySelectorAll('[data-en]').forEach(el => {
        if (!el.hasAttribute('data-ar-saved')) {
            el.setAttribute('data-ar-saved', el.innerHTML); 
        }
        el.innerHTML = isArabic ? el.getAttribute('data-ar-saved') : el.getAttribute('data-en');
    });
}

// ==========================================
// 6. Merged Canvas (Petals & Cinematic Dust)
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
            this.y = initial ? Math.random() * canvas.height : -50;
            
            // 30% chance for a flower petal, 70% chance for cinematic dust
            this.type = Math.random() > 0.7 ? 'petal' : 'dust';
            
            if(this.type === 'petal') {
                this.size = Math.random() * 8 + 6;
                this.speedY = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() * 2 - 1) * 0.02;
                this.flip = Math.random() * Math.PI; 
                this.flipSpeed = (Math.random() * 0.05) + 0.01;
                this.opacity = Math.random() * 0.5 + 0.5;
            } else {
                this.y = initial ? Math.random() * canvas.height : canvas.height + 50; // Dust floats up
                this.size = Math.random() * 2 + 0.5;
                this.speedY = -(Math.random() * 0.5 + 0.1); 
                this.speedX = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulseDir = Math.random() > 0.5 ? 1 : -1;
            }
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5; 
            
            if(this.type === 'petal') {
                this.rotation += this.rotationSpeed;
                this.flip += this.flipSpeed;
                if (this.y > canvas.height + 50) this.reset();
            } else {
                this.opacity += this.pulseSpeed * this.pulseDir;
                if(this.opacity >= 0.8 || this.opacity <= 0.1) this.pulseDir *= -1;
                if (this.y < -50) this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            if(this.type === 'petal') {
                ctx.rotate(this.rotation);
                ctx.scale(1, Math.abs(Math.cos(this.flip))); // 3D flip effect
                
                // Deep dark red rose colors
                let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
                gradient.addColorStop(0, `rgba(139, 0, 0, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(200, 20, 20, ${this.opacity})`);
                
                ctx.fillStyle = gradient;
                ctx.shadowColor = 'rgba(0,0,0,0.5)';
                ctx.shadowBlur = 5;
                
                // Draw petal shape
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.bezierCurveTo(this.size, -this.size/2, this.size, this.size/2, 0, this.size);
                ctx.bezierCurveTo(-this.size, this.size/2, -this.size, -this.size/2, 0, -this.size);
                ctx.fill();
            } else {
                // Draw glowing dust
                ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
                ctx.shadowBlur = this.size * 3;
                ctx.fillStyle = `rgba(255, 235, 150, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // Spawn 100 mixed particles
    for (let i = 0; i < 100; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}
