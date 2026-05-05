# 🌙 دعوة زفاف رقمية — Arabic Digital Wedding Invitation

> "دعوة بروح إسلامية حديثة… هادئة، راقية، ومليئة بالنور"

A premium Arabic digital wedding invitation template with a modern Islamic aesthetic — soft gold, deep green, subtle geometric patterns, and glowing light particles.

---

## 📁 File Structure

```
├── index.html    — Main HTML structure (all 10 sections)
├── style.css     — Premium styling, animations, color variables
├── script.js     — Particles, countdown, RSVP, music, gallery
└── README.md     — This file
```

---

## ✏️ How to Change Arabic Text

Open `index.html` and search for the text you want to replace:

| Element | Where to find it |
|---|---|
| Couple names | `<span class="name-bride">فاطمة</span>` and `<span class="name-groom">أحمد</span>` |
| Event date | Inside `.detail-card` — "الجمعة، ١٥ مايو ٢٠٢٦" |
| Event time | Inside `.detail-card` — "السابعة مساءً" |
| Venue name | Inside `.detail-card` — "قاعة النور الكبرى" |
| Venue city | Inside `.detail-card` — "الرياض، المملكة العربية السعودية" |
| Final message | `.final-title` — "ننتظركم بكلّ حبٍّ وشوق" |

---

## 📅 How to Change the Countdown Date

Open `script.js`, line 7:

```js
const WEDDING_DATE = new Date('2026-05-15T19:00:00');
```

Replace `2026-05-15T19:00:00` with your actual wedding date/time in ISO format:
- Format: `YYYY-MM-DDTHH:MM:SS`
- Example for 20 June 2026 at 8 PM: `'2026-06-20T20:00:00'`

---

## 🖼️ How to Replace Images

Images are loaded from Unsplash URLs. To replace with your own:

1. **Hero background** — In `style.css`, find `.hero-bg-image` and change the `background-image` URL
2. **Gallery images** — In `index.html`, find `<img src="https://images.unsplash.com/...">` tags inside `.gallery-grid` and replace the `src` with your image path or URL
3. **Location preview** — In `index.html`, find `<img src="..." alt="خريطة المكان">` inside `.location-map-preview`
4. **Final section background** — In `style.css`, find `.final-bg-image` and change the `background-image` URL

For local images, place them in the same folder and reference them like:
```html
<img src="my-photo.jpg" alt="..." />
```

---

## 📬 How RSVP Works

The RSVP form sends a `POST` request to:
```
https://rsvp-xedary.vercel.app/api/rsvp
```

With this JSON body:
```json
{
  "name": "اسم الضيف",
  "attendance": "yes",
  "guests": "2",
  "message": "ألف مبروك!"
}
```

- `attendance` is either `"yes"` or `"no"`
- The form shows a loading spinner while submitting
- On success: a gold success card appears with a thank-you message
- On error: a red error message appears prompting the user to retry

### To change the RSVP endpoint:
In `script.js`, find line ~95:
```js
const res = await fetch('https://rsvp-xedary.vercel.app/api/rsvp', {
```
Replace the URL with your own API endpoint.

---

## 🎵 Background Music

The template uses a placeholder audio URL. To use your own:

In `index.html`, find:
```html
<audio id="bgMusic" loop>
  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" type="audio/mpeg" />
</audio>
```

Replace the `src` with your audio file path or a hosted URL. Supported formats: `.mp3`, `.ogg`, `.wav`.

> ⚠️ Most browsers block autoplay. The music only plays when the user clicks the ♪ button.

---

## 🗺️ How to Change the Map Link

In `index.html`, find the location button:
```html
<a href="https://maps.google.com" target="_blank" class="location-btn">
```

Replace `https://maps.google.com` with your Google Maps or Apple Maps link. To get a Google Maps link:
1. Open Google Maps
2. Search for your venue
3. Click Share → Copy Link

---

## 🎨 How to Change Colors

All colors are CSS variables in `style.css`, lines 6–22:

```css
:root {
  --cream:       #f8f4ec;   /* page background */
  --gold:        #c9a84c;   /* primary accent */
  --green:       #1e3a2f;   /* dark sections */
  --beige:       #e8dcc8;   /* soft background */
  /* ... */
}
```

Change these values to update the entire color scheme at once.

---

## 🚀 How to Deploy

### Option 1 — GitHub Pages (Free)
1. Create a GitHub repository
2. Upload `index.html`, `style.css`, `script.js`
3. Go to Settings → Pages → Source: `main` branch
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2 — Vercel (Free, Fast)
1. Sign up at [vercel.com](https://vercel.com)
2. Connect your GitHub repo or drag-and-drop the folder
3. Deploy — you'll get a live URL instantly

### Option 3 — Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder onto the Netlify dashboard
3. Done — instant live URL with HTTPS

### Option 4 — Any Web Host
Simply upload the 3 files to any web hosting (cPanel, FTP, etc.) in the public folder.

---

## 📱 Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge | ✅ Full |
| Safari (iOS) | ✅ Full |
| Firefox | ✅ Full |
| Samsung Internet | ✅ Full |

---

## 💡 Tips

- **Test on mobile first** — the design is mobile-first
- **Customize fonts** — edit the Google Fonts link in `<head>` for different Arabic typefaces
- **Add more gallery images** — copy a `.gallery-item` div and change the `src`
- **Disable particles** — comment out `initParticles()` in `script.js` for lower-end devices

---

Made with ❤️ and نور ✨
