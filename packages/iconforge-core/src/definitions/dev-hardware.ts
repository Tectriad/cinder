import type { IconDefinition } from "../types";

export const DEV_HARDWARE_ICONS: IconDefinition[] = [
  {
    name: "cpu",
    label: "CPU",
    category: "hardware",
    tags: ["processor", "chip", "silicon", "hardware", "compute"],
    aliases: ["processor", "chip"],
    variants: {
      outline: [
        {
          tag: "rect",
          attrs: {
            x: 4,
            y: 4,
            width: 16,
            height: 16,
            rx: 2,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 9,
            y: 9,
            width: 6,
            height: 6,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 9,
            y1: 1,
            x2: 9,
            y2: 4,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 15,
            y1: 1,
            x2: 15,
            y2: 4,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 9,
            y1: 20,
            x2: 9,
            y2: 23,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 15,
            y1: 20,
            x2: 15,
            y2: 23,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 20,
            y1: 9,
            x2: 23,
            y2: 9,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 20,
            y1: 15,
            x2: 23,
            y2: 15,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 1,
            y1: 9,
            x2: 4,
            y2: 9,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 1,
            y1: 15,
            x2: 4,
            y2: 15,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      filled: [
        {
          tag: "rect",
          attrs: {
            x: 4,
            y: 4,
            width: 16,
            height: 16,
            rx: 2,
            fill: "currentColor",
          },
        },
        {
          tag: "rect",
          attrs: { x: 8, y: 8, width: 8, height: 8, rx: 1, fill: "#ffffff" },
        },
        {
          tag: "path",
          attrs: {
            d: "M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      duotone: [
        {
          tag: "rect",
          attrs: {
            x: 4,
            y: 4,
            width: 16,
            height: 16,
            rx: 2,
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 4,
            y: 4,
            width: 16,
            height: 16,
            rx: 2,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 9,
            y: 9,
            width: 6,
            height: 6,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      multicolor: [
        {
          tag: "rect",
          attrs: { x: 4, y: 4, width: 16, height: 16, rx: 2, fill: "#1e293b" },
        },
        {
          tag: "rect",
          attrs: {
            x: 8.5,
            y: 8.5,
            width: 7,
            height: 7,
            rx: 1,
            fill: "#3b82f6",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3",
            stroke: "#f59e0b",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "rect",
          attrs: {
            x: 4,
            y: 4,
            width: 16,
            height: 16,
            rx: 2,
            fill: "url(#icon-grad)",
          },
        },
        {
          tag: "rect",
          attrs: { x: 9, y: 9, width: 6, height: 6, rx: 1, fill: "#ffffff" },
        },
        {
          tag: "path",
          attrs: {
            d: "M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      rounded: [
        {
          tag: "rect",
          attrs: {
            x: 4,
            y: 4,
            width: 16,
            height: 16,
            rx: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 9,
            y: 9,
            width: 6,
            height: 6,
            rx: 2,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M9 1.5v2.5m6-2.5v2.5M9 20v2.5m6-2.5v2.5M20 9h2.5m-2.5 6h2.5M1.5 9H4m-2.5 6H4",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
    },
  },

  // 23. Database
  {
    name: "database",
    label: "Database",
    category: "databases",
    tags: ["storage", "sql", "data", "records", "table", "persistence"],
    aliases: ["sql", "storage"],
    variants: {
      outline: [
        {
          tag: "ellipse",
          attrs: {
            cx: 12,
            cy: 5,
            rx: 9,
            ry: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
      ],
      filled: [
        {
          tag: "ellipse",
          attrs: { cx: 12, cy: 5, rx: 9, ry: 3, fill: "currentColor" },
        },
        {
          tag: "path",
          attrs: {
            d: "M3 6.8v4.4c0 1.6 4 3 9 3s9-1.4 9-3V6.8C19.7 8 16 9 12 9S4.3 8 3 6.8zm0 7v4.4c0 1.6 4 3 9 3s9-1.4 9-3v-4.4C19.7 15 16 16 12 16s-7.7-1-9-2.2z",
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "path",
          attrs: {
            d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5c0-1.66-4-3-9-3s-9 1.34-9 3z",
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "ellipse",
          attrs: {
            cx: 12,
            cy: 5,
            rx: 9,
            ry: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
      ],
      multicolor: [
        {
          tag: "ellipse",
          attrs: { cx: 12, cy: 5, rx: 9, ry: 3, fill: "#60a5fa" },
        },
        {
          tag: "path",
          attrs: {
            d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5",
            fill: "none",
            stroke: "#2563eb",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3",
            fill: "none",
            stroke: "#1d4ed8",
            strokeWidth: 2,
          },
        },
      ],
      gradient: [
        {
          tag: "ellipse",
          attrs: { cx: 12, cy: 5, rx: 9, ry: 3, fill: "url(#icon-grad)" },
        },
        {
          tag: "path",
          attrs: {
            d: "M3 6.8v4.4c0 1.6 4 3 9 3s9-1.4 9-3V6.8C19.7 8 16 9 12 9S4.3 8 3 6.8zm0 7v4.4c0 1.6 4 3 9 3s9-1.4 9-3v-4.4C19.7 15 16 16 12 16s-7.7-1-9-2.2z",
            fill: "url(#icon-grad)",
          },
        },
      ],
      rounded: [
        {
          tag: "ellipse",
          attrs: {
            cx: 12,
            cy: 5.5,
            rx: 8.5,
            ry: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M20.5 12c0 1.6-3.8 2.8-8.5 2.8s-8.5-1.2-8.5-2.8",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M3.5 5.5v12.8c0 1.7 3.8 2.9 8.5 2.9s8.5-1.2 8.5-2.9V5.5",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
      ],
    },
    }
];
