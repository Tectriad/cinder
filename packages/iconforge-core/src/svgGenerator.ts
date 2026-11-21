import type {
  IconDefinition,
  IconSvgNode,
  IconVariant,
  RenderSvgOptions,
} from "./types";

function nodeToXml(node: IconSvgNode, indent = "  "): string {
  const attrsString = Object.entries(node.attrs)
    .map(([key, val]) => `${key}="${val}"`)
    .join(" ");

  if (!node.children || node.children.length === 0) {
    return `${indent}<${node.tag} ${attrsString} />`;
  }

  const childrenXml = node.children
    .map((child: IconSvgNode) => nodeToXml(child, `${indent}  `))
    .join("\n");

  return `${indent}<${node.tag} ${attrsString}>\n${childrenXml}\n${indent}</${node.tag}>`;
}

export function generateSvgString(
  icon: IconDefinition,
  variant: IconVariant = "outline",
  options: RenderSvgOptions = {},
): string {
  const {
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    primaryColor,
    secondaryColor,
    gradientStart = "#3b82f6",
    gradientEnd = "#8b5cf6",
    className,
    idPrefix = "iconforge",
    ariaLabel,
  } = options;

  const nodes = icon.variants[variant] || icon.variants.outline;
  const viewBox = icon.viewBox || "0 0 24 24";
  const gradId = `${idPrefix}-grad-${icon.name}`;

  // Process nodes for colors and gradient ID replacements
  const processedNodes: IconSvgNode[] = nodes.map((node: IconSvgNode) => {
    const newAttrs: Record<string, string | number> = { ...node.attrs };

    if (newAttrs.stroke === "currentColor") {
      newAttrs.stroke = primaryColor || color;
    }
    if (newAttrs.fill === "currentColor") {
      if (variant === "duotone" && node.attrs.opacity) {
        newAttrs.fill = secondaryColor || primaryColor || color;
      } else {
        newAttrs.fill = primaryColor || color;
      }
    }
    if (newAttrs.fill === "url(#icon-grad)") {
      newAttrs.fill = `url(#${gradId})`;
    }
    if (newAttrs.stroke === "url(#icon-grad)") {
      newAttrs.stroke = `url(#${gradId})`;
    }
    if (newAttrs.strokeWidth && typeof strokeWidth === "number" && strokeWidth !== 2) {
      newAttrs.strokeWidth = strokeWidth;
    }

    return {
      ...node,
      attrs: newAttrs,
    };
  });

  const childrenXml = processedNodes.map((n: IconSvgNode) => nodeToXml(n, "  ")).join("\n");

  let defsXml = "";
  if (variant === "gradient") {
    defsXml = `  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradientStart}" />
      <stop offset="100%" stop-color="${gradientEnd}" />
    </linearGradient>
  </defs>\n`;
  }

  const classAttr = className ? ` class="${className}"` : "";
  const ariaAttr = ariaLabel
    ? ` aria-label="${ariaLabel}" role="img"`
    : ` aria-hidden="true"`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" fill="none"${classAttr}${ariaAttr}>
${defsXml}${childrenXml}
</svg>`;
}
