import {
  useState,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { CDCloseIcon } from "../icon";
import type { CDDrawerProps } from "./types";

/**
 * CDDrawer / CDSheet
 *
 * Sliding panel overlay that glides into view from any viewport edge
 * for supplementary workflows, side navigation, or contextual sheets.
 */
export function CDDrawerBase({
  open = false,
  onClose,
  placement = "right",
  title,
  description,
  footer,
  closable = true,
  maskClosable = true,
  width = 380,
  height = 380,
  destroyOnClose = true,
  children,
  className,
  style,
}: CDDrawerProps): ReactElement | null {
  const [mounted, setMounted] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);

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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  if (!open && destroyOnClose) {
    return null;
  }

  const handleMaskClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (!maskClosable) return;
    if (!panelRef.current || !panelRef.current.contains(e.target as Node)) {
      onClose?.();
    }
  };

  const handleClose = (_e?: MouseEvent<HTMLButtonElement>): void => {
    onClose?.();
  };

  const isHorizontal: boolean = placement === "left" || placement === "right";
  const dimensionStyle: CSSProperties = isHorizontal
    ? { width: typeof width === "number" ? `${width}px` : width }
    : { height: typeof height === "number" ? `${height}px` : height };

  return createPortal(
    <div
      className={cn(
        "cinder-drawer-root",
        `cinder-drawer-placement-${placement}`,
        open && "cinder-drawer-open",
      )}
      onClick={handleMaskClick}
      role="presentation"
    >
      {/* Background Mask */}
      <div
        className="cinder-drawer-mask"
        aria-hidden="true"
        onClick={handleMaskClick}
      />

      {/* Sliding Sheet Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "cinder-drawer-title" : undefined}
        aria-describedby={description ? "cinder-drawer-desc" : undefined}
        className={cn("cinder-drawer-panel", className)}
        style={{ ...style, ...dimensionStyle }}
        onClick={(e: MouseEvent<HTMLDivElement>): void => e.stopPropagation()}
      >
        {/* Header */}
        {(title || closable) && (
          <div className="cinder-drawer-header">
            <div className="cinder-drawer-header-text">
              {title && (
                <h2 id="cinder-drawer-title" className="cinder-drawer-title">
                  {title}
                </h2>
              )}
              {description && (
                <p id="cinder-drawer-desc" className="cinder-drawer-description">
                  {description}
                </p>
              )}
            </div>

            {closable && (
              <button
                type="button"
                className="cinder-drawer-close-btn"
                onClick={handleClose}
                aria-label="Close sheet"
              >
                <CDCloseIcon size={16} />
              </button>
            )}
          </div>
        )}

        {/* Body Content */}
        <div className="cinder-drawer-body">{children}</div>

        {/* Footer */}
        {footer && <div className="cinder-drawer-footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

CDDrawerBase.displayName = "CDDrawer";

export const CDDrawer = Object.assign(CDDrawerBase, {
  Header: ({ children, className }: { children: ReactNode; className?: string }): ReactElement => (
    <div className={cn("cinder-drawer-header", className)}>{children}</div>
  ),
  Body: ({ children, className }: { children: ReactNode; className?: string }): ReactElement => (
    <div className={cn("cinder-drawer-body", className)}>{children}</div>
  ),
  Footer: ({ children, className }: { children: ReactNode; className?: string }): ReactElement => (
    <div className={cn("cinder-drawer-footer", className)}>{children}</div>
  ),
});

// Backward-compatible aliases
export const Drawer = CDDrawer;
export const CDSheet = CDDrawer;
export const Sheet = CDDrawer;
