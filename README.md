# Wedding Invitation Website 💍

A one-page animated wedding invitation site — envelope opening, hero, save-the-date,
venue, program timeline, photo gallery, live countdown, and background music.
Everything is controlled from **one config file**, no coding needed.

## Structure

```
├── index.html      ← the page (don't edit unless you know HTML)
├── config.js       ← ✏️ EDIT THIS — all names, dates, texts, links, colors
├── css/style.css   ← styles
├── js/main.js      ← logic (countdown, envelope animation, music…)
├── img/            ← 🖼️ put your photos here
└── audio/          ← 🎵 put your music file here (optional)
```

## How to customize

1. Open `config.js` in any text editor.
2. Change names, wedding date, venue info, program items, texts — save the file.
3. Replace the placeholder images in `img/` **keeping the same file names**
   (or change the paths in `config.js` to your own file names):
   - `photo-1.jpg`, `photo-2.jpg` — the two tilted photos on the first screen
   - `gallery-1.jpg` … `gallery-4.jpg` — the gallery (add more paths in the config for more photos)
   - `venue.jpg` — the big background photo of the venue
   - `couple.svg` — the line-art illustration (swap with your own if you like)
4. **Music (optional):** drop an `.mp3` into `audio/` and set
   `music.src: "audio/yourfile.mp3"` in the config.
5. **Colors:** the `theme` block at the bottom of the config controls the whole
   palette (cream paper, ink black, gold seal, etc.).

## Preview locally

Just open `index.html` in a browser, or run a tiny server:

```bash
python -m http.server 8000
```

then open http://localhost:8000

## Host on GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `wedding`).
2. Upload all these files to the repository (drag & drop works on github.com →
   *Add file → Upload files*).
3. Go to **Settings → Pages** → under *Build and deployment* choose
   **Deploy from a branch**, branch **main**, folder **/ (root)** → Save.
4. After ~1 minute your site is live at
   `https://<your-username>.github.io/<repo-name>/`

Any time you edit `config.js` or swap images and push/upload again, the site
updates automatically.
