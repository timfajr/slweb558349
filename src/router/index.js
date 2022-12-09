import { createRouter, createWebHistory } from "vue-router";

// Page
import Home from '/src/page/home.vue'
import Youtube from '/src/page/youtube.vue'
import Watchmovie from '/src/page/watch.vue'
import NotFound from '/src/page/notfound.vue'
import Search from '/src/page/search.vue'
import Store from '/src/page/store.vue'
import MyProfile from '/src/page/myprofile.vue'
import Checkout from '/src/page/checkout.vue'
import Movie from '/src/page/movie.vue'
import RecentlyAdded from '/src/page/recent.vue'

// Admin
import AdminLogin from '/src/page/admin/adminlogin.vue'
import AdminDashboard from '/src/page/admin/dashboard.vue'
import AdminUpload from '/src/page/admin/upload.vue'
import AdminMovies from '/src/page/admin/movie.vue'
import AdminTransaction from '/src/page/admin/transaction.vue'

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '

const routes = [

    // User
    {
      path: '/:token/:roomid/',
      name: 'Home',
      component: Home
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
      path: '/movie/:token/:roomid/:id',
      name: 'Movie',
      component: Movie,
      props: true
    },
    {
        path: '/watch/:token/:roomid/:vid',
        name: 'Watch_Movie',
        component: Watchmovie,
        props: true
    },

    // User Profile
    {
      path: '/myprofile/:token/:roomid',
      name: 'MyProfile',
      component: MyProfile,
      props: true
    },

    // User Profile
    {
      path: '/checkout/:token/:roomid',
      name: 'Checkout',
      component: Checkout,
      props: true
    },

    // Store
    {
      path: '/store/:token/:roomid',
      name: 'Store',
      component: Store,
      props: true
    },

    {
      path: '/recent/:token/:roomid',
      name: 'RecentlyAdded',
      component: RecentlyAdded,
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
      path: '/admin/transaction/',
      name: 'AdminTransaction',
      component: AdminTransaction
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
    linkActiveClass: "active"
  });


export default router;