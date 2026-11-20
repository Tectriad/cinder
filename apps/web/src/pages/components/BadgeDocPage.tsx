import type { ReactElement } from "react";
import { CDBadge, Badge, CDButton, CDIcons } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function BadgeDocPage(): ReactElement {
  const badgeProps = [
    { property: "count", description: "Numerical count or element to display", type: "number | ReactNode", default: "-" },
    { property: "overflowCount", description: "Max count threshold before showing '+'", type: "number", default: "99" },
    { property: "showZero", description: "Whether to render badge when count is 0", type: "boolean", default: "false" },
    { property: "dot", description: "Display compact circular status dot without text", type: "boolean", default: "false" },
    { property: "pulse", description: "Animated pulsing ripple on dot", type: "boolean", default: "false" },
    { property: "status", description: "Semantic status dot preset ('success' | 'processing' | 'error' | 'warning' | 'default')", type: "string", default: "-" },
    { property: "text", description: "Accompanying label text for standalone status dot", type: "ReactNode", default: "-" },
    { property: "variant", description: "Color status style for pill badge", type: "'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger'", default: "'default'" },
    { property: "size", description: "Dimension preset ('sm' | 'md' | 'lg')", type: "'sm' | 'md' | 'lg'", default: "'md'" },
    { property: "shape", description: "Corner radius geometry ('round' | 'square')", type: "'round' | 'square'", default: "'round'" },
    { property: "children", description: "Target element to anchor badge onto top-right", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDBadge / Badge</h1>
        <p className="cinder-doc-lead">
          Small numerical indicator, status pill, or notification dot used to emphasize the state of an item or trigger.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDBadge, Badge &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>To display unread messages, notification counts, or pending task alerts over icons and buttons.</li>
          <li>For status classification (Processing, Healthy, Warning, Archived).</li>
          <li>Overlaid on top-right corners with overflow cap (e.g. 99+).</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Standalone Status Pills */}
          <DemoCard
            title="Standalone Status Pills"
            description="Status pills with semantic Cinder Slate color tokens and optional pulsing dot."
            code={`import { CDBadge, Badge } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <CDBadge variant="primary" dot pulse>Live Production</CDBadge>
    <Badge variant="accent" dot>In Review</Badge>
    <Badge variant="success" dot pulse>Healthy</Badge>
    <Badge variant="warning" dot>Pending Approval</Badge>
    <Badge variant="danger" dot>Service Outage</Badge>
    <Badge variant="default">Archived</Badge>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <CDBadge variant="primary" dot pulse>Live Production</CDBadge>
              <Badge variant="accent" dot>In Review</Badge>
              <Badge variant="success" dot pulse>Healthy</Badge>
              <Badge variant="warning" dot>Pending Approval</Badge>
              <Badge variant="danger" dot>Service Outage</Badge>
              <Badge variant="default">Archived</Badge>
            </div>
          </DemoCard>

          {/* Demo 2: Overlaid Notification Count */}
          <DemoCard
            title="Overlaid Notification Count"
            description="Badge automatically anchors to the top-right corner of child components with border separation."
            code={`import { Badge, CDButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <Badge count={5}>
      <CDButton variant="secondary">Inbox Messages</CDButton>
    </Badge>
    <Badge count={24}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        background: 'var(--cinder-surface)',
        border: '1px solid var(--cinder-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CDIcons.Bell size={18} />
      </div>
    </Badge>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <Badge count={5}>
                <CDButton variant="secondary">Inbox Messages</CDButton>
              </Badge>
              <Badge count={24}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "var(--cinder-surface)",
                  border: "1px solid var(--cinder-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cinder-text)",
                }}>
                  <CDIcons.Mail size={18} />
                </div>
              </Badge>
            </div>
          </DemoCard>

          {/* Demo 3: Overflow Count & Zero */}
          <DemoCard
            title="Overflow Threshold"
            description="When count exceeds overflowCount (default 99), it truncates gracefully to '99+'."
            code={`import { Badge, CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <Badge count={99}>
      <CDButton variant="secondary">Notifications</CDButton>
    </Badge>
    <Badge count={100}>
      <CDButton variant="secondary">Alerts (99+)</CDButton>
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <CDButton variant="secondary">Big Count (999+)</CDButton>
    </Badge>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <Badge count={99}>
                <CDButton variant="secondary">Notifications</CDButton>
              </Badge>
              <Badge count={100}>
                <CDButton variant="secondary">Alerts (99+)</CDButton>
              </Badge>
              <Badge count={1000} overflowCount={999}>
                <CDButton variant="secondary">Big Count (999+)</CDButton>
              </Badge>
            </div>
          </DemoCard>

          {/* Demo 4: Standalone Status Indicators */}
          <DemoCard
            title="Status Indicators"
            description="Clean status dots with accompanying text label for tables, lists, and activity feeds."
            code={`import { Badge } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Badge status="success" text="System Operational" />
    <Badge status="processing" text="Build Pipeline Running" />
    <Badge status="warning" text="Rate Limit Warning" />
    <Badge status="error" text="Payment Failed" />
    <Badge status="default" text="Idle Agent" />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Badge status="success" text="System Operational" />
              <Badge status="processing" text="Build Pipeline Running" />
              <Badge status="warning" text="Rate Limit Warning" />
              <Badge status="error" text="Payment Failed" />
              <Badge status="default" text="Idle Agent" />
            </div>
          </DemoCard>

          {/* Demo 5: Dot Badge */}
          <DemoCard
            title="Dot Badge"
            description="Reduces notification to a discrete dot indicator without numerical count."
            code={`import { Badge, CDButton } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
    <Badge dot>
      <CDButton variant="secondary">Updates Available</CDButton>
    </Badge>
    <Badge dot pulse>
      <CDButton variant="glass">Live Activity</CDButton>
    </Badge>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Badge dot>
                <CDButton variant="secondary">Updates Available</CDButton>
              </Badge>
              <Badge dot pulse>
                <CDButton variant="glass">Live Activity</CDButton>
              </Badge>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={badgeProps} />
      </section>
    </div>
  );
}
