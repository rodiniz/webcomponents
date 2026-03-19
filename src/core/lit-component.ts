import { LitElement, html as litHtml, TemplateResult, SVGTemplateResult, nothing, render, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Signal, createSignal } from './signal-functions';

export { nothing, render, css } from 'lit';
export { unsafeHTML, customElement, property, state, query };

export type TemplateResultType = TemplateResult | SVGTemplateResult | typeof nothing;

function unwrapSignal<T>(value: Signal<T> | T): T {
  if (value && typeof value === 'object' && 'get' in value) {
    return (value as Signal<T>).get();
  }
  return value as T;
}

export function html(strings: TemplateStringsArray, ...values: unknown[]): TemplateResult {
  const unwrappedValues = values.map(v => {
    if (v && typeof v === 'object' && 'get' in v && 'set' in v) {
      return (v as Signal<unknown>).get();
    }
    return v ?? nothing;
  });
  return litHtml(strings, ...unwrappedValues);
}

export function svg(strings: TemplateStringsArray, ...values: unknown[]): SVGTemplateResult {
  const unwrappedValues = values.map(v => {
    if (v && typeof v === 'object' && 'get' in v && 'set' in v) {
      return (v as Signal<unknown>).get();
    }
    return v ?? nothing;
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return litHtml(strings, ...unwrappedValues) as any;
}

export function ifDefined<T>(value: T | Signal<T> | undefined | null): typeof nothing | T {
  const unwrapped = value && typeof value === 'object' && 'get' in value 
    ? (value as Signal<T>).get() 
    : value as T | undefined | null;
  if (unwrapped === undefined || unwrapped === null) {
    return nothing;
  }
  return unwrapped;
}

export function classMap(classes: Record<string, boolean | Signal<boolean>>): string {
  return Object.entries(classes)
    .filter(([_, condition]) => unwrapSignal(condition))
    .map(([name]) => name)
    .join(' ');
}

export function styleMap(styles: Record<string, string | Signal<string>>): string {
  return Object.entries(styles)
    .filter(([_, value]) => unwrapSignal(value) !== '')
    .map(([name, value]) => `${name}: ${unwrapSignal(value)}`)
    .join('; ');
}

export function repeat<T>(
  items: T[] | Signal<T[]>,
  keyFn: (item: T, index: number) => string,
  template: (item: T, index: number) => TemplateResultType
): TemplateResultType[] {
  const unwrapped = unwrapSignal(items);
  return unwrapped.map((item, index) => template(item, index));
}

export function live<T>(value: T | Signal<T>): T {
  return unwrapSignal(value);
}

export type { Signal };
export { createSignal };

@customElement('base-element')
export class LitComponent extends LitElement {
  static styles = css`:host { display: block; }`;

  useSignal<T>(initial: T): Signal<T> {
    return createSignal(initial);
  }

  useSignalWithEquality<T>(initial: T, equals: (prev: T, next: T) => boolean): Signal<T> {
    return createSignal(initial, { equals });
  }
}
