# Follow-On Task Backlog — CLT x PJ

**Date:** 2026-03-31
**Owner:** Founding Engineer
**Status:** Ready for delegation

---

## P0 — Ship Ready (Complete)

| Task | Status |
|------|--------|
| MVP technical plan | ✅ Done |
| `/comparar` page with full CLT+PJ forms | ✅ Done |
| Netlify deployment config | ✅ Done |
| Cookie consent banner | ✅ Done |
| Landing page → comparison page CTA | ✅ Done |
| localStorage auto-save | ✅ Done |
| Analytics event wiring | ✅ Done |
| Existing tests pass (74/74) | ✅ Done |

---

## P1 — Launch Blockers

### CLA-101: Wire GA4 Analytics
- Add real GA4 measurement ID to `index.html` and `comparar.html`
- Verify events fire in GA4 debug view
- **Effort:** 30min
- **Depends on:** GA4 property creation

### CLA-102: Deploy to Production
- Connect repo to Netlify (or Vercel)
- Set up custom domain `cltxpj.app.br`
- Enable HTTPS
- **Effort:** 1hr
- **Depends on:** DNS access

### CLA-103: End-to-End Testing
- Test full flow on mobile Safari (iOS)
- Test full flow on Chrome Android
- Test localStorage persistence across sessions
- Verify tax calculations match iOS app for 3 sample salaries
- **Effort:** 2hr

### CLA-104: Performance Audit
- Run Lighthouse on `/comparar`
- Target: > 90 Performance, > 95 Accessibility
- Optimize if needed (lazy load Tailwind CDN, inline critical CSS)
- **Effort:** 1-2hr

---

## P2 — Growth Features

### CLA-105: Scenario Simulation ("What If")
- Add toggle on results page: "E se eu negociar 10% mais?"
- Quick slider to adjust CLT salary or PJ revenue
- Real-time recalculation without going back to forms
- **Effort:** 3hr

### CLA-106: Share / Export Results
- Generate shareable URL with encoded comparison params
- "Copiar link" button on results page
- Optional: PDF export (html2canvas + jsPDF)
- **Effort:** 4hr

### CLA-107: Comparison History
- List of past comparisons in localStorage
- Click to reload any previous comparison
- Clear all data option
- **Effort:** 2hr

### CLA-108: Email Comparison Results
- Replace hero email form with real backend (Resend, SendGrid)
- Send formatted comparison PDF to user email
- Netlify Functions or Cloudflare Worker for email API
- **Effort:** 4hr

---

## P3 — Platform

### CLA-109: Android App
- Build React Native or Flutter app from web calculator
- Or convert existing Android WebView to full app
- Publish to Play Store
- **Effort:** 2-4 weeks

### CLA-110: User Accounts
- Auth (Clerk, Supabase, or Firebase)
- Save comparisons to cloud
- Multi-device sync
- **Effort:** 1-2 weeks

### CLA-111: AI Analysis Integration
- Wire Gemini API key to existing mock analysis
- Rate limiting + cost controls
- Prompt engineering for better analysis quality
- **Effort:** 2hr

---

## P4 — Content / SEO

### CLA-112: Blog SEO Optimization
- Add structured data (JSON-LD) to blog posts
- Generate sitemap.xml
- Submit to Google Search Console
- **Effort:** 2hr

### CLA-113: Landing Page A/B Test
- Test hero headline variants
- Test CTA copy ("Comparar proposta" vs "Descubra quanto vale")
- **Effort:** 1hr setup + ongoing monitoring

---

## Infrastructure / Ops

### CLA-114: Error Monitoring
- Add Sentry or similar for JS error tracking
- **Effort:** 1hr

### CLA-115: Uptime Monitoring
- Set up UptimeRobot or Better Stack for cltxpj.app.br
- **Effort:** 30min

### CLA-116: CI/CD Pipeline
- GitHub Actions for lint + test on PR
- Auto-deploy to Netlify on main merge
- **Effort:** 2hr

---

## Technical Debt

### CLA-117: Tax Engine Test Coverage
- Add integration tests comparing web vs iOS calculations
- Test edge cases: salary = 0, very high salary, MEI limit boundary
- **Effort:** 2hr

### CLA-118: Remove Tailwind CDN for Production
- Replace CDN Tailwind with compiled CSS for production
- Add build step (Vite or esbuild)
- **Effort:** 4hr

### CLA-119: Archive Duplicate Legacy Files
- Clean up `archive/web-legacy/` references
- Consolidate brand assets
- **Effort:** 1hr
