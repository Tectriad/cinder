import {
  forwardRef,
  type ReactElement,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import type { CDSkeletonProps } from "./types";

function formatDimension(dim: string | number | undefined): string | undefined {
  if (dim === undefined) return undefined;
  return typeof dim === "number" ? `${dim}px` : dim;
}

/**
 * CDSkeleton
 *
 * Content placeholder preview indicating loading state before real data is fetched.
 */
const CDSkeletonBase = forwardRef<HTMLDivElement, CDSkeletonProps>(
  (
    {
      variant = "text",
      animation = "wave",
      width,
      height,
      lines = 3,
      loading = true,
      children,
      className,
      style,
    }: CDSkeletonProps,
    ref,
  ): ReactElement => {
    // If wrapping real content, show children when loading is complete
    if (children && !loading) {
      return <>{children}</>;
    }

    const customStyle: CSSProperties = {
      ...style,
      width: formatDimension(width),
      height: formatDimension(height),
    };

    // Card Preset
    if (variant === "card") {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cn("cinder-skeleton-card-preset", className)}
          style={style}
        >
          <div className="cinder-skeleton-card-header">
            <span
              className={cn(
                "cinder-skeleton",
                "cinder-skeleton-circle",
                `cinder-skeleton-anim-${animation}`,
              )}
              style={{ width: "40px", height: "40px" }}
            />
            <div className="cinder-skeleton-card-titles">
              <span
                className={cn(
                  "cinder-skeleton",
                  `cinder-skeleton-anim-${animation}`,
                )}
                style={{ width: "65%", height: "16px" }}
              />
              <span
                className={cn(
                  "cinder-skeleton",
                  `cinder-skeleton-anim-${animation}`,
                )}
                style={{ width: "40%", height: "12px", marginTop: "6px" }}
              />
            </div>
          </div>
          <div className="cinder-skeleton-card-body">
            <span
              className={cn("cinder-skeleton", `cinder-skeleton-anim-${animation}`)}
              style={{ width: "100%", height: "14px" }}
            />
            <span
              className={cn("cinder-skeleton", `cinder-skeleton-anim-${animation}`)}
              style={{ width: "90%", height: "14px", marginTop: "8px" }}
            />
            <span
              className={cn("cinder-skeleton", `cinder-skeleton-anim-${animation}`)}
              style={{ width: "60%", height: "14px", marginTop: "8px" }}
            />
          </div>
        </div>
      );
    }

    // Text Multi-Line Paragraph
    if (variant === "text") {
      const lineArray: number[] = Array.from({ length: lines }, (_: unknown, i: number) => i);
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cn("cinder-skeleton-paragraph", className)}
          style={style}
        >
          {lineArray.map((idx: number) => {
            const isLast: boolean = idx === lineArray.length - 1;
            const lineWidth: string = isLast && lineArray.length > 1 ? "60%" : "100%";
            return (
              <span
                key={idx}
                className={cn(
                  "cinder-skeleton",
                  "cinder-skeleton-line",
                  `cinder-skeleton-anim-${animation}`,
                )}
                style={{
                  width: width ? formatDimension(width) : lineWidth,
                  height: height ? formatDimension(height) : "14px",
                }}
              />
            );
          })}
        </div>
      );
    }

    // Single Skeleton element (circle, rect, button)
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          "cinder-skeleton",
          `cinder-skeleton-${variant}`,
          `cinder-skeleton-anim-${animation}`,
          className,
        )}
        style={customStyle}
      />
    );
  },
);

CDSkeletonBase.displayName = "CDSkeleton";

export const CDSkeleton = Object.assign(CDSkeletonBase, {
  Avatar: forwardRef<HTMLDivElement, Omit<CDSkeletonProps, "variant">>(
    (props: Omit<CDSkeletonProps, "variant">, ref) => (
      <CDSkeletonBase
        ref={ref}
        variant="circle"
        width={props.width ?? 40}
        height={props.height ?? 40}
        {...props}
      />
    ),
  ),
  Button: forwardRef<HTMLDivElement, Omit<CDSkeletonProps, "variant">>(
    (props: Omit<CDSkeletonProps, "variant">, ref) => (
      <CDSkeletonBase
        ref={ref}
        variant="button"
        width={props.width ?? 100}
        height={props.height ?? 36}
        {...props}
      />
    ),
  ),
  Image: forwardRef<HTMLDivElement, Omit<CDSkeletonProps, "variant">>(
    (props: Omit<CDSkeletonProps, "variant">, ref) => (
      <CDSkeletonBase
        ref={ref}
        variant="rect"
        width={props.width ?? "100%"}
        height={props.height ?? 180}
        {...props}
      />
    ),
  ),
});

// Backward-compatible alias
export const Skeleton = CDSkeleton;
