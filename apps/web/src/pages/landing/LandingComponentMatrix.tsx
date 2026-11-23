import { useState, useMemo, type ReactElement, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardDescription, Badge, Input } from "@tec-triad/cinder-ui";
import { Search, ArrowRight } from "lucide-react";
import type { ComponentCategory, ComponentMeta } from "./types";

const CATEGORIES: readonly ComponentCategory[] = [
  {
    id: "actions",
    name: "Actions & Foundations",
    description: "Polymorphic buttons, links, typography, and foundational primitives.",
    iconName: "Layers",
    badgeText: "7 Primitives",
    components: [
      { name: "Button", href: "/components/button", description: "Primary, secondary, outline, loading, and prefix/suffix affixes.", status: "stable" },
      { name: "IconButton", href: "/components/icon-button", description: "Accessible circular and square icon touch targets.", status: "stable" },
      { name: "ButtonGroup", href: "/components/button-dropdown", description: "Fused multi-action toolbars and segmented controls.", status: "stable" },
      { name: "FloatButton", href: "/components/float-button", description: "Corner floating action triggers with auto-elevation.", status: "new" },
      { name: "Link", href: "/components/link", description: "Accessible hypertext anchors with external indicator.", status: "stable" },
      { name: "Typography", href: "/components/typography", description: "Semantic heading, text, code, and lead paragraphs.", status: "stable" },
      { name: "Layout", href: "/components/layout", description: "Container, flex stack, responsive grid, and divider.", status: "stable" },
    ],
  },
  {
    id: "forms",
    name: "Form Controls",
    description: "Keyboard-navigable inputs, selects, toggles, and range sliders.",
    iconName: "Sliders",
    badgeText: "10 Primitives",
    components: [
      { name: "Input", href: "/components/input", description: "Slate surface inputs with prefix, suffix, and validation.", status: "stable" },
      { name: "Select", href: "/components/select", description: "Accessible custom select dropdown with portal elevation.", status: "stable" },
      { name: "MultiSelectPro", href: "/components/multi-select-pro", description: "Multi-tag chip selection with search filter.", status: "new" },
      { name: "Checkbox", href: "/components/checkbox", description: "Tri-state checkboxes with indeterminate support.", status: "stable" },
      { name: "Radio", href: "/components/radio", description: "Single-choice radio item groups with accessible focus.", status: "stable" },
      { name: "Switch", href: "/components/switch", description: "Animated binary state toggle with micro-spring easing.", status: "stable" },
      { name: "Slider", href: "/components/slider", description: "Continuous and discrete numeric range track controls.", status: "stable" },
      { name: "TextArea", href: "/components/textarea", description: "Auto-expanding multi-line text input fields.", status: "stable" },
      { name: "DatePicker", href: "/components/date-picker", description: "Calendar popover date and time selection.", status: "new" },
      { name: "OTPInput", href: "/components/otp-input", description: "One-time passcode partitioned input cells.", status: "new" },
    ],
  },
  {
    id: "feedback",
    name: "Feedback & Status",
    description: "Non-intrusive status alerts, toasts, progress, and skeletal loaders.",
    iconName: "BellRing",
    badgeText: "7 Primitives",
    components: [
      { name: "Badge", href: "/components/badge", description: "Status tags, count pills, and live pulsing indicator dots.", status: "stable" },
      { name: "Tag", href: "/components/tag", description: "Dismissible label chips with interactive states.", status: "stable" },
      { name: "Alert", href: "/components/alert", description: "High-contrast informational, warning, and error callouts.", status: "stable" },
      { name: "Toast", href: "/components/toast", description: "Portal-elevated notification stack with auto-dismiss.", status: "stable" },
      { name: "Spinner", href: "/components/spinner", description: "Zero-layout-shift SVG loading spinners.", status: "stable" },
      { name: "Progress", href: "/components/progress", description: "Linear and circular determinate capacity indicators.", status: "stable" },
      { name: "Skeleton", href: "/components/skeleton", description: "Shimmer placeholder loaders for asynchronous content.", status: "stable" },
    ],
  },
  {
    id: "overlays",
    name: "Overlays & Navigation",
    description: "Modals, drawers, tooltips, popovers, and site navigation rails.",
    iconName: "Eye",
    badgeText: "10 Primitives",
    components: [
      { name: "Modal", href: "/components/modal", description: "Body-portaled dialogs with backdrop blur and focus trap.", status: "stable" },
      { name: "Drawer", href: "/components/drawer", description: "Slide-out sheets with gesture edge dismiss.", status: "stable" },
      { name: "Tooltip", href: "/components/tooltip", description: "Lightweight descriptive popovers with auto-placement.", status: "stable" },
      { name: "Popover", href: "/components/popover", description: "Rich interactive overlay panels with trigger anchors.", status: "stable" },
      { name: "DropdownMenu", href: "/components/dropdown", description: "Contextual hierarchical action lists.", status: "stable" },
      { name: "Navbar", href: "/components/navbar", description: "Adaptive site header with glass elevation.", status: "stable" },
      { name: "Sidebar", href: "/components/sidebar", description: "Collapsible navigation hierarchy rails.", status: "stable" },
      { name: "Tabs", href: "/components/tabs", description: "Segmented tab panels with animated active sliders.", status: "stable" },
      { name: "Breadcrumb", href: "/components/breadcrumb", description: "Hierarchical location trails with separator icons.", status: "stable" },
      { name: "Pagination", href: "/components/pagination", description: "Page sequence navigation with size selectors.", status: "stable" },
    ],
  },
  {
    id: "data",
    name: "Advanced & Data",
    description: "Complex enterprise data grids, visual charts, and rich code editors.",
    iconName: "Database",
    badgeText: "8 Primitives",
    components: [
      { name: "Table", href: "/components/table", description: "Sortable, selectable data grid with sticky headers.", status: "stable" },
      { name: "Accordion", href: "/components/accordion", description: "Collapsible content disclosure panels.", status: "stable" },
      { name: "Avatar", href: "/components/avatar", description: "Profile photos, initials fallbacks, and avatar stacks.", status: "stable" },
      { name: "Calendar", href: "/components/calendar", description: "Full month event grid with date range marking.", status: "new" },
      { name: "Chart", href: "/components/chart", description: "Hardware-accelerated analytics graphs and bar charts.", status: "new" },
      { name: "CodeEditor", href: "/components/code-editor", description: "Syntax-highlighted in-browser code editor.", status: "new" },
      { name: "JSONEditor", href: "/components/json-editor", description: "Interactive JSON tree view and schema validator.", status: "new" },
      { name: "FormBuilder", href: "/components/form-builder", description: "Declarative dynamic form generation engine.", status: "new" },
    ],
  },
];

export function LandingComponentMatrix(): ReactElement {
  const [selectedCatId, setSelectedCatId] = useState<string>("actions");
  const [filterQuery, setFilterQuery] = useState<string>("");

  const activeCategory: ComponentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCatId) || CATEGORIES[0];
  }, [selectedCatId]);

  const displayedComponents: readonly ComponentMeta[] = useMemo(() => {
    const q: string = filterQuery.trim().toLowerCase();
    if (!q) {
      return activeCategory.components;
    }
    // Search across all categories when user types in search box
    const allMatching: ComponentMeta[] = [];
    for (const cat of CATEGORIES) {
      for (const comp of cat.components) {
        if (comp.name.toLowerCase().includes(q) || comp.description.toLowerCase().includes(q)) {
          allMatching.push(comp);
        }
      }
    }
    return allMatching;
  }, [activeCategory, filterQuery]);

  return (
    <section className="section matrix-section" aria-labelledby="matrix-heading">
      <div className="app-container">
        <div className="section-header">
          <div className="section-tag">
            <Badge variant="primary" size="md">50+ Enterprise Primitives</Badge>
          </div>
          <h2 id="matrix-heading" className="section-title">
            The Complete Component Ecosystem
          </h2>
          <p className="section-desc">
            Explore every foundation, form control, overlay, and data visualization primitive
            engineered in strict Cinder Slate design tokens.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="matrix-toolbar">
          <div className="matrix-search-box">
            <Input
              value={filterQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterQuery(e.target.value)}
              prefix={<Search size={15} aria-hidden="true" />}
              placeholder="Filter 50+ components by name or capability..."
              aria-label="Filter components"
            />
          </div>

          {!filterQuery && (
            <div className="matrix-pills-row" role="tablist" aria-label="Component categories">
              {CATEGORIES.map((cat: ComponentCategory) => {
                const isSelected: boolean = cat.id === selectedCatId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`matrix-pill-btn ${isSelected ? "matrix-pill-btn-active" : ""}`}
                    onClick={() => setSelectedCatId(cat.id)}
                  >
                    <span>{cat.name}</span>
                    <span className="matrix-pill-badge">{cat.badgeText}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Component Grid */}
        <div className="matrix-grid">
          {displayedComponents.map((comp: ComponentMeta) => (
            <Link key={comp.name} to={comp.href} className="matrix-card-link">
              <Card variant="surface" interactive className="matrix-card">
                <div className="matrix-card-top">
                  <CardTitle className="matrix-card-title">{comp.name}</CardTitle>
                  <Badge variant={comp.status === "new" ? "accent" : "default"} size="sm">
                    {comp.status === "new" ? "New" : "Stable"}
                  </Badge>
                </div>
                <CardDescription className="matrix-card-desc">
                  {comp.description}
                </CardDescription>
                <div className="matrix-card-cta">
                  <span>View Documentation</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {displayedComponents.length === 0 && (
          <div className="matrix-empty-state">
            <p>No components found matching &ldquo;{filterQuery}&rdquo;.</p>
          </div>
        )}
      </div>
    </section>
  );
}
