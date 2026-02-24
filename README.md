# cltxpj.app.br — Landing page and web simulator for the CLT x PJ Calculator app

Marketing website for the CLT x PJ Calculator, a Brazilian tool that helps professionals compare take-home pay between CLT (formal employment) and CNPJ/PJ (independent contractor) regimes. Features a real-time salary simulator, blog content, and app store links.

## Features

- Interactive CLT vs CNPJ salary simulator with live annual net income comparison
- Comparative bar chart visualization
- AI-powered comparative reading (mock mode)
- Blog with articles on career, finance, and tax law
- iOS App Store link and Android waitlist page
- Mobile-first responsive design with glassmorphism dark theme (Navy + Gold)
- Scroll-triggered animations with `prefers-reduced-motion` support
- Privacy policy and terms of use pages

## Tech Stack

- HTML5 with semantic markup
- TailwindCSS (CDN)
- Custom CSS with glassmorphism effects
- Vanilla JavaScript
- Inter font via Google Fonts

## Screenshots

The site uses a dark navy background with gold accent colors. The hero section features an interactive simulator card where users input CLT salary and PJ proposal to see estimated annual net income side by side.

## Project Structure

```
├── index.html                  # Main landing page with simulator
├── css/styles.css              # Custom styles
├── js/app.js                   # Calculator logic
├── blog/                       # Blog articles (HTML pages)
├── privacy.html                # Privacy policy
├── terms.html                  # Terms of use
├── android-waitlist.html       # Android waitlist signup
├── android-waitlist-success.html # Waitlist confirmation
├── logo.jpg                    # App logo
└── tests/                      # JavaScript tests
```

## Getting Started

```bash
# Serve locally
python -m http.server 8000

# Or with Node
npx serve .

# Run tests
npm test
```

Open http://localhost:8000

## Links

- **Website**: https://calculadoracltpj.com.br
- **iOS App**: https://apps.apple.com/br/app/calculadora-clt-x-pj/id6755878441
