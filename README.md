# Calculadora CLT x PJ — Landing page and web simulator for comparing CLT vs PJ compensation in Brazil

Official website for the CLT x PJ Calculator, a tool that helps professionals compare job offers under CLT (formal employment) versus PJ/CNPJ (independent contractor) regimes in Brazil. Includes a real-time salary simulator and a blog with career and finance content.

## Features

- Real-time CLT vs PJ salary simulator with annual net income comparison
- AI-powered comparative analysis (mock mode by default)
- Blog with articles on career, finance, and labor law
- iOS app download link and Android waitlist
- Responsive mobile-first design with glassmorphism theme
- Scroll animations respecting `prefers-reduced-motion`

## Tech Stack

- HTML5 with semantic structure
- TailwindCSS (CDN) for utility-first styling
- Custom CSS with Navy + Gold glassmorphism theme
- Vanilla JavaScript for calculator logic
- GitHub Actions for CI/CD via FTP
- Hosted on Hostinger

## Screenshots

The landing page features a dark navy theme with gold accents, an interactive salary simulator card, feature highlights, audience-specific sections, and a blog feed.

## Project Structure

```
public/
├── index.html            # Landing page with simulator
├── css/styles.css        # Custom styles
├── js/app.js             # Calculator logic
├── blog/                 # Blog articles
├── privacy.html          # Privacy Policy
├── terms.html            # Terms of Use
└── android-waitlist.html # Android waitlist page
```

## Getting Started

```bash
# Local server
cd public && python -m http.server 8000

# Or with Node
npx serve public
```

Open http://localhost:8000

## Deployment

Deployment is automatic via GitHub Actions on push to `main`. The workflow at `.github/workflows/deploy.yml` syncs the `public/` folder to Hostinger via FTP.

## Links

- **Website**: https://calculadoracltpj.com.br
- **iOS App**: https://apps.apple.com/br/app/calculadora-clt-x-pj/id6755878441

## License

All rights reserved.
