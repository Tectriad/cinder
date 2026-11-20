import type { ReactElement } from "react";
import { CDPopover, Popover, CDButton, CDInput } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function PopoverDocPage(): ReactElement {
  const popoverProps = [
    { property: "title", description: "Title text or element in popover header", type: "ReactNode", default: "-" },
    { property: "content", description: "Rich interactive content inside the card", type: "ReactNode", default: "-" },
    { property: "placement", description: "Anchor placement ('top' | 'bottom' | 'left' | 'right')", type: "string", default: "'top'" },
    { property: "trigger", description: "Trigger action ('click' | 'hover' | 'focus')", type: "string | string[]", default: "'click'" },
    { property: "arrow", description: "Whether to display arrow pointing to target", type: "boolean", default: "true" },
    { property: "children", description: "Trigger element", type: "ReactElement", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDPopover / Popover</h1>
        <p className="antd-doc-lead">
          Floating card containing rich interactive content, forms, or controls, anchored to a trigger and rendered into a body portal.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDPopover, Popover &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>When you need to present more detailed, interactive content than a simple text Tooltip.</li>
          <li>For quick inline filters, color pickers, account previews, or small forms.</li>
          <li>Never clipped by parent card bounds because it renders into `document.body` via a portal.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic Popover */}
          <DemoCard
            title="Basic Popover"
            description="Card with header title and interactive action controls."
            code={`import { CDPopover, CDButton } from '@cinder-ui/core';

export default () => (
  <CDPopover
    title="Deployment Overview"
    content={
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--cinder-muted)' }}>
          Environment: Production (us-east-1)
        </p>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--cinder-muted)' }}>
          Cluster health: 100% operational
        </p>
        <div style={{ marginTop: '6px' }}>
          <CDButton size="sm" variant="primary">Manage Nodes</CDButton>
        </div>
      </div>
    }
  >
    <CDButton variant="primary">View Status</CDButton>
  </CDPopover>
);`}
          >
            <CDPopover
              title="Deployment Overview"
              content={
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--cinder-muted)" }}>
                    Environment: Production (us-east-1)
                  </p>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--cinder-muted)" }}>
                    Cluster health: 100% operational
                  </p>
                  <div style={{ marginTop: "6px" }}>
                    <CDButton size="sm" variant="primary">Manage Nodes</CDButton>
                  </div>
                </div>
              }
            >
              <CDButton variant="primary">View Status</CDButton>
            </CDPopover>
          </DemoCard>

          {/* Demo 2: Quick Form Inside Popover */}
          <DemoCard
            title="Inline Form Controls"
            description="Embed inputs and interactive actions inside a compact popover."
            code={`import { Popover, CDButton, CDInput } from '@cinder-ui/core';

export default () => (
  <Popover
    title="Quick Tag Assignment"
    placement="bottom"
    content={
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '220px' }}>
        <CDInput placeholder="Enter tag name..." size="sm" />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
          <CDButton size="sm" variant="primary">Add Tag</CDButton>
        </div>
      </div>
    }
  >
    <CDButton variant="secondary">Add Tag</CDButton>
  </Popover>
);`}
          >
            <Popover
              title="Quick Tag Assignment"
              placement="bottom"
              content={
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "220px" }}>
                  <CDInput placeholder="Enter tag name..." size="sm" />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                    <CDButton size="sm" variant="primary">Add Tag</CDButton>
                  </div>
                </div>
              }
            >
              <CDButton variant="secondary">Add Tag</CDButton>
            </Popover>
          </DemoCard>

          {/* Demo 3: Hover Trigger */}
          <DemoCard
            title="Hover Trigger Interaction"
            description="Opens smoothly on hover and closes on mouse leave."
            code={`import { CDPopover, CDButton } from '@cinder-ui/core';

export default () => (
  <CDPopover
    trigger="hover"
    title="User Card"
    content={
      <div>
        <div style={{ fontWeight: 600 }}>Rajarathinam</div>
        <div style={{ fontSize: '12px', color: 'var(--cinder-muted)' }}>Staff Design Systems Engineer</div>
      </div>
    }
  >
    <CDButton variant="glass">Hover User Card</CDButton>
  </CDPopover>
);`}
          >
            <CDPopover
              trigger="hover"
              title="User Card"
              content={
                <div>
                  <div style={{ fontWeight: 600 }}>Rajarathinam</div>
                  <div style={{ fontSize: "12px", color: "var(--cinder-muted)" }}>
                    Staff Design Systems Engineer
                  </div>
                </div>
              }
            >
              <CDButton variant="glass">Hover User Card</CDButton>
            </CDPopover>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={popoverProps} />
      </section>
    </div>
  );
}
