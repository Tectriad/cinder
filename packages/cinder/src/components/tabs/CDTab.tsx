import { forwardRef, type ReactElement, type MouseEvent } from "react";
import { CDCloseIcon } from "../icon";
import { cn } from "../../utils/cn";
import { useTabsContext } from "./TabsContext";
import type { CDTabProps } from "./types";

export const CDTab = forwardRef<HTMLButtonElement, CDTabProps>(
  (
    {
      value,
      disabled = false,
      icon,
      badge,
      closable = false,
      onClose,
      children,
      className,
      onClick,
      ...restProps
    }: CDTabProps,
    ref
  ): ReactElement => {
    const { activeKey, setActiveKey, variant, size, onClose: contextClose } = useTabsContext();
    const isSelected: boolean = activeKey === value;

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
      if (disabled) return;
      setActiveKey(value);
      if (onClick) {
        onClick(event);
      }
    };

    const handleClose = (event: MouseEvent<HTMLSpanElement>): void => {
      event.stopPropagation();
      if (onClose) {
        onClose(value);
      } else if (contextClose) {
        contextClose(value);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`cinder-tab-${value}`}
        aria-controls={`cinder-tabpanel-${value}`}
        aria-selected={isSelected}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "cinder-tab",
          `cinder-tab-${variant}`,
          `cinder-tab-${size}`,
          isSelected && "cinder-tab-active",
          disabled && "cinder-tab-disabled",
          className
        )}
        {...restProps}
      >
        {icon && <span className="cinder-tab-icon">{icon}</span>}
        <span className="cinder-tab-label">{children}</span>
        {badge && <span className="cinder-tab-badge">{badge}</span>}
        {closable && (
          <span
            className="cinder-tab-close"
            role="button"
            tabIndex={-1}
            aria-label={`Close tab ${value}`}
            onClick={handleClose}
          >
            <CDCloseIcon size={12} />
          </span>
        )}
      </button>
    );
  }
);

CDTab.displayName = "CDTab";

export const Tab = CDTab;
