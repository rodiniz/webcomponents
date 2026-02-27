/**
 * DOM Helper utilities for working with custom elements
 */

/**
 * Query and cast a custom element with specific properties
 * @param root - The root element to query from (Document, ShadowRoot, or Element)
 * @param selector - CSS selector for the element
 * @returns The element cast to the specified type, or null if not found
 * 
 * @example
 * ```typescript
 * import { queryElement } from './core/dom-helpers';
 * 
 * // Query a table element
 * const table = queryElement<{ data: { columns: TableColumn[]; rows: TableRow[] } }>(
 *   this.shadowRoot,
 *   '#demo-table'
 * );
 * 
 * if (table) {
 *   table.data = { columns, rows };
 * }
 * ```
 */
export function queryElement<T extends Record<string, any>>(
  root: Document | ShadowRoot | Element | null,
  selector: string
): (HTMLElement & T) | null {
  if (!root) return null;
  
  const element = root.querySelector(selector);
  return element as (HTMLElement & T) | null;
}

/**
 * Query and cast multiple custom elements with specific properties
 * @param root - The root element to query from (Document, ShadowRoot, or Element)
 * @param selector - CSS selector for the elements
 * @returns NodeList of elements cast to the specified type
 */
export function queryElements<T extends Record<string, any>>(
  root: Document | ShadowRoot | Element | null,
  selector: string
): NodeListOf<HTMLElement & T> {
  if (!root) return [] as any as NodeListOf<HTMLElement & T>;
  
  return root.querySelectorAll(selector) as NodeListOf<HTMLElement & T>;
}

/**
 * Get an element by id
 * @param root - The root element to query from (Document, ShadowRoot, or Element)
 * @param id - Element id without '#'
 * @returns The element if found, otherwise null
 */
export function getElementById(
  root: Document | ShadowRoot | Element | null,
  id: string
): HTMLElement | null {
  if (!root) return null;

  return root.querySelector(`#${id}`) as HTMLElement | null;
}

/**
 * Add an event listener by element id
 * @param root - The root element to query from (Document, ShadowRoot, or Element)
 * @param id - Element id without '#'
 * @param eventName - DOM event name (e.g., 'click')
 * @param handler - Event handler function
 * @param options - Optional listener options
 * @returns The element if found, otherwise null
 */
export function addEventListenerById(
  root: Document | ShadowRoot | Element | null,
  id: string,
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions | boolean
): HTMLElement | null {
  if (!root) return null;

  const element = root.querySelector(`#${id}`) as HTMLElement | null;
  if (!element) return null;

  element.addEventListener(eventName, handler, options);
  return element;
}

/**
 * Type-safe helper specifically for ui-table elements
 */
export type UITableElement = HTMLElement & {
  data: {
    columns: Array<any>;
    rows: Array<any>;
  };
};

/**
 * Type-safe helper specifically for ui-pagination elements
 */
export type UIPaginationElement = HTMLElement & {
  total: number;
  currentPage: number;
  pageSize: number;
};

/**
 * Type-safe helper specifically for ui-modal elements
 */
export type UIModalElement = HTMLElement & {
  open(): void;
  close(): void;
};

/**
 * Query a ui-table element
 */
export function queryTable(
  root: Document | ShadowRoot | Element | null,
  selector: string
): UITableElement | null {
  return queryElement<UITableElement>(root, selector);
}

/**
 * Query a ui-pagination element
 */
export function queryPagination(
  root: Document | ShadowRoot | Element | null,
  selector: string
): UIPaginationElement | null {
  return queryElement<UIPaginationElement>(root, selector);
}

/**
 * Query a ui-modal element
 */
export function queryModal(
  root: Document | ShadowRoot | Element | null,
  selector: string
): UIModalElement | null {
  return queryElement<UIModalElement>(root, selector);
}

export type FormValue = string | string[] | boolean | File[];

export type GetFormValuesOptions = {
  includeDisabled?: boolean;
  includeEmpty?: boolean;
};

const FORM_FIELD_SELECTOR = 'input, select, textarea, ui-input, ui-select, ui-date-picker, ui-checkbox, ui-upload';

function resolveFieldName(element: HTMLElement): string {
  return element.getAttribute('name') || element.getAttribute('id') || '';
}

function getCustomElementValue(element: HTMLElement): FormValue {
  const tagName = element.tagName.toLowerCase();
  
  if (tagName === 'ui-checkbox') {
    return element.hasAttribute('checked');
  }

  if (tagName === 'ui-upload') {
    const files = (element as any)?.filesValue;
    if (Array.isArray(files) && files.length > 0) return files;
    return [];
  }

  // Try .value property first (works for ui-input, ui-select, ui-date-picker)
  const valueProperty = (element as any)?.value;
  if (typeof valueProperty === 'string' && valueProperty !== '') {
    return valueProperty;
  }

  // Fall back to value attribute
  const attrValue = element.getAttribute('value');
  if (attrValue) return attrValue;
  
  return '';
}

/**
 * Collect values for all inputs inside a form.
 * Supports native inputs plus ui-input, ui-select, and ui-date-picker.
 */
export function getFormValues(
  form: HTMLFormElement,
  options: GetFormValuesOptions = {}
): Record<string, FormValue> {
  const { includeDisabled = false, includeEmpty = true } = options;
  const values: Record<string, FormValue> = {};
  const checkboxCounts = new Map<string, number>();

  form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach(input => {
    const name = resolveFieldName(input);
    if (!name) return;
    checkboxCounts.set(name, (checkboxCounts.get(name) || 0) + 1);
  });

  const elements = Array.from(form.querySelectorAll<HTMLElement>(FORM_FIELD_SELECTOR));

  for (const element of elements) {
    if (!includeDisabled && ((element as HTMLInputElement).disabled || element.hasAttribute('disabled'))) continue;

    const name = resolveFieldName(element);
    if (!name) continue;

    if (element instanceof HTMLInputElement) {
      const type = element.type;

      if (type === 'checkbox') {
        const count = checkboxCounts.get(name) || 0;
        if (count > 1) {
          const current = (values[name] as string[]) || [];
          if (element.checked) current.push(element.value || 'on');
          values[name] = current;
        } else {
          values[name] = element.checked;
        }
        continue;
      }

      if (type === 'radio') {
        if (element.checked) values[name] = element.value;
        continue;
      }

      if (type === 'file') {
        const files = Array.from(element.files ?? []);
        if (includeEmpty || files.length > 0) values[name] = files;
        continue;
      }

      if (includeEmpty || element.value !== '') {
        values[name] = element.value;
      }
      continue;
    }

    if (element instanceof HTMLSelectElement) {
      if (element.multiple) {
        const selected = Array.from(element.selectedOptions).map(option => option.value);
        if (includeEmpty || selected.length > 0) values[name] = selected;
      } else if (includeEmpty || element.value !== '') {
        values[name] = element.value;
      }
      continue;
    }

    if (element instanceof HTMLTextAreaElement) {
      if (includeEmpty || element.value !== '') values[name] = element.value;
      continue;
    }

    const customValue = getCustomElementValue(element);
    if (includeEmpty || (Array.isArray(customValue) ? customValue.length > 0 : customValue !== '')) {
      values[name] = customValue;
    }
  }

  return values;
}
