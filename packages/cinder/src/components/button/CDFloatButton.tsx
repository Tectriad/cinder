import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ReactElement,
  type MouseEvent as ReactMouseEvent,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDFloatButtonProps,
  CDFloatActionItem,
  CDFloatButtonPosition,
} from "./types";

export const CDFloatButton = forwardRef<HTMLButtonElement, CDFloatButtonProps>(
  (
    {
      icon,
      description,
      tooltip,
      shape = "circle",
      size = "md",
      position = "bottom-right",
      offset,
      fixed = true,
      variant,
      badge,
      actions,
      trigger = "click",
      direction = "up",
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      onClick,
      disabled = false,
      className,
      style,
      "aria-label": ariaLabel,
      ...rest
    }: CDFloatButtonProps,
    ref
  ): ReactElement => {
    const isControlled: boolean = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isOpen: boolean = isControlled ? Boolean(controlledOpen) : internalOpen;

    const setOpen = (nextOpen: boolean): void => {
      if (disabled) return;
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hasActions: boolean = Boolean(actions && actions.length > 0);
    const isClickTrigger: boolean = trigger === "click";
    const isHoverTrigger: boolean = trigger === "hover";

    // Outside click listener to close speed dial
    useEffect(() => {
      if (!isOpen || !hasActions) return;

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
    }, [isOpen, hasActions]);

    const handleMainClick = (e: ReactMouseEvent<HTMLButtonElement>): void => {
      onClick?.(e);
      if (hasActions && isClickTrigger) {
        setOpen(!isOpen);
      }
    };

    const handleMouseEnter = (): void => {
      if (disabled || !hasActions || !isHoverTrigger) return;
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      setOpen(true);
    };

    const handleMouseLeave = (): void => {
      if (disabled || !hasActions || !isHoverTrigger) return;
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

    // Position & custom offset styles
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
    const variantClass: string = variant ? `cinder-float-btn-${variant}` : "";

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
        {/* Child Speed Dial Actions */}
        {hasActions && isOpen && (
          <div className="cinder-float-actions">
            {actions?.map((action: CDFloatActionItem, idx: number) => {
              return (
                <div key={action.key || `action-${idx}`} className="cinder-float-action-item">
                  {action.label && (
                    <span className="cinder-float-action-label">{action.label}</span>
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
              );
            })}
          </div>
        )}

        {/* Main Floating Button */}
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          onClick={handleMainClick}
          title={tooltip}
          aria-label={ariaLabel || tooltip || "Floating action button"}
          aria-expanded={hasActions ? isOpen : undefined}
          className={cn(
            "cinder-float-btn",
            shapeClass,
            sizeClass,
            variantClass
          )}
          {...rest}
        >
          {/* Main Icon */}
          <span
            className={cn(
              "cinder-float-trigger-icon",
              hasActions && isOpen && "cinder-float-trigger-icon-rotated"
            )}
          >
            {icon}
          </span>

          {description && (
            <span style={{ fontSize: "10px", marginTop: "2px" }}>
              {description}
            </span>
          )}

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                "cinder-float-badge",
                badge.dot && "cinder-float-badge-dot"
              )}
              style={badge.color ? { backgroundColor: badge.color } : undefined}
            >
              {!badge.dot && badge.count !== undefined ? badge.count : null}
            </span>
          )}
        </button>
      </div>
    );
  }
);

CDFloatButton.displayName = "CDFloatButton";
export const FloatButton = CDFloatButton;
