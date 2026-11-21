import type { IconDefinition } from "../types";

export const DEV_CORE_ICONS: IconDefinition[] = [
  {
    name: "code",
    label: "Code",
    category: "development",
    tags: ["programming", "brackets", "html", "syntax", "source"],
    aliases: ["brackets", "syntax"],
    variants: {
      outline: [
        {
          tag: "polyline",
          attrs: {
            points: "16 18 22 12 16 6",
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
            points: "8 6 2 12 8 18",
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
            d: "M8.7 16.6L4.1 12l4.6-4.6a1 1 0 0 0-1.4-1.4l-5.3 5.3a1 1 0 0 0 0 1.4l5.3 5.3a1 1 0 0 0 1.4-1.4zm6.6-9.2a1 1 0 0 0-1.4 1.4L18.5 12l-4.6 4.6a1 1 0 0 0 1.4 1.4l5.3-5.3a1 1 0 0 0 0-1.4l-5.3-5.3z",
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "rect",
          attrs: {
            x: 3,
            y: 5,
            width: 18,
            height: 14,
            rx: 3,
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "polyline",
          attrs: {
            points: "16 18 22 12 16 6",
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
            points: "8 6 2 12 8 18",
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
            points: "8 6 2 12 8 18",
            fill: "none",
            stroke: "#3b82f6",
            strokeWidth: 2.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "polyline",
          attrs: {
            points: "16 18 22 12 16 6",
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
            d: "M8.7 16.6L4.1 12l4.6-4.6a1 1 0 0 0-1.4-1.4l-5.3 5.3a1 1 0 0 0 0 1.4l5.3 5.3a1 1 0 0 0 1.4-1.4zm6.6-9.2a1 1 0 0 0-1.4 1.4L18.5 12l-4.6 4.6a1 1 0 0 0 1.4 1.4l5.3-5.3a1 1 0 0 0 0-1.4l-5.3-5.3z",
            fill: "url(#icon-grad)",
          },
        },
      ],
      rounded: [
        {
          tag: "path",
          attrs: {
            d: "M7.5 6.5L3.5 11.5a.7.7 0 0 0 0 1l4 5M16.5 6.5l4 5a.7.7 0 0 1 0 1l-4 5",
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

  // 21. Terminal
  {
    name: "terminal",
    label: "Terminal",
    category: "development",
    tags: ["console", "cli", "command", "bash", "shell", "prompt"],
    aliases: ["console", "shell"],
    variants: {
      outline: [
        {
          tag: "polyline",
          attrs: {
            points: "4 17 10 11 4 5",
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
            y1: 19,
            x2: 20,
            y2: 19,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
      filled: [
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 3,
            width: 20,
            height: 18,
            rx: 3,
            fill: "currentColor",
          },
        },
        {
          tag: "polyline",
          attrs: {
            points: "6 15 10 12 6 9",
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 15,
            x2: 17,
            y2: 15,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      duotone: [
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 3,
            width: 20,
            height: 18,
            rx: 3,
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "polyline",
          attrs: {
            points: "5 15 9 12 5 9",
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
            y1: 15,
            x2: 18,
            y2: 15,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      multicolor: [
        {
          tag: "rect",
          attrs: { x: 2, y: 3, width: 20, height: 18, rx: 3, fill: "#0f172a" },
        },
        {
          tag: "polyline",
          attrs: {
            points: "6 15 10 12 6 9",
            fill: "none",
            stroke: "#10b981",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 15,
            x2: 17,
            y2: 15,
            stroke: "#38bdf8",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 3,
            width: 20,
            height: 18,
            rx: 3,
            fill: "url(#icon-grad)",
          },
        },
        {
          tag: "polyline",
          attrs: {
            points: "6 15 10 12 6 9",
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 12,
            y1: 15,
            x2: 17,
            y2: 15,
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      rounded: [
        {
          tag: "rect",
          attrs: {
            x: 2,
            y: 3,
            width: 20,
            height: 18,
            rx: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M7 9l3 3-3 3M13 15h4",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
    },
    }
];
