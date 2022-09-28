import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import Toaster from '@meforma/vue-toaster'
import router from './router'

const app = createApp(App).use(router)
app.use(Toaster)
app.mount('#app')
