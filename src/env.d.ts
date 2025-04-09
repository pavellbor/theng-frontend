/// <reference types="vite/client" />

declare module 'primevue/button' {
  export interface ButtonSlots {
    default: (props: { class: string }) => any
  }
} 