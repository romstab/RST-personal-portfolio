# Rome Mhar Tabifranca — Developer Portfolio

Personal portfolio of **Rome Mhar Tabifranca**, a 1st-year BSCS student at Laguna State Polytechnic University.

Static frontend (HTML/CSS/JS) + **Vercel Serverless** contact API that emails form submissions to `romemhartabifranca68@gmail.com` via [Resend](https://resend.com).

---

## Structure

```
/
├── index.html          # Portfolio (includes inline CSS fallback)
├── css/style.css
├── js/app.js
├── api/
│   └── contact.js      # POST /api/contact — sends email via Resend
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## Contact form (real email delivery)

### How it works

1. Visitor submits Name, Email, Message  
2. Frontend `POST`s JSON to `/api/contact`  
3. Vercel serverless function validates + sends email with Resend  
4. You receive the message at **romemhartabifranca68@gmail.com**  
5. Reply-To is set to the visitor’s email so you can reply directly  

### Setup (required once)

#### 1. Create a Resend account

1. Sign up at [https://resend.com](https://resend.com)  
2. Create an API key  
3. For **testing**, Resend allows sending from `onboarding@resend.dev`  
4. For **production**, verify your own domain in Resend and set `CONTACT_FROM_EMAIL` to an address on that domain  

#### 2. Deploy on Vercel

GitHub Pages **cannot** run `/api/contact.js`. Deploy this project on **Vercel**.

1. Import the GitHub repo at [vercel.com](https://vercel.com)  
2. Framework Preset: **Other**  
3. Open **Project → Settings → Environment Variables** and add:

| Name | Value |
|------|--------|
| `RESEND_API_KEY` | your Resend API key (`re_...`) |
| `CONTACT_TO_EMAIL` | `romemhartabifranca68@gmail.com` |
| `CONTACT_FROM_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` (or your verified domain) |

4. Redeploy the project after saving env vars  

#### 3. Test

1. Open the live site  
2. Submit the contact form with a real message  
3. Check **romemhartabifranca68@gmail.com** (and spam folder)  
4. Success UI only appears if the API returns success  

### Local testing

```bash
npm i -g vercel
vercel env pull   # optional, pulls env vars
vercel dev        # serves site + /api/contact on localhost
```

---

## Personal info

| Item | Value |
|------|--------|
| Name | Rome Mhar Tabifranca |
| School | Laguna State Polytechnic University |
| Course | BSCS, 1st Year |
| Email | romemhartabifranca68@gmail.com |
| GitHub | https://github.com/romstab |
| LinkedIn | https://www.linkedin.com/in/rome-mhar-tabifranca-94a208440 |

### Projects

1. **BSCS 1-A Section Hub** — https://romstab.github.io/reminders-dashboard/  
2. **Business Booking & Management System** — https://multi-tenant-ai-b-git-d33d97-romemhartabifranca68-pngs-projects.vercel.app/  

---

## Notes

- Never commit `.env` or real API keys  
- Honeypot field blocks basic bots  
- Server validates name, email, message length/format  
- Frontend does **not** show success unless the API succeeds  

Built by Rome Mhar Tabifranca.
