import './style/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import VueApexCharts from 'vue3-apexcharts'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ''
    }
  },

})

app.mount('#app')
