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
