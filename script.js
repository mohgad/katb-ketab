// ==========================================
// 1. YouTube Audio Setup (The Godfather)
// ==========================================
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'AJgE_dLWsuQ', // Godfather Theme
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'AJgE_dLWsuQ'
        }
    });
}

// ==========================================
// 2. Custom Guest Tracking (?guest=Name)
// ==========================================
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('guest');
    if (guestParam) {
        const guestName = guestParam.replace(/_/g, ' '); 
        document.getElementById('guest-tracking').value = guestName;
    }
    initCanvas(); // Start particle effects
};

// ==========================================
// 3. Envelope Logic & Scene Transitions
// ==========================================
function openEnvelope() {
    const container = document.querySelector('.envelope-wrapper');
    const scene1 = document.getElementById('envelope-scene');
    const scene2 = document.getElementById('invitation-content');
    
    // Play music on click to bypass browser autoplay restrictions
    if(player && typeof player.playVideo === 'function') {
        player.playVideo();
    }

    // Trigger 3D CSS animation
    container.classList.add('open');
    
    // Transition scenes after envelope drops
    setTimeout(() => {
        scene1.style.opacity = '0';
        setTimeout(() => {
            scene1.classList.add('hidden');
            scene2.classList.remove('hidden');
            
            // Fade in invitation
            setTimeout(() => {
                scene2.style.opacity = '1';
                scene2.style.zIndex = '10';
            }, 100);
        }, 1500);
    }, 1200); 
}

// ==========================================
// 4. Countdown Timer Logic
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
// 5. Bilingual Toggle (English / Arabic)
// ==========================================
let isArabic = false;

function toggleLanguage() {
    isArabic = !isArabic;
    const fontPrimary = isArabic ? "'Amiri', serif" : "'Cinzel', serif";
    document.body.style.fontFamily = fontPrimary;

    // Toggle text elements
    document.querySelectorAll('[data-ar]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return; 
        
        if (!el.hasAttribute('data-en-saved')) {
            el.setAttribute('data-en-saved', el.innerHTML);
        }
        el.innerHTML = isArabic ? el.getAttribute('data-ar') : el.getAttribute('data-en-saved');
    });

    // Toggle input placeholders
    document.querySelectorAll('[data-placeholder-ar]').forEach(el => {
        if (!el.hasAttribute('data-placeholder-en-saved')) {
            el.setAttribute('data-placeholder-en-saved', el.getAttribute('placeholder'));
        }
        el.setAttribute('placeholder', isArabic ? el.getAttribute('data-placeholder-ar') : el.getAttribute('data-placeholder-en-saved'));
    });
}

// ==========================================
// 6. Action Buttons (ICS & WhatsApp)
// ==========================================
function downloadICS() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Mohamed & Asmaa's Katb El Ketab
DTSTART:20260904T170000Z
DTEND:20260904T200000Z
LOCATION:مسجد العلي العظيم, Almaza, Cairo
DESCRIPTION:Join us to celebrate the Katb El Ketab of Mohamed & Asmaa.
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mohamed_Asmaa_Wedding.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function shareWhatsApp() {
    const text = encodeURIComponent("Mohamed & Asmaa's Wedding Invitation!\n\nJoin us on Sept 4, 2026.\nOpen the invitation here: " + window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// ==========================================
// 7. Canvas Animation (Petals & Smoke)
// ==========================================
function initCanvas() {
    const canvas = document.getElementById('atmosphere-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height; // Initial random spread
        }
        reset() {
            this.type = Math.random() > 0.6 ? 'petal' : 'smoke';
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.size = this.type === 'petal' ? Math.random() * 8 + 5 : Math.random() * 40 + 20;
            this.speedY = this.type === 'petal' ? Math.random() * 1.5 + 0.5 : Math.random() * 0.5 + 0.1;
            this.speedX = Math.random() * 1 - 0.5;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
            this.opacity = this.type === 'petal' ? Math.random() * 0.5 + 0.5 : Math.random() * 0.1 + 0.02;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5; // Swaying motion
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height + 50) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            
            if (this.type === 'petal') {
                ctx.fillStyle = `rgba(139, 0, 0, ${this.opacity})`; // Dark rose red
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = `rgba(200, 200, 200, ${this.opacity})`; // Smoke
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < 70; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
