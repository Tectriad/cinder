import {
  forwardRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
  Fragment,
  type ReactElement,
  type ReactNode,
} from "react";
import { CDChevronRightIcon } from "../icon";
import { cn } from "../../utils/cn";
import { CDBreadcrumbItem } from "./CDBreadcrumbItem";
import type { CDBreadcrumbProps, CDBreadcrumbItemData, CDBreadcrumbItemProps } from "./types";

export const CDBreadcrumb = forwardRef<HTMLElement, CDBreadcrumbProps>(
  (
    {
      separator = <CDChevronRightIcon size={12} />,
      maxItems,
      items,
      children,
      className,
      ...restProps
    }: CDBreadcrumbProps,
    ref
  ): ReactElement => {
    const [expanded, setExpanded] = useState<boolean>(false);

    let renderedChildren: ReactNode = null;

    if (items && items.length > 0) {
      let displayItems: CDBreadcrumbItemData[] = items;
      let hasCollapsed: boolean = false;

      if (maxItems && items.length > maxItems && !expanded) {
        hasCollapsed = true;
        // Keep first item and last (maxItems - 1) items
        const firstItem: CDBreadcrumbItemData = items[0];
        const lastItems: CDBreadcrumbItemData[] = items.slice(-(maxItems - 1));
        displayItems = [firstItem, ...lastItems];
      }

      renderedChildren = (
        <>
          {displayItems.map((item: CDBreadcrumbItemData, index: number) => {
            const isLast: boolean = index === displayItems.length - 1;
            const isAfterFirstCollapsed: boolean = hasCollapsed && index === 1;

            return (
              <Fragment key={item.key || index}>
                {isAfterFirstCollapsed && (
                  <li className="cinder-breadcrumb-item">
                    <button
                      type="button"
                      className="cinder-breadcrumb-ellipsis"
                      onClick={() => setExpanded(true)}
                      aria-label="Show all breadcrumbs"
                      title="Show all breadcrumbs"
                    >
                      ...
                    </button>
                    <span className="cinder-breadcrumb-separator" aria-hidden="true">
                      {separator}
                    </span>
                  </li>
                )}
                <CDBreadcrumbItem
                  href={item.href}
                  icon={item.icon}
                  active={isLast}
                  separator={isLast ? null : separator}
                  onClick={item.onClick}
                >
                  {item.title}
                </CDBreadcrumbItem>
              </Fragment>
            );
          })}
        </>
      );
    } else {
      const childArray = Children.toArray(children).filter(isValidElement);
      renderedChildren = childArray.map((child, index: number) => {
        const isLast: boolean = index === childArray.length - 1;
        return cloneElement(child as ReactElement<CDBreadcrumbItemProps>, {
          separator: isLast ? null : separator,
        });
      });
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("cinder-breadcrumb", className)}
        {...restProps}
      >
        <ol className="cinder-breadcrumb-list">{renderedChildren}</ol>
      </nav>
    );
  }
);

CDBreadcrumb.displayName = "CDBreadcrumb";

export const Breadcrumb = CDBreadcrumb;
export const CDBreadcrumbs = CDBreadcrumb;
export const Breadcrumbs = CDBreadcrumb;
