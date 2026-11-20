import { useState, type ReactElement } from "react";
import {
  CDNavbar,
  CDNavbarBrand,
  CDNavbarNav,
  CDNavbarItem,
  CDNavbarAction,
  CDButton,
  CDBadge,
  CDIcons,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function NavbarDocPage(): ReactElement {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const navbarProps = [
    { property: "position", description: "Header positioning strategy ('static' | 'sticky' | 'fixed')", type: "string", default: "'sticky'" },
    { property: "variant", description: "Background surface presentation ('default' | 'surface' | 'transparent' | 'glass')", type: "string", default: "'default'" },
    { property: "bordered", description: "Show bottom divider border", type: "boolean", default: "true" },
    { property: "height", description: "Navbar height in px or css string", type: "number | string", default: "64" },
    { property: "mobileMenuOpen", description: "Mobile responsive drawer toggle state", type: "boolean", default: "false" },
    { property: "onMobileMenuToggle", description: "Callback triggered when mobile menu hamburger is pressed", type: "(open: boolean) => void", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDNavbar / Header</h1>
        <p className="antd-doc-lead">
          Top-level application navigation header featuring brand logo slots, categorized links, action trays, full-width presentation, and mobile responsiveness.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDNavbar, CDNavbarBrand, CDNavbarNav, CDNavbarItem, CDNavbarAction &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>As the primary top application header containing branding, global navigation, and user controls.</li>
          <li>For sticky or fixed application bars that remain anchored while scrolling.</li>
        </ul>
      </section>

      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Demo 1: Full-Width Standard Application Header */}
          <DemoCard
            fullWidth
            title="Standard Application Navbar (Full Width)"
            description="Complete header layout with branding logo, active route highlighting, and right action buttons rendered with generous full horizontal width."
            code={`import { CDNavbar, CDNavbarBrand, CDNavbarNav, CDNavbarItem, CDNavbarAction, CDButton, CDBadge, CDIcons } from '@cinder-ui/core';

export default () => {
  const [active, setActive] = useState('dashboard');
  return (
    <CDNavbar position="static">
      <CDNavbarBrand
        logo={<CDIcons.Flame size={20} color="var(--cinder-primary)" />}
        title="Cinder Cloud"
        subtitle="v2.4 Production"
      />
      <CDNavbarNav align="left">
        <CDNavbarItem active={active === 'dashboard'} onClick={() => setActive('dashboard')}>
          Dashboard
        </CDNavbarItem>
        <CDNavbarItem active={active === 'deployments'} onClick={() => setActive('deployments')}>
          Deployments
        </CDNavbarItem>
        <CDNavbarItem
          active={active === 'alerts'}
          badge={<CDBadge variant="danger" size="sm">3</CDBadge>}
          onClick={() => setActive('alerts')}
        >
          Alerts
        </CDNavbarItem>
        <CDNavbarItem active={active === 'settings'} onClick={() => setActive('settings')}>
          Settings
        </CDNavbarItem>
      </CDNavbarNav>
      <CDNavbarAction>
        <CDButton variant="secondary" size="sm">Documentation</CDButton>
        <CDButton variant="primary" size="sm">Create Cluster</CDButton>
      </CDNavbarAction>
    </CDNavbar>
  );
};`}
          >
            <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--cinder-border)" }}>
              <CDNavbar position="static">
                <CDNavbarBrand
                  logo={<CDIcons.Flame size={20} color="var(--cinder-primary)" />}
                  title="Cinder Cloud"
                  subtitle="v2.4 Production"
                />
                <CDNavbarNav align="left">
                  <CDNavbarItem active={activeItem === "dashboard"} onClick={() => setActiveItem("dashboard")}>
                    Dashboard
                  </CDNavbarItem>
                  <CDNavbarItem active={activeItem === "deployments"} onClick={() => setActiveItem("deployments")}>
                    Deployments
                  </CDNavbarItem>
                  <CDNavbarItem
                    active={activeItem === "alerts"}
                    badge={<CDBadge variant="danger" size="sm">3</CDBadge>}
                    onClick={() => setActiveItem("alerts")}
                  >
                    Alerts
                  </CDNavbarItem>
                  <CDNavbarItem active={activeItem === "settings"} onClick={() => setActiveItem("settings")}>
                    Settings
                  </CDNavbarItem>
                </CDNavbarNav>
                <CDNavbarAction>
                  <CDButton variant="secondary" size="sm">Documentation</CDButton>
                  <CDButton variant="primary" size="sm">Create Cluster</CDButton>
                </CDNavbarAction>
              </CDNavbar>
            </div>
          </DemoCard>

          {/* Demo 2: Glassmorphism & Centered Navigation */}
          <DemoCard
            fullWidth
            title="Glassmorphism Variant & Centered Nav"
            description="Translucent backdrop blur with centered links and mobile responsive toggle integration."
            code={`import { CDNavbar, CDNavbarBrand, CDNavbarNav, CDNavbarItem, CDNavbarAction, CDButton, CDIcons } from '@cinder-ui/core';

export default () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <CDNavbar
      position="static"
      variant="glass"
      mobileMenuOpen={mobileOpen}
      onMobileMenuToggle={setMobileOpen}
    >
      <CDNavbarBrand
        logo={<CDIcons.Box size={20} color="var(--cinder-primary)" />}
        title="Antigravity Workspace"
      />
      <CDNavbarNav align="center">
        <CDNavbarItem active>Overview</CDNavbarItem>
        <CDNavbarItem>Clusters</CDNavbarItem>
        <CDNavbarItem>Pipelines</CDNavbarItem>
      </CDNavbarNav>
      <CDNavbarAction>
        <CDButton variant="ghost" size="sm">Sign In</CDButton>
        <CDButton variant="primary" size="sm">Deploy</CDButton>
      </CDNavbarAction>
    </CDNavbar>
  );
};`}
          >
            <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--cinder-border)" }}>
              <CDNavbar
                position="static"
                variant="glass"
                mobileMenuOpen={mobileOpen}
                onMobileMenuToggle={setMobileOpen}
              >
                <CDNavbarBrand
                  logo={<CDIcons.Box size={20} color="var(--cinder-primary)" />}
                  title="Antigravity Workspace"
                />
                <CDNavbarNav align="center">
                  <CDNavbarItem active>Overview</CDNavbarItem>
                  <CDNavbarItem>Clusters</CDNavbarItem>
                  <CDNavbarItem>Pipelines</CDNavbarItem>
                </CDNavbarNav>
                <CDNavbarAction>
                  <CDButton variant="ghost" size="sm">Sign In</CDButton>
                  <CDButton variant="primary" size="sm">Deploy</CDButton>
                </CDNavbarAction>
              </CDNavbar>
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Reference</h2>
        <ApiTable data={navbarProps} />
      </section>
    </div>
  );
}
