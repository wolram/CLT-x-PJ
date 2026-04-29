---
name: multi-folder-rebuilder
description: "Use when: user has many separate folders/files with mixed extensions and wants the agent to identify each part, rebuild a clean project structure, and deliver a working final product. Keywords: reorganize project, merge folders, restructure codebase, rebuild architecture, consolidate files, mixed extensions, recover project, ship final product. PT-BR: reorganizar projeto, juntar pastas, reestruturar código, reconstruir arquitetura, consolidar arquivos, extensões mistas, recuperar projeto, entregar produto final, várias pastas, pastas separadas, reorganizar repositório, restructurar projeto."
---

# Multi Folder Rebuilder

## Goal
Transform a fragmented workspace (many folders, mixed file types, duplicated artifacts, disconnected modules) into a clean, runnable, and validated final project.

## Use When
- The user provides multiple folders with different technologies.
- The project has mixed extensions (`.html`, `.tsx`, `.js`, `.css`, `.json`, assets, docs, configs).
- The user wants one coherent deliverable instead of scattered files.
- There is a redesign, migration, or consolidation effort.

## Inputs Expected
- One workspace root containing source folders/files.
- Existing app variants, prototypes, or legacy snapshots.
- Optional design docs (`DESIGN.md`, mockups, screenshots, notes).

## Execution Workflow
1. Inventory and classify files
- List all folders/files in the workspace root.
- Group by extension and purpose (app code, config, asset, docs, temporary).
- Detect candidate entry points and framework markers (`package.json`, framework config files).

2. Understand each folder's role
- Read representative files from each folder.
- Identify what each variant does (landing, dashboard, calculator, educational pages, etc.).
- Detect overlap, conflicts, and duplicated responsibilities.

3. Define target architecture
- Choose a single canonical structure for delivery.
- Keep the active framework layout as the source of truth when available.
- Map legacy/prototype files to one of: migrate, archive, or discard.

4. Recreate the folder structure
- Create missing folders for the target architecture.
- Move or rewrite files into the canonical structure.
- Preserve naming consistency and predictable routing/module boundaries.

5. Integrate and normalize code
- Unify components, styles, and shared utilities.
- Remove dead code, stale pages, and redundant copies.
- Ensure imports, paths, and configs are consistent.

6. Validate the delivery
- Install dependencies if needed.
- Run lint/build/typecheck/test commands when available.
- Fix issues introduced during restructure.

7. Deliver the product
- Provide summary of migrated files and structural decisions.
- Report what was preserved, merged, deprecated, or excluded.
- Confirm runnable status and remaining gaps, if any.

## Decision Rules
- Prefer the framework app (for example, the Next.js app directory) over standalone HTML prototypes unless user asks otherwise.
- Keep user-facing behavior stable while improving structure.
- Avoid destructive deletion until replacement is confirmed.
- Do not revert unrelated user changes.

## Output Contract
Return:
1. Final folder architecture used for delivery.
2. Key migration decisions and rationale.
3. Validation results (what passed/failed).
4. Next recommended actions (if any).

## Quality Checklist
- A clear canonical app entry point exists.
- No broken imports after moving files.
- Duplicate pages/components are consolidated.
- Build/dev command runs successfully (or blockers explicitly documented).
- The user gets one coherent final product, not fragmented artifacts.

## Bundled Assets
This skill includes an executor reference with concrete shell commands for each step.
Load [EXECUTOR.md](./EXECUTOR.md) when running terminal commands during the workflow.
