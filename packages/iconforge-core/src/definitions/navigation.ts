import type { IconDefinition } from "../types";

export const NAVIGATION_ICONS: IconDefinition[] = [
  // 13. Arrow-Right
  {
    name: "arrow-right",
    label: "Arrow Right",
    category: "arrows",
    tags: ["forward", "next", "right", "direction", "pointer"],
    aliases: ["forward", "next"],
    variants: {
      outline: [
        { tag: "line", attrs: { x1: 5, y1: 12, x2: 19, y2: 12, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
        { tag: "polyline", attrs: { points: "12 5 19 12 12 19", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M13.29 4.29a1 1 0 0 1 1.42 0l7 7a1 1 0 0 1 0 1.42l-7 7a1 1 0 0 1-1.42-1.42L18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.29a1 1 0 0 1 0-1.42z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M12 5l7 7-7 7V5z", fill: "currentColor", opacity: 0.25 } },
        { tag: "line", attrs: { x1: 5, y1: 12, x2: 19, y2: 12, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "12 5 19 12 12 19", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      multicolor: [
        { tag: "line", attrs: { x1: 4, y1: 12, x2: 18, y2: 12, stroke: "#3b82f6", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "12 5 19 12 12 19", fill: "none", stroke: "#1d4ed8", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M13.29 4.29a1 1 0 0 1 1.42 0l7 7a1 1 0 0 1 0 1.42l-7 7a1 1 0 0 1-1.42-1.42L18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.29a1 1 0 0 1 0-1.42z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
    },
  },

  // 14. Arrow-Left
  {
    name: "arrow-left",
    label: "Arrow Left",
    category: "arrows",
    tags: ["back", "previous", "left", "return", "pointer"],
    aliases: ["back", "previous"],
    variants: {
      outline: [
        { tag: "line", attrs: { x1: 19, y1: 12, x2: 5, y2: 12, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
        { tag: "polyline", attrs: { points: "12 19 5 12 12 5", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M10.71 19.71a1 1 0 0 1-1.42 0l-7-7a1 1 0 0 1 0-1.42l7-7a1 1 0 0 1 1.42 1.42L5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.29a1 1 0 0 1 0 1.42z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M12 19L5 12l7-7v14z", fill: "currentColor", opacity: 0.25 } },
        { tag: "line", attrs: { x1: 19, y1: 12, x2: 5, y2: 12, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "12 19 5 12 12 5", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      multicolor: [
        { tag: "line", attrs: { x1: 20, y1: 12, x2: 6, y2: 12, stroke: "#3b82f6", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "12 19 5 12 12 5", fill: "none", stroke: "#1d4ed8", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M10.71 19.71a1 1 0 0 1-1.42 0l-7-7a1 1 0 0 1 0-1.42l7-7a1 1 0 0 1 1.42 1.42L5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.29a1 1 0 0 1 0 1.42z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M19.5 12h-14M11 17.5L5.5 12 11 6.5", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
    },
  },

  // 15. Arrow-Up
  {
    name: "arrow-up",
    label: "Arrow Up",
    category: "arrows",
    tags: ["top", "ascend", "north", "upward", "scroll-top"],
    aliases: ["up", "top"],
    variants: {
      outline: [
        { tag: "line", attrs: { x1: 12, y1: 19, x2: 12, y2: 5, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
        { tag: "polyline", attrs: { points: "5 12 12 5 19 12", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M4.29 10.71a1 1 0 0 1 0-1.42l7-7a1 1 0 0 1 1.42 0l7 7a1 1 0 0 1-1.42 1.42L13 5.41V21a1 1 0 0 1-2 0V5.41l-5.29 5.3a1 1 0 0 1-1.42 0z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M5 12l7-7 7 7H5z", fill: "currentColor", opacity: 0.25 } },
        { tag: "line", attrs: { x1: 12, y1: 19, x2: 12, y2: 5, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "5 12 12 5 19 12", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      multicolor: [
        { tag: "line", attrs: { x1: 12, y1: 20, x2: 12, y2: 6, stroke: "#3b82f6", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "5 12 12 5 19 12", fill: "none", stroke: "#1d4ed8", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M4.29 10.71a1 1 0 0 1 0-1.42l7-7a1 1 0 0 1 1.42 0l7 7a1 1 0 0 1-1.42 1.42L13 5.41V21a1 1 0 0 1-2 0V5.41l-5.29 5.3a1 1 0 0 1-1.42 0z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M12 19.5v-14M6.5 11L12 5.5 17.5 11", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
    },
  },

  // 16. Arrow-Down
  {
    name: "arrow-down",
    label: "Arrow Down",
    category: "arrows",
    tags: ["bottom", "descend", "south", "downward", "download-arrow"],
    aliases: ["down", "bottom"],
    variants: {
      outline: [
        { tag: "line", attrs: { x1: 12, y1: 5, x2: 12, y2: 19, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
        { tag: "polyline", attrs: { points: "19 12 12 19 5 12", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M19.71 13.29a1 1 0 0 1 0 1.42l-7 7a1 1 0 0 1-1.42 0l-7-7a1 1 0 0 1 1.42-1.42L11 18.59V3a1 1 0 0 1 2 0v15.59l5.29-5.3a1 1 0 0 1 1.42 0z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M19 12l-7 7-7-7h14z", fill: "currentColor", opacity: 0.25 } },
        { tag: "line", attrs: { x1: 12, y1: 5, x2: 12, y2: 19, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "19 12 12 19 5 12", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      multicolor: [
        { tag: "line", attrs: { x1: 12, y1: 4, x2: 12, y2: 18, stroke: "#3b82f6", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "19 12 12 19 5 12", fill: "none", stroke: "#1d4ed8", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M19.71 13.29a1 1 0 0 1 0 1.42l-7 7a1 1 0 0 1-1.42 0l-7-7a1 1 0 0 1 1.42-1.42L11 18.59V3a1 1 0 0 1 2 0v15.59l5.29-5.3a1 1 0 0 1 1.42 0z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M12 4.5v14M17.5 13L12 18.5 6.5 13", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
    },
  },

  // 17. Chevron-Down
  {
    name: "chevron-down",
    label: "Chevron Down",
    category: "navigation",
    tags: ["dropdown", "expand", "caret", "arrow", "collapse"],
    aliases: ["dropdown", "caret-down"],
    variants: {
      outline: [
        { tag: "polyline", attrs: { points: "6 9 12 15 18 9", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M12 16.5a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42L12 14.09l5.29-5.3a1 1 0 0 1 1.42 1.42l-6 6a1 1 0 0 1-.71.29z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "polygon", attrs: { points: "6 9 12 15 18 9", fill: "currentColor", opacity: 0.25 } },
        { tag: "polyline", attrs: { points: "6 9 12 15 18 9", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      multicolor: [
        { tag: "polyline", attrs: { points: "6 9 12 15 18 9", fill: "none", stroke: "#3b82f6", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M12 16.5a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42L12 14.09l5.29-5.3a1 1 0 0 1 1.42 1.42l-6 6a1 1 0 0 1-.71.29z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M6.5 9.5l5.1 5.1a.6.6 0 0 0 .8 0l5.1-5.1", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
    },
  },

  // 18. Chevron-Up
  {
    name: "chevron-up",
    label: "Chevron Up",
    category: "navigation",
    tags: ["collapse", "up", "caret", "arrow", "hide"],
    aliases: ["caret-up"],
    variants: {
      outline: [
        { tag: "polyline", attrs: { points: "18 15 12 9 6 15", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M12 7.5a1 1 0 0 1 .71.29l6 6a1 1 0 0 1-1.42 1.42L12 9.91l-5.29 5.3a1 1 0 0 1-1.42-1.42l6-6a1 1 0 0 1 .71-.29z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "polygon", attrs: { points: "18 15 12 9 6 15", fill: "currentColor", opacity: 0.25 } },
        { tag: "polyline", attrs: { points: "18 15 12 9 6 15", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      multicolor: [
        { tag: "polyline", attrs: { points: "18 15 12 9 6 15", fill: "none", stroke: "#3b82f6", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M12 7.5a1 1 0 0 1 .71.29l6 6a1 1 0 0 1-1.42 1.42L12 9.91l-5.29 5.3a1 1 0 0 1-1.42-1.42l6-6a1 1 0 0 1 .71-.29z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M17.5 14.5l-5.1-5.1a.6.6 0 0 0-.8 0l-5.1 5.1", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
    },
  },

  // 19. External-Link
  {
    name: "external-link",
    label: "External Link",
    category: "navigation",
    tags: ["outbound", "open", "new-tab", "window", "link"],
    aliases: ["outbound", "new-window"],
    variants: {
      outline: [
        { tag: "path", attrs: { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
        { tag: "polyline", attrs: { points: "15 3 21 3 21 9", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
        { tag: "line", attrs: { x1: 10, y1: 14, x2: 21, y2: 3, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "rect", attrs: { x: 3, y: 5, width: 14, height: 16, rx: 2, fill: "currentColor", opacity: 0.25 } },
        { tag: "path", attrs: { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "15 3 21 3 21 9", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 10, y1: 14, x2: 21, y2: 3, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
      multicolor: [
        { tag: "path", attrs: { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", fill: "none", stroke: "#64748b", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "polyline", attrs: { points: "15 3 21 3 21 9", fill: "none", stroke: "#3b82f6", strokeWidth: 2.5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 10, y1: 14, x2: 21, y2: 3, stroke: "#3b82f6", strokeWidth: 2.5, strokeLinecap: "round" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M18 13v5.5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2H11", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M15 3h5.5a.5.5 0 0 1 .5.5V9M10.5 13.5L20.5 3.5", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } },
      ],
    },
  },
];
