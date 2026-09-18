import { useEffect, useRef } from 'react';

/**
 * Aeirmist Central Back Navigation Manager
 * Handles hardware back button on Android (Capacitor), browser back/forward (popstate),
 * and provides components with priority-based back press interception.
 */

export type BackHandler = () => boolean; // return true if handled/consumed

export interface BackRegistration {
  id: string;
  priority: number;
  handler: BackHandler;
}

class BackNavigationManager {
  private handlers: BackRegistration[] = [];

  /**
   * Register a handler to intercept back navigation.
   * Priority: Higher numbers run first.
   * Modals / Sheets / Overlays: 100+
   * Sub-screens (e.g. mobile chat view, settings sub-section): 50
   * Tabs: 10
   */
  register(id: string, handler: BackHandler, priority: number = 0): () => void {
    this.handlers.push({ id, priority, handler });
    this.handlers.sort((a, b) => b.priority - a.priority);

    return () => {
      this.handlers = this.handlers.filter(h => h.id !== id);
    };
  }

  /**
   * Dispatches a back event to registered handlers in descending priority.
   * Returns true if any handler handled the back action.
   */
  dispatch(): boolean {
    for (const item of this.handlers) {
      try {
        const handled = item.handler();
        if (handled) {
          return true;
        }
      } catch (e) {
        console.error(`[BackNavigation] Error in handler ${item.id}:`, e);
      }
    }
    return false;
  }

  /**
   * Returns the count of currently registered active handlers.
   */
  get count(): number {
    return this.handlers.length;
  }
}

export const backNav = new BackNavigationManager();

/**
 * React hook to register a back action handler in any component.
 */
export function useBackHandler(
  handler: () => boolean,
  active: boolean = true,
  priority: number = 0,
  deps: any[] = []
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!active) return;
    const id = `back_${Math.random().toString(36).substring(2, 11)}`;
    const unregister = backNav.register(id, () => handlerRef.current(), priority);
    return () => unregister();
  }, [active, priority, ...deps]);
}
