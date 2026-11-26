import { useLayoutEffect, type ReactElement } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop ensures that client-side route transitions automatically
 * reset the document viewport and main content containers to the top.
 */
export function ScrollToTop(): ReactElement | null {
  const { pathname, hash } = useLocation();

  useLayoutEffect((): (() => void) => {
    // If a hash anchor is provided (e.g. #section-id), scroll to target element
    if (hash) {
      const targetId: string = hash.replace("#", "");
      const element: HTMLElement | null = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView();
        return (): void => {};
      }
    }

    const resetScroll = (): void => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const mainContent: HTMLElement | null = document.querySelector(".cinder-main-content");
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    };

    // Immediate scroll reset before paint
    resetScroll();

    // Additional animation frame ensures lazy Suspense route mounts also align at top
    const frameId: number = requestAnimationFrame((): void => {
      resetScroll();
    });

    return (): void => {
      cancelAnimationFrame(frameId);
    };
  }, [pathname, hash]);

  return null;
}
