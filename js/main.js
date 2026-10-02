/* ============================================================
   Wedding invitation — logic
   Reads everything from config.js (the CONFIG object).
   You should not need to edit this file.
   ============================================================ */

(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  /* ---------- theme colors from config ---------- */
  const t = CONFIG.theme || {};
  const root = document.documentElement;
  const vars = {
    "--paper": t.paper, "--paper-soft": t.paperSoft, "--ink": t.ink,
    "--ink-soft": t.inkSoft, "--dark": t.dark, "--light": t.light,
    "--seal": t.seal, "--line": t.line,
  };
  for (const [k, v] of Object.entries(vars)) if (v) root.style.setProperty(k, v);

  /* ---------- page title + favicon ---------- */
  document.title = CONFIG.page.title;
  if (CONFIG.page.favicon) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href =
      "data:image/svg+xml," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">${CONFIG.page.favicon}</text></svg>`
      );
    document.head.appendChild(link);
  }

  /* ---------- fill text content ---------- */
  const c = CONFIG.couple;

  // hero (painted couple video)
  const H = CONFIG.hero || {};
  const setOrRemove = (id, text) => { const el = $(id); if (text) el.textContent = text; else el.remove(); };
  setOrRemove("hero-kicker", H.kicker);
  // names over the video: "" hides them (e.g. when the video already shows them)
  setOrRemove("hero-names", H.names === undefined ? `${c.firstName} & ${c.secondName}` : H.names);
  setOrRemove("hero-sub", H.subtitle);
  setOrRemove("hero-date", H.showDate ? c.dateDisplay : "");
  $("hero-scroll-text").textContent = H.scrollHint || "SCROLL";
  // the button glides down to the Save the Date section
  $("hero-cta").addEventListener("click", (e) => {
    const target = $("save-the-date");
    if (!target) return;
    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  });
  const heroVideo = $("hero-video");
  if (H.poster) {
    heroVideo.poster = H.poster;
    $("hero-fill").style.backgroundImage = `url("${H.poster}")`;
  }
  const mp4 = H.video || "img/hero-couple.mp4";
  const webm = mp4.replace(/\.mp4$/, ".webm");
  // H.264 MP4 for Safari/Chrome/phones, VP9 WebM fallback for browsers without H.264
  heroVideo.src = heroVideo.canPlayType("video/mp4; codecs=avc1.640028") ? mp4 : webm;
  heroVideo.loop = !!H.loop;
  heroVideo.muted = true;              // no sound; also required for autoplay on phones
  heroVideo.load();

  // keep the scene exactly one screen tall below the "No kids" banner
  const banner = document.querySelector(".top-banner");
  function fitHero() {
    const h = banner ? banner.offsetHeight : 0;
    document.documentElement.style.setProperty("--banner-h", `${h}px`);
  }
  window.addEventListener("resize", fitHero);

  function startHero() {
    fitHero();
    $("hero").classList.add("is-live");
    try { heroVideo.currentTime = 0; } catch (e) { }
    const p = heroVideo.play();
    if (p && p.catch) p.catch(() => { });   // if autoplay is blocked, the poster stays visible
  }

  // save the date
  // $("std-illustration").src = CONFIG.saveTheDate.illustration;
  $("std-names").textContent = `${c.firstName} + ${c.secondName}`;
  $("std-date").textContent = c.dateDisplay;

  // venue
  $("venue-title-start").textContent = CONFIG.venue.titleStart + " ";
  $("venue-title-italic").textContent = CONFIG.venue.titleItalic;
  $("venue-title-end").textContent = " " + CONFIG.venue.titleEnd;
  $("venue-name").textContent = CONFIG.venue.name;
  $("venue-when").textContent = CONFIG.venue.when;
  $("venue-dress").textContent = CONFIG.venue.dress;
  $("venue-maps").href = CONFIG.venue.mapsUrl;
  $("venue-bg").style.backgroundImage = `url("${CONFIG.venue.background}")`;

  // program
  $("program-kicker").textContent = CONFIG.program.kicker;
  $("program-title").textContent = CONFIG.program.title;
  $("program-closing").textContent = CONFIG.program.closing;
  const list = $("program-list");
  CONFIG.program.items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "program__item reveal";
    li.innerHTML = `
      <p class="program__time"></p>
      <p class="program__name label"></p>
      <p class="program__note"></p>`;
    li.querySelector(".program__time").textContent = item.time;
    li.querySelector(".program__name").textContent = item.title;
    li.querySelector(".program__note").textContent = item.note;
    list.appendChild(li);
  });

  // gallery
  $("gallery-title").textContent = CONFIG.gallery.title;
  $("gallery-subtitle").textContent = CONFIG.gallery.subtitle;
  const grid = $("gallery-grid");
  CONFIG.gallery.photos.forEach((src, i) => {
    const fig = document.createElement("figure");
    fig.className = "gallery__item reveal";
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Photo ${i + 1}`;
    img.loading = "lazy";
    fig.appendChild(img);
    grid.appendChild(fig);
  });

  // countdown
  const CD = CONFIG.countdown;
  $("countdown-title").textContent = CD.title;
  $("countdown-text").textContent = CD.text || "";
  $("countdown-closing").textContent = CD.closing || "";
  $("cd-days-label").textContent = CD.labels.days;
  $("cd-hours-label").textContent = CD.labels.hours;
  $("cd-minutes-label").textContent = CD.labels.minutes;
  $("cd-seconds-label").textContent = CD.labels.seconds;

  const pad = (n) => String(n).padStart(2, "0");
  const weddingTime = new Date(CONFIG.weddingDate).getTime();
  const hourHand = $("clock-hour");
  const minHand = $("clock-min");
  function tick() {
    let diff = Math.max(0, weddingTime - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    $("cd-days").textContent = pad(days);
    $("cd-hours").textContent = pad(hours);
    $("cd-minutes").textContent = pad(minutes);
    $("cd-seconds").textContent = pad(seconds);

    // the little clock shows the real time
    const now = new Date();
    const m = now.getMinutes() + now.getSeconds() / 60;
    const h = (now.getHours() % 12) + m / 60;
    if (hourHand) hourHand.setAttribute("transform", `rotate(${h * 30} 86 70)`);
    if (minHand) minHand.setAttribute("transform", `rotate(${m * 6} 86 70)`);
  }
  tick();
  setInterval(tick, 1000);

  // message
  $("msg-title").textContent = CONFIG.message.title;
  $("msg-text").textContent = CONFIG.message.text;

  // footer
  $("footer-name-first").textContent = c.firstName;
  $("footer-name-second").textContent = c.secondName;
  $("footer-date").textContent = c.dateDisplay;
  $("footer-credit-label").textContent = CONFIG.footer.creditLabel;
  const credit = $("footer-credit-name");
  credit.textContent = CONFIG.footer.creditName;
  if (CONFIG.footer.creditUrl) {
    credit.href = CONFIG.footer.creditUrl;
    credit.target = "_blank";
  } else {
    credit.removeAttribute("href");
  }

  const ICONS = {
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2 1.8 3.5 3.9 3.8v3c-1.5 0-2.8-.5-3.9-1.2v6.6a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1v3.1a2.8 2.8 0 1 0 1.9 2.7V3h3z"/></svg>',
  };
  const social = $("footer-social");
  [["instagram", CONFIG.footer.instagram], ["tiktok", CONFIG.footer.tiktok]].forEach(
    ([name, url]) => {
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", name);
      a.innerHTML = ICONS[name];
      social.appendChild(a);
    }
  );

  /* ---------- music ---------- */
  const musicBtn = $("music-btn");
  const audio = $("music");
  const hasMusic = Boolean(CONFIG.music.src);
  if (hasMusic) audio.src = CONFIG.music.src;

  function playMusic() {
    audio.play().then(
      () => musicBtn.classList.add("is-playing"),
      () => { } // autoplay blocked — user can tap the button
    );
  }
  musicBtn.addEventListener("click", () => {
    if (audio.paused) playMusic();
    else {
      audio.pause();
      musicBtn.classList.remove("is-playing");
    }
  });

  /* ---------- reveal on scroll ---------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  /* ---------- envelope intro (3D flap opening) ---------- */
  const envelope = $("envelope");
  const site = $("site");
  const E = CONFIG.envelope || {};

  const hint = $("envelope-hint");
  if (hint) hint.textContent = E.hint || "TAP TO OPEN";
  const title = $("envelope-title");
  if (title) title.textContent = E.title || E.revealText || "You're invited";
  const bismillah = $("envelope-bismillah");
  if (bismillah) {
    if (E.bismillah === "") bismillah.remove();
    else if (E.bismillah) bismillah.textContent = E.bismillah;
  }

  function showSite() {
    site.hidden = false;
    startHero();
    document.body.classList.remove("locked");
    if (hasMusic) musicBtn.hidden = false;
  }

  if (!E.enabled) {
    envelope.remove();
    showSite();
  } else {
    document.body.classList.add("locked");
    window.scrollTo(0, 0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let opened = false;

    const open = () => {
      if (opened) return;
      opened = true;
      if (hasMusic && CONFIG.music.autoplay) playMusic();

      // 1) the flap swings up toward you and off the top of the screen
      envelope.classList.add("is-opening");

      // 2) near the end of the swing, the site appears underneath and the envelope dissolves
      setTimeout(() => {
        showSite();
        envelope.classList.add("is-leaving");
      }, reduced ? 50 : 1550);

      // 3) clean up
      setTimeout(() => envelope.remove(), reduced ? 1100 : 2700);
    };

    envelope.addEventListener("click", open);
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  }
})();
