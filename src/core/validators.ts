/**
 * Validators
 * 
 * Reusable validation utilities for component properties and form inputs.
 * Provides consistent validation patterns and error messages.
 */

/**
 * Creates a size validator with fallback to default value.
 * 
 * @param validSizes - Array of valid size values
 * @param defaultSize - Default size to use when invalid
 * @param componentName - Optional component name for better error messages
 * @returns Validator function
 * 
 * @example
 * ```ts
 * const validateSize = createSizeValidator(['sm', 'md', 'lg'], 'md', 'UIButton');
 * 
 * @property({ type: String })
 * get size() { return this._size; }
 * set size(value: 'sm' | 'md' | 'lg') {
 *   this._size = validateSize(value);
 * }
 * ```
 */
export function createSizeValidator<T extends string>(
  validSizes: readonly T[],
  defaultSize: T,
  componentName?: string
): (value: T) => T {
  return (value: T): T => {
    if (!value) return defaultSize;
    
    if (!validSizes.includes(value)) {
      const name = componentName || 'Component';
      console.warn(
        `${name}: Invalid size "${value}". Valid sizes are: ${validSizes.join(', ')}. ` +
        `Falling back to "${defaultSize}".`
      );
      return defaultSize;
    }
    
    return value;
  };
}

/**
 * Creates a variant validator with fallback to default value.
 * 
 * @param validVariants - Array of valid variant values
 * @param defaultVariant - Default variant to use when invalid
 * @param componentName - Optional component name for better error messages
 * @returns Validator function
 * 
 * @example
 * ```ts
 * const validateVariant = createVariantValidator(
 *   ['primary', 'secondary', 'danger'],
 *   'primary',
 *   'UIButton'
 * );
 * ```
 */
export function createVariantValidator<T extends string>(
  validVariants: readonly T[],
  defaultVariant: T,
  componentName?: string
): (value: T) => T {
  return (value: T): T => {
    if (!value) return defaultVariant;
    
    if (!validVariants.includes(value)) {
      const name = componentName || 'Component';
      console.warn(
        `${name}: Invalid variant "${value}". Valid variants are: ${validVariants.join(', ')}. ` +
        `Falling back to "${defaultVariant}".`
      );
      return defaultVariant;
    }
    
    return value;
  };
}

/**
 * Creates a generic enum validator with fallback.
 * 
 * @param validValues - Array of valid values
 * @param defaultValue - Default value to use when invalid
 * @param propertyName - Property name for error messages
 * @param componentName - Optional component name for error messages
 * @returns Validator function
 * 
 * @example
 * ```ts
 * const validatePosition = createEnumValidator(
 *   ['top', 'bottom', 'left', 'right'],
 *   'top',
 *   'position',
 *   'UITooltip'
 * );
 * ```
 */
export function createEnumValidator<T extends string>(
  validValues: readonly T[],
  defaultValue: T,
  propertyName: string = 'value',
  componentName?: string
): (value: T) => T {
  return (value: T): T => {
    if (!value) return defaultValue;
    
    if (!validValues.includes(value)) {
      const name = componentName || 'Component';
      console.warn(
        `${name}: Invalid ${propertyName} "${value}". Valid values are: ${validValues.join(', ')}. ` +
        `Falling back to "${defaultValue}".`
      );
      return defaultValue;
    }
    
    return value;
  };
}

/**
 * Validates that a value is within a numeric range.
 * 
 * @param value - Value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param options - Validation options
 * @returns Validated value or clamped value
 * 
 * @example
 * ```ts
 * set count(value: number) {
 *   this._count = validateRange(value, 0, 100, {
 *     clamp: true,
 *     componentName: 'UIStepper'
 *   });
 * }
 * ```
 */
export function validateRange(
  value: number,
  min: number,
  max: number,
  options: {
    clamp?: boolean;
    propertyName?: string;
    componentName?: string;
  } = {}
): number {
  const { clamp = false, propertyName = 'value', componentName } = options;

  if (value < min || value > max) {
    const name = componentName || 'Component';
    console.warn(
      `${name}: ${propertyName} ${value} is outside allowed range [${min}, ${max}].` +
      (clamp ? ' Clamping to range.' : '')
    );

    if (clamp) {
      return Math.max(min, Math.min(max, value));
    }
  }

  return value;
}

/**
 * Validates that a value is a positive number.
 * 
 * @param value - Value to validate
 * @param options - Validation options
 * @returns Validated value or default
 * 
 * @example
 * ```ts
 * set width(value: number) {
 *   this._width = validatePositive(value, { default: 100 });
 * }
 * ```
 */
export function validatePositive(
  value: number,
  options: {
    default?: number;
    allowZero?: boolean;
    propertyName?: string;
    componentName?: string;
  } = {}
): number {
  const {
    default: defaultValue = 0,
    allowZero = false,
    propertyName = 'value',
    componentName
  } = options;

  const isValid = allowZero ? value >= 0 : value > 0;

  if (!isValid) {
    const name = componentName || 'Component';
    console.warn(
      `${name}: ${propertyName} must be ${allowZero ? 'non-negative' : 'positive'}. ` +
      `Received ${value}. Using default: ${defaultValue}.`
    );
    return defaultValue;
  }

  return value;
}

/**
 * Validates that a string is not empty.
 * 
 * @param value - String to validate
 * @param options - Validation options
 * @returns Validated string or default
 * 
 * @example
 * ```ts
 * set label(value: string) {
 *   this._label = validateNonEmpty(value, {
 *     default: 'Untitled',
 *     componentName: 'UIButton'
 *   });
 * }
 * ```
 */
export function validateNonEmpty(
  value: string,
  options: {
    default?: string;
    trim?: boolean;
    propertyName?: string;
    componentName?: string;
  } = {}
): string {
  const {
    default: defaultValue = '',
    trim = true,
    propertyName = 'value',
    componentName
  } = options;

  const testValue = trim ? value?.trim() : value;

  if (!testValue || testValue.length === 0) {
    if (defaultValue) {
      const name = componentName || 'Component';
      console.warn(
        `${name}: ${propertyName} cannot be empty. Using default: "${defaultValue}".`
      );
    }
    return defaultValue;
  }

  return value;
}

/**
 * Validates an array has at least a minimum number of items.
 * 
 * @param value - Array to validate
 * @param minLength - Minimum required length
 * @param options - Validation options
 * @returns true if valid
 * 
 * @example
 * ```ts
 * set items(value: Item[]) {
 *   if (validateArrayLength(value, 1, { propertyName: 'items' })) {
 *     this._items = value;
 *   }
 * }
 * ```
 */
export function validateArrayLength<T>(
  value: T[],
  minLength: number,
  options: {
    maxLength?: number;
    propertyName?: string;
    componentName?: string;
  } = {}
): boolean {
  const { maxLength, propertyName = 'array', componentName } = options;

  if (!Array.isArray(value)) {
    const name = componentName || 'Component';
    console.warn(`${name}: ${propertyName} must be an array.`);
    return false;
  }

  if (value.length < minLength) {
    const name = componentName || 'Component';
    console.warn(
      `${name}: ${propertyName} must have at least ${minLength} item(s). ` +
      `Received ${value.length}.`
    );
    return false;
  }

  if (maxLength !== undefined && value.length > maxLength) {
    const name = componentName || 'Component';
    console.warn(
      `${name}: ${propertyName} must have at most ${maxLength} item(s). ` +
      `Received ${value.length}.`
    );
    return false;
  }

  return true;
}

/**
 * Creates a custom validator function with consistent error handling.
 * 
 * @param validatorFn - Function that returns true if valid
 * @param errorMessage - Error message to display if invalid
 * @param options - Additional options
 * @returns Validator function
 * 
 * @example
 * ```ts
 * const validateEmail = createCustomValidator(
 *   (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
 *   'Invalid email format',
 *   { componentName: 'UIEmailInput' }
 * );
 * ```
 */
export function createCustomValidator<T>(
  validatorFn: (value: T) => boolean,
  errorMessage: string,
  options: {
    componentName?: string;
    throwError?: boolean;
  } = {}
): (value: T) => boolean {
  const { componentName, throwError = false } = options;

  return (value: T): boolean => {
    const isValid = validatorFn(value);

    if (!isValid) {
      const name = componentName || 'Component';
      const fullMessage = `${name}: ${errorMessage}`;

      if (throwError) {
        throw new Error(fullMessage);
      } else {
        console.warn(fullMessage);
      }
    }

    return isValid;
  };
}
