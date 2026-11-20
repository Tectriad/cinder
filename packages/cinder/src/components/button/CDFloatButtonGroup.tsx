import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ReactElement,
  type MouseEvent as ReactMouseEvent,
  type CSSProperties,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { cn } from "../../utils/cn";
import { CDPlusIcon } from "../icon";
import type {
  CDFloatButtonGroupProps,
  CDFloatActionItem,
  CDFloatButtonPosition,
} from "./types";

export const CDFloatButtonGroup = forwardRef<HTMLDivElement, CDFloatButtonGroupProps>(
  (
    {
      children,
      actions,
      icon,
      closeIcon,
      trigger = "click",
      shape = "circle",
      size = "md",
      position = "bottom-right",
      offset,
      direction = "up",
      fixed = true,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      className,
      style,
    }: CDFloatButtonGroupProps,
    ref
  ): ReactElement => {
    const isControlled: boolean = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isOpen: boolean = isControlled ? Boolean(controlledOpen) : internalOpen;

    const setOpen = (nextOpen: boolean): void => {
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isClickTrigger: boolean = trigger === "click";
    const isHoverTrigger: boolean = trigger === "hover";

    // Outside click listener
    useEffect(() => {
      if (!isOpen) return;

      const handleOutsideClick = (e: globalThis.MouseEvent): void => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [isOpen]);

    const handleTriggerClick = (e: ReactMouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      if (isClickTrigger) {
        setOpen(!isOpen);
      }
    };

    const handleMouseEnter = (): void => {
      if (!isHoverTrigger) return;
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      setOpen(true);
    };

    const handleMouseLeave = (): void => {
      if (!isHoverTrigger) return;
      hoverTimerRef.current = setTimeout(() => {
        setOpen(false);
      }, 150);
    };

    const handleActionClick = (
      action: CDFloatActionItem,
      e: ReactMouseEvent<HTMLButtonElement>
    ): void => {
      if (action.disabled) return;
      action.onClick?.(e);
      setOpen(false);
    };

    const positionClass: string = {
      "bottom-right": "cinder-float-pos-bottom-right",
      "bottom-left": "cinder-float-pos-bottom-left",
      "top-right": "cinder-float-pos-top-right",
      "top-left": "cinder-float-pos-top-left",
    }[position as CDFloatButtonPosition] || "cinder-float-pos-bottom-right";

    const directionClass: string = `cinder-float-dir-${direction}`;

    const wrapperStyle: CSSProperties = {
      ...style,
      ...(offset?.top !== undefined ? { top: offset.top } : {}),
      ...(offset?.bottom !== undefined ? { bottom: offset.bottom } : {}),
      ...(offset?.left !== undefined ? { left: offset.left } : {}),
      ...(offset?.right !== undefined ? { right: offset.right } : {}),
    };

    const shapeClass: string = `cinder-float-shape-${shape}`;
    const sizeClass: string = `cinder-float-size-${size}`;

    return (
      <div
        ref={containerRef}
        className={cn(
          "cinder-float-wrapper",
          !fixed && "cinder-float-wrapper-absolute",
          positionClass,
          directionClass,
          className
        )}
        style={wrapperStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Expanded child action buttons */}
        {isOpen && (
          <div className="cinder-float-actions">
            {actions &&
              actions.map((action: CDFloatActionItem, idx: number) => (
                <div
                  key={action.key || `action-${idx}`}
                  className="cinder-float-action-item"
                >
                  {action.label && (
                    <span className="cinder-float-action-label">
                      {action.label}
                    </span>
                  )}
                  <button
                    type="button"
                    disabled={action.disabled}
                    title={action.tooltip}
                    onClick={(e) => handleActionClick(action, e)}
                    className={cn(
                      "cinder-float-btn",
                      shapeClass,
                      sizeClass,
                      action.danger && "cinder-btn-danger"
                    )}
                  >
                    {action.icon}
                  </button>
                </div>
              ))}

            {children &&
              Children.map(children, (child) => {
                if (!isValidElement(child)) return null;
                return (
                  <div className="cinder-float-action-item">
                    {cloneElement(child as ReactElement<any>, {
                      shape,
                      size,
                      fixed: false,
                    })}
                  </div>
                );
              })}
          </div>
        )}

        {/* Primary Trigger Button */}
        <button
          ref={ref as any}
          type="button"
          onClick={handleTriggerClick}
          aria-expanded={isOpen}
          aria-label="Floating action menu"
          className={cn(
            "cinder-float-btn",
            "cinder-float-btn-primary",
            shapeClass,
            sizeClass
          )}
        >
          <span
            className={cn(
              "cinder-float-trigger-icon",
              isOpen && !closeIcon && "cinder-float-trigger-icon-rotated"
            )}
          >
            {isOpen && closeIcon ? closeIcon : icon || <CDPlusIcon size="md" />}
          </span>
        </button>
      </div>
    );
  }
);

CDFloatButtonGroup.displayName = "CDFloatButtonGroup";
export const FloatButtonGroup = CDFloatButtonGroup;
export const FloatingActions = CDFloatButtonGroup;
