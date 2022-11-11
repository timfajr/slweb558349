import { createRouter, createWebHistory } from "vue-router";

import Home from '/src/page/home.vue'
import Youtube from '/src/page/youtube.vue'
import Watch from '/src/page/watch.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/youtube',
      name: 'Youtube',
      component: Youtube
    },
    {
        path: '/watch',
        name: 'Watch',
        component: Watch
      },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active"
  });


export default router;