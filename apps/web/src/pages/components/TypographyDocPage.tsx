import { useState, type ReactElement } from "react";
import {
  CDHeading,
  Heading,
  CDText,
  Text,
  CDParagraph,
  Paragraph,
  CDLabel,
  Label,
  CDCode,
  Code,
  CDKbd,
  Kbd,
  Typography,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable, type ApiPropItem } from "../../components/ApiTable";

export function TypographyDocPage(): ReactElement {
  const [editableHeading, setEditableHeading] = useState<string>("Production Cluster (Editable)");
  const [editableParagraph, setEditableParagraph] = useState<string>(
    "Cinder UI provides enterprise design tokens with Dark & Light theme fidelity, micro-interactions, and accessible typography primitives."
  );

  const headingProps: ApiPropItem[] = [
    { property: "level", description: "Semantic heading level (1 to 6 renders <h1>-<h6>)", type: "1 | 2 | 3 | 4 | 5 | 6", default: "1" },
    { property: "weight", description: "Font weight preset ('normal' | 'medium' | 'semibold' | 'bold' | 'extrabold')", type: "string", default: "level-based" },
    { property: "gradient", description: "Applies Cinder Slate brand gradient to heading text", type: "boolean", default: "false" },
    { property: "copyable", description: "Enable one-click clipboard copy button with feedback indicator", type: "boolean | CDCopyableConfig", default: "false" },
    { property: "ellipsis", description: "Truncate text with single or multi-line ellipsis tooltip", type: "boolean | CDEllipsisConfig", default: "false" },
    { property: "align", description: "Horizontal text alignment ('left' | 'center' | 'right')", type: "string", default: "'left'" },
    { property: "className", description: "Additional CSS class names", type: "string", default: "-" },
  ];

  const textProps: ApiPropItem[] = [
    { property: "as", description: "Polymorphic HTML tag ('span' | 'p' | 'div' | 'strong' | 'em' | 'label' | 'code')", type: "string", default: "'span'" },
    { property: "type", description: "Semantic color intent ('primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'muted')", type: "string", default: "-" },
    { property: "size", description: "Typography size scale ('xs' | 'sm' | 'md' | 'lg' | 'xl')", type: "string", default: "'md'" },
    { property: "weight", description: "Font weight ('normal' | 'medium' | 'semibold' | 'bold')", type: "string", default: "'normal'" },
    { property: "strong", description: "Render bold weight text", type: "boolean", default: "false" },
    { property: "italic", description: "Render italicized text", type: "boolean", default: "false" },
    { property: "underline", description: "Render text with underline decoration", type: "boolean", default: "false" },
    { property: "delete", description: "Render strikethrough deleted text", type: "boolean", default: "false" },
    { property: "code", description: "Render inline JetBrains Mono code pill", type: "boolean", default: "false" },
    { property: "mark", description: "Render highlighted badge text background", type: "boolean", default: "false" },
    { property: "keyboard", description: "Render keyboard hotkey keycap style", type: "boolean", default: "false" },
    { property: "copyable", description: "Clipboard copy button configuration or toggle", type: "boolean | CDCopyableConfig", default: "false" },
    { property: "editable", description: "Inline editing with save/cancel handlers", type: "boolean | CDEditableConfig", default: "false" },
    { property: "ellipsis", description: "Single-line or multi-line clamp truncation", type: "boolean | CDEllipsisConfig", default: "false" },
  ];

  const paragraphProps: ApiPropItem[] = [
    { property: "lead", description: "Lead paragraph style with larger font size and optimized tracking", type: "boolean", default: "false" },
    { property: "spacing", description: "Vertical margin spacing rhythm ('none' | 'tight' | 'normal' | 'relaxed')", type: "string", default: "'normal'" },
    { property: "copyable", description: "Clipboard copy action configuration", type: "boolean | CDCopyableConfig", default: "false" },
    { property: "editable", description: "Inline content editable configuration", type: "boolean | CDEditableConfig", default: "false" },
    { property: "ellipsis", description: "Multi-line clamp truncation configuration", type: "boolean | CDEllipsisConfig", default: "false" },
  ];

  const labelProps: ApiPropItem[] = [
    { property: "required", description: "Displays mandatory red asterisk indicator", type: "boolean", default: "false" },
    { property: "optional", description: "Displays optional badge tag", type: "boolean | ReactNode", default: "false" },
    { property: "tooltip", description: "Renders contextual info icon with title tooltip", type: "ReactNode", default: "-" },
    { property: "size", description: "Label typography size ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "htmlFor", description: "Target ID of associated form input element", type: "string", default: "-" },
  ];

  const codeProps: ApiPropItem[] = [
    { property: "copyable", description: "Enable one-click code copy button", type: "boolean | CDCopyableConfig", default: "false" },
    { property: "size", description: "Code size ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
  ];

  const kbdProps: ApiPropItem[] = [
    { property: "size", description: "Keycap pill size ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDTypography / Typography</h1>
        <p className="cinder-doc-lead">
          Comprehensive typography primitive suite for headings, text hierarchies, lead paragraphs, form labels, inline code, and keyboard shortcut indicators.
        </p>

        <div className="cinder-doc-import">
          <code>
            import &#123; CDHeading, CDText, CDParagraph, CDLabel, CDCode, CDKbd, Typography &#125; from &apos;@cinder-ui/core&apos;;
          </code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>To establish a clean, consistent typographic hierarchy from Hero headings (h1) to microcopy captions.</li>
          <li>When building enterprise dashboards, documentation portals, and data views requiring inline copy and edit actions.</li>
          <li>For form inputs requiring accessible labels with mandatory asterisks, optional tags, and contextual help tooltips.</li>
          <li>When presenting monospace shell commands, configuration variables, and keyboard shortcut combinations.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Headings & Gradient Accent */}
          <DemoCard
            fullWidth
            title="Heading Scale & Gradient Accent"
            description="Semantic H1 through H6 headings with Plus Jakarta Sans geometry, letter-spacing, and optional hero gradient."
            code={`import { CDHeading, Heading } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <CDHeading level={1} gradient>
      Cinder UI Design System
    </CDHeading>
    <Heading level={2}>H2: Cloud Infrastructure & Observability</Heading>
    <Heading level={3}>H3: Service Mesh & Ingress Controllers</Heading>
    <Heading level={4}>H4: Database Sharding & Read Replicas</Heading>
    <Heading level={5}>H5: Microservice Telemetry Pipeline</Heading>
    <Heading level={6}>H6: System Environment Variables</Heading>
  </div>
);`}
          >
            <Typography style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <CDHeading level={1} gradient>
                Cinder UI Design System
              </CDHeading>
              <Heading level={2}>H2: Cloud Infrastructure &amp; Observability</Heading>
              <Heading level={3}>H3: Service Mesh &amp; Ingress Controllers</Heading>
              <Heading level={4}>H4: Database Sharding &amp; Read Replicas</Heading>
              <Heading level={5}>H5: Microservice Telemetry Pipeline</Heading>
              <Heading level={6}>H6: System Environment Variables</Heading>
            </Typography>
          </DemoCard>

          {/* Demo 2: Text Semantics & Modifiers */}
          <DemoCard
            fullWidth
            title="Text Semantics & Modifiers"
            description="Semantic colors, weights, and text modifiers including strong, underline, strikethrough, mark, code, and kbd."
            code={`import { CDText, Text } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <CDText>Default Text</CDText>
      <CDText type="primary">Primary Text</CDText>
      <CDText type="secondary">Secondary Text</CDText>
      <CDText type="success">Success State</CDText>
      <CDText type="warning">Warning Notice</CDText>
      <CDText type="danger">Critical Danger</CDText>
      <CDText type="muted">Muted Text</CDText>
    </div>
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Text strong>Bold Text</Text>
      <Text italic>Italic Text</Text>
      <Text underline>Underlined</Text>
      <Text delete>Deprecated</Text>
      <Text mark>Highlighted Mark</Text>
      <Text code>cinder.config.ts</Text>
      <Text keyboard>Ctrl + C</Text>
    </div>
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <CDText>Default Text</CDText>
                <CDText type="primary">Primary Text</CDText>
                <CDText type="secondary">Secondary Text</CDText>
                <CDText type="success">Success State</CDText>
                <CDText type="warning">Warning Notice</CDText>
                <CDText type="danger">Critical Danger</CDText>
                <CDText type="muted">Muted Text</CDText>
              </div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                <Text strong>Bold Text</Text>
                <Text italic>Italic Text</Text>
                <Text underline>Underlined</Text>
                <Text delete>Deprecated</Text>
                <Text mark>Highlighted Mark</Text>
                <Text code>cinder.config.ts</Text>
                <Text keyboard>Ctrl + C</Text>
              </div>
            </div>
          </DemoCard>

          {/* Demo 3: Interactive Copyable & Editable */}
          <DemoCard
            fullWidth
            title="Interactive Copyable & Editable"
            description="Integrated clipboard copy button with transient feedback, and inline in-place text editor with save and cancel."
            code={`import { useState } from 'react';
import { CDHeading, CDParagraph, CDText } from '@cinder-ui/core';

export default () => {
  const [heading, setHeading] = useState('Production Cluster (Editable)');
  const [desc, setDesc] = useState('Click the edit icon to modify this description.');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CDHeading
        level={4}
        editable={{ onChange: (val) => setHeading(val) }}
        copyable
      >
        {heading}
      </CDHeading>

      <CDParagraph
        editable={{ onChange: (val) => setDesc(val) }}
        copyable
      >
        {desc}
      </CDParagraph>

      <CDText copyable={{ text: 'api_sec_991823abf440' }}>
        API Key: <CDText code>api_sec_991823abf440</CDText>
      </CDText>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <CDHeading
                level={4}
                editable={{
                  onChange: (val: string): void => setEditableHeading(val),
                }}
                copyable
              >
                {editableHeading}
              </CDHeading>

              <CDParagraph
                editable={{
                  onChange: (val: string): void => setEditableParagraph(val),
                }}
                copyable
              >
                {editableParagraph}
              </CDParagraph>

              <div>
                <CDText copyable={{ text: "api_sec_991823abf440" }}>
                  API Key: <CDText code>api_sec_991823abf440</CDText>
                </CDText>
              </div>
            </div>
          </DemoCard>

          {/* Demo 4: Paragraphs & Line Clamp */}
          <DemoCard
            fullWidth
            title="Paragraphs, Lead Text & Ellipsis Clamp"
            description="Lead typography for hero articles, rhythmic paragraph spacing, and multi-line CSS line clamping."
            code={`import { CDParagraph, Paragraph } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <CDParagraph lead>
      Cinder UI is built from the ground up for high-scale enterprise applications with strict Slate design tokens.
    </CDParagraph>
    <Paragraph spacing="normal">
      Every component adheres to zero-emoji standards, strict TypeScript contracts, accessible WAI-ARIA patterns, and responsive glass surfaces.
    </Paragraph>
    <Paragraph ellipsis={{ rows: 2 }}>
      Multi-line ellipsis example: Cinder monorepo enforces modular component architecture with dedicated folders, explicit prop typing, and body portal elevations to guarantee that dropdowns, tooltips, and floating panels are never clipped by parent overflow boundaries.
    </Paragraph>
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <CDParagraph lead>
                Cinder UI is built from the ground up for high-scale enterprise applications with strict Slate design tokens.
              </CDParagraph>
              <Paragraph spacing="normal">
                Every component adheres to zero-emoji standards, strict TypeScript contracts, accessible WAI-ARIA patterns, and responsive glass surfaces.
              </Paragraph>
              <Paragraph ellipsis={{ rows: 2 }}>
                Multi-line ellipsis example: Cinder monorepo enforces modular component architecture with dedicated folders, explicit prop typing, and body portal elevations to guarantee that dropdowns, tooltips, and floating panels are never clipped by parent overflow boundaries.
              </Paragraph>
            </div>
          </DemoCard>

          {/* Demo 5: Form Labels */}
          <DemoCard
            fullWidth
            title="Form Labels & Field Annotations"
            description="Accessible form field labels with mandatory asterisks, optional markers, and contextual help tooltips."
            code={`import { CDLabel, Label } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <CDLabel required tooltip="Publicly unique DNS identifier for this deployment node">
      Deployment Cluster Name
    </CDLabel>
    <Label optional tooltip="Optional contact email for SSL cert renewal notices">
      Administrator Email
    </Label>
    <Label optional="Custom Tag" size="sm">
      Secondary VPC Gateway
    </Label>
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <CDLabel required tooltip="Publicly unique DNS identifier for this deployment node">
                Deployment Cluster Name
              </CDLabel>
              <Label optional tooltip="Optional contact email for SSL cert renewal notices">
                Administrator Email
              </Label>
              <Label optional="Custom Tag" size="sm">
                Secondary VPC Gateway
              </Label>
            </div>
          </DemoCard>

          {/* Demo 6: Monospace Code & Keyboard Shortcuts */}
          <DemoCard
            fullWidth
            title="Monospace Code & Keyboard Shortcuts"
            description="JetBrains Mono code snippets with copy button, and tactile keyboard hotkey keycaps."
            code={`import { CDCode, CDKbd, Kbd } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <CDCode>npm install @cinder-ui/core</CDCode>
      <CDCode copyable>docker compose up -d</CDCode>
      <CDCode copyable size="lg">git checkout -b feature/typography</CDCode>
    </div>
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <span>Search Command:</span>
      <div style={{ display: 'inline-flex', gap: '4px' }}>
        <CDKbd>Cmd</CDKbd>
        <CDKbd>K</CDKbd>
      </div>
      <span>Force Quit:</span>
      <div style={{ display: 'inline-flex', gap: '4px' }}>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Esc</Kbd>
      </div>
      <span>Submit:</span>
      <Kbd>Enter</Kbd>
    </div>
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <CDCode>npm install @cinder-ui/core</CDCode>
                <CDCode copyable>docker compose up -d</CDCode>
                <Code copyable size="lg">git checkout -b feature/typography</Code>
              </div>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: "14px", color: "var(--cinder-muted)" }}>Search Command:</span>
                <div style={{ display: "inline-flex", gap: "4px" }}>
                  <CDKbd>Cmd</CDKbd>
                  <CDKbd>K</CDKbd>
                </div>
                <span style={{ fontSize: "14px", color: "var(--cinder-muted)", marginLeft: "12px" }}>Force Quit:</span>
                <div style={{ display: "inline-flex", gap: "4px" }}>
                  <Kbd>Ctrl</Kbd>
                  <Kbd>Shift</Kbd>
                  <Kbd>Esc</Kbd>
                </div>
                <span style={{ fontSize: "14px", color: "var(--cinder-muted)", marginLeft: "12px" }}>Submit:</span>
                <Kbd>Enter</Kbd>
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Specifications */}
      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification</h2>
        <ApiTable title="CDHeading / Heading Props" data={headingProps} />
        <ApiTable title="CDText / Text Props" data={textProps} />
        <ApiTable title="CDParagraph / Paragraph Props" data={paragraphProps} />
        <ApiTable title="CDLabel / Label Props" data={labelProps} />
        <ApiTable title="CDCode / Code Props" data={codeProps} />
        <ApiTable title="CDKbd / Kbd Props" data={kbdProps} />
      </section>
    </div>
  );
}

export default TypographyDocPage;
