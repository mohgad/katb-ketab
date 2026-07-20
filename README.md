# محمد و أسماء — Wedding Invitation

A single-page, dark & moody wedding invitation site with a Cairo-inspired
mashrabiya (lattice) reveal, bilingual Arabic/English toggle, live countdown,
add-to-calendar, map directions, WhatsApp share, and an RSVP form (no backend
needed — powered by FormSubmit.co).

> Note: this project originally targeted Netlify, but as of mid-2026
> `*.netlify.app` sites are widely reported unreachable from Egyptian ISPs
> without a VPN. Deploy on **GitHub Pages** instead (steps below).

## 1. Set your RSVP email (required, do this first)

Open `index.html`, find this line in the RSVP form:

```html
<form class="rsvp-form" id="rsvpForm" method="POST" action="https://formsubmit.co/ajax/YOUR-EMAIL@example.com">
```

Replace `YOUR-EMAIL@example.com` with the email you want RSVPs sent to.

**First-time activation:** the very first time someone submits the form,
FormSubmit sends *you* a confirmation email — click the link in it once to
activate that address. Every submission after that arrives directly in your
inbox as a neat table. No signup, no account, no API key.

## 2. Deploy to GitHub Pages (free)

1. Create a new repository on https://github.com/new (e.g. `mohamed-asmaa-wedding`).
   Public repo is fine and free.
2. Upload all files in this folder to the repo (drag-and-drop works on
   github.com, or `git push` if you prefer the CLI).
3. In the repo: **Settings → Pages → Source** → select branch `main`,
   folder `/ (root)` → Save.
4. GitHub gives you a live URL in a minute or two:
   `https://YOUR-USERNAME.github.io/mohamed-asmaa-wedding/`
5. Optional: **Settings → Pages → Custom domain** if you buy a domain later.

## Alternative if you ever want a custom domain fronted by a CDN

Cloudflare Pages (`pages.dev`) is another solid free option with the same
git-push workflow as Netlify, and putting any host behind Cloudflare's own
DNS/proxy tends to route around ISP-level blocks aimed at a specific
hosting provider's IP ranges. Worth trying if GitHub Pages ever has issues
for your guests too.

## Local preview

Just open `index.html` in a browser — everything runs client-side.
(The RSVP form needs to be on a real deployed URL to submit — FormSubmit
won't accept requests from a local `file://` page.)

## Customizing

- **Text/copy**: edit the `data-ar` / `data-en` attributes directly in
  `index.html` — every bilingual string lives there.
- **Colors**: all in the `:root` block at the top of `style.css`.
- **Date/time**: `EVENT_START` constant at the top of `script.js`
  (also update the visible date text in `index.html`).
- **Venue/map**: the Google Maps query is in the `iframe src` in
  `index.html` and in `directionsBtn.href` in `script.js`.

## Files

- `index.html` — structure & bilingual content
- `style.css` — design system (tokens at top)
- `script.js` — mashrabiya reveal, language toggle, countdown, calendar,
  directions, WhatsApp share, RSVP submission
- `.nojekyll` — tells GitHub Pages to serve files as-is, no Jekyll processing
