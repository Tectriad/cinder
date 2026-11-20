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
  CDParagraphProps,
  CDEditableConfig,
  CDCopyableConfig,
  CDEllipsisConfig,
} from "./types";

export const CDParagraph = forwardRef<HTMLParagraphElement, CDParagraphProps>(
  (
    {
      type = "default",
      size = "md",
      lead = false,
      spacing = "normal",
      copyable = false,
      editable = false,
      ellipsis = false,
      children,
      className,
      style,
      ...restProps
    }: CDParagraphProps,
    ref
  ): ReactElement => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedContent, setEditedContent] = useState<string>(
      typeof children === "string" ? children : ""
    );

    const editableConfig: CDEditableConfig =
      typeof editable === "object" ? editable : {};

    const copyConfig: CDCopyableConfig =
      typeof copyable === "object" ? copyable : {};

    const ellipsisConfig: CDEllipsisConfig =
      typeof ellipsis === "object" ? ellipsis : {};
    const hasEllipsis = Boolean(ellipsis);

    const currentText = editedContent || (typeof children === "string" ? children : "");

    const ellipsisStyle: CSSProperties = hasEllipsis
      ? {
          display: "-webkit-box",
          WebkitLineClamp: ellipsisConfig.rows || 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }
      : {};

    const content: ReactNode = isEditing ? (
      <InlineEditor
        initialText={currentText}
        config={editableConfig}
        onFinish={(val: string) => {
          setEditedContent(val);
          setIsEditing(false);
        }}
      />
    ) : (
      editedContent || children
    );

    return (
      <p
        ref={ref}
        style={{ ...ellipsisStyle, ...style }}
        className={cn(
          "cinder-typography",
          "cinder-paragraph",
          `cinder-paragraph-${size}`,
          `cinder-paragraph-spacing-${spacing}`,
          lead && "cinder-paragraph-lead",
          type !== "default" && `cinder-typography-${type}`,
          hasEllipsis && "cinder-typography-ellipsis",
          className
        )}
        {...restProps}
      >
        <span className="cinder-paragraph-content">{content}</span>
        {editable && !isEditing && (
          <EditButton
            onStart={() => {
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
      </p>
    );
  }
);

CDParagraph.displayName = "CDParagraph";

export const Paragraph = CDParagraph;
