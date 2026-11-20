import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ReactElement,
  type MouseEvent,
  cloneElement,
  isValidElement,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDDropdownProps,
  CDDropdownTrigger,
  CDDropdownPlacement,
} from "./types";
import type { CDDropdownMenuItem } from "../dropdown-menu/types";

export const CDDropdown = forwardRef<HTMLDivElement, CDDropdownProps>(
  (
    {
      children,
      menu,
      overlay,
      trigger = "click",
      placement = "bottomLeft",
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      closeOnSelect = true,
      className,
      overlayClassName,
    }: CDDropdownProps,
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
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const triggerList: CDDropdownTrigger[] = Array.isArray(trigger)
      ? trigger
      : [trigger];
    const isClickTrigger: boolean = triggerList.includes("click");
    const isHoverTrigger: boolean = triggerList.includes("hover");

    // Outside click & Escape listener
    useEffect(() => {
      if (!isOpen) return;

      const handleOutsideClick = (e: globalThis.MouseEvent | TouchEvent): void => {
        const target = e.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target)
        ) {
          setOpen(false);
        }
      };

      const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick, true);
      document.addEventListener("touchstart", handleOutsideClick, true);
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick, true);
        document.removeEventListener("touchstart", handleOutsideClick, true);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    // Cleanup hover timer on unmount
    useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      };
    }, []);

    const handleTriggerClick = (e: MouseEvent): void => {
      e.stopPropagation();
      if (!disabled && isClickTrigger) {
        setOpen(!isOpen);
      }
    };

    const handleMouseEnter = (): void => {
      if (disabled || !isHoverTrigger) return;
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setOpen(true);
    };

    const handleMouseLeave = (): void => {
      if (disabled || !isHoverTrigger) return;
      hoverTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 150);
    };

    const handleItemClick = (item: CDDropdownMenuItem, e: MouseEvent): void => {
      e.stopPropagation();
      if (item.disabled) return;
      item.onClick?.();
      if (closeOnSelect) {
        setOpen(false);
      }
    };

    // Render overlay content
    const renderOverlayContent = (): ReactElement | null => {
      if (overlay) {
        return <>{overlay}</>;
      }

      if (menu && menu.items && menu.items.length > 0) {
        return (
          <>
            {menu.items.map((item: CDDropdownMenuItem, idx: number) => {
              if (item.divider) {
                return (
                  <div
                    key={`divider-${idx}`}
                    className="cinder-dropdown-divider"
                  />
                );
              }

              if (item.groupTitle) {
                return (
                  <div
                    key={`group-${idx}`}
                    className="cinder-dropdown-group-title"
                  >
                    {item.groupTitle}
                  </div>
                );
              }

              return (
                <button
                  key={item.key || `item-${idx}`}
                  type="button"
                  disabled={item.disabled}
                  className={cn(
                    "cinder-dropdown-item",
                    item.danger && "cinder-dropdown-item-danger",
                    item.disabled && "cinder-dropdown-item-disabled"
                  )}
                  onClick={(e) => handleItemClick(item, e)}
                >
                  {item.icon && (
                    <span className="cinder-dropdown-item-icon">
                      {item.icon}
                    </span>
                  )}
                  <span className="cinder-dropdown-item-label">
                    {item.label}
                  </span>
                  {item.extra && (
                    <span className="cinder-dropdown-item-extra">
                      {item.extra}
                    </span>
                  )}
                </button>
              );
            })}
          </>
        );
      }

      return null;
    };

    const placementClass: string = {
      bottomLeft: "cinder-dropdown-placement-bottomLeft",
      bottomRight: "cinder-dropdown-placement-bottomRight",
      bottomCenter: "cinder-dropdown-placement-bottomCenter",
      topLeft: "cinder-dropdown-placement-topLeft",
      topRight: "cinder-dropdown-placement-topRight",
      topCenter: "cinder-dropdown-placement-topCenter",
    }[placement as CDDropdownPlacement] || "cinder-dropdown-placement-bottomLeft";

    return (
      <div
        ref={containerRef}
        className={cn("cinder-dropdown-trigger-wrapper", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={ref}
          onClick={handleTriggerClick}
          style={{ display: "inline-flex" }}
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          {isValidElement(children)
            ? cloneElement(children as ReactElement<any>, {
                "aria-expanded": isOpen,
              })
            : children}
        </div>

        {isOpen && !disabled && (
          <div
            className={cn(
              "cinder-dropdown-overlay",
              placementClass,
              overlayClassName
            )}
            onClick={(e) => e.stopPropagation()}
            role="menu"
          >
            {renderOverlayContent()}
          </div>
        )}
      </div>
    );
  }
);

CDDropdown.displayName = "CDDropdown";
export const Dropdown = CDDropdown;
