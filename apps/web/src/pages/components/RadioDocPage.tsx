import { useState, type ReactElement } from "react";
import {
  CDRadio,
  CDRadioGroup,
  CDRadioButton,
  CDIcons,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function RadioDocPage(): ReactElement {
  const [selectedCity, setSelectedCity] = useState<string | number>("tokyo");
  const [selectedTier, setSelectedTier] = useState<string | number>("pro");
  const [buttonMode, setButtonMode] = useState<string | number>("month");

  const radioProps = [
    { property: "checked", description: "Controlled checked state", type: "boolean", default: "false" },
    { property: "defaultChecked", description: "Default initial checked state", type: "boolean", default: "false" },
    { property: "value", description: "Unique value identifier for radio selection", type: "string | number", default: "-" },
    { property: "disabled", description: "Disable radio option interaction", type: "boolean", default: "false" },
    { property: "size", description: "Size scale ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "variant", description: "Visual presentation ('default' | 'card')", type: "string", default: "'default'" },
    { property: "description", description: "Secondary explanatory subtitle text", type: "ReactNode", default: "-" },
    { property: "icon", description: "Vector icon displayed alongside label", type: "ReactNode", default: "-" },
  ];

  const radioGroupProps = [
    { property: "value", description: "Controlled active selected value", type: "string | number", default: "-" },
    { property: "defaultValue", description: "Default selected value", type: "string | number", default: "-" },
    { property: "onChange", description: "Callback triggered when radio selection changes", type: "(val, event) => void", default: "-" },
    { property: "name", description: "Name attribute for HTML radio group inputs", type: "string", default: "auto-generated" },
    { property: "direction", description: "Layout direction ('horizontal' | 'vertical')", type: "string", default: "'horizontal'" },
    { property: "size", description: "Uniform size applied to child radios ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "variant", description: "Visual variant inherited by children ('default' | 'card')", type: "string", default: "'default'" },
    { property: "buttonStyle", description: "Button radio style ('outline' | 'solid')", type: "string", default: "'outline'" },
    { property: "options", description: "Declarative array of radio option objects", type: "CDRadioOption[]", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDRadio / Radio</h1>
        <p className="cinder-doc-lead">
          Single-choice selector from a mutually exclusive set of options, with standard circular indicators, selectable cards, and segmented button tabs.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDRadio, CDRadioGroup, CDRadioButton, Radio, RadioGroup &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>When users need to select exactly one option from a list of two or more mutually exclusive choices.</li>
          <li>For pricing plan cards, server region pickers, or segmented frequency toggles.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Basic Radio Group */}
          <DemoCard
            title="Basic Radio Group"
            description="Horizontal and vertical mutually exclusive single selection."
            code={`import { CDRadioGroup, CDRadio } from '@cinder-ui/core';

export default () => {
  const [city, setCity] = useState('tokyo');
  return (
    <CDRadioGroup value={city} onChange={setCity}>
      <CDRadio value="ny">New York</CDRadio>
      <CDRadio value="london">London</CDRadio>
      <CDRadio value="tokyo">Tokyo</CDRadio>
      <CDRadio value="sydney" disabled>Sydney (Offline)</CDRadio>
    </CDRadioGroup>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <CDRadioGroup value={selectedCity} onChange={setSelectedCity}>
                <CDRadio value="ny">New York</CDRadio>
                <CDRadio value="london">London</CDRadio>
                <CDRadio value="tokyo">Tokyo</CDRadio>
                <CDRadio value="sydney" disabled>Sydney (Offline)</CDRadio>
              </CDRadioGroup>
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                Selected Region: <strong>{String(selectedCity).toUpperCase()}</strong>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: Segmented Radio Buttons */}
          <DemoCard
            title="Radio Buttons"
            description="Segmented button tab options ideal for time ranges, view modes, and density switchers."
            code={`import { CDRadioGroup, CDRadioButton } from '@cinder-ui/core';

export default () => {
  const [mode, setMode] = useState('month');
  return (
    <CDRadioGroup value={mode} onChange={setMode} buttonStyle="solid">
      <CDRadioButton value="day">Day</CDRadioButton>
      <CDRadioButton value="week">Week</CDRadioButton>
      <CDRadioButton value="month">Month</CDRadioButton>
      <CDRadioButton value="year">Year</CDRadioButton>
    </CDRadioGroup>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <CDRadioGroup value={buttonMode} onChange={setButtonMode} buttonStyle="solid">
                <CDRadioButton value="day">Day</CDRadioButton>
                <CDRadioButton value="week">Week</CDRadioButton>
                <CDRadioButton value="month">Month</CDRadioButton>
                <CDRadioButton value="year">Year</CDRadioButton>
              </CDRadioGroup>
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                Active Interval: <strong>{String(buttonMode).toUpperCase()}</strong>
              </div>
            </div>
          </DemoCard>

          {/* Demo 3: Selectable Cards (Full Width) */}
          <DemoCard
            fullWidth
            title="Selectable Card Variant"
            description="Rich visual cards with vector icons, prominent titles, and descriptive secondary copy."
            code={`import { CDRadioGroup, CDRadio, CDIcons } from '@cinder-ui/core';

export default () => {
  const [tier, setTier] = useState('pro');
  return (
    <CDRadioGroup value={tier} onChange={setTier} direction="vertical">
      <CDRadio
        variant="card"
        value="starter"
        icon={<CDIcons.Box size={20} color="var(--cinder-primary)" />}
        description="Ideal for indie hackers, prototyping, and personal side projects."
      >
        Starter Tier ($0 / month)
      </CDRadio>
      <CDRadio
        variant="card"
        value="pro"
        icon={<CDIcons.Flame size={20} color="var(--cinder-primary)" />}
        description="High-performance dedicated clusters, automated scaling, and 99.99% uptime SLA."
      >
        Production Pro ($49 / month)
      </CDRadio>
      <CDRadio
        variant="card"
        value="enterprise"
        icon={<CDIcons.Shield size={20} color="var(--cinder-primary)" />}
        description="Custom VPC isolation, SOC2 compliance reports, and 24/7 priority support."
      >
        Enterprise Custom (Invoiced)
      </CDRadio>
    </CDRadioGroup>
  );
};`}
          >
            <div style={{ width: "100%" }}>
              <CDRadioGroup value={selectedTier} onChange={setSelectedTier} direction="vertical">
                <CDRadio
                  variant="card"
                  value="starter"
                  icon={<CDIcons.Box size={20} color="var(--cinder-primary)" />}
                  description="Ideal for indie hackers, prototyping, and personal side projects."
                >
                  Starter Tier ($0 / month)
                </CDRadio>
                <CDRadio
                  variant="card"
                  value="pro"
                  icon={<CDIcons.Flame size={20} color="var(--cinder-primary)" />}
                  description="High-performance dedicated clusters, automated scaling, and 99.99% uptime SLA."
                >
                  Production Pro ($49 / month)
                </CDRadio>
                <CDRadio
                  variant="card"
                  value="enterprise"
                  icon={<CDIcons.Shield size={20} color="var(--cinder-primary)" />}
                  description="Custom VPC isolation, SOC2 compliance reports, and 24/7 priority support."
                >
                  Enterprise Custom (Invoiced)
                </CDRadio>
              </CDRadioGroup>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference - CDRadio</h2>
        <ApiTable data={radioProps} />

        <h2 className="cinder-section-heading" style={{ marginTop: "32px" }}>API Reference - CDRadioGroup</h2>
        <ApiTable data={radioGroupProps} />
      </section>
    </div>
  );
}
