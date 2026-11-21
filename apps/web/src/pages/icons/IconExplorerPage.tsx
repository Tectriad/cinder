import { useState, useMemo, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { IconButton, useCinderTheme } from "@cinder-ui/core";
import {
  ALL_ICONS,
  searchIcons,
  type IconDefinition,
  type IconVariant,
  type IconCategorySlug,
} from "@iconforge/core";
import { IconToolbar } from "./IconToolbar";
import { IconCategorySidebar } from "./IconCategorySidebar";
import { IconCard } from "./IconCard";
import { IconDetailModal } from "./IconDetailModal";
import { IconBatchTray } from "./IconBatchTray";
import { IconPlayground } from "./IconPlayground";
import type {
  IconExplorerState,
  IconExplorerTab,
  IconViewMode,
  CanvasBackground,
} from "./types";

export function IconExplorerPage(): ReactElement {
  const { resolvedMode, setMode } = useCinderTheme();

  const [state, setState] = useState<IconExplorerState>({
    searchTerm: "",
    selectedCategory: "all",
    selectedVariant: "outline",
    iconSize: 24,
    strokeWidth: 2,
    primaryColor: "currentColor",
    secondaryColor: "#3b82f6",
    canvasBg: "canvas",
    viewMode: "grid",
    selectedIcon: null,
    selectedIconsBatch: [],
    favorites: [],
    activeTab: "explorer",
  });

  // Filtered icons
  const filteredIcons = useMemo<IconDefinition[]>(() => {
    return searchIcons({
      query: state.searchTerm,
      category: state.selectedCategory,
    });
  }, [state.searchTerm, state.selectedCategory]);

  const handleToggleBatch = (iconName: string): void => {
    setState((prev: IconExplorerState) => {
      const exists = prev.selectedIconsBatch.includes(iconName);
      return {
        ...prev,
        selectedIconsBatch: exists
          ? prev.selectedIconsBatch.filter((n: string) => n !== iconName)
          : [...prev.selectedIconsBatch, iconName],
      };
    });
  };

  const handleToggleFavorite = (iconName: string): void => {
    setState((prev: IconExplorerState) => {
      const exists = prev.favorites.includes(iconName);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter((n: string) => n !== iconName)
          : [...prev.favorites, iconName],
      };
    });
  };

  const handleSelectAllBatch = (): void => {
    setState((prev: IconExplorerState) => ({
      ...prev,
      selectedIconsBatch: ALL_ICONS.map((i: IconDefinition) => i.name),
    }));
  };

  const handleClearBatch = (): void => {
    setState((prev: IconExplorerState) => ({
      ...prev,
      selectedIconsBatch: [],
    }));
  };

  return (
    <div className="icon-studio-page" data-theme={resolvedMode}>
      {/* Top Navbar */}
      <header className="icon-studio-navbar">
        <div className="icon-studio-nav-left">
          <Link to="/" className="icon-studio-back-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Cinder</span>
          </Link>
        </div>

        {/* Studio Center Tabs */}
        <div className="icon-studio-tabs">
          {(
            [
              { id: "explorer", label: "Icon Explorer" },
              { id: "playground", label: "Studio Playground" },
            ] as Array<{ id: IconExplorerTab; label: string }>
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`icon-studio-tab-btn ${state.activeTab === tab.id ? "active" : ""}`}
              onClick={(): void =>
                setState((prev: IconExplorerState) => ({
                  ...prev,
                  activeTab: tab.id,
                }))
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Nav Right Links & Theme Toggle */}
        <div className="icon-studio-nav-right">
          <IconButton
            icon={resolvedMode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            aria-label={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
            variant="ghost"
            size="sm"
            onClick={(): void => setMode(resolvedMode === "dark" ? "light" : "dark")}
            title={`Switch to ${resolvedMode === "dark" ? "light" : "dark"} mode`}
          />
          <Link to="/components/icon" className="icon-studio-secondary-link">
            Cinder Docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="icon-studio-github-btn"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="icon-studio-main">
        {state.activeTab === "explorer" && (
          <div className="icon-explorer-layout">
            {/* Category Sidebar */}
            <IconCategorySidebar
              selectedCategory={state.selectedCategory}
              onSelectCategory={(cat: IconCategorySlug | "all"): void =>
                setState((prev: IconExplorerState) => ({
                  ...prev,
                  selectedCategory: cat,
                }))
              }
            />

            {/* Explorer Canvas */}
            <div className={`icon-explorer-content ${state.canvasBg}`}>
              <IconToolbar
                state={state}
                totalMatches={filteredIcons.length}
                onSearchChange={(searchTerm: string): void =>
                  setState((prev: IconExplorerState) => ({
                    ...prev,
                    searchTerm,
                  }))
                }
                onVariantChange={(selectedVariant: IconVariant): void =>
                  setState((prev: IconExplorerState) => ({
                    ...prev,
                    selectedVariant,
                  }))
                }
                onSizeChange={(iconSize: number): void =>
                  setState((prev: IconExplorerState) => ({ ...prev, iconSize }))
                }
                onStrokeWidthChange={(strokeWidth: number): void =>
                  setState((prev: IconExplorerState) => ({
                    ...prev,
                    strokeWidth,
                  }))
                }
                onPrimaryColorChange={(primaryColor: string): void =>
                  setState((prev: IconExplorerState) => ({
                    ...prev,
                    primaryColor,
                  }))
                }
                onSecondaryColorChange={(secondaryColor: string): void =>
                  setState((prev: IconExplorerState) => ({
                    ...prev,
                    secondaryColor,
                  }))
                }
                onCanvasBgChange={(canvasBg: CanvasBackground): void =>
                  setState((prev: IconExplorerState) => ({ ...prev, canvasBg }))
                }
                onViewModeChange={(viewMode: IconViewMode): void =>
                  setState((prev: IconExplorerState) => ({ ...prev, viewMode }))
                }
              />

              {/* Icon Grid / List */}
              <div
                className={`icon-cards-container ${state.viewMode === "list" ? "list-layout" : "grid-layout"}`}
              >
                {filteredIcons.length === 0 ? (
                  <div className="icon-empty-state">
                    <p className="icon-empty-title">No matching icons found</p>
                    <p className="icon-empty-desc">
                      Try searching for a different keyword, tag, or reset the
                      category filter.
                    </p>
                    <button
                      type="button"
                      className="icon-empty-reset-btn"
                      onClick={(): void =>
                        setState((prev: IconExplorerState) => ({
                          ...prev,
                          searchTerm: "",
                          selectedCategory: "all",
                        }))
                      }
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredIcons.map((icon: IconDefinition) => (
                    <IconCard
                      key={icon.name}
                      icon={icon}
                      variant={state.selectedVariant}
                      size={state.iconSize}
                      strokeWidth={state.strokeWidth}
                      primaryColor={state.primaryColor}
                      secondaryColor={state.secondaryColor}
                      viewMode={state.viewMode}
                      isBatchSelected={state.selectedIconsBatch.includes(
                        icon.name,
                      )}
                      isFavorite={state.favorites.includes(icon.name)}
                      onSelect={(selectedIcon: IconDefinition): void =>
                        setState((prev: IconExplorerState) => ({
                          ...prev,
                          selectedIcon,
                        }))
                      }
                      onToggleBatch={handleToggleBatch}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {state.activeTab === "playground" && <IconPlayground />}
      </main>

      {/* Detail Inspection Modal */}
      <IconDetailModal
        icon={state.selectedIcon}
        currentVariant={state.selectedVariant}
        primaryColor={state.primaryColor}
        secondaryColor={state.secondaryColor}
        onClose={(): void =>
          setState((prev: IconExplorerState) => ({
            ...prev,
            selectedIcon: null,
          }))
        }
        onSelectIcon={(icon: IconDefinition): void =>
          setState((prev: IconExplorerState) => ({
            ...prev,
            selectedIcon: icon,
          }))
        }
      />

      {/* Batch Export Floating Action Tray */}
      <IconBatchTray
        selectedNames={state.selectedIconsBatch}
        currentVariant={state.selectedVariant}
        primaryColor={state.primaryColor}
        secondaryColor={state.secondaryColor}
        onClear={handleClearBatch}
        onSelectAll={handleSelectAllBatch}
      />
    </div>
  );
}
