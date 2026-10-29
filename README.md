# Areeba — Web Developer & WordPress Developer Portfolio

Plain HTML, CSS and JavaScript. No build step, no `node_modules`.

## Files
- `index.html` – homepage (hero, about, skills, featured work, why choose me, counters, contact)
- `portfolio.html` – all 12 projects with category filters
- `css/styles.css` – all styling, dark/light theme variables at the top
- `js/data.js` – **all editable content** (projects, skills, contact details)
- `js/main.js` – header/footer, theme toggle, rendering, animations
- `assets/areeba-hero.png` – hero photo (background removed, mild contrast/brightness adjustment)
- `assets/projects/` – put your project screenshots here

## Run in VS Code
1. Right-click the ZIP > Extract All, then in VS Code choose File > Open Folder and select the extracted folder.
2. Install the "Live Server" extension, right-click `index.html` > Open with Live Server.
   (Or just double-click `index.html`; or run `npx serve` in the folder.)

## Edit your content (`js/data.js`)
- **Project screenshots:** save an image (about 1200×750) in `assets/projects/`, then set `image: "assets/projects/yourfile.jpg"` on that project. Empty `image: ""` shows a placeholder.
- **Titles, descriptions, tags, URLs:** edit the matching fields in `PROJECTS`. Set `featured: true` on exactly 3 projects for the homepage.
- **Skill percentages:** edit `level` in `SKILLS`. They are placeholders (70) — set your own honest values.
- **Contact details:** edit `SITE` (email, phone, WhatsApp, LinkedIn, GitHub).
- **Counters:** calculated automatically from the project list (nothing invented).
- **About / Why Choose Me text:** edit directly in `index.html`.

## Deploy
Any static host works: drag the folder onto Netlify Drop, or push to GitHub and enable GitHub Pages / import into Vercel (no build command, output directory `/`).

## Notes
Logos and fonts load from CDNs (jsDelivr, Google Fonts), so an internet connection is needed to see them.
