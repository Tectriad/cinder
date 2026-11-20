import type { ReactElement } from "react";
import { CDAlert, Alert, CDButton } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function AlertDocPage(): ReactElement {
  const alertProps = [
    { property: "type", description: "Semantic intent ('info' | 'success' | 'warning' | 'danger' | 'neutral')", type: "string", default: "'info'" },
    { property: "variant", description: "Visual presentation ('subtle' | 'solid' | 'outline' | 'banner')", type: "string", default: "'subtle'" },
    { property: "title", description: "Primary title of alert", type: "ReactNode", default: "-" },
    { property: "description", description: "Detailed description copy", type: "ReactNode", default: "-" },
    { property: "closable", description: "Whether to render dismiss close icon button", type: "boolean", default: "false" },
    { property: "onClose", description: "Callback fired when closed", type: "(e) => void", default: "-" },
    { property: "action", description: "Action slot (e.g. Button or Link)", type: "ReactNode", default: "-" },
    { property: "showIcon", description: "Whether to show status leading icon", type: "boolean", default: "true" },
    { property: "icon", description: "Custom leading icon element", type: "ReactNode", default: "-" },
    { property: "banner", description: "Banner mode with square corners and bottom border", type: "boolean", default: "false" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDAlert / Alert / Banner</h1>
        <p className="cinder-doc-lead">
          Displays an important, contextual feedback message or persistent announcement bar for user actions and system status.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDAlert, Alert, CDBanner &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>When you need to alert the user with non-modal operational feedback.</li>
          <li>For system notifications, deployment announcements, warnings, or errors.</li>
          <li>Banner mode for sticky, full-bleed notices at the top of pages or cards.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Semantic Types */}
          <DemoCard
            title="Semantic Alert Types"
            description="Four primary feedback schemes: Info, Success, Warning, and Danger."
            code={`import { CDAlert } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <CDAlert
      type="info"
      title="Environment Setup"
      description="System dependencies and configuration files were synchronized."
    />
    <CDAlert
      type="success"
      title="Build Completed"
      description="Production bundle successfully generated in 1.14s."
    />
    <CDAlert
      type="warning"
      title="High Memory Usage"
      description="Workspace memory exceeded 85% of allocated limits."
    />
    <CDAlert
      type="danger"
      title="Deployment Failed"
      description="Connection timed out while attempting to reach us-east edge nodes."
    />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <CDAlert
                type="info"
                title="Environment Setup"
                description="System dependencies and configuration files were synchronized."
              />
              <CDAlert
                type="success"
                title="Build Completed"
                description="Production bundle successfully generated in 1.14s."
              />
              <CDAlert
                type="warning"
                title="High Memory Usage"
                description="Workspace memory exceeded 85% of allocated limits."
              />
              <CDAlert
                type="danger"
                title="Deployment Failed"
                description="Connection timed out while attempting to reach us-east edge nodes."
              />
            </div>
          </DemoCard>

          {/* Demo 2: Style Variants */}
          <DemoCard
            title="Style Variants"
            description="Supports subtle (tinted with border), solid (high emphasis fill), and outline."
            code={`import { CDAlert, Alert } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Alert variant="subtle" type="info" title="Subtle Variant (Default)" description="Low-contrast background for inline feedback." />
    <Alert variant="solid" type="info" title="Solid High-Emphasis" description="Solid background for critical system notices." />
    <Alert variant="outline" type="info" title="Outline Variant" description="Clean border outline with transparent background." />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <Alert variant="subtle" type="info" title="Subtle Variant (Default)" description="Low-contrast background for inline feedback." />
              <Alert variant="solid" type="info" title="Solid High-Emphasis" description="Solid background for critical system notices." />
              <Alert variant="outline" type="info" title="Outline Variant" description="Clean border outline with transparent background." />
            </div>
          </DemoCard>

          {/* Demo 3: Closable with Actions */}
          <DemoCard
            title="Closable with Actions"
            description="Interactive dismiss button and custom action buttons."
            code={`import { CDAlert, CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <CDAlert
      type="warning"
      title="Database Migration Pending"
      description="Schema updates require 2 minutes of planned downtime."
      closable
      action={<CDButton size="sm" variant="secondary">Review Plan</CDButton>}
    />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <CDAlert
                type="warning"
                title="Database Migration Pending"
                description="Schema updates require 2 minutes of planned downtime."
                closable
                action={<CDButton size="sm" variant="secondary">Review Plan</CDButton>}
              />
            </div>
          </DemoCard>

          {/* Demo 4: Banner Mode */}
          <DemoCard
            title="Banner Mode"
            description="Edge-to-edge full width announcement banner with square corners."
            code={`import { CDAlert } from '@cinder-ui/core';

export default () => (
  <CDAlert
    banner
    type="info"
    title="Scheduled Maintenance"
    description="API services will undergo database optimization this Saturday at 02:00 UTC."
    closable
  />
);`}
          >
            <div style={{ width: "100%", overflow: "hidden", borderRadius: "8px", border: "1px solid var(--cinder-border)" }}>
              <CDAlert
                banner
                type="info"
                title="Scheduled Maintenance"
                description="API services will undergo database optimization this Saturday at 02:00 UTC."
                closable
              />
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={alertProps} />
      </section>
    </div>
  );
}
