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
                            <div class="flex justify-start text-xl font-semibold text-white bg-white bg-opacity-10 p-2 px-4 rounded"> {{this.video.title}} </div>
                            <div class="flex justify-start text-sm text-white bg-white bg-opacity-10 p-4 rounded h-full max-h-80 text-ellipsis overflow-hidden"> {{this.video.description}} </div>
                        </div>
                        <div class="flex flex-col space-y-3 p-2 justify-between">
                            <button @click="back" class="hover:animate-pulse font-semibold p-2 w-10 bg-white bg-opacity-20 rounded-full self-end text-white text-center"> <font-awesome-icon icon="fa-solid fa-arrow-left-long" /> </button>
                            <div class="flex flex-col space-y-3 p-2 justify-between">
                            <button @click="watchmovie" class="hover:animate-pulse font-semibold py-1 px-6 bg-mainyellow rounded-lg text-mainblue text-center">Play</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-start text-xl font-semibold text-white p-2 pt-8"> Similar Movies </div>
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

import VideoListItem from "/src/components/store/carouselitem.vue";
import Navbar from "/src/components/Navbar.vue";
import Loadingspinner from "/src/components/loading.vue";

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
            selectedvideo: [],
            loading: 'true'
            }
        },
        components : {
            Navbar, Carousel, Slide, VideoListItem, Navigation , Loadingspinner
    },
    watch:{
        page: function () {
            if ( this.page != "/" + this.$route.params.token + "/" + this.$route.params.roomid ){
            this.$router.push( { path: cookies.get("page") } )
            console.log( "page hit" )
            }
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
    watchmovie(){
        this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/watch/" + this.$route.params.token + "/"+ this.$route.params.roomid + "/"+ this.video._id
        })
        this.$socket.emit('videotime', {
                    roomid : this.$route.params.roomid ,
                    videotime : 0
        })
    },
    onSlideSelect(slide){
        this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/movie/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/"+ slide._id
        })
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
            }, 7500)
        }
    },
    onStartup () {
        const api2 = "https://api.bluebox.website/movie/getid?id=" + this.$route.params.id
        axios
            .get(api2, {
                headers: {
                'Content-Type': 'application/json',
                'access_token': this.$route.params.token
                 }
            })
            .then(response => {
                this.video = response.data.data
                const api = "https://api.bluebox.website/movie/getgenre?genre=" + response.data.data.genre
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
            page(data, slide) {
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