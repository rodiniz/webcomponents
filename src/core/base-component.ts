export type Signal<T> = {
  get: () => T;
  set: (value: T) => void;
  subscribe: (listener: (value: T) => void) => () => void;
  peek: () => T;
};

export function createSignal<T>(initial: T, options?: { equals?: (prev: T, next: T) => boolean }): Signal<T> {
  let value = initial;
  const listeners = new Set<(next: T) => void>();
  const equals = options?.equals ?? Object.is;

  return {
    get: () => value,
    peek: () => value,
    set: next => {
      if (equals(value, next)) return;
      value = next;
      listeners.forEach(listener => listener(value));
    },
    subscribe: listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

type EqualityFn<T> = (prev: T, next: T) => boolean;

export function createSignalWithEquality<T>(initial: T, equals: EqualityFn<T>): Signal<T> {
  return createSignal(initial, { equals });
}

export class BaseComponent<TState extends Record<string, unknown> = Record<string, unknown>> extends HTMLElement {
  state: TState;
  private signalUnsubs: Set<() => void>;
  private renderScheduled: boolean = false;
  private prevState: TState | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {} as TState;
    this.signalUnsubs = new Set();
  }

  protected shouldRender(_newState: TState, _prevState: TState | null): boolean {
    return true;
  }

  private scheduleRender(): void {
    if (this.renderScheduled) return;
    this.renderScheduled = true;
    
    queueMicrotask(() => {
      this.renderScheduled = false;
      this.render();
    });
  }

  useSignal<T>(initial: T): Signal<T> {
    const signal = createSignal(initial);
    const unsubscribe = signal.subscribe(() => this.scheduleRender());
    this.signalUnsubs.add(unsubscribe);
    return signal;
  }

  useSignalWithEquality<T>(initial: T, equals: EqualityFn<T>): Signal<T> {
    const signal = createSignalWithEquality(initial, equals);
    const unsubscribe = signal.subscribe(() => this.scheduleRender());
    this.signalUnsubs.add(unsubscribe);
    return signal;
  }

  useSignalHtml<T>(elementId: string, initial: T): Signal<T> {
    const signal = createSignal(initial);
    
    const unsubscribe = signal.subscribe((value) => {
      const element = this.shadowRoot?.getElementById(elementId);
      if (element) {
        element.textContent = String(value);
      }
    });
    
    this.signalUnsubs.add(unsubscribe);
    
    requestAnimationFrame(() => {
      const element = this.shadowRoot?.getElementById(elementId);
      if (element) {
        element.textContent = String(initial);
      }
    });
    
    return signal;
  }

  setState(partial: Partial<TState>): void {
    const newState = { ...this.state, ...partial } as TState;
    
    if (this.shouldRender(newState, this.prevState)) {
      this.prevState = this.state;
      this.state = newState;
      this.scheduleRender();
    } else {
      this.state = newState;
    }
  }

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    this.signalUnsubs.forEach(unsub => unsub());
    this.signalUnsubs.clear();
  }

  forceRender(): void {
    this.prevState = null;
    this.render();
  }

  render(): void {}
}
