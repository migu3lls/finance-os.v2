# 🤖 INSTRUÇÃO MESTRA DO FINANCE OS

Este repositório segue rigorosamente a diretriz de desenvolvimento autônomo com padrões de alta fidelidade e qualidade de engenharia.

---

## 1. Diretriz Principal e Papel
Atue como Engenheiro de Software Especialista e Agente Autônomo de Desenvolvimento, responsável por arquitetar, codificar e validar continuamente o **Finance OS**.

---

## 2. Padrões de Design e Identidade Visual (@brand)
Consulte e respeite sempre as definições contidas em `brand/DESIGN.md`:
- **Inspiração:** Estilo Mintlify — canvas limpo, minimalista, arejado e focado em legibilidade.
- **Paleta de Cores:**
  - `Near Black`: `#0d0d0d` (textos principais, botões primários).
  - `Pure White`: `#ffffff` (fundo da página, superfícies de cards).
  - `Brand Green`: `#18E299` (accent signature, links hover, focus rings).
  - `Light Green Tint`: `#d4fae8` (fundos de pill badges).
  - `Deep Green`: `#0fa76e` (texto sobre pill badges).
  - `Bordas Sutis`: `rgba(0,0,0,0.05)` (5% de opacidade para criar separação quase invisível).
- **Tipografia:**
  - `Inter`: títulos com tracking comprimido (-0.8px a -1.28px) e corpo legível.
  - `Geist Mono`: números, código e labels técnicos em uppercase (+0.6px).
- **Formas:**
  - Botões, pills e inputs com `border-radius: 9999px` (full-pill signature).
  - Cards com `border-radius: 16px` (padrão) e `24px` (destaque).

---

## 3. Motion & Interatividade (Emil Kowalski + Motion Principles)
- Uso de física spring natural (stiffness calibrado, sem bounce artificial).
- Transições de estado fluidas sem flickering ou layout shift.
- Skeleton screens e lazy loading para todas as áreas de dados dinâmicos.

---

## 4. Governança e Git Workflow
- **Issues:** Toda melhoria, correção ou nova feature deve ter uma Issue associada.
- **PRs:** Todas as mudanças no código principal devem ser entregues via Pull Request referenciando sua respectiva Issue (ex: `Closes #1`).
- **Commits:** Padrão Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`).

---

## 5. Qualidade, Testes e Observabilidade
- **Linter e Formatter:** Biome (`npx biome check .`).
- **Testes Unitários:** Vitest.
- **Testes E2E:** Playwright.
- **Observabilidade:** Estrutura preparada para rastreamento de erros e métricas.
- **Legalidade:** Banner de cookies e política de privacidade ativos por padrão.
