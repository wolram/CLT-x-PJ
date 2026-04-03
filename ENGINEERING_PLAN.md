# CLT x PJ — Engineering Task Breakdown

## Phase 1: Accurate Calculator Engine (Priority: P0)

### T1.1 — Brazilian Tax Table Engine
- [ ] Implement INSS 2026 progressive bracket calculator
- [ ] Implement IRRF 2026 bracket calculator with dependent deductions
- [ ] Implement FGTS calculation (8% of gross, employer contribution)
- [ ] Implement 13th salary calculation
- [ ] Implement vacation + 1/3 constitutional bonus
- [ ] All calculations as pure functions, zero dependencies
- [ ] Unit tests for each tax component
- **File**: `web/cltxpj.app.br/js/tax-engine.js`
- **Tests**: `web/cltxpj.app.br/tests/tax-engine.test.js`
- **Estimate**: 2-3 days

### T1.2 — PJ Tax Regime Engine
- [ ] Simples Nacional — all 5 annexes with correct revenue brackets
- [ ] Lucro Presumido — federal + state + municipal taxes
- [ ] Lucro Real — optional, lower priority
- [ ] MEI regime (if revenue < limit)
- [ ] Accountant cost estimator (R$200-800/mo range)
- [ ] INSS pro-labore calculation for PJ
- **File**: `web/cltxpj.app.br/js/pj-tax-engine.js`
- **Tests**: `web/cltxpj.app.br/tests/pj-tax-engine.test.js`
- **Estimate**: 2-3 days

### T1.3 — Benefits Quantification Panel
- [ ] UI panel for toggling/valuing benefits: VR, VT, health insurance, dental, life insurance, gym, education budget, bonus/PLR, stock options
- [ ] Each benefit has a monthly monetary value
- [ ] Benefits flow into CLT total calculation
- [ ] Default benefit values by seniority level (junior/mid/senior)
- **Files**: `web/cltxpj.app.br/index.html` (new section), `web/cltxpj.app.br/js/benefits-panel.js`
- **Estimate**: 1-2 days

### T1.4 — Verdict & Breakdown Display
- [ ] Replace current simple verdict with detailed breakdown
- [ ] Show: annual net CLT vs annual net PJ, itemized deduction list
- [ ] Visual: side-by-side comparison, waterfall chart or stacked bars
- [ ] "Why CLT wins" / "Why PJ wins" explanation in plain Portuguese
- **Files**: `web/cltxpj.app.br/index.html`, `web/cltxpj.app.br/js/app.js`
- **Estimate**: 1-2 days

### T1.5 — Calculator Unit Tests
- [ ] Test INSS brackets with known values
- [ ] Test IRRF brackets with known values
- [ ] Test full CLT scenario (e.g., R$8k salary → expected annual net)
- [ ] Test full PJ scenario (e.g., R$12k/month Simples Anexo III → expected annual net)
- [ ] Test edge cases: minimum wage, very high salary, zero benefits
- **File**: `web/cltxpj.app.br/tests/calculator.test.js`
- **Estimate**: 1 day

---

## Phase 2: User Flow & Retention (Priority: P0)

### T2.1 — Email Capture Integration
- [ ] Add email input to simulator results section
- [ ] "Send me this comparison" CTA
- [ ] Store email + comparison data in Supabase
- [ ] Integration with Brevo or Resend for email delivery
- [ ] Double opt-in flow (compliance)
- **Files**: `web/cltxpj.app.br/index.html`, `web/cltxpj.app.br/js/email-capture.js`
- **Supabase**: New `email_submissions` table or extend `waitlist_submissions`
- **Estimate**: 1-2 days

### T2.2 — Saved Comparisons
- [ ] Save comparison scenarios to Supabase (anonymous + authenticated)
- [ ] Generate shareable link per comparison
- [ ] "My comparisons" page for returning users
- **Files**: `web/cltxpj.app.br/compare.html`, `web/cltxpj.app.br/js/comparisons.js`
- **Supabase**: New `comparisons` table
- **Estimate**: 2 days

### T2.3 — Supabase Auth (Lightweight)
- [ ] Email/password or magic link auth
- [ ] Protect saved comparisons
- [ ] Optional — can defer if email capture is sufficient for MVP
- **Estimate**: 1 day (if needed)

---

## Phase 3: Polish, Analytics & Ship (Priority: P1)

### T3.1 — Real AI Analysis
- [ ] Configure Gemini API key (server-side, not client-side)
- [ ] Move AI call to Netlify Function or Hostinger serverless to hide API key
- [ ] Prompt engineering for negotiation advice output
- [ ] Rate limiting per IP
- **Files**: `web/cltxpj.app.br/netlify/functions/analyze.js` (or equivalent)
- **Estimate**: 1 day

### T3.2 — Analytics & Telemetry
- [ ] Add PostHog or Plausible for page analytics
- [ ] Track: calculator usage, comparison results (anonymized), email capture rate
- [ ] Funnel: landing → calculator → result → email capture
- **Estimate**: 0.5 days

### T3.3 — SEO Improvements
- [ ] Structured data (JSON-LD) for SoftwareApplication
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Blog articles actually exist (at least 3 real posts)
- [ ] Open Graph images (custom, not Unsplash)
- **Estimate**: 1-2 days

### T3.4 — Mobile UX Polish
- [ ] Test on real Android devices
- [ ] Fix any layout issues on small screens
- [ ] Ensure calculator inputs are usable on mobile keyboards (numeric)
- [ ] Performance: lazy load images, defer non-critical JS
- **Estimate**: 1 day

---

## Phase 4: Monetization Foundation (Priority: P2)

### T4.1 — Premium Tier Design
- [ ] Define what's free vs premium
- [ ] Premium features: advanced scenarios, PDF export, AI negotiation coaching, historical comparisons
- [ ] Pricing page
- **Estimate**: TBD after CEO input

### T4.2 — Payment Integration
- [ ] Stripe or Mercado Pago for Brazilian payments
- [ ] Subscription management
- [ ] Receipt/invoice generation
- **Estimate**: 3-5 days

---

## Infrastructure & DevOps

### T5.1 — CI/CD Review
- [ ] Verify current GitHub Actions → Hostinger deploy works
- [ ] Add test step to CI
- [ ] Add build step for admin dashboard
- **File**: `.github/workflows/deploy.yml`
- **Estimate**: 0.5 days

### T5.2 — Error Monitoring
- [ ] Add Sentry or similar for frontend error tracking
- **Estimate**: 0.5 days

### T5.3 — Domain & SSL
- [ ] Confirm `cltxpj.app.br` DNS and SSL are working
- [ ] Redirect `calculadoracltpj.com.br` → `cltxpj.app.br` (or vice versa)
- **Estimate**: 0.5 days

---

## Deferred / Post-MVP

- [ ] Android native app (or evaluate PWA as alternative)
- [ ] Recruiter/company dashboard
- [ ] Multi-offer comparison (3+ offers)
- [ ] Salary benchmarking database
- [ ] Content/blog CMS
- [ ] Referral program
- [ ] API for third-party integrations

---

## Summary

| Phase | Tasks | Estimated Days | Priority |
|-------|-------|---------------|----------|
| 1 — Calculator | T1.1-T1.5 | 7-11 days | P0 |
| 2 — Retention | T2.1-T2.3 | 4-5 days | P0 |
| 3 — Polish | T3.1-T3.4 | 3-5 days | P1 |
| 4 — Monetization | T4.1-T4.2 | TBD | P2 |
| Infra | T5.1-T5.3 | 1.5 days | P1 |

**Total MVP (Phases 1-3 + Infra)**: ~15-22 engineering days

---

## Dependencies & Blockers

| Blocker | Owner | Impact |
|---------|-------|--------|
| Gemini API key | CEO | AI analysis feature blocked |
| Email service decision (Resend vs Brevo) | CEO | Email capture blocked |
| Primary domain decision | CEO | SEO and redirect strategy |
| Monetization timeline | CEO | Affects Phase 4 priority |
| Android strategy (native vs PWA) | CEO | Resource allocation |
| 2026 tax table confirmation | Engineering + Research | Calculator accuracy |
