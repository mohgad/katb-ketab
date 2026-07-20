// ==========================================
// 7. Cinematic Glowing Dust & Smoke Canvas
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
            
            // Atmospheric Dust Motes
            this.size = Math.random() * 2 + 0.5;
            this.speedY = -(Math.random() * 0.5 + 0.1); // Drifting upwards
            this.speedX = Math.random() * 1 - 0.5;
            
            // Pulsing Glow effect
            this.opacity = Math.random() * 0.5 + 0.1;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulseDir = Math.random() > 0.5 ? 1 : -1;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5; 
            
            // Make them twinkle/pulse
            this.opacity += this.pulseSpeed * this.pulseDir;
            if(this.opacity >= 0.8 || this.opacity <= 0.1) this.pulseDir *= -1;

            if (this.y < -50) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Golden Dust glow
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
