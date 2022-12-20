<template>
    <nav class="bg-mainblue text-white p-2 text-lg font-semibold flex flex-row justify space-x-12 justify-center w-screen pt-12 ">
      <div class="space-x-2 flex flex-row justify-center font-normal bg-white bg-opacity-10 rounded-2xl p-2 self-center px-4">
      <div class="flex flex-row p-2">
          <img src="../images/Untitled.png" class="object-contain h-10 w-18 rounded" />
      </div>
      <button :class="{ 'link-active': activate === 'Home'}"
       class="router-link-exact-active router-link-active hover:animate-pulse rounded flex justify-center self-center active:bg-mainyellow" @click="home" :to="{ name: 'Home', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        <div class="flex flex-row p-2 ">
          <font-awesome-icon icon="fa-solid fa-house-chimney" class="bg-mainyellow p-1 w-5 h-5 rounded mr-2" />  Home
        </div>
      </button>
      <button :class="{ 'link-active': activate === 'Store'}"
      class="hover:animate-pulse rounded flex justify-center self-center" @click="store" :to="{ name: 'Store', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        <div class="flex flex-row p-2">
          <font-awesome-icon icon="fa-solid fa-video" class="bg-mainyellow p-1 w-5 h-5 rounded mr-2" />  Movies
        </div>
      </button>
      <button :class="{ 'link-active': activate === 'RecentlyAdded'}"
      class="hover:animate-pulse rounded flex justify-center self-center" @click="recent" :to="{ name: 'RecentlyAdded', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        <div class="flex flex-row p-2">
          <font-awesome-icon icon="fa-solid fa-calendar-check" class="bg-mainyellow p-1 w-5 h-5  rounded mr-2" />  Recently Added
        </div>
      </button>
      <button :class="{ 'link-active': activate === 'search'}"
      class="hover:animate-pulse rounded flex justify-center self-center" @click="search" :to="{ name: 'search', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        <div class="flex flex-row p-2">
          <font-awesome-icon icon="fa-brands fa-youtube" class="bg-mainyellow p-1 w-5 h-5 rounded mr-2" />  Youtube
        </div>
      </button>
      </div>
      <div class="space-x-4 flex flex-row rounded-2xl bg-white bg-opacity-10 p-2 justify-center self-center px-4">
        <button class="hover:animate-pulse p-2 m-2 rounded bg-mainyellow text-mainblue px-4"> <font-awesome-icon icon="bell" /> </button>
        <button @click="myprofile" class="hover:animate-pulse p-2 m-2 rounded bg-mainyellow text-mainblue px-4"> <font-awesome-icon icon="user" /> </button>
      </div>
    </nav>
  </template>

<script lang="js">

export default {
    name: 'App',
    data() {
      return {
        page: '',
        activate : this.$route.name
      }
    },
    methods: {
      search(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/search/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      home(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/home/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      store(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/store/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      recent(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/recent/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      myprofile(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/myprofile/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
    }
}
</script>

<style>
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.link-active{
  background-color: #FCC139;
  color: #234899;
  animation: fadeInOut 1s;
}
.fa-solid{
  color: #234899;
}
.fa-house-chimney{
  color: #234899;
}
.fa-video{
  color: #234899;
}
.fa-calendar-check{
  color: #234899;
}
.fa-youtube{
  color: #234899;
}
</style>