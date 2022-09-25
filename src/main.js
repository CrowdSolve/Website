import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import Toaster from '@meforma/vue-toaster'

const app = createApp(App)
app.use(Toaster)
app.mount('#app')
