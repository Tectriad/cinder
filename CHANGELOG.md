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
- Live Icon Explorer studio with search, filter by style and category, customizable colors, and ZIP batch download.
- Interactive component playground with props tables and code snippets.
- Single Page Application routing with GitHub Pages deployment automation.
