# Cinder UI — Coding Standards & Monorepo Rules

This document specifies the engineering rules and architectural standards governing the Cinder repository.

---

### Rule 1: Maximum File Size (< 500 Lines)
- **Constraint**: No single file in the project may exceed 500 lines of code.
- **Implementation**:
  - Split large component files into smaller sub-components or dedicated custom hooks.
  - Split CSS files into modular sub-sheets (e.g. `tokens.css`, `buttons.css`, `input.css`, `display.css`, `docs-layout.css`, `docs-demos.css`) and assemble them via `@import`.

---

### Rule 2: Strict Explicit Typing
- **Constraint**: Every variable, constant, function parameter, and return value must have an explicit TypeScript type.
- **Prohibited**: Implicit `any`, loose un-typed object parameters, untyped `useState` / `useMemo` hooks.
- **Example**:
  ```typescript
  const [activeTab, setActiveTab] = useState<string>("overview");
  const calculatePadding = (size: CDButtonSize): number => { ... };
  ```

---

### Rule 3: Component Folder Encapsulation
- **Constraint**: Every component primitive belongs in its own dedicated folder under `packages/cinder/src/components/<component>/`:
  - `button/`: `CDButton.tsx`, `CDIconButton.tsx`, `CDButtonGroup.tsx`, `CDButtonDropdown.tsx`, `CDCopyButton.tsx`, `types.ts`, `index.ts`
  - `input/`: `CDInput.tsx`, `types.ts`, `index.ts`
  - `badge/`: `CDBadge.tsx`, `types.ts`, `index.ts`
  - `card/`: `CDCard.tsx`, `types.ts`, `index.ts`
  - `glass-panel/`: `CDGlassPanel.tsx`, `types.ts`, `index.ts`
  - `snippet/`: `CDSnippet.tsx`, `types.ts`, `index.ts`
- Every component folder must include a `types.ts` declaring all prop interfaces and an `index.ts` barrel.

---

### Rule 4: Component Naming Convention (`CD` Prefix)
- **Official Name**: All official components are prefixed with `CD`:
  - `CDButton`, `CDIconButton`, `CDButtonGroup`, `CDButtonDropdown`, `CDCopyButton`
  - `CDInput`
  - `CDBadge`
  - `CDCard`, `CDCardHeader`, `CDCardTitle`, `CDCardDescription`, `CDCardContent`, `CDCardFooter`
  - `CDGlassPanel`
  - `CDSnippet`
- **Aliases**: Non-prefixed aliases (`Button = CDButton`) must be exported for backward compatibility.

---

### Rule 5: Zero Emojis
- **Constraint**: Absolutely no emojis in any code, JSX, comments, documentation, or markdown files.
- **Icons**: Use SVG vector icons (`lucide-react` or clean inline SVG elements).

---

### Rule 6: Disciplined Gradients and Theme Consistency
- **Constraint**: Only use gradient colors when explicitly required for component styling or theme accenting (e.g. brand mark or hero text). Never scatter random inline gradients across UI cards or buttons.
- **Design System**: Use Cinder Slate design tokens:
  - Dark: Canvas `#09090b`, Surface `#121215`, Primary Action `#3b82f6`, Hover `#2563eb`, Border `#27272a`.
  - Light: Canvas `#fafafa`, Surface `#ffffff`, Primary Action `#2563eb`, Hover `#1d4ed8`, Border `#e4e4e7`.

---

### Rule 7: Typography
- Font Family: `Plus Jakarta Sans` for UI, headers, and form controls; `JetBrains Mono` for monospace and code.

---

### Rule 8: Zero Chinese Characters
- Strictly English for all comments, documentation, and user-facing text.

---

### Rule 9: Senior UX/UI Engineer Mindset & Implementation Rigor
- **Constraint**: Always think like a senior UX/UI engineer before and during implementation.
- **Principles & Execution**:
  - **Typographic Hierarchy & Layout Balance**: Ensure layouts maintain structured information hierarchy. Avoid horizontal overcrowding in narrow containers (e.g. sidebars or compact cards) that causes awkward wrapping; decompose into clean two-row metadata patterns (Row 1: Primary identifier + right-aligned status badge; Row 2: Secondary category/description with single-line ellipsis).
  - **Elevation & Overflow Protection**: Dropdowns, floating menus, action sheets, and tooltips must never be clipped by parent containers with `overflow: hidden`. Implement React body portals (`createPortal`), elevated z-index tiers (`z-index: 1050`), and auto-flipping edge detection (`placement="bottom"` / `"top"`).
  - **Complete Interactive States**: Every interactive element must provide deliberate styling for all states: default, hover, active (pressed), focus-visible (accessible outline ring), disabled, and loading (layout-stable spinners).
  - **Micro-Animations & Motion**: Transitions should use fluid, high-end bezier curves (e.g. `cubic-bezier(0.16, 1, 0.3, 1)`) with durations between 150ms and 200ms for a snappy, cohesive feel.
  - **Accessibility by Default**: Ensure touch/click targets meet minimum 24-44px targets, keyboard focusability, proper ARIA tags (`aria-expanded`, `aria-haspopup`, `aria-disabled`), and dismiss behaviors (Escape key, outside click).
