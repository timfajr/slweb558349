<template>
  <body class="flex w-screen flex-col h-screen">
    <Navbarfullscreen class="absolute top-0 left-0 z-20" />
    <div class="flex justify-center">
      <video
      class="w-screen h-screen aspect-video justify-center justify-items-center bg-black"
      :src="this.list.url"
      :poster="this.list.imageurl"
      autoplay="autoplay"
      width="screen.width"
      muted
      controls controlsList="autoplay nodownload nofullscreen" ></video>
    </div>
  </body>
</template>
<script>
import Navbarfullscreen from "/src/components/Navbar_fullscreen.vue";
import axios from 'axios'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
name: 'App',
data() {
  return {
    user: '',
    host: '',
    ready: 'no',
    page: '',
    room: '' ,
    videotime:'0',
    status: 'Stopped',
    ytstatus: 'Stopped',
    currentime: '0',
    totaluser:'0',
    seeking:'unactive',
    list:[]
  }
},
components : {
  Navbarfullscreen
},
mounted() {
  this.Setupctx()
  this.onStartup()
  this.click()
  this.play()
  this.pause()
  this.duration()
  this.Updateuser()
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
  if ( this.page != "/watch/" + this.$route.params.token + "/"+ this.$route.params.roomid + "/" + this.$route.params.vid ){
    this.$router.push( { path: this.$cookies.get("page") } )
  }
}
},
sockets: {
    connect() {
      console.log('connected')
      this.ready = "yes"
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
      const video = document.querySelector('video');
      if (data){
        this.status = data
      }
      if(data == "Playing" && Math.abs(video.currentTime - this.videotime - 1) < 5){
        this.ready = 'yes'
        if(this.host == this.user){
        this.$socket.emit('host', {
                  roomid : this.$route.params.roomid ,
                  host : this.user
        })
        this.$socket.emit('videotime', {
                roomid : this.$route.params.roomid ,
                videotime : video.currentTime
        })
        this.seeking = "unactive";
        video.play()
        }
      }
      if( Math.abs(video.currentTime - this.videotime - 1) > 20 && this.seeking == "unactive" ){
        video.currentTime = this.videotime
        console.log("Hit Time")
      }
      console.log(this.videotime)
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
        cookies.set("page", data)
      }
    },
    usercount(data) {
      this.totaluser = data
    },
},
methods: {
  onStartup () {
      const api = "https://api.bluebox.website/movie/getid?id=" + this.$route.params.vid
      axios
          .get(api, {
              headers: {
              'Content-Type': 'application/json',
              'access_token': this.$route.params.token
               }
          })
          .then(response => {
              console.log(response)
              this.list = response.data.data
          })
  },
  Setupctx(){
    const video = document.querySelector('video');
    this.$cookies.set('access_token',this.$route.params.token );
    this.$cookies.set('roomid',this.$route.params.roomid );
    if (this.ready == "no")
    {
      setInterval(() => {
      if (this.ready === "no"){
        console.log("Reload")
        this.$router.go(0)
      }
    }, 15000)
    }
    else {
      this.$router.push({ path: this.page })
    }
    video.onseeking = (event) => {
      this.seeking = "active"
      this.$socket.emit('host', {
                  roomid : this.$route.params.roomid ,
                  host : this.user
        })
        this.$socket.emit('videotime', {
                roomid : this.$route.params.roomid ,
                videotime : video.currentTime
        })
    }
    video.onseeked = (event) => {
      this.seeking = "active"
    }
    video.onload= (event) => {
      const video = document.querySelector('video');
      if (this.status == "Playing") {
        video.currentTime = this.videotime
        video.play()
      }
      if (this.status == "Paused") {
        video.currentTime = this.videotime
        video.paused()
      }
    }
    video.onloadstart= (event) => {
    const video = document.querySelector('video');
      if (this.status == "Playing") {
        video.currentTime = this.videotime
        video.play()
      }
      if (this.status == "Paused") {
        video.currentTime = this.videotime
        video.paused()
      }
    }
    video.onended = (event) => {
      this.$socket.emit('page', {
        roomid : this.$route.params.roomid ,
        page : "/store/" + this.$route.params.token + "/" + this.$route.params.roomid
    })
    }
  },
  async Updateuser() {
    this.user = "user" + parseInt(99999*Math.random())
  },
  pause(){
  const video = document.querySelector('video');
  video.onpause = (event) => { 
    this.$socket.emit('status',{ roomid: this.$route.params.roomid, status : "Paused" })}
  },
  click(){
    const video = document.querySelector('video');
    video.onclick = (event) =>{
      this.$socket.emit('host', {
        roomid : this.$route.params.roomid ,
        host   : this.user
      })
      if ( video.paused === false ) {
        this.$socket.emit('status', 
    {
        roomid : this.$route.params.roomid ,
        status : "Paused"
    })
    video.paused()
    } else {
      this.$socket.emit('status', 
    {
        roomid : this.$route.params.roomid ,
        status : "Playing"
    })
    }
    }
  },
  play(){
    const video = document.querySelector('video');
    video.onplay = (event) => 
    {
    console.log("played")
    this.$socket.emit('status', {
                  roomid : this.$route.params.roomid ,
                  status : "Playing"
    })
    }
    video.play()
  },
  duration(){
    const video = document.querySelector('video');
    video.ontimeupdate = (event) => {
    this.currentime = this.videotime
    if (video.muted == true){
      video.muted = !video.muted;
    }
    if (this.seeking == "active")
    {
       this.$socket.emit('videotime', {
        roomid : this.$route.params.roomid ,
        videotime : video.currentTime
    })
    if(this.host == this.user && Math.abs(video.currentime - this.videotime- 1) < 20){
      this.$socket.emit('host', {
                  roomid : this.$route.params.roomid ,
                  host : this.user
        })
        this.$socket.emit('videotime', {
                roomid : this.$route.params.roomid ,
                videotime : video.currentime
        })
    }
    }
    if( this.host == this.user )
    {
      this.currentime = video.currentTime
      this.$socket.emit('videotime', {
        roomid : this.$route.params.roomid ,
        videotime : video.currentTime
    })
    }}
  }
},
}
</script>