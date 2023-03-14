<template>
    <div class="bg-mainblue min-h-screen h-full overflow-x-hidden relative">
      <Loadingspinner v-if="this.loading == 'true' " />
      <Navbar />
      <div class="flex flex-col justify-center self-center mb-20">
        <div class="flex flex-col justify-center self-center h-full w-11/12 ">
              <div class="flex flex-row justify-center w-full self-center items-center pt-10">
                <div class="bg-white bg-opacity-10 w-full h-full rounded-xl flex text-white"> 
                <div class="flex flex-col w-full justify-start self-start p-10">
                    <div class="flex flex-row">
                        <img :src="this.video.imgurl" class="w-4/12 rounded object-contain" />
                        <div class="flex flex-col space-y-3 p-2 w-full">
                            <div class="flex justify-start text-xl font-semibold text-white bg-white bg-opacity-10 p-2 px-4 rounded capitalize"> {{this.video.title}} </div>
                            <div class="flex justify-start text-sm text-white bg-white bg-opacity-10 p-4 rounded h-full max-h-80  text-ellipsis overflow-hidden"> {{this.video.description}} </div>
                        </div>
                        <div class="flex flex-col space-y-3 p-2 justify-between">
                            <button @click="back" class="hover:animate-pulse font-semibold p-2 w-10 bg-white bg-opacity-20 rounded-full self-end text-white text-center"> <font-awesome-icon icon="fa-solid fa-arrow-left-long" /> </button>
                            <div class="flex flex-col space-y-3 p-2 justify-between">
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-start text-xl font-semibold text-white p-2 pt-8"> Series & Episode </div>
                    <Splide :options="{ rewind: true, perPage:4 }"
                    class="mt-5 p-2 bg-white bg-opacity-10 rounded-2xl">
                        <SplideSlide v-for="slide in video.series" :key="slide">
                            <SeriesListItem
                            :video="slide"
                            :key="slide.id"
                            :thumbnailUrl="this.video.imgurl"
                            @Watchseries="onWatchseries"
                            ></SeriesListItem>
                        </SplideSlide>
                    </Splide>
                    <div class="flex justify-start text-xl font-semibold text-white p-2 pt-8"> Similar Genre Tv Series </div>
                    <Splide :options="{ rewind: true, perPage:4 }"
                    class="mt-5 p-2 bg-white bg-opacity-10 rounded-2xl">
                        <SplideSlide v-for="slide in list" :key="slide" >
                            <VideoListItem
                            :video="slide"
                            :key="slide.id"
                            @slideSelect="onSlideSelect"
                            ></VideoListItem>
                        </SplideSlide>
                    </Splide>
                </div>
                </div>
            </div>
      </div>
      </div>
    </div>

</template>

<script>
// Cookies
import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()

import { Carousel, Slide,Navigation } from 'vue3-carousel'
import axios from "axios";

import SeriesListItem from "/src/components/store/SeriesListItem.vue";
import VideoListItem from "/src/components/store/carouselitem.vue";
import Navbar from "/src/components/Navbar.vue";
import Loadingspinner from "/src/components/loading.vue";

const domain = "https://api.bluebox.website";
//const domain = "http://localhost:3000";

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
        list:[],
        video:[],
        selectedvideo:'',
        loading: 'true'
        }
    },
    components : {
        Navbar, Carousel, Slide, VideoListItem, Navigation , Loadingspinner , SeriesListItem
    },
    watch:{
        page: function () {
        const check = (this.page.split('/'))
        if ( check[1] != "series" ){
        this.$router.push( { path: cookies.get("page")})
        }
        if( check[1] == "series" )
        {
            const api2 = domain + "/tvseries/getid?id=" + check[4]
            axios
                .get(api2, {
                    headers: {
                    'Content-Type': 'application/json',
                    'access_token': this.$route.params.token
                    }
                })
                .then(response => {
                    this.loading = 'false'
                    this.video = response.data.data
                    const api = doman + "/tvseries/getgenre?genre=" + response.data.data.genre
                    axios
                        .get(api, {
                            headers: {
                            'Content-Type': 'application/json',
                            'access_token': this.$route.params.token
                            }
                        })
                        .then(response => {
                            this.list = response.data.data
                        })
                 })
            }
        },
        selectedvideo: function() {
        }
    },
    mounted(){
    this.Setupctx()
    this.onStartup()
    },
    methods:{
    back(){
        this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/store/"+ this.$route.params.token + "/"+ this.$route.params.roomid
        })
    },
    onWatchseries(video)
    { 
        this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/watchseries/" + this.$route.params.token + "/"+ this.$route.params.roomid + "/"+ video.title
        })
        this.$socket.emit('videotime', {
                    roomid : this.$route.params.roomid ,
                    videotime : 0
        })
        this.$socket.emit('status', {
                    roomid : this.$route.params.roomid ,
                    status : "Playing"
        })
        this.$socket.emit('host', {
                    roomid : this.$route.params.roomid ,
                    status : ""
        })
      this.selectedvideo = video.title
      this.selectedvideo = video.title
    },
    onSlideSelect(slide){
        this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/series/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/"+ slide._id
        })
        this.selectedvideo = slide._id
        this.loading = 'true'
    },
    Setupctx(){
        this.$cookies.set('access_token',this.$route.params.token );
        if (this.ready === "no")
        {
            this.$cookies.set('access_token',this.$route.params.token );
            this.$cookies.set('roomid',this.$route.params.roomid );
            setInterval(() => {

            if (this.ready === "no"){
            this.$router.go(0)
            }
        }, 10000)
        }
    },
    onStartup () {
        const api2 = domain + "/tvseries/getid?id=" + this.$route.params.id
        axios
            .get(api2, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.video = response.data.data
                const api = domain + "/tvseries/getgenre?genre=" + response.data.data.genre
                axios
                    .get(api, {
                        headers: {
                        'Content-Type': 'application/json',
                        'access_token': this.$route.params.token
                        }
                    })
                    .then(response => {
                        this.list = response.data.data
                    })
                    this.loading = 'false'
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
            if ( data ){
            this.ready = "yes"
            cookies.set("page", data)
            this.page = data
        }
        },
        usercount(data) {
            this.totaluser = data
        },
        },
}
</script>