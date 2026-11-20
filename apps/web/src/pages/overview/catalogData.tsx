import type { CatalogCategory } from "./catalogTypes";
import { PART1_CATEGORIES } from "./catalogEntriesPart1";
import { PART2_CATEGORIES } from "./catalogEntriesPart2";

export * from "./catalogTypes";

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  ...PART1_CATEGORIES,
  ...PART2_CATEGORIES,
];
