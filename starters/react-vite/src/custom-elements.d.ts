import type { HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-button': HTMLAttributes<HTMLElement> & {
        variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
        size?: 'sm' | 'md' | 'lg';
      };
      'ui-input': HTMLAttributes<HTMLElement> & {
        label?: string;
        type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
        placeholder?: string;
      };
    }
  }
}

export {};