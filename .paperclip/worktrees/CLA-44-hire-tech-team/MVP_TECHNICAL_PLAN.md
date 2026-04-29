# MVP Technical Plan — CLT x PJ Web Comparison

**Date:** 2026-03-31
**Owner:** Founding Engineer
**Goal:** Ship a usable web-based CLT vs PJ comparison flow that a user can complete in < 2 minutes

---

## Problem

The current landing page has a toy 2-input calculator (CLT salary vs PJ monthly). It lacks:
- Benefits input (VR, VT, health plan, bonus)
- PJ regime selection (Simples Nacional, MEI, Lucro Presumido)
- Detailed breakdown of what drives the difference
- Save/share/export capability
- Mobile-first dedicated calculator experience

## MVP Scope (P0)

### 1. Dedicated Comparison Page (`/comparar`)
- Full CLT input form: salary, benefits (VR, VT, health, dental, bonus/PLR), dependents
- Full PJ input form: monthly revenue, tax regime (Simples Nacional / MEI / Lucro Presumido), annex selection, accountant cost, operational expenses
- Real-time calculation as user types
- Side-by-side result view with:
  - Annual net comparison
  - Monthly equivalent
  - Key differentiators (benefits value, tax burden, FGTS)
  - Clear winner indicator
- localStorage persistence (auto-save, resume on return)
- Mobile-first responsive design matching brand

### 2. Landing Page Integration
- "Comparar minha proposta" CTA on homepage → `/comparar`
- Keep existing hero calculator as teaser
- Add link to full comparison in hero section

### 3. Deployment
- Netlify config (`netlify.toml`) for SPA routing
- Deploy from this repo's `web/cltxpj.app.br` directory

### 4. Telemetry
- Wire GA4 placeholder with event tracking:
  - `comparison_started`
  - `comparison_completed`
  - `benefits_added`
  - `pj_regime_selected`
- Funnel completion rate tracking

### 5. Legal Compliance
- Cookie consent banner (simple opt-in/out)
- Privacy Policy + ToS links in footer (already exist)

## Out of Scope (P1+)

- PDF export
- Multi-comparison history
- AI analysis integration (Gemini API)
- User accounts / auth
- Android app
- Admin dashboard
- Blog improvements

## Architecture

```
web/cltxpj.app.br/
├── index.html              # Existing landing (keep)
├── comparar.html           # NEW: Full comparison page
├── css/
│   ├── styles.css          # Existing (keep)
│   └── comparar.css        # NEW: Comparison-specific styles
├── js/
│   ├── tax-engine.js       # Existing (keep)
│   ├── pj-tax-engine.js    # Existing (keep)
│   ├── app.js              # Existing (keep)
│   ├── analytics.js        # Existing (keep)
│   └── comparar.js         # NEW: Comparison page logic
├── netlify.toml            # NEW: Deploy config
└── package.json            # Existing
```

## Success Metrics

- 70%+ completion rate on first comparison attempt
- < 2 minutes median time to complete a comparison
- Page loads in < 2s on 3G (static HTML, no framework)
- Zero JS errors in production

## Risks / Blockers

| Risk | Mitigation |
|------|-----------|
| Tax calculation accuracy | Reuse existing tested engines; add integration tests |
| Mobile UX complexity | Progressive disclosure — show advanced inputs behind toggles |
| No design system yet | Follow existing brand colors + Tailwind patterns from landing page |
| Deployment unknown | Start with Netlify (free tier), migrate later if needed |

## Timeline

| Day | Task |
|-----|------|
| 1 | Build `/comparar` page structure + CLT form |
| 1 | Build PJ form + wire to tax engines |
| 2 | Build results view + responsive design |
| 2 | Add localStorage persistence + analytics |
| 3 | Deploy + test end-to-end |
| 3 | Cookie consent + legal polish |
