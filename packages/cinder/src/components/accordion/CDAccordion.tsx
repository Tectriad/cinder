import {
  useState,
  Children,
  cloneElement,
  isValidElement,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDAccordionProps,
  CDAccordionItemProps,
  CDAccordionKey,
  CDAccordionItemConfig,
} from "./types";

/**
 * Chevron vector icon for accordion expand/collapse indicator.
 */
function AccordionChevron({ size = 16 }: { size?: number }): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/**
 * CDAccordionItem / AccordionItem
 */
export const CDAccordionItem = forwardRef<HTMLDivElement, CDAccordionItemProps>(
  (
    {
      title,
      subtitle,
      extra,
      children,
      content,
      disabled = false,
      isOpen = false,
      onToggle,
      className,
      style,
      ...rest
    }: CDAccordionItemProps,
    ref
  ): ReactElement => {
    const handleHeaderClick = (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      if (disabled) return;
      onToggle?.();
    };

    const panelContent: ReactNode = children !== undefined ? children : content;

    return (
      <div
        ref={ref}
        className={cn(
          "cinder-accordion-item",
          isOpen && "cinder-accordion-item-open",
          disabled && "cinder-accordion-item-disabled",
          className
        )}
        style={style}
        {...rest}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={handleHeaderClick}
          aria-expanded={isOpen}
          className="cinder-accordion-header"
        >
          <div className="cinder-accordion-header-left">
            <span
              className={cn(
                "cinder-accordion-arrow",
                isOpen && "cinder-accordion-arrow-expanded"
              )}
            >
              <AccordionChevron size={14} />
            </span>
            <div className="cinder-accordion-titles">
              <span className="cinder-accordion-title">{title}</span>
              {subtitle && (
                <span className="cinder-accordion-subtitle">{subtitle}</span>
              )}
            </div>
          </div>

          {extra && <div className="cinder-accordion-extra">{extra}</div>}
        </button>

        <div
          className={cn(
            "cinder-accordion-collapse",
            isOpen && "cinder-accordion-collapse-expanded"
          )}
          role="region"
        >
          <div className="cinder-accordion-body">{panelContent}</div>
        </div>
      </div>
    );
  }
);
CDAccordionItem.displayName = "CDAccordionItem";

/**
 * CDAccordion / Accordion / CDCollapse / Collapse
 *
 * Horizontally stacked collapsible panels to optimize content density.
 */
export const CDAccordionBase = forwardRef<HTMLDivElement, CDAccordionProps>(
  (
    {
      items,
      activeKeys: controlledKeys,
      defaultActiveKeys = [],
      accordion = false,
      variant = "surface",
      onChange,
      children,
      className,
      style,
      ...rest
    }: CDAccordionProps,
    ref
  ): ReactElement => {
    const isControlled: boolean = controlledKeys !== undefined;
    const [internalKeys, setInternalKeys] = useState<CDAccordionKey[]>(defaultActiveKeys);

    const activeList: CDAccordionKey[] = isControlled
      ? controlledKeys || []
      : internalKeys;

    const handleToggleKey = (key: CDAccordionKey): void => {
      let nextKeys: CDAccordionKey[];
      const isCurrentlyOpen: boolean = activeList.includes(key);

      if (accordion) {
        // Only one item open at a time
        nextKeys = isCurrentlyOpen ? [] : [key];
      } else {
        // Multiple items can be open
        nextKeys = isCurrentlyOpen
          ? activeList.filter((k: CDAccordionKey) => k !== key)
          : [...activeList, key];
      }

      if (!isControlled) {
        setInternalKeys(nextKeys);
      }
      onChange?.(nextKeys);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "cinder-accordion",
          `cinder-accordion-${variant}`,
          className
        )}
        style={style}
        {...rest}
      >
        {items && items.length > 0
          ? items.map((item: CDAccordionItemConfig) => {
              const isOpen: boolean = activeList.includes(item.key);
              return (
                <CDAccordionItem
                  {...item}
                  key={item.key}
                  isOpen={isOpen}
                  onToggle={(): void => handleToggleKey(item.key)}
                />
              );
            })
          : Children.map(children, (child, idx: number) => {
              if (isValidElement<CDAccordionItemProps>(child)) {
                const itemKey: CDAccordionKey = child.props.key ?? child.key ?? idx;
                const isOpen: boolean = activeList.includes(itemKey);
                return cloneElement(child, {
                  key: itemKey,
                  isOpen,
                  onToggle: (): void => handleToggleKey(itemKey),
                });
              }
              return child;
            })}
      </div>
    );
  }
);

CDAccordionBase.displayName = "CDAccordion";

export const CDAccordion = Object.assign(CDAccordionBase, {
  Item: CDAccordionItem,
});

// Backward-compatible aliases
export const Accordion = CDAccordion;
export const AccordionItem = CDAccordionItem;
export const CDCollapse = CDAccordion;
export const Collapse = CDAccordion;
