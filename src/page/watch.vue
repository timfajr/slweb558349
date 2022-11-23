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
      import axios from 'axios'
      export default {
        name: 'App',
        data() {
          return {
            user: '',
            host: '',
            token: '',
            page: '',
            room: '' ,
            videosrc: '',
            videotime:'0',
            ytsrc: '',
            yttime: '',
            status: 'Stopped',
            ytstatus: 'Stopped',
            currentime: '0',
            totaluser:'0',
            list:[]
          }
        },
        components : {
            Navbar
        },
        mounted() {
          this.Setupctx()
          this.play()
          this.pause()
          this.duration()
          this.Updateuser()
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
        },
        page: function (){
          if ( this.page != "/watch/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/play" ){
            this.$router.push({ path: this.page })
          }
        }
        },
        sockets: {
                connect() {
                  console.log('connected')
                },
                disconnect() {
                  console.log('disconnected')
                },

                // Event Controller
                host(data) {
                  if (data){
                    this.host = data
                  }
                },
                status(data) {
                  if (data){
                    this.status = data
                  }
                },
                videosrc(data) {
                  if (data){
                    this.videosrc = data
                  }
                },
                videotime(data) {
                  if (data){
                    this.videotime = data
                  }
                },
                page(data) {
                  if (data){
                    this.page = data
                  }
                },
                usercount(data) {
                  this.totaluser = data
                },
        },
        methods: {
          Decodetoken(){
            // TBA
            const decode = VueJwtDecode.decode(this.$route.params.token)
          },
          Setupctx(){
            if ( this.$route.params.src === "play" ){
              this.room = this.$route.params.roomid
              this.page = "/watch/" + this.$route.params.token + "/" + this.$route.params.roomid + "/play"
              localStorage.setItem('access_token', this.$route.params.token )
              localStorage.setItem('roomid', this.$route.params.roomid )
              this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : this.page
              })
            }
            else {
              this.$router.push({ path: this.page })
            }
          },
          Demovideo(){
            this.$socket.emit('host', {
                roomid : this.$route.params.roomid ,
                host : this.user
            })
            this.$socket.emit('status', {
                roomid : this.$route.params.roomid ,
                status : "Playing"
            })
            this.$socket.emit('videosrc', {
                roomid : this.$route.params.roomid ,
                videosrc : '/src/video/popeye.mp4'
            })
            this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/watch/" + this.$route.params.token + "/" + this.$route.params.roomid + "/play"
            })
            this.$socket.emit('videotime', {
                roomid : this.$route.params.roomid ,
                videotime : 0
            })
            video.play()
          },
          async Updateuser() {
            this.user = "user" + parseInt(99999*Math.random())
          },
          async getData() {
           const data = await axios.get('https://api.bluebox.website/movie/getAll')
           this.list = data.data
          },
          Moviebutton(selectedItem){
            this.$socket.emit('host', {
                roomid : this.$route.params.roomid ,
                host : this.user
            })
            this.$socket.emit('status', {
                roomid : this.$route.params.roomid ,
                status : "Playing"
            })
            this.$socket.emit('videosrc', {
                roomid : this.$route.params.roomid ,
                videosrc : selectedItem.url
            })
            this.$socket.emit('videotime', {
                roomid : this.$route.params.roomid ,
                videotime : "0"
            })
            this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/watch/" + this.$route.params.token + "/" + this.$route.params.roomid + "/play"
            })
            console.log(selectedItem)
          },
          pause(){
          const video = document.querySelector('video');
          video.onpause = (event) => { 
            this.$socket.emit('host', {
                roomid : this.$route.params.roomid ,
                host   : this.user
            })
            this.$socket.emit('status',{ roomid: this.$route.params.roomid, status : "Paused" })}
          },
          play(){
            const video = document.querySelector('video');
            video.onplay = (event) => {
            video.currentTime = this.videotime
              this.$socket.emit('host', {
                roomid : this.$route.params.roomid ,
                host   : this.user
            })
            this.$socket.emit('status', 
            {
                roomid : this.$route.params.roomid ,
                status : "Playing"
            }
            )
            }
          },
          duration(){
            const video = document.querySelector('video');
            video.ontimeupdate = (event) => {
            this.currentime = video.currentTime
            if(this.host == this.user)
            {
              this.$socket.emit('videotime', {
                    roomid : this.$route.params.roomid ,
                    videotime : video.currentTime
                })
            }}
          }
        }
      }
</script>
      