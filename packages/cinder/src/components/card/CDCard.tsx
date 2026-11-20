import { forwardRef, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import { CDSkeleton } from "../skeleton";
import type {
  CDCardProps,
  CDCardHeaderProps,
  CDCardTitleProps,
  CDCardDescriptionProps,
  CDCardContentProps,
  CDCardFooterProps,
} from "./types";

export const CDCardHeader = forwardRef<HTMLDivElement, CDCardHeaderProps>(
  ({ className, children, ...rest }: CDCardHeaderProps, ref): ReactElement => (
    <div ref={ref} className={cn("cinder-card-header", className)} {...rest}>
      {children}
    </div>
  )
);
CDCardHeader.displayName = "CDCardHeader";

export const CDCardTitle = forwardRef<HTMLHeadingElement, CDCardTitleProps>(
  ({ className, children, ...rest }: CDCardTitleProps, ref): ReactElement => (
    <h3 ref={ref} className={cn("cinder-card-title", className)} {...rest}>
      {children}
    </h3>
  )
);
CDCardTitle.displayName = "CDCardTitle";

export const CDCardDescription = forwardRef<HTMLParagraphElement, CDCardDescriptionProps>(
  ({ className, children, ...rest }: CDCardDescriptionProps, ref): ReactElement => (
    <p ref={ref} className={cn("cinder-card-desc", className)} {...rest}>
      {children}
    </p>
  )
);
CDCardDescription.displayName = "CDCardDescription";

export const CDCardContent = forwardRef<HTMLDivElement, CDCardContentProps>(
  ({ className, children, ...rest }: CDCardContentProps, ref): ReactElement => (
    <div ref={ref} className={cn("cinder-card-content", className)} {...rest}>
      {children}
    </div>
  )
);
CDCardContent.displayName = "CDCardContent";

export const CDCardFooter = forwardRef<HTMLDivElement, CDCardFooterProps>(
  ({ className, children, ...rest }: CDCardFooterProps, ref): ReactElement => (
    <div ref={ref} className={cn("cinder-card-footer", className)} {...rest}>
      {children}
    </div>
  )
);
CDCardFooter.displayName = "CDCardFooter";

const CDCardBase = forwardRef<HTMLDivElement, CDCardProps>(
  (
    {
      variant = "surface",
      interactive = false,
      hoverable = false,
      bordered = true,
      size = "md",
      title,
      description,
      extra,
      cover,
      loading = false,
      children,
      className,
      ...rest
    }: CDCardProps,
    ref
  ): ReactElement => {
    const isInteractive: boolean = Boolean(interactive || hoverable);

    const variantClass: string = {
      surface: "cinder-card-surface",
      glass: "cinder-card-glass",
      outline: "cinder-card-outline",
    }[variant];

    const hasAutoHeader: boolean = Boolean(title || description || extra);

    return (
      <div
        ref={ref}
        className={cn(
          "cinder-card",
          variantClass,
          `cinder-card-${size}`,
          isInteractive && "cinder-card-interactive",
          !bordered && "cinder-card-borderless",
          loading && "cinder-card-loading",
          className
        )}
        {...rest}
      >
        {cover && <div className="cinder-card-cover">{cover}</div>}

        {hasAutoHeader && (
          <div className="cinder-card-header cinder-card-auto-header">
            <div className="cinder-card-header-main">
              {title && <h3 className="cinder-card-title">{title}</h3>}
              {description && (
                <p className="cinder-card-desc">{description}</p>
              )}
            </div>
            {extra && <div className="cinder-card-extra">{extra}</div>}
          </div>
        )}

        <div className="cinder-card-body">
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <CDSkeleton lines={3} />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    );
  }
);
CDCardBase.displayName = "CDCard";

export const CDCard = Object.assign(CDCardBase, {
  Header: CDCardHeader,
  Title: CDCardTitle,
  Description: CDCardDescription,
  Content: CDCardContent,
  Footer: CDCardFooter,
});

// Backward-compatible aliases
export const Card = CDCard;
export const CardHeader = CDCardHeader;
export const CardTitle = CDCardTitle;
export const CardDescription = CDCardDescription;
export const CardContent = CDCardContent;
export const CardFooter = CDCardFooter;
