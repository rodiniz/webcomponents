import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export { html, css, unsafeCSS, nothing } from 'lit';

// EventEmitter-like class for outputs
export class EventEmitter<T = any> {
  private listeners: Array<(data: T) => void> = [];

  emit(data: T): void {
    this.listeners.forEach(listener => listener(data));
  }

  subscribe(listener: (data: T) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

// Base class for Angular-like components with lit-html
export abstract class TemplateUrlComponent extends LitElement {
  // Track if component is initialized
  private _initialized = false;
  
  // Store for outputs
  private _outputs: Map<string, EventEmitter> = new Map();

  // Lifecycle state
  protected get initialized(): boolean {
    return this._initialized;
  }

  // Constructor - initialize outputs
  constructor() {
    super();
    this.initializeOutputs();
  }

  // Initialize @Output decorators
  private initializeOutputs(): void {
    const prototype = Object.getPrototypeOf(this);
    const outputKeys = Object.getOwnPropertyNames(prototype).filter(
      key => (this as any)[key] instanceof EventEmitter
    );
    
    outputKeys.forEach(key => {
      this._outputs.set(key, (this as any)[key]);
    });
  }

  // Connected callback - Angular ngOnInit
  connectedCallback(): void {
    super.connectedCallback();
    if (!this._initialized) {
      this.ngOnInit?.();
      this._initialized = true;
    }
  }

  // Will update - Angular ngOnChanges equivalent
  protected willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.size > 0) {
      const changes: Record<string, { previousValue: any; currentValue: any }> = {};
      changedProperties.forEach((value, key) => {
        changes[key as string] = {
          previousValue: value,
          currentValue: (this as any)[key as string]
        };
      });
      this.ngOnChanges?.(changes);
    }
  }

  // Disconnected callback - Angular ngOnDestroy
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.ngOnDestroy?.();
  }

  // Abstract method - must be implemented
  abstract getTemplate(): TemplateResult;

  // Default render - uses getTemplate
  render() {
    return this.getTemplate();
  }

  // Lifecycle hooks (override in subclasses)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit?(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnChanges?(changes: Record<string, { previousValue: any; currentValue: any }>): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnDestroy?(): void {}

  // Query decorator helpers (like ViewChild)
  @query('*') 
  protected queryElement(selector: string): Element | null {
    return this.shadowRoot?.querySelector(selector) ?? null;
  }

  protected queryAll(selector: string): Element[] {
    const nodes = this.shadowRoot?.querySelectorAll(selector);
    return nodes ? Array.from(nodes) : [];
  }

  // Event emitter factory (like Angular's @Output)
  protected createOutput<T = any>(name?: string): EventEmitter<T> {
    const emitter = new EventEmitter<T>();
    if (name) {
      this._outputs.set(name, emitter as EventEmitter);
    }
    return emitter;
  }

  // Helper to emit events (like Angular's EventEmitter.emit)
  protected emit<T>(name: string, data?: T): void {
    const emitter = this._outputs.get(name);
    if (emitter) {
      (emitter as EventEmitter<T | undefined>).emit(data);
    }
  }
}

// Decorator factories for Angular-like syntax
export function Input(propertyOptions?: { attribute?: string; reflect?: boolean }) {
  return property(propertyOptions);
}

export function Output() {
  return function(target: Object, propertyKey: string): void {
    let emitter: EventEmitter | undefined;
    Object.defineProperty(target, propertyKey, {
      get(): EventEmitter {
        if (!emitter) {
          emitter = new EventEmitter();
        }
        return emitter;
      },
      set(value: EventEmitter): void {
        emitter = value;
      },
      configurable: true,
      enumerable: true
    });
  };
}

// Content projection helpers
export function contentSlot(name?: string): TemplateResult {
  if (name) {
    return html`<slot name="${name}"></slot>`;
  }
  return html`<slot></slot>`;
}

// Export common lit utilities
export { customElement, property, state, query, unsafeHTML };
