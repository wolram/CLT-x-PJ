# Canva / Figma Import Guide
# CLT x PJ Social Media Templates

## How to Use This Guide

This document provides all specifications needed to recreate the CLT x PJ social media templates in Canva or Figma. The HTML templates in this directory serve as visual references.

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--clt-x-pj-primary-bg` | `#0a0a0f` | Main background |
| `--clt-x-pj-secondary-bg` | `#14141a` | Secondary background |
| `--clt-x-pj-tertiary-bg` | `#1e1e28` | Card/section background |
| `--clt-x-pj-gold` | `#d4a853` | Accent, CTA, highlights |
| `--clt-x-pj-gold-light` | `#e8c878` | Light gold variant |
| `--clt-x-pj-gold-dark` | `#b8923f` | Dark gold variant |
| `--clt-x-pj-text-primary` | `#ffffff` | Primary text |
| `--clt-x-pj-text-secondary` | `#b0b0bc` | Secondary text |
| `--clt-x-pj-text-muted` | `#6e6e7a` | Muted text |
| `--clt-x-pj-border` | `#2a2a36` | Borders |
| `--clt-x-pj-accent-success` | `#34d399` | Success indicators |
| `--clt-x-pj-accent-warning` | `#fbbf24` | Warning indicators |
| `--clt-x-pj-accent-error` | `#f87171` | Error indicators |

## Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headlines | Inter | Bold (700) | 48-80px |
| Body text | Inter | Regular (400) | 22-32px |
| Labels/tags | Inter | Semibold (600) | 18-24px |
| Stats/numbers | JetBrains Mono | Bold (700) | 72-120px |
| CTA text | Inter | Semibold (600) | 24-36px |

## Template Dimensions

| Platform | Format | Width | Height |
|----------|--------|-------|--------|
| Instagram | Post (single) | 1080px | 1080px |
| Instagram | Story | 1080px | 1920px |
| Instagram | Carousel slide | 1080px | 1080px |
| LinkedIn | Post image | 1200px | 627px |
| Twitter/X | Card | 1200px | 675px |
| YouTube | Thumbnail | 1280px | 720px |

## Canva Setup

### Step 1: Create Brand Kit
1. Go to **Brand Kit** in Canva
2. Upload brand colors (hex codes above)
3. Upload Inter and JetBrains Mono fonts
4. Save brand logo files (from `/brand/logos/`)

### Step 2: Create Custom Sizes
1. Click **Create a design** → **Custom size**
2. Enter dimensions from the table above
3. Save as templates

### Step 3: Build Templates
Use the HTML files as visual reference. Key patterns:

- **Dark background**: Use `#0a0a0f` as base
- **Gold accents**: Use `#d4a853` for CTAs, highlights, borders
- **Card depth**: Use `#14141a` or `#1e1e28` for layered elements
- **Text hierarchy**: White → `#b0b0bc` → `#6e6e7a`
- **Borders**: `#2a2a36` with 2-3px weight

### Step 4: Save as Templates
1. Click **⋯** menu on each design
2. Select **Make a copy**
3. Rename with template prefix: `CLT-PJ-[Platform]-[Type]`

## Figma Setup

### Step 1: Create Color Styles
```
Primary BG: #0a0a0f
Secondary BG: #14141a
Tertiary BG: #1e1e28
Gold: #d4a853
Gold Light: #e8c878
Gold Dark: #b8923f
Text Primary: #ffffff
Text Secondary: #b0b0bc
Text Muted: #6e6e7a
Border: #2a2a36
```

### Step 2: Create Text Styles
```
Headline: Inter Bold 64px
Subheadline: Inter Bold 48px
Body: Inter Regular 28px
Label: Inter Semibold 24px
Stat: JetBrains Mono Bold 72px
CTA: Inter Semibold 32px #d4a853
```

### Step 3: Create Components
Build reusable components:
- Logo badge
- CTA button (gold border, gold text)
- Stat block (mono number + label)
- Section label (gold, uppercase, letter-spaced)
- Gold accent line (80×4px)

### Step 4: Frame Templates
Create frames for each platform size and build layouts using components.

## Content Guidelines

### Headlines
- Max 8-10 words per line
- Use line breaks for visual rhythm
- Portuguese only
- Tone: Direto, Calmo, Inteligente

### CTAs (rotate)
1. "Comparar proposta →"
2. "Baixar app"
3. "Saiba mais"
4. "Ver como funciona"

### Stats to Feature
- R$ amounts (CLT vs PJ differences)
- Percentage differences
- Annual savings/costs
- Number of benefits counted

### Do NOT Include
- Sensationalist language
- Crypto/futuristic visuals
- Excessive tax focus (frame as decision clarity)
