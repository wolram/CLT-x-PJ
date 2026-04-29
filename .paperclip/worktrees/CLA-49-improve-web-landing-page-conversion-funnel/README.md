# CLT x PJ Product Workspace

Este workspace agora esta organizado por area de produto para facilitar a criacao de um GitHub mais limpo no futuro.

## Estrutura Canonica

```text
apps/
  ios/CalcCLTPJ                  # App iOS principal
  android/app-android-cltxcnpj   # App Android/WebView atual

web/
  cltxpj.app.br                  # Site/landing page principal

creative/
  social-media/current           # Atalho para os criativos atuais

archive/
  web-legacy/05_CLTxPJ_Website   # Versao antiga/duplicada do site
  web-legacy/CalcCLTxCNPJ        # Versao conceitual/rascunho do site
  experiments/cltxcnpjv2         # Experimento antigo
```

## O Que Usar Como Base

- Site principal: `web/cltxpj.app.br`
- App iOS principal: `apps/ios/CalcCLTPJ`
- App Android principal: `apps/android/app-android-cltxcnpj`
- Criativos: `creative/social-media/current`

## Recomendacao Para O Novo GitHub

Se a ideia e ter um GitHub so do produto, a melhor base hoje e:

1. Criar um novo repositorio chamado algo como `cltxpj-product`.
2. Importar primeiro `web/cltxpj.app.br`, `apps/ios/CalcCLTPJ` e `apps/android/app-android-cltxcnpj`.
3. Manter `archive/` fora do novo repo principal ou migrar depois apenas como referencia historica.
4. Usar `creative/` como pasta de apoio de marketing, sem misturar com codigo do app.

## Observacoes

- Existem duplicacoes do site em `archive/web-legacy/`.
- Os criativos atuais continuam fisicamente dentro do repo iOS para preservar o historico ja versionado, e `creative/social-media/current` aponta para esse material.
- Esta pasta raiz ainda nao e um repositorio Git unico. Ela funciona como um hub local para organizar os repos existentes.
