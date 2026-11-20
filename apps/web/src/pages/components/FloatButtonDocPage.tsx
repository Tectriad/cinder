import { useState, type ReactElement } from "react";
import {
  CDFloatButton,
  FloatButton,
  CDFloatButtonGroup,
  CDButton,
  CDIcons,
  type CDFloatButtonPosition,
  type CDFloatButtonShape,
  type CDFloatButtonSize,
  type CDFloatActionItem,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function FloatButtonDocPage(): ReactElement {
  const [selectedPos, setSelectedPos] = useState<CDFloatButtonPosition>("bottom-right");
  const [selectedShape, setSelectedShape] = useState<CDFloatButtonShape>("square");
  const [selectedSize, setSelectedSize] = useState<CDFloatButtonSize>("sm");
  const [lastAction, setLastAction] = useState<string>("None");

  const speedDialActions: CDFloatActionItem[] = [
    {
      key: "ai",
      icon: <CDIcons.Sparkles size="sm" />,
      label: "AI Assist",
      tooltip: "Generate with AI",
      onClick: () => setLastAction("AI Assist clicked"),
    },
    {
      key: "edit",
      icon: <CDIcons.Edit size="sm" />,
      label: "Edit Canvas",
      tooltip: "Modify note",
      onClick: () => setLastAction("Edit Canvas clicked"),
    },
    {
      key: "share",
      icon: <CDIcons.Share size="sm" />,
      label: "Share Note",
      tooltip: "Share with peers",
      onClick: () => setLastAction("Share Note clicked"),
    },
    {
      key: "delete",
      icon: <CDIcons.Trash size="sm" />,
      label: "Delete",
      tooltip: "Delete permanently",
      danger: true,
      onClick: () => setLastAction("Delete clicked"),
    },
  ];

  const floatButtonProps = [
    { property: "icon", description: "Icon graphic rendered inside the button", type: "ReactNode", default: "-" },
    { property: "shape", description: "Geometry shape ('circle' | 'square')", type: "'circle' | 'square'", default: "'circle'" },
    { property: "size", description: "Size preset ('xs' | 'sm' | 'md' | 'lg')", type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'" },
    { property: "position", description: "Corner anchor ('bottom-right' | 'bottom-left' | 'top-right' | 'top-left')", type: "CDFloatButtonPosition", default: "'bottom-right'" },
    { property: "offset", description: "Precise custom offset margins { top?, bottom?, left?, right? }", type: "CDFloatButtonOffset", default: "-" },
    { property: "fixed", description: "Whether to pin to the browser viewport (fixed) or relative parent (absolute)", type: "boolean", default: "true" },
    { property: "actions", description: "Array of child floating actions revealed upon click or hover", type: "CDFloatActionItem[]", default: "[]" },
    { property: "trigger", description: "Expansion trigger ('click' | 'hover')", type: "'click' | 'hover'", default: "'click'" },
    { property: "direction", description: "Direction in which actions stack ('up' | 'down' | 'left' | 'right')", type: "'up' | 'down' | 'left' | 'right'", default: "'up'" },
    { property: "badge", description: "Status notification badge { count?, dot?, color? }", type: "object", default: "-" },
    { property: "tooltip", description: "Tooltip text shown on hover", type: "string", default: "-" },
    { property: "onClick", description: "Primary button click handler", type: "(event) => void", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDFloatButton / Floating Actions</h1>
        <p className="antd-doc-lead">
          Floating action buttons that hover above content in viewport or container corners, supporting square and circle shapes, customizable locations, and expandable multi-action speed dials upon click.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDFloatButton, FloatButton, CDFloatButtonGroup &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>For primary persistent actions that remain accessible regardless of scroll position.</li>
          <li>For collapsible multi-action menus (Speed Dial) where clicking reveals secondary operations.</li>
          <li>Supports square small presets (<code>shape="square"</code>, <code>size="sm"</code> or <code>size="xs"</code>) for compact workspace interfaces.</li>
          <li>Supports dynamic location changes across 4 corners with smooth repositioning.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Interactive Location & Shape Switcher */}
          <DemoCard
            title="Location Changing & Square Small"
            description="Dynamically switch locations (4 corners), shapes (square vs circle), and sizes (xs, sm, md, lg)."
            code={`import { useState } from 'react';
import { CDFloatButton, CDButton, CDIcons } from '@cinder-ui/core';

export default () => {
  const [pos, setPos] = useState('bottom-right');
  const [shape, setShape] = useState('square');
  const [size, setSize] = useState('sm');

  return (
    <div style={{ position: 'relative', height: '220px', width: '100%' }}>
      {/* Container controls */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <CDButton size="xs" onClick={() => setPos('bottom-right')}>bottom-right</CDButton>
        <CDButton size="xs" onClick={() => setPos('bottom-left')}>bottom-left</CDButton>
        <CDButton size="xs" onClick={() => setPos('top-right')}>top-right</CDButton>
        <CDButton size="xs" onClick={() => setPos('top-left')}>top-left</CDButton>
      </div>

      <CDFloatButton
        fixed={false}
        position={pos}
        shape={shape}
        size={size}
        icon={<CDIcons.Plus size="sm" />}
        tooltip="Interactive Floating Button"
      />
    </div>
  );
};`}
          >
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {(["bottom-right", "bottom-left", "top-right", "top-left"] as CDFloatButtonPosition[]).map(
                    (p) => (
                      <CDButton
                        key={p}
                        size="xs"
                        variant={selectedPos === p ? "primary" : "secondary"}
                        onClick={() => setSelectedPos(p)}
                      >
                        {p}
                      </CDButton>
                    )
                  )}
                </div>

                <div style={{ display: "flex", gap: "4px" }}>
                  {(["square", "circle"] as CDFloatButtonShape[]).map((s) => (
                    <CDButton
                      key={s}
                      size="xs"
                      variant={selectedShape === s ? "primary" : "secondary"}
                      onClick={() => setSelectedShape(s)}
                    >
                      {s}
                    </CDButton>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "4px" }}>
                  {(["xs", "sm", "md", "lg"] as CDFloatButtonSize[]).map((sz) => (
                    <CDButton
                      key={sz}
                      size="xs"
                      variant={selectedSize === sz ? "primary" : "secondary"}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </CDButton>
                  ))}
                </div>
              </div>

              {/* Simulated Container Box */}
              <div
                style={{
                  position: "relative",
                  height: "180px",
                  border: "1px dashed var(--cinder-border)",
                  borderRadius: "8px",
                  background: "var(--cinder-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "var(--cinder-muted)",
                }}
              >
                <span>Interactive Container (fixed: false)</span>

                <CDFloatButton
                  fixed={false}
                  position={selectedPos}
                  shape={selectedShape}
                  size={selectedSize}
                  icon={<CDIcons.Sparkles size={selectedSize === "xs" ? 14 : 16} />}
                  tooltip={`Position: ${selectedPos}, Shape: ${selectedShape}`}
                />
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: Multiple Floating Actions on Click (Speed Dial) */}
          <DemoCard
            title="Multiple Floating Actions on Click (Speed Dial)"
            description="Click the primary button to expand multiple child floating actions with pill labels and custom click handlers."
            code={`import { CDFloatButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <CDFloatButton
    fixed={false}
    position="bottom-right"
    shape="square"
    size="sm"
    icon={<CDIcons.Plus size="sm" />}
    actions={[
      { key: 'ai', icon: <CDIcons.Sparkles size="sm" />, label: 'AI Assist' },
      { key: 'edit', icon: <CDIcons.Edit size="sm" />, label: 'Edit' },
      { key: 'share', icon: <CDIcons.Share size="sm" />, label: 'Share' },
      { key: 'delete', icon: <CDIcons.Trash size="sm" />, label: 'Delete', danger: true },
    ]}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  position: "relative",
                  height: "260px",
                  border: "1px dashed var(--cinder-border)",
                  borderRadius: "8px",
                  background: "var(--cinder-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "var(--cinder-muted)",
                }}
              >
                <span>Click the button in bottom-right corner</span>

                <CDFloatButton
                  fixed={false}
                  position="bottom-right"
                  shape="square"
                  size="sm"
                  variant="primary"
                  icon={<CDIcons.Plus size="sm" />}
                  actions={speedDialActions}
                />
              </div>

              <div style={{ marginTop: "10px", fontSize: "12px", color: "var(--cinder-muted)" }}>
                Triggered sub-action: <strong style={{ color: "var(--cinder-primary)" }}>{lastAction}</strong>
              </div>
            </div>
          </DemoCard>

          {/* Demo 3: Small Square Floating Actions */}
          <DemoCard
            title="Square Small & Extra-Small Presets"
            description="Compact square floating triggers tailored for minimalist toolbars and dashboard corners."
            code={`import { FloatButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <FloatButton fixed={false} shape="square" size="xs" icon={<CDIcons.Search size={14} />} />
    <FloatButton fixed={false} shape="square" size="sm" icon={<CDIcons.Flame size={16} />} />
    <FloatButton fixed={false} shape="square" size="md" icon={<CDIcons.Shield size={18} />} />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <FloatButton fixed={false} shape="square" size="xs" icon={<CDIcons.Search size={12} />} />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>xs (28px)</div>
              </div>

              <div style={{ textAlign: "center" }}>
                <FloatButton fixed={false} shape="square" size="sm" icon={<CDIcons.Flame size={16} />} />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>sm (36px)</div>
              </div>

              <div style={{ textAlign: "center" }}>
                <FloatButton fixed={false} shape="square" size="md" icon={<CDIcons.Shield size={18} />} />
                <div style={{ fontSize: "11px", color: "var(--cinder-muted)", marginTop: "4px" }}>md (44px)</div>
              </div>
            </div>
          </DemoCard>

          {/* Demo 4: Compound CDFloatButtonGroup */}
          <DemoCard
            title="Compound Floating Action Group"
            description="Use CDFloatButtonGroup with actions array or child buttons to manage expandable action triggers."
            code={`import { CDFloatButtonGroup, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ position: 'relative', height: '140px', width: '100%' }}>
    <CDFloatButtonGroup
      fixed={false}
      shape="square"
      size="sm"
      position="bottom-right"
      actions={[
        { icon: <CDIcons.Sparkles size="sm" />, label: 'AI Assist' },
        { icon: <CDIcons.Share size="sm" />, label: 'Share' },
      ]}
    />
  </div>
);`}
          >
            <div
              style={{
                position: "relative",
                height: "140px",
                width: "100%",
                maxWidth: "320px",
                border: "1px dashed var(--cinder-border)",
                borderRadius: "8px",
                background: "var(--cinder-surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "var(--cinder-muted)",
              }}
            >
              <span>Click square FAB group</span>
              <CDFloatButtonGroup
                fixed={false}
                shape="square"
                size="sm"
                position="bottom-right"
                actions={[
                  { icon: <CDIcons.Sparkles size="sm" />, label: "AI Assist" },
                  { icon: <CDIcons.Share size="sm" />, label: "Share" },
                ]}
              />
            </div>
          </DemoCard>

          {/* Demo 4: Notification Badge */}
          <DemoCard
            title="Notification Badge"
            description="Float buttons support numerical badges and alert status dots."
            code={`import { CDFloatButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
    <CDFloatButton fixed={false} shape="square" size="sm" badge={{ count: 5 }} icon={<CDIcons.Mail size="sm" />} />
    <CDFloatButton fixed={false} shape="circle" size="sm" badge={{ dot: true }} icon={<CDIcons.AlertCircle size="sm" />} />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <CDFloatButton
                fixed={false}
                shape="square"
                size="sm"
                badge={{ count: 5 }}
                icon={<CDIcons.Mail size="sm" />}
              />
              <CDFloatButton
                fixed={false}
                shape="circle"
                size="sm"
                badge={{ dot: true }}
                icon={<CDIcons.AlertCircle size="sm" />}
              />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <ApiTable title="CDFloatButton API" data={floatButtonProps} />
      </section>
    </div>
  );
}
