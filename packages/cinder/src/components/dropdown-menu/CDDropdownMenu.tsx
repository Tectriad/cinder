import {
  useState,
  useRef,
  useEffect,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { CDCheckIcon } from "../icon";
import type {
  CDDropdownMenuProps,
  CDDropdownMenuItem,
  CDDropdownMenuPlacement,
} from "./types";

interface MenuCoords {
  top: number;
  left: number;
  minWidth: number;
  effectivePlacement: CDDropdownMenuPlacement;
}

/**
 * CDDropdownMenu
 *
 * Floating action menu presenting a list of contextual options, navigation links,
 * and keyboard shortcut triggers, rendered into a body portal.
 */
export function CDDropdownMenuBase({
  items,
  placement = "bottom-left",
  trigger = "click",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnSelect = true,
  children,
  className,
  style,
}: CDDropdownMenuProps): ReactElement {
  const isControlled: boolean = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const isOpen: boolean = isControlled ? Boolean(controlledOpen) : internalOpen;

  const [coords, setCoords] = useState<MenuCoords>({
    top: 0,
    left: 0,
    minWidth: 160,
    effectivePlacement: placement,
  });

  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

    let effectivePlacement: CDDropdownMenuPlacement = placement;

    // Smart vertical collision auto-flip
    if (placement.startsWith("bottom") && window.innerHeight - rect.bottom < 180) {
      effectivePlacement = placement.replace("bottom", "top") as CDDropdownMenuPlacement;
    } else if (placement.startsWith("top") && rect.top < 180) {
      effectivePlacement = placement.replace("top", "bottom") as CDDropdownMenuPlacement;
    }

    let top = 0;
    let left = rect.left + scrollX;

    if (effectivePlacement.includes("right")) {
      left = rect.right + scrollX;
    }

    if (effectivePlacement.startsWith("bottom")) {
      top = rect.bottom + scrollY + 4;
    } else {
      top = rect.top + scrollY - 4;
    }

    setCoords({
      top,
      left,
      minWidth: Math.max(160, rect.width),
      effectivePlacement,
    });
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
        menuRef.current &&
        !menuRef.current.contains(target)
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

  const handleClick = (e: MouseEvent): void => {
    if (trigger === "click") {
      e.stopPropagation();
      setOpen(!isOpen);
    }
  };

  const handleMouseEnter = (): void => {
    if (trigger === "hover") setOpen(true);
  };

  const handleMouseLeave = (): void => {
    if (trigger === "hover") setOpen(false);
  };

  const handleItemClick = (
    item: CDDropdownMenuItem,
    e: MouseEvent<HTMLButtonElement>,
  ): void => {
    if (item.disabled) return;
    item.onClick?.(e);
    if (closeOnSelect) {
      setOpen(false);
    }
  };

  // Clone child trigger to attach ref and interaction listeners
  let triggerElement: ReactElement = children;
  if (isValidElement(children)) {
    triggerElement = cloneElement(children as ReactElement<{
      ref?: unknown;
      onClick?: unknown;
      onMouseEnter?: unknown;
      onMouseLeave?: unknown;
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
    });
  }

  const menuStyle: CSSProperties = {
    ...style,
    top: `${coords.top}px`,
    left: `${coords.left}px`,
    minWidth: `${coords.minWidth}px`,
  };

  const renderMenu = (): ReactElement | null => {
    if (!isOpen || typeof document === "undefined") {
      return null;
    }

    return createPortal(
      <div
        ref={menuRef}
        role="menu"
        aria-orientation="vertical"
        className={cn(
          "cinder-dropdown-menu-overlay",
          `cinder-dropdown-menu-placement-${coords.effectivePlacement}`,
          className,
        )}
        style={menuStyle}
      >
        {items &&
          items.map((item: CDDropdownMenuItem, idx: number) => {
            const itemKey = item.key ?? `item-${idx}`;

            if (item.groupTitle) {
              return (
                <div key={itemKey} className="cinder-dropdown-menu-label">
                  {item.groupTitle}
                </div>
              );
            }

            const isDivided: boolean = Boolean(item.divided || item.divider);
            const shortcutTag = item.shortcut ?? item.extra;

            return (
              <div key={itemKey} className="cinder-dropdown-menu-item-wrapper">
                {isDivided && <div className="cinder-dropdown-menu-divider" />}
                {item.label && (
                  <button
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={(e: MouseEvent<HTMLButtonElement>): void => handleItemClick(item, e)}
                    className={cn(
                      "cinder-dropdown-menu-item",
                      item.disabled && "cinder-dropdown-menu-item-disabled",
                      item.danger && "cinder-dropdown-menu-item-danger",
                      item.checked && "cinder-dropdown-menu-item-checked",
                    )}
                  >
                    {item.checked !== undefined && (
                      <span className="cinder-dropdown-menu-item-check">
                        {item.checked && <CDCheckIcon size={14} />}
                      </span>
                    )}
                    {item.icon && (
                      <span className="cinder-dropdown-menu-item-icon">{item.icon}</span>
                    )}
                    <span className="cinder-dropdown-menu-item-label">{item.label}</span>
                    {shortcutTag && (
                      <span className="cinder-dropdown-menu-item-shortcut">{shortcutTag}</span>
                    )}
                  </button>
                )}
              </div>
            );
          })}
      </div>,
      document.body,
    );
  };

  return (
    <>
      {triggerElement}
      {renderMenu()}
    </>
  );
}

CDDropdownMenuBase.displayName = "CDDropdownMenu";

export const CDDropdownMenu = Object.assign(CDDropdownMenuBase, {
  Item: ({
    children,
    disabled = false,
    danger = false,
    onClick,
    className,
  }: {
    children: ReactNode;
    disabled?: boolean;
    danger?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
  }): ReactElement => (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "cinder-dropdown-menu-item",
        disabled && "cinder-dropdown-menu-item-disabled",
        danger && "cinder-dropdown-menu-item-danger",
        className,
      )}
    >
      {children}
    </button>
  ),
  Separator: ({ className }: { className?: string }): ReactElement => (
    <div className={cn("cinder-dropdown-menu-divider", className)} role="separator" />
  ),
  Label: ({ children, className }: { children: ReactNode; className?: string }): ReactElement => (
    <div className={cn("cinder-dropdown-menu-label", className)}>{children}</div>
  ),
});

// Backward-compatible alias
export const DropdownMenu = CDDropdownMenu;
