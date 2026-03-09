/**
 * Event Helpers
 * 
 * Centralized utilities for dispatching custom events across components.
 * Reduces boilerplate and ensures consistent event behavior.
 */

export interface CustomEventOptions {
  bubbles?: boolean;
  composed?: boolean;
  cancelable?: boolean;
}

/**
 * Dispatches a custom event from an element with consistent defaults.
 * 
 * @param element - The element to dispatch the event from
 * @param eventName - The name of the custom event
 * @param detail - Optional event detail payload
 * @param options - Event configuration options
 * @returns The dispatched event
 * 
 * @example
 * ```ts
 * dispatchCustomEvent(this, 'checkbox-change', { checked: true });
 * dispatchCustomEvent(this, 'modal-close');
 * dispatchCustomEvent(this, 'item-select', { id: '123' }, { cancelable: true });
 * ```
 */
export function dispatchCustomEvent<T = any>(
  element: HTMLElement,
  eventName: string,
  detail?: T,
  options?: CustomEventOptions
): boolean {
  const event = new CustomEvent<T>(eventName, {
    detail,
    bubbles: options?.bubbles ?? true,
    composed: options?.composed ?? true,
    cancelable: options?.cancelable ?? false
  });
  
  return element.dispatchEvent(event);
}

/**
 * Creates a custom event without dispatching it.
 * Useful when you need to create the event but dispatch it later.
 * 
 * @param eventName - The name of the custom event
 * @param detail - Optional event detail payload
 * @param options - Event configuration options
 * @returns The created CustomEvent
 * 
 * @example
 * ```ts
 * const event = createCustomEvent('my-event', { value: 'test' });
 * this.dispatchEvent(event);
 * ```
 */
export function createCustomEvent<T = any>(
  eventName: string,
  detail?: T,
  options?: CustomEventOptions
): CustomEvent<T> {
  return new CustomEvent<T>(eventName, {
    detail,
    bubbles: options?.bubbles ?? true,
    composed: options?.composed ?? true,
    cancelable: options?.cancelable ?? false
  });
}

/**
 * Type-safe event detail extractor for custom events
 * 
 * @param event - The event to extract detail from
 * @returns The event detail or undefined
 * 
 * @example
 * ```ts
 * interface MyDetail { id: string; value: number; }
 * const detail = getEventDetail<MyDetail>(event);
 * ```
 */
export function getEventDetail<T>(event: Event): T | undefined {
  if ('detail' in event && event instanceof CustomEvent) {
    return event.detail as T;
  }
  return undefined;
}
