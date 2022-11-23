<template>
    <nav class="bg-gray-300 space-x-3 p-2 flex flex-row justify-center justify-items-center w-screen relative">
      <a :href="$router.resolve({path: ''}).href" >Home</a>
      <a :href="$router.resolve({path: this.youtube}).href" @click="youtube" >Youtube</a>
      <a :href="$router.resolve({path: this.watch}).href" @click="watch" >Watch</a>
      <a :href="$router.resolve({path: '/upload' }).href" >Upload</a>
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
export default {
    name: 'App',
    data() {
      return {
        page: '',
        watch: '',
        youtube: ''
      }
    },
    methods: {
      youtube(){
        this.page = "/youtube/" + this.$route.params.token + "/" + this.$route.params.roomid + "/play"
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/youtube/" + this.$route.params.token + "/" + this.$route.params.roomid + "/play"
            })
      },
      watch(){
        this.page = "/watch/" + this.$route.params.token + "/" + this.$route.params.roomid + "/play"
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/watch/" + this.$route.params.token + "/" + this.$route.params.roomid + "/play"
            })
      }
    },
    mounted() {
      this.watch = '/watch/' + localStorage.getItem('access_token') +"/" + localStorage.getItem('roomid') + '/play'
      this.youtube = '/youtube/' + localStorage.getItem('access_token') + "/" + localStorage.getItem('roomid') + '/play'
    },
}
</script>