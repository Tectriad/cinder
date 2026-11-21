import type { IconDefinition } from "../types";

export const DEV_GIT_ICONS: IconDefinition[] = [
  {
    name: "git-branch",
    label: "Git Branch",
    category: "development",
    tags: ["version-control", "fork", "merge", "git", "tree"],
    aliases: ["branch", "fork"],
    variants: {
      outline: [
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 3,
            x2: 6,
            y2: 15,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "circle",
          attrs: {
            cx: 18,
            cy: 6,
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
            cy: 18,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M18 9a9 9 0 0 1-9 9",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      filled: [
        { tag: "circle", attrs: { cx: 18, cy: 6, r: 3, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 6, cy: 18, r: 3, fill: "currentColor" } },
        {
          tag: "circle",
          attrs: { cx: 6, cy: 6, r: 2.5, fill: "currentColor" },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 8,
            x2: 6,
            y2: 15,
            stroke: "currentColor",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M18 9a9 9 0 0 1-9 9",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
      ],
      duotone: [
        {
          tag: "circle",
          attrs: { cx: 18, cy: 6, r: 4, fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "circle",
          attrs: { cx: 6, cy: 18, r: 4, fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 3,
            x2: 6,
            y2: 15,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "circle",
          attrs: {
            cx: 18,
            cy: 6,
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
            cy: 18,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M18 9a9 9 0 0 1-9 9",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      multicolor: [
        { tag: "circle", attrs: { cx: 18, cy: 6, r: 3.5, fill: "#3b82f6" } },
        { tag: "circle", attrs: { cx: 6, cy: 18, r: 3.5, fill: "#10b981" } },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 3,
            x2: 6,
            y2: 15,
            stroke: "#64748b",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M18 9a9 9 0 0 1-9 9",
            fill: "none",
            stroke: "#3b82f6",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "circle",
          attrs: { cx: 18, cy: 6, r: 3.5, fill: "url(#icon-grad)" },
        },
        {
          tag: "circle",
          attrs: { cx: 6, cy: 18, r: 3.5, fill: "url(#icon-grad)" },
        },
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 3,
            x2: 6,
            y2: 15,
            stroke: "url(#icon-grad)",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M18 9a9 9 0 0 1-9 9",
            fill: "none",
            stroke: "url(#icon-grad)",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
      ],
      rounded: [
        {
          tag: "line",
          attrs: {
            x1: 6,
            y1: 3.5,
            x2: 6,
            y2: 14.5,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "circle",
          attrs: {
            cx: 18,
            cy: 6,
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
            cy: 18,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M18 9a8 8 0 0 1-8 8",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
    },
  },

  // 26. Git-Commit
  {
    name: "git-commit",
    label: "Git Commit",
    category: "development",
    tags: ["version-control", "hash", "snapshot", "git", "timeline"],
    aliases: ["commit", "snapshot"],
    variants: {
      outline: [
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 12,
            r: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 1.05,
            y1: 12,
            x2: 7,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 17.01,
            y1: 12,
            x2: 22.96,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      filled: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 5, fill: "currentColor" },
        },
        {
          tag: "line",
          attrs: {
            x1: 2,
            y1: 12,
            x2: 7,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 3,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 17,
            y1: 12,
            x2: 22,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 3,
            strokeLinecap: "round",
          },
        },
      ],
      duotone: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 6, fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 12,
            r: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 2,
            y1: 12,
            x2: 8,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 16,
            y1: 12,
            x2: 22,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
      multicolor: [
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 4.5, fill: "#3b82f6" } },
        {
          tag: "line",
          attrs: {
            x1: 2,
            y1: 12,
            x2: 7.5,
            y2: 12,
            stroke: "#94a3b8",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 16.5,
            y1: 12,
            x2: 22,
            y2: 12,
            stroke: "#94a3b8",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
      ],
      gradient: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 5, fill: "url(#icon-grad)" },
        },
        {
          tag: "line",
          attrs: {
            x1: 2,
            y1: 12,
            x2: 7,
            y2: 12,
            stroke: "url(#icon-grad)",
            strokeWidth: 2.5,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 17,
            y1: 12,
            x2: 22,
            y2: 12,
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
            cx: 12,
            cy: 12,
            r: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2.2,
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 2,
            y1: 12,
            x2: 7.5,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2.2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "line",
          attrs: {
            x1: 16.5,
            y1: 12,
            x2: 22,
            y2: 12,
            stroke: "currentColor",
            strokeWidth: 2.2,
            strokeLinecap: "round",
          },
        },
      ],
    },
    }
];
