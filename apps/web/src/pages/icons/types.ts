import type { IconDefinition, IconVariant, IconCategorySlug } from "@iconforge/core";

export type IconExplorerTab = "explorer" | "playground";
export type IconViewMode = "grid" | "list";
export type CanvasBackground = "canvas" | "surface" | "slate" | "contrast" | "dark" | "white" | "gray";

export interface IconExplorerState {
  searchTerm: string;
  selectedCategory: IconCategorySlug | "all";
  selectedVariant: IconVariant;
  iconSize: number;
  strokeWidth: number;
  primaryColor: string;
  secondaryColor: string;
  canvasBg: CanvasBackground;
  viewMode: IconViewMode;
  selectedIcon: IconDefinition | null;
  selectedIconsBatch: string[];
  favorites: string[];
  activeTab: IconExplorerTab;
}
