<template>
    <body class="bg-mainblue flex w-screen flex-col h-screen relative">
    <div class="flex flex-col justify-start w-screen h-screen">
      <div>
        <img src="../images/Untitled.png" class="object-contain h-20 w-18 rounded mt-14 ml-10" />
      </div>
      <div class="flex flex-col w-screen h-screen justify-center align-center self-center">
        <div class="flex flex-col text-center space-y-4">
          <p class="text-white text-4xl font-bold">Unlimited movies , TV shows ,and more</p>
          <p class="text-white text-xl">Watch anywhere , Cancel anytime</p>
          <p class="text-white text-sm">Ready to watch ? Click the Menu and choose the Subscription to create your membership</p>
        </div>
        <button @click="home" class="bg-mainyellow flex self-center justify-center mt-10 text-mainblue font-semibold rounded px-4 p-2">
          Continue
        </button>
      </div>
    </div>
    </body>
    
</template>

<script>
export default {
        name: 'App',
        data() {
          return {
            user: '',
            status: 'Stopped',
            page: '',
          }
        },
  mounted(){
    this.Setupctx()
  },
  watch:{
      page: function () {
          if ( this.page == "/home/" + this.$route.params.token + "/" + this.$route.params.roomid ){
            this.$router.push( { path: "/home/" + this.$route.params.token + "/" + this.$route.params.roomid } )
          }
        }
  },
  methods: {
    Setupctx(){
      this.$cookies.set('access_token',this.$route.params.token );
      this.$cookies.set('roomid',this.$route.params.roomid );
      this.$socket.emit('page', {
        roomid : this.$route.params.roomid ,
        page : "/expired/" + this.$route.params.token + "/" + this.$route.params.roomid
      })
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
    home(){
      this.$socket.emit('page', {
              roomid : this.$route.params.roomid ,
              page : "/home/" + this.$route.params.token + "/" + this.$route.params.roomid
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
    page( data ) {
      this.ready = "yes"
      console.log(data)
      const check = (data.split('/'))
      if ( check[1] == "home" )
        {
          this.page = data
          cookies.set("page", data)
        }
    },
    usercount(data) {
      this.totaluser = data
    },
    }
}
</script>