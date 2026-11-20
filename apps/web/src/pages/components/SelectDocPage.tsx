import { useState, type ReactElement } from "react";
import {
  CDSelect,
  Select,
  CDOption,
  CDIcons,
  type CDSelectOption,
  type CDSelectValue,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function SelectDocPage(): ReactElement {
  const [basicVal, setBasicVal] = useState<CDSelectValue>("react");
  const [multiVal, setMultiVal] = useState<CDSelectValue[]>(["ts", "vite"]);
  const [searchVal, setSearchVal] = useState<CDSelectValue>("");
  const [clearVal, setClearVal] = useState<CDSelectValue>("prod");

  const frameworkOptions: CDSelectOption[] = [
    { value: "react", label: "React 19", icon: <CDIcons.Code size="sm" />, description: "Component UI framework" },
    { value: "vue", label: "Vue 3", icon: <CDIcons.Layers size="sm" />, description: "Progressive framework" },
    { value: "svelte", label: "Svelte 5", icon: <CDIcons.Flame size="sm" />, description: "Cybernetically enhanced" },
    { value: "solid", label: "SolidJS", icon: <CDIcons.Sparkles size="sm" />, description: "Simple and performant reactivity" },
    { value: "angular", label: "Angular", icon: <CDIcons.Box size="sm" />, disabled: true, description: "Legacy enterprise suite" },
  ];

  const techStackOptions: CDSelectOption[] = [
    { value: "ts", label: "TypeScript" },
    { value: "vite", label: "Vite Bundler" },
    { value: "node", label: "Node.js Engine" },
    { value: "rust", label: "Rust Toolchain" },
    { value: "python", label: "Python Analytics" },
    { value: "docker", label: "Docker Containers" },
  ];

  const envOptions: CDSelectOption[] = [
    { value: "dev", label: "Development (Local)", icon: <CDIcons.Terminal size="sm" /> },
    { value: "staging", label: "Staging Preview", icon: <CDIcons.Globe size="sm" /> },
    { value: "prod", label: "Production (Global)", icon: <CDIcons.Shield size="sm" /> },
  ];

  const selectProps = [
    { property: "options", description: "Array of selectable option objects", type: "CDSelectOption[]", default: "[]" },
    { property: "value", description: "Controlled selected value (or array for multiple)", type: "CDSelectValue | CDSelectValue[]", default: "-" },
    { property: "defaultValue", description: "Initial unmanaged value", type: "CDSelectValue | CDSelectValue[]", default: "-" },
    { property: "onChange", description: "Callback triggered when selection changes", type: "(value, option?) => void", default: "-" },
    { property: "placeholder", description: "Placeholder copy when no option is chosen", type: "string", default: "'Select an option...'" },
    { property: "multiple", description: "Allow multiple selections as tags", type: "boolean", default: "false" },
    { property: "showSearch", description: "Enable live search filtering within dropdown", type: "boolean", default: "false" },
    { property: "allowClear", description: "Show clear icon button to wipe selection", type: "boolean", default: "false" },
    { property: "size", description: "Dimension preset ('sm' | 'md' | 'lg')", type: "'sm' | 'md' | 'lg'", default: "'md'" },
    { property: "label", description: "Form control label above trigger", type: "string", default: "-" },
    { property: "helperText", description: "Exploratory hint or validation message", type: "string", default: "-" },
    { property: "error", description: "Error state highlighting border in danger color", type: "boolean", default: "false" },
    { property: "disabled", description: "Disable selection interactions", type: "boolean", default: "false" },
    { property: "placement", description: "Open direction of the sheet ('bottom' | 'top')", type: "'bottom' | 'top'", default: "'bottom' (with smart flip)" },
    { property: "portal", description: "Whether to render floating sheet into document.body to avoid clipping", type: "boolean", default: "true" },
    { property: "prefixIcon", description: "Icon prefix placed before the current value", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDSelect / Select</h1>
        <p className="cinder-doc-lead">
          Form control to select one or multiple options from a floating dropdown list with search, clearing, tags, and rich option metadata.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDSelect, Select, CDOption &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>When there are 5 or more options to select from, saving vertical screen real estate.</li>
          <li>For tagging, category classification, multi-filter selection, or environment picking.</li>
          <li>Provides search capability for long option catalogs.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Basic Single Select */}
          <DemoCard
            title="Basic Usage"
            description="Single selection with options passed via prop, showing value label, description, and status."
            code={`import { useState } from 'react';
import { CDSelect } from '@cinder-ui/core';

export default () => {
  const [val, setVal] = useState('react');

  return (
    <div style={{ maxWidth: '320px' }}>
      <CDSelect
        label="Frontend Stack"
        value={val}
        onChange={(v) => setVal(v)}
        options={frameworkOptions}
      />
    </div>
  );
};`}
          >
            <div style={{ maxWidth: "320px", width: "100%" }}>
              <CDSelect
                label="Frontend Stack"
                value={basicVal}
                onChange={(v) => setBasicVal(v)}
                options={frameworkOptions}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--cinder-muted)" }}>
                Selected value: <strong style={{ color: "var(--cinder-primary)" }}>{String(basicVal)}</strong>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: Multiple Selection Tags */}
          <DemoCard
            title="Multiple Selection"
            description="Enable multiple selection with removable tag chips and batch selection."
            code={`import { useState } from 'react';
import { CDSelect } from '@cinder-ui/core';

export default () => {
  const [val, setVal] = useState(['ts', 'vite']);

  return (
    <div style={{ maxWidth: '360px' }}>
      <CDSelect
        multiple
        label="Technologies"
        placeholder="Choose tech stack..."
        value={val}
        onChange={(v) => setVal(v)}
        options={techStackOptions}
      />
    </div>
  );
};`}
          >
            <div style={{ maxWidth: "360px", width: "100%" }}>
              <CDSelect
                multiple
                label="Technologies"
                placeholder="Choose tech stack..."
                value={multiVal}
                onChange={(v) => setMultiVal(v)}
                options={techStackOptions}
              />
            </div>
          </DemoCard>

          {/* Demo 3: Live Search Filter */}
          <DemoCard
            title="Search & Filter"
            description="Set showSearch to true to enable instantaneous filtering of the option list."
            code={`import { CDSelect, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ maxWidth: '320px' }}>
    <CDSelect
      showSearch
      label="Filtered Framework"
      placeholder="Type to search..."
      options={frameworkOptions}
      prefixIcon={<CDIcons.Search size="sm" />}
    />
  </div>
);`}
          >
            <div style={{ maxWidth: "320px", width: "100%" }}>
              <CDSelect
                showSearch
                label="Filtered Framework"
                placeholder="Type to search..."
                value={searchVal}
                onChange={(v) => setSearchVal(v)}
                options={frameworkOptions}
                prefixIcon={<CDIcons.Search size="sm" />}
              />
            </div>
          </DemoCard>

          {/* Demo 4: Clearable Selection */}
          <DemoCard
            title="Clearable Selection"
            description="Set allowClear to true to display a quick-clear icon button."
            code={`import { CDSelect } from '@cinder-ui/core';

export default () => (
  <div style={{ maxWidth: '320px' }}>
    <CDSelect
      allowClear
      label="Deployment Target"
      value={clearVal}
      onChange={(v) => setClearVal(v)}
      options={envOptions}
    />
  </div>
);`}
          >
            <div style={{ maxWidth: "320px", width: "100%" }}>
              <CDSelect
                allowClear
                label="Deployment Target"
                value={clearVal}
                onChange={(v) => setClearVal(v)}
                options={envOptions}
              />
            </div>
          </DemoCard>

          {/* Demo 5: Sizes */}
          <DemoCard
            title="Select Sizes"
            description="Supports three sizes: sm (32px), md (40px standard), and lg (48px)."
            code={`import { CDSelect } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
    <CDSelect size="sm" placeholder="Small (32px)" options={techStackOptions} />
    <CDSelect size="md" placeholder="Medium (40px)" options={techStackOptions} />
    <CDSelect size="lg" placeholder="Large (48px)" options={techStackOptions} />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px", width: "100%" }}>
              <CDSelect size="sm" placeholder="Small (32px)" options={techStackOptions} />
              <CDSelect size="md" placeholder="Medium (40px)" options={techStackOptions} />
              <CDSelect size="lg" placeholder="Large (48px)" options={techStackOptions} />
            </div>
          </DemoCard>

          {/* Demo 6: Compound Option Children & Validation */}
          <DemoCard
            title="Compound Children & Validation"
            description="Use CDOption children for declarative templates, or pass error with helperText for validation."
            code={`import { Select, CDOption } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
    <Select label="Declarative Children" defaultValue="opt1">
      <CDOption value="opt1">First Primitive</CDOption>
      <CDOption value="opt2">Second Primitive</CDOption>
      <CDOption value="opt3">Third Primitive</CDOption>
    </Select>

    <Select
      error
      label="Validation Failed"
      helperText="Please select an approved server region."
      defaultValue="disabled-val"
      options={[{ value: 'disabled-val', label: 'Restricted Datacenter', disabled: true }]}
    />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px", width: "100%" }}>
              <Select label="Declarative Children" defaultValue="opt1">
                <CDOption value="opt1">First Primitive</CDOption>
                <CDOption value="opt2">Second Primitive</CDOption>
                <CDOption value="opt3">Third Primitive</CDOption>
              </Select>

              <Select
                error
                label="Validation Failed"
                helperText="Please select an approved server region."
                defaultValue="disabled-val"
                options={[{ value: "disabled-val", label: "Restricted Datacenter", disabled: true }]}
              />
            </div>
          </DemoCard>

          {/* Demo 7: Placement Control (Top vs Bottom) */}
          <DemoCard
            title="Placement (Top / Bottom) & Body Portal"
            description="Use placement='top' to open the sheet upward above the select box. Rendered in a body portal with z-index: 1050 so it is never clipped by parent containers."
            code={`import { CDSelect } from '@cinder-ui/core';

export default () => (
  <div style={{ maxWidth: '320px' }}>
    <CDSelect
      placement="top"
      label="Opens at Top"
      placeholder="Click to open upward..."
      options={frameworkOptions}
    />
  </div>
);`}
          >
            <div style={{ maxWidth: "320px", width: "100%" }}>
              <CDSelect
                placement="top"
                label="Opens at Top (Above)"
                placeholder="Click to open upward..."
                options={frameworkOptions}
              />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <ApiTable title="CDSelectProps API" data={selectProps} />
      </section>
    </div>
  );
}
