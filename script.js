(function () {
  "use strict";

  var EVENT_TITLE = "كتب كتاب محمد و أسماء";
  var EVENT_LOCATION = "مسجد العلي العظيم، الألماظة، القاهرة، مصر";
  var EVENT_START = "2026-09-04T20:00:00+02:00"; // Africa/Cairo, UTC+2 year-round
  var PAGE_URL = window.location.href;
  var YT_VIDEO_ID = "AJgE_dLWsuQ"; // replace with your own video ID if desired

  var body = document.body;

  /* ================= PETAL PARTICLE SYSTEM ================= */
  (function petals() {
    var canvas = document.getElementById("petalCanvas");
    var ctx = canvas.getContext("2d");
    var W, H, DPR;
    var petals = [];
    var COUNT = 26;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth = window.innerWidth;
      H = canvas.clientHeight = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();

    function makePetal(initial) {
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : -20 - Math.random() * 200,
        size: 6 + Math.random() * 9,
        speed: 0.35 + Math.random() * 0.55,
        sway: 0.5 + Math.random() * 1.2,
        swayPhase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        depth: 0.4 + Math.random() * 0.6, // affects opacity/blur
        hue: Math.random() > 0.5 ? "#8a1622" : "#6e0f1a"
      };
    }

    for (var i = 0; i < COUNT; i++) petals.push(makePetal(true));

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = 0.55 * p.depth + 0.15;
      var grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, "#b5333f");
      grad.addColorStop(1, p.hue);
      ctx.fillStyle = grad;
      ctx.beginPath();
      // simple petal shape: two bezier lobes
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 0.7, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.5, -p.size * 0.9, -p.size * 0.6, 0, -p.size);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    var t = 0;
    function tick() {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;
      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.y += p.speed * (reduceMotion ? 0.3 : 1);
        p.x += Math.sin(t * p.sway + p.swayPhase) * 0.6;
        p.rot += p.rotSpeed;
        if (p.y > H + 30) {
          petals[i] = makePetal(false);
        }
        drawPetal(p);
      }
      requestAnimationFrame(tick);
    }
    tick();
  })();

  /* ================= SMOKE / ATMOSPHERE ================= */
  (function smoke() {
    var canvas = document.getElementById("smokeCanvas");
    var ctx = canvas.getContext("2d");
    var W, H, DPR;
    var wisps = [];
    var COUNT = 6;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth = window.innerWidth;
      H = canvas.clientHeight = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();

    function makeWisp(initial) {
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : H + 100 + Math.random() * 150,
        r: 120 + Math.random() * 160,
        speed: 0.12 + Math.random() * 0.18,
        sway: 0.15 + Math.random() * 0.3,
        swayPhase: Math.random() * Math.PI * 2,
        opacity: 0.05 + Math.random() * 0.07
      };
    }
    for (var i = 0; i < COUNT; i++) wisps.push(makeWisp(true));

    var t = 0;
    function tick() {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      for (var i = 0; i < wisps.length; i++) {
        var w = wisps[i];
        w.y -= w.speed;
        w.x += Math.sin(t + w.swayPhase) * w.sway;
        if (w.y < -w.r) wisps[i] = makeWisp(false);

        var grad = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.r);
        grad.addColorStop(0, "rgba(210,195,170," + w.opacity + ")");
        grad.addColorStop(1, "rgba(210,195,170,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    tick();
  })();

  /* ================= YOUTUBE BACKGROUND MUSIC ================= */
  var ytPlayer = null;
  var ytReady = false;
  var musicToggle = document.getElementById("musicToggle");
  var wantsPlay = false;

  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player("ytPlayer", {
      height: "1",
      width: "1",
      videoId: YT_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        loop: 1,
        playlist: YT_VIDEO_ID,
        playsinline: 1
      },
      events: {
        onReady: function () {
          ytReady = true;
          if (wantsPlay) startMusic();
        }
      }
    });
  };

  (function loadYT() {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  })();

  function startMusic() {
    if (!ytReady || !ytPlayer) { wantsPlay = true; return; }
    ytPlayer.unMute();
    ytPlayer.setVolume(45);
    ytPlayer.playVideo();
    musicToggle.hidden = false;
    musicToggle.classList.add("playing");
  }

  musicToggle.addEventListener("click", function () {
    if (!ytPlayer) return;
    var state = ytPlayer.getPlayerState();
    if (state === 1) {
      ytPlayer.pauseVideo();
      musicToggle.classList.remove("playing");
    } else {
      ytPlayer.playVideo();
      musicToggle.classList.add("playing");
    }
  });

  /* ================= ENVELOPE OPEN ================= */
  var envelopeBtn = document.getElementById("envelopeBtn");
  var envelopeScene = document.getElementById("envelopeScene");

  function openInvitation() {
    envelopeBtn.classList.add("opened-flap");
    envelopeScene.classList.add("opened");
    body.classList.add("opened");
    envelopeBtn.setAttribute("aria-disabled", "true");
    startMusic(); // user gesture — satisfies autoplay-with-sound policies
  }
  envelopeBtn.addEventListener("click", openInvitation);

  /* ================= LANGUAGE TOGGLE ================= */
  var langToggle = document.getElementById("langToggle");
  var html = document.documentElement;
  var currentLang = "ar";

  function applyLang(lang) {
    currentLang = lang;
    var isEn = lang === "en";
    html.setAttribute("lang", lang);
    html.setAttribute("dir", isEn ? "ltr" : "rtl");
    body.classList.toggle("lang-en", isEn);
    langToggle.textContent = isEn ? "AR" : "EN";

    document.querySelectorAll("[data-ar]").forEach(function (el) {
      var text = isEn ? el.getAttribute("data-en") : el.getAttribute("data-ar");
      if (text !== null) el.innerHTML = text;
    });
    buildWhatsappLink();
  }
  langToggle.addEventListener("click", function () {
    applyLang(currentLang === "ar" ? "en" : "ar");
  });

  /* ================= COUNTDOWN ================= */
  var target = new Date(EVENT_START).getTime();
  var elDays = document.getElementById("cd-days");
  var elHours = document.getElementById("cd-hours");
  var elMins = document.getElementById("cd-mins");
  var elSecs = document.getElementById("cd-secs");

  function pad(n) { return String(n).padStart(2, "0"); }

  function tickCountdown() {
    var diff = target - Date.now();
    if (diff <= 0) {
      elDays.textContent = elHours.textContent = elMins.textContent = elSecs.textContent = "00";
      return;
    }
    elDays.textContent = pad(Math.floor(diff / 86400000));
    elHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    elMins.textContent = pad(Math.floor((diff % 3600000) / 60000));
    elSecs.textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ================= ADD TO CALENDAR ================= */
  document.getElementById("addToCalendar").addEventListener("click", function () {
    var start = new Date(EVENT_START);
    var end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    function fmt(d) { return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"; }
    var ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Mohamed & Asmaa Wedding//EN",
      "BEGIN:VEVENT",
      "UID:" + Date.now() + "@mohamed-asmaa-wedding",
      "DTSTAMP:" + fmt(new Date()),
      "DTSTART:" + fmt(start),
      "DTEND:" + fmt(end),
      "SUMMARY:" + EVENT_TITLE,
      "LOCATION:" + EVENT_LOCATION,
      "DESCRIPTION:كتب كتاب محمد و أسماء - الساعة 8 مساءً",
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "mohamed-asmaa-wedding.ics";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  /* ================= DIRECTIONS ================= */
  document.getElementById("directionsBtn").href =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("مسجد العلي العظيم، الألماظة، القاهرة");

  /* ================= WHATSAPP SHARE ================= */
  var whatsappBtn = document.getElementById("whatsappShare");
  function buildWhatsappLink() {
    var msg = currentLang === "en"
      ? "You're invited to Mohamed & Asmaa's Katb El Ketab — Friday, September 4, 2026, 8:00 PM, Al-Aly Al-Azeem Mosque, Almaza, Cairo.\n" + PAGE_URL
      : "أنتم مدعوون لحفل كتب كتاب محمد و أسماء - الجمعة ٤ سبتمبر ٢٠٢٦، الساعة ٨ مساءً، مسجد العلي العظيم، الألماظة، القاهرة.\n" + PAGE_URL;
    whatsappBtn.href = "https://wa.me/?text=" + encodeURIComponent(msg);
  }
  buildWhatsappLink();

  /* ================= RSVP FORM ================= */
  var form = document.getElementById("rsvpForm");
  var successBox = document.getElementById("rsvpSuccess");

  function encodeFormData(formEl) {
    var data = new FormData(formEl);
    var params = new URLSearchParams();
    data.forEach(function (value, key) { params.append(key, value); });
    return params.toString();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetch(form.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: encodeFormData(form)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("submit failed");
        form.hidden = true;
        successBox.hidden = false;
      })
      .catch(function () {
        form.submit();
      });
  });
})();
