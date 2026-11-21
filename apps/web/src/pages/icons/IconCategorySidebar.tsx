import type { ReactElement } from "react";
import { ALL_ICON_CATEGORIES, ALL_ICONS, type IconCategorySlug } from "@tec-triad/iconforge-core";

interface IconCategorySidebarProps {
  selectedCategory: IconCategorySlug | "all";
  onSelectCategory: (cat: IconCategorySlug | "all") => void;
}

export function IconCategorySidebar({
  selectedCategory,
  onSelectCategory,
}: IconCategorySidebarProps): ReactElement {
  // Compute counts dynamically
  const categoryCounts: Record<string, number> = {};
  for (const icon of ALL_ICONS) {
    categoryCounts[icon.category] = (categoryCounts[icon.category] || 0) + 1;
  }

  // Filter categories that currently have icons in Phase 1
  const activeCategories = ALL_ICON_CATEGORIES.filter(
    (c) => (categoryCounts[c.id] || 0) > 0,
  );

  return (
    <aside className="icon-category-sidebar">
      <div className="icon-category-header">
        <span className="icon-category-title">Categories</span>
        <span className="icon-category-count-badge">{ALL_ICONS.length} total</span>
      </div>

      <nav className="icon-category-nav">
        {/* All Icons */}
        <button
          type="button"
          className={`icon-category-nav-item ${selectedCategory === "all" ? "active" : ""}`}
          onClick={(): void => onSelectCategory("all")}
        >
          <span className="icon-cat-label">All Categories</span>
          <span className="icon-cat-count">{ALL_ICONS.length}</span>
        </button>

        {/* Dynamic Categories */}
        {activeCategories.map((cat) => {
          const count = categoryCounts[cat.id] || 0;
          return (
            <button
              key={cat.id}
              type="button"
              className={`icon-category-nav-item ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={(): void => onSelectCategory(cat.id)}
            >
              <span className="icon-cat-label">{cat.name}</span>
              <span className="icon-cat-count">{count}</span>
            </button>
          );
        })}
      </nav>

      {/* Planned Taxonomy Roadmap Card */}
      <div className="icon-category-roadmap-card">
        <span className="icon-roadmap-tag">Ecosystem Roadmap</span>
        <p className="icon-roadmap-desc">
          Phase 1: 50 icons in 6 styles (300 SVGs). Expanding through 40+ taxonomy categories to 1,050+ production icons.
        </p>
      </div>
    </aside>
  );
}
