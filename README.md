# cltxpj.app.br — CLT x PJ Calculator

Marketing website and admin dashboard for the CLT x PJ Calculator, a Brazilian tool that helps professionals compare take-home pay between CLT (formal employment) and CNPJ/PJ (independent contractor) regimes.

## Features

- Interactive CLT vs CNPJ salary simulator with live annual net income comparison
- Admin dashboard at `/admin` for reviewing waitlist submissions and telemetry
- Netlify serverless functions for data collection and dashboard API
- Blog with articles on career, finance, and tax law
- iOS App Store link and Android waitlist page
- Mobile-first responsive design with glassmorphism dark theme (Navy + Gold)

## Tech Stack

- Static HTML5 landing page with TailwindCSS (CDN) and vanilla JavaScript
- React + Vite admin dashboard
- Netlify serverless functions (JS)
- Netlify Forms / Brevo for waitlist collection

## Project Structure

```
├── index.html                      # Main landing page with simulator
├── css/styles.css                  # Custom styles
├── js/app.js                       # Calculator logic
├── blog/                           # Blog articles
├── admin/                          # React admin dashboard (source)
├── admin-dist/                     # Built admin app (generated)
├── netlify/functions/              # Serverless functions
│   ├── dashboard.js                # GET submissions + telemetry summary
│   ├── submit.js                   # POST new waitlist submission
│   ├── telemetry.js                # POST telemetry event
│   └── health.js                   # GET health check
├── privacy.html
├── terms.html
├── android-waitlist.html
├── android-waitlist-success.html
├── netlify.toml
└── .github/workflows/deploy.yml
```

## Getting Started

### Landing page

```bash
# Serve locally
python -m http.server 8000
# Or
npx serve .
```

### Admin dashboard

```bash
cd admin
npm install
npm run dev        # dev server at http://localhost:5173/admin/
npm run build      # outputs to ../admin-dist/
```

### Environment variables

| Variable | Description | Required |
|---|---|---|
| `VITE_ADMIN_PASSWORD` | Password for admin dashboard access | Yes (deploy) |
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | Yes (CI/CD) |
| `NETLIFY_SITE_ID` | Netlify site ID | Yes (CI/CD) |

## Deployment

Push to `main` — GitHub Actions builds the admin app and deploys everything to Netlify.

Required repository secrets:
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`
- `VITE_ADMIN_PASSWORD`

## Admin Dashboard

Access at `https://cltxpj.app.br/admin`. Protected by password auth (`VITE_ADMIN_PASSWORD`).

Features:
- Submissions table with name, email, role, challenge, source, date, activation status
- Event summary with counts by type
- CSV export of all submissions

## Links

- **Website**: https://calculadoracltpj.com.br
- **iOS App**: https://apps.apple.com/br/app/calculadora-clt-x-pj/id6755878441
