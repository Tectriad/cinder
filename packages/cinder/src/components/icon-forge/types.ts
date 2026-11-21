import type {
  IconForgeProps,
  IconForgeBaseProps,
  IconSize,
} from "@iconforge/react";
import type { IconVariant, IconCategorySlug } from "@iconforge/core";

export type CDIconForgeSize = IconSize;
export type CDIconForgeVariant = IconVariant;
export type CDIconForgeCategory = IconCategorySlug;

export interface CDIconForgeProps extends IconForgeProps {
  className?: string;
}

export type { IconForgeProps, IconForgeBaseProps };
