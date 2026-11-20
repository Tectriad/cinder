import type { SVGAttributes, ReactNode, FC } from "react";

export type CDIconSize = "xs" | "sm" | "md" | "lg" | "xl" | number | string;
export type IconSize = CDIconSize;

export interface CDIconProps extends Omit<SVGAttributes<SVGElement>, "size"> {
  size?: CDIconSize;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
  children?: ReactNode;
}

export type IconProps = CDIconProps;

export type CDIconComponent = FC<CDIconProps>;
export type IconComponent = CDIconComponent;

export interface CDIconMetadata {
  name: string;
  category: "general" | "navigation" | "actions" | "media";
  keywords: string[];
  component: CDIconComponent;
}
