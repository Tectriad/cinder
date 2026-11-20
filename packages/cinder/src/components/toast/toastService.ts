import type { ReactNode } from "react";
import type { CDToastItem, CDToastOptions, CDToastType } from "./types";

type ToastListener = (toasts: CDToastItem[]) => void;

class ToastManager {
  private toasts: CDToastItem[] = [];
  private listeners: Set<ToastListener> = new Set();
  private counter: number = 0;
  private globalConfig: Partial<CDToastOptions> = {};

  public subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    listener([...this.toasts]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const copy = [...this.toasts];
    this.listeners.forEach((listener: ToastListener) => listener(copy));
  }

  public config(options: Partial<CDToastOptions>): void {
    this.globalConfig = { ...this.globalConfig, ...options };
  }

  public show(options: CDToastOptions): string {
    const id: string = options.id ?? `cinder-toast-${Date.now()}-${++this.counter}`;
    const newItem: CDToastItem = {
      id,
      duration: 4000,
      closable: true,
      type: "neutral",
      placement: "top-right",
      animation: "slide",
      showProgress: true,
      pauseOnHover: true,
      ...this.globalConfig,
      ...options,
    };

    // Remove if duplicate id
    this.toasts = this.toasts.filter((t: CDToastItem) => t.id !== id);
    this.toasts.push(newItem);
    this.notify();
    return id;
  }

  public dismiss(id: string): void {
    const item = this.toasts.find((t: CDToastItem) => t.id === id);
    if (item) {
      item.onClose?.();
    }
    this.toasts = this.toasts.filter((t: CDToastItem) => t.id !== id);
    this.notify();
  }

  public clear(): void {
    this.toasts.forEach((t: CDToastItem) => t.onClose?.());
    this.toasts = [];
    this.notify();
  }

  private quick(
    type: CDToastType,
    titleOrDesc: ReactNode,
    options?: Omit<CDToastOptions, "type" | "title" | "description"> & {
      description?: ReactNode;
    },
  ): string {
    if (options?.description) {
      return this.show({
        type,
        title: titleOrDesc,
        ...options,
      });
    }
    return this.show({
      type,
      description: titleOrDesc,
      ...options,
    });
  }

  public info(title: ReactNode, options?: Omit<CDToastOptions, "type">): string {
    return this.quick("info", title, options);
  }

  public success(title: ReactNode, options?: Omit<CDToastOptions, "type">): string {
    return this.quick("success", title, options);
  }

  public warning(title: ReactNode, options?: Omit<CDToastOptions, "type">): string {
    return this.quick("warning", title, options);
  }

  public error(title: ReactNode, options?: Omit<CDToastOptions, "type">): string {
    return this.quick("error", title, options);
  }
}

export const toast = new ToastManager();
