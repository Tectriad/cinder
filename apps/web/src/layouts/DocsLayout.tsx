import { useState, type ReactElement } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Badge, IconButton, CDIcons, useCinderTheme } from "@cinder-ui/core";
import { CinderLogo } from "../components/CinderLogo";

interface ComponentNavItem {
  name: string;
  subtitle: string;
  path: string;
  badge?: string;
}

interface ComponentCategory {
  title: string;
  items: ComponentNavItem[];
}

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    title: "General",
    items: [
      { name: "CDButton", subtitle: "Action trigger", path: "/components/button", badge: "Core" },
      { name: "CDFloatButton", subtitle: "Floating actions", path: "/components/float-button", badge: "New" },
      { name: "CDIcon", subtitle: "Vector iconography", path: "/components/icon", badge: "New" },
      { name: "CDIconButton", subtitle: "Icon trigger", path: "/components/icon-button" },
      { name: "CDTypography", subtitle: "Text & headings", path: "/components/typography", badge: "New" },
    ],
  },
  {
    title: "Layout",
    items: [
      { name: "CDBox", subtitle: "Polymorphic wrapper", path: "/components/box", badge: "New" },
      { name: "CDContainer", subtitle: "Centered max-width", path: "/components/container", badge: "New" },
      { name: "CDGrid", subtitle: "2D CSS grid", path: "/components/grid", badge: "New" },
      { name: "CDStack", subtitle: "Flexbox stack", path: "/components/stack", badge: "New" },
      { name: "CDDivider", subtitle: "Line separator", path: "/components/divider", badge: "New" },
      { name: "CDSpacer", subtitle: "Spatial distribution", path: "/components/spacer", badge: "New" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { name: "CDNavbar", subtitle: "Header bar", path: "/components/navbar", badge: "New" },
      { name: "CDSidebar", subtitle: "Side navigation", path: "/components/sidebar", badge: "New" },
      { name: "CDTabs", subtitle: "Tabbed switching", path: "/components/tabs", badge: "New" },
      { name: "CDBreadcrumb", subtitle: "Path hierarchy", path: "/components/breadcrumb", badge: "New" },
      { name: "CDPagination", subtitle: "Page switcher", path: "/components/pagination", badge: "New" },
      { name: "CDStepper", subtitle: "Step wizard", path: "/components/stepper", badge: "New" },
      { name: "CDLink", subtitle: "Hyperlink", path: "/components/link", badge: "New" },
      { name: "CDDropdown", subtitle: "Action menu", path: "/components/dropdown", badge: "New" },
      { name: "CDButtonDropdown", subtitle: "Split button", path: "/components/button-dropdown" },
    ],
  },
  {
    title: "Data Entry",
    items: [
      { name: "CDRadio", subtitle: "Single option selector", path: "/components/radio", badge: "New" },
      { name: "CDSwitch", subtitle: "Binary toggle", path: "/components/switch", badge: "New" },
      { name: "CDSlider", subtitle: "Value & range slider", path: "/components/slider", badge: "New" },
      { name: "CDTextArea", subtitle: "Multi-line editor", path: "/components/textarea", badge: "New" },
      { name: "CDDatePicker", subtitle: "Date & range selector", path: "/components/date-picker", badge: "New" },
      { name: "CDTimePicker", subtitle: "Time selector", path: "/components/time-picker", badge: "New" },
      { name: "CDCheckbox", subtitle: "Multi-choice selector", path: "/components/checkbox", badge: "New" },
      { name: "CDInput", subtitle: "Form control", path: "/components/input" },
      { name: "CDSelect", subtitle: "Options select", path: "/components/select", badge: "New" },
      { name: "CDFilePicker", subtitle: "File upload & preview", path: "/components/file-picker", badge: "New" },
      { name: "CDFormBuilder", subtitle: "Dynamic schema form", path: "/components/form-builder", badge: "New" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { name: "CDOutlookCalendar", subtitle: "Outlook scheduler", path: "/components/calendar", badge: "New" },
      { name: "CDCalendar", subtitle: "Event calendar", path: "/components/calendar", badge: "New" },
      { name: "CDCard", subtitle: "Content container", path: "/components/card" },
      { name: "CDTable", subtitle: "Data grid table", path: "/components/table", badge: "New" },
      { name: "CDList", subtitle: "Item sequence", path: "/components/list", badge: "New" },
      { name: "CDAccordion", subtitle: "Collapsible panels", path: "/components/accordion", badge: "New" },
      { name: "CDAvatar", subtitle: "User identity", path: "/components/avatar", badge: "New" },
      { name: "CDTag", subtitle: "Filter chip", path: "/components/tag", badge: "New" },
      { name: "CDBadge", subtitle: "Status pill", path: "/components/badge" },
      { name: "CDGlassPanel", subtitle: "Frosted container", path: "/components/glass-panel", badge: "Slate" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { name: "CDAlert", subtitle: "Notice banner", path: "/components/alert", badge: "New" },
      { name: "CDToast", subtitle: "Floating snackbar", path: "/components/toast", badge: "New" },
      { name: "CDProgressBar", subtitle: "Progress tracker", path: "/components/progress", badge: "New" },
      { name: "CDSpinner", subtitle: "Loading indicator", path: "/components/spinner", badge: "New" },
      { name: "CDSkeleton", subtitle: "Content placeholder", path: "/components/skeleton", badge: "New" },
    ],
  },
  {
    title: "Overlay",
    items: [
      { name: "CDModal", subtitle: "Dialog overlay", path: "/components/modal", badge: "New" },
      { name: "CDDrawer", subtitle: "Sliding sheet", path: "/components/drawer", badge: "New" },
      { name: "CDTooltip", subtitle: "Contextual balloon", path: "/components/tooltip", badge: "New" },
      { name: "CDPopover", subtitle: "Floating card", path: "/components/popover", badge: "New" },
      { name: "CDDropdownMenu", subtitle: "Portal menu", path: "/components/dropdown-menu", badge: "New" },
    ],
  },
  {
    title: "Utility",
    items: [
      { name: "CDCopyButton", subtitle: "Clipboard copy", path: "/components/copy-button" },
      { name: "CDSnippet", subtitle: "Code block", path: "/components/snippet" },
    ],
  },
];

export function DocsLayout(): ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeLibrary, setActiveLibrary] = useState<string>("@cinder-ui/core");
  const [showLibDropdown, setShowLibDropdown] = useState<boolean>(false);
  const { resolvedMode, setMode } = useCinderTheme();

  // Filter categories by search term
  const filteredCategories: ComponentCategory[] = COMPONENT_CATEGORIES.map(
    (cat: ComponentCategory) => ({
      ...cat,
      items: cat.items.filter(
        (item: ComponentNavItem) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }),
  ).filter((cat: ComponentCategory) => cat.items.length > 0);

  return (
    <div className="cinder-docs-layout">
      {/* Top Navigation Bar */}
      <header className="cinder-top-nav">
        <div className="cinder-top-nav-left">
          {/* Brand */}
          <Link to="/" className="cinder-brand">
            <div className="cinder-brand-icon">
              <CinderLogo size={24} />
            </div>
            <span className="cinder-brand-title">CINDER UI</span>
          </Link>

          {/* Multiple Component Library Switcher */}
          <div className="cinder-lib-switcher">
            <button
              className="cinder-lib-btn"
              onClick={() => setShowLibDropdown(!showLibDropdown)}
              aria-expanded={showLibDropdown}
              type="button"
            >
              <span className="cinder-lib-tag">{activeLibrary}</span>
              <span className="cinder-lib-version">v0.1.0</span>
              <CDIcons.ChevronDown size={14} color="var(--cinder-muted)" />
            </button>

            {showLibDropdown && (
              <div className="cinder-lib-menu">
                <div
                  className={`cinder-lib-menu-item ${activeLibrary === "@cinder-ui/core" ? "active" : ""}`}
                  onClick={() => {
                    setActiveLibrary("@cinder-ui/core");
                    setShowLibDropdown(false);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600 }}>@cinder-ui/core</span>
                    <Badge variant="primary" size="sm">Active</Badge>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--cinder-muted)" }}>
                    Core UI Primitives &amp; Foundation
                  </div>
                </div>
                <div
                  className="cinder-lib-menu-item"
                  style={{ opacity: 0.6 }}
                  onClick={() => setShowLibDropdown(false)}
                  role="button"
                  tabIndex={0}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600 }}>@cinder-ui/forms</span>
                    <Badge variant="warning" size="sm">Planned</Badge>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--cinder-muted)" }}>
                    Complex Form Builder &amp; Validation Suite
                  </div>
                </div>
                <div
                  className="cinder-lib-menu-item"
                  style={{ opacity: 0.6 }}
                  onClick={() => setShowLibDropdown(false)}
                  role="button"
                  tabIndex={0}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600 }}>@cinder-ui/data-grid</span>
                    <Badge variant="warning" size="sm">Planned</Badge>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--cinder-muted)" }}>
                    High-density Data Grids &amp; Virtualized Tables
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Search & Nav Links */}
        <div className="cinder-top-nav-right">
          <div className="cinder-nav-search">
            <CDIcons.Search size={14} color="var(--cinder-muted)" />
            <input
              type="text"
              placeholder="Search components... (e.g. Button, Icon, Input)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cinder-nav-search-input"
            />
          </div>

          <nav className="cinder-nav-menu">
            <NavLink to="/" className={({ isActive }) => `cinder-nav-link ${isActive ? "active" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/components/button" className={({ isActive }) => `cinder-nav-link ${isActive ? "active" : ""}`}>
              Components
            </NavLink>
            <NavLink to="/tokens" className={({ isActive }) => `cinder-nav-link ${isActive ? "active" : ""}`}>
              Design Tokens
            </NavLink>
          </nav>

          <IconButton
            icon={resolvedMode === "dark" ? <CDIcons.Sun size={16} /> : <CDIcons.Moon size={16} />}
            aria-label={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
            variant="ghost"
            size="sm"
            onClick={() => setMode(resolvedMode === "dark" ? "light" : "dark")}
            title={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
          />
        </div>
      </header>

      {/* Main Body: Sidebar + Content */}
      <div className="cinder-body-container">
        {/* Left Sidebar */}
        <aside className="cinder-sidebar">
          {/* Quick Overview Link */}
          <div style={{ padding: "16px 16px 8px 16px" }}>
            <NavLink
              to="/components/overview"
              className={({ isActive }) =>
                `cinder-sidebar-item cinder-overview-item ${isActive ? "active" : ""}`
              }
            >
              <CDIcons.Box size={14} />
              <span>Component Overview</span>
            </NavLink>
          </div>

          {/* Categorized Nav Groups */}
          <div className="cinder-sidebar-groups">
            {filteredCategories.map((cat: ComponentCategory, idx: number) => (
              <div key={idx} className="cinder-sidebar-group">
                <div className="cinder-sidebar-group-title">{cat.title}</div>
                <div className="cinder-sidebar-items">
                  {cat.items.map((item: ComponentNavItem) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `cinder-sidebar-item ${isActive ? "active" : ""}`
                      }
                    >
                      <div className="cinder-sidebar-item-main">
                        <div className="cinder-sidebar-item-row">
                          <span className="cinder-sidebar-item-name">{item.name}</span>
                          {item.badge && (
                            <Badge
                              variant="accent"
                              size="sm"
                              style={{
                                fontSize: "9px",
                                padding: "1px 6px",
                              }}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <span className="cinder-sidebar-item-sub">{item.subtitle}</span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="cinder-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
