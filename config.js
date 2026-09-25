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
    hint: "Click to open",
    revealText: "You are invited!",
  },

  /* ---------- HERO (first screen) ---------- */
  hero: {
    kicker: "you are invited to our katb ketab", // handwritten line above the names
    buttonText: "Save the Date",
    // Clicking the button scrolls to this section id:
    //   "save-the-date" | "venue" | "program" | "gallery" | "countdown"
    buttonTarget: "save-the-date",
    scrollHint: "SCROLL",
    // The two tilted photos under the names (put your files in img/)
    photoLeft: "img/photo-1.jpg",
    photoRight: "img/photo-2.jpg",
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
    dress: "Men: Formal | Women: Simple soirée",
    mapsUrl: "https://maps.app.goo.gl/9LDw7PWMbuk4L6Mp9",
    background: "img/citadel.png", // big background photo of the venue
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
    title: "Counting the days",
    closing: "Until forever begins ✽",
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
    text: "Our next chapter starts with all of you beside us. See you on our special day.<br><br>No kids allowed / ممنوع اصطحاب الأطفال",
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
    paper: "#f4f2ee", // cream background
    paperSoft: "#efede8", // slightly darker cream (cards)
    ink: "#141414", // main text (near-black)
    inkSoft: "#6b6b6b", // secondary gray text
    dark: "#0c0c0c", // black sections background
    light: "#f6f4f0", // text on dark sections
    seal: "#a4763c", // wax-seal bronze/gold
    line: "#dcd9d2", // thin divider lines
  },
};
