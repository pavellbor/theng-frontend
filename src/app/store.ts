import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { Router } from 'vue-router'
import { router } from './router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $router: Router
  }
}

export const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
pinia.use(({ store }) => {
  store.$router = router
})
