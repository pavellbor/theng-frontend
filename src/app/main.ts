import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { useAuthStore } from '@/entities/auth'
import { setupApiInterceptors } from '@/shared/libs/api'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { pinia } from './store'
import { theme } from './theme'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, { theme })
app.use(ToastService)

setupApiInterceptors(useAuthStore())

app.mount('#app')
