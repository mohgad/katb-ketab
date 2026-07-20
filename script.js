(function () {
  "use strict";

  var EVENT_TITLE = "كتب كتاب محمد و أسماء";
  var EVENT_LOCATION = "مسجد العلي العظيم، الألماظة، القاهرة، مصر";
  var EVENT_START = "2026-09-04T20:00:00+02:00"; // Africa/Cairo, UTC+2 year-round
  var PAGE_URL = window.location.href;

  /* ---------- Mashrabiya open ---------- */
  var lattice = document.getElementById("mashrabiya");
  var body = document.body;

  function openInvitation() {
    lattice.classList.add("opened");
    body.classList.add("opened");
    lattice.setAttribute("aria-hidden", "true");
  }
  lattice.addEventListener("click", openInvitation);

  document.getElementById("scrollCue").addEventListener("click", function () {
    openInvitation();
    var next = document.querySelector(".verse-section");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Language toggle ---------- */
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
  }

  langToggle.addEventListener("click", function () {
    applyLang(currentLang === "ar" ? "en" : "ar");
  });

  /* ---------- Countdown ---------- */
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
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);
    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- Add to calendar (.ics) ---------- */
  document.getElementById("addToCalendar").addEventListener("click", function () {
    var start = new Date(EVENT_START);
    var end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // 3 hour block

    function fmt(d) {
      return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }

    var ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Mohamed & Asmaa Wedding//EN",
      "BEGIN:VEVENT",
      "UID:" + Date.now() + "@mohamed-asmaa-wedding",
      "DTSTAMP:" + fmt(new Date()),
      "DTSTART:" + fmt(start),
      "DTEND:" + fmt(end),
      "SUMMARY:" + EVENT_TITLE,
      "LOCATION:" + EVENT_LOCATION,
      "DESCRIPTION:كتب كتاب محمد و أسماء - الساعة 8 مساءً",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "mohamed-asmaa-wedding.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  /* ---------- Directions ---------- */
  var directionsBtn = document.getElementById("directionsBtn");
  directionsBtn.href = "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("مسجد العلي العظيم، الألماظة، القاهرة");

  /* ---------- WhatsApp share ---------- */
  var whatsappBtn = document.getElementById("whatsappShare");
  function buildWhatsappLink() {
    var msg = currentLang === "en"
      ? "You're invited to Mohamed & Asmaa's Katb El Ketab — Friday, September 4, 2026, 8:00 PM, Al-Aly Al-Azeem Mosque, Almaza, Cairo.\n" + PAGE_URL
      : "أنتم مدعوون لحفل كتب كتاب محمد و أسماء - الجمعة ٤ سبتمبر ٢٠٢٦، الساعة ٨ مساءً، مسجد العلي العظيم، الألماظة، القاهرة.\n" + PAGE_URL;
    whatsappBtn.href = "https://wa.me/?text=" + encodeURIComponent(msg);
  }
  buildWhatsappLink();
  langToggle.addEventListener("click", buildWhatsappLink);

  /* ---------- RSVP form (Netlify Forms via AJAX) ---------- */
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
        // fallback: submit normally (first-ever submission to a new
        // FormSubmit address requires one manual confirmation click anyway)
        form.submit();
      });
  });
})();
