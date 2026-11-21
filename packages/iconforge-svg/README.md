# @iconforge/svg

Framework-agnostic raw SVG vector icon assets for IconForge in 6 visual styles.

## Overview

Contains pre-rendered, optimized SVG files categorized by domain and visual style:
- `outline/`
- `filled/`
- `duotone/`
- `multicolor/`
- `gradient/`
- `rounded/`

All SVG vectors use a standard `24x24` viewBox with rounded line caps and joins.

## Installation

```bash
npm install @iconforge/svg
```

## Usage

You can import or reference the SVGs directly in any framework (Vue, Svelte, Angular, Astro, or plain HTML):

```html
<img src="node_modules/@iconforge/svg/svg/outline/general-ui/search.svg" alt="Search" width="24" height="24" />
```

Or using standard bundlers (Vite, Webpack) with raw SVG loaders:

```javascript
import searchSvg from "@iconforge/svg/svg/outline/general-ui/search.svg?raw";
```

## License

MIT
