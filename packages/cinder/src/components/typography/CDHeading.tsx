import {
  forwardRef,
  useState,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import { CopyButton, EditButton, InlineEditor } from "./TypographyOperations";
import type {
  CDHeadingProps,
  CDEllipsisConfig,
  CDCopyableConfig,
  CDEditableConfig,
} from "./types";

export const CDHeading = forwardRef<HTMLHeadingElement, CDHeadingProps>(
  (
    {
      level = 1,
      type = "default",
      weight,
      gradient = false,
      copyable = false,
      editable = false,
      ellipsis = false,
      children,
      className,
      style,
      ...restProps
    }: CDHeadingProps,
    ref
  ): ReactElement => {
    const Tag = `h${level}` as const;
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedContent, setEditedContent] = useState<string>(
      typeof children === "string" ? children : ""
    );

    const editableConfig: CDEditableConfig =
      typeof editable === "object" ? editable : {};

    const ellipsisConfig: CDEllipsisConfig =
      typeof ellipsis === "object" ? ellipsis : {};
    const hasEllipsis = Boolean(ellipsis);

    const copyConfig: CDCopyableConfig =
      typeof copyable === "object" ? copyable : {};
    const currentText =
      editedContent || (typeof children === "string" ? children : "");

    const ellipsisStyle: CSSProperties = hasEllipsis
      ? {
          display: "-webkit-box",
          WebkitLineClamp: ellipsisConfig.rows || 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }
      : {};

    const content: ReactNode = isEditing ? (
      <InlineEditor
        initialText={currentText}
        config={editableConfig}
        onFinish={(val: string): void => {
          setEditedContent(val);
          setIsEditing(false);
        }}
      />
    ) : (
      editedContent || children
    );

    return (
      <Tag
        ref={ref}
        style={{ ...ellipsisStyle, ...style }}
        className={cn(
          "cinder-typography",
          "cinder-heading",
          `cinder-heading-h${level}`,
          type !== "default" && `cinder-typography-${type}`,
          weight && `cinder-font-${weight}`,
          gradient && "cinder-heading-gradient",
          hasEllipsis && "cinder-typography-ellipsis",
          className
        )}
        {...restProps}
      >
        <span className="cinder-heading-content">{content}</span>
        {editable && !isEditing && (
          <EditButton
            onStart={(): void => {
              setIsEditing(true);
              if (editableConfig.onStart) {
                editableConfig.onStart();
              }
            }}
          />
        )}
        {copyable && !isEditing && (
          <CopyButton textToCopy={currentText} config={copyConfig} />
        )}
      </Tag>
    );
  }
);

CDHeading.displayName = "CDHeading";

export const Heading = CDHeading;
export const CDTitle = CDHeading;
export const Title = CDHeading;
