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

  // hero
  $("hero-kicker").textContent = CONFIG.hero.kicker;
  $("name-first").textContent = c.firstName;
  $("name-second").textContent = c.secondName;
  $("hero-date").textContent = c.dateDisplay;
  $("hero-btn-text").textContent = CONFIG.hero.buttonText;
  $("hero-scroll-text").textContent = CONFIG.hero.scrollHint;
  if ($("hero-photo-left")) $("hero-photo-left").src = CONFIG.hero.photoLeft;
  if ($("hero-photo-right")) $("hero-photo-right").src = CONFIG.hero.photoRight;
  $("hero-btn").addEventListener("click", () => {
    const target = document.getElementById(CONFIG.hero.buttonTarget);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });

  // save the date
  $("std-illustration").src = CONFIG.saveTheDate.illustration;
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
  $("countdown-title").textContent = CONFIG.countdown.title;
  $("countdown-closing").textContent = CONFIG.countdown.closing;
  $("cd-days-label").textContent = CONFIG.countdown.labels.days;
  $("cd-hours-label").textContent = CONFIG.countdown.labels.hours;
  $("cd-minutes-label").textContent = CONFIG.countdown.labels.minutes;
  $("cd-seconds-label").textContent = CONFIG.countdown.labels.seconds;

  const weddingTime = new Date(CONFIG.weddingDate).getTime();
  function tick() {
    let diff = Math.max(0, weddingTime - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    $("cd-days").textContent = days;
    $("cd-hours").textContent = hours;
    $("cd-minutes").textContent = minutes;
    $("cd-seconds").textContent = seconds;
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
      () => {} // autoplay blocked — user can tap the button
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

  /* ---------- envelope intro flow ---------- */
  const envelope = $("envelope");
  const invited = $("invited");
  const site = $("site");
  $("envelope-hint").textContent = CONFIG.envelope.hint;
  $("invited-text").textContent = CONFIG.envelope.revealText;

  function showSite() {
    site.hidden = false;
    document.body.classList.remove("locked");
    if (hasMusic) musicBtn.hidden = false;
  }

  if (!CONFIG.envelope.enabled) {
    envelope.remove();
    invited.remove();
    showSite();
  } else {
    document.body.classList.add("locked");
    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      envelope.classList.add("is-open");
      if (hasMusic && CONFIG.music.autoplay) playMusic();
      setTimeout(() => invited.classList.add("is-visible"), 600);
      // leave the interstitial on screen long enough for the plant to grow
      setTimeout(() => {
        showSite();
        invited.classList.remove("is-visible");
        setTimeout(() => {
          envelope.remove();
          invited.remove();
        }, 1000);
      }, 4800);
    };
    envelope.addEventListener("click", open);
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") open();
    });
  }
})();
