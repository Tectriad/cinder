import type { IconDefinition } from "../types";

export const GENERAL_PRIMARY_ICONS: IconDefinition[] = [
  {
    name: "home",
    label: "Home",
    category: "general",
    tags: ["house", "main", "dashboard", "homepage", "roof"],
    aliases: ["house", "dashboard"],
    variants: {
      outline: [
        {
          tag: "path",
          attrs: {
            d: "M3 10.5L12 3l9 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20.5v-10z",
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
            d: "M9 22V12h6v10",
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
            d: "M12 2.5L2 10.8V21a2 2 0 0 0 2 2h6v-8h4v8h6a2 2 0 0 0 2-2V10.8L12 2.5z",
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "path",
          attrs: {
            d: "M3 10.5L12 3l9 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20.5v-10z",
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M3 10.5L12 3l9 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20.5v-10z",
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
            d: "M9 22V12h6v10",
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
          tag: "path",
          attrs: {
            d: "M3 10.5L12 3l9 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20.5v-10z",
            fill: "#3b82f6",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M2 11l10-8 10 8",
            fill: "none",
            stroke: "#1d4ed8",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "rect",
          attrs: { x: 9, y: 13, width: 6, height: 9, rx: 1, fill: "#f1f5f9" },
        },
      ],
      gradient: [
        {
          tag: "path",
          attrs: {
            d: "M12 2.5L2 10.8V21a2 2 0 0 0 2 2h6v-8h4v8h6a2 2 0 0 0 2-2V10.8L12 2.5z",
            fill: "url(#icon-grad)",
          },
        },
      ],
      rounded: [
        {
          tag: "path",
          attrs: {
            d: "M4 11.2L10.5 4.8a2.2 2.2 0 0 1 3 0L20 11.2A2 2 0 0 1 20.7 12.6V20a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-6a1 1 0 0 0-1-1h-1.4a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5.3a2 2 0 0 1-2-2v-7.4c0-.5.2-1 .7-1.4z",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
    },
  },

  // 2. Settings
  {
    name: "settings",
    label: "Settings",
    category: "general",
    tags: ["cog", "gear", "preferences", "options", "config"],
    aliases: ["gear", "preferences", "config"],
    variants: {
      outline: [
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 12,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
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
            d: "M12 1a2 2 0 0 0-2 2v.09A1.65 1.65 0 0 1 9 4.6a1.65 1.65 0 0 1-1.82-.33l-.06-.06a2 2 0 0 0-2.83 2.83l.06.06a1.65 1.65 0 0 1 .33 1.82V9a1.65 1.65 0 0 1-1.51 1H3a2 2 0 0 0 0 4h.09a1.65 1.65 0 0 1 1.51 1 1.65 1.65 0 0 1-.33 1.82l-.06.06a2 2 0 0 0 2.83 2.83l.06-.06a1.65 1.65 0 0 1 1.82.33H9a1.65 1.65 0 0 1 1 1.51V21a2 2 0 0 0 4 0v-.09a1.65 1.65 0 0 1 1-1.51 1.65 1.65 0 0 1 1.82.33l.06.06a2 2 0 0 0 2.83-2.83l-.06-.06a1.65 1.65 0 0 1-.33-1.82V15a1.65 1.65 0 0 1 1.51-1H21a2 2 0 0 0 0-4h-.09a1.65 1.65 0 0 1-1.51-1 1.65 1.65 0 0 1 .33-1.82l.06-.06a2 2 0 0 0-2.83-2.83l-.06.06a1.65 1.65 0 0 1-1.82-.33H15a1.65 1.65 0 0 1-1-1.51V3a2 2 0 0 0-2-2zm0 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "circle",
          attrs: { cx: 12, cy: 12, r: 5, fill: "currentColor", opacity: 0.25 },
        },
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 12,
            r: 3,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
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
            d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
            fill: "#475569",
          },
        },
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 4, fill: "#3b82f6" } },
      ],
      gradient: [
        {
          tag: "path",
          attrs: {
            d: "M12 1a2 2 0 0 0-2 2v.09A1.65 1.65 0 0 1 9 4.6a1.65 1.65 0 0 1-1.82-.33l-.06-.06a2 2 0 0 0-2.83 2.83l.06.06a1.65 1.65 0 0 1 .33 1.82V9a1.65 1.65 0 0 1-1.51 1H3a2 2 0 0 0 0 4h.09a1.65 1.65 0 0 1 1.51 1 1.65 1.65 0 0 1-.33 1.82l-.06.06a2 2 0 0 0 2.83 2.83l.06-.06a1.65 1.65 0 0 1 1.82.33H9a1.65 1.65 0 0 1 1 1.51V21a2 2 0 0 0 4 0v-.09a1.65 1.65 0 0 1 1-1.51 1.65 1.65 0 0 1 1.82.33l.06.06a2 2 0 0 0 2.83-2.83l-.06-.06a1.65 1.65 0 0 1-.33-1.82V15a1.65 1.65 0 0 1 1.51-1H21a2 2 0 0 0 0-4h-.09a1.65 1.65 0 0 1-1.51-1 1.65 1.65 0 0 1 .33-1.82l.06-.06a2 2 0 0 0-2.83-2.83l-.06.06a1.65 1.65 0 0 1-1.82-.33H15a1.65 1.65 0 0 1-1-1.51V3a2 2 0 0 0-2-2zm0 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
            fill: "url(#icon-grad)",
          },
        },
      ],
      rounded: [
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 12,
            r: 3.5,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 12,
            r: 8,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeDasharray: "2 5",
          },
        },
      ],
    },
  },

  // 3. User
  {
    name: "user",
    label: "User",
    category: "general",
    tags: ["profile", "account", "avatar", "person", "human"],
    aliases: ["profile", "account"],
    variants: {
      outline: [
        {
          tag: "path",
          attrs: {
            d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 7,
            r: 4,
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
            d: "M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 12c-4.42 0-8 2.24-8 5v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.76-3.58-5-8-5z",
            fill: "currentColor",
          },
        },
      ],
      duotone: [
        {
          tag: "path",
          attrs: {
            d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
            fill: "currentColor",
            opacity: 0.25,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 7,
            r: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
      ],
      multicolor: [
        { tag: "circle", attrs: { cx: 12, cy: 7, r: 4, fill: "#f59e0b" } },
        {
          tag: "path",
          attrs: {
            d: "M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2",
            fill: "#3b82f6",
          },
        },
      ],
      gradient: [
        {
          tag: "path",
          attrs: {
            d: "M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 12c-4.42 0-8 2.24-8 5v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.76-3.58-5-8-5z",
            fill: "url(#icon-grad)",
          },
        },
      ],
      rounded: [
        {
          tag: "circle",
          attrs: {
            cx: 12,
            cy: 7.5,
            r: 4,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M5 20.5c.3-3.2 2.8-5.5 7-5.5s6.7 2.3 7 5.5",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
          },
        },
      ],
    },
  },

];
