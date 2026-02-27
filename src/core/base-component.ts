export type Signal<T> = {
  get: () => T;
  set: (value: T) => void;
  subscribe: (listener: (value: T) => void) => () => void;
};

export function createSignal<T>(initial: T): Signal<T> {
  let value = initial;
  const listeners = new Set<(next: T) => void>();

  return {
    get: () => value,
    set: next => {
      if (Object.is(value, next)) return;
      value = next;
      listeners.forEach(listener => listener(value));
    },
    subscribe: listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

export class BaseComponent<TState extends Record<string, unknown> = Record<string, unknown>> extends HTMLElement {
  state: TState;
  private signalUnsubs: Set<() => void>;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {} as TState;
    this.signalUnsubs = new Set();
  }

  useSignal<T>(initial: T): Signal<T> {
    const signal = createSignal(initial);
    const unsubscribe = signal.subscribe(() => this.render());
    this.signalUnsubs.add(unsubscribe);
    return signal;
  }

  /**
   * Create a signal bound to a specific HTML element
   * Automatically updates the element's textContent when the signal value changes
   * @param elementId - The ID of the HTML element to bind to
   * @param initial - The initial value
   * @returns A signal that auto-updates the element
   * 
   * @example
   * ```typescript
   * private count = this.useSignalHtml('countValue', 0);
   * 
   * private increment() {
   *   this.count.set(this.count.get() + 1);
   *   // Element with id="countValue" automatically updates
   * }
   * ```
   */
  useSignalHtml<T>(elementId: string, initial: T): Signal<T> {
    const signal = createSignal(initial);
    
    // Subscribe to signal changes and update DOM element directly
    const unsubscribe = signal.subscribe((value) => {
      const element = this.shadowRoot?.getElementById(elementId);
      if (element) {
        element.textContent = String(value);
      }
    });
    
    this.signalUnsubs.add(unsubscribe);
    
    // Set initial display value after render cycle
    requestAnimationFrame(() => {
      const element = this.shadowRoot?.getElementById(elementId);
      if (element) {
        element.textContent = String(initial);
      }
    });
    
    return signal;
  }

  setState(partial: Partial<TState>): void {
    this.state = { ...this.state, ...partial };
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    this.signalUnsubs.forEach(unsub => unsub());
    this.signalUnsubs.clear();
  }

  render(): void {}
}
