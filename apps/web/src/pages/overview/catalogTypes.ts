import type { ReactNode } from "react";

export interface CatalogComponent {
  name: string;
  subtitle: string;
  desc: string;
  path: string;
  preview: ReactNode;
  badge?: string;
}

export interface CatalogCategory {
  category: string;
  components: CatalogComponent[];
}
