import {
  forwardRef,
  useState,
  useRef,
  type ReactElement,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "../../utils/cn";
import { FileUploadCloudIcon } from "./FileIcons";
import { CDFilePicker } from "./CDFilePicker";
import type { CDFilePickerDraggerProps } from "./types";

export const CDFilePickerDragger = forwardRef<HTMLDivElement, CDFilePickerDraggerProps>(
  (
    {
      title = "Click or drag files to this area to upload",
      description = "Support for single or bulk uploading. Strictly accepts standard formats.",
      icon = <FileUploadCloudIcon size={44} />,
      disabled = false,
      onDrop,
      className,
      style,
      children,
      ...pickerProps
    }: CDFilePickerDraggerProps,
    ref
  ): ReactElement => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const dragCounter = useRef<number>(0);
    const pickerTriggerRef = useRef<() => void>(null);

    const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      dragCounter.current += 1;
      if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
        setIsDragOver(true);
      }
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      dragCounter.current -= 1;
      if (dragCounter.current <= 0) {
        dragCounter.current = 0;
        setIsDragOver(false);
      }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setIsDragOver(false);

      if (disabled) return;

      if (onDrop) {
        onDrop(e);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        pickerTriggerRef.current?.();
      }
    };

    return (
      <CDFilePicker
        {...pickerProps}
        disabled={disabled}
        listType={pickerProps.listType || "dropzone"}
        className={cn("cinder-file-dragger-root", className)}
        style={style}
      >
        <div
          ref={ref}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          className={cn(
            "cinder-file-dragger",
            isDragOver && "cinder-file-dragger-active",
            disabled && "cinder-file-dragger-disabled"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
        >
          <div className="cinder-file-dragger-icon">{icon}</div>

          <div className="cinder-file-dragger-text">
            <h4 className="cinder-file-dragger-title">{title}</h4>
            {description && (
              <p className="cinder-file-dragger-desc">{description}</p>
            )}
          </div>

          {children && (
            <div className="cinder-file-dragger-custom">{children}</div>
          )}
        </div>
      </CDFilePicker>
    );
  }
);

CDFilePickerDragger.displayName = "CDFilePickerDragger";

export const FilePickerDragger = CDFilePickerDragger;
export const CDUploadDragger = CDFilePickerDragger;
export const UploadDragger = CDFilePickerDragger;
