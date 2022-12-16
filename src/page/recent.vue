<template>
  <div class="bg-mainblue min-h-screen h-full overflow-x-hidden relative">
    <Loadingspinner v-if="this.loading == 'true' " />
      <Navbar />
      <div class="flex flex-col h-full mb-20">
        <!--
        Wrapper
        -->
          <div class="flex flex-row justify-end w-10/12 self-center items-center mt-4">
              <SearchBar @termChange="onTermChange" class='p-4 mb-4 w-2/4 '/>
          </div>
          <div class="bg-white bg-opacity-10 rounded-xl w-10/12 flex flex-col justify-center self-center items-center border-white shadow-xl">
              <div class="h-10" />
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
            <!--
        Wrapper
        -->
          </div>
        </div>  
</template>

<script>
// Cookies
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import '@splidejs/vue-splide/css';

// Dep
import axios from "axios";
// Component
import Navbar from "/src/components/Navbar.vue";
import Pagination2 from '/src/components/Pagination.vue'
import VideoList from "/src/components/store/VideoList.vue";
import SearchBar from "/src/components/store/SearchBar.vue";
import Loadingspinner from "/src/components/loading.vue";

export default {
  name: 'App',
  components: {
    Pagination2,
    Navbar,
    SearchBar,
    VideoList,
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
      loading: 'true'
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
    },
  },
  methods: {
    onSlideSelect(slide){
      this.$socket.emit('page', {
                  roomid : this.$route.params.roomid ,
                  page : "/movie/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/" + slide._id
      })
    },
    Latest(){
      const api = `https://api.bluebox.website/movie/getAll?sortBy=-created_at`
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
    Setupctx(){
      this.$cookies.set('access_token',this.$route.params.token);
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
          console.log(response.data.data)
          this.videos = response.data.data
          this.totalPages = response.data.totalPages
          this.loading = false
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
        console.log(response.data.data)
      });
  },
  onVideoSelect(video)
  { 
    this.selectedvideo = video
    localStorage.setItem('selectedvideo', JSON.stringify(video))
    this.$socket.emit('page', {
                  roomid : this.$route.params.roomid ,
                  page : "/movie/"+ this.$route.params.token + "/"+ this.$route.params.roomid + "/"+ video._id
    })
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