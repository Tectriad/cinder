import { Input, Button } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";
import { Search, Mail } from "lucide-react";

export function InputDocPage() {
  const inputProps = [
    { property: "value", description: "The input content value", type: "string", default: "-" },
    { property: "defaultValue", description: "The initial input content value", type: "string", default: "-" },
    { property: "size", description: "The size of the input box ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "label", description: "Label text rendered above input", type: "string", default: "-" },
    { property: "helperText", description: "Help or instruction text below input", type: "string", default: "-" },
    { property: "leftElement", description: "The prefix icon or element inside input", type: "ReactNode", default: "-" },
    { property: "rightElement", description: "The suffix icon or action inside input", type: "ReactNode", default: "-" },
    { property: "error", description: "Error status triggering red border and text", type: "boolean", default: "false" },
    { property: "disabled", description: "Whether the input is disabled", type: "boolean", default: "false" },
    { property: "onChange", description: "Callback when value changes", type: "(event) => void", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">
          CDInput / Input
        </h1>
        <p className="antd-doc-lead">
          A basic text field for entering text with support for prefix, suffix, helper text, and high-contrast focus rings.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDInput, Input &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>A user input in a form or dialog where typed text is required.</li>
          <li>Search boxes, authentication forms, or parameter entry controls.</li>
          <li>In Cinder UI, Inputs feature a <code>var(--cinder-surface)</code> background and a <code>var(--cinder-primary)</code> focus ring.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          <DemoCard
            title="Basic Usage"
            description="Standard input field with placeholder and label."
            code={`import { Input } from '@cinder-ui/core';

export default () => (
  <Input
    label="Username"
    placeholder="Enter username..."
    helperText="Pick a unique handle for your Cinder profile"
  />
);`}
          >
            <div style={{ width: "100%", maxWidth: "360px" }}>
              <Input
                label="Username"
                placeholder="Enter username..."
                helperText="Pick a unique handle for your Cinder profile"
              />
            </div>
          </DemoCard>

          <DemoCard
            title="Prefix & Suffix"
            description="Icons or buttons placed inside the input container."
            code={`import { Input, Button } from '@cinder-ui/core';
import { Search, Mail } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '360px' }}>
    <Input
      placeholder="Search documentation..."
      leftElement={<Search size={14} />}
    />
    <Input
      placeholder="Enter email..."
      leftElement={<Mail size={14} />}
      rightElement={<Button size="sm" style={{ height: '26px' }}>Verify</Button>}
    />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "360px" }}>
              <Input
                placeholder="Search documentation..."
                leftElement={<Search size={14} />}
              />
              <Input
                placeholder="Enter email..."
                leftElement={<Mail size={14} />}
                rightElement={<Button size="sm" style={{ height: "26px", padding: "0 8px" }}>Verify</Button>}
              />
            </div>
          </DemoCard>

          <DemoCard
            title="Error & Disabled States"
            description="Input with error status or disabled interaction."
            code={`import { Input } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '360px' }}>
    <Input
      label="Secret API Key"
      defaultValue="sk-cinder-9941..."
      disabled
    />
    <Input
      label="Password"
      type="password"
      error
      defaultValue="short"
      helperText="Password must be at least 8 characters long"
    />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "360px" }}>
              <Input
                label="Secret API Key"
                defaultValue="sk-cinder-9941..."
                disabled
              />
              <Input
                label="Password"
                type="password"
                error
                defaultValue="short"
                helperText="Password must be at least 8 characters long"
              />
            </div>
          </DemoCard>

          <DemoCard
            title="Input Sizes"
            description="Inputs support sm (34px), md (42px, default), and lg (50px)."
            code={`import { Input } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '360px' }}>
    <Input size="sm" placeholder="Small input (34px)" />
    <Input size="md" placeholder="Medium input (42px)" />
    <Input size="lg" placeholder="Large input (50px)" />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "360px" }}>
              <Input size="sm" placeholder="Small input (34px)" />
              <Input size="md" placeholder="Medium input (42px)" />
              <Input size="lg" placeholder="Large input (50px)" />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <ApiTable title="Input API" data={inputProps} />
      </section>
    </div>
  );
}
