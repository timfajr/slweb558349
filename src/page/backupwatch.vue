<template>
    <body class="flex w-screen flex-col h-screen">
      <Navbar class="absolute top-0 left-0 z-20" />
      <div class="flex justify-center">
        <video
        class="w-screen h-screen aspect-video justify-center justify-items-center bg-black"
        :src="this.list.url"
        :poster="this.list.imageurl"
        width="screen.width"
        controls controlsList="nodownload noremoteplayback nofullscreen" ></video>
      </div>
    </body>
</template>
<script>
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
      video.currentTime = this.videotime
      video.pause()
    }
    if(this.status == "Playing"){
      video.currentTime = this.videotime
      video.play()
    }
    if(this.status == "Stopped"){
      video.currentTime = this.videotime
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
      }, 5000)
      }
      else {
        this.$router.push({ path: this.page })
      }
      const video = document.querySelector('video');
      video.onloadstart= (event) => {
        video.currentTime = this.videotime
        if (this.status == "Playing") {
          video.play()
        }
        if (this.status == "Paused") {
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
    video.onseeking = (event)=> {
      if( this.host == this.user )
      {
        console.log("seeking")
        this.currenttime = video.currentTime
        this.$socket.emit('videotime', {
          roomid : this.$route.params.roomid ,
          videotime : video.currentTime
      })
      }
    }
    video.onpause = (event) => { 
      video.currentTime = this.videotime
      console.log("paused")
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
      if (this.host == this.user){
        this.$socket.emit('videotime', {
              roomid : this.$route.params.roomid ,
              videotime : video.currentime
      })
      }
      this.$socket.emit('status', 
      {
          roomid : this.$route.params.roomid ,
          status : "Playing"
      })
      }
    },
    duration(){
      const video = document.querySelector('video');
      video.ontimeupdate = (event) => {
      this.currentime = this.videotime
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