import type { IconDefinition, SearchIconOptions } from "./types";
import { ALL_ICONS } from "./definitions";

export function searchIcons(options: SearchIconOptions = {}): IconDefinition[] {
  const {
    query = "",
    category = "all",
    limit = 1000,
  } = options;

  const normalizedQuery = query.toLowerCase().trim();

  let results = ALL_ICONS;

  if (category && category !== "all") {
    results = results.filter((icon: IconDefinition) => icon.category === category);
  }

  if (normalizedQuery) {
    results = results.filter((icon: IconDefinition) => {
      if (icon.name.toLowerCase().includes(normalizedQuery)) return true;
      if (icon.label.toLowerCase().includes(normalizedQuery)) return true;
      if (icon.category.toLowerCase().includes(normalizedQuery)) return true;
      if (icon.aliases.some((a: string) => a.toLowerCase().includes(normalizedQuery))) return true;
      if (icon.tags.some((t: string) => t.toLowerCase().includes(normalizedQuery))) return true;
      return false;
    });
  }

  if (limit && limit > 0) {
    return results.slice(0, limit);
  }

  return results;
}

export function getRelatedIcons(icon: IconDefinition, maxCount = 4): IconDefinition[] {
  return ALL_ICONS.filter(
    (item: IconDefinition) =>
      item.name !== icon.name &&
      (item.category === icon.category ||
        item.tags.some((t: string) => icon.tags.includes(t))),
  ).slice(0, maxCount);
}
