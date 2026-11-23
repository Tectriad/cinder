# Cinder UI & IconForge Monorepo

> High-performance React component library and vector icon ecosystem built for velocity, strict accessibility, and token-driven design in Cinder Slate.

## Overview

Cinder is an open-source design engineering monorepo containing two core pillars:

1. **`@tec-triad/cinder-ui`**: A foundational React component library built on headless primitives, strict polymorphic TypeScript typing, and token-driven design.
2. **IconForge Vector Ecosystem**: Over 1,000 developer-first vector icons rendered across 6 distinct visual styles (Outline, Filled, Duotone, Multicolor, Gradient, and Rounded).
   - **`@tec-triad/iconforge-core`**: Core vector registry, search algorithm, and SVG string generation.
   - **`@tec-triad/iconforge-react`**: Tree-shakable React icon components.
   - **`@tec-triad/iconforge-svg`**: Framework-agnostic raw SVG assets.

Documentation Portal: [https://tectriad.github.io/cinder/](https://tectriad.github.io/cinder/)

---

## Monorepo Packages

| Package | Version | Description |
| :--- | :--- | :--- |
| [`@tec-triad/cinder-ui`](packages/cinder) | `0.1.0` | Accessible React UI component library with Cinder Slate tokens |
| [`@tec-triad/iconforge-core`](packages/iconforge-core) | `0.1.0` | Vector icon registry, geometry generators, and search engine |
| [`@tec-triad/iconforge-react`](packages/iconforge-react) | `0.1.0` | Tree-shakable React icon components across 6 visual styles |
| [`@tec-triad/iconforge-svg`](packages/iconforge-svg) | `0.1.0` | Framework-agnostic raw SVG vector icon assets |
| [`@cinder-ui/web`](apps/web) | Private | Interactive documentation portal and Icon Explorer studio |

---

## Installation

### Cinder UI Components

```bash
npm install @tec-triad/cinder-ui
```

### IconForge React Icons

```bash
npm install @tec-triad/iconforge-react @tec-triad/iconforge-core
```

### Raw SVG Assets

```bash
npm install @tec-triad/iconforge-svg
```

---

## Quick Start

### 1. Using Cinder UI Components

```tsx
import React from "react";
import { ThemeProvider, Button, Card, Badge, Input } from "@tec-triad/cinder-ui";
import "@tec-triad/cinder-ui/styles.css";

export function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultMode="dark">
      <Card>
        <Badge variant="primary">New Release</Badge>
        <Input placeholder="Enter username..." />
        <Button variant="primary">Submit</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### 2. Using IconForge React Icons

```tsx
import React from "react";
import { IconSearch, IconHeart, IconShield, IconSparkles } from "@tec-triad/iconforge-react";

export function IconShowcase(): React.JSX.Element {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      {/* Outline (Default) */}
      <IconSearch size={24} color="#3b82f6" strokeWidth={2} />

      {/* Filled */}
      <IconHeart size={24} variant="filled" color="#ef4444" />

      {/* Duotone */}
      <IconShield size={24} variant="duotone" color="#10b981" secondaryColor="#6ee7b7" />

      {/* Gradient */}
      <IconSparkles size={24} variant="gradient" />
    </div>
  );
}
```

---

## Design System Tokens: Cinder Slate

Cinder Slate provides dark (default) and light themes with consistent semantic tokens:

| Token | Semantic Role | Dark Value | Light Value |
| :--- | :--- | :--- | :--- |
| `--cinder-bg` | Canvas Background | `#09090b` | `#fafafa` |
| `--cinder-surface` | Elevated Surface | `#121215` | `#ffffff` |
| `--cinder-surface-hover` | Hover Surface | `#1a1a1f` | `#f4f4f5` |
| `--cinder-border` | Subtle Border | `#27272a` | `#e4e4e7` |
| `--cinder-primary` | Brand Action | `#3b82f6` | `#2563eb` |
| `--cinder-primary-hover` | Action Hover | `#2563eb` | `#1d4ed8` |
| `--cinder-text` | Primary Text | `#fafafa` | `#09090b` |
| `--cinder-muted` | Muted Text | `#a1a1aa` | `#71717a` |

---

## Local Development

```bash
# Install all dependencies across monorepo workspaces
npm install

# Start documentation showcase and Icon Explorer
npm run dev

# Build all packages in topological order
npm run build:packages

# Typecheck all workspaces
npm run typecheck

# Full monorepo production build
npm run build
```

---

## Repository Structure

```
cinder/
├── packages/
│   ├── cinder/             # @tec-triad/cinder-ui (React UI Components)
│   ├── iconforge-core/     # @tec-triad/iconforge-core (Vector Engine)
│   ├── iconforge-react/    # @tec-triad/iconforge-react (React Icons)
│   └── iconforge-svg/      # @tec-triad/iconforge-svg (Raw SVG Vectors)
├── apps/
│   └── web/                # Documentation site & Icon Explorer
├── CONTRIBUTING.md         # Contribution guidelines
├── CODE_OF_CONDUCT.md      # Community code of conduct
├── SECURITY.md             # Vulnerability disclosure policy
├── CHANGELOG.md            # Version history
└── LICENSE                 # MIT License
```

---

## License

This project is licensed under the [MIT License](LICENSE).
