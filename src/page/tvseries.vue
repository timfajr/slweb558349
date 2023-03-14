<template>
    <div class="bg-mainblue min-h-screen h-full overflow-x-hidden relative">
      <Loadingspinner v-if="this.loading == 'true' " />
        <Navbar />
        <div class="flex flex-col h-full mb-20">
          <!--
          Wrapper
          -->
          <div v-if="latest" class="w-10/12 self-center items-center">
            <div class="flex flex-row justify-between mt-10">
            <div class="text-xl font-semibold text-white p-2 "> Latest Series </div>
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
            <div class="flex flex-row justify-between mt-10">
            <div class="text-xl font-semibold text-white p-2 "> Popular Series </div>
            </div>
            <Splide :options="{ rewind: true, perPage:3 }"
            class="mt-5 p-2 bg-white bg-opacity-10 rounded-2xl">
                <SplideSlide v-for="slide in topicks" :key="slide" >
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
          <div v-if="genrelist" class="w-10/12 self-center items-center">
            <div class="flex flex-row justify-between mt-10">
            <div class="text-xl font-semibold text-white p-2 "> Series By Genre </div>
              <select v-model="selectedgenre" id="genre" class="p-2 rounded-xl capitalize">
                <option hidden disabled selected value>Genre List</option>
                <option v-for="i in genrelist" :key="i" class="capitalize">
                    {{ i }}
                </option>
            </select>
            </div>
            <Splide :options="{ rewind: true, perPage:3 }"
            class="mt-5 p-2 bg-white bg-opacity-10 rounded-2xl">
                <SplideSlide v-for="slide in genre" :key="slide">
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
            <div class="flex flex-row justify-end w-10/12 self-center items-center mt-4">
                <SearchBar @termChange="onTermChange" class='p-4 mb-4 w-2/4 '/>
            </div>
            <div class="bg-white bg-opacity-10 rounded-xl w-10/12 flex flex-col justify-center self-center items-center border-white shadow-xl">
                <div class="h-10">
                    </div>
                <VideoList :videos="videos" @videoSelect="onVideoSelect" class="mb-8 "/>
                <div id="pagination">
                    <Pagination2
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
import '@splidejs/vue-splide/css';

const domain = 'https://api.bluebox.website'
//const domain = 'http://localhost:3000'

// Dep
import axios from "axios";

// Component
import Navbar from "/src/components/Navbar.vue";
import Pagination2 from '/src/components/Pagination.vue'

import WalletButton from "/src/components/store/WalletButton.vue"
import SearchBar from "/src/components/store/SearchBar.vue";
import VideoList from "/src/components/store/VideoList.vue";
import VideoListItem from "/src/components/store/carouselitem.vue";
import Loadingspinner from "/src/components/loading.vue";

export default {
    name: 'App',
    components: {
      Pagination2,
      Navbar,
      SearchBar,
      WalletButton,
      VideoList,
      VideoListItem,
      Loadingspinner
    },
    data () {
      return {
        currentPage: 1,
        totalPages: 0,
        rowsPerPage : 6,
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
        defaultgenre: "",
        selectedgenre: '',
        loading : 'true'
      };
    },
    mounted(){
        this.topPicks()
        this.Latest()
        this.genreList()
        this.Setupctx()
        this.onStartup()
        this.genreStartup()
    },
    watch:{
      page: function () {
          if ( this.page != "/tvseries/" + this.$route.params.token + "/" + this.$route.params.roomid ){
            this.$router.push( { path: cookies.get("page") } )
          }
      },
      
      selectedgenre: function (){
        const api = domain + "/tvseries/getgenre?genre=" + this.selectedgenre
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.genre = response.data.data
            })
      }
	  },
    methods: {
      onSlideSelect(slide){
        this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/series/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/" + slide._id
        })
      },
      Latest(){
        const api = domain + `/tvseries/getAll?sortBy=-created_at`
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
        const api = domain + `/tvseries/getTop?sortBy=-created_at`
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
        const api = domain + "/tvseries/genre"
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.genrelist = response.data
                this.defaultgenre = response.data[0]
            })
      },
      genreStartup(){
        const api = domain +  "/tvseries/getgenre?genre=" + this.defaultgenre
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.genre = response.data.data
            })
      },
      selectedGenre(){
        const api = domain + "/tvseries/getgenre?genre=" + this.selectedgenre
        axios
            .get(api, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.genre = response.data.data
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
            axios.get( domain +  '/user/me', {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                }
            }).then(response => {
                if ( response.data.message === "success" ){
                    this.response = 'OK'
                }
            }).catch(error => {
                this.response = error
            })
      },
      onPageChange(page) {
        this.currentPage = page;
        const api = domain + `/tvseries/getAll?page=${this.currentPage}&limit=${this.rowsPerPage}&sortBy=-created_at`
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
      const api = domain + `/tvseries/getAll?page=${this.currentPage}&limit=${this.rowsPerPage}&sortBy=-created_at`
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
            this.loading = 'false'
        });
    },
    onTermChange: function (searchTerm) {
      const api = domain + `/tvseries/search?title=${searchTerm}`
      axios
        .get(api, {
          headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
            }
        })
        .then(response => {
          this.videos = response.data.data
        });
    },
    onVideoSelect(video)
    { 
      console.log(video)
      this.selectedvideo = video
      localStorage.setItem('selectedvideo', JSON.stringify(video))
      this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/series/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/"+ video._id
      })
    }
    },
    sockets: {
        connect() {
          console.log('connected')
          this.ready="yes"
        },
        disconnect() {
          console.log('disconnected')
        },

        // Event Controller
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
    
  }
</script>

<style>
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