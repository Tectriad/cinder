export type IconVariant =
  | "outline"
  | "filled"
  | "duotone"
  | "multicolor"
  | "gradient"
  | "rounded";

export type IconCategorySlug =
  | "general"
  | "navigation"
  | "arrows"
  | "development"
  | "frontend"
  | "backend"
  | "devops"
  | "databases"
  | "ai"
  | "cybersecurity"
  | "hardware"
  | "business"
  | "finance"
  | "banking"
  | "ecommerce"
  | "communication"
  | "social"
  | "files"
  | "productivity"
  | "analytics"
  | "education"
  | "healthcare"
  | "medical"
  | "travel"
  | "transportation"
  | "food"
  | "nature"
  | "sports"
  | "media"
  | "photography"
  | "construction"
  | "logistics"
  | "weather"
  | "gaming"
  | "science"
  | "space"
  | "miscellaneous";

export interface IconCategory {
  id: IconCategorySlug;
  name: string;
  description: string;
  iconCount?: number;
}

export type IconSvgTag =
  | "path"
  | "circle"
  | "rect"
  | "line"
  | "polyline"
  | "polygon"
  | "ellipse"
  | "g"
  | "defs"
  | "linearGradient"
  | "stop";

export interface IconSvgNode {
  tag: IconSvgTag;
  attrs: Record<string, string | number>;
  children?: IconSvgNode[];
}

export interface IconVariantNodes {
  outline: IconSvgNode[];
  filled: IconSvgNode[];
  duotone: IconSvgNode[];
  multicolor: IconSvgNode[];
  gradient: IconSvgNode[];
  rounded: IconSvgNode[];
}

export interface IconDefinition {
  name: string;
  label: string;
  category: IconCategorySlug;
  tags: string[];
  aliases: string[];
  viewBox?: string;
  variants: IconVariantNodes;
}

export interface SearchIconOptions {
  query?: string;
  category?: IconCategorySlug | "all";
  variant?: IconVariant;
  limit?: number;
}

export interface RenderSvgOptions {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  primaryColor?: string;
  secondaryColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  className?: string;
  idPrefix?: string;
  ariaLabel?: string;
}
