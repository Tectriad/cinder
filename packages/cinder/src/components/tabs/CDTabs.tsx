import {
  forwardRef,
  useState,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import { TabsContext } from "./TabsContext";
import { CDTabList } from "./CDTabList";
import { CDTab } from "./CDTab";
import { CDTabPanel } from "./CDTabPanel";
import type { CDTabsProps, CDTabItem } from "./types";

export const CDTabs = forwardRef<HTMLDivElement, CDTabsProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      variant = "line",
      orientation = "horizontal",
      size = "md",
      items,
      onClose,
      children,
      className,
      ...restProps
    }: CDTabsProps,
    ref
  ): ReactElement => {
    const initialKey: string =
      controlledValue !== undefined
        ? controlledValue
        : defaultValue !== undefined
        ? defaultValue
        : items && items.length > 0
        ? items[0].key
        : "";

    const [internalKey, setInternalKey] = useState<string>(initialKey);

    const activeKey: string =
      controlledValue !== undefined ? controlledValue : internalKey;

    const handleSetActiveKey = (key: string): void => {
      if (controlledValue === undefined) {
        setInternalKey(key);
      }
      if (onChange) {
        onChange(key);
      }
    };

    return (
      <TabsContext.Provider
        value={{
          activeKey,
          setActiveKey: handleSetActiveKey,
          variant,
          orientation,
          size,
          onClose,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "cinder-tabs",
            `cinder-tabs-${variant}`,
            `cinder-tabs-${orientation}`,
            `cinder-tabs-${size}`,
            className
          )}
          {...restProps}
        >
          {items && items.length > 0 ? (
            <>
              <CDTabList>
                {items.map((item: CDTabItem) => (
                  <CDTab
                    key={item.key}
                    value={item.key}
                    disabled={item.disabled}
                    icon={item.icon}
                    badge={item.badge}
                    closable={item.closable}
                  >
                    {item.label}
                  </CDTab>
                ))}
              </CDTabList>
              <div className="cinder-tabs-panels">
                {items.map((item: CDTabItem) => (
                  <CDTabPanel key={item.key} value={item.key}>
                    {item.children}
                  </CDTabPanel>
                ))}
              </div>
            </>
          ) : (
            children
          )}
        </div>
      </TabsContext.Provider>
    );
  }
);

CDTabs.displayName = "CDTabs";

export const Tabs = CDTabs;
