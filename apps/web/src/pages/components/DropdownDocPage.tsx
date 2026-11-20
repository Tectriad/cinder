import { useState, type ReactElement } from "react";
import {
  CDDropdown,
  CDDropdownMenu,
  CDButton,
  CDBadge,
  CDIcons,
  type CDDropdownMenuItem,
  type CDDropdownPlacement,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function DropdownDocPage(): ReactElement {
  const [lastAction, setLastAction] = useState<string>("None");
  const [placement, setPlacement] = useState<CDDropdownPlacement>("bottomLeft");

  const actionItems: CDDropdownMenuItem[] = [
    {
      groupTitle: "Actions",
      label: "",
    },
    {
      key: "edit",
      label: "Edit Project",
      icon: <CDIcons.Edit size="sm" />,
      onClick: () => setLastAction("Edit Project clicked"),
    },
    {
      key: "duplicate",
      label: "Duplicate Configuration",
      icon: <CDIcons.Copy size="sm" />,
      extra: "⌘D",
      onClick: () => setLastAction("Duplicate clicked"),
    },
    {
      key: "share",
      label: "Share with Team",
      icon: <CDIcons.Share size="sm" />,
      onClick: () => setLastAction("Share clicked"),
    },
    {
      divider: true,
      label: "",
    },
    {
      key: "export",
      label: "Export Bundle (.zip)",
      icon: <CDIcons.Download size="sm" />,
      onClick: () => setLastAction("Export clicked"),
    },
    {
      divider: true,
      label: "",
    },
    {
      key: "delete",
      label: "Delete Deployment",
      icon: <CDIcons.Trash size="sm" />,
      danger: true,
      onClick: () => setLastAction("Delete clicked"),
    },
  ];

  const userMenuItems: CDDropdownMenuItem[] = [
    {
      key: "profile",
      label: "User Profile",
      icon: <CDIcons.User size="sm" />,
    },
    {
      key: "settings",
      label: "Workspace Settings",
      icon: <CDIcons.Settings size="sm" />,
    },
    {
      divider: true,
      label: "",
    },
    {
      key: "logout",
      label: "Sign Out",
      icon: <CDIcons.Lock size="sm" />,
      danger: true,
    },
  ];

  const dropdownProps = [
    { property: "children", description: "Trigger element that toggles the dropdown", type: "ReactNode", default: "-" },
    { property: "menu", description: "Menu configuration containing items array", type: "{ items: CDDropdownMenuItem[] }", default: "-" },
    { property: "overlay", description: "Custom JSX overlay panel to display instead of menu", type: "ReactNode", default: "-" },
    { property: "trigger", description: "Trigger interaction mode ('click' | 'hover')", type: "CDDropdownTrigger | CDDropdownTrigger[]", default: "'click'" },
    { property: "placement", description: "Popup placement anchor ('bottomLeft' | 'bottomRight' | 'bottomCenter' | 'topLeft' | 'topRight')", type: "CDDropdownPlacement", default: "'bottomLeft'" },
    { property: "open", description: "Controlled visibility state", type: "boolean", default: "-" },
    { property: "defaultOpen", description: "Initial open state", type: "boolean", default: "false" },
    { property: "onOpenChange", description: "Callback when open state transitions", type: "(open: boolean) => void", default: "-" },
    { property: "closeOnSelect", description: "Whether to close menu when an item is selected", type: "boolean", default: "true" },
    { property: "disabled", description: "Disable trigger interactions", type: "boolean", default: "false" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDDropdown / Dropdown</h1>
        <p className="antd-doc-lead">
          Floating action menu that attaches to any trigger element (button, link, or badge) to present contextual commands, shortcuts, and cascading options.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDDropdown, Dropdown &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>When an element triggers multiple secondary operations that don't need dedicated buttons on the page.</li>
          <li>For account menus, overflow menus ("..."), batch operations, and contextual action lists.</li>
          <li>Unlike <code>CDSelect</code> (which updates a form value), <code>CDDropdown</code> executes actions upon click.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Basic Dropdown */}
          <DemoCard
            title="Basic Usage"
            description="Button triggering a dropdown menu with icons, shortcuts, dividers, and danger items."
            code={`import { CDDropdown, CDButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <CDDropdown menu={{ items: actionItems }}>
    <CDButton variant="primary" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
      Actions Menu
    </CDButton>
  </CDDropdown>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <CDDropdown menu={{ items: actionItems }}>
                  <CDButton variant="primary" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
                    Actions Menu
                  </CDButton>
                </CDDropdown>
              </div>

              <div style={{ fontSize: "12px", color: "var(--cinder-muted)" }}>
                Last triggered: <strong style={{ color: "var(--cinder-primary)" }}>{lastAction}</strong>
              </div>
            </div>
          </DemoCard>

          {/* Demo 2: Different Trigger Elements */}
          <DemoCard
            title="Diverse Triggers"
            description="CDDropdown can wrap any element, such as icon buttons, links, or status badges."
            code={`import { CDDropdown, CDButton, CDBadge, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
    <CDDropdown menu={{ items: userMenuItems }}>
      <CDButton variant="secondary" shape="circle" aria-label="User Profile">
        <CDIcons.User size="sm" />
      </CDButton>
    </CDDropdown>

    <CDDropdown menu={{ items: actionItems }}>
      <CDBadge variant="primary" dot pulse style={{ cursor: 'pointer' }}>
        Live Production <CDIcons.ChevronDown size={12} style={{ marginLeft: 4 }} />
      </CDBadge>
    </CDDropdown>

    <CDDropdown menu={{ items: userMenuItems }}>
      <a href="#more" onClick={(e) => e.preventDefault()} style={{ color: 'var(--cinder-primary)', fontSize: 13 }}>
        More Options
      </a>
    </CDDropdown>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
              <CDDropdown menu={{ items: userMenuItems }}>
                <CDButton variant="secondary" shape="circle" aria-label="User Profile">
                  <CDIcons.User size="sm" />
                </CDButton>
              </CDDropdown>

              <CDDropdown menu={{ items: actionItems }}>
                <CDBadge variant="primary" dot pulse style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
                  Live Production <CDIcons.ChevronDown size={12} style={{ marginLeft: 4 }} />
                </CDBadge>
              </CDDropdown>

              <CDDropdown menu={{ items: userMenuItems }}>
                <span style={{ color: "var(--cinder-primary)", fontSize: "13px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  More Options <CDIcons.ChevronDown size={12} />
                </span>
              </CDDropdown>
            </div>
          </DemoCard>

          {/* Demo 3: Trigger Modes (Hover vs Click) */}
          <DemoCard
            title="Trigger Modes (Click vs Hover)"
            description="Control how the popup triggers with trigger='hover' or trigger='click' (default)."
            code={`import { CDDropdown, CDButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', gap: '14px' }}>
    <CDDropdown trigger="hover" menu={{ items: userMenuItems }}>
      <CDButton variant="glass" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
        Hover to Open
      </CDButton>
    </CDDropdown>

    <CDDropdown trigger="click" menu={{ items: userMenuItems }}>
      <CDButton variant="secondary" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
        Click to Open
      </CDButton>
    </CDDropdown>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <CDDropdown trigger="hover" menu={{ items: userMenuItems }}>
                <CDButton variant="glass" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
                  Hover to Open
                </CDButton>
              </CDDropdown>

              <CDDropdown trigger="click" menu={{ items: userMenuItems }}>
                <CDButton variant="secondary" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
                  Click to Open
                </CDButton>
              </CDDropdown>
            </div>
          </DemoCard>

          {/* Demo 4: Placements */}
          <DemoCard
            title="Placements"
            description="Supports 6 popup positions: bottomLeft, bottomCenter, bottomRight, topLeft, topCenter, topRight."
            code={`import { useState } from 'react';
import { CDDropdown, CDButton, CDIcons } from '@cinder-ui/core';

export default () => {
  const [pos, setPos] = useState('bottomLeft');

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <CDDropdown placement={pos} menu={{ items: userMenuItems }}>
        <CDButton variant="primary" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
          Placement: {pos}
        </CDButton>
      </CDDropdown>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(["bottomLeft", "bottomCenter", "bottomRight", "topLeft", "topRight"] as CDDropdownPlacement[]).map(
                  (p: CDDropdownPlacement) => (
                    <CDButton
                      key={p}
                      size="sm"
                      variant={placement === p ? "primary" : "secondary"}
                      onClick={() => setPlacement(p)}
                    >
                      {p}
                    </CDButton>
                  )
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                <CDDropdown placement={placement} menu={{ items: userMenuItems }}>
                  <CDButton variant="primary" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
                    Trigger ({placement})
                  </CDButton>
                </CDDropdown>
              </div>
            </div>
          </DemoCard>

          {/* Demo 5: Composable CDDropdownMenu with Portal */}
          <DemoCard
            title="Portal DropdownMenu (Immune to Overflow Clipping)"
            description="Rendered directly into document.body to prevent parent card clipping, with keyboard shortcuts and checkmarks."
            code={`import { CDDropdownMenu, CDButton, CDIcons } from '@cinder-ui/core';

export default () => (
  <CDDropdownMenu
    items={[
      { key: 'new', label: 'New File', icon: <CDIcons.Plus size="sm" />, shortcut: '⌘N' },
      { key: 'open', label: 'Open Workspace...', icon: <CDIcons.Folder size="sm" />, shortcut: '⌘O' },
      { key: 'save', label: 'Save Configuration', shortcut: '⌘S' },
      { divided: true, key: 'd1', label: '' },
      { key: 'auto', label: 'Auto-format on Save', checked: true },
      { divided: true, key: 'd2', label: '' },
      { key: 'del', label: 'Delete Workspace', icon: <CDIcons.Trash size="sm" />, danger: true },
    ]}
  >
    <CDButton variant="primary" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
      File Operations
    </CDButton>
  </CDDropdownMenu>
);`}
          >
            <CDDropdownMenu
              items={[
                { key: "new", label: "New File", icon: <CDIcons.Plus size="sm" />, shortcut: "⌘N" },
                { key: "open", label: "Open Workspace...", icon: <CDIcons.Folder size="sm" />, shortcut: "⌘O" },
                { key: "save", label: "Save Configuration", shortcut: "⌘S" },
                { divided: true, key: "d1", label: "" },
                { key: "auto", label: "Auto-format on Save", checked: true },
                { divided: true, key: "d2", label: "" },
                { key: "del", label: "Delete Workspace", icon: <CDIcons.Trash size="sm" />, danger: true },
              ]}
            >
              <CDButton variant="primary" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
                File Operations
              </CDButton>
            </CDDropdownMenu>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <ApiTable title="CDDropdownProps API" data={dropdownProps} />
      </section>
    </div>
  );
}
