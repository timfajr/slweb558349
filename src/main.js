import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from '/src/store/index.js'
import router from './router/index'
import VuePlayerPlugin from "vue-youtube-iframe-api";

const app = createApp(App)

app.use(VuePlayerPlugin)
app.use(store)
app.use(router)
app.mount('#app')