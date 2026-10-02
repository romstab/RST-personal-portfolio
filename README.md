# Rome Mhar Tabifranca — Developer Portfolio

Personal portfolio website of **Rome Mhar Tabifranca**, a 1st-year BSCS student at Laguna State Polytechnic University.

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step. Ready for GitHub Pages, Vercel, or Netlify.

---

## Features

- Mobile-first responsive design
- Sticky glass-style navigation with active section indicator
- Smooth scrolling & accessible mobile menu
- Premium project cards
- Developer journal section
- Skills / tech stack badges
- About section with education
- Contact form with client-side validation
- Accessibility support (`prefers-reduced-motion`, focus states, skip link)
- Fast loading — no heavy dependencies

---

## Tech Stack

- HTML5
- CSS3 (custom properties, mobile-first)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter + JetBrains Mono)

---

## Folder Structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

---

## How to Run Locally

1. Clone or download this repository.
2. Open a terminal in the project root.
3. Serve the files:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

4. Open `http://localhost:8000` in your browser.

You can also open `index.html` directly in a browser for a quick preview.

---

## How to Upload to GitHub

1. Create a new repository on GitHub (e.g. `portfolio` or `romstab.github.io`).
2. Upload the files while keeping the folder structure above.
3. Commit and push.

---

## Deploy

### GitHub Pages

1. Repository → **Settings** → **Pages**
2. Source: Deploy from branch `main` (or `master`), folder `/ (root)`
3. Save. Your site will be live at `https://romstab.github.io` or `https://romstab.github.io/<repo-name>`

### Vercel

1. Go to [vercel.com](https://vercel.com) and import the GitHub repository.
2. Framework Preset: **Other**
3. Deploy. No build command needed.

### Netlify

1. Connect the repository or drag the project folder to Netlify Drop.
2. Publish directory: root (`/`).
3. Deploy.

---

## Customization

### Personal info (already filled)

| Item     | Value |
|----------|-------|
| Name     | Rome Mhar Tabifranca |
| School   | Laguna State Polytechnic University |
| Course   | BSCS, 1st Year |
| Email    | romemhartabifranca68@gmail.com |
| GitHub   | https://github.com/romstab |
| LinkedIn | https://www.linkedin.com/in/rome-mhar-tabifranca-94a208440 |

### Project links (still placeholders)

In `index.html`, find the project cards and replace:

- **Live Demo** `href="#"` → your real demo URL
- **Source Code** `href="https://github.com/romstab"` → the specific repo URL for that project

### Journal "Read More" links

Replace `href="#"` on the journal cards with real article URLs when you publish them.

### Contact form

The form validates input and shows a success message (frontend only).  
To send real emails later, connect it to:

- Formspree
- EmailJS
- Netlify Forms
- or your own backend

The validation logic in `js/app.js` can stay; just replace the simulated success block with a real request.

---

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge).  
Uses CSS custom properties, `backdrop-filter`, and Intersection Observer (with fallbacks).

---

## License

Feel free to use this structure as a starting point for your own portfolio.

---

Built by Rome Mhar Tabifranca — keep shipping.
