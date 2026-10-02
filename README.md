# Personal Developer Portfolio

A clean, modern, dark-themed personal portfolio website for a 1st-year Computer Science student and aspiring full-stack web developer.

Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step. Ready to deploy on GitHub Pages, Vercel, or Netlify.

---

## Features

- **Mobile-first responsive design** (phones → desktops)
- Sticky glass-style navigation with active section indicator
- Smooth scrolling & keyboard-accessible navigation
- Premium project cards with hover elevation and subtle border glow
- Developer journal / article previews
- Tech stack & skills section
- Authentic About Me section
- Contact form with client-side validation + success simulation
- Accessibility: semantic HTML, focus states, skip link, `prefers-reduced-motion`
- Fast loading, no heavy dependencies

---

## Quick Start

1. Clone or download this repository.
2. Open `index.html` in a browser, **or** serve locally:

```bash
# Using Python
python -m http.server 8000

# Using Node (npx)
npx serve .
```

3. Visit `http://localhost:8000`.

---

## Personalization Checklist

Replace all placeholders before publishing:

| Placeholder              | Location                          | Example                          |
|--------------------------|-----------------------------------|----------------------------------|
| `[YOUR NAME]`            | HTML (title, hero, nav, footer)   | Alex Rivera                      |
| `[YOUR EMAIL]`           | Contact + footer                  | alex@example.com                 |
| `[YOUR GITHUB]`          | Links                             | alexrivera                      |
| `[YOUR LINKEDIN]`        | Links                             | alexrivera                      |
| Project demo URLs        | Project cards                     | https://my-pwa.vercel.app        |
| GitHub repo URLs         | Project cards                     | https://github.com/you/repo      |
| Journal “Read More” links| Journal cards                     | Link to real posts or remove     |

Also update:
- Page `<title>` and meta description
- Copyright year if needed
- Project descriptions / features if you change the projects

---

## Project Structure

```
/
├── index.html          # Main markup
├── css/
│   └── style.css       # All styles (custom properties, responsive)
├── js/
│   └── app.js          # Navigation, form, scroll, reveals
├── assets/
│   ├── images/         # (optional) add your images here
│   └── icons/          # (optional)
└── README.md
```

---

## Deploy

### GitHub Pages
1. Push to a GitHub repository.
2. Settings → Pages → Source: Deploy from branch `main` / root.
3. Site will be live at `https://<username>.github.io/<repo>`.

### Vercel
1. Import the repository on [vercel.com](https://vercel.com).
2. Framework preset: Other.
3. Deploy. Zero configuration needed.

### Netlify
1. Drag the folder to Netlify Drop, or connect the Git repo.
2. Publish directory: root (`/`).

---

## Connecting a Real Contact Form

The form currently validates and shows a success message only (frontend simulation).

To make it send real emails, you can:

- **Formspree** — add `action="https://formspree.io/f/your-id"` and `method="POST"`
- **EmailJS** — integrate their SDK in `app.js`
- **Netlify Forms** — add `netlify` attribute to the form
- **Custom backend** — point the form to your own API endpoint

The validation logic in `js/app.js` can stay; just replace the simulated `setTimeout` success block with a real fetch call.

---

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge).  
Uses CSS custom properties, `backdrop-filter`, and Intersection Observer (with graceful fallbacks).

---

## License

Feel free to use this as a starting point for your own portfolio.  
Attribution appreciated but not required.

---

Built with care — keep shipping.
