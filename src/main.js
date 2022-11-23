import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from '/src/store/index.js'
import router from './router/index'

// WS Connection
import VueSocketIO from 'vue-3-socket.io';
import SOCKETIO from 'socket.io-client'
const app = createApp(App)

app.use(new VueSocketIO({
    connection: SOCKETIO('https://api.bluebox.website', {
        extraHeaders: {
          "access_token": localStorage.getItem("access_token")
        }
      }),
  })
)

app.use(store)
app.use(router)
app.mount('#app')