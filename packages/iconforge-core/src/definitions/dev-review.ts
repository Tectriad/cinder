import type { IconDefinition } from "../types";

export const DEV_REVIEW_ICONS: IconDefinition[] = [
  {
    name: "git-pull-request",
    label: "Git Pull Request",
    category: "development",
    tags: ["pr", "code-review", "merge", "git", "diff"],
    aliases: ["pr", "pull-request"],
    variants: {
      outline: [
        {
          tag: "circle",
          attrs: {
            cx: 18,
            cy: 18,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "circle",
          attrs: {
            cx: 6,
            cy: 6,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M13 6h3a2 2 0 0 1 2 2v7",
            fill: "none",
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
            y1: 9,
            x2: 6,
            y2: 21,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      filled: [
        {
          tag: "circle",
          attrs: { cx: 18, cy: 18, r: 3, fill: "currentColor" },
        },
        { tag: "circle", attrs: { cx: 6, cy: 6, r: 3, fill: "currentColor" } },
        {
          tag: "path",
          attrs: {
            d: "M13 6h3a2 2 0 0 1 2 2v7",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 9,
            x2: 6,
            y2: 21,
            stroke: "currentColor",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
      ],
      duotone: [
        {
          tag: "circle",
          attrs: { cx: 18, cy: 18, r: 4, fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "circle",
          attrs: { cx: 6, cy: 6, r: 4, fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "circle",
          attrs: {
            cx: 18,
            cy: 18,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "circle",
          attrs: {
            cx: 6,
            cy: 6,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M13 6h3a2 2 0 0 1 2 2v7",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 9,
            x2: 6,
            y2: 21,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      multicolor: [
        { tag: "circle", attrs: { cx: 18, cy: 18, r: 3.5, fill: "#10b981" } },
        { tag: "circle", attrs: { cx: 6, cy: 6, r: 3.5, fill: "#3b82f6" } },
        {
          tag: "path",
          attrs: {
            d: "M13 6h3a2 2 0 0 1 2 2v7",
            fill: "none",
            stroke: "#10b981",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 9,
            x2: 6,
            y2: 21,
            stroke: "#64748b",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "circle",
          attrs: { cx: 18, cy: 18, r: 3.5, fill: "url(#icon-grad)" },
        },
        {
          tag: "circle",
          attrs: { cx: 6, cy: 6, r: 3.5, fill: "url(#icon-grad)" },
        },
        {
          tag: "path",
          attrs: {
            d: "M13 6h3a2 2 0 0 1 2 2v7",
            fill: "none",
            stroke: "url(#icon-grad)",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 9,
            x2: 6,
            y2: 21,
            stroke: "url(#icon-grad)",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
      ],
      rounded: [
        {
          tag: "circle",
          attrs: {
            cx: 18,
            cy: 18,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "circle",
          attrs: {
            cx: 6,
            cy: 6,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M13 6h3a2 2 0 0 1 2 2v7",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2.2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 9,
            x2: 6,
            y2: 20.5,
            stroke: "currentColor",
            strokeWidth: 2.2,
            strokeLinecap: "round",
          },
        },
      ],
    },
  },

  // 28. API,
  {
    name: "bug",
    label: "Bug",
    category: "development",
    tags: ["defect", "issue", "debug", "error", "glitch", "testing"],
    aliases: ["defect", "debug", "issue"],
    variants: {
      outline: [
        {
          tag: "rect",
          attrs: {
            x: 8,
            y: 8,
            width: 8,
            height: 11,
            rx: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M6 13H2M22 13h-4M6 9L3 6M21 6l-3 3M6 17l-3 3M21 20l-3-3",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M9 6a3 3 0 0 1 6 0v2H9V6z",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
      ],
      filled: [
        {
          tag: "path",
          attrs: {
            d: "M12 2a4 4 0 0 0-4 4v2H7a1 1 0 0 0 0 2h1v1H7a1 1 0 0 0 0 2h1v1H7a1 1 0 0 0 0 2h1v1a4 4 0 0 0 8 0v-1h1a1 1 0 0 0 0-2h-1v-1h1a1 1 0 0 0 0-2h-1V10h1a1 1 0 0 0 0-2h-1V6a4 4 0 0 0-4-4z",
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "rect",
          attrs: {
            x: 8,
            y: 8,
            width: 8,
            height: 11,
            rx: 4,
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 8,
            y: 8,
            width: 8,
            height: 11,
            rx: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M6 13H2M22 13h-4M6 9L3 6M21 6l-3 3M6 17l-3 3M21 20l-3-3",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M9 6a3 3 0 0 1 6 0v2H9V6z",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
      ],
      multicolor: [
        {
          tag: "rect",
          attrs: { x: 8, y: 8, width: 8, height: 11, rx: 4, fill: "#ef4444" },
        },
        {
          tag: "path",
          attrs: { d: "M9 6a3 3 0 0 1 6 0v2H9V6z", fill: "#1e293b" },
        },
        {
          tag: "path",
          attrs: {
            d: "M6 13H2M22 13h-4M6 9L3 6M21 6l-3 3M6 17l-3 3M21 20l-3-3",
            stroke: "#64748b",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "rect",
          attrs: {
            x: 8,
            y: 8,
            width: 8,
            height: 11,
            rx: 4,
            fill: "url(#icon-grad)",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M6 13H2M22 13h-4M6 9L3 6M21 6l-3 3M6 17l-3 3M21 20l-3-3",
            stroke: "url(#icon-grad)",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M9 6a3 3 0 0 1 6 0v2H9V6z",
            fill: "none",
            stroke: "url(#icon-grad)",
            strokeWidth: 2,
          },
        },
      ],
      rounded: [
        {
          tag: "rect",
          attrs: {
            x: 8,
            y: 8,
            width: 8,
            height: 11,
            rx: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M6 13H3M21 13h-3M6.5 9.5L4 7M20 7l-2.5 2.5M6.5 16.5L4 19M20 19l-2.5-2.5",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M9 6a3 3 0 0 1 6 0v2H9V6z",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
      ],
    },
  },
];

