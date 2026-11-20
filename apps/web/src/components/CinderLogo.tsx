import { useEffect, useRef, type CSSProperties, type ReactElement } from "react";
import lottie, { type AnimationItem } from "lottie-web/build/player/lottie_light";
import logoAnimationData from "../assets/logo.json";

export interface CinderLogoProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  animate?: boolean;
}

export function CinderLogo({
  size = 32,
  className,
  style,
  animate = true,
}: CinderLogoProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

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
      animationData: logoAnimationData,
    });

    animRef.current = animInstance;

    return () => {
      animInstance.destroy();
      animRef.current = null;
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
      aria-label="Cinder UI Logo"
      role="img"
    />
  );
}
