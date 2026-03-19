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