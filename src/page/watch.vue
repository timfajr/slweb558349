<template>
    <body class="flex w-screen flex-col">
      <div class="flex justify-center pt-12 pb-6">
        <video
        class="w-2/4 aspect-video justify-center justify-items-center bg-black"
        src="/src/video/popeye.mp4"
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        width="620"
        autoplay
        loop
        controls></video>
      </div>
      <div class="flex w-full flex-col justify-center items-center">
        <div class="flex w-2/4 justify-end" id="app">
          <p>User Connected: {{totaluser}}</p>
          <div class="w-2"></div>
          <p>Video Status : {{status}}</p>
          <div class="w-2"></div>
          <p>Video Time : {{videotime}}</p>
          <div class="w-2"></div>
          <p>Host : {{host}}</p>
          <p>User : {{user}}</p>
        </div>
      </div>    
        <div>
            <ul>
            <li v-for="data in list" :key="data">{{data}}</li>
          </ul>
        </div>
    </body>
      </template>
      
      <script>
      import io from 'socket.io-client'
      import axios from 'axios'
      const socket = io('http://localhost:3000')
      export default {
        name: 'App',
        data() {
          return {
            user: '',
            host: '',
            status: 'Stopped',
            currentime: '0',
            videotime:'0',
            totaluser:'0',
            list:[]
          }
        },
        mounted() {
          this.setupSocket()
          this.duration()
          this.Updateuser()
          this.play()
          this.pause()
        },
        watch: {
        // whenever question changes, this function will run
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
           const data = await axios.get('http://localhost:3000/mymovie')
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
      