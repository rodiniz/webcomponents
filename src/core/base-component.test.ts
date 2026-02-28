import { describe, it, expect, vi } from 'vitest';
import { createSignal, createSignalWithEquality, Signal } from './base-component';

describe('createSignal', () => {
  it('should create a signal with initial value', () => {
    const signal = createSignal(0);
    expect(signal.get()).toBe(0);
  });

  it('should update value on set', () => {
    const signal = createSignal(0);
    signal.set(5);
    expect(signal.get()).toBe(5);
  });

  it('should notify subscribers on change', () => {
    const signal = createSignal(0);
    const fn = vi.fn();
    signal.subscribe(fn);
    signal.set(5);
    expect(fn).toHaveBeenCalledWith(5);
  });

  it('should not notify if value is same (Object.is)', () => {
    const signal = createSignal('hello');
    const fn = vi.fn();
    signal.subscribe(fn);
    signal.set('hello');
    expect(fn).not.toHaveBeenCalled();
  });

  it('should unsubscribe properly', () => {
    const signal = createSignal(0);
    const fn = vi.fn();
    const unsubscribe = signal.subscribe(fn);
    unsubscribe();
    signal.set(5);
    expect(fn).not.toHaveBeenCalled();
  });

  it('should support peek to get value without triggering', () => {
    const signal = createSignal(42);
    const fn = vi.fn();
    signal.subscribe(fn);
    expect(signal.peek()).toBe(42);
    expect(fn).not.toHaveBeenCalled();
  });

  it('should handle objects correctly', () => {
    const obj = { a: 1 };
    const signal = createSignal(obj);
    expect(signal.get()).toBe(obj);
    
    signal.set({ a: 2 });
    expect(signal.get()).toEqual({ a: 2 });
  });

  it('should handle arrays correctly', () => {
    const arr = [1, 2, 3];
    const signal = createSignal(arr);
    expect(signal.get()).toEqual([1, 2, 3]);
    
    signal.set([4, 5, 6]);
    expect(signal.get()).toEqual([4, 5, 6]);
  });
});

describe('createSignalWithEquality', () => {
  it('should use custom equality function', () => {
    const signal = createSignalWithEquality(
      { count: 0 },
      (prev, next) => prev.count === next.count
    );
    
    const fn = vi.fn();
    signal.subscribe(fn);
    
    signal.set({ count: 0 });
    expect(fn).not.toHaveBeenCalled();
    
    signal.set({ count: 1 });
    expect(fn).toHaveBeenCalledWith({ count: 1 });
  });

  it('should skip update when custom equality returns true', () => {
    const signal = createSignalWithEquality(0, (a, b) => a === b);
    
    const fn = vi.fn();
    signal.subscribe(fn);
    
    signal.set(0);
    expect(fn).not.toHaveBeenCalled();
  });
});
