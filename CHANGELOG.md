# Changelog

All notable changes to the Cinder and IconForge monorepo packages will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-11-21

### Added

#### Cinder UI (`@tec-triad/cinder-ui`)
- Released foundational React component library built on Cinder Slate design tokens.
- Dual ESM and CommonJS bundles with TypeScript declarations (`tsup`).
- Core primitives:
  - Button family: `CDButton`, `CDIconButton`, `CDButtonGroup`, `CDButtonDropdown`, `CDCopyButton`.
  - Input family: `CDInput`, `CDTextArea`, `CDSelect`, `CDCheckbox`, `CDRadio`, `CDSwitch`, `CDSlider`.
  - Advanced inputs: `CDOTPInput`, `CDPhoneInput`, `CDTimeRangePicker`, `CDColorPickerPro`, `CDAddressAutocomplete`, `CDMultiSelectPro`.
  - Editors: `CDCodeEditor`, `CDJSONEditor`.
  - Display and Feedback: `CDBadge`, `CDTag`, `CDCard`, `CDGlassPanel`, `CDSnippet`, `CDAlert`, `CDToast`, `CDSpinner`, `CDSkeleton`, `CDProgress`.
  - Navigation: `CDNavbar`, `CDSidebar`, `CDTabs`, `CDBreadcrumb`, `CDPagination`, `CDStepper`, `CDFloatButton`.
  - Overlays: `CDModal`, `CDDrawer`, `CDPopover`, `CDTooltip`, `CDDropdown`.
  - Data: `CDTable`, `CDCalendar`, `CDDatePicker`, `CDTimePicker`, `CDChart`.

#### IconForge Vector Ecosystem
- Comprehensive developer-first vector icon library containing over 1,000 vector definitions.
- Six distinct rendering styles across all icons:
  - Outline (clean strokes, uniform optical alignment)
  - Filled (solid shapes for high contrast and small sizes)
  - Duotone (two visual layers with balanced opacity)
  - Multicolor (curated color assignments)
  - Gradient (modern SaaS gradient fills)
  - Rounded (soft curves and friendly geometry)
- `@tec-triad/iconforge-core`: Lightweight keyword search engine, category index, and SVG AST generator.
- `@tec-triad/iconforge-react`: Tree-shakable React icon components with full TypeScript support.
- `@tec-triad/iconforge-svg`: Raw, optimized SVG assets organized by category and style.

#### Documentation Portal (`@cinder-ui/web`)
- Interactive documentation portal built with React, Vite, and React Router.
- Redesigned landing page with senior UX/UI design engineering architecture and modular decomposition (< 500 lines per file).
- Removed all arbitrary background gradients, radial glows, and text gradients in strict compliance with solid Cinder Slate design tokens (`#09090b` obsidian canvas, `#121215` surface, `#3b82f6` primary royal blue, and `#27272a` structural borders).
- Replaced static CSS variable tables with an interactive Custom Theming Engine showcase featuring live brand switcher presets (Violet Nebula, Cinder Slate, Cyber Emerald), live themed preview deck (Stat Tile, Switch, Progress bar, Action Buttons), and exportable CSS snippets harmonized with landing page background tokens.
- Removed `--cinder-bg: #140e0a;` and Sunset Terracotta preset in favor of pure theme-responsive surface and canvas backgrounds (`#fafafa` canvas and `#ffffff` surface in light mode; `#09090b` canvas and `#121215` surface in dark mode).
- Restored engineering background grid (`bg-grid-slate`) across the landing page hero section with soft 5% opacity grid line rendering in light theme.
- Polished typographic hierarchy and breathing room across Value Pillar cards with 48px icon badges, 22px margin-bottom, 18px titles, and 1.65 line-height descriptions.
- Interactive Live Component Deck featuring real-time controls (`Slider`, `Progress`, `Switch`, `Input`, `AvatarGroup`, `Tag`, and simulated asynchronous deploy action with loading spinner) and dual JSX source code view.
- Multi-package manager install snippet switcher supporting `npm`, `pnpm`, `yarn`, and `bun` with dynamic copy feedback.
- 50+ Component Matrix with keyword search filter and 5 design system category pills.
- IconForge vector showcase with responsive 12-icon grid and live style switching (Outline, Filled, Duotone, Rounded).
- Mobile-first responsive optimization with coarse touch target protection (44px) and safe-area insets.
- Resolved React duplicate key warning on `/components/calendar` by uniquely mapping items and routing `CDOutlookCalendar` to `/components/outlook-calendar`.
- Implemented route-level code splitting with `React.lazy()` and Rollup manual chunking across all 55 documentation pages.
- Domain-specific modular stylesheets (`landing.css`, `landing-preview.css`, `landing-matrix.css`, `landing-theming.css`, `landing-mobile.css`).
- Live Icon Explorer studio with search, filter by style and category, customizable colors, and ZIP batch download.
- Interactive component playground with props tables and code snippets.
- Single Page Application routing with GitHub Pages deployment automation.
