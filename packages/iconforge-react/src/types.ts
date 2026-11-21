import type { SVGAttributes, CSSProperties } from "react";
import type { IconVariant } from "@tec-triad/iconforge-core";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number | string;

export interface IconForgeBaseProps extends Omit<SVGAttributes<SVGSVGElement>, "size"> {
  size?: IconSize;
  variant?: IconVariant;
  color?: string;
  strokeWidth?: number | string;
  primaryColor?: string;
  secondaryColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}

export interface IconForgeProps extends IconForgeBaseProps {
  name: string;
}

export type IconComponentProps = IconForgeBaseProps;
