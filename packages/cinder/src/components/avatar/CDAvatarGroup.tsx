import {
  Children,
  cloneElement,
  isValidElement,
  forwardRef,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import type { CDAvatarGroupProps, CDAvatarProps } from "./types";

/**
 * CDAvatarGroup / AvatarGroup
 *
 * Stacks multiple avatars with a maximum count cap and an overflow counter pill.
 */
export const CDAvatarGroup = forwardRef<HTMLDivElement, CDAvatarGroupProps>(
  (
    {
      maxCount,
      shape = "circle",
      size = "md",
      className,
      style,
      children,
      ...rest
    }: CDAvatarGroupProps,
    ref
  ): ReactElement => {
    const childrenArray = Children.toArray(children).filter(isValidElement);
    const totalAvatars: number = childrenArray.length;

    const visibleChildren =
      maxCount && maxCount > 0 && totalAvatars > maxCount
        ? childrenArray.slice(0, maxCount)
        : childrenArray;

    const excessCount: number =
      maxCount && totalAvatars > maxCount ? totalAvatars - maxCount : 0;

    return (
      <div
        ref={ref}
        className={cn("cinder-avatar-group", className)}
        style={style}
        {...rest}
      >
        {visibleChildren.map((child, index) => {
          if (isValidElement<CDAvatarProps>(child)) {
            return cloneElement(child, {
              key: child.key || `avatar-${index}`,
              shape: child.props.shape || shape,
              size: child.props.size || size,
              className: cn(child.props.className, "cinder-avatar-group-item"),
            });
          }
          return child;
        })}

        {excessCount > 0 && (
          <span
            className={cn(
              "cinder-avatar",
              "cinder-avatar-excess",
              `cinder-avatar-${shape}`,
              typeof size === "string" && `cinder-avatar-${size}`
            )}
            title={`+${excessCount} more`}
          >
            +{excessCount}
          </span>
        )}
      </div>
    );
  }
);

CDAvatarGroup.displayName = "CDAvatarGroup";
export const CDGroup = CDAvatarGroup;
