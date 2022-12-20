<template>
<div class="bg-mainblue min-h-screen h-full overflow-x-hidden relative">
  <Loadingspinner v-if="this.loading == 'true' " />
  <Navbar  />
  <div class="flex flex-col h-full pb-20">
    <!--
    Wrapper
    -->
    <div class="w-10/12 self-center items-center">
      <div class="flex flex-row justify-between mt-5">
      <div class="text-xl font-semibold text-white p-2 "> New Releases </div>
      </div>
      <Splide :options="{ rewind: true, perPage:3 }"
      class="mt-5 p-2 bg-white bg-opacity-10 rounded-2xl">
          <SplideSlide v-for="slide in latest" :key="slide" class="p-4">
            <div class="carousel__item ">
            <VideoListItem
            :video="slide"
            :key="slide"
            @slideSelect="onSlideSelect"
            />
            </div>
          </SplideSlide>
      </Splide>
      </div>
    <!--
    Wrapper
    -->
    <div v-if="topicks" class="w-10/12 self-center items-center">
      <div class="flex flex-row justify-between mt-5">
      <div class="text-xl font-semibold text-white p-2 "> Popular Movie </div>
      </div>
      <Splide :options="{ rewind: true, perPage:3 }"
      class="mt-5 p-2 bg-white bg-opacity-10 rounded-2xl">
          <SplideSlide v-for="slide in topicks" :key="slide" class="p-4">
              <VideoListItem
              :video="slide"
              :key="slide.id"
              @slideSelect="onSlideSelect"
              ></VideoListItem>
          </SplideSlide>
      </Splide>
      </div>
    <!--
    Wrapper
    -->
    <div class="w-10/12 self-center items-center">
      <div class="flex flex-row justify-between mt-5">
      <div class="text-xl font-semibold text-white p-2 "> Movie By Genre </div>
        <select v-model="selectedgenre" id="genre" class="p-2 rounded-xl">
          <option hidden disabled selected value>Genre List</option>
          <option v-for="i in genrelist" :key="i">
              {{ i }}
          </option>
      </select>
      </div>
      <Splide :options="{ rewind: true, perPage:3 }"
      class="mt-5 p-2 bg-white bg-opacity-10 rounded-2xl">
          <SplideSlide v-for="slide in genre" :key="slide" class="p-4">
              <VideoListItem
              :video="slide"
              :key="slide.id"
              @slideSelect="onSlideSelect"
              ></VideoListItem>
          </SplideSlide>
      </Splide>
      </div>
    <!--
    Wrapper
    -->
    </div>
</div>

</template>

<script>
// Cookies
import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()

import Navbar from "/src/components/Navbar.vue";
import VideoListItem from "/src/components/store/carouselitem.vue";
import Loadingspinner from "/src/components/loading.vue";

// Dep
import axios from "axios";
import '@splidejs/vue-splide/css';

export default {
        name: 'App',
        data() {
          return {
            user: '',
            ready: 'no',
            page: '',
            host: '',
            status: 'Stopped',
            currentime: '0',
            videotime:'0',
            totaluser:'0',
            genre:[],
            topicks:[],
            latest:[],
            genrelist:[],
            selectedvideo: [],
            selectedgenre: '',
            loading: 'true'
          }
        },
        components : {
            Navbar,
            VideoListItem,
            Loadingspinner
  },
  watch:{
      page: function () {
          if ( this.page != "/" + this.$route.params.token + "/" + this.$route.params.roomid ){
            this.$router.push( { path: cookies.get("page") } )
            console.log( "page hit" )
          }
      },
      selectedgenre: function (){
        const api = "https://api.bluebox.website/movie/getgenre?genre=" + this.selectedgenre
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                console.log('changed')
                this.genre = response.data.data
            })
      }
	},
  mounted(){
    this.Setupctx(),
    this.topPicks(),
    this.genreList(),
    this.genreStartup(),
    this.Latest()
  },
  methods:{
    onSlideSelect(slide){
        this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/movie/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/" + slide._id
        })
    },
    Setupctx(){
            this.$cookies.set('access_token',this.$route.params.token );
            this.$cookies.set('roomid',this.$route.params.roomid );
            if (this.ready === "no")
            {
              this.$cookies.set('access_token',this.$route.params.token );
              this.$cookies.set('roomid',this.$route.params.roomid );
              setInterval(() => {
              if (this.ready === "no"){
                this.$router.go(0)
              }
            }, 7500)
        }
    },
    Latest(){
        const api = `https://api.bluebox.website/movie/getAll?sortBy=-created_at`
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.latest = response.data.data
                this.loading = "false"
            })
    },
    topPicks(){
        const api = `https://api.bluebox.website/movie/getTop?sortBy=-created_at`
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.topicks = response.data.data
            })
    },
    genreList(){
        const api = "https://api.bluebox.website/genre"
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.genrelist = response.data.data
            })
    },
    genreStartup(){
        const api = "https://api.bluebox.website/movie/getgenre?genre=" + "biography"
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                console.log(response)
                this.genre = response.data.data
            })
    },
    selectedGenre(){
        const api = "https://api.bluebox.website/movie/getgenre?genre=" + this.selectedgenre
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                console.log(response)
                this.genre = response.data.data
            })
      },
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
    page(data) {
      this.ready = "yes"

      // check new token
      const check = this.$route.params.token
      const check2 = (data.split('/'))
      if (data && check2[2] != check){
        this.$socket.emit('page', {
          roomid : this.$route.params.roomid ,
          page : "/home/" + this.$route.params.token + "/" + this.$route.params.roomid
        })
      }
      if (data && check2[2] == check)
        {
          this.page = data
          cookies.set("page", data)
      }

      // check if data exist
      if ( !data ){
      this.$socket.emit('page', {
          roomid : this.$route.params.roomid ,
          page : "/home/" + this.$route.params.token + "/" + this.$route.params.roomid
      })
      }
    },
    usercount(data) {
      this.totaluser = data
    },
},
}
</script>