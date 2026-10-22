/// <reference types="vite/client" />

declare module 'vue' {
  export interface GlobalComponents {
    'ui-button': import('vue').DefineComponent<{
      variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
      size?: 'sm' | 'md' | 'lg';
    }>;
    'ui-input': import('vue').DefineComponent<{
      label?: string;
      type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
      placeholder?: string;
    }>;
  }
}