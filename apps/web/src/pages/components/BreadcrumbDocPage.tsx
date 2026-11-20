import type { ReactElement } from "react";
import { CDBreadcrumb, CDIcons } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function BreadcrumbDocPage(): ReactElement {
  const breadcrumbProps = [
    { property: "items", description: "Array of breadcrumb items with title, href, and icon", type: "CDBreadcrumbItemData[]", default: "-" },
    { property: "separator", description: "Custom separator icon or string between items", type: "ReactNode", default: "<CDChevronRightIcon size={12} />" },
    { property: "maxItems", description: "Maximum number of items to show before collapsing middle items with ellipsis", type: "number", default: "-" },
    { property: "children", description: "Compound <CDBreadcrumbItem> children elements", type: "ReactNode", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDBreadcrumb / Breadcrumbs</h1>
        <p className="antd-doc-lead">
          Hierarchy navigation indicator displaying the user position within an application site structure with automatic middle collapsing.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDBreadcrumb, CDBreadcrumbItem, Breadcrumb &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>When an application has a deep hierarchical structure with 2 or more levels.</li>
          <li>To help users understand their current page context and easily navigate back to parent levels.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic & Icon Breadcrumbs */}
          <DemoCard
            title="Basic & Icon Breadcrumbs"
            description="Declarative breadcrumbs with icons and accessible link targets."
            code={`import { CDBreadcrumb, CDIcons } from '@cinder-ui/core';

export default () => (
  <CDBreadcrumb
    items={[
      { title: 'Home', href: '/', icon: <CDIcons.Box size={14} /> },
      { title: 'Workspaces', href: '/workspaces' },
      { title: 'Cluster us-east-1', href: '/workspaces/us-east-1' },
      { title: 'Compute Instances' },
    ]}
  />
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <CDBreadcrumb
                items={[
                  { title: "Home", href: "#", icon: <CDIcons.Box size={14} /> },
                  { title: "Workspaces", href: "#" },
                  { title: "Cluster us-east-1", href: "#" },
                  { title: "Compute Instances" },
                ]}
              />
            </div>
          </DemoCard>

          {/* Demo 2: Max Items with Ellipsis Collapsing */}
          <DemoCard
            title="Ellipsis Collapsing"
            description="When maxItems is set, intermediate deep hierarchy crumbs collapse into an interactive expandable pill."
            code={`import { CDBreadcrumb } from '@cinder-ui/core';

export default () => (
  <CDBreadcrumb
    maxItems={3}
    items={[
      { title: 'Home', href: '/' },
      { title: 'Settings', href: '/settings' },
      { title: 'Network', href: '/settings/network' },
      { title: 'VPC Peering', href: '/settings/network/vpc' },
      { title: 'Security Groups' },
    ]}
  />
);`}
          >
            <CDBreadcrumb
              maxItems={3}
              items={[
                { title: "Home", href: "#" },
                { title: "Settings", href: "#" },
                { title: "Network", href: "#" },
                { title: "VPC Peering", href: "#" },
                { title: "Security Groups" },
              ]}
            />
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={breadcrumbProps} />
      </section>
    </div>
  );
}
