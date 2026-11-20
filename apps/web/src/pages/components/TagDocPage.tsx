import { useState, type ReactElement } from "react";
import { CDTag, Tag, CDChip, CDIcons } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function TagDocPage(): ReactElement {
  const [selectedTags, setSelectedTags] = useState<string[]>(["React", "TypeScript"]);
  const [tagsList, setTagsList] = useState<string[]>(["Docker", "Kubernetes", "GraphQL", "Rust"]);

  const handleToggle = (tag: string, checked: boolean): void => {
    setSelectedTags((prev: string[]) =>
      checked ? [...prev, tag] : prev.filter((t: string) => t !== tag)
    );
  };

  const handleRemove = (tagToRemove: string): void => {
    setTagsList((prev: string[]) => prev.filter((t: string) => t !== tagToRemove));
  };

  const tagProps = [
    { property: "variant", description: "Color status style ('default' | 'primary' | 'success' | 'warning' | 'error' | 'info')", type: "string", default: "'default'" },
    { property: "size", description: "Dimension preset ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "closable", description: "Whether the tag can be closed with an 'x' icon", type: "boolean", default: "false" },
    { property: "onClose", description: "Callback fired when tag is closed", type: "() => void", default: "-" },
    { property: "checkable", description: "Whether the tag can be checked/selected like a chip", type: "boolean", default: "false" },
    { property: "checked", description: "Controlled checked state", type: "boolean", default: "false" },
    { property: "onChange", description: "Callback when checked state transitions", type: "(checked: boolean) => void", default: "-" },
    { property: "icon", description: "Optional icon prefix element", type: "ReactNode", default: "-" },
    { property: "color", description: "Custom background or border color override", type: "string", default: "-" },
    { property: "round", description: "Pill rounded shape", type: "boolean", default: "false" },
    { property: "disabled", description: "Disabled interactive state", type: "boolean", default: "false" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDTag / Tag / CDChip / Chip</h1>
        <p className="cinder-doc-lead">
          Compact visual label used for categorization, keyword tagging, filtering chips, and contextual status display.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDTag, Tag, CDChip, Chip &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>To mark and categorize content with keywords.</li>
          <li>For filtering items dynamically using selectable chips.</li>
          <li>To display dismissible metadata items such as active search filters or recipient lists.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Variants & Colors */}
          <DemoCard
            title="Semantic Status Variants"
            description="Built-in status colors styled with Cinder Slate token aesthetics."
            code={`import { CDTag, Tag } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <CDTag variant="default">Default</CDTag>
    <Tag variant="primary">Primary</Tag>
    <Tag variant="success">Success</Tag>
    <Tag variant="warning">Warning</Tag>
    <Tag variant="error">Error</Tag>
    <Tag variant="info">Info</Tag>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <CDTag variant="default">Default</CDTag>
              <Tag variant="primary">Primary</Tag>
              <Tag variant="success">Success</Tag>
              <Tag variant="warning">Warning</Tag>
              <Tag variant="error">Error</Tag>
              <Tag variant="info">Info</Tag>
            </div>
          </DemoCard>

          {/* Demo 2: Closable Tags */}
          <DemoCard
            title="Closable Tags"
            description="Tags with remove buttons, useful for active filters or multi-select tokens."
            code={`import { useState } from 'react';
import { Tag } from '@cinder-ui/core';

export default () => {
  const [tags, setTags] = useState(['Docker', 'Kubernetes', 'GraphQL', 'Rust']);

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {tags.map((t) => (
        <Tag key={t} closable onClose={() => setTags(tags.filter(x => x !== t))}>
          {t}
        </Tag>
      ))}
    </div>
  );
};`}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {tagsList.map((t: string) => (
                <Tag key={t} closable onClose={(): void => handleRemove(t)}>
                  {t}
                </Tag>
              ))}
              {tagsList.length === 0 && (
                <span style={{ fontSize: "12px", color: "var(--cinder-muted)" }}>
                  All tags removed.
                </span>
              )}
            </div>
          </DemoCard>

          {/* Demo 3: Selectable Chips */}
          <DemoCard
            title="Checkable Chips (Filtering)"
            description="Interactive filter chips with pressed states and pill round shapes."
            code={`import { useState } from 'react';
import { CDChip } from '@cinder-ui/core';

export default () => {
  const [selected, setSelected] = useState(['React', 'TypeScript']);
  const tech = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Python'];

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {tech.map((t) => (
        <CDChip
          key={t}
          checkable
          round
          checked={selected.includes(t)}
          onChange={(checked) => setSelected(checked ? [...selected, t] : selected.filter(x => x !== t))}
        >
          {t}
        </CDChip>
      ))}
    </div>
  );
};`}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["React", "TypeScript", "Next.js", "Tailwind", "Python"].map((t: string) => (
                <CDChip
                  key={t}
                  checkable
                  round
                  checked={selectedTags.includes(t)}
                  onChange={(checked: boolean): void => handleToggle(t, checked)}
                >
                  {t}
                </CDChip>
              ))}
            </div>
          </DemoCard>

          {/* Demo 4: Icon & Custom Colors */}
          <DemoCard
            title="Icon Prefix &amp; Custom Colors"
            description="Tags with vector icons and custom hex/HSL color overrides."
            code={`import { Tag, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Tag icon={<CDIcons.Sparkles size="sm" />} variant="primary">AI Powered</Tag>
    <Tag icon={<CDIcons.Flame size="sm" />} color="#f97316">Hotfix</Tag>
    <Tag icon={<CDIcons.Shield size="sm" />} color="#10b981">Verified</Tag>
    <Tag color="#8b5cf6">GraphQL</Tag>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Tag icon={<CDIcons.Sparkles size="sm" />} variant="primary">AI Powered</Tag>
              <Tag icon={<CDIcons.Flame size="sm" />} color="#f97316">Hotfix</Tag>
              <Tag icon={<CDIcons.Shield size="sm" />} color="#10b981">Verified</Tag>
              <Tag color="#8b5cf6">GraphQL</Tag>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <ApiTable title="CDTagProps API" data={tagProps} />
      </section>
    </div>
  );
}
