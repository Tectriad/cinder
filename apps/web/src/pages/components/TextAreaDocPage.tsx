import { useState, type ReactElement } from "react";
import { CDTextArea } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function TextAreaDocPage(): ReactElement {
  const [basicText, setBasicText] = useState<string>("");
  const [autoText, setAutoText] = useState<string>("Cinder UI provides enterprise design tokens with high performance.");

  const textAreaProps = [
    { property: "value", description: "Controlled text value", type: "string", default: "-" },
    { property: "defaultValue", description: "Default initial text value", type: "string", default: "''" },
    { property: "onChange", description: "Callback triggered when input text changes", type: "(event) => void", default: "-" },
    { property: "rows", description: "Initial visible line height count", type: "number", default: "4" },
    { property: "autoSize", description: "Automatically expand height as content grows (boolean or { minRows, maxRows })", type: "boolean | object", default: "false" },
    { property: "maxLength", description: "Maximum allowed character threshold", type: "number", default: "-" },
    { property: "showCount", description: "Show bottom-right character counter", type: "boolean | function", default: "false" },
    { property: "allowClear", description: "Display clear button icon to reset text", type: "boolean", default: "false" },
    { property: "resize", description: "CSS resize mode ('none' | 'vertical' | 'horizontal' | 'both')", type: "string", default: "'vertical'" },
    { property: "status", description: "Validation state highlight ('error' | 'warning')", type: "string", default: "-" },
    { property: "size", description: "Sizing scale ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "disabled", description: "Disable textarea interaction", type: "boolean", default: "false" },
    { property: "readOnly", description: "Set textarea to read-only view", type: "boolean", default: "false" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDTextArea / TextArea</h1>
        <p className="antd-doc-lead">
          Multi-line plain-text editing control supporting automatic height expansion, character limits, instant clear buttons, and semantic validation states.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDTextArea, TextArea, Textarea &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>For capturing long-form text inputs like comments, descriptions, notes, or code snippets.</li>
          <li>When content exceeds single-line input bounds and requires automatic vertical growth or character counters.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Auto-Expanding Height (Full Width) */}
          <DemoCard
            fullWidth
            title="Auto-Expanding Height (autoSize)"
            description="The textarea automatically resizes its height to fit content between minRows and maxRows without awkward scroll jumps."
            code={`import { CDTextArea } from '@cinder-ui/core';

export default () => (
  <CDTextArea
    autoSize={{ minRows: 2, maxRows: 6 }}
    placeholder="Type multiple lines to see height expand automatically..."
    allowClear
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDTextArea
                value={autoText}
                onChange={(e) => setAutoText(e.target.value)}
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="Type multiple lines to see height expand automatically..."
                allowClear
              />
            </div>
          </DemoCard>

          {/* Demo 2: Character Limit & Clear Button (Full Width) */}
          <DemoCard
            fullWidth
            title="Character Limit & Clear Button"
            description="Built-in counter indicator with red highlight when limit is exceeded, plus one-click clear button."
            code={`import { CDTextArea } from '@cinder-ui/core';

export default () => {
  const [text, setText] = useState('');
  return (
    <CDTextArea
      value={text}
      onChange={e => setText(e.target.value)}
      maxLength={120}
      showCount
      allowClear
      placeholder="Enter deployment notes (max 120 chars)..."
    />
  );
};`}
          >
            <div style={{ width: "100%" }}>
              <CDTextArea
                value={basicText}
                onChange={(e) => setBasicText(e.target.value)}
                maxLength={120}
                showCount
                allowClear
                placeholder="Enter deployment notes (max 120 chars)..."
              />
            </div>
          </DemoCard>

          {/* Demo 3: Statuses & Sizing (Full Width) */}
          <DemoCard
            fullWidth
            title="Validation Statuses & Sizing"
            description="Error and warning highlight rings across small, medium, and large dimensions."
            code={`import { CDTextArea } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <CDTextArea size="sm" placeholder="Small size textarea (12px)" rows={2} />
    <CDTextArea status="warning" placeholder="Warning status validation ring..." rows={2} />
    <CDTextArea status="error" placeholder="Error status: Connection timeout..." rows={2} />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <CDTextArea size="sm" placeholder="Small size textarea (12px font)" rows={2} />
              <CDTextArea status="warning" placeholder="Warning status validation ring..." rows={2} />
              <CDTextArea status="error" placeholder="Error status: Connection timeout to cluster endpoint..." rows={2} />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={textAreaProps} />
      </section>
    </div>
  );
}
