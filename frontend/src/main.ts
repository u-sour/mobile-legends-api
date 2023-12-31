import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authentication } from './plugins/authentication'
import App from './App.vue'
import router from './router'
import config from './config/formkit.config'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import '../src/assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { ToasityConfig } from './config/toasity.config'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import { createHead } from '@unhead/vue'

const app = createApp(App)

app.use(Vue3Toasity, ToasityConfig as ToastContainerOptions)
app.component('EasyDataTable', Vue3EasyDataTable)
app.use(createPinia())
app.use(plugin, defaultConfig(config))
app.use(createHead())
authentication.install().then(() => {
  app.use(router)
  app.mount('#app')
})
