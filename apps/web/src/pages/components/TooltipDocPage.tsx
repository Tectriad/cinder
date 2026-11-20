import type { ReactElement } from "react";
import { CDTooltip, Tooltip, CDButton, CDIcons } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function TooltipDocPage(): ReactElement {
  const tooltipProps = [
    { property: "title", description: "Tooltip copy or element shown in balloon", type: "ReactNode", default: "-" },
    { property: "placement", description: "Anchor placement ('top' | 'bottom' | 'left' | 'right')", type: "string", default: "'top'" },
    { property: "trigger", description: "Trigger action ('hover' | 'focus' | 'click')", type: "string | string[]", default: "'hover'" },
    { property: "arrow", description: "Whether to display arrow pointing to target", type: "boolean", default: "true" },
    { property: "color", description: "Custom background color override", type: "string", default: "-" },
    { property: "mouseEnterDelay", description: "Delay in ms before opening on hover", type: "number", default: "100" },
    { property: "mouseLeaveDelay", description: "Delay in ms before closing on leave", type: "number", default: "100" },
    { property: "children", description: "Trigger element", type: "ReactElement", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDTooltip / Tooltip</h1>
        <p className="antd-doc-lead">
          Lightweight contextual balloon anchored to any trigger element, rendered into a body portal with edge auto-flipping and collision detection.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDTooltip, Tooltip &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>To clarify the function of icon buttons, abbreviations, or truncated labels.</li>
          <li>For brief, non-essential tips without interactive content (use Popover for rich controls).</li>
          <li>Never clipped by parent card bounds because it renders into `document.body` via a portal.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Placements */}
          <DemoCard
            title="Anchor Placements"
            description="Four directional placements with automatic collision detection."
            code={`import { CDTooltip, CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <CDTooltip title="Top tooltip hint" placement="top">
      <CDButton size="sm" variant="secondary">Top</CDButton>
    </CDTooltip>
    <CDTooltip title="Bottom tooltip hint" placement="bottom">
      <CDButton size="sm" variant="secondary">Bottom</CDButton>
    </CDTooltip>
    <CDTooltip title="Left tooltip hint" placement="left">
      <CDButton size="sm" variant="secondary">Left</CDButton>
    </CDTooltip>
    <CDTooltip title="Right tooltip hint" placement="right">
      <CDButton size="sm" variant="secondary">Right</CDButton>
    </CDTooltip>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <CDTooltip title="Top tooltip hint" placement="top">
                <CDButton size="sm" variant="secondary">Top</CDButton>
              </CDTooltip>
              <CDTooltip title="Bottom tooltip hint" placement="bottom">
                <CDButton size="sm" variant="secondary">Bottom</CDButton>
              </CDTooltip>
              <CDTooltip title="Left tooltip hint" placement="left">
                <CDButton size="sm" variant="secondary">Left</CDButton>
              </CDTooltip>
              <CDTooltip title="Right tooltip hint" placement="right">
                <CDButton size="sm" variant="secondary">Right</CDButton>
              </CDTooltip>
            </div>
          </DemoCard>

          {/* Demo 2: Icon Triggers & Click Mode */}
          <DemoCard
            title="Icon Triggers & Click Interaction"
            description="Tooltips can wrap icon buttons or toggle on click instead of hover."
            code={`import { CDTooltip, Tooltip, CDButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <CDTooltip title="Synchronize with Git repository">
      <CDButton variant="secondary" size="sm" prefixIcon={<CDIcons.Refresh size="sm" />}>
        Sync
      </CDButton>
    </CDTooltip>

    <Tooltip trigger="click" title="Click toggle hint: Click again or press Escape to dismiss">
      <CDButton variant="glass" size="sm">
        Click Trigger
      </CDButton>
    </Tooltip>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <CDTooltip title="Synchronize with Git repository">
                <CDButton variant="secondary" size="sm" prefixIcon={<CDIcons.Refresh size="sm" />}>
                  Sync
                </CDButton>
              </CDTooltip>

              <Tooltip trigger="click" title="Click toggle hint: Click again or press Escape to dismiss">
                <CDButton variant="glass" size="sm">
                  Click Trigger
                </CDButton>
              </Tooltip>
            </div>
          </DemoCard>

          {/* Demo 3: Custom Colors */}
          <DemoCard
            title="Custom Colors"
            description="Override the default dark balloon surface with brand or semantic colors."
            code={`import { CDTooltip, CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '12px' }}>
    <CDTooltip title="Production Primary Token" color="var(--cinder-primary)">
      <CDButton size="sm" variant="primary">Primary Color</CDButton>
    </CDTooltip>
    <CDTooltip title="Deployment Successful" color="var(--cinder-success)">
      <CDButton size="sm" variant="secondary">Success Color</CDButton>
    </CDTooltip>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <CDTooltip title="Production Primary Token" color="var(--cinder-primary)">
                <CDButton size="sm" variant="primary">Primary Color</CDButton>
              </CDTooltip>
              <CDTooltip title="Deployment Successful" color="var(--cinder-success)">
                <CDButton size="sm" variant="secondary">Success Color</CDButton>
              </CDTooltip>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={tooltipProps} />
      </section>
    </div>
  );
}
