<template>
    <body class="bg-mainblue flex w-screen flex-col h-screen">
      <Navbar />
      <div class="flex justify-center pt-8 pb-6">
        <video
        class="w-2/4 aspect-video justify-center justify-items-center bg-black"
        :src=videosrc
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        width="620"
        autoplay
        loop
        controls controlsList="nodownload"></video>
      </div>
      <div class="flex w-full flex-col justify-center items-center">
        <div class="flex w-2/4 justify-end text-gray-300" id="app">
          <p>User Connected: {{totaluser}}</p>
          <div class="w-2"></div>
          <p>Video Status : {{status}}</p>
          <div class="w-2"></div>
          <p>Video Time : {{ videotime }}</p>
          <p>Video SRC : {{ videosrc }}</p>
          <div class="w-2"></div>
          <p>Host : {{ host }}</p>
          <p>User : {{ user }}</p>
        </div>
      </div>  
        <div class="flex w-full flex-col justify-center items-center">
          <h1 class="font-semibold text-white text-xl p-1 mt-4 px-12 bg-orange-400 rounded-lg"> Movie List </h1>
            <ul class="grid grid-flow-col-dense grid-rows-3 p-2">
            <button @click="Demovideo" class="p-1 m-2 bg-white rounded-lg truncate"> demovideo </button>
            <button @click="Moviebutton(data)" class="p-1 m-2 bg-white rounded-lg truncate" v-for="data in list" :key="data">{{data.name}}</button>
          </ul>
        </div>
    </body>
      </template>
      
      <script scope>
      import Navbar from "/src/components/Navbar.vue";
      import io from 'socket.io-client'
      import axios from 'axios'
      const socket = io('http://api.bluebox.website/')
      export default {
        name: 'App',
        data() {
          return {
            user: '',
            host: '',
            videosrc: '',
            status: 'Stopped',
            currentime: '0',
            videotime:'0',
            totaluser:'0',
            list:[]
          }
        },
        components : {
            Navbar
        },
        mounted() {
          this.setupSocket()
          this.duration()
          this.Updateuser()
          this.play()
          this.pause()
          this.getData()
        },
        watch: {
        status: function () {
          const video = document.querySelector('video');
          if(this.status == "Paused"){
            video.pause()
          }
          if(this.status == "Playing"){
            video.play()
          }
          if(this.status == "Stopped"){
            video.play()
          }
        }
      },
        methods: {
          Demovideo(){
            socket.emit('host', this.user)
            socket.emit('status', "Playing")
            socket.emit('videosrc', '/src/video/popeye.mp4')
            video.play()
          },
          Moviebutton(selectedItem){
            socket.emit('host', this.user)
            socket.emit('status', "Playing")
            socket.emit('videosrc', selectedItem.url)
            video.play()
          },
            pause(){
            const video = document.querySelector('video');
            video.onpause = (event) => {
            socket.emit('status', "Paused")
          };
          },
          play(){
            const video = document.querySelector('video');
            video.onplay = (event) => {
            video.currentTime = this.videotime
            socket.emit('host', this.user)
            socket.emit('status', "Playing")
          };
          },
          duration(){
            const video = document.querySelector('video');
            video.ontimeupdate = (event) => {
            this.currentime=video.currentTime
            if(this.host == this.user)
            {
                socket.emit('videotime', video.currentTime)
            }
          };
          },
          async getData() {
           const data = await axios.get('http://api.bluebox.website/movie/getAll')
           console.log(data.data)
           this.list = data.data
          },
          async Updateuser() {
            this.user = "user" + parseInt(99999*Math.random())
          },
          setupSocket() {
          socket.on('connect', function () {
            console.log('connected')
          })
          socket.on('newData', (data) => {
            this.list.push(data)
          })
          socket.on('videotime', (data) => {
            this.videotime = data
          })
          socket.on('videosrc', (data) => {
            this.videosrc = data
          })
          socket.on('status', (data) => {
            this.status = data
          })
          socket.on('host', (data) => {
            this.host = data
          })
          socket.on('totaluser', (data) => {
            console.log("totaluser : " + data)
            this.totaluser = data
            console.log(this.totaluser)
          })
          socket.on('disconnect', function () {
            console.log('disconnected')
          })
          }
        }
      }
</script>
      