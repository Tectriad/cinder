import { useState, useRef, useEffect, type ReactElement } from "react";
import { CDButton } from "./CDButton";
import { cn } from "../../utils/cn";
import type { CDButtonDropdownProps, CDDropdownItem } from "./types";

const ChevronDownIcon = (): ReactElement => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function CDButtonDropdown({
  label,
  items,
  variant = "primary",
  size = "md",
  isSplit = false,
  split,
  prefix,
  align = "left",
  onMainClick,
  customTheme,
  className,
  menuClassName,
}: CDButtonDropdownProps): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resolvedSplit: boolean = split !== undefined ? split : isSplit;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent): void {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside, true);
      document.addEventListener("touchstart", handleClickOutside, true);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = (): void => {
    setIsOpen((prev: boolean) => !prev);
  };

  const handleItemClick = (item: CDDropdownItem): void => {
    if (item.disabled || item.divider) return;
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("cinder-dropdown-wrapper", className)}
      style={{ display: "inline-block", position: "relative" }}
    >
      {resolvedSplit ? (
        <div className="cinder-btn-group cinder-btn-group-attached">
          <CDButton
            type="button"
            variant={variant}
            size={size}
            prefix={prefix}
            customTheme={customTheme}
            onClick={onMainClick}
            className="cinder-dropdown-main-btn"
          >
            {label}
          </CDButton>
          <CDButton
            type="button"
            variant={variant}
            size={size}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            customTheme={customTheme}
            onClick={toggleDropdown}
            className="cinder-dropdown-trigger-split"
            aria-label="Toggle Dropdown"
          >
            <span className={cn("cinder-dropdown-chevron", isOpen && "cinder-dropdown-chevron-open")}>
              <ChevronDownIcon />
            </span>
          </CDButton>
        </div>
      ) : (
        <CDButton
          type="button"
          variant={variant}
          size={size}
          prefix={prefix}
          customTheme={customTheme}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
          suffix={
            <span className={cn("cinder-dropdown-chevron", isOpen && "cinder-dropdown-chevron-open")}>
              <ChevronDownIcon />
            </span>
          }
        >
          {label}
        </CDButton>
      )}

      {isOpen && (
        <div
          role="menu"
          className={cn(
            "cinder-dropdown-menu",
            align === "right" ? "cinder-dropdown-menu-right" : "cinder-dropdown-menu-left",
            menuClassName
          )}
        >
          {items.map((item: CDDropdownItem, index: number) => {
            if (item.divider) {
              return (
                <div
                  key={item.key || `divider-${index}`}
                  className="cinder-dropdown-divider"
                  role="separator"
                />
              );
            }

            return (
              <button
                key={item.key || `item-${index}`}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "cinder-dropdown-item",
                  item.danger && "cinder-dropdown-item-danger",
                  item.disabled && "cinder-dropdown-item-disabled"
                )}
              >
                {item.icon && (
                  <span className="cinder-dropdown-item-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="cinder-dropdown-item-label">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const ButtonDropdown = CDButtonDropdown;
