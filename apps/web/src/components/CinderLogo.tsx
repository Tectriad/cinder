import { useEffect, useRef, type CSSProperties, type ReactElement } from "react";
import lottie, { type AnimationItem } from "lottie-web/build/player/lottie_light";
import { useCinderTheme } from "@cinder-ui/core";
import logoAnimationData from "../assets/logo.json";

export interface CinderLogoProps {
  /** Size in pixels (width and height). Defaults to 36. */
  size?: number;
  /** Optional custom CSS class */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
  /** Whether the Lottie loop animation is active. Defaults to true. */
  animate?: boolean;
  /** Custom SVG viewBox string (default crops tightly around the centered emblem: "514 66 820 820") */
  viewBox?: string;
  /** Override theme palette (defaults to current theme resolvedMode: "dark" | "light") */
  theme?: "dark" | "light";
}

/** Default focused viewBox centering the central Cinder emblem tightly without letterbox gap */
const DEFAULT_VIEWBOX: string = "514 66 820 820";

type ColorTuple = [number, number, number, number];

interface StrokeShapeItem {
  ty?: string;
  c?: {
    k?: number[];
  };
}

interface LayerShapeGroup {
  it?: StrokeShapeItem[];
}

interface AnimationSubLayer {
  shapes?: LayerShapeGroup[];
}

interface AnimationAssetItem {
  id?: string | number;
  layers?: AnimationSubLayer[];
}

interface AnimationDataStructure {
  assets?: AnimationAssetItem[];
  [key: string]: unknown;
}

/**
 * Transforms the After Effects Lottie animation data to match the active theme.
 * In Dark Theme, pure black and dark navy strokes are mapped to luminous white,
 * radiant cyan, and vibrant blue to guarantee high contrast against dark backgrounds.
 */
function createThemedAnimationData(
  baseData: AnimationDataStructure,
  isDark: boolean
): AnimationDataStructure {
  const themed: AnimationDataStructure = JSON.parse(JSON.stringify(baseData));
  const asset: AnimationAssetItem | undefined = themed.assets?.[0];
  if (!asset?.layers) return themed;

  // 6 groups of 11 layers in logo.json
  const darkPalette: ColorTuple[] = [
    [0.98, 0.99, 1.0, 1.0],         // Group 0: pure luminous white #f8fafc (replaces pitch black)
    [0.2314, 0.5098, 0.9647, 1.0], // Group 1: Cinder primary royal blue #3b82f6
    [0.52, 0.704, 1.0, 1.0],        // Group 2: ice sky blue #85b4ff
    [0.22, 0.74, 0.97, 1.0],        // Group 3: radiant electric cyan #38bdf8
    [0.376, 0.647, 0.98, 1.0],      // Group 4: bright cobalt blue #60a5fa (replaces dark navy)
    [0.749, 0.859, 1.0, 1.0],       // Group 5: soft luminous ice #bfdbfe (replaces midnight navy)
  ];

  const lightPalette: ColorTuple[] = [
    [0.05, 0.09, 0.16, 1.0],        // Group 0: deep slate obsidian #0f172a
    [0.145, 0.388, 0.922, 1.0],     // Group 1: strong royal blue #2563eb
    [0.2314, 0.5098, 0.9647, 1.0],  // Group 2: Cinder primary #3b82f6
    [0.114, 0.306, 0.847, 1.0],     // Group 3: deep cobalt #1d4ed8
    [0.2, 0.255, 0.333, 1.0],       // Group 4: dark slate #334155
    [0.118, 0.161, 0.231, 1.0],     // Group 5: deep navy #1e293b
  ];

  const palette: ColorTuple[] = isDark ? darkPalette : lightPalette;

  for (let group: number = 0; group < 6; group++) {
    const color: ColorTuple = palette[group];
    for (let i: number = 0; i < 11; i++) {
      const layerIdx: number = group * 11 + i;
      const layer: AnimationSubLayer | undefined = asset.layers[layerIdx];
      if (layer && Array.isArray(layer.shapes)) {
        layer.shapes.forEach((sh: LayerShapeGroup) => {
          (sh.it || []).forEach((it: StrokeShapeItem) => {
            if (it.ty === "st" && it.c) {
              it.c.k = [...color];
            }
          });
        });
      }
    }
  }

  return themed;
}

// Pre-compute themed palettes once at module level for instant zero-lag switching
const DARK_LOGO_DATA: AnimationDataStructure = createThemedAnimationData(
  logoAnimationData as AnimationDataStructure,
  true
);

const LIGHT_LOGO_DATA: AnimationDataStructure = createThemedAnimationData(
  logoAnimationData as AnimationDataStructure,
  false
);

export function CinderLogo({
  size = 36,
  className,
  style,
  animate = true,
  viewBox = DEFAULT_VIEWBOX,
  theme,
}: CinderLogoProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  const { resolvedMode } = useCinderTheme();
  const effectiveTheme: "dark" | "light" = theme ?? resolvedMode;
  const activeAnimationData: AnimationDataStructure =
    effectiveTheme === "dark" ? DARK_LOGO_DATA : LIGHT_LOGO_DATA;

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up any existing instance
    if (animRef.current) {
      animRef.current.destroy();
    }

    const animInstance: AnimationItem = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: animate,
      autoplay: animate,
      animationData: activeAnimationData,
      rendererSettings: {
        viewBoxSize: viewBox,
        preserveAspectRatio: "xMidYMid meet",
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    });

    const configureSvg = (): void => {
      if (!containerRef.current) return;
      const svg: SVGSVGElement | null = containerRef.current.querySelector("svg");
      if (svg) {
        svg.setAttribute("viewBox", viewBox);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";
      }
    };

    animInstance.addEventListener("DOMLoaded", configureSvg);
    configureSvg();

    animRef.current = animInstance;

    return () => {
      animInstance.destroy();
      animRef.current = null;
    };
  }, [animate, viewBox, activeAnimationData]);

  return (
    <div
      ref={containerRef}
      className={`cinder-logo-container ${className ?? ""}`.trim()}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
      aria-label="Cinder UI Logo"
      role="img"
    />
  );
}
