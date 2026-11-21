# @iconforge/core

Core icon registry, geometry generators, and search engine for the IconForge vector ecosystem.

## Features

- Over 1,000 vector icon definitions categorized across 43 domains.
- 6 visual rendering styles: Outline, Filled, Duotone, Multicolor, Gradient, and Rounded.
- Lightweight search and filtering algorithm for tags, aliases, and categories.
- Zero runtime dependencies.
- Strict TypeScript typings and full tree-shakability.

## Installation

```bash
npm install @iconforge/core
```

## Basic Usage

```typescript
import { ICONS, searchIcons, renderIconSvg } from "@iconforge/core";

// Search icons by keyword
const results = searchIcons("search");

// Retrieve an icon definition
const homeIcon = ICONS.find((icon) => icon.name === "home");

// Render raw SVG markup
if (homeIcon) {
  const svgString = renderIconSvg(homeIcon, {
    style: "outline",
    size: 24,
    strokeWidth: 2,
    color: "#3b82f6"
  });
}
```

## License

MIT
