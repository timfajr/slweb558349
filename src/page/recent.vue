<template>
  <div class="bg-mainblue min-h-screen h-full overflow-x-hidden">
      <Navbar />
      <div class="flex flex-col h-full mb-20">
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

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '

// Dep
import axios from "axios";

// Component
import Navbar from "/src/components/Navbar.vue";
import Pagination from '/src/components/Pagination.vue'

import WalletButton from "/src/components/store/WalletButton.vue"
import SearchBar from "/src/components/store/SearchBar.vue";
import VideoList from "/src/components/store/VideoList.vue";

export default {
  name: 'App',
  components: {
    Pagination,
    Navbar,
    SearchBar,
    WalletButton,
    VideoList
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
      totaluser:'0'
    };
  },
  mounted(){
      this.Setupctx()
      this.onStartup()
  },
  watch:{
    page: function () {
        if ( this.page != "/recent/" + this.$route.params.token + "/" + this.$route.params.roomid ){
          this.$router.push( { path: cookies.get("page") } )
        }
    }
  },
  methods: {
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
          }, 2500)
          }
    },
    onPageChange(page) {
      this.currentPage = page;
      const api = `https://api.bluebox.website/movie/getAll?page=${this.currentPage}&limit=${this.rowsPerPage}&sortBy=-created_at`
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
    const api = `https://api.bluebox.website/movie/getAll?page=${this.currentPage}&limit=${this.rowsPerPage}&sortBy=-created_at`
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
    const api = `https://api.bluebox.website/movie/search?title=${searchTerm}`
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
            this.ready = "yes"
          },
          disconnect() {
            console.log('disconnected')
          },
          // Event Controller
          page(data) {
            if ( data ){
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