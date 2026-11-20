import {
  forwardRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { CDSpinner } from "../spinner";
import type {
  CDListProps,
  CDListItemProps,
  CDListItemMetaProps,
} from "./types";

/**
 * CDListItemMeta / ListItemMeta
 */
export function CDListItemMeta({
  avatar,
  title,
  description,
  className,
  style,
}: CDListItemMetaProps): ReactElement {
  return (
    <div className={cn("cinder-list-item-meta", className)} style={style}>
      {avatar && <div className="cinder-list-item-meta-avatar">{avatar}</div>}
      <div className="cinder-list-item-meta-content">
        {title && <h4 className="cinder-list-item-meta-title">{title}</h4>}
        {description && (
          <div className="cinder-list-item-meta-desc">{description}</div>
        )}
      </div>
    </div>
  );
}
CDListItemMeta.displayName = "CDListItemMeta";

/**
 * CDListItem / ListItem
 */
export const CDListItemBase = forwardRef<HTMLDivElement, CDListItemProps>(
  (
    { actions, extra, className, style, children, ...rest }: CDListItemProps,
    ref
  ): ReactElement => {
    return (
      <div
        ref={ref}
        className={cn("cinder-list-item", className)}
        style={style}
        {...rest}
      >
        <div className="cinder-list-item-main">{children}</div>

        {actions && actions.length > 0 && (
          <ul className="cinder-list-item-actions">
            {actions.map((action: ReactNode, idx: number) => (
              <li key={`action-${idx}`} className="cinder-list-item-action">
                {action}
              </li>
            ))}
          </ul>
        )}

        {extra && <div className="cinder-list-item-extra">{extra}</div>}
      </div>
    );
  }
);
CDListItemBase.displayName = "CDListItemBase";

export const CDListItem = Object.assign(CDListItemBase, {
  Meta: CDListItemMeta,
});

/**
 * CDList / List
 *
 * Versatile list container for presenting rows of items, users, logs, or metrics.
 */
export const CDListBase = forwardRef<HTMLDivElement, CDListProps>(
  (
    {
      dataSource,
      renderItem,
      header,
      footer,
      bordered = true,
      split = true,
      size = "md",
      loading = false,
      emptyText = "No data available",
      grid,
      className,
      style,
      children,
      ...rest
    }: CDListProps,
    ref
  ): ReactElement => {
    const hasData: boolean = Boolean(
      (dataSource && dataSource.length > 0) || children
    );

    const renderGridItems = (): ReactNode => {
      if (!dataSource || !renderItem) return null;
      const columns = grid?.column || 3;
      const gutter = grid?.gutter || 16;

      return (
        <div
          className="cinder-list-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gutter}px`,
          }}
        >
          {dataSource.map((item, index) => (
            <div key={index} className="cinder-list-grid-col">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "cinder-list",
          `cinder-list-${size}`,
          bordered && "cinder-list-bordered",
          split && "cinder-list-split",
          loading && "cinder-list-loading",
          className
        )}
        style={style}
        {...rest}
      >
        {header && <div className="cinder-list-header">{header}</div>}

        <div className="cinder-list-container">
          {loading && (
            <div className="cinder-list-loading-mask">
              <CDSpinner size="md" />
            </div>
          )}

          {!hasData && !loading ? (
            <div className="cinder-list-empty">{emptyText}</div>
          ) : grid ? (
            renderGridItems()
          ) : dataSource && renderItem ? (
            dataSource.map((item, index) => renderItem(item, index))
          ) : (
            children
          )}
        </div>

        {footer && <div className="cinder-list-footer">{footer}</div>}
      </div>
    );
  }
);
CDListBase.displayName = "CDListBase";

export const CDList = Object.assign(CDListBase, {
  Item: CDListItem,
});

// Backward-compatible aliases
export const List = CDList;
export const ListItem = CDListItem;
export const ListItemMeta = CDListItemMeta;
