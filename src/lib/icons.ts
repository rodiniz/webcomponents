import feather from 'feather-icons';

export type IconName = keyof typeof feather.icons;

export const ICONS = Object.keys(feather.icons) as IconName[];

export const ICON_ALIASES: Record<string, IconName> = {
  'arrow-down': 'arrow-down',
  'arrow-left': 'arrow-left',
  'arrow-right': 'arrow-right',
  'arrow-up': 'arrow-up',
  'chevron-down': 'chevron-down',
  'chevron-left': 'chevron-left',
  'chevron-right': 'chevron-right',
  'chevron-up': 'chevron-up',
  'check': 'check',
  'close': 'x',
  'copy': 'copy',
  'delete': 'trash-2',
  'download': 'download',
  'edit': 'edit',
  'error': 'alert-circle',
  'eye': 'eye',
  'eye-off': 'eye-off',
  'home': 'home',
  'info': 'info',
  'menu': 'menu',
  'minus': 'minus',
  'more': 'more-horizontal',
  'plus': 'plus',
  'search': 'search',
  'settings': 'settings',
  'success': 'check-circle',
  'upload': 'upload',
  'warning': 'alert-triangle',
};
