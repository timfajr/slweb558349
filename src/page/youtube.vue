<template>
  <div class="w-screen h-screen flex flex-col">
    <Navbar />
    <div class="flex flex-col place-items-center items-center justify-center pt-8 pb-6">
      <div class="flex" id="player" :videoId='videoId'/>  
        <div class="flex justify-end w-2/3 pt-4 text-gray-300 font-normal" id="app">
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
  </div>
</template>

<script>
import io from 'socket.io-client'
import { ref } from 'vue'
import axios from 'axios'
const socket = io('http://localhost:3000')
import Navbar from "/src/components/Navbar.vue"
    export default {
        props: ['id'],
        data: function() {
            return {
        videoTitle: '',
        duration: '',
        videoId: 'ZbU2szTYnE8',
        user: '',
        host: '',
        ready: 'no',
        status: 'Stopped',
        currentime: '0',
        videotime:'0',
        totaluser:'0'
            }
        },
    mounted() {
        this.Updateuser()
        this.youtube()
        },
    beforeRouteUpdate (to, from) {
        this.Updateuser()
        this.youtube()
    },
    onBeforeRouteUpdate(to, from) {
      this.Updateuser()
      this.youtube()
      console.log("route guard")
    },
    components:{
        Navbar
      },
      methods: {
          getvideoid(){
            video = this.video.id
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
            this.currentime=player.getCurrentTime()
            console.log(player.getCurrentTime())
          },
          async getData() {
           const data = await axios.get('http://localhost:3000/mymovie')
           this.list = data.data
          },
          async Updateuser() {
            this.user = "user" + parseInt(99999*Math.random())
          },

          // Youtubeee ////
          youtube() {
          const socket = io('http://localhost:3000')
          var tag = document.createElement('script');
          tag.src = "http://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          var player;
          window.onYouTubeIframeAPIReady = () => {
            player = new YT.Player('player', {
              height: 720,
              width: 1280,
              playerVars: { 'autoplay': 1, 'controls': 1 },
              videoId: this.videoId,
              events: {
                'onReady': window.onPlayerReady,
                'onStateChange': window.onPlayerStateChange
              }
            });
          }

          window.onPlayerReady = (event) => {
            event.target.playVideo();
          }

          window.onPlayerStateChange = (event) => {
            if (event.data == YT.PlayerState.ENDED) {
                router.push('/')
                socket.emit('status', "Ended")
                if(this.host == this.user)
                        {
                            socket.emit('videotime', 0)
                        }
            }
            if (event.data == YT.PlayerState.PLAYING) {
                this.status = "Playing";
                socket.emit('host', this.user)
                socket.emit('status', "Playing")
                if(this.host == this.user)
                        {
                            socket.emit('videotime', event.target.getCurrentTime())
                        }
            }
            if (event.data == YT.PlayerState.PAUSED) {
                socket.emit('host', this.user)
                socket.emit('status', "Paused")
                if(this.host == this.user)
                        {
                            socket.emit('videotime', event.target.getCurrentTime())
                        }
            }
            if (event.data == YT.PlayerState.UNSTARTED) {
                player.seekTo(this.videotime,true)
                player.playVideo()
            }
          }
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
            if(data == "Paused"){
              player.seekTo(this.videotime, true)
              player.pauseVideo()
            }
            if(data == "Playing"){
              if(this.host != this.user){
                player.playVideo();
              }
            }
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
      },
}
</script>