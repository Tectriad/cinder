import {
  forwardRef,
  useId,
  createElement,
  type ReactElement,
  type SVGProps,
} from "react";
import {
  getIconDefinition,
  type IconSvgNode,
  type IconDefinition,
} from "@tec-triad/iconforge-core";
import type { IconForgeProps, IconSize } from "./types";

export function resolveIconDimension(size?: IconSize): number | string {
  if (typeof size === "number") return size;
  if (!size) return 24;

  switch (size) {
    case "xs":
      return 14;
    case "sm":
      return 18;
    case "md":
      return 24;
    case "lg":
      return 32;
    case "xl":
      return 48;
    default:
      return size;
  }
}

function renderAstNode(
  node: IconSvgNode,
  key: string,
  gradId: string,
  variant: string,
  primaryColor?: string,
  secondaryColor?: string,
  defaultColor?: string,
  customStrokeWidth?: number | string,
): ReactElement {
  const attrs: Record<string, unknown> = { ...node.attrs, key };

  if (attrs.stroke === "currentColor") {
    attrs.stroke = primaryColor || defaultColor || "currentColor";
  }
  if (attrs.fill === "currentColor") {
    if (variant === "duotone" && node.attrs.opacity) {
      attrs.fill = secondaryColor || primaryColor || defaultColor || "currentColor";
    } else {
      attrs.fill = primaryColor || defaultColor || "currentColor";
    }
  }
  if (attrs.fill === "url(#icon-grad)") {
    attrs.fill = `url(#${gradId})`;
  }
  if (attrs.stroke === "url(#icon-grad)") {
    attrs.stroke = `url(#${gradId})`;
  }
  if (attrs.strokeWidth && typeof customStrokeWidth === "number" && customStrokeWidth !== 2) {
    attrs.strokeWidth = customStrokeWidth;
  }

  const children = node.children
    ? node.children.map((child: IconSvgNode, i: number) =>
        renderAstNode(
          child,
          `${key}-${i}`,
          gradId,
          variant,
          primaryColor,
          secondaryColor,
          defaultColor,
          customStrokeWidth,
        ),
      )
    : undefined;

  return createElement(node.tag, attrs as SVGProps<SVGElement>, children);
}

export const IconForge = forwardRef<SVGSVGElement, IconForgeProps>(
  (
    {
      name,
      variant = "outline",
      size = 24,
      color = "currentColor",
      strokeWidth = 2,
      primaryColor,
      secondaryColor,
      gradientStart = "#3b82f6",
      gradientEnd = "#8b5cf6",
      className,
      style,
      "aria-label": ariaLabel,
      ...rest
    }: IconForgeProps,
    ref,
  ): ReactElement | null => {
    const rawId = useId();
    const cleanId = rawId.replace(/[^a-zA-Z0-9-_]/g, "");
    const gradId = `iconforge-grad-${cleanId}`;

    const iconDef: IconDefinition | undefined = getIconDefinition(name);

    if (!iconDef) {
      return (
        <svg
          ref={ref}
          width={resolveIconDimension(size)}
          height={resolveIconDimension(size)}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={className}
          style={style}
          {...rest}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
        </svg>
      );
    }

    const nodes: IconSvgNode[] =
      iconDef.variants[variant] || iconDef.variants.outline;
    const dimension = resolveIconDimension(size);
    const viewBox = iconDef.viewBox || "0 0 24 24";

    return (
      <svg
        ref={ref}
        width={dimension}
        height={dimension}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          flexShrink: 0,
          ...style,
        }}
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel}
        role={ariaLabel ? "img" : undefined}
        {...rest}
      >
        {variant === "gradient" && (
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientStart} />
              <stop offset="100%" stopColor={gradientEnd} />
            </linearGradient>
          </defs>
        )}
        {nodes.map((node: IconSvgNode, index: number) =>
          renderAstNode(
            node,
            `node-${index}`,
            gradId,
            variant,
            primaryColor,
            secondaryColor,
            color,
            strokeWidth,
          ),
        )}
      </svg>
    );
  },
);

IconForge.displayName = "IconForge";
