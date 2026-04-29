# Design System Specification: The Fiscal Architect

## 1. Overview & Creative North Star
The financial landscape in Brazil—specifically the transition between CLT and PJ—is often viewed as a dense thicket of bureaucracy. This design system is not a calculator; it is an architectural tool. 

**Creative North Star: "The Fiscal Architect"**
We aim to move beyond the "spreadsheet" aesthetic of traditional fintech. This system employs an editorial, high-end approach that favors spatial intelligence over rigid grids. By utilizing intentional asymmetry, oversized numerical displays, and overlapping tonal layers, we create a sense of authoritative calm. We don't just show data; we frame it as a premium consulting experience.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in a rich, deep gold (`#a67610`) as the primary and a warm, inviting beige (`#c49b6c`) as the secondary. An accent of a serene blue (`#6090d3`) and a soft, neutral gray (`#dae1eb`) complete the sophisticated palette. These are not just colors; they are signals of stability and opportunity.

### The "No-Line" Rule
To achieve a signature, high-end look, **1px solid borders are strictly prohibited** for sectioning. Structural boundaries must be defined through background color shifts or subtle tonal transitions.
- **Surface Nesting:** Use `surface_container_lowest` for the base page. Place calculation modules on `surface_container_low`. Use `surface_container_highest` for the final result output. This "nested" depth mimics physical layers of fine paper.
- **Glassmorphism:** For floating summary bars or mobile navigation, use semi-transparent `surface_variant` (60% opacity) with a `24px` backdrop blur. This allows the complex data below to "bleed" through softly, creating an integrated, modern feel.
- **Signature Gradients:** Main Action buttons (CTAs) should utilize a subtle linear gradient from `primary` (#a67610) to `primary_container` (#d2a74c) at a 135-degree angle. This provides a tactile "soul" to the digital interface.

---

## 3. Typography: Editorial Authority
We utilize **Inter** exclusively. The weight is our primary tool for hierarchy.

- **The Hero Data (Display-LG):** Used for the final "Net Salary" or "Tax Savings" figure. This is the "hook" of the page. It should feel massive, undeniable, and centered.
- **The Context (Headline-SM):** Used for section headers (e.g., "Deduções de Imposto").
- **The Narrative (Body-LG):** Used for explanatory text. We treat fiscal advice like an editorial column—generous line-height (1.6) and restricted line-lengths for maximum readability.
- **Numerical Clarity:** For all calculator inputs and outputs, ensure the font-variant-numeric is set to `tabular-nums` to ensure columns of figures align perfectly.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often messy. In this design system, we convey hierarchy through **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by stacking the `surface-container` tiers. A `surface_container_lowest` card sitting on a `surface_container_low` section creates a natural, soft lift.
- **Ambient Shadows:** When a "floating" effect is required (e.g., a modal or a primary result card), use an extra-diffused shadow. 
    - **Blur:** 40px
    - **Color:** `on_surface` (#0D1C2D) at 6% opacity. 
    - This mimics natural ambient light rather than a harsh digital shadow.
- **The Ghost Border Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Input Fields
- **Style:** No borders. Use `surface_container_high` as the background fill.
- **Interaction:** On focus, the background transitions to `surface_bright`, and a 2px `secondary` (#c49b6c) indicator appears only at the bottom of the field.
- **Typography:** Labels use `label-md` in `on_surface_variant`.

### Primary Buttons
- **Shape:** `xl` (0.75rem) roundedness for a modern, approachable feel.
- **Style:** Gradient fill (Primary to Primary Container).
- **Typography:** `title-sm`, uppercase with 0.05em letter spacing for a "button-as-badge" editorial look.

### Cards & Result Lists
- **Rule:** Forbid the use of divider lines. 
- **Separation:** Use vertical white space (32px or 48px) and subtle shifts between `surface_container_low` and `surface_container_highest` to separate CLT inputs from PJ outputs.
- **Visual Interest:** Use the `secondary` color (#c49b6c) as a small vertical "accent bar" (4px width) on the left side of the most favorable financial option to draw the eye immediately.

### Accented Comparison Chips
- **CLT Chips:** Use `primary_fixed` backgrounds with `on_primary_fixed` text.
- **PJ Chips:** Use `secondary_fixed` backgrounds with `on_secondary_fixed` text.
- This creates a clear mental model: Deep Gold = Traditional/CLT; Vibrant Beige = Entrepreneurial/PJ.

---

## 6. Do's and Don'ts

### Do
- **Do** use generous white space. If a layout feels "full," increase the padding by 1.5x.
- **Do** use asymmetric layouts. For example, place the input labels on the left and the input fields offset to the right to create a sophisticated, non-linear flow.
- **Do** use the `secondary` color (#c49b6c) sparingly—it is a scalpel, not a sledgehammer. Use it only for critical "win" states or primary CTAs.

### Don't
- **Don't** use 1px solid dividers. If you need to separate content, use a background color change.
- **Don't** use pure black for text. Always use `on_surface` (#0D1C2D) to maintain a premium, ink-on-paper feel.
- **Don't** use standard "Success Green" for financial gains. Use the brand's Beige or a tinted `tertiary` blue to maintain the sophisticated "Architect" palette.
- **Don't** use sharp corners. Stick to the `lg` (0.5rem) and `xl` (0.75rem) roundedness scale to keep the professional tone "human."