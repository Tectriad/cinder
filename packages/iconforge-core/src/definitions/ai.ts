import type { IconDefinition } from "../types";

export const AI_ICONS: IconDefinition[] = [
  // 40. AI-Sparkle
  {
    name: "ai-sparkle",
    label: "AI Sparkle",
    category: "ai",
    tags: ["magic", "generative", "ai", "intelligence", "stars", "prompt", "llm"],
    aliases: ["sparkle", "magic", "generative-ai"],
    variants: {
      outline: [
        { tag: "path", attrs: { d: "M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } },
        { tag: "path", attrs: { d: "M20 3l.8 2.2L23 6l-2.2.8L20 9l-.8-2.2L17 6l2.2-.8L20 3z", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z", fill: "currentColor" } },
        { tag: "path", attrs: { d: "M20 2l.8 2.2L23 5l-2.2.8L20 8l-.8-2.2L17 5l2.2-.8L20 2z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z", fill: "currentColor", opacity: 0.25 } },
        { tag: "path", attrs: { d: "M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "path", attrs: { d: "M20 2l.8 2.2L23 5l-2.2.8L20 8l-.8-2.2L17 5l2.2-.8L20 2z", fill: "currentColor" } },
      ],
      multicolor: [
        { tag: "path", attrs: { d: "M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z", fill: "#8b5cf6" } },
        { tag: "path", attrs: { d: "M20 2l.8 2.2L23 5l-2.2.8L20 8l-.8-2.2L17 5l2.2-.8L20 2z", fill: "#f59e0b" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z", fill: "url(#icon-grad)" } },
        { tag: "path", attrs: { d: "M20 2l.8 2.2L23 5l-2.2.8L20 8l-.8-2.2L17 5l2.2-.8L20 2z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M12 2.5c.3 3.5 3 6.2 6.5 6.5-3.5.3-6.2 3-6.5 6.5-.3-3.5-3-6.2-6.5-6.5 3.5-.3 6.2-3 6.5-6.5z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "circle", attrs: { cx: 19.5, cy: 4.5, r: 1.5, fill: "currentColor" } },
      ],
    },
  },

  // 41. LLM-Brain
  {
    name: "llm-brain",
    label: "LLM Brain",
    category: "ai",
    tags: ["neural", "mind", "cognitive", "ai", "deep-learning", "model"],
    aliases: ["brain", "intelligence"],
    variants: {
      outline: [
        { tag: "path", attrs: { d: "M9.5 4a3.5 3.5 0 0 0-3.5 3.5c0 .5.1 1 .3 1.4A4 4 0 0 0 4 12.5a4 4 0 0 0 1.2 2.8A3.5 3.5 0 0 0 9 19h.5", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M14.5 4a3.5 3.5 0 0 1 3.5 3.5c0 .5-.1 1-.3 1.4A4 4 0 0 1 20 12.5a4 4 0 0 1-1.2 2.8A3.5 3.5 0 0 1 15 19h-.5", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 4, x2: 12, y2: 20, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M9.5 8h-2m2 4h-3m3 4h-2m7-8h2m-2 4h3m-3 4h2", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M9.5 3A4.5 4.5 0 0 0 5 7.5c0 .4.1.8.2 1.2A5 5 0 0 0 3 13a5 5 0 0 0 1.5 3.5A4.5 4.5 0 0 0 9 20h2V3H9.5zM14.5 3H13v17h1.5a4.5 4.5 0 0 0 4.5-3.5A5 5 0 0 0 21 13a5 5 0 0 0-2.2-4.3c.1-.4.2-.8.2-1.2A4.5 4.5 0 0 0 14.5 3z", fill: "currentColor" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M9.5 3A4.5 4.5 0 0 0 5 7.5c0 .4.1.8.2 1.2A5 5 0 0 0 3 13a5 5 0 0 0 1.5 3.5A4.5 4.5 0 0 0 9 20h6a4.5 4.5 0 0 0 4.5-3.5A5 5 0 0 0 21 13a5 5 0 0 0-2.2-4.3c.1-.4.2-.8.2-1.2A4.5 4.5 0 0 0 14.5 3h-5z", fill: "currentColor", opacity: 0.25 } },
        { tag: "path", attrs: { d: "M9.5 4a3.5 3.5 0 0 0-3.5 3.5c0 .5.1 1 .3 1.4A4 4 0 0 0 4 12.5a4 4 0 0 0 1.2 2.8A3.5 3.5 0 0 0 9 19h.5", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M14.5 4a3.5 3.5 0 0 1 3.5 3.5c0 .5-.1 1-.3 1.4A4 4 0 0 1 20 12.5a4 4 0 0 1-1.2 2.8A3.5 3.5 0 0 1 15 19h-.5", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 4, x2: 12, y2: 20, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
      multicolor: [
        { tag: "path", attrs: { d: "M9.5 3A4.5 4.5 0 0 0 5 7.5c0 .4.1.8.2 1.2A5 5 0 0 0 3 13a5 5 0 0 0 1.5 3.5A4.5 4.5 0 0 0 9 20h2V3H9.5z", fill: "#3b82f6" } },
        { tag: "path", attrs: { d: "M14.5 3H13v17h1.5a4.5 4.5 0 0 0 4.5-3.5A5 5 0 0 0 21 13a5 5 0 0 0-2.2-4.3c.1-.4.2-.8.2-1.2A4.5 4.5 0 0 0 14.5 3z", fill: "#8b5cf6" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M9.5 3A4.5 4.5 0 0 0 5 7.5c0 .4.1.8.2 1.2A5 5 0 0 0 3 13a5 5 0 0 0 1.5 3.5A4.5 4.5 0 0 0 9 20h6a4.5 4.5 0 0 0 4.5-3.5A5 5 0 0 0 21 13a5 5 0 0 0-2.2-4.3c.1-.4.2-.8.2-1.2A4.5 4.5 0 0 0 14.5 3h-5z", fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M9.5 4.5a3.5 3.5 0 0 0-3.5 3.5c0 .5.1 1 .3 1.4A4 4 0 0 0 4.5 13a4 4 0 0 0 1.2 2.8A3.5 3.5 0 0 0 9 19.5h1", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M14.5 4.5a3.5 3.5 0 0 1 3.5 3.5c0 .5-.1 1-.3 1.4A4 4 0 0 1 19.5 13a4 4 0 0 1-1.2 2.8A3.5 3.5 0 0 1 15 19.5h-1", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 4.5, x2: 12, y2: 19.5, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
    },
  },

  // 42. Robot
  {
    name: "robot",
    label: "Robot",
    category: "ai",
    tags: ["bot", "ai-agent", "automation", "android", "assistant"],
    aliases: ["bot", "agent"],
    variants: {
      outline: [
        { tag: "rect", attrs: { x: 4, y: 8, width: 16, height: 12, rx: 3, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 9, cy: 13, r: 1.5, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 15, cy: 13, r: 1.5, fill: "currentColor" } },
        { tag: "line", attrs: { x1: 9, y1: 17, x2: 15, y2: 17, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 2, x2: 12, y2: 8, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 2, r: 1.5, fill: "currentColor" } },
        { tag: "line", attrs: { x1: 1, y1: 13, x2: 4, y2: 13, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 20, y1: 13, x2: 23, y2: 13, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
      filled: [
        { tag: "rect", attrs: { x: 4, y: 8, width: 16, height: 12, rx: 3, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 9, cy: 13, r: 1.5, fill: "#ffffff" } },
        { tag: "circle", attrs: { cx: 15, cy: 13, r: 1.5, fill: "#ffffff" } },
        { tag: "line", attrs: { x1: 9, y1: 17, x2: 15, y2: 17, stroke: "#ffffff", strokeWidth: 1.5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 2, x2: 12, y2: 8, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 2, r: 1.5, fill: "currentColor" } },
      ],
      duotone: [
        { tag: "rect", attrs: { x: 4, y: 8, width: 16, height: 12, rx: 3, fill: "currentColor", opacity: 0.25 } },
        { tag: "rect", attrs: { x: 4, y: 8, width: 16, height: 12, rx: 3, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 9, cy: 13, r: 1.5, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 15, cy: 13, r: 1.5, fill: "currentColor" } },
        { tag: "line", attrs: { x1: 9, y1: 17, x2: 15, y2: 17, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 2, x2: 12, y2: 8, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
      ],
      multicolor: [
        { tag: "rect", attrs: { x: 4, y: 8, width: 16, height: 12, rx: 3, fill: "#0284c7" } },
        { tag: "circle", attrs: { cx: 9, cy: 13, r: 1.5, fill: "#38bdf8" } },
        { tag: "circle", attrs: { cx: 15, cy: 13, r: 1.5, fill: "#38bdf8" } },
        { tag: "line", attrs: { x1: 9, y1: 17, x2: 15, y2: 17, stroke: "#ffffff", strokeWidth: 1.5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 2, x2: 12, y2: 8, stroke: "#0284c7", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 12, cy: 2, r: 1.5, fill: "#f59e0b" } },
      ],
      gradient: [
        { tag: "rect", attrs: { x: 4, y: 8, width: 16, height: 12, rx: 3, fill: "url(#icon-grad)" } },
        { tag: "circle", attrs: { cx: 9, cy: 13, r: 1.5, fill: "#ffffff" } },
        { tag: "circle", attrs: { cx: 15, cy: 13, r: 1.5, fill: "#ffffff" } },
        { tag: "line", attrs: { x1: 9, y1: 17, x2: 15, y2: 17, stroke: "#ffffff", strokeWidth: 1.5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 2, x2: 12, y2: 8, stroke: "url(#icon-grad)", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 12, cy: 2, r: 1.5, fill: "url(#icon-grad)" } },
      ],
      rounded: [
        { tag: "rect", attrs: { x: 4, y: 8, width: 16, height: 12, rx: 5, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 9, cy: 13, r: 1.5, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 15, cy: 13, r: 1.5, fill: "currentColor" } },
        { tag: "line", attrs: { x1: 9.5, y1: 16.5, x2: 14.5, y2: 16.5, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 12, y1: 2.5, x2: 12, y2: 8, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 2.5, r: 1.5, fill: "currentColor" } },
      ],
    },
  },

  // 43. Neural-Network
  {
    name: "neural-network",
    label: "Neural Network",
    category: "ai",
    tags: ["nodes", "deep-learning", "synapse", "graph", "weights"],
    aliases: ["neural-net", "nodes-graph"],
    variants: {
      outline: [
        { tag: "circle", attrs: { cx: 5, cy: 6, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 5, cy: 18, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 19, cy: 6, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 19, cy: 18, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 7, y1: 6, x2: 10, y2: 11, stroke: "currentColor", strokeWidth: 1.5 } },
        { tag: "line", attrs: { x1: 7, y1: 18, x2: 10, y2: 13, stroke: "currentColor", strokeWidth: 1.5 } },
        { tag: "line", attrs: { x1: 14, y1: 11, x2: 17, y2: 6, stroke: "currentColor", strokeWidth: 1.5 } },
        { tag: "line", attrs: { x1: 14, y1: 13, x2: 17, y2: 18, stroke: "currentColor", strokeWidth: 1.5 } },
        { tag: "line", attrs: { x1: 7, y1: 7, x2: 17, y2: 17, stroke: "currentColor", strokeWidth: 1, strokeDasharray: "2 2" } },
      ],
      filled: [
        { tag: "circle", attrs: { cx: 5, cy: 6, r: 2.5, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 5, cy: 18, r: 2.5, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 2.5, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 19, cy: 6, r: 2.5, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 19, cy: 18, r: 2.5, fill: "currentColor" } },
        { tag: "line", attrs: { x1: 7, y1: 6, x2: 10, y2: 11, stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 7, y1: 18, x2: 10, y2: 13, stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 14, y1: 11, x2: 17, y2: 6, stroke: "currentColor", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 14, y1: 13, x2: 17, y2: 18, stroke: "currentColor", strokeWidth: 2 } },
      ],
      duotone: [
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 4, fill: "currentColor", opacity: 0.25 } },
        { tag: "circle", attrs: { cx: 5, cy: 6, r: 2, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 5, cy: 18, r: 2, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 2, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 19, cy: 6, r: 2, fill: "currentColor" } },
        { tag: "circle", attrs: { cx: 19, cy: 18, r: 2, fill: "currentColor" } },
        { tag: "line", attrs: { x1: 7, y1: 6, x2: 10, y2: 11, stroke: "currentColor", strokeWidth: 1.5 } },
        { tag: "line", attrs: { x1: 7, y1: 18, x2: 10, y2: 13, stroke: "currentColor", strokeWidth: 1.5 } },
        { tag: "line", attrs: { x1: 14, y1: 11, x2: 17, y2: 6, stroke: "currentColor", strokeWidth: 1.5 } },
        { tag: "line", attrs: { x1: 14, y1: 13, x2: 17, y2: 18, stroke: "currentColor", strokeWidth: 1.5 } },
      ],
      multicolor: [
        { tag: "circle", attrs: { cx: 5, cy: 6, r: 2.5, fill: "#3b82f6" } },
        { tag: "circle", attrs: { cx: 5, cy: 18, r: 2.5, fill: "#3b82f6" } },
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 3, fill: "#f59e0b" } },
        { tag: "circle", attrs: { cx: 19, cy: 6, r: 2.5, fill: "#10b981" } },
        { tag: "circle", attrs: { cx: 19, cy: 18, r: 2.5, fill: "#10b981" } },
        { tag: "line", attrs: { x1: 7, y1: 6, x2: 10, y2: 11, stroke: "#94a3b8", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 7, y1: 18, x2: 10, y2: 13, stroke: "#94a3b8", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 14, y1: 11, x2: 17, y2: 6, stroke: "#94a3b8", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 14, y1: 13, x2: 17, y2: 18, stroke: "#94a3b8", strokeWidth: 2 } },
      ],
      gradient: [
        { tag: "circle", attrs: { cx: 5, cy: 6, r: 2.5, fill: "url(#icon-grad)" } },
        { tag: "circle", attrs: { cx: 5, cy: 18, r: 2.5, fill: "url(#icon-grad)" } },
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 3, fill: "url(#icon-grad)" } },
        { tag: "circle", attrs: { cx: 19, cy: 6, r: 2.5, fill: "url(#icon-grad)" } },
        { tag: "circle", attrs: { cx: 19, cy: 18, r: 2.5, fill: "url(#icon-grad)" } },
        { tag: "line", attrs: { x1: 7, y1: 6, x2: 10, y2: 11, stroke: "url(#icon-grad)", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 7, y1: 18, x2: 10, y2: 13, stroke: "url(#icon-grad)", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 14, y1: 11, x2: 17, y2: 6, stroke: "url(#icon-grad)", strokeWidth: 2 } },
        { tag: "line", attrs: { x1: 14, y1: 13, x2: 17, y2: 18, stroke: "url(#icon-grad)", strokeWidth: 2 } },
      ],
      rounded: [
        { tag: "circle", attrs: { cx: 5, cy: 6, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 5, cy: 18, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 2.2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 19, cy: 6, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 19, cy: 18, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 2 } },
        { tag: "path", attrs: { d: "M7 6l3 5M7 18l3-5M14 11l3-5M14 13l3 5", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" } },
      ],
    },
  },

  // 44. Vector-Database
  {
    name: "vector-database",
    label: "Vector Database",
    category: "databases",
    tags: ["embeddings", "rag", "milvus", "pinecone", "chroma", "vectors"],
    aliases: ["vector-db", "embeddings"],
    variants: {
      outline: [
        { tag: "path", attrs: { d: "M12 2L2 7l10 5 10-5-10-5z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "path", attrs: { d: "M2 17l10 5 10-5M2 12l10 5 10-5", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 7, r: 1.5, fill: "currentColor" } },
      ],
      filled: [
        { tag: "path", attrs: { d: "M12 2L2 7l10 5 10-5-10-5z", fill: "currentColor" } },
        { tag: "path", attrs: { d: "M2 12.5l10 5 10-5M2 17.5l10 5 10-5", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinejoin: "round" } },
      ],
      duotone: [
        { tag: "path", attrs: { d: "M12 2L2 7l10 5 10-5-10-5z", fill: "currentColor", opacity: 0.25 } },
        { tag: "path", attrs: { d: "M12 2L2 7l10 5 10-5-10-5z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "path", attrs: { d: "M2 17l10 5 10-5M2 12l10 5 10-5", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 7, r: 1.5, fill: "currentColor" } },
      ],
      multicolor: [
        { tag: "path", attrs: { d: "M12 2L2 7l10 5 10-5-10-5z", fill: "#3b82f6" } },
        { tag: "path", attrs: { d: "M2 12l10 5 10-5", fill: "none", stroke: "#60a5fa", strokeWidth: 2 } },
        { tag: "path", attrs: { d: "M2 17l10 5 10-5", fill: "none", stroke: "#93c5fd", strokeWidth: 2 } },
        { tag: "circle", attrs: { cx: 12, cy: 7, r: 1.5, fill: "#ffffff" } },
      ],
      gradient: [
        { tag: "path", attrs: { d: "M12 2L2 7l10 5 10-5-10-5z", fill: "url(#icon-grad)" } },
        { tag: "path", attrs: { d: "M2 17l10 5 10-5M2 12l10 5 10-5", fill: "none", stroke: "url(#icon-grad)", strokeWidth: 2, strokeLinejoin: "round" } },
      ],
      rounded: [
        { tag: "path", attrs: { d: "M12 2.5L3 7l9 4.5 9-4.5-9-4.5z", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "path", attrs: { d: "M3 16.5l9 4.5 9-4.5M3 11.5l9 4.5 9-4.5", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round" } },
        { tag: "circle", attrs: { cx: 12, cy: 7, r: 1.5, fill: "currentColor" } },
      ],
    },
  },
];
