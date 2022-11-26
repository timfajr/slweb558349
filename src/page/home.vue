<template>
<Navbar />
<div class="bg-mainblue w-screen h-screen">

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
            ready: 'no',
            page: '',
            host: '',
            status: 'Stopped',
            currentime: '0',
            videotime:'0',
            totaluser:'0',
            list:[]
          }
        },
        components : {
            Navbar
  },
  watch:{
      page: function () {
          if ( cookies.get("page") != "/" + this.$route.params.token + "/" + this.$route.params.roomid ){
            this.$router.push( { path: cookies.get("page") } )
            console.log( "hit" )
          }
        }
	},
  mounted(){
    this.Setupctx()
  },
  methods:{
    Setupctx(){
            if (this.ready === "no")
            {
              this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/"+ this.$route.params.token + "/"+ this.$route.params.roomid
                    })
              this.$cookies.set('access_token',this.$route.params.token );
              this.$cookies.set('roomid',this.$route.params.roomid );
              setInterval(() => {

              if (this.ready === "no"){
                console.log("HIT")
                this.$router.go(0)
              }
            }, 5000)
            }
          },
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
                console.log("ready")
                cookies.set("page", data)
              }
            },
            usercount(data) {
              this.totaluser = data
            },
        },
}
</script>