# cltxpj.app.br — CLT x PJ

Plataforma de comparacao de propostas CLT x PJ. Marketing website com simulador interativo e admin dashboard.

## Features

- Interactive CLT vs PJ salary simulator with live annual net income comparison
- Full comparison wizard with step-by-step flow and detailed breakdowns
- Admin dashboard at `/admin` for reviewing waitlist submissions and telemetry
- Blog with 53 articles on career, finance, and tax law
- iOS App Store link and Android waitlist page
- Mobile-first responsive design with glassmorphism dark theme (Navy + Gold)
- LGPD-compliant cookie consent
- Analytics funnel tracking (GA4-ready)
- Serverless API via Netlify Functions with persistent blob storage

## Tech Stack

- Static HTML5 landing page with TailwindCSS (CDN) and vanilla JavaScript
- React + Vite admin dashboard
- Netlify Functions (serverless) for submissions, telemetry, and health
- Netlify Blobs for persistent data storage (no database required)
- Netlify for hosting, CI/CD, and functions

## Project Structure

```
├── index.html                      # Main landing page with simulator
├── comparar.html                   # Full comparison wizard
├── css/
│   ├── styles.css                  # Global styles
│   ├── comparar.css                # Comparison page styles
│   └── cookie-consent.css          # Cookie banner styles
├── js/
│   ├── app.js                      # Landing page logic
│   ├── tax-engine.js               # CLT tax engine (INSS, IRRF, FGTS, 13th, vacation)
│   ├── pj-tax-engine.js            # PJ tax engine (Simples Nacional, MEI, Lucro Presumido)
│   ├── comparar.js                 # Comparison wizard logic
│   ├── analytics.js                # Funnel tracking
│   ├── cookie-consent.js           # LGPD consent
│   └── api-client.js               # API client for admin dashboard
├── blog/                           # 53 blog articles
├── admin/                          # React admin dashboard (source)
│   └── src/
│       └── App.jsx                 # Dashboard UI
├── admin-dist/                     # Built admin app (generated)
├── netlify/
│   ├── functions/
│   │   ├── telemetry.js            # Telemetry events (POST/GET)
│   │   ├── submissions.js          # Waitlist submissions (POST/GET)
│   │   ├── admin-submissions.js    # Admin submissions with auth (GET/PATCH)
│   │   ├── admin-telemetry.js      # Admin telemetry with auth (GET)
│   │   └── health.js               # Health check endpoint
│   └── package.json                # Netlify Functions dependencies
├── tests/                          # Unit tests (74 passing)
├── netlify.toml                    # Netlify config: redirects, functions
└── .github/workflows/deploy.yml    # CI/CD → Hostinger via SFTP
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

### Tests

```bash
npm test
```

### Environment variables

| Variable | Description | Required |
|---|---|---|
| `VITE_ADMIN_PASSWORD` | Password for admin dashboard access | Yes (deploy) |
| `ADMIN_USERNAME` | Admin API username (default: admin) | No |
| `ADMIN_PASSWORD` | Admin API password | No (functions work without auth in dev) |

## Deployment

### Netlify (recommended)

Connect your GitHub repo to Netlify. Push to `main` to trigger a deploy.

Required environment variables (Netlify → Site settings → Environment variables):
- `ADMIN_USERNAME` — Admin dashboard username (default: `admin`)
- `ADMIN_PASSWORD` — Admin API password for protecting submissions/telemetry
- `VITE_ADMIN_PASSWORD` — Admin dashboard frontend password (build variable)

Netlify Blobs are automatically provisioned — no database setup needed.

### Hostinger (legacy)

Push to `main` — GitHub Actions runs tests, builds the admin app, and deploys to Hostinger via SFTP.

Required repository secrets:
- `FTP_SERVER` — Hostinger SFTP host
- `FTP_USERNAME` — Hostinger SFTP username
- `FTP_PASSWORD` — Hostinger SFTP password
- `VITE_ADMIN_PASSWORD` — Admin dashboard password

Note: Hostinger deployment does not include Netlify Functions. Use the Express API server (`api/`) separately.

## Admin Dashboard

Access at `https://cltxpj.app.br/admin`. Protected by password auth (`VITE_ADMIN_PASSWORD`).

Features:
- Submissions table with name, email, role, challenge, source, date, activation status
- Inline status dropdown to update outreach status (pending, contacted, scheduled, onboarded, not_interested)
- Event summary with counts by type
- CSV export of all submissions

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/submissions` | Create waitlist submission |
| GET | `/api/submissions` | List submissions |
| POST | `/api/telemetry` | Record analytics event |
| GET | `/api/telemetry` | Get recent events |
| GET | `/api/telemetry?summary=true` | Get event counts summary |
| GET | `/api/health` | Health check |
| GET | `/admin/submissions` | List submissions (auth required) |
| PATCH | `/admin/submissions/:id/status` | Update submission status (auth required) |
| GET | `/admin/telemetry/summary` | Get telemetry summary (auth required) |

## Links

- **Website**: https://cltxpj.app.br
- **iOS App**: https://apps.apple.com/br/app/calculadora-clt-x-pj/id6755878441
