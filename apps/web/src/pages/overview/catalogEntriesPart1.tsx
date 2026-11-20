import {
  Button,
  Input,
  Checkbox,
  CDIcons,
  Heading,
  CDText,
} from "@cinder-ui/core";
import type { CatalogCategory } from "./catalogTypes";

export const PART1_CATEGORIES: CatalogCategory[] = [
  {
    category: "General",
    components: [
      {
        name: "CDButton",
        subtitle: "Action button",
        desc: "To trigger an operation with primary, secondary, and tertiary hierarchy.",
        path: "/components/button",
        badge: "Core",
        preview: <Button size="sm" variant="primary">Button</Button>,
      },
      {
        name: "CDFloatButton",
        subtitle: "Floating action",
        desc: "Corner-anchored floating actions with square, circle, and expandable speed dials.",
        path: "/components/float-button",
        badge: "New",
        preview: (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              backgroundColor: "var(--cinder-primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <CDIcons.Plus size={14} />
            </div>
            <div style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "var(--cinder-surface)",
              border: "1px solid var(--cinder-border)",
              color: "var(--cinder-text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <CDIcons.Sparkles size={14} />
            </div>
          </div>
        ),
      },
      {
        name: "CDIcon",
        subtitle: "Vector iconography",
        desc: "Geometric stroke icons built with Hugeicons precision and customizable sizes.",
        path: "/components/icon",
        preview: (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <CDIcons.Sparkles size="md" color="var(--cinder-primary)" />
            <CDIcons.Flame size="md" color="var(--cinder-primary)" />
            <CDIcons.Shield size="md" color="var(--cinder-muted)" />
          </div>
        ),
      },
      {
        name: "CDIconButton",
        subtitle: "Icon button",
        desc: "Accessible icon trigger with square and circular shapes.",
        path: "/components/icon-button",
        preview: <Button size="sm" variant="secondary">Icon</Button>,
      },
      {
        name: "CDTypography",
        subtitle: "Text & headings",
        desc: "Headings, lead paragraphs, form labels, inline code, and keyboard shortcut indicators.",
        path: "/components/typography",
        badge: "New",
        preview: (
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Heading level={5} style={{ fontSize: "13px", margin: 0 }}>Heading</Heading>
            <CDText type="muted" size="xs">Secondary text</CDText>
          </div>
        ),
      },
    ],
  },
  {
    category: "Layout",
    components: [
      {
        name: "CDBox",
        subtitle: "Polymorphic box",
        desc: "Essential wrapper component with spacing, surface tokens, and border radius.",
        path: "/components/box",
        badge: "New",
        preview: (
          <div style={{
            padding: "6px 12px",
            border: "1px solid var(--cinder-border)",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            fontSize: "11px",
            color: "var(--cinder-text)"
          }}>
            Box Surface
          </div>
        ),
      },
      {
        name: "CDStack",
        subtitle: "Flexbox stack",
        desc: "Linear horizontal (HStack) and vertical (VStack) flex layouts with spacing and divider injection.",
        path: "/components/stack",
        badge: "New",
        preview: (
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "var(--cinder-primary)" }} />
            <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "var(--cinder-border)" }} />
            <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "var(--cinder-surface)" }} />
          </div>
        ),
      },
      {
        name: "CDGrid",
        subtitle: "2D CSS grid",
        desc: "12-column grid system with responsive column spans and auto-fit minmax patterns.",
        path: "/components/grid",
        badge: "New",
        preview: (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", width: "48px" }}>
            <div style={{ height: "12px", borderRadius: "2px", background: "var(--cinder-primary)" }} />
            <div style={{ height: "12px", borderRadius: "2px", background: "var(--cinder-primary)" }} />
            <div style={{ height: "12px", borderRadius: "2px", background: "var(--cinder-primary)" }} />
            <div style={{ height: "12px", borderRadius: "2px", background: "var(--cinder-primary)" }} />
          </div>
        ),
      },
      {
        name: "CDDivider",
        subtitle: "Line separator",
        desc: "Horizontal and vertical dividers with embedded titles and dashed variants.",
        path: "/components/divider",
        badge: "New",
        preview: (
          <div style={{ width: "60px", borderTop: "1px dashed var(--cinder-border)" }} />
        ),
      },
    ],
  },
  {
    category: "Navigation",
    components: [
      {
        name: "CDDropdown",
        subtitle: "Action dropdown",
        desc: "Floating contextual menu for buttons, links, or custom triggers.",
        path: "/components/dropdown",
        badge: "New",
        preview: (
          <Button size="sm" variant="primary" suffixIcon={<CDIcons.ChevronDown size="sm" />}>
            Menu
          </Button>
        ),
      },
      {
        name: "CDButtonDropdown",
        subtitle: "Split action",
        desc: "Action menus with standard and split-button support.",
        path: "/components/button-dropdown",
        preview: <Button size="sm" variant="glass">Actions</Button>,
      },
    ],
  },
  {
    category: "Data Entry",
    components: [
      {
        name: "CDCheckbox",
        subtitle: "Choice selector",
        desc: "Multi-choice selector with checked, indeterminate, rich metadata, and card options.",
        path: "/components/checkbox",
        badge: "New",
        preview: (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Checkbox size="sm" defaultChecked label="Square" />
            <Checkbox size="sm" round defaultChecked label="Round" />
          </div>
        ),
      },
      {
        name: "CDInput",
        subtitle: "Input field",
        desc: "Form input with Slate border and vibrant blue focus ring.",
        path: "/components/input",
        preview: <Input size="sm" placeholder="Text..." style={{ width: "120px" }} />,
      },
      {
        name: "CDSelect",
        subtitle: "Select control",
        desc: "Dropdown select with search, tags, clearing, and rich option metadata.",
        path: "/components/select",
        badge: "New",
        preview: (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 8px",
            border: "1px solid var(--cinder-border)",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            width: "120px",
            fontSize: "11px",
            color: "var(--cinder-text)"
          }}>
            <span>Option</span>
            <CDIcons.ChevronDown size={12} color="var(--cinder-muted)" />
          </div>
        ),
      },
      {
        name: "CDDatePicker",
        subtitle: "Date & range selector",
        desc: "Date and range picker supporting day, ISO week, month, and year selection.",
        path: "/components/date-picker",
        badge: "New",
        preview: (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 8px",
            border: "1px solid var(--cinder-border)",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            width: "120px",
            fontSize: "11px",
            color: "var(--cinder-text)"
          }}>
            <span>2026-11-20</span>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--cinder-muted)" }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        ),
      },
      {
        name: "CDTimePicker",
        subtitle: "Time selector",
        desc: "Precision time picker with virtual columns, 12h/24h support, and step intervals.",
        path: "/components/time-picker",
        badge: "New",
        preview: (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 8px",
            border: "1px solid var(--cinder-border)",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            width: "120px",
            fontSize: "11px",
            color: "var(--cinder-text)"
          }}>
            <span>09:30:00</span>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--cinder-muted)" }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        ),
      },
      {
        name: "CDFilePicker",
        subtitle: "File upload & preview",
        desc: "Drag-and-drop file ingestion, picture card galleries, and interactive zoomable image lightbox preview.",
        path: "/components/file-picker",
        badge: "New",
        preview: (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 8px",
            border: "1px dashed var(--cinder-border)",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            fontSize: "11px",
            color: "var(--cinder-text)"
          }}>
            <CDIcons.Upload size={12} color="var(--cinder-primary)" />
            <span>Upload File</span>
          </div>
        ),
      },
      {
        name: "CDFormBuilder",
        subtitle: "Dynamic schema form",
        desc: "Declarative schema-driven form builder with multi-type inputs, dynamic validation, regex injection, and configurable actions.",
        path: "/components/form-builder",
        badge: "New",
        preview: (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "4px 8px",
            border: "1px solid var(--cinder-border)",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            width: "120px",
            fontSize: "10px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--cinder-muted)" }}>
              <span>Field</span>
              <span style={{ color: "var(--cinder-primary)" }}>*</span>
            </div>
            <div style={{
              height: "16px",
              background: "var(--cinder-surface-hover, rgba(255,255,255,0.05))",
              borderRadius: "3px",
              border: "1px solid var(--cinder-border)"
            }} />
          </div>
        ),
      },
    ],
  },
];
