import type { ReactElement } from "react";
import { Accordion, CDAccordionItem, CDTag, CDBadge } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function AccordionDocPage(): ReactElement {
  const accordionProps = [
    { property: "items", description: "Array of panel configurations", type: "CDAccordionItemConfig[]", default: "-" },
    { property: "accordion", description: "Whether only one panel can be open at a time", type: "boolean", default: "false" },
    { property: "defaultActiveKeys", description: "Initial active key(s)", type: "(string | number)[]", default: "[]" },
    { property: "activeKeys", description: "Controlled active key(s)", type: "(string | number)[]", default: "-" },
    { property: "onChange", description: "Callback fired when active panels change", type: "(keys) => void", default: "-" },
    { property: "variant", description: "Visual presentation ('surface' | 'ghost' | 'bordered')", type: "string", default: "'surface'" },
    { property: "children", description: "Compound <CDAccordion.Item> elements", type: "ReactNode", default: "-" },
  ];

  const itemProps = [
    { property: "key", description: "Unique identifier for the panel", type: "string | number", default: "-" },
    { property: "title", description: "Primary title in header", type: "ReactNode", default: "-" },
    { property: "subtitle", description: "Secondary subtitle text below title", type: "ReactNode", default: "-" },
    { property: "extra", description: "Right-aligned action or badge element", type: "ReactNode", default: "-" },
    { property: "disabled", description: "Disable panel interaction", type: "boolean", default: "false" },
    { property: "children", description: "Panel body content", type: "ReactNode", default: "-" },
  ];

  const sampleItems = [
    {
      key: "cluster",
      title: "Kubernetes Cluster Auto-Scaling",
      subtitle: "Dynamic replica management with HPA and Karpenter",
      extra: <CDTag variant="success" size="sm">Active</CDTag>,
      children: (
        <p style={{ margin: 0, color: "var(--cinder-muted)" }}>
          Automatic scaling policies evaluate CPU and memory utilization thresholds every 15 seconds.
          When workload demand surges, new compute nodes are provisioned in under 45 seconds.
        </p>
      ),
    },
    {
      key: "ingress",
      title: "Global Ingress & TLS Termination",
      subtitle: "Edge routing across 24 geo-distributed points of presence",
      extra: <CDBadge variant="primary" size="sm">TLS 1.3</CDBadge>,
      children: (
        <p style={{ margin: 0, color: "var(--cinder-muted)" }}>
          Incoming traffic routes through our global anycast network with automated Let's Encrypt certificate renewal.
          DDoS scrubbing centers handle high-volume volumetric layer 7 attacks.
        </p>
      ),
    },
    {
      key: "storage",
      title: "Distributed NVMe Volume Backups",
      subtitle: "Hourly incremental snapshots replicated to cold multi-region vaults",
      extra: <CDTag variant="default" size="sm">Snapshot</CDTag>,
      children: (
        <p style={{ margin: 0, color: "var(--cinder-muted)" }}>
          Point-in-time recovery supports instant volume restores with zero downtime for stateful databases.
        </p>
      ),
    },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDAccordion / Accordion / Collapse</h1>
        <p className="antd-doc-lead">
          Collapsible panel stack for organizing dense content, frequently asked questions, or multistep operational procedures.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDAccordion, Accordion, CDAccordionItem &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>When you need to organize large amounts of information in a clean, compact vertical space.</li>
          <li>For FAQ lists, configuration accordions, or step-by-step troubleshooting logs.</li>
          <li>Use <code>accordion</code> mode to keep exactly one panel visible at a time.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic Accordion */}
          <DemoCard
            title="Configuration Array Pattern"
            description="Accordion rendered from a clean typed data array with subtitles and status tags."
            code={`import { Accordion, CDTag, CDBadge } from '@cinder-ui/core';

export default () => (
  <Accordion
    defaultActiveKeys={['cluster']}
    items={[
      {
        key: 'cluster',
        title: 'Kubernetes Cluster Auto-Scaling',
        subtitle: 'Dynamic replica management',
        extra: <CDTag variant="success" size="sm">Active</CDTag>,
        children: 'Auto-scaling evaluates thresholds every 15 seconds.',
      },
      {
        key: 'ingress',
        title: 'Global Ingress & TLS Termination',
        extra: <CDBadge variant="primary" size="sm">TLS 1.3</CDBadge>,
        children: 'Incoming traffic routes through our global network.',
      },
    ]}
  />
);`}
          >
            <Accordion defaultActiveKeys={["cluster"]} items={sampleItems} />
          </DemoCard>

          {/* Demo 2: Single Expansion (Accordion Mode) */}
          <DemoCard
            title="Single Panel Expansion (Accordion Mode)"
            description="When opening any panel, previously expanded panels automatically collapse."
            code={`import { Accordion, CDAccordionItem } from '@cinder-ui/core';

export default () => (
  <Accordion accordion defaultActiveKeys={['step1']}>
    <CDAccordionItem key="step1" title="Step 1: Environment Provisioning">
      Configure cloud API credentials and IAM roles for infrastructure management.
    </CDAccordionItem>
    <CDAccordionItem key="step2" title="Step 2: Database Migration">
      Execute schema migrations and verify foreign key consistency across tables.
    </CDAccordionItem>
    <CDAccordionItem key="step3" title="Step 3: Traffic Switchover">
      Route production traffic to the new cluster with 10% canary traffic.
    </CDAccordionItem>
  </Accordion>
);`}
          >
            <Accordion accordion defaultActiveKeys={["step1"]}>
              <CDAccordionItem key="step1" title="Step 1: Environment Provisioning">
                Configure cloud API credentials and IAM roles for infrastructure management.
              </CDAccordionItem>
              <CDAccordionItem key="step2" title="Step 2: Database Migration">
                Execute schema migrations and verify foreign key consistency across tables.
              </CDAccordionItem>
              <CDAccordionItem key="step3" title="Step 3: Traffic Switchover">
                Route production traffic to the new cluster with 10% canary traffic.
              </CDAccordionItem>
            </Accordion>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <ApiTable title="CDAccordionProps API" data={accordionProps} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable title="CDAccordionItemProps API" data={itemProps} />
        </div>
      </section>
    </div>
  );
}
