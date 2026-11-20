import {
  useState,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { CDCloseIcon } from "../icon";
import { CDButton } from "../button";
import type { CDModalProps } from "./types";

/**
 * CDModal / CDDialog
 *
 * Modal dialog overlay rendering on top of the application with focus trapping,
 * background blur, and smooth spring animations.
 */
export function CDModalBase({
  open = false,
  onClose,
  title,
  description,
  footer,
  closable = true,
  maskClosable = true,
  centered = true,
  width = 520,
  destroyOnClose = true,
  okText = "Confirm",
  cancelText = "Cancel",
  onOk,
  onCancel,
  confirmLoading = false,
  children,
  className,
  style,
}: CDModalProps): ReactElement | null {
  const [mounted, setMounted] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll when open
  useEffect(() => {
    if (!open || typeof document === "undefined") return;

    const originalOverflow: string = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // Escape key listener
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose?.();
        onCancel?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, onCancel]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  if (!open && destroyOnClose) {
    return null;
  }

  const handleMaskClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (!maskClosable) return;
    if (!dialogRef.current || !dialogRef.current.contains(e.target as Node)) {
      onClose?.();
      onCancel?.();
    }
  };

  const handleClose = (_e?: MouseEvent<HTMLButtonElement>): void => {
    onClose?.();
    onCancel?.();
  };

  const handleOkClick = (): void => {
    onOk?.();
  };

  const handleCancelClick = (): void => {
    onCancel?.();
    onClose?.();
  };

  const widthStyle: string = typeof width === "number" ? `${width}px` : width;

  // Render footer actions
  const renderFooter = (): ReactNode => {
    if (footer === false) return null;
    if (footer !== undefined) return <div className="cinder-modal-footer">{footer}</div>;

    return (
      <div className="cinder-modal-footer">
        <CDButton variant="secondary" onClick={handleCancelClick}>
          {cancelText}
        </CDButton>
        <CDButton variant="primary" isLoading={confirmLoading} onClick={handleOkClick}>
          {okText}
        </CDButton>
      </div>
    );
  };

  return createPortal(
    <div
      className={cn(
        "cinder-modal-root",
        open && "cinder-modal-open",
        centered && "cinder-modal-centered",
      )}
      onClick={handleMaskClick}
      role="presentation"
    >
      {/* Background Mask */}
      <div
        className="cinder-modal-mask"
        aria-hidden="true"
        onClick={handleMaskClick}
      />

      {/* Dialog Card */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "cinder-modal-title" : undefined}
        aria-describedby={description ? "cinder-modal-desc" : undefined}
        className={cn("cinder-modal-dialog", className)}
        style={{ ...style, width: widthStyle }}
        onClick={(e: MouseEvent<HTMLDivElement>): void => e.stopPropagation()}
      >
        {/* Header */}
        {(title || closable) && (
          <div className="cinder-modal-header">
            <div className="cinder-modal-header-text">
              {title && (
                <h2 id="cinder-modal-title" className="cinder-modal-title">
                  {title}
                </h2>
              )}
              {description && (
                <p id="cinder-modal-desc" className="cinder-modal-description">
                  {description}
                </p>
              )}
            </div>

            {closable && (
              <button
                type="button"
                className="cinder-modal-close-btn"
                onClick={handleClose}
                aria-label="Close dialog"
              >
                <CDCloseIcon size={16} />
              </button>
            )}
          </div>
        )}

        {/* Body Content */}
        <div className="cinder-modal-body">{children}</div>

        {/* Footer */}
        {renderFooter()}
      </div>
    </div>,
    document.body,
  );
}

CDModalBase.displayName = "CDModal";

export const CDModal = Object.assign(CDModalBase, {
  Header: ({ children, className }: { children: ReactNode; className?: string }): ReactElement => (
    <div className={cn("cinder-modal-header", className)}>{children}</div>
  ),
  Body: ({ children, className }: { children: ReactNode; className?: string }): ReactElement => (
    <div className={cn("cinder-modal-body", className)}>{children}</div>
  ),
  Footer: ({ children, className }: { children: ReactNode; className?: string }): ReactElement => (
    <div className={cn("cinder-modal-footer", className)}>{children}</div>
  ),
});

// Backward-compatible aliases
export const Modal = CDModal;
export const CDDialog = CDModal;
export const Dialog = CDModal;
