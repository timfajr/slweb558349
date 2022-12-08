<template>
  <div class="relative bg-black w-screen h-screen flex flex-col overflow-clip">
    <Navbar class="absolute top-0 left-0 z-20" />
    <div class="flex flex-col place-items-center items-center justify-center absolute z-1 left-0 w-screen h-screen">
      <div class="flex aspect-video w-screen h-screen " id="player" :videoId='videoId'/>  
      <!--
      <div class="flex justify-end w-2/3 pt-4 text-gray-300" id="app">
          <p>User Connected: {{totaluser}}</p>
          <div class="w-2"></div>
          <p>Video Status : {{status}}</p>
          <div class="w-2"></div>
          <p>Video Time : {{videotime}}</p>
          <div class="w-2"></div>
          <p>Host : {{host}}</p>
          <p>User : {{user}}</p>
        </div>
      -->
      </div>  
  </div>
</template>

<script>
import io from 'socket.io-client'
import Navbar from "/src/components/Navbar_fullscreen.vue"
import axios from 'axios'

// Cookies
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '

    export default {
        props: ['id'],
        data: function() {
            return {
        videoTitle: '',
        duration: '',
        videoId: cookies.get("ytsrc") || 'dQw4w9WgXcQ',
        user: '',
        host: '',
        ready: 'no',
        ready2: 'false',
        page: '',
        status: 'Stopped',
        currentime: '0',
        videotime:'0',
        totaluser: 0
            }
        },
    mounted() {
        this.Setupctx()
        this.Updateuser()
        this.youtube()
        },
    components:{
        Navbar
      },
    watch:{
      page: function () {
          if ( cookies.get("page") != "/youtube/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/" + cookies.get('ytsrc') ){
            this.$router.push( { path: cookies.get("page") } )
            console.log( "hit" )
          }
        }
    },
    methods: {
            Setupctx() {
            if ( this.$route.params.src === "play" ){
              this.room = this.$route.params.roomid
              this.$cookies.set('access_token',this.$route.params.token );
              this.$cookies.set('roomid',this.$route.params.roomid );
            }

            if (this.ready === "no")
            {
              this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/youtube/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/" + cookies.get('ytsrc')
                    })
              this.$cookies.set('access_token',this.$route.params.token );
              this.$cookies.set('roomid',this.$route.params.roomid );
              setInterval(() => {
              if (this.ready === "no" / this.ready2 === "no"){
                this.$router.go(0)
              }
            }, 5000)
            }
          },
          async Updateuser() {
            this.user = "user" + parseInt(99999*Math.random())
            if (this.ready === "no")
            {
              this.$route.reload()
            }
          },

          // Youtubeee ////
          youtube() {

          const socket = io('https://api.bluebox.website', { 
            extraHeaders: {
          "access_token": cookies.get("access_token")
          }})

          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          var player;

          window.onYouTubeIframeAPIReady = () => {
            player = new YT.Player('player', {
              height: window.innerHeight,
              width: window.innerWidth,
              allowfullscreen: "false",
              playerVars: { 'controls': 1 , 'rel': 0, 'showinfo': 0 },
              videoId: this.videoId,
              events: {
                'onReady': window.onPlayerReady,
                'onStateChange': window.onPlayerStateChange
              }
            });
          }

          window.onPlayerReady = (event) => {
            this.ready = "yes";
            player.seekTo(this.videotime,true)
            event.target.playVideo();
          }
          window.onPlayerStateChange = (event) => {
            if (event.data == YT.PlayerState.ENDED) {
                socket.emit('ytstatus', {
                        roomid : this.$route.params.roomid ,
                        ytstatus : "Ended"
                        })
                socket.emit('yttime', {
                roomid : this.$route.params.roomid ,
                ytstatus : "0"
                })
                socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/search/"+ this.$route.params.token + "/"+ this.$route.params.roomid
                })
            }

            if (event.data == YT.PlayerState.PLAYING) {
                this.ready = "yes"
                socket.emit('ytstatus', {
                        roomid : this.$route.params.roomid ,
                        ytstatus : "Playing"
                        })
                if(this.host == this.user)
                  {
                    socket.emit('yttime', {
                          roomid : this.$route.params.roomid ,
                          yttime : event.target.getCurrentTime()
                          })
                  }
            }

            if (event.data == YT.PlayerState.PAUSED) {
                this.ready = "yes";
                player.seekTo(this.videotime,true)
                console.log("paused")
                socket.emit('host', {
                        roomid : this.$route.params.roomid ,
                        host : this.user
                        })
                socket.emit('ytstatus', {
                        roomid : this.$route.params.roomid ,
                        ytstatus : "Paused"
                        })
                if(this.host == this.user)
                        {
                          socket.emit('yttime', {
                                  roomid : this.$route.params.roomid ,
                                  yttime : event.target.getCurrentTime()
                                  })
                        }
            }

            if (event.data == YT.PlayerState.UNSTARTED) {
              player.seekTo(this.videotime,true)
                if (this.videotime != player.getCurrentTime()){
                  this.ready = "yes";
                  player.seekTo(this.videotime,true)
                }
            }

          // update time per 0.5 sec
          setInterval(() => {

            if (this.host == this.user){
              socket.emit('yttime', {
                      roomid : this.$route.params.roomid ,
                      yttime : player.getCurrentTime()
                      })
            }
            }, 500)
          }

          socket.on('connect', function () {
            console.log('connected')
          })
          
          socket.on('page', (data) => {

          if(data){
            this.page = data
            cookies.set("page", data)
          }
          })

          socket.on('yttime', (data) => {

            if(data){
              this.videotime = data
              this.ready2= "true"
            }
          })

          socket.on('ytsrc', (data) => {

            if(data){
              this.videoId = data

            }
          })

          socket.on('ytstatus', (data) => {

            if (data) {
              this.status = data
            }

            if(data == "Paused"){
              player.pauseVideo()
            }

            if(data == "Playing" && Math.abs(player.getCurrentTime() - this.videotime - 1) > 5){
              console.log("ghit")
              this.currentime = player.getCurrentTime()
              player.seekTo(this.videotime,true)
              player.playVideo();
            }
          })

          socket.on('host', (data) => {

            if (data) {
              this.host = data
            }
          })

          socket.on('usercount', (data) => {

            this.totaluser = data
          })

          socket.on('disconnect', function () {

            console.log('disconnected')
          })
        }
      },
}
</script>