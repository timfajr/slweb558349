import { createRouter, createWebHistory } from "vue-router";

import Home from '/src/page/home.vue'
import Youtube from '/src/page/youtube.vue'
import Watch from '/src/page/watch.vue'
import Upload from '/src/page/upload.vue'
import NotFound from '/src/page/notfound.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/youtube/:token/:roomid/:src',
      name: 'Youtube',
      component: Youtube,
      props: true
    },
    {
        path: '/watch/:token/:roomid/:src',
        name: 'Watch',
        component: Watch,
        props: true
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active"
  });


export default router;