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
    title: "Start",
    items: [
      { name: "Getting Started", subtitle: "Install & Setup", path: "/components/getting-started", badge: "Start" },
      { name: "Component Overview", subtitle: "Catalog & Matrix", path: "/components/overview" },
      { name: "Design Tokens", subtitle: "Cinder Slate Tokens", path: "/tokens" },
    ],
  },
  {
    title: "General",
    items: [
      { name: "CDButton", subtitle: "Action trigger", path: "/components/button" },
      { name: "CDFloatButton", subtitle: "Floating actions", path: "/components/float-button" },
      { name: "CDIcon", subtitle: "Vector iconography", path: "/components/icon" },
      { name: "CDIconForge", subtitle: "1,000+ Icons in 6 Styles", path: "/icons", badge: "Studio" },
      { name: "CDIconButton", subtitle: "Icon trigger", path: "/components/icon-button" },
      { name: "CDTypography", subtitle: "Text & headings", path: "/components/typography" },
    ],
  },
  {
    title: "Layout",
    items: [
      { name: "CDBox", subtitle: "Polymorphic wrapper", path: "/components/box" },
      { name: "CDContainer", subtitle: "Centered max-width", path: "/components/container" },
      { name: "CDGrid", subtitle: "2D CSS grid", path: "/components/grid" },
      { name: "CDStack", subtitle: "Flexbox stack", path: "/components/stack" },
      { name: "CDDivider", subtitle: "Line separator", path: "/components/divider" },
      { name: "CDSpacer", subtitle: "Spatial distribution", path: "/components/spacer" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { name: "CDNavbar", subtitle: "Header bar", path: "/components/navbar" },
      { name: "CDSidebar", subtitle: "Side navigation", path: "/components/sidebar" },
      { name: "CDTabs", subtitle: "Tabbed switching", path: "/components/tabs" },
      { name: "CDBreadcrumb", subtitle: "Path hierarchy", path: "/components/breadcrumb" },
      { name: "CDPagination", subtitle: "Page switcher", path: "/components/pagination" },
      { name: "CDStepper", subtitle: "Step wizard", path: "/components/stepper" },
      { name: "CDLink", subtitle: "Hyperlink", path: "/components/link" },
      { name: "CDDropdown", subtitle: "Action menu", path: "/components/dropdown" },
      { name: "CDButtonDropdown", subtitle: "Split button", path: "/components/button-dropdown" },
    ],
  },
  {
    title: "Data Entry",
    items: [
      { name: "CDEditor", subtitle: "Rich text & mentions", path: "/components/editor", badge: "New" },
      { name: "CDJSONEditor", subtitle: "JSON tree & code", path: "/components/json-editor", badge: "Pro" },
      { name: "CDCodeEditor", subtitle: "Syntax highlighting", path: "/components/code-editor", badge: "Pro" },
      { name: "CDColorPickerPro", subtitle: "Gradients & palettes", path: "/components/color-picker-pro", badge: "Pro" },
      { name: "CDTimeRangePicker", subtitle: "Multi-interval shifts", path: "/components/time-range-picker", badge: "Pro" },
      { name: "CDPhoneInput", subtitle: "Country code & masks", path: "/components/phone-input", badge: "Pro" },
      { name: "CDAddressAutocomplete", subtitle: "Location search", path: "/components/address-autocomplete", badge: "Pro" },
      { name: "CDMultiSelectPro", subtitle: "Search & async groups", path: "/components/multi-select-pro", badge: "Pro" },
      { name: "CDOTPInput", subtitle: "Verification code", path: "/components/otp-input", badge: "Pro" },
      { name: "CDFormBuilder", subtitle: "Dynamic schema form", path: "/components/form-builder" },
      { name: "CDInput", subtitle: "Form control", path: "/components/input" },
      { name: "CDSelect", subtitle: "Options select", path: "/components/select" },
      { name: "CDRadio", subtitle: "Single option selector", path: "/components/radio" },
      { name: "CDCheckbox", subtitle: "Multi-choice selector", path: "/components/checkbox" },
      { name: "CDSwitch", subtitle: "Binary toggle", path: "/components/switch" },
      { name: "CDSlider", subtitle: "Value & range slider", path: "/components/slider" },
      { name: "CDTextArea", subtitle: "Multi-line editor", path: "/components/textarea" },
      { name: "CDDatePicker", subtitle: "Date & range selector", path: "/components/date-picker" },
      { name: "CDTimePicker", subtitle: "Time selector", path: "/components/time-picker" },
      { name: "CDFilePicker", subtitle: "File upload & preview", path: "/components/file-picker" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { name: "CDCharts", subtitle: "Chart.js visualizations", path: "/components/chart", badge: "New" },
      { name: "CDTable", subtitle: "Data grid table", path: "/components/table" },
      { name: "CDCalendar", subtitle: "Event calendar", path: "/components/calendar" },
      { name: "CDOutlookCalendar", subtitle: "Outlook scheduler", path: "/components/outlook-calendar" },
      { name: "CDCard", subtitle: "Content container", path: "/components/card" },
      { name: "CDList", subtitle: "Item sequence", path: "/components/list" },
      { name: "CDAccordion", subtitle: "Collapsible panels", path: "/components/accordion" },
      { name: "CDAvatar", subtitle: "User identity", path: "/components/avatar" },
      { name: "CDTag", subtitle: "Filter chip", path: "/components/tag" },
      { name: "CDBadge", subtitle: "Status pill", path: "/components/badge" },
      { name: "CDGlassPanel", subtitle: "Frosted container", path: "/components/glass-panel" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { name: "CDAlert", subtitle: "Notice banner", path: "/components/alert" },
      { name: "CDToast", subtitle: "Floating snackbar", path: "/components/toast" },
      { name: "CDProgressBar", subtitle: "Progress tracker", path: "/components/progress" },
      { name: "CDSpinner", subtitle: "Loading indicator", path: "/components/spinner" },
      { name: "CDSkeleton", subtitle: "Content placeholder", path: "/components/skeleton" },
    ],
  },
  {
    title: "Overlay",
    items: [
      { name: "CDModal", subtitle: "Dialog overlay", path: "/components/modal" },
      { name: "CDDrawer", subtitle: "Sliding sheet", path: "/components/drawer" },
      { name: "CDTooltip", subtitle: "Contextual balloon", path: "/components/tooltip" },
      { name: "CDPopover", subtitle: "Floating card", path: "/components/popover" },
      { name: "CDDropdownMenu", subtitle: "Portal menu", path: "/components/dropdown-menu" },
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
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
              <CinderLogo size={32} />
            </div>
            <span className="cinder-brand-title">CINDER UI</span>
          </Link>

          {/* Sidebar Collapse Toggle Button in Header */}
          <button
            type="button"
            className="cinder-docs-sidebar-toggle-btn"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>

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
                <Link
                  to="/icons"
                  className="cinder-lib-menu-item"
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  onClick={() => setShowLibDropdown(false)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600 }}>@tec-triad/iconforge-react</span>
                    <Badge variant="success" size="sm">Ecosystem</Badge>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--cinder-muted)" }}>
                    1,000+ Icons in 6 Visual Styles
                  </div>
                </Link>
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
          <nav className="cinder-nav-menu">
            <NavLink to="/" className={({ isActive }) => `cinder-nav-link ${isActive ? "active" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/components/button" className={({ isActive }) => `cinder-nav-link ${isActive ? "active" : ""}`}>
              Components
            </NavLink>
            <NavLink to="/icons" className={({ isActive }) => `cinder-nav-link ${isActive ? "active" : ""}`}>
              Icon Studio
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
        {/* Floating Edge Collapse Toggle */}
        <button
          type="button"
          className="cinder-docs-sidebar-edge-toggle"
          style={{
            left: isSidebarCollapsed ? "8px" : "268px",
            width: 24,
            height: 24,
            minWidth: 24,
            minHeight: 24,
            maxWidth: 24,
            maxHeight: 24,
            borderRadius: "50%",
            padding: 0,
            boxSizing: "border-box",
            aspectRatio: "1 / 1",
            flexShrink: 0,
          }}
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? (
            <CDIcons.ChevronRight size={14} />
          ) : (
            <CDIcons.ChevronLeft size={14} />
          )}
        </button>

        {/* Left Sidebar */}
        <aside className={`cinder-docs-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
          {/* Sidebar Header with Quick Filter & Navigation */}
          <div className="cinder-docs-sidebar-header">
            <div className="cinder-docs-sidebar-search">
              <CDIcons.Search size={13} className="cinder-docs-sidebar-search-icon" />
              <input
                type="text"
                placeholder="Filter components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cinder-docs-sidebar-search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="cinder-docs-sidebar-search-clear"
                  aria-label="Clear filter"
                >
                  &times;
                </button>
              )}
            </div>

            <nav className="cinder-docs-sidebar-quick-nav">
              <NavLink
                to="/components/getting-started"
                className={({ isActive }) =>
                  `cinder-docs-sidebar-quick-link ${isActive ? "active" : ""}`
                }
              >
                <CDIcons.Sparkles size={13} />
                <span>Start</span>
              </NavLink>
              <NavLink
                to="/components/overview"
                className={({ isActive }) =>
                  `cinder-docs-sidebar-quick-link ${isActive ? "active" : ""}`
                }
              >
                <CDIcons.Box size={13} />
                <span>Overview</span>
              </NavLink>
              <NavLink
                to="/tokens"
                className={({ isActive }) =>
                  `cinder-docs-sidebar-quick-link ${isActive ? "active" : ""}`
                }
              >
                <CDIcons.Layers size={13} />
                <span>Tokens</span>
              </NavLink>
            </nav>
          </div>

          {/* Categorized Nav Groups */}
          <div className="cinder-docs-sidebar-groups">
            {filteredCategories.length === 0 ? (
              <div className="cinder-docs-sidebar-empty">
                <span className="cinder-docs-sidebar-empty-text">No components found</span>
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="cinder-docs-sidebar-empty-btn"
                >
                  Clear filter
                </button>
              </div>
            ) : (
              filteredCategories.map((cat: ComponentCategory) => (
                <div key={cat.title} className="cinder-docs-sidebar-group">
                  <div className="cinder-docs-sidebar-group-header">
                    <span className="cinder-docs-sidebar-group-title">{cat.title}</span>
                    <span className="cinder-docs-sidebar-group-count">{cat.items.length}</span>
                  </div>
                  <div className="cinder-docs-sidebar-items">
                    {cat.items.map((item: ComponentNavItem) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                          `cinder-docs-sidebar-item ${isActive ? "active" : ""}`
                        }
                        title={`${item.name} — ${item.subtitle}`}
                      >
                        <div className="cinder-docs-sidebar-item-left">
                          <span className="cinder-docs-sidebar-item-name">{item.name}</span>
                          <span className="cinder-docs-sidebar-item-sub">{item.subtitle}</span>
                        </div>
                        {item.badge && (
                          <span className="cinder-docs-sidebar-badge">{item.badge}</span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))
            )}
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
