import { useState, type ReactElement } from "react";
import {
  CDSidebar,
  CDSidebarHeader,
  CDSidebarContent,
  CDSidebarFooter,
  CDSidebarGroup,
  CDSidebarItem,
  CDBadge,
  CDButton,
  CDIcons,
  type CDSidebarPlacement,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function SidebarDocPage(): ReactElement {
  const [placement, setPlacement] = useState<CDSidebarPlacement>("left");
  const [isFloating, setIsFloating] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("overview");

  const sidebarProps = [
    { property: "placement", description: "Placement anchor edge ('left' | 'right' | 'top' | 'bottom')", type: "string", default: "'left'" },
    { property: "position", description: "Alias for placement ('left' | 'right' | 'top' | 'bottom')", type: "string", default: "'left'" },
    { property: "floating", description: "Floating island mode with elevated shadow and backdrop blur", type: "boolean", default: "false" },
    { property: "collapsed", description: "Controlled collapsed state showing icons only", type: "boolean", default: "false" },
    { property: "onCollapse", description: "Callback triggered when collapse toggle button is clicked", type: "(collapsed: boolean) => void", default: "-" },
    { property: "collapsible", description: "Render an accessible collapse toggle button", type: "boolean", default: "true" },
    { property: "width", description: "Expanded sidebar width in pixels or CSS unit (for left/right)", type: "number | string", default: "260" },
    { property: "collapsedWidth", description: "Collapsed sidebar width in pixels or CSS unit (for left/right)", type: "number | string", default: "68" },
    { property: "height", description: "Expanded sidebar height in pixels or CSS unit (for top/bottom)", type: "number | string", default: "64" },
    { property: "collapsedHeight", description: "Collapsed sidebar height in pixels or CSS unit (for top/bottom)", type: "number | string", default: "44" },
    { property: "variant", description: "Sidebar style variant ('default' | 'floating' | 'inset')", type: "string", default: "'default'" },
    { property: "bordered", description: "Render border separator on the boundary edge", type: "boolean", default: "true" },
  ];

  const isHorizontal: boolean = placement === "top" || placement === "bottom";

  const renderSidebar = (): ReactElement => (
    <CDSidebar
      placement={placement}
      floating={isFloating}
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <CDSidebarHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CDIcons.Layers size={18} color="var(--cinder-primary)" />
          {(!collapsed || isHorizontal) && (
            <span style={{ fontWeight: 600, fontSize: "14px", whiteSpace: "nowrap" }}>
              DevOps Studio
            </span>
          )}
        </div>
      </CDSidebarHeader>
      <CDSidebarContent>
        <CDSidebarGroup title="Platform">
          <CDSidebarItem
            icon={<CDIcons.Box size={16} />}
            active={activeItem === "overview"}
            onClick={() => setActiveItem("overview")}
          >
            Overview
          </CDSidebarItem>
          <CDSidebarItem
            icon={<CDIcons.Terminal size={16} />}
            active={activeItem === "pipelines"}
            badge={<CDBadge variant="primary" size="sm">Active</CDBadge>}
            onClick={() => setActiveItem("pipelines")}
          >
            Pipelines
          </CDSidebarItem>
          <CDSidebarItem
            icon={<CDIcons.Database size={16} />}
            active={activeItem === "clusters"}
            onClick={() => setActiveItem("clusters")}
          >
            Clusters
          </CDSidebarItem>
        </CDSidebarGroup>
        <CDSidebarGroup title="System">
          <CDSidebarItem
            icon={<CDIcons.Settings size={16} />}
            active={activeItem === "settings"}
            onClick={() => setActiveItem("settings")}
          >
            Settings
          </CDSidebarItem>
        </CDSidebarGroup>
      </CDSidebarContent>
      <CDSidebarFooter>
        <CDSidebarItem icon={<CDIcons.User size={16} />}>
          Admin
        </CDSidebarItem>
      </CDSidebarFooter>
    </CDSidebar>
  );

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDSidebar / Sidebar</h1>
        <p className="antd-doc-lead">
          Versatile navigation bar supporting Left, Right, Top, and Bottom placements, collapsible modes with directional chevrons, and floating island styling.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDSidebar, CDSidebarHeader, CDSidebarContent, CDSidebarFooter, CDSidebarGroup, CDSidebarItem &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>For multi-level dashboard layouts requiring quick access to different modules on the left or right.</li>
          <li>For top or bottom horizontal navigation bars that collapse smoothly.</li>
          <li>In floating island mode when elevation and rounded glassmorphism borders are preferred over edge-to-edge docking.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Full-Width Interactive Placement & Floating Workbench */}
          <DemoCard
            fullWidth
            title="Interactive Placement & Floating Workbench"
            description="Switch sidebar positions across Left, Right, Top, and Bottom, and toggle Floating Island mode with instant animated layout transitions."
            code={`import { CDSidebar, CDSidebarHeader, CDSidebarContent, CDSidebarFooter, CDSidebarGroup, CDSidebarItem, CDBadge, CDIcons } from '@cinder-ui/core';

export default () => {
  const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('left');
  const [floating, setFloating] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ height: '480px', display: 'flex' }}>
      <CDSidebar
        placement={placement}
        floating={floating}
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <CDSidebarHeader>
          <CDIcons.Layers size={18} color="var(--cinder-primary)" />
          <span>DevOps Studio</span>
        </CDSidebarHeader>
        <CDSidebarContent>
          <CDSidebarGroup title="Platform">
            <CDSidebarItem icon={<CDIcons.Box size={16} />} active>Overview</CDSidebarItem>
            <CDSidebarItem icon={<CDIcons.Terminal size={16} />}>Pipelines</CDSidebarItem>
            <CDSidebarItem icon={<CDIcons.Database size={16} />}>Clusters</CDSidebarItem>
          </CDSidebarGroup>
        </CDSidebarContent>
        <CDSidebarFooter>
          <CDSidebarItem icon={<CDIcons.User size={16} />}>Admin</CDSidebarItem>
        </CDSidebarFooter>
      </CDSidebar>
      <div style={{ flex: 1, padding: '24px' }}>Main Workspace</div>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              {/* Interactive Controls Bar */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--cinder-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "var(--cinder-muted)", fontWeight: 600 }}>
                    Placement:
                  </span>
                  {(["left", "right", "top", "bottom"] as CDSidebarPlacement[]).map((pos) => (
                    <CDButton
                      key={pos}
                      variant={placement === pos ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setPlacement(pos)}
                    >
                      {pos.toUpperCase()}
                    </CDButton>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "var(--cinder-muted)", fontWeight: 600 }}>
                    Style:
                  </span>
                  <CDButton
                    variant={isFloating ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setIsFloating(!isFloating)}
                  >
                    {isFloating ? "Floating Island: ON" : "Floating Island: OFF"}
                  </CDButton>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "var(--cinder-muted)", fontWeight: 600 }}>
                    State:
                  </span>
                  <CDButton
                    variant={collapsed ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    {collapsed ? "Collapsed" : "Expanded"}
                  </CDButton>
                </div>
              </div>

              {/* Dynamic Preview Canvas */}
              <div
                style={{
                  height: "460px",
                  width: "100%",
                  display: "flex",
                  flexDirection: placement === "top" || placement === "bottom" ? "column" : "row",
                  border: "1px solid var(--cinder-border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "var(--cinder-canvas)",
                  position: "relative",
                }}
              >
                {placement === "top" && renderSidebar()}
                {placement === "left" && renderSidebar()}

                {/* Workspace Center Content */}
                <div
                  style={{
                    flex: 1,
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    background: "var(--cinder-canvas)",
                  }}
                >
                  <CDIcons.Layers size={36} color="var(--cinder-primary)" />
                  <h3 style={{ margin: 0, fontSize: "18px", color: "var(--cinder-text)" }}>
                    Interactive Workspace Canvas
                  </h3>
                  <p style={{ color: "var(--cinder-muted)", fontSize: "13px", margin: 0, textAlign: "center" }}>
                    Sidebar is currently docked on <strong>{placement.toUpperCase()}</strong> in{" "}
                    <strong>{isFloating ? "Floating Island" : "Standard Docked"}</strong> mode.
                  </p>
                  <p style={{ color: "var(--cinder-muted)", fontSize: "12px", margin: 0 }}>
                    Active item: <strong style={{ color: "var(--cinder-primary)" }}>{activeItem}</strong>
                  </p>
                </div>

                {placement === "right" && renderSidebar()}
                {placement === "bottom" && renderSidebar()}
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={sidebarProps} />
      </section>
    </div>
  );
}
