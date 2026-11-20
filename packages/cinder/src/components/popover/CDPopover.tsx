import {
  useState,
  useRef,
  useEffect,
  cloneElement,
  isValidElement,
  type ReactElement,
  type MouseEvent,
  type FocusEvent,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import type { CDPopoverProps, CDPopoverPlacement, CDPopoverTrigger } from "./types";

interface PopoverCoords {
  top: number;
  left: number;
  effectivePlacement: CDPopoverPlacement;
}

/**
 * CDPopover
 *
 * Floating card containing rich interactive content, controls, or metadata,
 * anchored to a trigger and rendered into a portal.
 */
export function CDPopover({
  title,
  content,
  placement = "top",
  trigger = "click",
  arrow = true,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  style,
}: CDPopoverProps): ReactElement {
  const isControlled: boolean = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const isOpen: boolean = isControlled ? Boolean(controlledOpen) : internalOpen;

  const [coords, setCoords] = useState<PopoverCoords>({
    top: 0,
    left: 0,
    effectivePlacement: placement,
  });

  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const setOpen = (nextOpen: boolean): void => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const calculatePosition = (): void => {
    if (!triggerRef.current || typeof window === "undefined") return;

    const rect: DOMRect = triggerRef.current.getBoundingClientRect();
    const scrollX: number = window.scrollX || window.pageXOffset;
    const scrollY: number = window.scrollY || window.pageYOffset;

    let effectivePlacement: CDPopoverPlacement = placement;

    // Smart vertical collision auto-flip
    if (placement === "top" && rect.top < 120) {
      effectivePlacement = "bottom";
    } else if (placement === "bottom" && window.innerHeight - rect.bottom < 120) {
      effectivePlacement = "top";
    }

    let top = 0;
    let left = 0;

    switch (effectivePlacement) {
      case "bottom":
        top = rect.bottom + scrollY + 10;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case "left":
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - 10;
        break;
      case "right":
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + 10;
        break;
      case "top":
      default:
        top = rect.top + scrollY - 10;
        left = rect.left + scrollX + rect.width / 2;
        break;
    }

    setCoords({ top, left, effectivePlacement });
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      const handleResize = (): void => calculatePosition();
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleResize, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleResize, true);
      };
    }
  }, [isOpen, placement]);

  // Click outside to dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: globalThis.MouseEvent | TouchEvent): void => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const triggerList: CDPopoverTrigger[] = Array.isArray(trigger) ? trigger : [trigger];
  const isClick = triggerList.includes("click");
  const isHover = triggerList.includes("hover");
  const isFocus = triggerList.includes("focus");

  const handleClick = (e: MouseEvent): void => {
    if (isClick) {
      e.stopPropagation();
      setOpen(!isOpen);
    }
  };

  const handleMouseEnter = (): void => {
    if (isHover) setOpen(true);
  };

  const handleMouseLeave = (): void => {
    if (isHover) setOpen(false);
  };

  const handleFocus = (_e: FocusEvent): void => {
    if (isFocus) setOpen(true);
  };

  const handleBlur = (_e: FocusEvent): void => {
    if (isFocus) setOpen(false);
  };

  // Clone child trigger to attach ref and interaction listeners
  let triggerElement: ReactElement = children;
  if (isValidElement(children)) {
    triggerElement = cloneElement(children as ReactElement<{
      ref?: unknown;
      onClick?: unknown;
      onMouseEnter?: unknown;
      onMouseLeave?: unknown;
      onFocus?: unknown;
      onBlur?: unknown;
    }>, {
      ref: triggerRef,
      onClick: (e: MouseEvent) => {
        (children.props as { onClick?: (e: MouseEvent) => void })?.onClick?.(e);
        handleClick(e);
      },
      onMouseEnter: (e: MouseEvent) => {
        (children.props as { onMouseEnter?: (e: MouseEvent) => void })?.onMouseEnter?.(e);
        handleMouseEnter();
      },
      onMouseLeave: (e: MouseEvent) => {
        (children.props as { onMouseLeave?: (e: MouseEvent) => void })?.onMouseLeave?.(e);
        handleMouseLeave();
      },
      onFocus: (e: FocusEvent) => {
        (children.props as { onFocus?: (e: FocusEvent) => void })?.onFocus?.(e);
        handleFocus(e);
      },
      onBlur: (e: FocusEvent) => {
        (children.props as { onBlur?: (e: FocusEvent) => void })?.onBlur?.(e);
        handleBlur(e);
      },
    });
  }

  const popoverStyle: CSSProperties = {
    ...style,
    top: `${coords.top}px`,
    left: `${coords.left}px`,
  };

  const renderPopover = (): ReactElement | null => {
    if (!isOpen || typeof document === "undefined") {
      return null;
    }

    return createPortal(
      <div
        ref={popoverRef}
        role="dialog"
        className={cn(
          "cinder-popover",
          `cinder-popover-placement-${coords.effectivePlacement}`,
          className,
        )}
        style={popoverStyle}
      >
        <div className="cinder-popover-inner">
          {title && <div className="cinder-popover-title">{title}</div>}
          <div className="cinder-popover-content">{content}</div>
        </div>
        {arrow && <span className="cinder-popover-arrow" />}
      </div>,
      document.body,
    );
  };

  return (
    <>
      {triggerElement}
      {renderPopover()}
    </>
  );
}

CDPopover.displayName = "CDPopover";

// Backward-compatible alias
export const Popover = CDPopover;
