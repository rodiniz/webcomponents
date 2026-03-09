export { UIButton } from '../shared/components/button';
export { UIInput } from '../shared/components/input';
export { UITable } from '../shared/components/table';
export { UIDatePicker } from '../shared/components/date-picker';
export { UIPagination } from '../shared/components/pagination';
export { UIModal } from '../shared/components/modal';
export { UISelect } from '../shared/components/select';
export { UICheckbox } from '../shared/components/checkbox';
export { UITabs } from '../shared/components/tabs';
export { UICard } from '../shared/components/card';
export { UIToast } from '../shared/components/toast';
export { UIStepper } from '../shared/components/stepper';
export { UIUpload } from '../shared/components/upload';
export { UIPicklist } from '../shared/components/picklist';
export { UIToggleSwitch } from '../shared/components/toggle-switch';
export { UILink } from '../shared/components/link';
export { UIAccordion } from '../shared/components/accordion';
export { UISpinner } from '../shared/components/spinner';
export { UITooltip } from '../shared/components/tooltip';
export { UIDropdown } from '../shared/components/dropdown';
export { UITreeView } from '../shared/components/treeview';
export { UILayout, UILayoutHeader, UILayoutFooter, UILayoutContent, UILayoutSidebar } from '../shared/components/layout';

// Base Component
export { BaseComponent } from '../core/base-component';
export type { Signal } from '../core/base-component';

// UI Component Base (new utilities)
export { UIComponentBase, UIThemedComponent } from '../core/ui-component-base';

// Event Helpers (new utilities)
export { dispatchCustomEvent, createCustomEvent, getEventDetail } from '../core/event-helpers';
export type { CustomEventOptions } from '../core/event-helpers';

// Icon Helpers (new utilities)
export { renderIcon, getIconSvg, hasIcon, wrapIcon, getAvailableIcons } from '../core/icon-helpers';
export type { FeatherIconOptions } from '../core/icon-helpers';
// Note: IconName type from icon-helpers is aliased to avoid conflict with ./icons

// Class Builders (new utilities)
export { 
  buildSizeClasses, 
  buildStateClasses, 
  buildVariantClasses, 
  buildPositionClasses,
  buildConditionalClasses,
  combineClasses,
  buildIconClasses 
} from '../core/class-builders';
export type { Size, Position, Variant } from '../core/class-builders';

// Click Outside Detection (new utilities)
export { 
  useClickOutside, 
  useClickOutsideMultiple, 
  isEventInElement 
} from '../core/click-outside';
export type { ClickOutsideOptions } from '../core/click-outside';

// Keyboard Helpers (new utilities)
export { 
  onEnterOrSpace,
  onEscape,
  onArrowKeys,
  onKeys,
  onHomeEnd,
  preventKeys,
  hasModifiers,
  moveFocus,
  Keys
} from '../core/keyboard-helpers';
export type { Key } from '../core/keyboard-helpers';

// Validators (new utilities)
export {
  createSizeValidator,
  createVariantValidator,
  createEnumValidator,
  createCustomValidator,
  validateRange,
  validatePositive,
  validateNonEmpty,
  validateArrayLength
} from '../core/validators';

// ARIA Helpers (new utilities)
export {
  ariaExpanded,
  ariaChecked,
  ariaSelected,
  ariaDisabled,
  ariaControls,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaLabel,
  ariaHidden,
  ariaCurrent,
  ariaLive,
  ariaInvalid,
  ariaRequired,
  ariaHasPopup,
  ariaRole,
  ariaValueRange,
  ariaValueText,
  combineAria
} from '../core/aria-helpers';
export type { AriaAttributes } from '../core/aria-helpers';

export type { ButtonVariant, ButtonSize } from '../shared/components/button';
export type { InputType, CustomValidator, ValidationRule } from '../shared/components/input';
export type { TableColumn, TableRow } from '../shared/components/table';
export type { SelectOption } from '../shared/components/select';
export type { TabChangeDetail } from '../shared/components/tabs';
export type { ToastType, ToastPosition, ToastConfig } from '../shared/components/toast';
export type { StepperOrientation, StepperSize, StepperStep, StepChangeDetail, StepState } from '../shared/components/stepper';
export type { PicklistChangeDetail } from '../shared/components/picklist';
export type { LinkVariant } from '../shared/components/link';
export type { AccordionItem } from '../shared/components/accordion';
export type { SpinnerSize, SpinnerVariant } from '../shared/components/spinner';
export type { TooltipPosition, TooltipTrigger } from '../shared/components/tooltip';
export type { DropdownItem, DropdownSize } from '../shared/components/dropdown';
export type { TreeNode, TreeViewOptions, TreeNodeChangedDetail, TreeNodeSelectedDetail } from '../shared/components/treeview';

// HTTP Client
export { http, HTTPClient } from '../core/http';
export type { RequestConfig, ResponseConfig, RequestInterceptor, ResponseInterceptor, ErrorInterceptor } from '../core/http';

// DOM Helpers
export { queryElement, queryElements, queryTable, queryPagination, queryModal, addEventListenerById, getElementById, getFormValues, validateForm } from '../core/dom-helpers';
export type { UITableElement, UIPaginationElement, UIModalElement, FormValue, GetFormValuesOptions, ValidationResult } from '../core/dom-helpers';

// Router
export { createRouter, getPathParams, buildPath, getRoutePath } from '../core/router-lib';
export type { Route } from '../core/router-lib';

// Theme Service
export { applyTheme, getCurrentTheme, THEME_LIST, getThemeList, registerCustomTheme, unregisterCustomTheme, getCustomTheme, getCustomThemes } from '../core/theme-service';
export type { Theme, ThemeName, CustomTheme } from '../core/theme-service';

// Icons
export type { IconName } from './icons';
export { ICONS, ICON_ALIASES } from './icons';
