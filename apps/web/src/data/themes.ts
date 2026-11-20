export interface TokenItem {
  token: string;
  role: string;
  value: string;
  description: string;
}

export interface ThemeReference {
  id: string;
  name: string;
  tagline: string;
  vibe: string;
  className: string;
  badge: string;
  accentColor: string;
  isPrimaryChoice?: boolean;
  inspirations: string[];
  attributes: {
    radii: string;
    borderStyle: string;
    typography: string;
    shadowStyle: string;
    contrast: string;
  };
  recommendedFor: string;
  description: string;
  tokens: TokenItem[];
}

export const THEME_REFERENCES: ThemeReference[] = [
  {
    id: "cinder-slate",
    name: "Cinder Slate",
    tagline: "Professional Modern Blue & Slate (Dark / Light)",
    vibe: "Deep obsidian canvas (#09090b / #fafafa), precision slate surfaces, royal blue actions (#3b82f6 / #2563eb), and crisp zinc borders.",
    className: "theme-preview-slate",
    badge: "Official Theme",
    accentColor: "#3b82f6",
    isPrimaryChoice: true,
    inspirations: ["Tailwind Slate", "Ant Design", "Vercel", "GitHub"],
    attributes: {
      radii: "8px (Modern Standard)",
      borderStyle: "1px Slate Border (#27272a / #e4e4e7)",
      typography: "Plus Jakarta Sans & JetBrains Mono",
      shadowStyle: "Precision ambient depth (0 8px 24px rgba(0,0,0,0.55))",
      contrast: "WCAG AAA compliant with dedicated high-contrast light mode",
    },
    recommendedFor: "Developer tools, enterprise dashboards, SaaS platforms, design systems",
    description: "Built for clean legibility, crisp contrast, and fluid switching between dark and light modes with precision zinc surfaces and blue brand actions.",
    tokens: [
      { token: "--cinder-bg", role: "Primary Canvas", value: "#09090b / #fafafa", description: "Obsidian (Dark) / Pure Off-White (Light)" },
      { token: "--cinder-surface", role: "Cards & Modals", value: "#121215 / #ffffff", description: "Slate Surface (Dark) / Pure White (Light)" },
      { token: "--cinder-surface-hover", role: "Hover Surfaces", value: "#1a1a1f / #f4f4f5", description: "Deep Slate / Soft Zinc" },
      { token: "--cinder-glass", role: "Frosted Panels", value: "rgba(18, 18, 21, 0.8) / rgba(255, 255, 255, 0.82)", description: "Backdrop blur(16px)" },
      { token: "--cinder-primary", role: "Primary Action", value: "#3b82f6 / #2563eb", description: "Slate Blue (Dark) / Royal Blue (Light)" },
      { token: "--cinder-primary-hover", role: "Primary Hover", value: "#2563eb / #1d4ed8", description: "Deep Blue / Navy Blue" },
      { token: "--cinder-border", role: "Subtle Divider", value: "#27272a / #e4e4e7", description: "Dark Slate / Light Slate" },
      { token: "--cinder-text", role: "Primary Copy", value: "#fafafa / #09090b", description: "High-contrast Slate Text" },
      { token: "--cinder-muted", role: "Secondary Copy", value: "#a1a1aa / #71717a", description: "Zinc Muted Text" },
      { token: "--cinder-success", role: "Semantic Success", value: "#34d399 / #059669", description: "Emerald Green" },
      { token: "--cinder-warning", role: "Semantic Warning", value: "#fbbf24 / #d97706", description: "Amber Gold" },
      { token: "--cinder-danger", role: "Semantic Danger", value: "#f87171 / #dc2626", description: "Coral Red" },
    ],
  },
  {
    id: "linear",
    name: "Linear Obsidian",
    tagline: "Minimalist Utilitarian & Dark Zinc",
    vibe: "Deep carbon slate, electric indigo highlights, hairline zinc borders, and sharp micro-glows.",
    className: "theme-preview-linear",
    badge: "B2B SaaS Benchmark",
    accentColor: "#6366f1",
    inspirations: ["Linear.app", "Height.app", "Attio"],
    attributes: {
      radii: "8px (Subtle Rounded)",
      borderStyle: "1px Hairline Zinc (rgba(255,255,255,0.08))",
      typography: "Modern Geometric Sans (Clean & Tight)",
      shadowStyle: "Soft directional ambient depth",
      contrast: "Harmonious Low-Glare Dark Mode",
    },
    recommendedFor: "Modern SaaS, Project Management, Collaboration Platforms",
    description: "Cold slate surfaces with electric indigo accents and tight tracking.",
    tokens: [
      { token: "--cinder-bg", role: "Primary Canvas", value: "#0B0D10", description: "Carbon Slate" },
      { token: "--cinder-surface", role: "Cards & Modals", value: "#14171D", description: "Dark Zinc" },
      { token: "--cinder-glass", role: "Frosted Panels", value: "rgba(20, 23, 29, 0.8)", description: "blur(12px)" },
      { token: "--cinder-primary", role: "Primary Action", value: "#6366F1", description: "Electric Indigo" },
      { token: "--cinder-accent", role: "Secondary / Links", value: "#818CF8", description: "Soft Violet" },
      { token: "--cinder-border", role: "Subtle Divider", value: "rgba(255, 255, 255, 0.08)", description: "Hairline Zinc" },
      { token: "--cinder-text", role: "Primary Copy", value: "#F8FAFC", description: "Cool White" },
      { token: "--cinder-muted", role: "Secondary Copy", value: "#94A3B8", description: "Slate Grey" },
    ],
  },
  {
    id: "geist",
    name: "Geist Monolith",
    tagline: "Razor-Sharp High-Contrast Industrial",
    vibe: "Pure black and stark white, industrial precision, monospace accents, razor-sharp 4px radii.",
    className: "theme-preview-geist",
    badge: "Industrial Monochrome",
    accentColor: "#ffffff",
    inspirations: ["Vercel Geist", "Turborepo", "Next.js"],
    attributes: {
      radii: "4px (Razor Sharp Minimal)",
      borderStyle: "1px Rigid Charcoal (#262626)",
      typography: "Industrial Monospace + Grotesque",
      shadowStyle: "Zero blur hard borders",
      contrast: "Maximum 21:1 stark contrast",
    },
    recommendedFor: "DevOps Consoles, Cloud Platforms, CLI GUIs",
    description: "Pure obsidian canvas with high-contrast pure white typography.",
    tokens: [
      { token: "--cinder-bg", role: "Primary Canvas", value: "#000000", description: "Pure Obsidian" },
      { token: "--cinder-surface", role: "Cards & Modals", value: "#0A0A0A", description: "Pitch Charcoal" },
      { token: "--cinder-glass", role: "Frosted Panels", value: "rgba(10, 10, 10, 0.85)", description: "blur(8px)" },
      { token: "--cinder-primary", role: "Primary Action", value: "#FFFFFF", description: "Stark White" },
      { token: "--cinder-accent", role: "Secondary / Links", value: "#A3A3A3", description: "Neutral Grey" },
      { token: "--cinder-border", role: "Subtle Divider", value: "#262626", description: "Charcoal Rim" },
      { token: "--cinder-text", role: "Primary Copy", value: "#FFFFFF", description: "Pure White" },
      { token: "--cinder-muted", role: "Secondary Copy", value: "#888888", description: "Medium Grey" },
    ],
  },
  {
    id: "spatial",
    name: "Spatial Glassmorphism",
    tagline: "VisionOS Frosted Translucency & Fluid Depth",
    vibe: "Multi-layered frosted glass, liquid blur, smooth squircle 18px radii, inner specular highlights.",
    className: "theme-preview-spatial",
    badge: "Spatial 3D Depth",
    accentColor: "#38bdf8",
    inspirations: ["Apple VisionOS", "macOS Sonoma"],
    attributes: {
      radii: "18px (Squircle Curves)",
      borderStyle: "Translucent Specular Glass (rgba(255,255,255,0.18))",
      typography: "Fluid Neo-Grotesque with soft tracking",
      shadowStyle: "Multi-layer ambient diffuse shadows",
      contrast: "Atmospheric multi-depth hierarchy",
    },
    recommendedFor: "Consumer Web Apps, Media Platforms, AI Chat Showcases",
    description: "Suspended panes of frosted glass with fluid, organic specular lighting.",
    tokens: [
      { token: "--cinder-bg", role: "Primary Canvas", value: "#090D16", description: "Midnight Navy" },
      { token: "--cinder-surface", role: "Cards & Modals", value: "rgba(255, 255, 255, 0.05)", description: "Glass Layer" },
      { token: "--cinder-glass", role: "Frosted Panels", value: "rgba(255, 255, 255, 0.08)", description: "blur(20px)" },
      { token: "--cinder-primary", role: "Primary Action", value: "#38BDF8", description: "Sky Cyan" },
      { token: "--cinder-accent", role: "Secondary / Links", value: "#7DD3FC", description: "Soft Azure" },
      { token: "--cinder-border", role: "Subtle Divider", value: "rgba(255, 255, 255, 0.14)", description: "Glass Border" },
      { token: "--cinder-text", role: "Primary Copy", value: "#F0F9FF", description: "Ice White" },
      { token: "--cinder-muted", role: "Secondary Copy", value: "#94A3B8", description: "Atmospheric Grey" },
    ],
  },
];
