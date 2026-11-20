import {
  Badge,
  Alert,
  Spinner,
  ProgressBar,
  Skeleton,
  Tag,
  Avatar,
  AvatarGroup,
} from "@cinder-ui/core";
import type { CatalogCategory } from "./catalogTypes";

export const PART2_CATEGORIES: CatalogCategory[] = [
  {
    category: "Data Display",
    components: [
      {
        name: "CDCard",
        subtitle: "Card container",
        desc: "Content container with compound title, description, cover, and extra actions.",
        path: "/components/card",
        preview: (
          <div
            style={{
              width: "120px",
              padding: "6px 8px",
              border: "1px solid var(--cinder-border)",
              borderRadius: "6px",
              background: "var(--cinder-surface)",
              fontSize: "10px",
              color: "var(--cinder-text)",
            }}
          >
            <div style={{ fontWeight: 600 }}>Card Title</div>
            <div style={{ fontSize: "9px", color: "var(--cinder-muted)" }}>Content</div>
          </div>
        ),
      },
      {
        name: "CDTable",
        subtitle: "Data grid table",
        desc: "Tabular records display with sorting, selection checkboxes, and pagination.",
        path: "/components/table",
        badge: "New",
        preview: (
          <div style={{
            width: "120px",
            border: "1px solid var(--cinder-border)",
            borderRadius: "4px",
            overflow: "hidden",
            fontSize: "9px",
          }}>
            <div style={{ display: "flex", background: "var(--cinder-surface-hover)", padding: "3px 6px", fontWeight: 600 }}>
              <span style={{ flex: 1 }}>Name</span>
              <span>Status</span>
            </div>
            <div style={{ display: "flex", padding: "3px 6px", borderTop: "1px solid var(--cinder-border)" }}>
              <span style={{ flex: 1 }}>pod-1</span>
              <span style={{ color: "var(--cinder-success)" }}>OK</span>
            </div>
          </div>
        ),
      },
      {
        name: "CDList",
        subtitle: "Item sequence",
        desc: "Vertical list container for items, users, and activities with meta and actions.",
        path: "/components/list",
        badge: "New",
        preview: (
          <div style={{
            width: "120px",
            border: "1px solid var(--cinder-border)",
            borderRadius: "4px",
            padding: "4px 6px",
            fontSize: "9px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "var(--cinder-primary)" }} />
            <div style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              User Item
            </div>
          </div>
        ),
      },
      {
        name: "CDAccordion",
        subtitle: "Collapsible panels",
        desc: "Collapsible panel stack for organizing dense content and FAQs.",
        path: "/components/accordion",
        badge: "New",
        preview: (
          <div style={{
            width: "120px",
            border: "1px solid var(--cinder-border)",
            borderRadius: "4px",
            overflow: "hidden",
            fontSize: "9px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 6px", background: "var(--cinder-surface)" }}>
              <span>Panel 1</span>
              <span>v</span>
            </div>
          </div>
        ),
      },
      {
        name: "CDAvatar",
        subtitle: "User identity",
        desc: "Identity representation with images, initials, status badges, and groups.",
        path: "/components/avatar",
        badge: "New",
        preview: (
          <AvatarGroup maxCount={2} size="sm">
            <Avatar>JD</Avatar>
            <Avatar>MK</Avatar>
            <Avatar>OP</Avatar>
          </AvatarGroup>
        ),
      },
      {
        name: "CDTag",
        subtitle: "Filter chip",
        desc: "Categorization tags and filter chips with closable buttons and semantic colors.",
        path: "/components/tag",
        badge: "New",
        preview: (
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <Tag size="sm" variant="primary">Tag</Tag>
            <Tag size="sm" variant="success">OK</Tag>
          </div>
        ),
      },
      {
        name: "CDBadge",
        subtitle: "Badge status",
        desc: "Low-glare status pill with optional pulsing dot.",
        path: "/components/badge",
        preview: <Badge variant="primary" size="sm" dot>Status</Badge>,
      },
      {
        name: "CDOutlookCalendar",
        subtitle: "Outlook scheduler",
        desc: "Full-scale scheduler with Day, Week, Month, and Year views, 24h time grid, and event tracking.",
        path: "/components/calendar",
        badge: "New",
        preview: (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px",
            width: "120px",
            padding: "4px",
            border: "1px solid var(--cinder-border)",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            fontSize: "8px",
            textAlign: "center",
          }}>
            <span style={{ color: "var(--cinder-muted)" }}>M</span>
            <span style={{ color: "var(--cinder-muted)" }}>T</span>
            <span style={{ color: "var(--cinder-muted)" }}>W</span>
            <span style={{ color: "var(--cinder-muted)" }}>T</span>
            <span style={{ color: "var(--cinder-muted)" }}>F</span>
            <span style={{ color: "var(--cinder-muted)" }}>S</span>
            <span style={{ color: "var(--cinder-muted)" }}>S</span>
            <span>1</span>
            <span>2</span>
            <span style={{ background: "var(--cinder-primary)", color: "#fff", borderRadius: "2px" }}>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </div>
        ),
      },
    ],
  },
  {
    category: "Feedback",
    components: [
      {
        name: "CDAlert",
        subtitle: "Feedback banner",
        desc: "Contextual feedback notices for operational outcomes.",
        path: "/components/alert",
        badge: "New",
        preview: (
          <div style={{ width: "120px" }}>
            <Alert type="info" title="Notice" />
          </div>
        ),
      },
      {
        name: "CDToast",
        subtitle: "Snackbar alert",
        desc: "Floating notification that auto-dismisses after asynchronous operations.",
        path: "/components/toast",
        badge: "New",
        preview: (
          <div style={{
            padding: "4px 8px",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            border: "1px solid var(--cinder-border)",
            borderLeft: "3px solid var(--cinder-success)",
            fontSize: "11px",
            color: "var(--cinder-text)",
          }}>
            Saved
          </div>
        ),
      },
      {
        name: "CDProgressBar",
        subtitle: "Progress bar",
        desc: "Progress completion bar with percentage label and active shimmer.",
        path: "/components/progress",
        badge: "New",
        preview: (
          <div style={{ width: "110px" }}>
            <ProgressBar value={65} size="sm" />
          </div>
        ),
      },
      {
        name: "CDSpinner",
        subtitle: "Loader spinner",
        desc: "Animated circular SVG or dots for asynchronous loading states.",
        path: "/components/spinner",
        badge: "New",
        preview: <Spinner size="sm" />,
      },
      {
        name: "CDSkeleton",
        subtitle: "Shimmer placeholder",
        desc: "Shimmer placeholders reducing perceived latency during data fetching.",
        path: "/components/skeleton",
        badge: "New",
        preview: (
          <div style={{ width: "100px" }}>
            <Skeleton lines={2} />
          </div>
        ),
      },
    ],
  },
  {
    category: "Overlay",
    components: [
      {
        name: "CDModal",
        subtitle: "Dialog overlay",
        desc: "Body portal modal dialog with background blur, focus isolation, and smooth entrance animation.",
        path: "/components/modal",
        badge: "New",
        preview: (
          <div style={{
            width: "120px",
            padding: "6px 8px",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            border: "1px solid var(--cinder-border)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}>
            <div style={{ height: "6px", width: "50%", background: "var(--cinder-primary)", borderRadius: "2px" }} />
            <div style={{ height: "4px", width: "80%", background: "var(--cinder-muted)", opacity: 0.4, borderRadius: "2px" }} />
          </div>
        ),
      },
      {
        name: "CDDrawer",
        subtitle: "Sliding sheet",
        desc: "Off-screen sheet sliding from any edge with backdrop dimming and scroll lock.",
        path: "/components/drawer",
        badge: "New",
        preview: (
          <div style={{
            width: "120px",
            height: "44px",
            borderRadius: "6px",
            background: "var(--cinder-canvas)",
            border: "1px solid var(--cinder-border)",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "48px",
              background: "var(--cinder-surface)",
              borderLeft: "2px solid var(--cinder-primary)",
            }} />
          </div>
        ),
      },
      {
        name: "CDTooltip",
        subtitle: "Contextual balloon",
        desc: "Collision-aware contextual balloon pointing to triggers with high-contrast text.",
        path: "/components/tooltip",
        badge: "New",
        preview: (
          <div style={{
            padding: "3px 8px",
            borderRadius: "4px",
            background: "var(--cinder-text)",
            color: "var(--cinder-canvas)",
            fontSize: "10px",
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}>
            Tooltip
          </div>
        ),
      },
      {
        name: "CDPopover",
        subtitle: "Floating card",
        desc: "Floating content card with interactive forms, actions, and auto-flip edge detection.",
        path: "/components/popover",
        badge: "New",
        preview: (
          <div style={{
            padding: "5px 8px",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            border: "1px solid var(--cinder-border)",
            fontSize: "10px",
            color: "var(--cinder-text)",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}>
            <span style={{ fontWeight: 600 }}>Popover</span>
            <span style={{ fontSize: "9px", color: "var(--cinder-muted)" }}>Interactive card</span>
          </div>
        ),
      },
      {
        name: "CDDropdownMenu",
        subtitle: "Portal menu",
        desc: "Contextual dropdown menu with keyboard shortcuts, checkboxes, and overflow protection.",
        path: "/components/dropdown-menu",
        badge: "New",
        preview: (
          <div style={{
            padding: "4px 8px",
            borderRadius: "6px",
            background: "var(--cinder-surface)",
            border: "1px solid var(--cinder-border)",
            fontSize: "10px",
            color: "var(--cinder-text)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "110px",
          }}>
            <span>Edit</span>
            <span style={{ fontSize: "9px", color: "var(--cinder-muted)" }}>Ctrl+E</span>
          </div>
        ),
      },
    ],
  },
];
