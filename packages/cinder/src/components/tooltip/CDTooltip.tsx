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
import type { CDTooltipProps, CDTooltipPlacement, CDTooltipTrigger } from "./types";

interface Coords {
  top: number;
  left: number;
  effectivePlacement: CDTooltipPlacement;
}

/**
 * CDTooltip
 *
 * Lightweight contextual hint balloon anchored to any trigger element,
 * rendered into a portal with automatic collision detection and edge auto-flipping.
 */
export function CDTooltip({
  title,
  placement = "top",
  trigger = "hover",
  arrow = true,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
  color,
  children,
  className,
  style,
}: CDTooltipProps): ReactElement {
  const isControlled: boolean = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const isOpen: boolean = isControlled ? Boolean(controlledOpen) : internalOpen;

  const [coords, setCoords] = useState<Coords>({
    top: 0,
    left: 0,
    effectivePlacement: placement,
  });

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    let effectivePlacement: CDTooltipPlacement = placement;

    // Smart vertical collision auto-flip
    if (placement === "top" && rect.top < 45) {
      effectivePlacement = "bottom";
    } else if (placement === "bottom" && window.innerHeight - rect.bottom < 45) {
      effectivePlacement = "top";
    }

    let top = 0;
    let left = 0;

    switch (effectivePlacement) {
      case "bottom":
        top = rect.bottom + scrollY + 8;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case "left":
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - 8;
        break;
      case "right":
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + 8;
        break;
      case "top":
      default:
        top = rect.top + scrollY - 8;
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

  const triggerList: CDTooltipTrigger[] = Array.isArray(trigger) ? trigger : [trigger];
  const isHover = triggerList.includes("hover");
  const isFocus = triggerList.includes("focus");
  const isClick = triggerList.includes("click");

  const handleMouseEnter = (): void => {
    if (!isHover) return;
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    enterTimerRef.current = setTimeout(() => {
      setOpen(true);
    }, mouseEnterDelay);
  };

  const handleMouseLeave = (): void => {
    if (!isHover) return;
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, mouseLeaveDelay);
  };

  const handleFocus = (_e: FocusEvent): void => {
    if (isFocus) setOpen(true);
  };

  const handleBlur = (_e: FocusEvent): void => {
    if (isFocus) setOpen(false);
  };

  const handleClick = (e: MouseEvent): void => {
    if (isClick) {
      e.stopPropagation();
      setOpen(!isOpen);
    }
  };

  // Clone child trigger to attach ref and interaction listeners
  let triggerElement: ReactElement = children;
  if (isValidElement(children)) {
    triggerElement = cloneElement(children as ReactElement<{
      ref?: unknown;
      onMouseEnter?: unknown;
      onMouseLeave?: unknown;
      onFocus?: unknown;
      onBlur?: unknown;
      onClick?: unknown;
    }>, {
      ref: triggerRef,
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
      onClick: (e: MouseEvent) => {
        (children.props as { onClick?: (e: MouseEvent) => void })?.onClick?.(e);
        handleClick(e);
      },
    });
  }

  const tooltipStyle: CSSProperties = {
    ...style,
    top: `${coords.top}px`,
    left: `${coords.left}px`,
    ...(color ? { backgroundColor: color } : {}),
  };

  const renderTooltip = (): ReactElement | null => {
    if (!isOpen || !title || typeof document === "undefined") {
      return null;
    }

    return createPortal(
      <div
        ref={tooltipRef}
        role="tooltip"
        className={cn(
          "cinder-tooltip",
          `cinder-tooltip-placement-${coords.effectivePlacement}`,
          className,
        )}
        style={tooltipStyle}
      >
        <div className="cinder-tooltip-inner">{title}</div>
        {arrow && (
          <span
            className="cinder-tooltip-arrow"
            style={color ? { borderTopColor: color } : undefined}
          />
        )}
      </div>,
      document.body,
    );
  };

  return (
    <>
      {triggerElement}
      {renderTooltip()}
    </>
  );
}

CDTooltip.displayName = "CDTooltip";

// Backward-compatible alias
export const Tooltip = CDTooltip;
