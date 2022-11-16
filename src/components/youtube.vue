<template>
  <div class="w-screen h-screen flex flex-col">
    <Navbar />
    <div class="flex flex-col place-items-center items-center">
      <div class="flex" ref="player" />
      <button class="bg-red-500" @click="$router.push('/')"> Home </button>
      <div>
        <p>{{wsdata.status}}</p>
        <p>{{wsdata.host}}</p>
        <p>{{wsdata.user}}</p>
        <p>{{wsdata.currentime}}</p>
        <p>{{wsdata.videotime}}</p>
        <p>{{wsdata.totaluser}}</p>
      </div>
    </div>
  </div>
</template>

<script setup scope>
import Navbar from "/src/components/Navbar.vue"
import router from '/src/router/index'
import { usePlayer , PlayerState } from '@vue-youtube/core'
import io from 'socket.io-client'
import { onMounted, reactive, ref, watch } from "vue"

const socket = io('http://localhost:3000')
const nameUpdatesCount = ref(0);
const wsdata = reactive({status:'Stopped', host: '', user: '', currentime: '', videotime: '', totaluser: ''});

const player = ref();  

const { onReady, onStateChange } = usePlayer(videoId, player, {
  cookie: false,
  playerVars: {
    mute: 0,  
    width: screen.width,
    height: screen.height
  },
});

function setupSocket() {
          socket.on('connect', function () {
            console.log('connected')
          })
        }
        socket.on('newData', (data) => {
          wsdata.list.push(data)
          })
          socket.on('videotime', (data) => {
            wsdata.videotime = data
          })
          socket.on('status', (data) => {
            wsdata.status = data
          })
          socket.on('host', (data) => {
            wsdata.host = data
          })
          socket.on('totaluser', (data) => {
            console.log("totaluser : " + data)
            wsdata.totaluser = data
            console.log(wsdata.totaluser)
          })
          socket.on('disconnect', function () {
            console.log('disconnected')
          })

onMounted(() => {
  Updateuser()
  setupSocket()
})

onStateChange((event) => {
  if (event.data == PlayerState.ENDED) {
    router.push('/')
    socket.emit('status', "Ended")
    if(wsdata.host == wsdata.user)
            {
                socket.emit('videotime', 0)
            }
  }
  if (event.data == PlayerState.PLAYING) {
    wsdata.status = "Playing";
    socket.emit('host', wsdata.user)
    socket.emit('status', "Playing")
    if(wsdata.host == wsdata.user)
            {
                socket.emit('videotime', event.target.getCurrentTime())
            }
  }
  if (event.data == PlayerState.PAUSED) {
    socket.emit('host', wsdata.user)
    socket.emit('status', "Paused")
    if(wsdata.host == wsdata.user)
            {
                socket.emit('videotime', event.target.getCurrentTime())
            }
    }
}); 

onReady((event) => {
  event.target.playVideo();
});

watch(() => wsdata.status,
  (status) => {
          const video = document.querySelector('iframe');
          console.log(video)
          if(status == "Paused"){
            video.target.playVideo();
          }
          if(status == "Playing"){
            video.target.playVideo();
          }
          if(status == "Stopped"){
            video.target.playVideo();
          }
  }
)

function Updateuser() {
          wsdata.user = "user" + parseInt(99999*Math.random())
          }
</script>
