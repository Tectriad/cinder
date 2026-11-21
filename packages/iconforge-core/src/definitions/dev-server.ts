import type { IconDefinition } from "../types";

export const DEV_SERVER_ICONS: IconDefinition[] = [
  {
    name: "server",
    label: "Server",
    category: "devops",
    tags: ["rack", "blade", "host", "backend", "datacenter", "cluster"],
    aliases: ["rack", "host"],
    variants: {
      outline: [
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 2,
            width: 20,
            height: 8,
            rx: 2,
            ry: 2,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 14,
            width: 20,
            height: 8,
            rx: 2,
            ry: 2,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 6,
            x2: 6.01,
            y2: 6,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 18,
            x2: 6.01,
            y2: 18,
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
            x: 2,
            y: 2,
            width: 20,
            height: 8,
            rx: 2,
            fill: "currentColor",
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 14,
            width: 20,
            height: 8,
            rx: 2,
            fill: "currentColor",
          },
        },
        { tag: "circle", attrs: { cx: 6, cy: 6, r: 1, fill: "#ffffff" } },
        { tag: "circle", attrs: { cx: 6, cy: 18, r: 1, fill: "#ffffff" } },
      ],
      duotone: [
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 2,
            width: 20,
            height: 8,
            rx: 2,
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 14,
            width: 20,
            height: 8,
            rx: 2,
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 2,
            width: 20,
            height: 8,
            rx: 2,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 14,
            width: 20,
            height: 8,
            rx: 2,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        { tag: "circle", attrs: { cx: 6, cy: 6, r: 1, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 6, cy: 18, r: 1, fill: "currentColor" } },
      ],
      multicolor: [
        {
          tag: "rect",
          attrs: { x: 2, y: 2, width: 20, height: 8, rx: 2, fill: "#1e293b" },
        },
        {
          tag: "rect",
          attrs: { x: 2, y: 14, width: 20, height: 8, rx: 2, fill: "#1e293b" },
        },
        { tag: "circle", attrs: { cx: 6, cy: 6, r: 1.2, fill: "#10b981" } },
        { tag: "circle", attrs: { cx: 6, cy: 18, r: 1.2, fill: "#10b981" } },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 6,
            x2: 18,
            y2: 6,
            stroke: "#64748b",
            strokeWidth: 1.5,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 18,
            x2: 18,
            y2: 18,
            stroke: "#64748b",
            strokeWidth: 1.5,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 2,
            width: 20,
            height: 8,
            rx: 2,
            fill: "url(#icon-grad)",
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 14,
            width: 20,
            height: 8,
            rx: 2,
            fill: "url(#icon-grad)",
          },
        },
        { tag: "circle", attrs: { cx: 6, cy: 6, r: 1, fill: "#ffffff" } },
        { tag: "circle", attrs: { cx: 6, cy: 18, r: 1, fill: "#ffffff" } },
      ],
      rounded: [
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 2.5,
            width: 20,
            height: 7.5,
            rx: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 14,
            width: 20,
            height: 7.5,
            rx: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "circle",
          attrs: { cx: 6, cy: 6.2, r: 1, fill: "currentColor" },
        },
        {
          tag: "circle",
          attrs: { cx: 6, cy: 17.8, r: 1, fill: "currentColor" },
        },
      ],
    },
    }
];
