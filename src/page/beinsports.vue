<template>
    <Navbar />
    <div class="bg-mainblue w-screen h-screen">
    <iframe id="iframe_id" class="w-screen h-screen" frameborder="0"></iframe>
    </div>
    
    </template>
    
    <script>

    // Cookies
    import { useCookies } from "vue3-cookies";
    const { cookies } = useCookies();
    
    import Navbar from "/src/components/Navbar.vue";
    export default {
            name: 'App',
            data() {
              return {
                user: '',
                page: '',
                host: '',
                iframeurl: '',
                totaluser:'0'   
              }
            },
            components : {
                Navbar
    },
    mounted() {
        this.geturl()
        },
    methods: {
        geturl(){
            var iframe = parent.document.getElementById("iframe_id")
            iframe.src = 'https://live.tv96.cc'
            var innerDoc = iframe.contentWindow.document.refferer
            var currentFrame = iframe.contentWindow.location.url
            var test = iframe.contentDocument.referrer
        }
    },
    watch:{
        page: function () {
            if ( "/beinsports/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/play" != "/beinsports/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/play" ){
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
            iframeurl(data) {
                if (data){
                this.iframeurl = data
                cookies.set("iframeurl", data)
                }
            },
            usercount(data) {
                this.totaluser = data
            },
        },
    }

    </script>