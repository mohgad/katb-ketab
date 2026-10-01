/* ============================================================
   WEDDING INVITATION — CONFIG
   Everything on the site is controlled from this file.
   Edit the values, save, refresh the page. No code knowledge needed.
   Put your pictures inside the  img/  folder and reference them below.
   ============================================================ */

const CONFIG = {
  /* ---------- COUPLE ---------- */
  couple: {
    firstName: "Gad", // shown first  (Name1 & Name2)
    secondName: "Habiba",
    // Short date shown under the names, e.g. 30 . 11 . 2026
    dateDisplay: "27 . 12 . 2026",
  },

  /* ---------- WEDDING DATE & TIME (for the live countdown) ----------
     Format: "YYYY-MM-DDTHH:MM:SS"  (24h clock, local time)            */
  weddingDate: "2026-12-27T17:30:00",

  /* ---------- BROWSER TAB ---------- */
  page: {
    title: "Gad & Habiba — Wedding Invitation",
    // Emoji shown in the browser tab
    favicon: "💍",
  },

  /* ---------- ENVELOPE INTRO ---------- */
  envelope: {
    enabled: true, // false = skip the envelope, go straight to the site
    hint: "TAP TO OPEN",
    title: "You're invited", // handwritten line printed on the envelope
    bismillah: "بسم الله الرحمن الرحيم", // small line above it ("" hides it)
  },

  /* ---------- HERO (first screen, right after the envelope) ----------
     Video of the bride & groom walking hand in hand in the sahn of
     Mohamed Ali Mosque (portrait, centred on the mosque so the arcades
     mirror each other). It starts when the envelope opens, plays once
     (no sound) and rests on its last frame.                              */
  hero: {
    names: "Habiba & Gad", // shown over the video
    kicker: "", // small line above the names ("" hides it)
    subtitle: "", // line under the names ("" hides it)
    showDate: false, // true = show the date under the names
    scrollHint: "SCROLL",
    video: "img/hero-gemini.mp4",
    poster: "img/hero-gemini-poster.jpg", // still image shown while the video loads
    loop: false, // true = repeat the video instead of resting on the last frame
  },

  /* ---------- SAVE THE DATE SECTION ---------- */
  saveTheDate: {
    // Line-art illustration between the title and the names.
    // Swap with your own image / illustration if you like.
    illustration: "img/couple.svg",
  },

  /* ---------- VENUE SECTION (dark, full-screen photo) ---------- */
  venue: {
    // Headline: the middle part is rendered in italic
    titleStart: "Under one",
    titleItalic: "very full",
    titleEnd: "moon.",
    name: "Salah El-Din Citadel",
    when: "27 Dec 2026 · 5:30 PM Arrival",
    dress: "No Kids Allowed / ممنوع اصطحاب الأطفال",
    mapsUrl: "https://maps.app.goo.gl/9LDw7PWMbuk4L6Mp9",
    background: "img/citadel_new.jpg", // big background photo of the venue
  },

  /* ---------- PROGRAM / TIMELINE ---------- */
  program: {
    kicker: "How the day unfolds", // handwritten line
    title: "The program",
    closing: "Stay as late as your heart wants ✽",
    // Add / remove / edit as many items as you want
    items: [
      {
        time: "5:30 PM",
        title: "Arrival",
        note: "Welcome and gathering before the ceremony.",
      },
      {
        time: "7:30 PM",
        title: "Katb Ketab",
        note: "Where the forever part happens.",
      },
      // {
      //   time: "6:00 PM",
      //   title: "The Ceremony",
      //   note: "Where the forever part happens.",
      // },
      // {
      //   time: "8:00 PM",
      //   title: "Dinner Under the Stars",
      //   note: "Three courses, many speeches.",
      // },
      // {
      //   time: "12:00 AM",
      //   title: "Late Night Bites",
      //   note: "Because love makes you hungry.",
      // },
    ],
  },

  /* ---------- GALLERY (black section) ---------- */
  gallery: {
    title: "Moments, Framed.",
    subtitle: "A love letter, in fragments. Tap, hover, linger.",
    // Add as many photos as you want — they flow in a 2-column grid
    photos: [
      "img/gallery-1.jpg",
      "img/gallery-2.jpg",
      "img/gallery-3.jpg",
      "img/gallery-4.jpg",
    ],
  },

  /* ---------- COUNTDOWN ---------- */
  countdown: {
    title: "Countdown", // written in script
    text: "You are invited to celebrate our Katb Ketab on the 27th of December.",
    closing: "", // optional script line under the numbers ("" hides it)
    labels: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
  },

  /* ---------- CLOSING MESSAGE ---------- */
  message: {
    title: "We're so excited to see you!",
    text: "Our next chapter starts with all of you beside us. See you on our special day.",
  },

  /* ---------- FOOTER ---------- */
  footer: {
    creditLabel: "Thank you for visiting our wedding site. Made with love",
    creditName: "", // your name / brand
    creditUrl: "", // optional link on the credit (leave "" for none)
    instagram: "", // e.g. "https://instagram.com/yourpage"  ("" hides the icon)
    tiktok: "", // e.g. "https://tiktok.com/@yourpage"    ("" hides the icon)
  },

  /* ---------- BACKGROUND MUSIC ----------
     Put an .mp3 inside the audio/ folder and set the path here.
     Leave src: "" to hide the music button.                       */
  music: {
    src: "", // e.g. "audio/song.mp3"
    autoplay: true, // tries to start after the envelope is opened
  },

  /* ---------- THEME COLORS ----------
     The whole look is driven by these. Defaults match the original. */
  theme: {
    paper: "#eee8df", // sandstone / warm beige
    paperSoft: "#e6dfd3", // darker sandstone for cards
    ink: "#2a1f18", // deep earthy brown (near-black)
    inkSoft: "#5c4a3d", // warm secondary gray/brown
    dark: "#241a13", // rich dark charcoal/brown
    light: "#f5eedf", // warm text on dark sections
    seal: "#9c5234", // terracotta/brick red seal
    line: "#d3c8b8", // warm thin divider lines
  },
};
