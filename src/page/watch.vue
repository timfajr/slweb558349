<template>
    <body class="flex w-screen flex-col h-screen">
      <Navbar class="absolute top-0 left-0 z-20" />
      <div class="flex justify-center">
        <video
        class="w-screen h-screen aspect-video justify-center justify-items-center bg-black"
        :src="this.list.url"
        :poster="this.list.imageurl"
        width="screen.width"
        allow="autoplay"
        autoplay="true"
        loop
        controls controlsList="nodownload noremoteplayback nofullscreen" ></video>
      </div>
    </body>
</template>
<script scope>
import Navbar from "/src/components/Navbar_fullscreen.vue";
import axios from 'axios'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '

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
      list:[]
    }
  },
  components : {
      Navbar
  },
  mounted() {
    this.click()
    this.Setupctx()
    this.play()
    this.pause()
    this.duration()
    this.Updateuser()
    this.onStartup()
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
    if ( this.$cookies.get("page") != "/watch/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/" + this.$route.params.id ){
      this.$router.push( { path: this.$cookies.get("page") } )
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
          this.ready = "yes"
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
        const api = "https://api.bluebox.website/movie/getid?id=" + this.$route.params.id
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
      if ( this.$route.params.src === "play" ){
        this.room = this.$route.params.roomid
        this.$cookies.set('access_token',this.$route.params.token );
        this.$cookies.set('roomid',this.$route.params.roomid );
      }
      if (this.ready === "no")
      {
        setInterval(() => {
        if (this.ready === "no"){
          console.log("HIT")
          this.$router.go(0)
        }
      }, 10000)
      }
      else {
        this.$router.push({ path: this.page })
      }
      const video = document.querySelector('video');
      video.onload = function() {
      video.currentTime = this.videotime
      video.play()
    }
    },
    async Updateuser() {
      this.user = "user" + parseInt(99999*Math.random())
    },
    pause(){
    const video = document.querySelector('video');
    video.onpause = (event) => { 
      console.log("paused")
      this.$socket.emit('page', {
          roomid : this.$route.params.roomid ,
          page : "/watch/" + this.$route.params.token + "/" + this.$route.params.roomid + "/" +  this.$route.params.id
      })
      this.$socket.emit('host', {
          roomid : this.$route.params.roomid ,
          host   : this.user
      })
      this.$socket.emit('status',{ roomid: this.$route.params.roomid, status : "Paused" })}
      if(this.host == this.user)
      {
        this.$socket.emit('videotime', {
              roomid : this.$route.params.roomid ,
              videotime : video.currentTime
          })
      }
    },
    click(){
      const video = document.querySelector('video');
      video.onclick = (event) =>{
        this.$socket.emit('page', {
          roomid : this.$route.params.roomid ,
          page : "/watch/" + this.$route.params.token + "/" + this.$route.params.roomid + "/" +  this.$route.params.id
      })
        if (video.paused === false) {
          this.$socket.emit('videotime', {
              roomid : this.$route.params.roomid ,
              videotime : video.currentTime
          })
          video.pause();
      } else {
          this.$socket.emit('videotime', {
              roomid : this.$route.params.roomid ,
              videotime : video.currentTime
          })
          video.play();
      }
      }
    },
    play(){
      const video = document.querySelector('video');
      video.onplay = (event) => 
      {
      console.log("played")
      video.currentTime = this.videotime
      this.$socket.emit('page', {
          roomid : this.$route.params.roomid ,
          page : "/watch/" + this.$route.params.token + "/" + this.$route.params.roomid + "/" +  this.$route.params.id
      })
      this.$socket.emit('status', 
      {
          roomid : this.$route.params.roomid ,
          status : "Playing"
      })
      if(this.host == this.user)
      {
        this.$socket.emit('videotime', {
              roomid : this.$route.params.roomid ,
              videotime : video.currentTime
          })
      }
      video.play()
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
  },
}
</script>