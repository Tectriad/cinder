import {
  useState,
  forwardRef,
  type ReactElement,
  type CSSProperties,
  type SyntheticEvent,
} from "react";
import { cn } from "../../utils/cn";
import type { CDAvatarProps } from "./types";
import { CDAvatarGroup } from "./CDAvatarGroup";

const SIZE_MAP: Record<string, number> = {
  xs: 20,
  sm: 28,
  md: 36,
  lg: 44,
  xl: 56,
};

/**
 * CDAvatar / Avatar
 *
 * Visual representation of an identity with images, icons, or initial monograms.
 */
export const CDAvatarBase = forwardRef<HTMLSpanElement, CDAvatarProps>(
  (
    {
      shape = "circle",
      size = "md",
      src,
      srcSet,
      alt,
      icon,
      status,
      statusPosition = "bottom-right",
      onError,
      style,
      className,
      children,
      ...rest
    }: CDAvatarProps,
    ref
  ): ReactElement => {
    const [imgLoadError, setImgLoadError] = useState<boolean>(false);

    const handleImgError = (e: SyntheticEvent<HTMLImageElement>): void => {
      const errorResult = onError?.(e);
      if (errorResult !== false) {
        setImgLoadError(true);
      }
    };

    // Calculate dimensions
    const numericSize: number | undefined =
      typeof size === "number"
        ? size
        : SIZE_MAP[size as keyof typeof SIZE_MAP] || 36;

    const sizeStyle: CSSProperties = numericSize
      ? {
          width: `${numericSize}px`,
          height: `${numericSize}px`,
          fontSize: `${Math.max(10, Math.floor(numericSize * 0.42))}px`,
        }
      : {};

    // Render inner content
    const renderContent = (): ReactElement | null => {
      if (src && !imgLoadError) {
        return (
          <img
            src={src}
            srcSet={srcSet}
            alt={alt || "Avatar"}
            onError={handleImgError}
            className="cinder-avatar-img"
          />
        );
      }

      if (icon) {
        return <span className="cinder-avatar-icon">{icon}</span>;
      }

      if (children !== undefined) {
        return <span className="cinder-avatar-string">{children}</span>;
      }

      return null;
    };

    return (
      <span
        ref={ref}
        style={{ ...sizeStyle, ...style }}
        className={cn(
          "cinder-avatar",
          `cinder-avatar-${shape}`,
          typeof size === "string" && `cinder-avatar-${size}`,
          className
        )}
        {...rest}
      >
        {renderContent()}

        {status && (
          <span
            className={cn(
              "cinder-avatar-status",
              `cinder-avatar-status-${status}`,
              `cinder-avatar-status-${statusPosition}`
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </span>
    );
  }
);

CDAvatarBase.displayName = "CDAvatar";

export const CDAvatar = Object.assign(CDAvatarBase, {
  Group: CDAvatarGroup,
});

// Backward-compatible aliases
export const Avatar = CDAvatar;
export const AvatarGroup = CDAvatarGroup;
