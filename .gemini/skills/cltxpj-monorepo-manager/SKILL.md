---
name: cltxpj-monorepo-manager
description: Gerencia e coordena o monorepo CLT x PJ, incluindo o deploy multi-versão (Vercel para Next.js e GitHub Pages para legados/estáticos). Use para organizar novas versões, atualizar o workflow de deploy ou integrar novos repositórios de CLT/PJ ao ecossistema consolidado.
---

# CLT x PJ Monorepo Manager

Este skill fornece diretrizes para gerenciar o ecossistema consolidado do CLT x PJ.

## Estrutura do Monorepo

- **/apps**: Aplicativos nativos (iOS/Android).
- **/web/redesign**: Versão principal (Next.js) - Deploy via Vercel.
- **/web/cltxpj.app.br**: Site de produção atual (Estático).
- **/web/nova-clt-x-pj**: Versão "NOVA" integrada.
- **/archive**: Versões legadas e experimentos.

## Workflows de Deploy

### 1. Vercel (Produção/Redesign)
Configurado via `vercel.json` na raiz. O root directory deve apontar para `web/redesign`.

### 2. GitHub Pages (Arquivo/Legados)
Configurado via `.github/workflows/gh-pages.yml`.
- **Raiz (/)**: Site atual (`web/cltxpj.app.br`).
- **/legacy-calc**: Calculadora antiga (`archive/web-legacy/CalcCLTxCNPJ`).
- **/exp-v2**: Experimento v2 (`archive/experiments/cltxcnpjv2`).
- **/nova**: Versão integrada de `web/nova-clt-x-pj`.

## Procedimentos Comuns

### Integrar novo Repositório
1. Clonar o repo em uma pasta temporária.
2. Mover arquivos para a pasta destino (`web/`, `apps/` ou `archive/`).
3. Remover a pasta `.git` interna.
4. Atualizar o `gh-pages.yml` se for uma versão estática.

### Atualizar o Site de Produção
Sempre que houver mudanças em `web/cltxpj.app.br`, o GitHub Actions fará o deploy automático para a raiz do GH Pages.
