import '@/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  aliases: {
    PrimaryButton: components.VBtn,
    SecondaryButton: components.VBtn,
  },
  defaults: {
    VCard: {
      class: 'card-class',
    },
    PrimaryButton: {
      class: 'primary-button',
      elevation: '0',
    },
    SecondaryButton: {
      class: 'secondary-button',
      elevation: '0',
    },
    VTextField: {
      variant: 'outlined',
      hideDetails: 'auto',
      density: 'compact',
    },
  },
})

const pinia = createPinia()

createApp(App).use(vuetify).use(pinia).use(router).mount('#app')
