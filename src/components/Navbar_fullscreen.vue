<template>
    <nav class="bg-mainblue space-x-3 border-b-2 shadow-lg shadow-stone-800 border-gray-300 text-white p-2 pt-6 text-lg font-semibold flex flex-row justify-center justify-items-center w-screen rounded-b-full opacity-0 hover:opacity-80">
      <router-link @click="home" :to="{ name: 'Home', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        Home
    </router-link>
    <router-link @click="store" :to="{ name: 'Store', params: { token: this.$route.params.token , roomid: this.$route.params.roomid } }">
      Movies
    </router-link>
    <router-link @click="recent" :to="{ name: 'RecentlyAdded', params: { token: this.$route.params.token , roomid: this.$route.params.roomid } }">
      Recently Added
    </router-link>
    <router-link @click="search" :to="{ name: 'search', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
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
                page : "/search/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      home(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/home/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      store(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/store/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      recent(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/recent/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
    }
}
</script>