import { useState, type ReactElement } from "react";
import {
  CDDrawer,
  CDSheet,
  CDButton,
  CDInput,
  type CDDrawerPlacement,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function DrawerDocPage(): ReactElement {
  const [basicOpen, setBasicOpen] = useState<boolean>(false);
  const [placementOpen, setPlacementOpen] = useState<boolean>(false);
  const [placement, setPlacement] = useState<CDDrawerPlacement>("right");

  const openWithPlacement = (p: CDDrawerPlacement): void => {
    setPlacement(p);
    setPlacementOpen(true);
  };

  const drawerProps = [
    { property: "open", description: "Whether the drawer sheet is visible", type: "boolean", default: "false" },
    { property: "onClose", description: "Callback fired when drawer requests to close", type: "() => void", default: "-" },
    { property: "placement", description: "Viewport edge to slide from ('right' | 'left' | 'top' | 'bottom')", type: "string", default: "'right'" },
    { property: "title", description: "Primary title in drawer header", type: "ReactNode", default: "-" },
    { property: "description", description: "Descriptive subtitle copy below title", type: "ReactNode", default: "-" },
    { property: "width", description: "Width for left and right placements", type: "number | string", default: "380" },
    { property: "height", description: "Height for top and bottom placements", type: "number | string", default: "380" },
    { property: "closable", description: "Whether to display the close icon", type: "boolean", default: "true" },
    { property: "maskClosable", description: "Whether clicking background mask closes drawer", type: "boolean", default: "true" },
    { property: "footer", description: "Custom footer action buttons", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDDrawer / Drawer / Sheet</h1>
        <p className="antd-doc-lead">
          Sliding side panel or bottom sheet that glides into view from any viewport edge, maintaining screen context while providing focused workspaces.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDDrawer, Drawer, CDSheet &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>For detailed inspection panels, secondary creation forms, or cart sidebars.</li>
          <li>Bottom sheet placement for mobile-friendly contextual controls and pickers.</li>
          <li>Never clipped by parent card bounds because it renders into `document.body` via a portal.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic Drawer with Form */}
          <DemoCard
            title="Basic Side Drawer"
            description="Opens a 380px panel from the right edge with form inputs and action footer."
            code={`import { useState } from 'react';
import { CDDrawer, CDButton, CDInput } from '@cinder-ui/core';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CDButton variant="primary" onClick={() => setOpen(true)}>
        Open Side Drawer
      </CDButton>

      <CDDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Cluster Configuration"
        description="Update node allocation and autoscaling thresholds."
        footer={
          <div style={{ display: 'flex', gap: '8px' }}>
            <CDButton variant="secondary" onClick={() => setOpen(false)}>Cancel</CDButton>
            <CDButton variant="primary" onClick={() => setOpen(false)}>Save Changes</CDButton>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <CDInput label="Cluster Name" defaultValue="cinder-prod-edge" />
          <CDInput label="Max Pod Replicas" defaultValue="16" />
        </div>
      </CDDrawer>
    </>
  );
};`}
          >
            <CDButton variant="primary" onClick={(): void => setBasicOpen(true)}>
              Open Side Drawer
            </CDButton>

            <CDDrawer
              open={basicOpen}
              onClose={(): void => setBasicOpen(false)}
              title="Edit Cluster Configuration"
              description="Update node allocation and autoscaling thresholds."
              footer={
                <div style={{ display: "flex", gap: "8px" }}>
                  <CDButton variant="secondary" onClick={(): void => setBasicOpen(false)}>
                    Cancel
                  </CDButton>
                  <CDButton variant="primary" onClick={(): void => setBasicOpen(false)}>
                    Save Changes
                  </CDButton>
                </div>
              }
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <CDInput label="Cluster Name" defaultValue="cinder-prod-edge" />
                <CDInput label="Max Pod Replicas" defaultValue="16" />
              </div>
            </CDDrawer>
          </DemoCard>

          {/* Demo 2: Viewport Placements */}
          <DemoCard
            title="Viewport Placements (Top, Bottom, Left, Right)"
            description="Slide into view from any viewport boundary."
            code={`import { useState } from 'react';
import { CDSheet, CDButton } from '@cinder-ui/core';

export default () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('bottom');

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <CDButton variant="secondary" onClick={() => { setPlacement('right'); setOpen(true); }}>
        Right Edge
      </CDButton>
      <CDButton variant="secondary" onClick={() => { setPlacement('left'); setOpen(true); }}>
        Left Edge
      </CDButton>
      <CDButton variant="secondary" onClick={() => { setPlacement('top'); setOpen(true); }}>
        Top Edge
      </CDButton>
      <CDButton variant="secondary" onClick={() => { setPlacement('bottom'); setOpen(true); }}>
        Bottom Sheet
      </CDButton>

      <CDSheet
        open={open}
        placement={placement}
        onClose={() => setOpen(false)}
        title={\`Sliding from \${placement}\`}
      >
        <p style={{ margin: 0, color: 'var(--cinder-muted)' }}>
          Contextual panel sliding smoothly with cubic-bezier easing.
        </p>
      </CDSheet>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <CDButton variant="secondary" onClick={(): void => openWithPlacement("right")}>
                Right Edge
              </CDButton>
              <CDButton variant="secondary" onClick={(): void => openWithPlacement("left")}>
                Left Edge
              </CDButton>
              <CDButton variant="secondary" onClick={(): void => openWithPlacement("top")}>
                Top Edge
              </CDButton>
              <CDButton variant="secondary" onClick={(): void => openWithPlacement("bottom")}>
                Bottom Sheet
              </CDButton>
            </div>

            <CDSheet
              open={placementOpen}
              placement={placement}
              onClose={(): void => setPlacementOpen(false)}
              title={`Sliding from ${placement}`}
            >
              <p style={{ margin: 0, color: "var(--cinder-muted)" }}>
                Contextual panel sliding smoothly with cubic-bezier easing. Press Escape or click
                the backdrop mask to dismiss.
              </p>
            </CDSheet>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={drawerProps} />
      </section>
    </div>
  );
}
