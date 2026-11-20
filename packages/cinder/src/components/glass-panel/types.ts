import type { HTMLAttributes, ReactNode } from "react";

export type CDGlassBlur = "sm" | "md" | "lg";
export type GlassBlur = CDGlassBlur;

export interface CDGlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  blur?: CDGlassBlur;
  elevated?: boolean;
}

export type GlassPanelProps = CDGlassPanelProps;
