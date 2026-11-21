# @tec-triad/iconforge-react

Tree-shakable React icon components with support for 6 visual styles: Outline, Filled, Duotone, Multicolor, Gradient, and Rounded.

## Features

- Tree-shakable individual component exports.
- Dual ESM and CJS builds with complete TypeScript definitions.
- 6 visual styles via the `style` prop (`outline`, `filled`, `duotone`, `multicolor`, `gradient`, `rounded`).
- Flexible customization: `size`, `color`, `secondaryColor`, `strokeWidth`, `className`, and SVG HTML attributes.
- Compatible with React 18 and React 19.

## Installation

```bash
npm install @tec-triad/iconforge-react @tec-triad/iconforge-core
```

## Usage

```tsx
import React from "react";
import { IconSearch, IconHeart, IconShield, IconSparkles } from "@tec-triad/iconforge-react";

export function Example(): React.JSX.Element {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      {/* Default Outline Style */}
      <IconSearch size={24} color="#3b82f6" strokeWidth={2} />

      {/* Filled Style */}
      <IconHeart size={24} style="filled" color="#ef4444" />

      {/* Duotone Style */}
      <IconShield size={24} style="duotone" color="#10b981" secondaryColor="#6ee7b7" />

      {/* Gradient Style */}
      <IconSparkles size={24} style="gradient" />
    </div>
  );
}
```

## License

MIT
