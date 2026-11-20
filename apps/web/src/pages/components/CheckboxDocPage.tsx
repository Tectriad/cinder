import { useState, type ReactElement } from "react";
import {
  CDCheckbox,
  Checkbox,
  CDCheckboxGroup,
  CheckboxGroup,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function CheckboxDocPage(): ReactElement {
  // State for basic demo
  const [basicChecked, setBasicChecked] = useState<boolean>(true);

  // State for Select All / Indeterminate demo
  const allPermissions: string[] = ["analytics", "billing", "deployments"];
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(["analytics"]);

  const isAllChecked: boolean = selectedPermissions.length === allPermissions.length;
  const isIndeterminate: boolean =
    selectedPermissions.length > 0 && selectedPermissions.length < allPermissions.length;

  const handleSelectAllChange = (checked: boolean): void => {
    setSelectedPermissions(checked ? [...allPermissions] : []);
  };

  const handlePermissionToggle = (perm: string, checked: boolean): void => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, perm]);
    } else {
      setSelectedPermissions(selectedPermissions.filter((p: string) => p !== perm));
    }
  };

  // State for CheckboxGroup demo
  const [groupValues, setGroupValues] = useState<(string | number)[]>(["react", "tailwind"]);

  // State for Card Variant demo
  const [selectedCards, setSelectedCards] = useState<string[]>(["backup"]);

  const toggleCard = (key: string): void => {
    if (selectedCards.includes(key)) {
      setSelectedCards(selectedCards.filter((k: string) => k !== key));
    } else {
      setSelectedCards([...selectedCards, key]);
    }
  };

  const checkboxProps = [
    { property: "checked", description: "Controlled checked state", type: "boolean", default: "-" },
    { property: "defaultChecked", description: "Initial unmanaged checked state", type: "boolean", default: "false" },
    { property: "indeterminate", description: "Partially checked state (e.g. parent select-all)", type: "boolean", default: "false" },
    { property: "disabled", description: "Disable user interaction", type: "boolean", default: "false" },
    { property: "size", description: "Control size ('sm' | 'md' | 'lg')", type: "'sm' | 'md' | 'lg'", default: "'md'" },
    { property: "shape", description: "Geometry shape ('default' | 'square' | 'round')", type: "'default' | 'square' | 'round'", default: "'default'" },
    { property: "round", description: "Shorthand boolean for circular round shape", type: "boolean", default: "false" },
    { property: "variant", description: "Visual variant ('default' | 'card')", type: "'default' | 'card'", default: "'default'" },
    { property: "label", description: "Label text or element", type: "ReactNode", default: "-" },
    { property: "description", description: "Secondary helper text below label", type: "ReactNode", default: "-" },
    { property: "error", description: "Error state or error message text", type: "boolean | string", default: "false" },
    { property: "value", description: "Identifier value when used in CDCheckboxGroup", type: "string | number", default: "-" },
    { property: "onChange", description: "Callback fired on toggle", type: "(checked: boolean, event) => void", default: "-" },
  ];

  const groupProps = [
    { property: "value", description: "Controlled array of selected values", type: "(string | number)[]", default: "-" },
    { property: "defaultValue", description: "Initial selected values", type: "(string | number)[]", default: "[]" },
    { property: "options", description: "Declarative option list or items", type: "(string | number | CDCheckboxOption)[]", default: "-" },
    { property: "direction", description: "Layout alignment flow", type: "'horizontal' | 'vertical'", default: "'horizontal'" },
    { property: "size", description: "Size inherited by all child checkboxes", type: "'sm' | 'md' | 'lg'", default: "'md'" },
    { property: "shape", description: "Uniform shape for all child checkboxes ('default' | 'round')", type: "'default' | 'round'", default: "'default'" },
    { property: "round", description: "Shorthand to render all child checkboxes as round", type: "boolean", default: "false" },
    { property: "disabled", description: "Disable all child checkboxes", type: "boolean", default: "false" },
    { property: "name", description: "Shared input name for form submission", type: "string", default: "-" },
    { property: "onChange", description: "Callback fired when group selection changes", type: "(checkedValues: (string | number)[]) => void", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDCheckbox / Checkbox</h1>
        <p className="cinder-doc-lead">
          A multi-choice selector supporting checked, unchecked, and indeterminate states with micro-interactions, accessible keyboard navigation, rich metadata, and card variants.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDCheckbox, Checkbox, CDCheckboxGroup &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>Used for selecting one or multiple values from a list of options.</li>
          <li>For toggling an independent option or agreement (e.g. Terms of Service).</li>
          <li>For parent-child hierarchical selection trees using the indeterminate state.</li>
          <li>Selectable cards for rich dashboards and configuration wizards.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Basic Usage */}
          <DemoCard
            title="Basic Usage"
            description="Simple uncontrolled and controlled checkboxes with state reflection."
            code={`import { useState } from 'react';
import { CDCheckbox, Checkbox } from '@cinder-ui/core';

export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <CDCheckbox
        checked={checked}
        onChange={(val) => setChecked(val)}
        label={\`Controlled Checkbox: \${checked ? 'Checked' : 'Unchecked'}\`}
      />
      <Checkbox defaultChecked label="Uncontrolled Checkbox (defaultChecked)" />
    </div>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <CDCheckbox
                checked={basicChecked}
                onChange={(val: boolean): void => setBasicChecked(val)}
                label={`Controlled Checkbox: ${basicChecked ? "Checked" : "Unchecked"}`}
              />
              <Checkbox defaultChecked label="Uncontrolled Checkbox (defaultChecked)" />
            </div>
          </DemoCard>

          {/* Demo 2: Indeterminate & Select All */}
          <DemoCard
            title="Indeterminate & Select All"
            description="Parent checkbox automatically calculates checked, unchecked, or indeterminate state based on child selections."
            code={`import { useState } from 'react';
import { CDCheckbox } from '@cinder-ui/core';

export default () => {
  const all = ['analytics', 'billing', 'deployments'];
  const [selected, setSelected] = useState(['analytics']);

  const isAll = selected.length === all.length;
  const isIndeterminate = selected.length > 0 && selected.length < all.length;

  return (
    <div>
      <CDCheckbox
        checked={isAll}
        indeterminate={isIndeterminate}
        onChange={(checked) => setSelected(checked ? [...all] : [])}
        label="Select All Permissions"
      />
      <div style={{ paddingLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {all.map(perm => (
          <CDCheckbox
            key={perm}
            checked={selected.includes(perm)}
            onChange={(checked) => setSelected(checked ? [...selected, perm] : selected.filter(p => p !== perm))}
            label={perm.charAt(0).toUpperCase() + perm.slice(1)}
          />
        ))}
      </div>
    </div>
  );
};`}
          >
            <div>
              <CDCheckbox
                checked={isAllChecked}
                indeterminate={isIndeterminate}
                onChange={handleSelectAllChange}
                label="Select All Permissions"
              />
              <div
                style={{
                  paddingLeft: "26px",
                  marginTop: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  borderLeft: "2px solid var(--cinder-border)",
                  marginLeft: "9px",
                }}
              >
                {allPermissions.map((perm: string) => (
                  <CDCheckbox
                    key={perm}
                    checked={selectedPermissions.includes(perm)}
                    onChange={(checked: boolean): void => handlePermissionToggle(perm, checked)}
                    label={perm.charAt(0).toUpperCase() + perm.slice(1)}
                  />
                ))}
              </div>
            </div>
          </DemoCard>

          {/* Demo 3: Sizes */}
          <DemoCard
            title="Sizes"
            description="Three size presets: small (16px), medium (18px default), and large (22px)."
            code={`import { CDCheckbox } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
    <CDCheckbox size="sm" defaultChecked label="Small Checkbox (16px box / 13px text)" />
    <CDCheckbox size="md" defaultChecked label="Medium Checkbox (18px box / 14px text)" />
    <CDCheckbox size="lg" defaultChecked label="Large Checkbox (22px box / 15px text)" />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <CDCheckbox size="sm" defaultChecked label="Small Checkbox (16px box / 13px text)" />
              <CDCheckbox size="md" defaultChecked label="Medium Checkbox (18px box / 14px text)" />
              <CDCheckbox size="lg" defaultChecked label="Large Checkbox (22px box / 15px text)" />
            </div>
          </DemoCard>

          {/* Demo 4: Round / Circular Checkboxes */}
          <DemoCard
            title="Round / Circular Shape"
            description="Use round or shape='round' to render circular checkboxes, popular for task checklists and modern pickers."
            code={`import { CDCheckbox } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <CDCheckbox round defaultChecked label="Round Checked (round shorthand)" />
    <CDCheckbox round label="Round Unchecked" />
    <CDCheckbox shape="round" indeterminate label="Round Indeterminate (shape='round')" />
    <CDCheckbox round size="lg" defaultChecked label="Large Round Checkbox" />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <CDCheckbox round defaultChecked label="Round Checked (round shorthand)" />
              <CDCheckbox round label="Round Unchecked" />
              <CDCheckbox shape="round" indeterminate label="Round Indeterminate (shape='round')" />
              <CDCheckbox round size="lg" defaultChecked label="Large Round Checkbox" />
            </div>
          </DemoCard>

          {/* Demo 5: Rich Labels & Description Hierarchy */}
          <DemoCard
            title="Rich Labels & Metadata"
            description="Structured information hierarchy with primary title and muted secondary description."
            code={`import { CDCheckbox } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <CDCheckbox
      defaultChecked
      label="Automated Security Scans"
      description="Scan incoming pull requests for vulnerable dependencies and leak detection."
    />
    <CDCheckbox
      label="Telemetry & Analytics"
      description="Collect anonymous diagnostic logs to improve developer experience."
    />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <CDCheckbox
                defaultChecked
                label="Automated Security Scans"
                description="Scan incoming pull requests for vulnerable dependencies and leak detection."
              />
              <CDCheckbox
                label="Telemetry & Analytics"
                description="Collect anonymous diagnostic logs to improve developer experience."
              />
            </div>
          </DemoCard>

          {/* Demo 5: Checkbox Group */}
          <DemoCard
            title="Checkbox Group"
            description="Coordinate multiple checkboxes horizontally or vertically with uniform state management (CDCheckboxGroup and CheckboxGroup alias)."
            code={`import { useState } from 'react';
import { CDCheckboxGroup, CheckboxGroup } from '@cinder-ui/core';

export default () => {
  const [stack, setStack] = useState(['react', 'tailwind']);

  const options = [
    { label: 'React 19', value: 'react' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Tailwind CSS', value: 'tailwind' },
    { label: 'Vite', value: 'vite' },
    { label: 'GraphQL', value: 'graphql', disabled: true },
  ];

  return (
    <div>
      <CDCheckboxGroup
        options={options}
        value={stack}
        onChange={(vals) => setStack(vals)}
        direction="horizontal"
      />
      <div style={{ marginTop: '16px' }}>
        <CheckboxGroup
          options={[
            { label: 'Production Ready', value: 'prod' },
            { label: 'Nightly Canary', value: 'canary' },
          ]}
          defaultValue={['prod']}
          direction="vertical"
        />
      </div>
    </div>
  );
};`}
          >
            <div>
              <CDCheckboxGroup
                options={[
                  { label: "React 19", value: "react" },
                  { label: "TypeScript", value: "ts" },
                  { label: "Tailwind CSS", value: "tailwind" },
                  { label: "Vite", value: "vite" },
                  { label: "GraphQL", value: "graphql", disabled: true },
                ]}
                value={groupValues}
                onChange={(vals: (string | number)[]): void => setGroupValues(vals)}
                direction="horizontal"
              />
              <div style={{ marginTop: "16px" }}>
                <CheckboxGroup
                  options={[
                    { label: "Production Ready", value: "prod" },
                    { label: "Nightly Canary", value: "canary" },
                  ]}
                  defaultValue={["prod"]}
                  direction="vertical"
                />
              </div>
              <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--cinder-muted)" }}>
                Selected: {groupValues.join(", ")}
              </p>
            </div>
          </DemoCard>

          {/* Demo 6: Disabled & Error States */}
          <DemoCard
            title="Disabled & Error States"
            description="Full interactive state completeness: disabled, disabled checked, and error validation."
            code={`import { CDCheckbox } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <CDCheckbox disabled label="Disabled Unchecked" />
    <CDCheckbox disabled defaultChecked label="Disabled Checked" />
    <CDCheckbox
      error="You must agree to the Terms of Service before continuing."
      label="I accept the Terms of Service and Privacy Policy"
    />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <CDCheckbox disabled label="Disabled Unchecked" />
              <CDCheckbox disabled defaultChecked label="Disabled Checked" />
              <CDCheckbox
                error="You must agree to the Terms of Service before continuing."
                label="I accept the Terms of Service and Privacy Policy"
              />
            </div>
          </DemoCard>

          {/* Demo 7: Selectable Card Variant */}
          <DemoCard
            title="Selectable Card Variant"
            description="Rich card checkboxes ideal for feature picking, plan selections, and onboarding settings."
            code={`import { useState } from 'react';
import { CDCheckbox, CDCard } from '@cinder-ui/core';

export default () => {
  const [selected, setSelected] = useState(['backup']);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
      <CDCheckbox
        variant="card"
        checked={selected.includes('backup')}
        onChange={() => toggle('backup')}
        label="Automated Daily Backups"
        description="Snapshot production databases every 24 hours with point-in-time recovery."
      />
      <CDCheckbox
        variant="card"
        checked={selected.includes('ddos')}
        onChange={() => toggle('ddos')}
        label="DDoS Mitigation Shield"
        description="Enterprise edge protection with real-time anomaly traffic filtering."
      />
    </div>
  );
};`}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", width: "100%" }}>
              <CDCheckbox
                variant="card"
                checked={selectedCards.includes("backup")}
                onChange={(): void => toggleCard("backup")}
                label="Automated Daily Backups"
                description="Snapshot production databases every 24 hours with point-in-time recovery."
              />
              <CDCheckbox
                variant="card"
                checked={selectedCards.includes("ddos")}
                onChange={(): void => toggleCard("ddos")}
                label="DDoS Mitigation Shield"
                description="Enterprise edge protection with real-time anomaly traffic filtering."
              />
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>

        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--cinder-text)", marginBottom: "12px" }}>
          CDCheckbox Props
        </h3>
        <ApiTable data={checkboxProps} />

        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--cinder-text)", margin: "32px 0 12px" }}>
          CDCheckboxGroup Props
        </h3>
        <ApiTable data={groupProps} />
      </section>
    </div>
  );
}
