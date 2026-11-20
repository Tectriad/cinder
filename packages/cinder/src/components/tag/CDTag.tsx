import {
  useState,
  forwardRef,
  type ReactElement,
  type MouseEvent,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import { CDCloseIcon } from "../icon";
import type { CDTagProps } from "./types";

/**
 * CDTag / Tag / CDChip / Chip
 *
 * Compact label element used for categorization, filtering, and status tagging.
 */
export const CDTag = forwardRef<HTMLSpanElement, CDTagProps>(
  (
    {
      variant = "default",
      size = "md",
      closable = false,
      color,
      textColor,
      icon,
      round = false,
      bordered = true,
      checkable = false,
      checked: controlledChecked,
      onChange,
      onClose,
      onClick,
      disabled = false,
      className,
      style,
      children,
      ...rest
    }: CDTagProps,
    ref
  ): ReactElement | null => {
    const isControlled: boolean = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);

    const isChecked: boolean = isControlled
      ? Boolean(controlledChecked)
      : internalChecked;

    if (!visible) {
      return null;
    }

    const handleClick = (e: MouseEvent<HTMLSpanElement>): void => {
      if (disabled) return;
      if (checkable) {
        const nextChecked: boolean = !isChecked;
        if (!isControlled) {
          setInternalChecked(nextChecked);
        }
        onChange?.(nextChecked);
      }
      onClick?.(e);
    };

    const handleClose = (e: MouseEvent<HTMLSpanElement>): void => {
      e.stopPropagation();
      if (disabled) return;
      setVisible(false);
      onClose?.(e);
    };

    // Custom color style handling
    const customStyle: CSSProperties = { ...style };
    if (color) {
      if (color.startsWith("#") || color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("var(")) {
        customStyle.backgroundColor = `color-mix(in srgb, ${color} 15%, transparent)`;
        customStyle.borderColor = `color-mix(in srgb, ${color} 40%, transparent)`;
        customStyle.color = textColor || color;
      }
    }

    return (
      <span
        ref={ref}
        role={checkable ? "checkbox" : undefined}
        aria-checked={checkable ? isChecked : undefined}
        aria-disabled={disabled ? true : undefined}
        onClick={handleClick}
        style={customStyle}
        className={cn(
          "cinder-tag",
          `cinder-tag-${variant}`,
          `cinder-tag-${size}`,
          round && "cinder-tag-round",
          bordered && "cinder-tag-bordered",
          checkable && "cinder-tag-checkable",
          isChecked && "cinder-tag-checked",
          disabled && "cinder-tag-disabled",
          color && "cinder-tag-custom-color",
          className
        )}
        {...rest}
      >
        {icon && <span className="cinder-tag-icon">{icon}</span>}
        <span className="cinder-tag-content">{children}</span>
        {closable && !disabled && (
          <button
            type="button"
            className="cinder-tag-close-btn"
            onClick={handleClose}
            aria-label="Remove tag"
          >
            <CDCloseIcon size={size === "sm" ? 10 : 12} />
          </button>
        )}
      </span>
    );
  }
);

CDTag.displayName = "CDTag";

// Backward-compatible aliases
export const Tag = CDTag;
export const CDChip = CDTag;
export const Chip = CDTag;
