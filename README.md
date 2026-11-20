# Cinder — React Component Library & Showcase Monorepo

> A high-craft, accessible React component library built on headless primitives, strict polymorphic TypeScript types, and token-driven design.

---

## Monorepo Architecture

```
cinder/
├── packages/
│   └── cinder/                 # @cinder-ui/core: Component library package
│       ├── src/
│       │   ├── index.ts        # Main library entry point
│       │   ├── types/          # Polymorphic props, sizes, intents, variants
│       │   ├── tokens/         # Design token schema contracts & CSS variable utilities
│       │   ├── theme/          # ThemeProvider & reactive theme context
│       │   ├── components/     # Grouped component folders
│       │   │   ├── button/     # CDButton, CDIconButton, CDButtonGroup, CDButtonDropdown, CDCopyButton
│       │   │   ├── input/      # CDInput
│       │   │   ├── badge/      # CDBadge
│       │   │   ├── card/       # CDCard, CDCardHeader, CDCardTitle, CDCardDescription, etc.
│       │   │   ├── glass-panel/# CDGlassPanel
│       │   │   └── snippet/    # CDSnippet
│       │   ├── styles/         # Modular CSS (< 500 lines per module)
│       │   │   ├── tokens.css  # Dark & light theme variables
│       │   │   ├── buttons.css # Button family styles
│       │   │   ├── input.css   # Input styles
│       │   │   └── display.css # Badge, Card, GlassPanel, Snippet styles
│       │   └── utils/          # Class merging and styling utilities
│       ├── tsup.config.ts      # Dual ESM/CJS build pipeline with .d.ts generation
│       └── package.json
└── apps/
    └── web/                    # @cinder-ui/web: Ant Design style documentation portal
        ├── src/
        │   ├── components/     # Documentation widgets (DemoCard, ApiTable, TokensTable)
        │   ├── pages/          # Ant Design style documentation pages
        │   ├── layouts/        # Ant Design documentation layout & multi-library switcher
        │   ├── styles/         # Modular CSS (< 500 lines per module)
        │   │   ├── base.css    # Typography, reset, atmosphere
        │   │   ├── landing.css # Landing page sections
        │   │   ├── docs-layout.css # Sidebar, topnav, switcher
        │   │   └── docs-demos.css  # Interactive demo cards, API tables
        │   ├── App.tsx         # Route tree powered by React Router v7
        │   └── index.css       # Master stylesheet imports
        ├── vite.config.ts      # Vite dev server & build pipeline
        └── package.json
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Documentation Portal
```bash
npm run dev
```
Runs the Vite development server on `http://localhost:3000`.

### 3. Build the Library Bundle
```bash
npm run build:lib
```
Compiles `@cinder-ui/core` into `dist/` with:
- `dist/index.js` (ESM)
- `dist/index.cjs` (CommonJS)
- `dist/index.d.ts` (TypeScript types)
- `dist/styles.css` (Bundled CSS)
- `dist/tokens/*`, `dist/theme/*`, and `dist/components/*` modules

---

## Design System: Cinder Slate

The core design palette powering Cinder UI with Dark (default) and Light mode duality:

| Token | Semantic Role | Dark Value | Light Value |
|---|---|---|---|
| `--cinder-bg` | Primary Canvas | `#09090b` | `#fafafa` |
| `--cinder-surface` | Cards & Modals | `#121215` | `#ffffff` |
| `--cinder-surface-hover` | Interactive Hover | `#1a1a1f` | `#f4f4f5` |
| `--cinder-glass` | Frosted Panels | `rgba(18, 18, 21, 0.8)` | `rgba(255, 255, 255, 0.82)` |
| `--cinder-primary` | Primary Action | `#3b82f6` | `#2563eb` |
| `--cinder-primary-hover` | Primary Action Hover | `#2563eb` | `#1d4ed8` |
| `--cinder-border` | Subtle Divider | `#27272a` | `#e4e4e7` |
| `--cinder-text` | Primary Copy | `#fafafa` | `#09090b` |
| `--cinder-muted` | Secondary Copy | `#a1a1aa` | `#71717a` |
| `--cinder-success` | Success | `#34d399` | `#059669` |
| `--cinder-warning` | Warning | `#fbbf24` | `#d97706` |
| `--cinder-danger` | Danger | `#f87171` | `#dc2626` |
