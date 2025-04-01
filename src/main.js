import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { definePreset } from '@primeuix/themes'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
    },
  },
})
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
  options: {
    //enable dark mode if ready to use it
    // darkModeSelector: '.my-app-dark',
    darkModeSelector: false || 'none',
  },
})

app.use(pinia)
app.use(router)
app.mount('#app')
