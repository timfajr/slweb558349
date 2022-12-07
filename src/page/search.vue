<template>
    <body class="bg-mainblue flex w-screen min-h-screen flex-col">
        <Navbar />
        <div class="flex flex-col m-10">
            <div class="border-2 rounded-xl bg-backgroundblue w-8/12 flex flex-col justify-center self-center items-center bg-opacity-50 border-white shadow-xl">
                <div class="flex flex-row w-full justify-center self-center items-center">
                    <div class="text-white p-2 m-2 border-2 rounded-xl text-center text-xl w-1/6 shadow-xl">Youtube Video Search</div>
                    <SearchBar @termChange="onTermChange" class='p-4 w-2/3 m-4'/>
                </div>
                <div class="flex flex-row w-full justify-center self-center items-center -mt-10">
                    <div class="text-white p-2 m-2 border-2 rounded-xl text-center text-xl w-1/6 shadow-xl">Play Youtube URL</div>
                    <YoutubeURL @youtubeurl="Youtube" class='p-4 w-2/3 m-4'/>
                </div>
                <VideoList :videos="videos" @videoSelect="onVideoSelect" class="mb-8"/>
            </div>
          </div>    
    </body>
    </template>
    
    <script>

    // Components
    import Navbar from "/src/components/Navbar.vue";

    import SearchBar from "/src/components/youtube/SearchBar.vue";
    import VideoDetail from "/src/components/youtube/VideoDetail.vue";
    import VideoList from "/src/components/youtube/VideoList.vue";
    import YoutubeURL from "/src/components/youtube/YoutubeURL.vue";

    // Cookies
    import { useCookies } from "vue3-cookies";
    const { cookies } = useCookies();
    import axios from "axios";
    const API_KEY = "AIzaSyBv_3uZWHSrsjZGrfgLvxtW2uFN2_Bmt0c";

    export default {
    
    name: 'App',
    data() {
        return {
        user: '',
        page: '',
        ready: 'no',
        host: '',
        videos: [],
        selectedVideo: null,
        selectedvideoid: '',
        totaluser:'0'   
        }
    },

    components : {
        Navbar,
        SearchBar,
        VideoList,
        VideoDetail,
        YoutubeURL
    },

    methods: {
    onTermChange: function (searchTerm) {
      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            key: API_KEY,
            type: "video",
            maxResults: "10",
            part: "snippet",
            q: searchTerm,
          },
        })
        .then(({ data }) => (this.videos = data.items));
    },
    Youtube: function (url) {
    var youtube = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-){11})(?:&list=(\S+))?/,
        yt = url.match(youtube);

    if (yt) {
        console.log(yt[1]);
        this.$socket.emit('ytsrc', {
                roomid : this.$route.params.roomid ,
                ytsrc : yt[1]
            })
            this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/youtube/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/" + yt[1]
            })
    }
    },
    onVideoSelect: function (video) {
      console.log(video)
      console.log('hit')
      this.selectedVideo = video;
      cookies.set('ytsrc' , video.id.videoId)

      this.$socket.emit('ytsrc', {
                roomid : this.$route.params.roomid ,
                ytsrc : video.id.videoId
            })

      this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/youtube/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/" + video.id.videoId
            })
        }
    },

    watch:{
        page: function () {

            if ( this.$cookies.get("page") != "/search/"+ this.$route.params.token + "/"+ this.$route.params.roomid ){
            this.$router.push( { path: cookies.get("page") } )
            console.log( "hit" )
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
            page(data) {
                if (data){
                this.page = data
                cookies.set("page", data)
                }
            },

            ytsrc(data) {
                if (data){
                this.selectedvideoid = data
                cookies.set("ytsrc", data)
                }
            },
            
            usercount(data) {
                this.totaluser = data
            }

        }
    }

    </script>