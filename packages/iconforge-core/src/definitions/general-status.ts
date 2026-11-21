import type { IconDefinition } from "../types";

export const GENERAL_STATUS_ICONS: IconDefinition[] = [
  {
    name: "x-close",
    label: "Close",
    category: "general",
    tags: ["dismiss", "cross", "cancel", "delete", "clear"],
    aliases: ["close", "cross", "cancel"],
    variants: {
      outline: [
        {
          tag: "line",
          attrs: {
            x1: 18,
            y1: 6,
            x2: 6,
            y2: 18,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 6,
            x2: 18,
            y2: 18,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      filled: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 10, fill: "currentColor" },
        },
        {
          tag: "line",
          attrs: {
            x1: 15,
            y1: 9,
            x2: 9,
            y2: 15,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 9,
            y1: 9,
            x2: 15,
            y2: 15,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      duotone: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 9, fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "line",
          attrs: {
            x1: 16,
            y1: 8,
            x2: 8,
            y2: 16,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 8,
            y1: 8,
            x2: 16,
            y2: 16,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      multicolor: [
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 9.5, fill: "#fee2e2" } },
        {
          tag: "line",
          attrs: {
            x1: 15,
            y1: 9,
            x2: 9,
            y2: 15,
            stroke: "#ef4444",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 9,
            y1: 9,
            x2: 15,
            y2: 15,
            stroke: "#ef4444",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 10, fill: "url(#icon-grad)" },
        },
        {
          tag: "line",
          attrs: {
            x1: 15,
            y1: 9,
            x2: 9,
            y2: 15,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 9,
            y1: 9,
            x2: 15,
            y2: 15,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      rounded: [
        {
          tag: "path",
          attrs: {
            d: "M17 7L7 17M7 7l10 10",
            stroke: "currentColor",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
      ],
    },
  },

  // 9. Check
  {
    name: "check",
    label: "Check",
    category: "general",
    tags: ["checkmark", "tick", "success", "done", "confirm"],
    aliases: ["checkmark", "tick"],
    variants: {
      outline: [
        {
          tag: "polyline",
          attrs: {
            points: "20 6 9 17 4 12",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      filled: [
        {
          tag: "path",
          attrs: {
            d: "M9 16.2l-3.5-3.5a1 1 0 0 0-1.4 1.4l4.2 4.2a1 1 0 0 0 1.4 0l11-11a1 1 0 1 0-1.4-1.4L9 16.2z",
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "path",
          attrs: { d: "M4 12l5 5L20 6", fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "polyline",
          attrs: {
            points: "20 6 9 17 4 12",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      multicolor: [
        {
          tag: "polyline",
          attrs: {
            points: "20 6 9 17 4 12",
            fill: "none",
            stroke: "#10b981",
            strokeWidth: 2.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "path",
          attrs: {
            d: "M9 16.2l-3.5-3.5a1 1 0 0 0-1.4 1.4l4.2 4.2a1 1 0 0 0 1.4 0l11-11a1 1 0 1 0-1.4-1.4L9 16.2z",
            fill: "url(#icon-grad)",
          },
        },
      ],
      rounded: [
        {
          tag: "path",
          attrs: {
            d: "M4.5 12.5l4.3 4.3a.5.5 0 0 0 .7 0L19.5 7",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
    },
  },

  // 10. Check-Circle
  {
    name: "check-circle",
    label: "Check Circle",
    category: "general",
    tags: ["approved", "success", "verified", "passed", "done"],
    aliases: ["verified", "approved"],
    variants: {
      outline: [
        {
          tag: "path",
          attrs: {
            d: "M22 11.08V12a10 10 0 1 1-5.93-9.14",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "polyline",
          attrs: {
            points: "22 4 12 14.01 9 11.01",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      filled: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 10, fill: "currentColor" },
        },
        {
          tag: "polyline",
          attrs: {
            points: "16 9 11 14 8 11",
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      duotone: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 10, fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 12,
            r: 9,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "polyline",
          attrs: {
            points: "16 9 11 14 8 11",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      multicolor: [
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 10, fill: "#dcfce7" } },
        {
          tag: "polyline",
          attrs: {
            points: "16 9 11 14 8 11",
            fill: "none",
            stroke: "#16a34a",
            strokeWidth: 2.2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 10, fill: "url(#icon-grad)" },
        },
        {
          tag: "polyline",
          attrs: {
            points: "16 9 11 14 8 11",
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      rounded: [
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 12,
            r: 9,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M8.5 12l2.5 2.5 5-5",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2.2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
    },
    }
];
