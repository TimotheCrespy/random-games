import { createApp } from 'vue'
import App from './App.vue'

import "@/styles/animations.scss"
import "@/styles/main.scss"
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
