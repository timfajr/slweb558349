<template>
    <div class="bg-mainblue min-h-screen h-full overflow-x-hidden">
        <Navbar />
        <div class="flex flex-col h-full mb-20">
          <!--
          Wrapper
          -->
          <div class="w-8/12 self-center items-center">
            <div class="flex flex-row justify-between mt-10">
            <div class="text-xl font-semibold text-white p-2 "> Latest Movie </div>>
            </div>
            <carousel :itemsToShow="3.92" :wrap-around="true" :snapAlign="center" :transition="500"
            class="mt-5 p-6 bg-white bg-opacity-10 rounded-2xl">
                <slide v-for="slide in latest" :key="slide" class="p-2">
                    <VideoListItem
                    :video="slide"
                    :key="slide.id"
                    @slideSelect="onSlideSelect"
                    ></VideoListItem>
                </slide>
                <template #addons>
                  <Navigation />
                </template>
            </carousel>
            </div>
            <!--
          Wrapper
          -->
          <div class="w-8/12 self-center items-center">
            <div class="flex flex-row justify-between mt-10">
            <div class="text-xl font-semibold text-white p-2 "> Popular Movie </div>>
            </div>
            <carousel :itemsToShow="3.92" :wrap-around="true" :snapAlign="center" :transition="500"
            class="mt-5 p-6 bg-white bg-opacity-10 rounded-2xl">
                <slide v-for="slide in topicks" :key="slide" class="p-2">
                    <VideoListItem
                    :video="slide"
                    :key="slide.id"
                    @slideSelect="onSlideSelect"
                    ></VideoListItem>
                </slide>
                <template #addons>
                  <Navigation />
                </template>
            </carousel>
            </div>
          <!--
          Wrapper
          -->
          <div class="w-8/12 self-center items-center">
            <div class="flex flex-row justify-between mt-10">
            <div class="text-xl font-semibold text-white p-2 "> Movie By Genre </div>
              <select v-model="selectedgenre" id="genre" class="p-2 rounded-xl">
                <option hidden disabled selected value>Genre List</option>
                <option v-for="i in genrelist" :key="i">
                    {{ i }}
                </option>
            </select>
            </div>
            <carousel :itemsToShow="3.92" :wrap-around="true" :snapAlign="center" :transition="500"
            class="mt-5 p-6 bg-white bg-opacity-10 rounded-2xl">
                <slide v-for="slide in genre" :key="slide" class="p-2">
                    <VideoListItem
                    :video="slide"
                    :key="slide.id"
                    @slideSelect="onSlideSelect"
                    ></VideoListItem>
                </slide>
                <template #addons>
                  <Navigation />
                </template>
            </carousel>
            </div>
          <!--
          Wrapper
          -->
            <div class="flex flex-row justify-end w-8/12 self-center items-center">
                <SearchBar @termChange="onTermChange" class='p-4 mb-4 w-1/3 '/>
            </div>
            <div class="border-2 rounded-xl bg-backgroundblue w-8/12 flex flex-col justify-center self-center items-center bg-opacity-50 border-white shadow-xl">
                <div class="h-10 bg-backgroundblue" />
                <VideoList :videos="videos" @videoSelect="onVideoSelect" class="mb-8 "/>
                <div id="pagination">
                    <pagination
                      :totalPages="totalPages"
                      :perPage="rowsPerPage"
                      :currentPage="currentPage"
                      @pagechanged="onPageChange"
                    />
                  </div>
              </div>
            </div>
          </div>  
</template>

<script>
// Cookies
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide , Navigation } from 'vue3-carousel'

// Dep
import axios from "axios";

// Component
import Navbar from "/src/components/Navbar.vue";
import Pagination2 from '/src/components/Pagination.vue'

import WalletButton from "/src/components/store/WalletButton.vue"
import SearchBar from "/src/components/store/SearchBar.vue";
import VideoDetail from "/src/components/store/VideoDetail.vue";
import VideoList from "/src/components/store/VideoList.vue";
import VideoListItem from "/src/components/store/carouselitem.vue";

  export default {
    name: 'App',
    components: {
      Pagination2,
      Navbar,
      SearchBar,
      VideoDetail,
      WalletButton,
      VideoList,
      VideoListItem,
      Carousel, Slide , Navigation
    },
    data () {
      return {
        currentPage: 1,
        totalPages: 0,
        rowsPerPage : 24,
        page: '',
        ready: 'no',
        host: '',
        user: '',
        videos: [],
        selectedvideo: [],
        totaluser:'0',
        genre:[],
        topicks:[],
        latest:[],
        genrelist:[],
        selectedgenre: ''
      };
    },
    mounted(){
        this.topPicks()
        this.Latest()
        this.genreList()
        this.genreStartup()
        this.Setupctx()
        this.onStartup()
    },
    watch:{
      page: function () {
          if ( cookies.get("page") != "/store/" + this.$route.params.token + "/" + this.$route.params.roomid ){
            this.$router.push( { path: cookies.get("page") } )
          }
      },
      selectedgenre: function (){
        const api = "http://localhost:3000/movie/getgenre?genre=" + this.selectedgenre
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
    methods: {
      onSlideSelect(slide){
        this.selectedvideo = slide
        localStorage.setItem('selectedvideo', JSON.stringify(slide))
        this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/movie/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/"+ slide.title
        })
      },
      Latest(){
        const api = `http://localhost:3000/movie/getAll?sortBy=-created_at`
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.latest = response.data.data
            })
      },
      topPicks(){
        const api = `http://localhost:3000/movie/getTop?sortBy=-created_at`
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
        const api = "http://localhost:3000/genre"
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
        const api = "http://localhost:3000/movie/getgenre?genre=" + "biography"
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
        const api = "http://localhost:3000/movie/getgenre?genre=" + this.selectedgenre
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
      Setupctx(){
            if (this.ready === "no")
            {
              this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/store/"+ this.$route.params.token + "/"+ this.$route.params.roomid
                    })
              this.$cookies.set('access_token',this.$route.params.token );
              this.$cookies.set('roomid',this.$route.params.roomid );
              setInterval(() => {
              if (this.ready === "no"){
                this.$router.go(0)
              }
            }, 5000)
            }
            axios.get('http://localhost:3000/user/me', {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                }
            }).then(response => {
                console.log( response.status )
                if ( response.data.message === "success" ){
                    this.response = 'OK'
                }
            }).catch(error => {
                console.log(error)
                this.response = error
            })
      },
      onPageChange(page) {
        this.currentPage = page;
        const api = `http://localhost:3000/movie/getAll?page=${this.currentPage}&limit=${this.rowsPerPage}&sortBy=-created_at`
        axios
        .get(api, {
            headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
            }
        })
        .then(response => {
            this.videos = response.data.data
            this.totalPages = response.data.totalPages
        });
    },
    onStartup () {
      const api = `http://localhost:3000/movie/getAll?page=${this.currentPage}&limit=${this.rowsPerPage}&sortBy=-created_at`
      axios
        .get(api, {
            headers: {
              'Content-Type': 'application/json',
              'access_token': this.$route.params.token
            }
        })
        .then(response => {
            this.videos = response.data.data
            this.totalPages = response.data.totalPages
        });
    },
    onTermChange: function (searchTerm) {
      const api = `http://localhost:3000/movie/search?title=${searchTerm}`
      axios
        .get(api, {
          headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
            }
        })
        .then(response => {
          this.videos = response.data.data
          console.log(response.data.data)
        });
    },
    onVideoSelect(video)
    { 
      this.selectedvideo = video
      localStorage.setItem('selectedvideo', JSON.stringify(video))
      this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/movie/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/"+ video.title
      })
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
    
  }
</script>

<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>