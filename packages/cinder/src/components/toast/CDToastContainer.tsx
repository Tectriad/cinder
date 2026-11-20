import {
  useState,
  useEffect,
  type ReactElement,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { toast } from "./toastService";
import { CDToast } from "./CDToast";
import type { CDToastItem, CDToastContainerProps, CDToastPlacement } from "./types";

function normalizePlacement(p?: CDToastPlacement): string {
  if (!p) return "top-right";
  if (p === "top") return "top-center";
  if (p === "bottom") return "bottom-center";
  return p;
}

export function CDToastContainer({
  placement: defaultPlacement = "top-right",
  maxToasts = 5,
  className,
  style,
}: CDToastContainerProps): ReactElement | null {
  const [toasts, setToasts] = useState<CDToastItem[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = toast.subscribe((updated: CDToastItem[]) => {
      setToasts(updated);
    });
    return () => unsubscribe();
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const handleDismiss = (id: string, _event?: MouseEvent<HTMLButtonElement>): void => {
    toast.dismiss(id);
  };

  const visibleToasts: CDToastItem[] = toasts.slice(-maxToasts);

  if (visibleToasts.length === 0) {
    return null;
  }

  // Group toasts by normalized placement
  const placementGroups: Record<string, CDToastItem[]> = {};
  for (const item of visibleToasts) {
    const p: string = normalizePlacement(item.placement ?? defaultPlacement);
    if (!placementGroups[p]) {
      placementGroups[p] = [];
    }
    placementGroups[p].push(item);
  }

  return createPortal(
    <>
      {Object.entries(placementGroups).map(([pos, items]: [string, CDToastItem[]]) => (
        <div
          key={pos}
          className={cn(
            "cinder-toast-container",
            `cinder-toast-placement-${pos}`,
            className,
          )}
          style={style}
          aria-live="polite"
        >
          {items.map((item: CDToastItem) => (
            <CDToast key={item.id} item={item} onDismiss={handleDismiss} />
          ))}
        </div>
      ))}
    </>,
    document.body,
  );
}

CDToastContainer.displayName = "CDToastContainer";

// Backward-compatible alias
export const ToastContainer = CDToastContainer;
export const CDSnackbarContainer = CDToastContainer;
export const SnackbarContainer = CDToastContainer;
