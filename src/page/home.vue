<template>
<div class="bg-mainblue w-screen h-screen">
  <Navbar  />
  <div class="flex flex-col justify-center self-center align-center h-5/6">
    <div class="flex flex-col justify-center self-center w-4/12">
      <img src="../images/Untitled.png" class="object-contain h-32 w-18 rounded" />
      <div class="tracking-widest flex pl-20">
        <span class="text-white text-md">Bluebox Alpha v1.0 🚀</span>
      </div>
    </div>
  </div>
</div>

</template>

<script>
// Cookies
import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '

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
          if ( this.page != "/" + this.$route.params.token + "/" + this.$route.params.roomid ){
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
              this.$cookies.set('access_token',this.$route.params.token );
              this.$cookies.set('roomid',this.$route.params.roomid );
              setInterval(() => {
              if (this.ready === "no"){
                console.log("HIT")
                this.$router.go(0)
              }
            }, 10000)
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
                cookies.set("page", data)
              }
            },
            usercount(data) {
              this.totaluser = data
            },
        },
}
</script>