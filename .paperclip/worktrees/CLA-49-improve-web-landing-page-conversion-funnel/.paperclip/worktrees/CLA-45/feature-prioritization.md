# Feature Prioritization: Minimum Viable Comparison Flow

## Activation Event
User completes their first full comparison and receives a clear recommendation.

## MVP Comparison Flow (P0 - Must Have)

### 1. CLT Proposal Input
- Salary (bruto CLT)
- Benefits input: VR, VT, health plan, bonus

### 2. PJ Proposal Input  
- Gross invoice value (faturamento bruto)
- Tax regime selection (Simples Nacional / Lucro Presumido / Lucro Real)
- Business expenses (if applicable)

### 3. Calculation Engine
- Net monthly income for CLT (after taxes, including 13th, vacations)
- Net monthly income for PJ (after taxes, considering tax regime)
- Benefits conversion to monthly value for CLT
- Liquidity comparison (CLT receives monthly; PJ has to invoice)

### 4. Comparison Result Display
- Side-by-side net monthly comparison
- Annual total comparison
- Clear winner indicator
- Key differentiators (job security, benefits, taxes)

## P1 Features (Should Have for Launch)
- Basic scenario simulation (e.g., "what if I negotiate 10% more?")
- Save comparison locally (localStorage)

## P2 Features (Nice to Have)
- Export comparison as PDF
- Multiple comparison history
- Detailed tax breakdown explanation

## Current State Assessment

| Component | Status | Notes |
|-----------|--------|-------|
| iOS App (CalcCLTPJ) | Working | SwiftUI calculator exists |
| Android App | Working | React/Vite app exists |
| Web Landing | Working | Static HTML, download CTAs |
| Comparison Logic | Partial | iOS has calculations; need to verify web/Android parity |

## Scope Recommendation for Launch
- **MVP Focus**: Web-based calculator (HTML/JS) accessible from landing page
- **Existing Apps**: Continue directing downloads, but prioritize web parity
- **Target**: 70% completion rate on first comparison attempt

## Next Steps
1. Engineer to build web comparison tool matching iOS functionality
2. Verify tax calculation accuracy across all platforms
3. Test end-to-end flow from landing page → comparison → result