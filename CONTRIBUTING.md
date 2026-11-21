# Contributing to Cinder & IconForge

Thank you for your interest in contributing to Cinder and IconForge. We welcome contributions from developers, designers, and open-source enthusiasts.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before submitting any issues or pull requests.

---

## Architecture and Coding Guidelines

All contributors must adhere to the following project standards:

### 1. Maximum File Size Limit (Strict 500 Lines)
- No single source file (`.ts`, `.tsx`, `.css`, `.js`, `.md`) may exceed 500 lines of code.
- Decompose large modules into focused sub-components, utility functions, or domain-specific stylesheets.

### 2. Strict TypeScript Typing
- Explicit typing is mandatory on all variables, constants, function arguments, return types, and hook state.
- Untyped variables or implicit `any` are strictly prohibited.
- Export corresponding prop interfaces for every component (e.g. `CDButtonProps`).

### 3. Component Architecture and Naming Convention
- Every component lives in its dedicated folder under `packages/cinder/src/components/<component-name>/`.
- Official components must use the `CD` prefix (e.g. `CDButton`, `CDInput`, `CDCard`).
- Backward-compatible non-prefixed aliases must be exported (e.g. `export const Button = CDButton;`).
- Each component directory must include a `types.ts` and `index.ts` barrel export.

### 4. Zero Emojis Policy
- Emojis are strictly prohibited anywhere in the codebase, including JSX templates, code comments, documentation files, commit messages, and issues.
- Use vector SVG icons (`lucide-react` or clean inline SVG paths) instead of emojis.

### 5. Semantic Tokens and Typography
- Follow the Cinder Slate design token architecture.
- Do not apply random inline gradients.
- Typography: Primary interface font is Plus Jakarta Sans; monospace font is JetBrains Mono.

### 6. English Only
- All documentation, comments, and user-facing text must be strictly in English.

---

## Development Workflow

### 1. Prerequisites
- Node.js version 18.0.0 or higher.
- npm version 9.0.0 or higher.

### 2. Fork and Clone
```bash
git clone https://github.com/<your-username>/cinder.git
cd cinder
git checkout -b feature/my-feature-name
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Local Development
```bash
npm run dev
```
Open `http://localhost:3000` to preview your changes against the documentation portal and component showcase.

### 5. Verify Builds and Typechecks
Before submitting a pull request, verify that all workspaces pass linting, compilation, and type checking:
```bash
npm run build:packages
npm run typecheck
npm run build
```

---

## Pull Request Guidelines

1. Create focused pull requests addressing a single bug, component, or feature.
2. Provide a clear description of the problem solved and the implementation approach.
3. Ensure no files exceed 500 lines.
4. Ensure zero emojis are introduced.
5. All CI checks must pass before a pull request can be merged.

---

## Community and Questions

If you have questions about design choices or implementation architecture, open an issue on GitHub or reach out via our community discussions.
