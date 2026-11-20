import {
  forwardRef,
  useState,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
} from "react";
import { cn } from "../../utils/cn";
import { CopyButton, EditButton, InlineEditor } from "./TypographyOperations";
import type { CDTextProps, CDEditableConfig, CDCopyableConfig, CDEllipsisConfig } from "./types";

export const CDText = forwardRef<HTMLElement, CDTextProps>(
  (
    {
      as: Component = "span",
      type = "default",
      size = "md",
      weight,
      strong = false,
      italic = false,
      underline = false,
      delete: isDeleted = false,
      code = false,
      mark = false,
      keyboard = false,
      copyable = false,
      editable = false,
      ellipsis = false,
      children,
      className,
      style,
      ...restProps
    }: CDTextProps,
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
          WebkitLineClamp: ellipsisConfig.rows || 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }
      : {};

    let content: ReactNode = isEditing ? (
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

    if (code) {
      content = <code className="cinder-text-inline-code">{content}</code>;
    }
    if (keyboard) {
      content = <kbd className="cinder-kbd">{content}</kbd>;
    }
    if (mark) {
      content = <mark className="cinder-text-mark">{content}</mark>;
    }
    if (isDeleted) {
      content = <del>{content}</del>;
    }
    if (underline) {
      content = <u>{content}</u>;
    }
    if (italic) {
      content = <em>{content}</em>;
    }
    if (strong) {
      content = <strong>{content}</strong>;
    }

    return (
      <Component
        ref={ref}
        style={{ ...ellipsisStyle, ...style }}
        className={cn(
          "cinder-typography",
          "cinder-text",
          `cinder-text-${size}`,
          type !== "default" && `cinder-typography-${type}`,
          weight && `cinder-font-${weight}`,
          hasEllipsis && "cinder-typography-ellipsis",
          className
        )}
        {...restProps}
      >
        <span className="cinder-text-content">{content}</span>
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
      </Component>
    );
  }
);

CDText.displayName = "CDText";

export const Text = CDText;
