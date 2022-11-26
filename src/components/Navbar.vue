<template>
    <nav class="bg-gray-300 space-x-3 p-2 pt-10 text-lg font-semibold flex flex-row justify-center justify-items-center w-screen relative">
      <button @click="home">Home</button>
      <button @click="ytsearch">Youtube</button>
      <button @click="watch">Watch</button>
      <button @click="beinsports">Beinsports</button>
      <button @click="upload">Upload Movie</button>
      <button @click="ytwatch">... WatchYT ( dev only ) ...</button>
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
      ytwatch(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/youtube/" + cookies.get("access_token") + "/" + cookies.get("roomid") + "/" + cookies.get('ytsrc')
            })
      },
      beinsports(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/beinsports/" + cookies.get("access_token") + "/" + cookies.get("roomid") + "/play"
            })
      },
      ytsearch(){
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
      upload(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/upload"
            })
      },
      watch(){
        this.$socket.emit('page', {
                roomid : cookies.get("roomid") ,
                page : "/watch/" + cookies.get("access_token") + "/" + cookies.get("roomid") + "/play"
            })
      }
    }
}
</script>