import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import { CopyButton } from "./TypographyOperations";
import type { CDCodeProps, CDCopyableConfig } from "./types";

export const CDCode = forwardRef<HTMLElement, CDCodeProps>(
  (
    {
      size = "md",
      copyable = false,
      children,
      className,
      ...restProps
    }: CDCodeProps,
    ref
  ): ReactElement => {
    const copyConfig: CDCopyableConfig =
      typeof copyable === "object" ? copyable : {};
    const textToCopy =
      copyConfig.text || (typeof children === "string" ? children : "");

    return (
      <code
        ref={ref}
        className={cn(
          "cinder-typography",
          "cinder-code",
          size !== "md" && `cinder-code-${size}`,
          className
        )}
        {...restProps}
      >
        <span className="cinder-code-content">{children}</span>
        {copyable && <CopyButton textToCopy={textToCopy} config={copyConfig} />}
      </code>
    );
  }
);

CDCode.displayName = "CDCode";

export const Code = CDCode;
