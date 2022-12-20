import { createRouter, createWebHistory } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import VueJwtDecode from "vue-jwt-decode";

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
import Expired from '/src/page/subscriptionend.vue'

// Admin
import AdminLogin from '/src/page/admin/adminlogin.vue'
import AdminDashboard from '/src/page/admin/dashboard.vue'
import AdminUpload from '/src/page/admin/upload.vue'
import AdminMovies from '/src/page/admin/movie.vue'
import AdminTransaction from '/src/page/admin/transaction.vue'
import icon from '../images/bluebox.png'

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '

const routes = [

    // User
    {
      path: '/home/:token/:roomid/',
      name: 'Home',
      component: async () => await Home,
      meta: {
        title: "Bluebox",
        icon: icon
      },
    },
    
    {
      path: '/youtube/:token/:roomid/:src',
      name: 'Youtube',
      component: async () => await Youtube,
      props: true,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },

    {
      path: '/search/:token/:roomid/',
      name: 'search',
      component: async () => await Search,
      props: true,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },

    {
      path: '/movie/:token/:roomid/:id',
      name: 'Movie',
      component: async () => await Movie,
      props: true,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },
    {
        path: '/watch/:token/:roomid/:vid',
        name: 'Watch_Movie',
        component: async () => await Watchmovie,
        props: true,
        meta: {
          title: "Bluebox",
          icon: icon
        }
    },

    // User Profile
    {
      path: '/myprofile/:token/:roomid',
      name: 'MyProfile',
      component: async () => await MyProfile,
      props: true,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },

    // User Profile
    {
      path: '/checkout/:token/:roomid',
      name: 'Checkout',
      component: async () => await Checkout,
      props: true,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },

    // Store
    {
      path: '/store/:token/:roomid',
      name: 'Store',
      component: async () => await Store,
      props: true,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },

    {
      path: '/recent/:token/:roomid',
      name: 'RecentlyAdded',
      component: async () => await RecentlyAdded,
      props: true,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },

    // Admin
    {
      path: '/admin/login/',
      name: 'AdminLogin',
      component: async () => await AdminLogin,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },
    {
      path: '/admin/dashboard/',
      name: 'AdminDashboard',
      component: async () => await AdminDashboard,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },
    {
      path: '/admin/movies/',
      name: 'AdminMovies',
      component: async () => await AdminMovies,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },
    {
      path: '/admin/transaction/',
      name: 'AdminTransaction',
      component: async () => await AdminTransaction,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },
    {
      path: '/admin/upload/',
      name: 'AdminUpload',
      component: async () => await AdminUpload,
      meta: {
        title: "Bluebox",
        icon: icon
      }
    },

    // Not Found Handler
    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: async () => await NotFound,
    meta: {
      title: "Bluebox",
      icon: icon
    }
    },

    // Expired Page Handler
    {
    path: '/expired/:token/:roomid/',
    name: 'Expired',
    component: async () => await Expired,
    meta: {
      title: "Bluebox",
      icon: icon
    }
    },
  ]
  function subcheck(token) {
    if (token){
      let decoded = VueJwtDecode.decode(token);
      return (decoded.device.timeleft);
    }
  }
  const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active"
  });

  router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    const link = document.querySelector("[rel='icon']")
    link.setAttribute('href',to.meta.icon)
    const datacheck = subcheck(from.params.token)
    if (
    // To Page Check
    to.name !== 'Expired' && to.name !== 'Home' && to.name !== 'MyProfile' && to.name !== 'Checkout'

    // Admin Ignore
    && to.name !== 'AdminLogin' &&  to.name !== 'AdminDashboard' &&  to.name !== 'AdminMovies' &&  to.name !== 'AdminTransaction'
    && to.name !== 'AdminUpload'

    // Logic Start here
    && datacheck <= 0
    )
    {
      next({ path: '/expired/' + from.params.token + "/" + from.params.roomid })
    }
    else next()
  });

export default router;