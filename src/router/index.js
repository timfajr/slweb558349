import { createRouter, createWebHistory } from "vue-router";

import Home from '/src/page/home.vue'
import Youtube from '/src/page/youtube.vue'
import Watch from '/src/page/watch.vue'
import NotFound from '/src/page/notfound.vue'
import Search from '/src/page/search.vue'

// Admin
import AdminLogin from '/src/page/admin/adminlogin.vue'
import AdminDashboard from '/src/page/admin/dashboard.vue'
import AdminUpload from '/src/page/admin/upload.vue'
import AdminMovies from '/src/page/admin/movie.vue'

const routes = [
  
    // User
    {
      path: '/:token/:roomid/',
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
      path: '/search/:token/:roomid/',
      name: 'search',
      component: Search,
      props: true
    },

    {
        path: '/watch/:token/:roomid/:src',
        name: 'Watch',
        component: Watch,
        props: true
    },

    // Admin
    {
      path: '/admin/login/',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin/dashboard/',
      name: 'AdminDashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/movies/',
      name: 'AdminMovies',
      component: AdminMovies
    },
    {
      path: '/admin/upload/',
      name: 'AdminUpload',
      component: AdminUpload
    },

    // Not Found Handler
    { path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
    },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active"
  });


export default router;