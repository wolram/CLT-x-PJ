<div align="center">

# CLTX — PJ Contractor Management Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Swift](https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white)](https://swift.org/)
[![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)

**Full-stack SaaS monorepo for PJ (Pessoa Jurídica) contractor management**

[Link site →](https://cltxpj.app.br)
[Link App iOS →](https://apps.apple.com/br/app/calculadora-clt-x-pj/id6755878441)
</div>

---

## Overview

CLTX is a multi-platform SaaS that covers the full lifecycle of PJ contractor management for Brazilian companies — from onboarding and documentation to CLT vs PJ financial calculations.

## Monorepo Structure

```
apps/
  ios/CalcCLTPJ          # iOS app (SwiftUI)
  android/               # Android app
web/
  cltxpj.app.br          # Landing page + web app (React · Node.js)
creative/
  social-media/          # Marketing assets
archive/                 # Legacy experiments
```

## Key Features

- ✅ CLT × PJ financial comparison engine
- ✅ AI-assisted onboarding and document workflows
- ✅ iOS native app (SwiftUI)
- ✅ Android app
- ✅ Multi-tenant web platform
- ✅ Contractor lifecycle management

## Tech Stack

| Layer | Technology |
|---|---|
| Web Frontend | React · TypeScript · Tailwind CSS |
| Backend | Node.js · TypeScript |
| iOS | Swift · SwiftUI · XcodeGen |
| Android | Android · WebView |
| CI/CD | GitHub Actions |
| Infra | Docker · Vercel |

## Architecture

Multi-platform monorepo — shared business logic across web, iOS, and Android surfaces with a common Node.js API layer.

---

*Part of [Marlow Sousa's portfolio](https://marlow.dev.br) · Built with Claude Code + Cursor*
