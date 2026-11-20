# Cinder UI — AI Agent Guidelines & Architecture Rules

This file outlines the mandatory architectural and coding rules for all AI assistants and contributors working on the Cinder monorepo.

---

## 1. Maximum File Size Limit (Strict 500 Lines)
- **Hard Rule**: No single source file (`.ts`, `.tsx`, `.css`, `.js`, `.md`) may exceed **500 lines of code**.
- **Action Required**: When a file grows beyond 350-400 lines, immediately plan its decomposition. Split large components into smaller sub-components, helper files, or hooks. Split stylesheets into domain-specific modules (`tokens.css`, `buttons.css`, `input.css`, `display.css`, etc.) and import them into a master stylesheet.

---

## 2. Strict TypeScript Typing on All Variables
- **Explicit Types Everywhere**: Every variable, constant, function argument, function return value, and React hook state must be explicitly typed.
- **No Implicit Any**: Never use untyped parameters or variables.
  ```typescript
  // Bad:
  const [open, setOpen] = useState(false);
  const handleClick = (e) => { ... };

  // Good:
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => { ... };
  ```
- **Exported Prop Types**: Every component must export its corresponding Props interface (e.g., `CDButtonProps`, `CDInputProps`).

---

## 3. Component Folder Grouping Architecture
- **Dedicated Folders**: All related component files must be encapsulated in their own dedicated directory under `packages/cinder/src/components/<component-name>/`.
  - All Button primitives reside in `src/components/button/`:
    - `CDButton.tsx`
    - `CDIconButton.tsx`
    - `CDButtonGroup.tsx`
    - `CDButtonDropdown.tsx`
    - `CDCopyButton.tsx`
    - `types.ts`
    - `index.ts`
  - Input primitives reside in `src/components/input/`
  - Badge primitives reside in `src/components/badge/`
  - Card primitives reside in `src/components/card/`
  - GlassPanel primitives reside in `src/components/glass-panel/`
  - Snippet primitives reside in `src/components/snippet/`
- Every component folder must include a `types.ts` and an `index.ts` barrel.

---

## 4. Component Naming Convention (`CD` Prefix)
- **Primary Name**: All official components must be named with the `CD` prefix:
  - `CDButton`, `CDIconButton`, `CDButtonGroup`, `CDButtonDropdown`, `CDCopyButton`
  - `CDInput`
  - `CDBadge`
  - `CDCard`, `CDCardHeader`, `CDCardTitle`, `CDCardDescription`, `CDCardContent`, `CDCardFooter`
  - `CDGlassPanel`
  - `CDSnippet`
- **Backward-Compatible Aliases**: Each component file must also export the non-prefixed alias:
  ```typescript
  export const Button = CDButton;
  export const Input = CDInput;
  export const Badge = CDBadge;
  export const Card = CDCard;
  ```

---

## 5. Zero Emojis Across Entire Project
- **Zero Tolerance**: Emojis are strictly prohibited anywhere in the codebase, including:
  - Component JSX and templates
  - Code comments and JSDoc annotations
  - Documentation files, markdown files, and commit messages
  - Landing pages, buttons, and alert cards
- **Icons**: Always use vector SVG icons (e.g. `lucide-react` or clean inline SVG paths) instead of emojis.

---

## 6. Disciplined Gradient Colors
- **Purposeful Gradients Only**: Gradients may only be applied when explicitly required for component styling or theme accenting (e.g. brand mark or hero text).
- **No Arbitrary Inline Gradients**: Do not scatter random gradients across cards or buttons. Always adhere to Cinder Slate semantic design tokens.

---

## 7. Design System & Typography
- **Design Tokens**: Adhere strictly to **Cinder Slate** with both Dark (default) and Light mode support:
  - Dark: Canvas `#09090b`, Surface `#121215`, Primary `#3b82f6`, Hover `#2563eb`, Border `#27272a`, Text `#fafafa`, Muted `#a1a1aa`.
  - Light: Canvas `#fafafa`, Surface `#ffffff`, Primary `#2563eb`, Hover `#1d4ed8`, Border `#e4e4e7`, Text `#09090b`, Muted `#71717a`.
- **Typography**: Global UI font is **Plus Jakarta Sans**. Monospace font is **JetBrains Mono**.

---

## 8. Localization & English Only
- All documentation, comments, and user-facing text must be strictly in English. Zero Chinese characters or untranslated strings.

---

## 9. Senior UX/UI Engineer Mindset & Implementation Rigor
- **Always Think Like a Senior UX/UI Engineer**: Before and during every implementation, approach the feature from the perspective of an expert design systems engineer (following Ant Design, Apple HIG, Material Design, and Stripe standards):
  - **Typographic Hierarchy & Layout Balance**: Never cram multiple unrelated labels or badges horizontally into narrow containers where text can wrap awkwardly. Use structured two-row hierarchies (Row 1: Primary identifier on left + right-aligned status badge; Row 2: Muted secondary metadata below with single-line ellipsis).
  - **Elevation & Overflow Protection**: Dropdowns, floating action sheets, popovers, and tooltips must NEVER be clipped by parent `overflow: hidden` or constrained bounds. Always employ body portals (`createPortal`), high z-index tiers (e.g. `1050`), and auto-flipping edge detection (`placement="bottom"` / `"top"`).
  - **Interactive State Completeness**: Every clickable element must provide complete, polished states: default, hover, active/pressed, focus-visible (accessible focus ring), disabled, and loading (spinners without layout shift).
  - **Micro-Animations & Physics**: All transitions must feel fluid, snappy, and intentional (using cubic-bezier easings like `cubic-bezier(0.16, 1, 0.3, 1)` and 150ms-200ms duration). Avoid abrupt popping or layout shifts.
  - **Accessibility by Default**: Maintain minimum 24-44px click targets, proper ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-disabled`), and standard keyboard navigation (Escape to dismiss, Enter/Space to select).
