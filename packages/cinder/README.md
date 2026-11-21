# @tec-triad/cinder-ui

> Foundational React component library engine built for velocity, strict accessibility, and token-driven design.

## Architecture Status

- **Monorepo Structure**: Active (`npm workspaces`)
- **Package Type**: Dual ESM / CJS module (`tsup` + `.d.ts`)
- **Types**: Polymorphic React types with strict TypeScript
- **Tokens**: Token schema contracts and ThemeProvider ready
- **Components Status**: Production component ecosystem with Cinder Slate token system.

## Installation

```bash
npm install @tec-triad/cinder-ui
```

## Basic Usage

```tsx
import { Button, Input, Badge, Card, ThemeProvider } from "@tec-triad/cinder-ui";
import "@tec-triad/cinder-ui/styles.css";

export function App() {
  return (
    <ThemeProvider defaultMode="dark">
      <Card>
        <Button variant="primary">Click Me</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## License

MIT
