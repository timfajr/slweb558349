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
                ready: 'no',
                iframeurl: '',
                totaluser:'0'   
              }
            },
            components : {
                Navbar
    },
    mounted() {
        this.geturl()
        this.Setupctx()
        },
    methods: {
        geturl(){
            var iframe = parent.document.getElementById("iframe_id")
            iframe.src = 'https://live.tv96.cc'
            var innerDoc = iframe.contentWindow.document.refferer
            var currentFrame = iframe.contentWindow.location.url
            var test = iframe.contentDocument.referrer
        },
        Setupctx(){
            if (this.ready === "no")
            {
              this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/beinsports/"+ this.$route.params.token + "/"+ this.$route.params.roomid
                    })
              this.$cookies.set('access_token',this.$route.params.token );
              this.$cookies.set('roomid',this.$route.params.roomid );
              setInterval(() => {
                this.$router.go(0)
            }, 5000)
            }
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
                this.ready = "yes"
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