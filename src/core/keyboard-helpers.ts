/**
 * Keyboard Helpers
 * 
 * Utilities for handling keyboard events consistently across components.
 * Provides common patterns for accessibility and keyboard navigation.
 */

/**
 * Common keyboard key names for better readability
 */
export const Keys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete'
} as const;

export type Key = typeof Keys[keyof typeof Keys];

/**
 * Creates a keyboard handler that triggers on Enter or Space.
 * Commonly used for making elements keyboard-accessible.
 * 
 * @param callback - Function to call when Enter/Space is pressed
 * @param options - Configuration options
 * @returns Keyboard event handler
 * 
 * @example
 * ```ts
 * <div
 *   tabindex="0"
 *   @keydown=${onEnterOrSpace(() => this.handleClick())}
 * >
 *   Click me
 * </div>
 * ```
 */
export function onEnterOrSpace(
  callback: (event: KeyboardEvent) => void,
  options: { preventDefault?: boolean; stopPropagation?: boolean } = {}
): (event: KeyboardEvent) => void {
  const { preventDefault = true, stopPropagation = false } = options;

  return (event: KeyboardEvent) => {
    if (event.key === Keys.ENTER || event.key === Keys.SPACE) {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      callback(event);
    }
  };
}

/**
 * Creates a keyboard handler for the Escape key.
 * Commonly used for closing modals, dropdowns, etc.
 * 
 * @param callback - Function to call when Escape is pressed
 * @param options - Configuration options
 * @returns Keyboard event handler
 * 
 * @example
 * ```ts
 * connectedCallback() {
 *   super.connectedCallback();
 *   this.addEventListener('keydown', onEscape(() => this.close()));
 * }
 * ```
 */
export function onEscape(
  callback: (event: KeyboardEvent) => void,
  options: { preventDefault?: boolean; stopPropagation?: boolean } = {}
): (event: KeyboardEvent) => void {
  const { preventDefault = true, stopPropagation = false } = options;

  return (event: KeyboardEvent) => {
    if (event.key === Keys.ESCAPE) {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      callback(event);
    }
  };
}

/**
 * Creates a keyboard handler for arrow keys.
 * Useful for navigation in lists, tabs, etc.
 * 
 * @param handlers - Object mapping arrow keys to callbacks
 * @param options - Configuration options
 * @returns Keyboard event handler
 * 
 * @example
 * ```ts
 * <div @keydown=${onArrowKeys({
 *   up: () => this.selectPrevious(),
 *   down: () => this.selectNext(),
 *   left: () => this.collapseCurrent(),
 *   right: () => this.expandCurrent()
 * })}>
 * ```
 */
export function onArrowKeys(
  handlers: {
    up?: (event: KeyboardEvent) => void;
    down?: (event: KeyboardEvent) => void;
    left?: (event: KeyboardEvent) => void;
    right?: (event: KeyboardEvent) => void;
  },
  options: { preventDefault?: boolean; stopPropagation?: boolean } = {}
): (event: KeyboardEvent) => void {
  const { preventDefault = true, stopPropagation = false } = options;

  return (event: KeyboardEvent) => {
    let handled = false;

    switch (event.key) {
      case Keys.ARROW_UP:
        if (handlers.up) {
          handlers.up(event);
          handled = true;
        }
        break;
      case Keys.ARROW_DOWN:
        if (handlers.down) {
          handlers.down(event);
          handled = true;
        }
        break;
      case Keys.ARROW_LEFT:
        if (handlers.left) {
          handlers.left(event);
          handled = true;
        }
        break;
      case Keys.ARROW_RIGHT:
        if (handlers.right) {
          handlers.right(event);
          handled = true;
        }
        break;
    }

    if (handled) {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
    }
  };
}

/**
 * Creates a generic keyboard handler for specific keys.
 * 
 * @param keys - Array of keys to listen for
 * @param callback - Function to call when any specified key is pressed
 * @param options - Configuration options
 * @returns Keyboard event handler
 * 
 * @example
 * ```ts
 * <input
 *   @keydown=${onKeys(['Enter', 'Tab'], (e) => this.submit())}
 * />
 * ```
 */
export function onKeys(
  keys: string | string[],
  callback: (event: KeyboardEvent) => void,
  options: { preventDefault?: boolean; stopPropagation?: boolean } = {}
): (event: KeyboardEvent) => void {
  const { preventDefault = true, stopPropagation = false } = options;
  const keyArray = Array.isArray(keys) ? keys : [keys];

  return (event: KeyboardEvent) => {
    if (keyArray.includes(event.key)) {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      callback(event);
    }
  };
}

/**
 * Checks if a keyboard event has modifier keys pressed.
 * 
 * @param event - The keyboard event
 * @param modifiers - Object specifying which modifiers to check
 * @returns true if all specified modifiers match
 * 
 * @example
 * ```ts
 * if (hasModifiers(event, { ctrl: true, shift: false })) {
 *   // Ctrl is pressed, Shift is not
 * }
 * ```
 */
export function hasModifiers(
  event: KeyboardEvent,
  modifiers: {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
  }
): boolean {
  const checks = [];

  if (modifiers.ctrl !== undefined) {
    checks.push(event.ctrlKey === modifiers.ctrl);
  }
  if (modifiers.alt !== undefined) {
    checks.push(event.altKey === modifiers.alt);
  }
  if (modifiers.shift !== undefined) {
    checks.push(event.shiftKey === modifiers.shift);
  }
  if (modifiers.meta !== undefined) {
    checks.push(event.metaKey === modifiers.meta);
  }

  return checks.every(check => check);
}

/**
 * Creates a handler for Home/End keys.
 * Useful for jumping to start/end of lists.
 * 
 * @param handlers - Callbacks for Home and End keys
 * @param options - Configuration options
 * @returns Keyboard event handler
 * 
 * @example
 * ```ts
 * <div @keydown=${onHomeEnd({
 *   home: () => this.selectFirst(),
 *   end: () => this.selectLast()
 * })}>
 * ```
 */
export function onHomeEnd(
  handlers: {
    home?: (event: KeyboardEvent) => void;
    end?: (event: KeyboardEvent) => void;
  },
  options: { preventDefault?: boolean; stopPropagation?: boolean } = {}
): (event: KeyboardEvent) => void {
  const { preventDefault = true, stopPropagation = false } = options;

  return (event: KeyboardEvent) => {
    let handled = false;

    if (event.key === Keys.HOME && handlers.home) {
      handlers.home(event);
      handled = true;
    } else if (event.key === Keys.END && handlers.end) {
      handlers.end(event);
      handled = true;
    }

    if (handled) {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
    }
  };
}

/**
 * Prevents default behavior for specific keys.
 * Useful for preventing unwanted scrolling or form submission.
 * 
 * @param keys - Array of keys to prevent default for
 * @returns Keyboard event handler
 * 
 * @example
 * ```ts
 * <div @keydown=${preventKeys(['ArrowUp', 'ArrowDown'])}>
 *   // Prevents page scrolling on arrow keys
 * </div>
 * ```
 */
export function preventKeys(keys: string | string[]): (event: KeyboardEvent) => void {
  const keyArray = Array.isArray(keys) ? keys : [keys];

  return (event: KeyboardEvent) => {
    if (keyArray.includes(event.key)) {
      event.preventDefault();
    }
  };
}

/**
 * Focus management helper for keyboard navigation.
 * Moves focus to the next/previous focusable element.
 * 
 * @param container - Container element to search within
 * @param direction - Direction to move focus ('next' or 'previous')
 * @param options - Configuration options
 * 
 * @example
 * ```ts
 * onArrowKeys({
 *   down: () => moveFocus(this, 'next'),
 *   up: () => moveFocus(this, 'previous')
 * })
 * ```
 */
export function moveFocus(
  container: HTMLElement,
  direction: 'next' | 'previous',
  options: { loop?: boolean; selector?: string } = {}
): void {
  const { loop = true, selector = '[tabindex]:not([tabindex="-1"])' } = options;

  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(selector)
  );

  if (focusableElements.length === 0) return;

  const currentIndex = focusableElements.indexOf(
    document.activeElement as HTMLElement
  );

  let nextIndex: number;

  if (direction === 'next') {
    nextIndex = currentIndex + 1;
    if (nextIndex >= focusableElements.length) {
      nextIndex = loop ? 0 : focusableElements.length - 1;
    }
  } else {
    nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      nextIndex = loop ? focusableElements.length - 1 : 0;
    }
  }

  focusableElements[nextIndex]?.focus();
}
