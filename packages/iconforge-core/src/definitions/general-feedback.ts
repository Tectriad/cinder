import type { IconDefinition } from "../types";

export const GENERAL_FEEDBACK_ICONS: IconDefinition[] = [
  {
    name: "alert-triangle",
    label: "Alert Triangle",
    category: "general",
    tags: ["warning", "danger", "caution", "exclamation", "issue"],
    aliases: ["warning", "caution"],
    variants: {
      outline: [
        {
          tag: "path",
          attrs: {
            d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
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
            x1: 12,
            y1: 9,
            x2: 12,
            y2: 13,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "circle",
          attrs: { cx: 12, cy: 17, r: 1, fill: "currentColor" },
        },
      ],
      filled: [
        {
          tag: "path",
          attrs: {
            d: "M12 2.5a2 2 0 0 1 1.73 1l8.47 14.12a2 2 0 0 1-1.73 3H3.53a2 2 0 0 1-1.73-3L10.27 3.5a2 2 0 0 1 1.73-1z",
            fill: "currentColor",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 8.5,
            x2: 12,
            y2: 13,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        { tag: "circle", attrs: { cx: 12, cy: 16.5, r: 1, fill: "#ffffff" } },
      ],
      duotone: [
        {
          tag: "path",
          attrs: {
            d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 9,
            x2: 12,
            y2: 13,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "circle",
          attrs: { cx: 12, cy: 17, r: 1, fill: "currentColor" },
        },
      ],
      multicolor: [
        {
          tag: "path",
          attrs: {
            d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
            fill: "#fef3c7",
            stroke: "#f59e0b",
            strokeWidth: 2,
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 9,
            x2: 12,
            y2: 13,
            stroke: "#b45309",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        { tag: "circle", attrs: { cx: 12, cy: 17, r: 1, fill: "#b45309" } },
      ],
      gradient: [
        {
          tag: "path",
          attrs: {
            d: "M12 2.5a2 2 0 0 1 1.73 1l8.47 14.12a2 2 0 0 1-1.73 3H3.53a2 2 0 0 1-1.73-3L10.27 3.5a2 2 0 0 1 1.73-1z",
            fill: "url(#icon-grad)",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 8.5,
            x2: 12,
            y2: 13,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        { tag: "circle", attrs: { cx: 12, cy: 16.5, r: 1, fill: "#ffffff" } },
      ],
      rounded: [
        {
          tag: "path",
          attrs: {
            d: "M10.8 4.3a1.4 1.4 0 0 1 2.4 0l7.8 13.5a1.4 1.4 0 0 1-1.2 2.2H4.2a1.4 1.4 0 0 1-1.2-2.2z",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinejoin: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 9.5,
            x2: 12,
            y2: 13.5,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "circle",
          attrs: { cx: 12, cy: 16.5, r: 1, fill: "currentColor" },
        },
      ],
    },
  },

  // 12. Info
  {
    name: "info",
    label: "Info",
    category: "general",
    tags: ["details", "help", "information", "about", "hint"],
    aliases: ["information", "about"],
    variants: {
      outline: [
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 12,
            r: 10,
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
            x1: 12,
            y1: 16,
            x2: 12,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 8,
            x2: 12.01,
            y2: 8,
            stroke: "currentColor",
            strokeWidth: 2.5,
            strokeLinecap: "round",
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
            x1: 12,
            y1: 16,
            x2: 12,
            y2: 12,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        { tag: "circle", attrs: { cx: 12, cy: 8, r: 1, fill: "#ffffff" } },
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
          tag: "line",
          attrs: {
            x1: 12,
            y1: 16,
            x2: 12,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        { tag: "circle", attrs: { cx: 12, cy: 8, r: 1, fill: "currentColor" } },
      ],
      multicolor: [
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 10, fill: "#e0f2fe" } },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 16,
            x2: 12,
            y2: 12,
            stroke: "#0284c7",
            strokeWidth: 2.2,
            strokeLinecap: "round",
          },
        },
        { tag: "circle", attrs: { cx: 12, cy: 8, r: 1.2, fill: "#0284c7" } },
      ],
      gradient: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 10, fill: "url(#icon-grad)" },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 16,
            x2: 12,
            y2: 12,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        { tag: "circle", attrs: { cx: 12, cy: 8, r: 1, fill: "#ffffff" } },
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
          tag: "line",
          attrs: {
            x1: 12,
            y1: 16,
            x2: 12,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        { tag: "circle", attrs: { cx: 12, cy: 8, r: 1, fill: "currentColor" } },
      ],
    },
  },
];

