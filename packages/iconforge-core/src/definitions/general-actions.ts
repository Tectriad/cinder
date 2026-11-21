import type { IconDefinition } from "../types";

export const GENERAL_ACTION_ICONS: IconDefinition[] = [
  {
    name: "bell",
    label: "Bell",
    category: "general",
    tags: ["alert", "notification", "reminder", "chime", "alarm"],
    aliases: ["alarm", "notification"],
    variants: {
      outline: [
        {
          tag: "path",
          attrs: {
            d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M13.73 21a2 2 0 0 1-3.46 0",
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
            d: "M12 2a6 6 0 0 0-6 6c0 6.5-2.5 8-2.9 8.3A1 1 0 0 0 4 18h16a1 1 0 0 0 .9-1.7C20.5 16 18 14.5 18 8a6 6 0 0 0-6-6zm0 19a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 21z",
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "path",
          attrs: {
            d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9z",
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M13.73 21a2 2 0 0 1-3.46 0",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      multicolor: [
        {
          tag: "path",
          attrs: {
            d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
            fill: "#f59e0b",
          },
        },
        {
          tag: "path",
          attrs: { d: "M13.73 21a2 2 0 0 1-3.46 0", fill: "#3b82f6" },
        },
      ],
      gradient: [
        {
          tag: "path",
          attrs: {
            d: "M12 2a6 6 0 0 0-6 6c0 6.5-2.5 8-2.9 8.3A1 1 0 0 0 4 18h16a1 1 0 0 0 .9-1.7C20.5 16 18 14.5 18 8a6 6 0 0 0-6-6zm0 19a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 21z",
            fill: "url(#icon-grad)",
          },
        },
      ],
      rounded: [
        {
          tag: "path",
          attrs: {
            d: "M18 8.5A6 6 0 0 0 6 8.5c0 6.5-2 8.5-2 8.5h16s-2-2-2-8.5",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M13.5 20.5a1.8 1.8 0 0 1-3 0",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
    },
  },

  // 6. Search
  {
    name: "search",
    label: "Search",
    category: "general",
    tags: ["find", "magnifier", "lookup", "explore", "inspect"],
    aliases: ["find", "magnifier"],
    variants: {
      outline: [
        {
          tag: "circle",
          attrs: {
            cx: 11,
            cy: 11,
            r: 8,
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
            x1: 21,
            y1: 21,
            x2: 16.65,
            y2: 16.65,
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
            d: "M11 2a9 9 0 1 0 5.62 16.03l4.67 4.68a1 1 0 0 0 1.42-1.42l-4.68-4.67A9 9 0 0 0 11 2zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14z",
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "circle",
          attrs: { cx: 11, cy: 11, r: 8, fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "circle",
          attrs: {
            cx: 11,
            cy: 11,
            r: 8,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 21,
            y1: 21,
            x2: 16.65,
            y2: 16.65,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      multicolor: [
        {
          tag: "circle",
          attrs: {
            cx: 11,
            cy: 11,
            r: 7.5,
            fill: "#e0f2fe",
            stroke: "#0284c7",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M16.5 16.5L21.5 21.5",
            stroke: "#0f172a",
            strokeWidth: 3,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "path",
          attrs: {
            d: "M11 2a9 9 0 1 0 5.62 16.03l4.67 4.68a1 1 0 0 0 1.42-1.42l-4.68-4.67A9 9 0 0 0 11 2zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14z",
            fill: "url(#icon-grad)",
          },
        },
      ],
      rounded: [
        {
          tag: "circle",
          attrs: {
            cx: 10.5,
            cy: 10.5,
            r: 7.5,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M16 16l4.5 4.5",
            stroke: "currentColor",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
      ],
    },
  },

  // 7. Menu
  {
    name: "menu",
    label: "Menu",
    category: "general",
    tags: ["hamburger", "navigation", "bars", "drawer", "sidebar"],
    aliases: ["hamburger", "bars"],
    variants: {
      outline: [
        {
          tag: "line",
          attrs: {
            x1: 3,
            y1: 12,
            x2: 21,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 3,
            y1: 6,
            x2: 21,
            y2: 6,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 3,
            y1: 18,
            x2: 21,
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
            x: 3,
            y: 5,
            width: 18,
            height: 2.5,
            rx: 1.25,
            fill: "currentColor",
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 3,
            y: 11,
            width: 18,
            height: 2.5,
            rx: 1.25,
            fill: "currentColor",
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 3,
            y: 17,
            width: 18,
            height: 2.5,
            rx: 1.25,
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "rect",
          attrs: {
            x: 3,
            y: 10.5,
            width: 18,
            height: 3,
            rx: 1.5,
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 3,
            y1: 6,
            x2: 21,
            y2: 6,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 3,
            y1: 12,
            x2: 21,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 3,
            y1: 18,
            x2: 21,
            y2: 18,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      multicolor: [
        {
          tag: "line",
          attrs: {
            x1: 3,
            y1: 6,
            x2: 21,
            y2: 6,
            stroke: "#3b82f6",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 3,
            y1: 12,
            x2: 16,
            y2: 12,
            stroke: "#6366f1",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 3,
            y1: 18,
            x2: 21,
            y2: 18,
            stroke: "#8b5cf6",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "rect",
          attrs: {
            x: 3,
            y: 5,
            width: 18,
            height: 2.5,
            rx: 1.25,
            fill: "url(#icon-grad)",
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 3,
            y: 11,
            width: 18,
            height: 2.5,
            rx: 1.25,
            fill: "url(#icon-grad)",
          },
        },
        {
          tag: "rect",
          attrs: {
            x: 3,
            y: 17,
            width: 18,
            height: 2.5,
            rx: 1.25,
            fill: "url(#icon-grad)",
          },
        },
      ],
      rounded: [
        {
          tag: "path",
          attrs: {
            d: "M4 6h16M4 12h16M4 18h16",
            stroke: "currentColor",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
      ],
    },
  },

  // 8. X-Close
];
