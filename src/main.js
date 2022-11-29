import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from '/src/store/index.js'
import router from './router/index'
import VueCookies from "vue3-cookies";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

// WS Connection
import VueSocketIO from 'vue-3-socket.io';
import SOCKETIO from 'socket.io-client'
const app = createApp(App)

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
app.component("EasyDataTable", Vue3EasyDataTable);
app.use(VueCookies);

app.use(new VueSocketIO({
    connection: SOCKETIO('https://api.bluebox.website', {
        extraHeaders: {
          "access_token": cookies.get('access_token')
        }
      }),
  })
)

app.use(store)
app.use(router)
app.mount('#app')