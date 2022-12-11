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

// Font
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Data Table 
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

// Slider
import VueSplide from '@splidejs/vue-splide';

library.add(fas, fab);
app.component("font-awesome-icon", FontAwesomeIcon);

app.component("EasyDataTable", Vue3EasyDataTable);
app.use(VueCookies);
app.config.devtools = false

app.use(new VueSocketIO({
    connection: SOCKETIO('https://api.bluebox.website',{
        extraHeaders: {
          "access_token": cookies.get('access_token')
        }
      }),
  })
)

app.use(VueSplide)
app.use(store)
app.use(router)
app.mount('#app')