import { describe, it, expect } from 'vitest';
import { html, ifDefined, classMap, styleMap, repeat, createSignal, nothing } from './template';

describe('html template tag', () => {
  it('should create template with strings', () => {
    const template = html`<div>Hello</div>`;
    expect(template.strings).toBeDefined();
    expect(template.strings[0]).toContain('<div>Hello</div>');
  });

  it('should have values array for interpolations', () => {
    const name = 'World';
    const template = html`<div>Hello ${name}</div>`;
    expect(template.values).toBeDefined();
    expect(template.values[0]).toBe('World');
  });

  it('should handle signal values', () => {
    const signal = createSignal('Signal');
    const template = html`<div>${signal}</div>`;
    expect(template.values[0]).toBe('Signal');
  });
});

describe('ifDefined', () => {
  it('should return value when defined', () => {
    expect(ifDefined('hello')).toBe('hello');
    expect(ifDefined(42)).toBe(42);
    expect(ifDefined(0)).toBe(0);
    expect(ifDefined(false)).toBe(false);
  });

  it('should return nothing when undefined', () => {
    expect(ifDefined(undefined)).toBe(nothing);
  });

  it('should return nothing when null', () => {
    expect(ifDefined(null)).toBe(nothing);
  });

  it('should unwrap signal values', () => {
    const signal = createSignal('from signal');
    expect(ifDefined(signal)).toBe('from signal');
    
    const undefinedSignal = createSignal<string | undefined>(undefined);
    expect(ifDefined(undefinedSignal)).toBe(nothing);
  });
});

describe('classMap', () => {
  it('should return empty string for empty object', () => {
    expect(classMap({})).toBe('');
  });

  it('should include truthy classes', () => {
    const result = classMap({ active: true, disabled: false });
    expect(result).toBe('active');
  });

  it('should handle signal values', () => {
    const isActive = createSignal(true);
    const isDisabled = createSignal(false);
    
    const result = classMap({ active: isActive, disabled: isDisabled });
    expect(result).toBe('active');
  });

  it('should filter out false boolean values', () => {
    const result = classMap({ 
      primary: true, 
      secondary: false, 
      tertiary: true 
    });
    expect(result).toBe('primary tertiary');
  });
});

describe('styleMap', () => {
  it('should return empty string for empty object', () => {
    expect(styleMap({})).toBe('');
  });

  it('should format style properties', () => {
    const result = styleMap({ color: 'red', 'font-size': '16px' });
    expect(result).toBe('color: red; font-size: 16px');
  });

  it('should filter empty values', () => {
    const result = styleMap({ color: 'red', margin: '' });
    expect(result).toBe('color: red');
  });

  it('should handle signal values', () => {
    const color = createSignal('blue');
    const result = styleMap({ color });
    expect(result).toBe('color: blue');
  });
});

describe('repeat', () => {
  it('should map array items to templates', () => {
    const items = [1, 2, 3];
    const template = (item: number) => html`<li>${item}</li>`;
    const keyFn = (item: number) => String(item);
    
    const result = repeat(items, keyFn, template);
    expect(result).toHaveLength(3);
  });

  it('should handle signal array', () => {
    const signal = createSignal(['a', 'b']);
    const template = (item: string) => html`<span>${item}</span>`;
    const keyFn = (item: string) => item;
    
    const result = repeat(signal, keyFn, template);
    expect(result).toHaveLength(2);
  });

  it('should provide index to template', () => {
    const items = ['first', 'second'];
    let receivedIndex = -1;
    const template = (_item: string, index: number) => {
      receivedIndex = index;
      return html``;
    };
    
    repeat(items, (item) => item, template);
    expect(receivedIndex).toBe(1);
  });
});
