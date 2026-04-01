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

## Tech Stack

- Static HTML5 landing page with TailwindCSS (CDN) and vanilla JavaScript
- React + Vite admin dashboard
- Express API server (MySQL) for submissions and telemetry
- Hostinger shared hosting (hPanel)

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
├── api/                            # Express API server (separate deployment)
│   └── src/
│       ├── server.js               # Express app
│       ├── db/                     # MySQL connection pool
│       ├── middleware/             # Auth middleware
│       └── routes/                 # API routes
├── tests/                          # Unit tests (74 passing)
├── .htaccess                       # Hostinger routing + security headers
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

### API server

```bash
cd api
npm install
cp .env.example .env   # configure DATABASE_URL, ADMIN_PASSWORD
npm start              # server at http://localhost:3001
```

### Tests

```bash
npm test
```

### Environment variables

| Variable | Description | Required |
|---|---|---|
| `VITE_ADMIN_PASSWORD` | Password for admin dashboard access | Yes (deploy) |
| `FTP_SERVER` | Hostinger SFTP host | Yes (CI/CD) |
| `FTP_USERNAME` | Hostinger SFTP username | Yes (CI/CD) |
| `FTP_PASSWORD` | Hostinger SFTP password | Yes (CI/CD) |
| `DATABASE_URL` | MySQL connection string | Yes (API server) |
| `ADMIN_PASSWORD` | API admin password | Yes (API server) |

## Deployment

### Frontend (Hostinger)

Push to `main` — GitHub Actions runs tests, builds the admin app, and deploys to Hostinger via SFTP.

Required repository secrets:
- `FTP_SERVER` — Hostinger SFTP host (from hPanel → Files → FTP Accounts)
- `FTP_USERNAME` — Hostinger SFTP username
- `FTP_PASSWORD` — Hostinger SFTP password
- `VITE_ADMIN_PASSWORD` — Admin dashboard password

### API Server (separate)

The Express API server (`api/`) needs a separate deployment target (Railway, Render, Fly.io, or similar). It is excluded from the Hostinger deploy.

## Database Setup

The API server uses MySQL. Required tables:

```sql
CREATE TABLE waitlist_submissions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name TEXT,
  email TEXT NOT NULL,
  role TEXT,
  challenge TEXT,
  source TEXT,
  activation_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE telemetry_events (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  event_type TEXT NOT NULL,
  event_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Admin Dashboard

Access at `https://cltxpj.app.br/admin`. Protected by password auth (`VITE_ADMIN_PASSWORD`).

Features:
- Submissions table with name, email, role, challenge, source, date, activation status
- Inline status dropdown to update outreach status (pending, contacted, scheduled, onboarded, not_interested)
- Event summary with counts by type
- CSV export of all submissions

## Links

- **Website**: https://cltxpj.app.br
- **iOS App**: https://apps.apple.com/br/app/calculadora-clt-x-pj/id6755878441
