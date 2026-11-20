import type { ReactElement } from "react";
import { CDLink, Link, CDIcons } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function LinkDocPage(): ReactElement {
  const linkProps = [
    { property: "href", description: "Hyperlink target destination URL", type: "string", default: "-" },
    { property: "variant", description: "Visual color intent ('default' | 'primary' | 'muted' | 'subtle' | 'danger')", type: "string", default: "'primary'" },
    { property: "underline", description: "Underline behavior ('none' | 'hover' | 'always')", type: "string", default: "'hover'" },
    { property: "size", description: "Text typography sizing preset ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "external", description: "Open link in a new tab with rel='noopener noreferrer' and external icon", type: "boolean", default: "false" },
    { property: "disabled", description: "Disable interaction and prevent navigation", type: "boolean", default: "false" },
    { property: "prefixIcon", description: "Vector icon displayed before the link text", type: "ReactNode", default: "-" },
    { property: "suffixIcon", description: "Vector icon displayed after the link text", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDLink / Link</h1>
        <p className="cinder-doc-lead">
          Semantic hyperlinking primitive with Cinder Slate color tokens, external link indicators, prefix icons, and keyboard navigation.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDLink, Link &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>For navigating between web pages, anchor targets, or external documentation resources.</li>
          <li>When inline action prompts require standard hyperlink semantics with focus rings and hover transitions.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Variants & Sizes */}
          <DemoCard
            title="Link Variants & Sizing"
            description="Explore primary, default, muted, and danger color variants across sm, md, and lg sizes."
            code={`import { CDLink, Link } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <CDLink href="#primary" variant="primary">Primary Link</CDLink>
      <Link href="#default" variant="default">Default Link</Link>
      <Link href="#muted" variant="muted">Muted Link</Link>
      <Link href="#danger" variant="danger">Danger Link</Link>
    </div>
    <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
      <CDLink href="#sm" size="sm">Small (13px)</CDLink>
      <CDLink href="#md" size="md">Medium (14px)</CDLink>
      <CDLink href="#lg" size="lg">Large (16px)</CDLink>
    </div>
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <CDLink href="#primary" variant="primary">Primary Link</CDLink>
                <Link href="#default" variant="default">Default Link</Link>
                <Link href="#muted" variant="muted">Muted Link</Link>
                <Link href="#danger" variant="danger">Danger Link</Link>
              </div>
              <div style={{ display: "flex", gap: "16px", alignItems: "baseline", flexWrap: "wrap" }}>
                <CDLink href="#sm" size="sm">Small (13px)</CDLink>
                <CDLink href="#md" size="md">Medium (14px)</CDLink>
                <CDLink href="#lg" size="lg">Large (16px)</CDLink>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: External Links & Icons */}
          <DemoCard
            title="External Links & Icons"
            description="Automatic external security headers with clean vector arrow indicators and prefix iconography."
            code={`import { CDLink, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
    <CDLink href="https://github.com" external>
      GitHub Documentation
    </CDLink>
    <CDLink href="#settings" prefixIcon={<CDIcons.Settings size={14} />}>
      Account Settings
    </CDLink>
    <CDLink href="#disabled" disabled>
      Disabled Link
    </CDLink>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
              <CDLink href="https://github.com" external>
                GitHub Documentation
              </CDLink>
              <CDLink href="#settings" prefixIcon={<CDIcons.Settings size={14} />}>
                Account Settings
              </CDLink>
              <CDLink href="#disabled" disabled>
                Disabled Link
              </CDLink>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={linkProps} />
      </section>
    </div>
  );
}
