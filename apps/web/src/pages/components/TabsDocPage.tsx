import { useState, type ReactElement } from "react";
import { CDTabs, CDTabList, CDTab, CDTabPanel, CDBadge, CDIcons } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function TabsDocPage(): ReactElement {
  const [tabKey, setTabKey] = useState<string>("code");

  const tabsProps = [
    { property: "value", description: "Controlled active tab key identifier", type: "string", default: "-" },
    { property: "defaultValue", description: "Default active tab key when uncontrolled", type: "string", default: "-" },
    { property: "onChange", description: "Callback triggered when active tab changes", type: "(key: string) => void", default: "-" },
    { property: "variant", description: "Visual tab appearance ('line' | 'enclosed' | 'pills' | 'segment')", type: "string", default: "'line'" },
    { property: "orientation", description: "Tabs direction layout ('horizontal' | 'vertical')", type: "string", default: "'horizontal'" },
    { property: "size", description: "Size scale ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "items", description: "Declarative array of tab items with keys, labels, badges, and panels", type: "CDTabItem[]", default: "-" },
    { property: "onClose", description: "Callback triggered when closable tab 'x' button is clicked", type: "(key: string) => void", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">CDTabs / Tabs</h1>
        <p className="cinder-doc-lead">
          Versatile tabbed switching primitive supporting line underlines, enclosed folders, pills, and segmented controls with full keyboard accessibility.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDTabs, CDTabList, CDTab, CDTabPanel, Tabs &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li>To switch between related views or data filters within the same context without page reloads.</li>
          <li>For multi-view editors, settings dialogs, or dashboard panel segmentations.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Declarative Tab Items */}
          <DemoCard
            title="Line & Segment Variants"
            description="Use the declarative items prop or compound components with line, enclosed, pills, or segment styling."
            code={`import { CDTabs } from '@cinder-ui/core';

export default () => (
  <CDTabs
    variant="line"
    defaultValue="tab1"
    items={[
      { key: 'tab1', label: 'Overview', children: <div>Overview content panel.</div> },
      { key: 'tab2', label: 'Metrics', children: <div>Performance metrics and cluster telemetries.</div> },
      { key: 'tab3', label: 'Logs', children: <div>Live runtime logs and tail feeds.</div> },
    ]}
  />
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <CDTabs
                variant="line"
                defaultValue="tab1"
                items={[
                  { key: "tab1", label: "Overview", children: <div style={{ fontSize: "14px", color: "var(--cinder-muted)" }}>Overview content panel with live resource metrics.</div> },
                  { key: "tab2", label: "Metrics", children: <div style={{ fontSize: "14px", color: "var(--cinder-muted)" }}>Performance metrics, CPU thresholds, and cluster telemetries.</div> },
                  { key: "tab3", label: "Logs", children: <div style={{ fontSize: "14px", color: "var(--cinder-muted)" }}>Live runtime system logs and log tail feeds.</div> },
                ]}
              />

              <CDTabs
                variant="segment"
                defaultValue="day"
                items={[
                  { key: "day", label: "Day", children: <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>Displaying daily aggregation stats.</div> },
                  { key: "week", label: "Week", children: <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>Displaying weekly summary charts.</div> },
                  { key: "month", label: "Month", children: <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>Displaying monthly billing rollup.</div> },
                ]}
              />
            </div>
          </DemoCard>

          {/* Demo 2: Pills & Icons with Badges */}
          <DemoCard
            title="Pills Variant with Icons & Badges"
            description="Compound tab architecture with icons and notification count badges."
            code={`import { CDTabs, CDTabList, CDTab, CDTabPanel, CDBadge, CDIcons } from '@cinder-ui/core';

export default () => {
  const [tabKey, setTabKey] = useState('code');

  return (
    <CDTabs variant="pills" value={tabKey} onChange={setTabKey}>
      <CDTabList>
        <CDTab value="code" icon={<CDIcons.Code size={14} />}>Source Code</CDTab>
        <CDTab value="pulls" icon={<CDIcons.Flame size={14} />} badge={<CDBadge variant="primary" size="sm">4</CDBadge>}>Pull Requests</CDTab>
        <CDTab value="security" icon={<CDIcons.Shield size={14} />}>Security</CDTab>
      </CDTabList>
      <CDTabPanel value="code">Source code tree repository viewer.</CDTabPanel>
      <CDTabPanel value="pulls">4 open pull requests awaiting review.</CDTabPanel>
      <CDTabPanel value="security">0 vulnerabilities detected.</CDTabPanel>
    </CDTabs>
  );
};`}
          >
            <CDTabs variant="pills" value={tabKey} onChange={setTabKey}>
              <CDTabList>
                <CDTab value="code" icon={<CDIcons.Code size={14} />}>Source Code</CDTab>
                <CDTab value="pulls" icon={<CDIcons.Flame size={14} />} badge={<CDBadge variant="primary" size="sm">4</CDBadge>}>Pull Requests</CDTab>
                <CDTab value="security" icon={<CDIcons.Shield size={14} />}>Security</CDTab>
              </CDTabList>
              <div style={{ marginTop: "12px", fontSize: "13px", color: "var(--cinder-muted)" }}>
                <CDTabPanel value="code">Source code tree repository viewer with branch selector.</CDTabPanel>
                <CDTabPanel value="pulls">4 open pull requests awaiting peer review and automated CI checks.</CDTabPanel>
                <CDTabPanel value="security">Automated SBOM dependency scan: 0 known vulnerabilities found.</CDTabPanel>
              </div>
            </CDTabs>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Reference</h2>
        <ApiTable data={tabsProps} />
      </section>
    </div>
  );
}
