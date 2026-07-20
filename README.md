# محمد و أسماء — Wedding Invitation (Cinematic Edition)

A single-page wedding invitation with a cinematic, dark wood-and-amber
aesthetic: a 3D envelope that opens on click revealing the invitation card,
canvas-animated falling rose petals, drifting smoke/atmosphere, background
music from a YouTube video (starts on the envelope-open click, which
satisfies browsers' autoplay-with-sound rules), a bilingual Arabic/English
toggle, live countdown, add-to-calendar, map directions, WhatsApp share, and
an RSVP form powered by FormSubmit.co (no backend needed).

> Hosting note: this targets **GitHub Pages**, not Netlify — as of mid-2026
> `*.netlify.app` sites are widely reported unreachable from Egyptian ISPs
> without a VPN.

## 1. Required setup before deploying

**RSVP email** — open `index.html`, find:
```html
<form class="rsvp-form" id="rsvpForm" method="POST" action="https://formsubmit.co/ajax/YOUR-EMAIL@example.com">
```
Replace `YOUR-EMAIL@example.com` with your real address. The first-ever
submission triggers a one-time confirmation email from FormSubmit — click
it to activate. Every submission after that lands straight in your inbox.

**Music video** — open `script.js`, find near the top:
```js
var YT_VIDEO_ID = "AJgE_dLWsuQ"; // replace with your own video ID if desired
```
This is the ID from the YouTube link you shared. To use a different video,
swap in its ID (the part after `youtu.be/` or `v=` in its URL).

A quick copyright note: the site embeds the video via YouTube's own player
(an iframe pointing at YouTube), which is how any YouTube "background music"
embed works — nothing is downloaded, copied, or rehosted. It plays through
YouTube itself, same as if a guest opened the video directly.

## 2. Deploy to GitHub Pages (free)

1. Create a repo at https://github.com/new (e.g. `mohamed-asmaa-wedding`).
2. Upload all files in this folder (drag-and-drop on github.com works, or
   `git push` if you prefer the CLI).
3. **Settings → Pages → Source** → branch `main`, folder `/ (root)` → Save.
4. Live in a minute or two at:
   `https://YOUR-USERNAME.github.io/mohamed-asmaa-wedding/`

## Local preview

Open `index.html` directly in a browser — everything runs client-side.
(RSVP submission needs a real deployed URL; FormSubmit won't accept
requests from a local `file://` page.)

## Customizing

- **Text/copy**: `data-ar` / `data-en` attributes in `index.html`.
- **Colors**: `:root` block at the top of `style.css`.
- **Date/time**: `EVENT_START` in `script.js` (and the visible text in
  `index.html`).
- **Petals/smoke density or speed**: `COUNT` and `speed` values inside the
  petals/smoke IIFEs in `script.js`.
- **Venue/map**: the Google Maps query in the `iframe src` in `index.html`
  and in the directions link in `script.js`.

## Files

- `index.html` — envelope scene, letter, verse, countdown, details, RSVP, footer
- `style.css` — cinematic wood/amber/wine design system (tokens at top)
- `script.js` — envelope open + music trigger, canvas petals & smoke,
  language toggle, countdown, calendar, directions, WhatsApp share, RSVP
- `.nojekyll` — tells GitHub Pages to serve files as-is
