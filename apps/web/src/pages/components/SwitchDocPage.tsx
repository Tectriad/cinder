import { useState, type ReactElement } from "react";
import { CDSwitch, CDIcons } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function SwitchDocPage(): ReactElement {
  const [basicChecked, setBasicChecked] = useState<boolean>(true);
  const [themeDark, setThemeDark] = useState<boolean>(true);
  const [loadingChecked, setLoadingChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const switchProps = [
    { property: "checked", description: "Controlled checked state", type: "boolean", default: "false" },
    { property: "defaultChecked", description: "Default initial checked state", type: "boolean", default: "false" },
    { property: "onChange", description: "Callback triggered when switch state toggles", type: "(checked: boolean, event) => void", default: "-" },
    { property: "disabled", description: "Disable switch toggling interaction", type: "boolean", default: "false" },
    { property: "loading", description: "Show animated loading spinner within switch handle", type: "boolean", default: "false" },
    { property: "size", description: "Size scale ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "checkedChildren", description: "Content shown inside track when checked (label or icon)", type: "ReactNode", default: "-" },
    { property: "unCheckedChildren", description: "Content shown inside track when unchecked (label or icon)", type: "ReactNode", default: "-" },
    { property: "thumbIcon", description: "Custom vector icon rendered on the circular handle", type: "ReactNode | ((checked) => ReactNode)", default: "-" },
  ];

  const handleAsyncToggle = (next: boolean): void => {
    setLoading(true);
    setTimeout(() => {
      setLoadingChecked(next);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDSwitch / Toggle</h1>
        <p className="antd-doc-lead">
          Two-state toggle switch for instantly applying binary settings with smooth spring transitions, inner labels, and async loading states.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDSwitch, Switch, Toggle &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>For immediate on/off preferences and settings without requiring form submission.</li>
          <li>In feature flags, dark/light theme triggers, and instant network toggles.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic & Sizing */}
          <DemoCard
            title="Basic Toggle & Sizing"
            description="Explore standard binary switches across sm, md, and lg dimensions."
            code={`import { CDSwitch } from '@cinder-ui/core';

export default () => {
  const [checked, setChecked] = useState(true);
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <CDSwitch size="sm" checked={checked} onChange={setChecked} />
      <CDSwitch size="md" checked={checked} onChange={setChecked} />
      <CDSwitch size="lg" checked={checked} onChange={setChecked} />
      <CDSwitch size="md" disabled checked />
    </div>
  );
};`}
          >
            <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
              <CDSwitch size="sm" checked={basicChecked} onChange={setBasicChecked} />
              <CDSwitch size="md" checked={basicChecked} onChange={setBasicChecked} />
              <CDSwitch size="lg" checked={basicChecked} onChange={setBasicChecked} />
              <CDSwitch size="md" disabled checked />
              <span style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                Status: <strong>{basicChecked ? "ACTIVE" : "INACTIVE"}</strong>
              </span>
            </div>
          </DemoCard>

          {/* Demo 2: Inner Content & Icons */}
          <DemoCard
            title="Inner Content & Vector Icons"
            description="Embed clean vector icons or text within the track for visual clarity."
            code={`import { CDSwitch, CDIcons } from '@cinder-ui/core';

export default () => {
  const [dark, setDark] = useState(true);
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <CDSwitch
        checked={dark}
        onChange={setDark}
        checkedChildren={<CDIcons.Moon size={12} />}
        unCheckedChildren={<CDIcons.Sun size={12} />}
      />
      <CDSwitch
        defaultChecked
        checkedChildren="ON"
        unCheckedChildren="OFF"
      />
    </div>
  );
};`}
          >
            <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CDSwitch
                  checked={themeDark}
                  onChange={setThemeDark}
                  checkedChildren={<CDIcons.Moon size={12} />}
                  unCheckedChildren={<CDIcons.Sun size={12} />}
                />
                <span style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                  Theme: <strong>{themeDark ? "Dark" : "Light"}</strong>
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CDSwitch
                  defaultChecked
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                />
                <span style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                  Production Pipeline
                </span>
              </div>
            </div>
          </DemoCard>

          {/* Demo 3: Async Loading State (Full Width) */}
          <DemoCard
            fullWidth
            title="Async Loading Transition"
            description="Built-in handle spinner for asynchronous network or API persistence confirmation."
            code={`import { CDSwitch } from '@cinder-ui/core';

export default () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = (next) => {
    setLoading(true);
    setTimeout(() => {
      setChecked(next);
      setLoading(false);
    }, 1200);
  };

  return (
    <CDSwitch
      loading={loading}
      checked={checked}
      onChange={handleToggle}
      checkedChildren="SYNCED"
      unCheckedChildren="LOCAL"
    />
  );
};`}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <CDSwitch
                loading={loading}
                checked={loadingChecked}
                onChange={handleAsyncToggle}
                checkedChildren="SYNCED"
                unCheckedChildren="LOCAL"
              />
              <span style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                {loading
                  ? "Applying cloud infrastructure change..."
                  : loadingChecked
                  ? "Replicated across 3 multi-region clusters."
                  : "Local staging mode."}
              </span>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={switchProps} />
      </section>
    </div>
  );
}
