import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import { useTabsContext } from "./TabsContext";
import type { CDTabListProps } from "./types";

export const CDTabList = forwardRef<HTMLDivElement, CDTabListProps>(
  (
    {
      children,
      className,
      ...restProps
    }: CDTabListProps,
    ref
  ): ReactElement => {
    const { variant, orientation } = useTabsContext();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          "cinder-tab-list",
          `cinder-tab-list-${variant}`,
          `cinder-tab-list-${orientation}`,
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CDTabList.displayName = "CDTabList";

export const TabList = CDTabList;
