# cltxpj.app.br — CLT x PJ

Plataforma de comparacao de propostas CLT x PJ. Marketing website com simulador interativo e admin dashboard.

## Features

- Interactive CLT vs PJ salary simulator with live annual net income comparison
- Admin dashboard at `/admin` for reviewing waitlist submissions and telemetry
- Supabase backend for data collection and dashboard API
- Blog with articles on career, finance, and tax law
- iOS App Store link and Android waitlist page
- Mobile-first responsive design with glassmorphism dark theme (Navy + Gold)
- Brand-aligned copy: decision clarity over calculator framing

## Tech Stack

- Static HTML5 landing page with TailwindCSS (CDN) and vanilla JavaScript
- React + Vite admin dashboard
- Supabase (PostgreSQL) for backend API and database
- Brevo for waitlist email collection
- Hostinger shared hosting (hPanel)

## Project Structure

```
├── index.html                      # Main landing page with simulator
├── css/styles.css                  # Custom styles
├── js/app.js                       # Calculator logic
├── blog/                           # Blog articles
├── admin/                          # React admin dashboard (source)
│   └── src/
│       ├── App.jsx                 # Dashboard UI with Supabase client
│       └── lib/supabase.js         # Supabase client configuration
├── admin-dist/                     # Built admin app (generated)
├── .htaccess                       # Hostinger routing + security headers
├── privacy.html
├── terms.html
├── android-waitlist.html
├── android-waitlist-success.html
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

### Environment variables

| Variable | Description | Required |
|---|---|---|
| `VITE_ADMIN_PASSWORD` | Password for admin dashboard access | Yes (deploy) |
| `VITE_SUPABASE_URL` | Supabase project URL | Yes (deploy) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key | Yes (deploy) |
| `FTP_SERVER` | Hostinger SFTP host | Yes (CI/CD) |
| `FTP_USERNAME` | Hostinger SFTP username | Yes (CI/CD) |
| `FTP_PASSWORD` | Hostinger SFTP password | Yes (CI/CD) |

## Deployment

Push to `main` — GitHub Actions builds the admin app and deploys everything to Hostinger via SFTP.

Required repository secrets:
- `FTP_SERVER` — Hostinger SFTP host (from hPanel → Files → FTP Accounts)
- `FTP_USERNAME` — Hostinger SFTP username
- `FTP_PASSWORD` — Hostinger SFTP password
- `VITE_ADMIN_PASSWORD` — Admin dashboard password
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anon key

## Supabase Setup

### Required tables

```sql
-- Waitlist submissions
create table waitlist_submissions (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text not null,
  role text,
  challenge text,
  source text,
  activation_status text default 'pending',
  created_at timestamptz default now()
);

-- Telemetry events
create table telemetry_events (
  id uuid default gen_random_uuid() primary key,
  event_type text not null,
  event_data jsonb,
  created_at timestamptz default now()
);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
alter table waitlist_submissions enable row level security;
alter table telemetry_events enable row level security;

-- Allow public inserts for waitlist
create policy "Public can insert waitlist submissions"
  on waitlist_submissions for insert with check (true);

-- Allow public inserts for telemetry
create policy "Public can insert telemetry events"
  on telemetry_events for insert with check (true);

-- Admin reads require authentication (handled via service role key in production)
-- For MVP, allow anon reads on dashboard (password gate is at app level)
create policy "Anon can read waitlist submissions"
  on waitlist_submissions for select using (true);

-- Allow admin to update status (password gate is at app level)
create policy "Admin can update waitlist submissions"
  on waitlist_submissions for update using (true);

create policy "Anon can read telemetry events"
  on telemetry_events for select using (true);
```

## Admin Dashboard

Access at `https://cltxpj.app.br/admin`. Protected by password auth (`VITE_ADMIN_PASSWORD`).

Features:
- Submissions table with name, email, role, challenge, source, date, activation status
- Inline status dropdown to update outreach status (pending, contacted, scheduled, onboarded, not_interested)
- Event summary with counts by type
- CSV export of all submissions

## Links

- **Website**: https://calculadoracltpj.com.br
- **iOS App**: https://apps.apple.com/br/app/calculadora-clt-x-pj/id6755878441
