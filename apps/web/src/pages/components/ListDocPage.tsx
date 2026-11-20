import type { ReactElement } from "react";
import { List, ListItem, ListItemMeta, Avatar, CDTag, CDButton, CDIcons } from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function ListDocPage(): ReactElement {
  const listProps = [
    { property: "dataSource", description: "Array of data records to render", type: "T[]", default: "-" },
    { property: "renderItem", description: "Render function for each data item", type: "(item, index) => ReactNode", default: "-" },
    { property: "header", description: "Header slot text or element", type: "ReactNode", default: "-" },
    { property: "footer", description: "Footer slot text or element", type: "ReactNode", default: "-" },
    { property: "bordered", description: "Border outline around list container", type: "boolean", default: "true" },
    { property: "split", description: "Divider line between list items", type: "boolean", default: "true" },
    { property: "size", description: "Density preset ('sm' | 'md' | 'lg')", type: "string", default: "'md'" },
    { property: "loading", description: "Loading overlay state", type: "boolean", default: "false" },
    { property: "emptyText", description: "Message when list has no records", type: "ReactNode", default: "'No data available'" },
  ];

  const itemProps = [
    { property: "actions", description: "Array of action buttons or links on the right", type: "ReactNode[]", default: "-" },
    { property: "extra", description: "Thumbnail or extra metadata element", type: "ReactNode", default: "-" },
    { property: "children", description: "List item content or compound ListItem.Meta", type: "ReactNode", default: "-" },
  ];

  const metaProps = [
    { property: "avatar", description: "Avatar or icon element on the left", type: "ReactNode", default: "-" },
    { property: "title", description: "Primary title of the item", type: "ReactNode", default: "-" },
    { property: "description", description: "Secondary description copy below title", type: "ReactNode", default: "-" },
  ];

  const clusterNodes = [
    {
      id: "node-1",
      name: "cinder-us-east-1a",
      ip: "10.0.12.44",
      status: "Active",
      cpu: "32% CPU",
      ram: "4.2 GB / 16 GB",
    },
    {
      id: "node-2",
      name: "cinder-us-east-1b",
      ip: "10.0.12.45",
      status: "Active",
      cpu: "68% CPU",
      ram: "11.8 GB / 16 GB",
    },
    {
      id: "node-3",
      name: "cinder-eu-west-1a",
      ip: "10.0.18.90",
      status: "Degraded",
      cpu: "94% CPU",
      ram: "15.6 GB / 16 GB",
    },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDList / List</h1>
        <p className="antd-doc-lead">
          Versatile vertical list container for presenting rows of items, users, servers, logs, or metrics with actions and metadata.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDList, List, ListItem, ListItemMeta &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>Simple, formatted lists of resources, users, or activity feeds.</li>
          <li>When you need a structured layout with avatars, titles, descriptions, and action buttons.</li>
          <li>For high-density tables where full grid columns aren't needed.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic List with DataSource */}
          <DemoCard
            fullWidth
            title="Resource List with Actions (Full Width)"
            description="Clean full-width infrastructure compute list with square avatars, two-row typography, status tags, and action triggers."
            code={`import { List, ListItem, ListItemMeta, Avatar, CDTag, CDButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <List
    header="Active Compute Instances"
    footer="3 cluster nodes operational"
    dataSource={clusterNodes}
    renderItem={(item) => (
      <ListItem
        key={item.id}
        actions={[
          <CDButton size="sm" variant="ghost">Reboot</CDButton>,
          <CDButton size="sm" variant="secondary">Configure</CDButton>,
        ]}
      >
        <ListItemMeta
          avatar={
            <Avatar
              shape="square"
              size="lg"
              icon={<CDIcons.Flame size="sm" />}
            />
          }
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 600 }}>{item.name}</span>
              <CDTag variant={item.status === 'Active' ? 'success' : 'error'} size="sm">
                {item.status}
              </CDTag>
            </div>
          }
          description={\`IP: \${item.ip} • \${item.cpu} • \${item.ram}\`}
        />
      </ListItem>
    )}
  />
);`}
          >
            <List
              header="Active Compute Instances"
              footer="3 cluster nodes operational"
              dataSource={clusterNodes}
              style={{ width: "100%" }}
              renderItem={(item) => (
                <ListItem
                  key={item.id}
                  actions={[
                    <CDButton key="act-1" size="sm" variant="ghost">Reboot</CDButton>,
                    <CDButton key="act-2" size="sm" variant="secondary">Configure</CDButton>,
                  ]}
                >
                  <ListItemMeta
                    avatar={
                      <Avatar
                        shape="square"
                        size="lg"
                        icon={<CDIcons.Flame size="sm" />}
                        style={{
                          backgroundColor:
                            item.status === "Active"
                              ? "rgba(59, 130, 246, 0.12)"
                              : "rgba(239, 68, 68, 0.12)",
                          borderColor:
                            item.status === "Active"
                              ? "rgba(59, 130, 246, 0.3)"
                              : "rgba(239, 68, 68, 0.3)",
                          color:
                            item.status === "Active"
                              ? "var(--cinder-primary)"
                              : "var(--cinder-error)",
                        }}
                      />
                    }
                    title={
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--cinder-text)" }}>
                          {item.name}
                        </span>
                        <CDTag variant={item.status === "Active" ? "success" : "error"} size="sm">
                          {item.status}
                        </CDTag>
                      </div>
                    }
                    description={
                      <div style={{
                        fontFamily: "var(--cinder-font-mono, monospace)",
                        fontSize: "12px",
                        color: "var(--cinder-muted)",
                        marginTop: "4px"
                      }}>
                        IP: {item.ip} • {item.cpu} • {item.ram}
                      </div>
                    }
                  />
                </ListItem>
              )}
            />
          </DemoCard>

          {/* Demo 2: Compound JSX List */}
          <DemoCard
            title="Compound Declarative Usage"
            description="Build list items directly with compound JSX components."
            code={`import { List, ListItem, ListItemMeta, Avatar } from '@cinder-ui/core';

export default () => (
  <List>
    <ListItem>
      <ListItemMeta
        avatar={<Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />}
        title="Sarah Connor"
        description="Principal Systems Architect • Platform Engineering"
      />
    </ListItem>
    <ListItem>
      <ListItemMeta
        avatar={<Avatar>MN</Avatar>}
        title="Marcus Novak"
        description="Security Lead • Infrastructure Zero-Trust"
      />
    </ListItem>
  </List>
);`}
          >
            <List>
              <ListItem>
                <ListItemMeta
                  avatar={<Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />}
                  title="Sarah Connor"
                  description="Principal Systems Architect • Platform Engineering"
                />
              </ListItem>
              <ListItem>
                <ListItemMeta
                  avatar={<Avatar>MN</Avatar>}
                  title="Marcus Novak"
                  description="Security Lead • Infrastructure Zero-Trust"
                />
              </ListItem>
            </List>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <ApiTable title="CDListProps API" data={listProps} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable title="CDListItemProps API" data={itemProps} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable title="CDListItemMetaProps API" data={metaProps} />
        </div>
      </section>
    </div>
  );
}
