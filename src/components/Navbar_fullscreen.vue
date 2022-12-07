<template>
    <nav class="bg-mainblue space-x-3 border-b-2 shadow-lg shadow-stone-800 border-gray-300 text-white p-2 pt-6 text-lg font-semibold flex flex-row justify-center justify-items-center w-screen rounded-b-full opacity-0 hover:opacity-80">
      <router-link @click="home" :to="{ name: 'Home', params: { token: this.$cookies.get('access_token') , roomid: this.$cookies.get('roomid')} }">
        Home
    </router-link>
    <router-link @click="store" :to="{ name: 'Store', params: { token: this.$cookies.get('access_token') , roomid: this.$cookies.get('roomid')} }">
      Movies
    </router-link>
    <router-link @click="recent" :to="{ name: 'RecentlyAdded', params: { token: this.$cookies.get('access_token') , roomid: this.$cookies.get('roomid')} }">
      Recently Added
    </router-link>
    <router-link @click="search" :to="{ name: 'search', params: { token: this.$cookies.get('access_token') , roomid: this.$cookies.get('roomid')} }">
      Youtube
    </router-link>
      <!-- Disabled Temporary
      <router-link
        to="/web"
        active-class="p-2 rounded bg-blue-400 text-blue-100"
        >Web</router-link
      >
      <router-link
        to="/movielibrary/"
        active-class="p-2 rounded bg-red-500 text-gray-200"
        >Movielibrary</router-link
      >
      <router-link
        to="/storemovies/"
        active-class="p-2 rounded bg-indigo-500 text-indigo-200"
        >Store Movies</router-link
      >
      <router-link
        to="/requestmovies/"
        active-class="p-2 rounded bg-indigo-500 text-indigo-200"
        >Request Movies</router-link
      >
      -->
    </nav>
  </template>

<script>

// Cookies
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
    name: 'App',
    data() {
      return {
        page: ''
      }
    },
    methods: {
      search(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/search/" + cookies.get("access_token") + "/" + cookies.get("roomid")
            })
      },
      home(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/" + cookies.get("access_token") + "/" + cookies.get("roomid")
            })
      },
      store(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/store/" + cookies.get("access_token") + "/" + cookies.get("roomid")
            })
      },
      recent(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/recent/" + cookies.get("access_token") + "/" + cookies.get("roomid")
            })
      },
    }
}
</script>