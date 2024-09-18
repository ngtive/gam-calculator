
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import VueApexCharts from 'vue3-apexcharts'
import './style/index.css'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  },

})

app.mount('#app')
