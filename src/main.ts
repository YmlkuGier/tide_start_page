import { createApp } from 'vue'
import './style/color.css'
import './style/fonts.css'
import './style/layout.css'
import router from "./router";
import App from './App.vue'

createApp(App)
    .use(router)
    .mount('#app')
