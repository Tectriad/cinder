import { useState, type ReactElement } from "react";
import { CDColorPickerPro } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function ColorPickerProDocPage(): ReactElement {
  const [solidColor, setSolidColor] = useState<string>("#3b82f6");
  const [gradientColor, setGradientColor] = useState<string>(
    "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)"
  );

  const apiProps = [
    { property: "value", description: "Current color value (HEX, RGBA, or gradient CSS)", type: "string", default: "'#3b82f6'" },
    { property: "mode", description: "Color modes ('solid' | 'gradient' | 'both')", type: "string", default: "'both'" },
    { property: "format", description: "Display format ('hex' | 'rgb')", type: "string", default: "'hex'" },
    { property: "showAlpha", description: "Enable opacity/alpha slider", type: "boolean", default: "true" },
    { property: "presets", description: "Array of preset swatch HEX colors", type: "string[]", default: "Cinder Slate Palette" },
    { property: "display", description: "Display mode ('inline' | 'popover')", type: "string", default: "'inline'" },
    { property: "onChange", description: "Callback fired when color or gradient changes", type: "function", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">ColorPicker Pro</h1>
        <p className="cinder-doc-lead">
          Comprehensive color selection system with linear/radial multi-stop gradient composer, 2D saturation/brightness spectrum, opacity slider, Cinder Slate presets, and native EyeDropper API integration.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDColorPickerPro &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li><strong>Theme &amp; Branding Config</strong>: Allowing users to configure brand accents, background gradients, and primary colors.</li>
          <li><strong>Graphic &amp; UI Builders</strong>: Designing buttons, cards, and canvas elements with multi-stop linear or radial gradients.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Live Demonstration</h2>

        <div className="cinder-demos-grid">
          <DemoCard
            title="Inline Solid & Gradient Mode"
            description="Multi-stop gradient builder with degree rotation, hue/alpha sliders, and swatch palette."
            code={`import { CDColorPickerPro } from '@cinder-ui/core';

export default () => (
  <CDColorPickerPro
    mode="both"
    defaultValue="#3b82f6"
    display="inline"
  />
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
              <div
                style={{
                  width: "100%",
                  height: "48px",
                  borderRadius: "8px",
                  background: gradientColor,
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              />
              <CDColorPickerPro
                mode="both"
                value={gradientColor}
                onChange={(val) => setGradientColor(val)}
                display="inline"
              />
            </div>
          </DemoCard>

          <DemoCard
            title="Popover Trigger Mode"
            description="Compact dropdown trigger button ideal for form dialogs, properties sidebars, and toolbars."
            code={`import { CDColorPickerPro } from '@cinder-ui/core';

export default () => (
  <CDColorPickerPro
    display="popover"
    label="Primary Accent"
    value="#3b82f6"
  />
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <CDColorPickerPro
                display="popover"
                label="Primary Accent"
                value={solidColor}
                onChange={(val) => setSolidColor(val)}
              />
              <div style={{ fontSize: "12px", color: "var(--cinder-text-muted)" }}>
                Active Selection: <code>{solidColor}</code>
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification</h2>
        <ApiTable data={apiProps} />
      </section>
    </div>
  );
}
