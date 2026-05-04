# iOS App Codebase Audit — CalcCLTPJ

**Date:** 2026-03-31
**App:** Calculadora CLT x PJ (App Store ID: 6755878441)
**Bundle:** com.calccltpj.app
**Version:** 1.0 (build 1)
**Min iOS:** 17.0
**Swift:** 6.0

---

## 1. Current State

### Architecture
- **Pattern:** MVVM with `@Observable` macro (iOS 17+)
- **Persistence:** SwiftData (`Proposal` model)
- **UI:** Pure SwiftUI, no UIKit
- **IAP:** StoreKit 2 with 3-tier subscription (Starter/Growth/Pro)
- **Charts:** Swift Charts for comparison visualization

### File Structure (12 Swift files, ~2,600 lines)

| File | Lines | Purpose |
|------|-------|---------|
| `CalcCLTPJApp.swift` | 19 | App entry point, SwiftData container |
| `ContentView.swift` | 40 | TabView (4 tabs) |
| `Models.swift` | 286 | Data models, tax calculator, benefit templates |
| `ViewModels.swift` | 122 | `CalculatorViewModel` with @Observable |
| `Components.swift` | 230 | Reusable UI components |
| `TestScenarios.swift` | 496 | 16 real-market test scenarios |
| `StoreManager.swift` | 196 | StoreKit 2 subscription management |
| `Views/CalculatorView.swift` | 373 | Main calculator input screen |
| `Views/AnalysisView.swift` | 445 | Results, charts, detailed breakdown |
| `Views/ProposalsView.swift` | 234 | Saved proposals list |
| `Views/SettingsView.swift` | 386 | App settings, benefit management |
| `Views/PaywallView.swift` | 271 | Subscription paywall UI |

### Features Implemented
- CLT calculation (INSS, IRRF, 13th salary, vacation, FGTS, benefits)
- PJ calculation (taxes, accounting cost, extras)
- Annualized comparison (CLT / 12)
- Brazilian tax tables 2024/2025
- Custom benefits/extras management
- Proposal save/load with SwiftData
- 16 pre-built market test scenarios (Google, Meta, Nubank, etc.)
- StoreKit 2 subscriptions (3 tiers)
- Freemium gating (benefit limits, proposal limits, locked analysis)
- Paywall UI with feature comparison
- pt-BR currency formatting throughout

---

## 2. Build Status

### Project Configuration
- **Xcode project:** Single target, no workspace
- **Deployment target:** iOS 17.0 (iPhone + iPad)
- **Development team:** ZTT8S9QUXR
- **Last upgrade check:** 2610 (Xcode 26.1)
- **Frameworks:** StoreKit, SwiftUI, SwiftData, Charts

### Compilation Errors Found

1. **`StoreManager.isPremium` does not exist** (`SettingsView.swift:156`)
   - Code references `storeManager.isPremium` but the property is named `hasActiveSubscription`
   - **Fix:** Replace `storeManager.isPremium` with `storeManager.hasActiveSubscription`

2. **Duplicate `@State` declarations** (`ProposalsView.swift:17-18, 22-24`)
   - `showingDeleteAlert`, `proposalToDelete`, and `showingPaywall` are declared twice
   - **Fix:** Remove duplicate declarations (lines 22-24)

### Warnings

3. **StoreKit framework path is brittle**
   - References hardcoded SDK path
   - Should use SDKROOT relative path

4. **`LastUpgradeCheck = 2610`** — Xcode 26.1 is a future version; may cause issues on current Xcode

---

## 3. Code Quality Assessment

### Strengths
- Clean MVVM separation
- Good use of modern Swift/iOS APIs (@Observable, SwiftData, StoreKit 2)
- Well-structured reusable components
- Comprehensive test scenarios with real market data
- Proper pt-BR localization for currency
- Freemium model well-implemented

### Weaknesses
- **Zero tests** — no unit tests, no UI tests
- **No CI/CD** pipeline
- **No error handling** in critical paths (tax calculations silently fail on edge cases)
- **No analytics** or crash reporting
- **Mixed authorship** — files show different creator names
- **Hardcoded prices** in `SubscriptionTier.priceDescription` that don't match StoreKit config
- **No privacy manifest** (required by Apple as of 2024)
- **No accessibility** labels on custom components

---

## 4. Missing Features vs. MVP Requirements

### Must-Have for MVP

| Feature | Status | Priority |
|---------|--------|----------|
| Fix compilation errors | Broken | Critical |
| Unit tests for tax calculations | Missing | High |
| App Store Connect product configuration | Local only | Critical |
| Privacy manifest (PrivacyInfo.xcprivacy) | Missing | Critical |
| App Privacy nutrition label data | Missing | High |
| App screenshots for App Store | Missing | High |
| Privacy policy URL | Missing | High |
| Terms of use | Missing | Medium |
| Support/contact mechanism | Missing | Medium |
| Crash reporting (e.g., Crashlytics) | Missing | Medium |
| Analytics (e.g., TelemetryDeck) | Missing | Low |

### Nice-to-Have (Post-MVP)

| Feature | Priority |
|---------|----------|
| iPad layout optimization | Medium |
| Dark mode testing | Low |
| Export/share results (PDF) | Medium |
| Widget for quick comparison | Low |
| Android parity | Low |
| Web version integration | Low |

---

## 5. App Store Readiness Checklist

| Item | Status | Notes |
|------|--------|-------|
| App icon | Check needed | Asset exists, needs verification |
| Version/build numbers | Needs update | Both at 1.0/1 — needs incrementing for updates |
| Privacy manifest | Missing | Required by Apple since May 2024 |
| App tracking transparency | OK | Not using tracking frameworks |
| Data types declaration | Missing | Need to declare SwiftData usage |
| App screenshots (5 sizes) | Missing | Not found in repo |
| App preview video | Missing | Optional but recommended |
| Description/keywords | Missing | Not in repo |
| Support URL | Missing | Need to provide |
| Privacy policy URL | Missing | Need to provide |
| Age rating | Missing | Need to complete questionnaire |
| In-App Purchase setup | Missing | Products exist locally only, not in ASC |
| TestFlight beta | Missing | Not configured |
| Review notes | Missing | Need to prepare |

---

## 6. Concrete Task Breakdown

### Phase 1: Fix and Build (Immediate)
1. Fix `SettingsView.swift` — replace `isPremium` with `hasActiveSubscription`
2. Fix `ProposalsView.swift` — remove duplicate `@State` declarations
3. Verify build on current Xcode version
4. Fix StoreKit framework reference

### Phase 2: Testing and Quality
5. Add unit tests for `TaxCalculator` (INSS, IRRF)
6. Add unit tests for `CalculatorLogic` (CLT, PJ calculations)
7. Add unit tests for `CalculatorViewModel`
8. Add basic UI tests for main flow

### Phase 3: App Store Readiness
9. Create `PrivacyInfo.xcprivacy` manifest
10. Prepare App Store screenshots
11. Configure products in App Store Connect
12. Set up support URL and privacy policy
13. Complete App Privacy nutrition label
14. Submit for TestFlight beta review

### Phase 4: Polish
15. Add crash reporting
16. Add analytics
17. Accessibility audit
18. iPad layout review
19. Increment version/build numbers
20. Submit to App Store review

---

## 7. Summary

The iOS app is approximately 85% feature-complete for MVP. The core calculator logic, UI, and monetization are well-implemented. The main blockers are:

1. **Two compilation errors** that prevent building
2. **No tests** — risky for a financial calculator
3. **App Store metadata** not configured
4. **Privacy manifest** missing (Apple requirement)

Estimated effort to ship MVP: 3-5 days of focused work after fixing build issues.
