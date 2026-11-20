import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function CardDocPage() {
  const cardProps = [
    { property: "variant", description: "Visual style ('surface' | 'glass' | 'outline')", type: "string", default: "'surface'" },
    { property: "interactive", description: "Whether card lifts on hover with elevation shadow", type: "boolean", default: "false" },
    { property: "children", description: "Card content or compound elements", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">
          CDCard / Card
        </h1>
        <p className="antd-doc-lead">
          A container for displaying related information or actions with optional frosted glass elevation.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDCard, CDCardHeader, CDCardTitle, CDCardDescription, CDCardContent, CDCardFooter, Card &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>A card can be used to display content containing different elements.</li>
          <li>It can contain data, images, text, and operational buttons in a clean enclosed container.</li>
          <li>Use <code>interactive</code> for cards that act as navigable links or click triggers.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          <DemoCard
            title="Basic Card"
            description="Standard card composed of header, title, description, content, and footer."
            code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@cinder-ui/core';

export default () => (
  <Card variant="surface" style={{ width: '100%', maxWidth: '380px' }}>
    <CardHeader>
      <CardTitle>Editorial Workspace</CardTitle>
      <CardDescription>Cinder Slate design system environment</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: '13px', color: 'var(--cinder-muted)' }}>
        Muted low-glare charcoal canvas with terracotta ember focus points.
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="primary" size="sm">Action</Button>
    </CardFooter>
  </Card>
);`}
          >
            <Card variant="surface" style={{ width: "100%", maxWidth: "380px" }}>
              <CardHeader>
                <CardTitle>Editorial Workspace</CardTitle>
                <CardDescription>Cinder Slate design system environment</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                  Muted low-glare charcoal canvas with terracotta ember focus points.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Action</Button>
              </CardFooter>
            </Card>
          </DemoCard>

          <DemoCard
            title="Interactive & Glass"
            description="Cards can have frosted glass blur or interactive hover transitions."
            code={`import { Card, CardTitle, CardDescription, Badge } from '@cinder-ui/core';

export default () => (
  <Card variant="glass" interactive style={{ width: '100%', maxWidth: '380px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <Badge variant="primary" size="sm">Interactive</Badge>
      <span style={{ fontSize: '11px', color: 'var(--cinder-muted)' }}>Hover me</span>
    </div>
    <CardTitle>Frosted Glass Panel</CardTitle>
    <CardDescription style={{ marginTop: '6px' }}>
      Renders with a 16px ambient blur and subtle elevation shadow.
    </CardDescription>
  </Card>
);`}
          >
            <Card variant="glass" interactive style={{ width: "100%", maxWidth: "380px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <Badge variant="primary" size="sm">Interactive</Badge>
                <span style={{ fontSize: "11px", color: "var(--cinder-muted)" }}>Hover me</span>
              </div>
              <CardTitle>Frosted Glass Panel</CardTitle>
              <CardDescription style={{ marginTop: "6px" }}>
                Renders with a 16px ambient blur and subtle elevation shadow.
              </CardDescription>
            </Card>
          </DemoCard>

          {/* Demo 3: Structured Header & Extra Action */}
          <DemoCard
            title="Declarative Header with Extra Slot"
            description="Card using top-level title and right-aligned extra action slot."
            code={`import { Card, CDButton, Badge } from '@cinder-ui/core';

export default () => (
  <Card
    title="Production Ingress Gateway"
    description="Active Envoy proxy edge termination"
    extra={<Badge variant="success" dot size="sm">Operational</Badge>}
    hoverable
    style={{ width: '100%', maxWidth: '380px' }}
  >
    <p style={{ margin: 0, fontSize: '13px', color: 'var(--cinder-muted)' }}>
      Handling 142k requests per second across 3 availability zones with automated TLS certificates.
    </p>
    <div style={{ marginTop: '16px' }}>
      <CDButton size="sm" variant="secondary">View Metrics</CDButton>
    </div>
  </Card>
);`}
          >
            <Card
              title="Production Ingress Gateway"
              description="Active Envoy proxy edge termination"
              extra={<Badge variant="success" dot size="sm">Operational</Badge>}
              hoverable
              style={{ width: "100%", maxWidth: "380px" }}
            >
              <p style={{ margin: 0, fontSize: "13px", color: "var(--cinder-muted)" }}>
                Handling 142k requests per second across 3 availability zones with automated TLS certificates.
              </p>
              <div style={{ marginTop: "16px" }}>
                <Button size="sm" variant="secondary">View Metrics</Button>
              </div>
            </Card>
          </DemoCard>

          {/* Demo 4: Loading State */}
          <DemoCard
            title="Loading Skeleton State"
            description="Card with loading=true displaying smooth shimmer skeleton placeholders."
            code={`import { Card } from '@cinder-ui/core';

export default () => (
  <Card title="Database Performance" loading style={{ width: '100%', maxWidth: '380px' }}>
    <p>Card body content</p>
  </Card>
);`}
          >
            <Card title="Database Performance" loading style={{ width: "100%", maxWidth: "380px" }}>
              <p>Card body content</p>
            </Card>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <ApiTable title="Card API" data={cardProps} />
      </section>
    </div>
  );
}
