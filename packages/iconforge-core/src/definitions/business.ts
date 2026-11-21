import type { IconDefinition } from "../types";

export const BUSINESS_ICONS: IconDefinition[] = [
  // 45. Credit-Card
  {
    name: "credit-card",
    label: "Credit Card",
    category: "banking",
    tags: ["payment", "visa", "mastercard", "stripe", "checkout", "finance"],
    aliases: ["card", "payment"],
    variants: {
      outline: [
        { tag: "rect", attrs: { x: 2, y: 5, width: 20, height: 14, rx: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 2, y1: 10, x2: 22, y2: 10, stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 6, y1: 15, x2: 10, y2: 15, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
      filled: [
        { tag: "rect", attrs: { x: 2, y: 5, width: 20, height: 14, rx: 2, fill: "currentColor" } },
        { tag: "line", attrs: { x1: 2, y1: 10, x2: 22, y2: 10, stroke: "#ffffff", strokeWidth: 2.5 } },
        { tag: "rect", attrs: { x: 5, y: 14, width: 4, height: 2, rx: 0.5, fill: "#ffffff" } },
      ],
      duotone: [
        { tag: "rect", attrs: { x: 2, y: 5, width: 20, height: 14, rx: 2, fill: "currentColor", opacity: 0.25 } },
        { tag: "rect", attrs: { x: 2, y: 5, width: 20, height: 14, rx: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 2, y1: 10, x2: 22, y2: 10, stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 6, y1: 15, x2: 10, y2: 15, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
      multicolor: [
        { tag: "rect", attrs: { x: 2, y: 5, width: 20, height: 14, rx: 2, fill: "#1e293b" } },
        { tag: "line", attrs: { x1: 2, y1: 10, x2: 22, y2: 10, stroke: "#0f172a", strokeWidth: 3 } },
        { tag: "rect", attrs: { x: 5, y: 13.5, width: 4.5, height: 3, rx: 0.5, fill: "#f59e0b" } },
        { tag: "line", attrs: { x1: 12, y1: 15, x2: 18, y2: 15, stroke: "#64748b", strokeWidth: 1.5, strokeLinecap: "round" } },
      ],
      gradient: [
        { tag: "rect", attrs: { x: 2, y: 5, width: 20, height: 14, rx: 2, fill: "url(#icon-grad)" } },
        { tag: "line", attrs: { x1: 2, y1: 10, x2: 22, y2: 10, stroke: "#ffffff", strokeWidth: 2.5 } },
        { tag: "rect", attrs: { x: 5, y: 14, width: 4, height: 2, rx: 0.5, fill: "#ffffff" } },
      ],
      rounded: [
        { tag: "rect", attrs: { x: 2, y: 5, width: 20, height: 14, rx: 4, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 2, y1: 10, x2: 22, y2: 10, stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 6, y1: 15, x2: 10, y2: 15, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
    },
  },

  // 46. Wallet
  {
    name: "wallet",
    label: "Wallet",
    category: "banking",
    tags: ["money", "crypto", "cash", "funds", "balance", "finance"],
    aliases: ["cash", "pocketbook"],
    variants: {
      outline: [
        { tag: "path", attrs: { d: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "path", attrs: { d: "M16 3H4a2 2 0 0 0-2 2v2h18V5a2 2 0 0 0-2-2h-4z", fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 17, cy: 14, r: 1.5, fill: "currentColor" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", fill: "currentColor" } },
        { tag: "path", attrs: { d: "M16 3H4a2 2 0 0 0-2 2v1h18V5a2 2 0 0 0-2-2h-4z", fill: "currentColor", opacity: 0.8 } },
        { tag: "circle", attrs: { cx: 17, cy: 14, r: 1.5, fill: "#ffffff" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", fill: "currentColor", opacity: 0.25 } },
        { tag: "path", attrs: { d: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "path", attrs: { d: "M16 3H4a2 2 0 0 0-2 2v2h18V5a2 2 0 0 0-2-2h-4z", fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 17, cy: 14, r: 1.5, fill: "currentColor" } },
      ],
      multicolor: [
        { tag: "path", attrs: { d: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", fill: "#3b82f6" } },
        { tag: "path", attrs: { d: "M16 3H4a2 2 0 0 0-2 2v2h18V5a2 2 0 0 0-2-2h-4z", fill: "#1d4ed8" } },
        { tag: "circle", attrs: { cx: 17, cy: 14, r: 2, fill: "#f59e0b" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", fill: "url(#icon-grad)" } },
        { tag: "circle", attrs: { cx: 17, cy: 14, r: 1.5, fill: "#ffffff" } },
      ],
      rounded: [
        { tag: "rect", attrs: { x: 2, y: 7, width: 20, height: 14, rx: 4, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "path", attrs: { d: "M16 3.5H5a2 2 0 0 0-2 2v1.5h18V5.5a2 2 0 0 0-2-2h-3z", fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 17, cy: 14, r: 1.5, fill: "currentColor" } },
      ],
    },
  },

  // 47. Bar-Chart
  {
    name: "bar-chart",
    label: "Bar Chart",
    category: "analytics",
    tags: ["analytics", "metrics", "graph", "statistics", "growth", "data"],
    aliases: ["chart", "metrics"],
    variants: {
      outline: [
        { tag: "line", attrs: { x1: 18, y1: 20, x2: 18, y2: 10, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 20, x2: 12, y2: 4, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 6, y1: 20, x2: 6, y2: 14, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
      filled: [
        { tag: "rect", attrs: { x: 4.5, y: 13, width: 3, height: 8, rx: 1, fill: "currentColor" } },
        { tag: "rect", attrs: { x: 10.5, y: 3, width: 3, height: 18, rx: 1, fill: "currentColor" } },
        { tag: "rect", attrs: { x: 16.5, y: 9, width: 3, height: 12, rx: 1, fill: "currentColor" } },
      ],
      duotone: [
        { tag: "rect", attrs: { x: 4, y: 13, width: 4, height: 8, rx: 1, fill: "currentColor", opacity: 0.25 } },
        { tag: "rect", attrs: { x: 10, y: 3, width: 4, height: 18, rx: 1, fill: "currentColor", opacity: 0.25 } },
        { tag: "rect", attrs: { x: 16, y: 9, width: 4, height: 12, rx: 1, fill: "currentColor", opacity: 0.25 } },
        { tag: "line", attrs: { x1: 18, y1: 20, x2: 18, y2: 10, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 20, x2: 12, y2: 4, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 6, y1: 20, x2: 6, y2: 14, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
      multicolor: [
        { tag: "line", attrs: { x1: 6, y1: 20, x2: 6, y2: 14, stroke: "#3b82f6", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 20, x2: 12, y2: 4, stroke: "#8b5cf6", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 18, y1: 20, x2: 18, y2: 10, stroke: "#10b981", strokeWidth: 3, strokeLinecap: "round" } },
      ],
      gradient: [
        { tag: "rect", attrs: { x: 4.5, y: 13, width: 3, height: 8, rx: 1, fill: "url(#icon-grad)" } },
        { tag: "rect", attrs: { x: 10.5, y: 3, width: 3, height: 18, rx: 1, fill: "url(#icon-grad)" } },
        { tag: "rect", attrs: { x: 16.5, y: 9, width: 3, height: 12, rx: 1, fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "line", attrs: { x1: 18, y1: 20, x2: 18, y2: 10, stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 20, x2: 12, y2: 4, stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 6, y1: 20, x2: 6, y2: 14, stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" } },
      ],
    },
  },

  // 48. Shield-Check
  {
    name: "shield-check",
    label: "Shield Check",
    category: "cybersecurity",
    tags: ["security", "protection", "safe", "verified", "antivirus", "ssl"],
    aliases: ["security", "verified-badge"],
    variants: {
      outline: [
        { tag: "path", attrs: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
        { tag: "polyline", attrs: { points: "9 12 11 14 15 10", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", fill: "currentColor" } },
        { tag: "polyline", attrs: { points: "9 12 11 14 15 10", fill: "none", stroke: "#ffffff", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", fill: "currentColor", opacity: 0.25 } },
        { tag: "path", attrs: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "polyline", attrs: { points: "9 12 11 14 15 10", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      multicolor: [
        { tag: "path", attrs: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", fill: "#dcfce7" } },
        { tag: "path", attrs: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", fill: "none", stroke: "#16a34a", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "polyline", attrs: { points: "9 12 11 14 15 10", fill: "none", stroke: "#15803d", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", fill: "url(#icon-grad)" } },
        { tag: "polyline", attrs: { points: "9 12 11 14 15 10", fill: "none", stroke: "#ffffff", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M12 21.5s7.5-3.8 7.5-9.5V5.5L12 2.5 4.5 5.5V12c0 5.7 7.5 9.5 7.5 9.5z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "path", attrs: { d: "M9 12.5l2 2 4-4", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
    },
  },

  // 49. Lock
  {
    name: "lock",
    label: "Lock",
    category: "cybersecurity",
    tags: ["padlock", "secure", "auth", "private", "encryption", "password"],
    aliases: ["padlock", "secure"],
    variants: {
      outline: [
        { tag: "rect", attrs: { x: 3, y: 11, width: 18, height: 11, rx: 2, ry: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "path", attrs: { d: "M7 11V7a5 5 0 0 1 10 0v4", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 16, r: 1.5, fill: "currentColor" } },
      ],
      filled: [
        { tag: "rect", attrs: { x: 3, y: 11, width: 18, height: 11, rx: 2, fill: "currentColor" } },
        { tag: "path", attrs: { d: "M7 11V7a5 5 0 0 1 10 0v4", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 16.5, r: 1.5, fill: "#ffffff" } },
      ],
      duotone: [
        { tag: "rect", attrs: { x: 3, y: 11, width: 18, height: 11, rx: 2, fill: "currentColor", opacity: 0.25 } },
        { tag: "rect", attrs: { x: 3, y: 11, width: 18, height: 11, rx: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "path", attrs: { d: "M7 11V7a5 5 0 0 1 10 0v4", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 16.5, r: 1.5, fill: "currentColor" } },
      ],
      multicolor: [
        { tag: "rect", attrs: { x: 3, y: 11, width: 18, height: 11, rx: 2, fill: "#f59e0b" } },
        { tag: "path", attrs: { d: "M7 11V7a5 5 0 0 1 10 0v4", fill: "none", stroke: "#64748b", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 16.5, r: 1.5, fill: "#ffffff" } },
      ],
      gradient: [
        { tag: "rect", attrs: { x: 3, y: 11, width: 18, height: 11, rx: 2, fill: "url(#icon-grad)" } },
        { tag: "path", attrs: { d: "M7 11V7a5 5 0 0 1 10 0v4", fill: "none", stroke: "url(#icon-grad)", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 16.5, r: 1.5, fill: "#ffffff" } },
      ],
      rounded: [
        { tag: "rect", attrs: { x: 3, y: 11, width: 18, height: 11, rx: 4, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "path", attrs: { d: "M7 11V7.5a5 5 0 0 1 10 0V11", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 16.5, r: 1.5, fill: "currentColor" } },
      ],
    },
  },

  // 50. Folder
  {
    name: "folder",
    label: "Folder",
    category: "files",
    tags: ["directory", "files", "documents", "storage", "archive"],
    aliases: ["directory"],
    variants: {
      outline: [
        { tag: "path", attrs: { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z", fill: "currentColor", opacity: 0.25 } },
        { tag: "path", attrs: { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
      ],
      multicolor: [
        { tag: "path", attrs: { d: "M2 6a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v1H2V6z", fill: "#3b82f6" } },
        { tag: "path", attrs: { d: "M2 10h20v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9z", fill: "#60a5fa" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M22 18.5a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13A2.5 2.5 0 0 1 4.5 3h4.6a2 2 0 0 1 1.6.8l1.6 2.4H19.5A2.5 2.5 0 0 1 22 8.7z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
      ],
    },
  },
];
