# Multi Folder Rebuilder — Executor Reference

Concrete commands for each workflow step. Run these in the terminal inside the workspace root.

---

## Step 1 — Inventory and classify files

```bash
# Full recursive tree (ignore node_modules, .git)
find . -not \( -path '*/node_modules/*' -o -path '*/.git/*' -o -path '*/.turbo/*' \) | sort

# Count files by extension
find . -not \( -path '*/node_modules/*' -o -path '*/.git/*' \) -type f \
  | sed 's/.*\.//' | sort | uniq -c | sort -rn

# Detect framework markers
find . -name "package.json" -not -path '*/node_modules/*'
find . -name "next.config.*" -o -name "vite.config.*" -o -name "astro.config.*" \
       -o -name "nuxt.config.*" -o -name "remix.config.*" 2>/dev/null
```

---

## Step 2 — Understand each folder's role

```bash
# Preview each top-level folder's content (first 2 levels)
find . -maxdepth 2 -not \( -path '*/node_modules/*' -o -path '*/.git/*' \) | sort

# Read a framework package.json to detect stack
cat apps/web/package.json 2>/dev/null || cat package.json

# Grep for page/route definitions across all HTML or TSX files
grep -rl "export default\|<!DOCTYPE html" --include="*.html" --include="*.tsx" .
```

---

## Step 3 — Define target architecture

```bash
# Check existing route structure inside Next.js app dir
find apps/web/app -type f | sort

# List currently implemented pages/routes
find . -path '*/app/**/*.tsx' -not -path '*/node_modules/*' | sort
find . -name "*.html" -not -path '*/node_modules/*' | sort
```

---

## Step 4 — Recreate the folder structure

```bash
# Create missing route directories (adapt as needed)
mkdir -p apps/web/app/{landing,dashboard,calculator,education,blog}

# Move a standalone HTML prototype into the app as reference
cp landing_page_reimagined.html apps/web/app/landing/_reference.html

# Bulk move assets
find . -maxdepth 1 -name "*.png" -o -name "*.svg" -o -name "*.jpg" \
  | xargs -I{} mv {} apps/web/public/
```

---

## Step 5 — Integrate and normalize code

```bash
# Find duplicate component names across the project
find . -name "*.tsx" -not -path '*/node_modules/*' \
  | xargs -I{} basename {} .tsx | sort | uniq -d

# Check for broken local imports (references to non-existent paths)
grep -r "from '\.\." --include="*.tsx" --include="*.ts" . \
  | grep -v node_modules

# Enforce consistent import style (detect default vs named)
grep -r "^import " --include="*.tsx" apps/web/components/ | head -30
```

---

## Step 6 — Validate the delivery

```bash
# Install dependencies
npm install

# Type-check
npx tsc --noEmit

# Lint
npm run lint 2>/dev/null || npx eslint apps/web --ext .ts,.tsx

# Build
npm run build

# Dev server (async, check for errors in output)
npm run dev
```

---

## Step 7 — Deliver the product

```bash
# Final structure snapshot (for summary report)
find apps/web -not -path '*/node_modules/*' -not -path '*/.next/*' -type f | sort

# Count lines of code delivered
find apps/web -name "*.tsx" -o -name "*.ts" -o -name "*.css" \
  | grep -v node_modules | xargs wc -l | tail -1

# Git status — confirm everything tracked (if using version control)
git status --short
git diff --stat HEAD
```

---

## Error Recovery Patterns

| Symptom | Command |
|---------|---------|
| Module not found | `grep -r "cannot find module" --include="*.log"` or re-run `npm install` |
| Broken import after move | `grep -rn "from '.*<old-path>" --include="*.tsx" .` then replace path |
| Build fails on missing env | `cp apps/web/.env.example apps/web/.env.local` |
| TypeScript errors after merge | `npx tsc --noEmit 2>&1 \| head -40` to triage |
| Port conflict on dev | `lsof -i :3000` then `kill -9 <PID>` |
