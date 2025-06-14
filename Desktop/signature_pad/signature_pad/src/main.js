import './assets/main.css'

import { createApp } from 'vue'
import VueSignaturePad from 'vue-signature-pad'

import App from './App.vue'

const app = createApp(App)
app.use(VueSignaturePad)
app.mount('#app')
