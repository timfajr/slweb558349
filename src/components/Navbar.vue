<template>
    <!-- Update Crud Submit New -->
    <div v-if="writehidden == false" class="fixed z-30 w-screen h-full min-h-screen bg-black bg-opacity-50">
        <div class="flex h-screen flex-row place-items-center justify-center">
          <div class="w-4/12 bg-mainblue rounded-xl flex flex-col place-items-center">
            <div class="flex self-end p-4">
            <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="writehidden = !writehidden">
              X
            </button>
          </div>
          <div class="flex self-center w-full h-full p-4 flex-col text-white -mt-4">
            <div class="bg-white rounded-xl flex pl-4 py-2 justify-center place-items-center bg-opacity-10">
              Request New Movie / Tv Series
            </div>
            <div class="bg-white rounded-xl flex flex-col px-4 py-4 mt-4 bg-opacity-10">

              <p class="pl-2"> Username </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.datauser.username}}
              </p>
              

              <p class="pl-2"> Requested Movie  </p>
              <input id="RequestedMovie" type="text" v-model="requestedmovie" required  class="bg-white bg-opacity-10 rounded-xl p-2 truncate" />
                
              <p class="pl-2"> Movie Year </p>
              <input id="Movieyear" type="text" v-model="movieyear" required  class="bg-white bg-opacity-10 rounded-xl p-2 truncate" />

              <p class="pl-2"> Message </p>
              <input id="Message" type="text" v-model="message" required  class="bg-white bg-opacity-10 rounded-xl p-2 truncate" />
              
            </div>
            <button @click="submitRequest()" class="font-semibold text-mainblue bg-mainyellow rounded flex flex-col px-4 py-2 mt-4 w-28 place-items-center self-end  bg-mainyellow">
                Submit
            </button>
          </div>
        </div>
      </div>
      </div>
      <!-- Update Crud Submit New -->

      <!-- Update Crud Display Requested -->
      <div v-if="hidden == false" class="fixed z-10 w-screen h-full min-h-screen bg-black bg-opacity-50">
      <div class="flex h-screen flex-row place-items-center justify-center">
      <div class="flex flex-col w-8/12 bg-mainblue rounded-xl">
        <div class="flex self-end p-4 -mb-6">
            <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="hidden = !hidden">
              X
            </button>
          </div>
          <div class="p-8">
          <div class="flex flex-row justify-between pb-4">
            <p class="flex justify-start text-lg font-semibold text-white">Requested Movie / Tv Series History</p>
            <button @click="writehidden = !writehidden" class="font-semibold text-mainblue bg-mainyellow rounded flex flex-col px-4 py-2 bg-mainyellow">
              New Request
          </button>
          </div>
          <div class="bg-white bg-opacity-10 p-4 px-10 rounded-2xl text-white">
              <ul class="grid grid-cols-5 border-b-2 p-2">
                  <li>
                      Requested Movie
                  </li>
                  <li>
                      Movie Year
                  </li>
                  <li>
                      Reply
                  </li>
                  <li>
                      Status
                  </li>
                  <li>
                      Edit
                  </li>
              </ul>
          
          <ul :key="i" v-for="i in requestedmovielist" class="grid grid-cols-5 p-2">
              <li>
                  {{ i.requestedmovie }}
              </li>
              <li>
                {{ i.movieyear }}
              </li>
              <li>
                {{ i.reply }}
              </li>
              <li>
                {{ i.status }}
              </li>
              <li>
                <div class="flex flex-row">
                  <img
                    src="/src/images/delete.png"
                    class="w-6 fill-white"
                    @click="deleteButton(i)"
                  />
                  <img
                    src="/src/images/edit.png"
                    class="w-6"
                    @click="writeButton(i)"
                  />
                    </div>
                  </li>
              </ul>
          </div>
          </div>
        </div>
        </div>
        </div>

        <!-- View Item-->
        <div v-if="viewhidden == false" class="fixed z-30 w-screen h-full min-h-screen bg-black bg-opacity-50">
        <div class="flex h-screen flex-row place-items-center justify-center ">
          <div class="w-4/12 bg-mainblue rounded-xl flex flex-col place-items-center">
            <div class="flex self-end p-4">
            <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="viewhidden = !viewhidden">
              X
            </button>
          </div>
          <div class="flex self-center w-full h-full p-4 flex-col text-white -mt-4">
            <div class="bg-white rounded flex pl-4 py-2 justify-center place-items-center bg-opacity-10">
              Requested Movie / Tv Series - Status : {{this.selected.status}}
            </div>
            <div class="bg-white rounded flex flex-col px-4 py-4 mt-4 bg-opacity-10 ">

              <p class="pl-2"> Username </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.datauser.username}}
              </p>

              <p class="pl-2"> Requested Movie </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.requestedmovie}}
              </p>

              <p class="pl-2"> Movie Year </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.movieyear}}
              </p>
              
              <p class="pl-2"> Message </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.message}}
              </p>

              <p class="pl-2"> Status </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.status}}
              </p>

              <p v-if="this.selected.reply" class="pl-2"> Reply </p>
              <p v-if="this.selected.reply" class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.reply}}
              </p>

            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- View Item-->
      <!-- Update Crud Display Requested  -->
      <!-- Update Crud Delete Requested -->
      <div v-if="deletehidden == false" class="fixed z-30 w-screen h-full min-h-screen bg-black bg-opacity-50">
        <div class="flex h-screen flex-row place-items-center justify-center ">
          <div class="w-4/12 bg-mainblue rounded-xl flex flex-col place-items-center">
            <div class="flex self-end p-4">
            <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="deletehidden = !deletehidden">
              X
            </button>
          </div>
          <div class="flex self-center w-full h-full p-4 flex-col text-white -mt-4">
            <div class="bg-white rounded flex pl-4 py-2 justify-center place-items-center bg-opacity-10">
              Are you sure want to delete this record ?
            </div>
            <div class="bg-white rounded flex flex-col px-4 py-4 mt-4 bg-opacity-10 ">

              <p class="pl-2"> Username </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.datauser.username}}
              </p>

              <p class="pl-2"> Requested Movie </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.requestedmovie}}
              </p>

              <p class="pl-2"> Movie Year </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.movieyear}}
              </p>
              
              <p class="pl-2"> Message </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.message}}
              </p>

              <p class="pl-2"> Status </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.status}}
              </p>

              <p v-if="this.selected.reply" class="pl-2"> Reply </p>
              <p v-if="this.selected.reply" class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{this.selected.reply}}
              </p>
              <button @click="deleteRequest()" class="font-semibold text-mainblue bg-yellow rounded flex flex-col px-4 py-2 mt-4 w-28 place-items-center self-end  bg-mainyellow">
                Delete
            </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!-- Update Crud Delete Requested  -->

    <nav class="bg-mainblue text-white p-2 text-lg font-semibold flex flex-row justify space-x-12 justify-center w-screen pt-12 text-xs ">
      <div class="space-x-2 flex flex-row justify-center font-normal bg-white bg-opacity-10 rounded-2xl p-2 px-4 self-center">
      <div class="flex flex-row p-2">
          <img src="../images/Untitled.png" class="object-contain h-10 w-18 rounded" />
      </div>
      <button :class="{ 'link-active': activate === 'Home'}"
       class="router-link-exact-active router-link-active hover:animate-pulse rounded flex justify-center self-center active:bg-mainyellow" @click="home" :to="{ name: 'Home', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        <div class="flex flex-row p-2 place-items-center text-center">
          <font-awesome-icon icon="fa-solid fa-house-chimney" class="bg-mainyellow p-1 w-5 h-5 rounded mr-2 " />  Home
        </div>
      </button>
      <button :class="{ 'link-active': activate === 'Store'}"
      class="hover:animate-pulse rounded flex justify-center self-center" @click="store" :to="{ name: 'Store', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        <div class="flex flex-row p-2 place-items-center text-center">
          <font-awesome-icon icon="fa-solid fa-video" class="bg-mainyellow p-1 w-5 h-5 rounded mr-2" />  Movies
        </div>
      </button>
      <button :class="{ 'link-active': activate === 'RecentlyAdded'}"
      class="hover:animate-pulse rounded flex justify-center self-center" @click="recent" :to="{ name: 'RecentlyAdded', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        <div class="flex flex-row p-2 place-items-center text-center">
          <font-awesome-icon icon="fa-solid fa-calendar-check" class="bg-mainyellow p-1 w-5 h-5  rounded mr-2" />  Recently Added
        </div>
      </button>
      <button :class="{ 'link-active': activate === 'tvseries'}"
      class="hover:animate-pulse rounded flex justify-center self-center" @click="tvseries" :to="{ name: 'tvseries', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        <div class="flex flex-row p-2 place-items-center text-center">
          <font-awesome-icon icon="fa-brands fa-youtube" class="bg-mainyellow p-1 w-5 h-5 rounded mr-2" />  Tvseries
        </div>
      </button>
      <button :class="{ 'link-active': activate === 'search'}"
      class="hover:animate-pulse rounded flex justify-center self-center" @click="search" :to="{ name: 'search', params: { token: this.$route.params.token , roomid: this.$route.params.roomid} }">
        <div class="flex flex-row p-2 place-items-center text-center">
          <font-awesome-icon icon="fa-brands fa-youtube" class="bg-mainyellow p-1 w-5 h-5 rounded mr-2" />  Youtube
        </div>
      </button>
      </div>
      <div class="space-x-4 flex flex-row rounded-2xl bg-white bg-opacity-10 p-3 justify-center self-center text-sm">
        <button @click="hidden = !hidden" class="hover:animate-pulse p-2 m-2 rounded bg-mainyellow text-mainblue px-4"> <font-awesome-icon icon="bell" /> </button>
        <button @click="myprofile" class="hover:animate-pulse p-2 m-2 rounded bg-mainyellow text-mainblue px-4"> <font-awesome-icon icon="user" /> </button>
      </div>
    </nav>
  </template>

<script lang="js">

const domain = "https://api.bluebox.website";
//const domain = "http://localhost:3000";

import axios from "axios";

export default {
    name: 'App',
    data() {
      return {
        page: '',
        activate : this.$route.name,

        // Update Crud
        hidden: true,
        writehidden: true,
        deletehidden: true,
        viewhidden: true,
        datauser: [],
        requestedmovielist: [],
        selected: [],
        movieyear: "",
        message: "",
        requestedmovie:""
        // Update Crud
      }
    },

    // Update Crud
    mounted(){
    this.onStartup()
    },
    // Update Crud

    methods: {
      search(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/search/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      home(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/home/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      store(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/store/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      tvseries(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/tvseries/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      recent(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/recent/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },
      myprofile(){
        this.$socket.emit('page', {
                roomid : this.$route.params.roomid ,
                page : "/myprofile/" + this.$route.params.token + "/" + this.$route.params.roomid
            })
      },

      // Update Crud
      onStartup () {
      const api = domain + "/user/me"
      axios
          .get(api, {
              headers: {
              'Content-Type': 'application/json',
              'access_token': this.$route.params.token
                  }
          })
          .then(response => {
              this.datauser = response.data.message
              this.requestedmovielist = response.data.message.requestedmovie
          });
      },

      deleteButton (item) {
          this.deletehidden = !this.deletehidden
          this.selected = item
        },
    
      writeButton (item) {
          this.viewhidden = !this.viewhidden
          this.selected = item
        },

        
      deleteRequest()  {
      const api = domain + '/user/deleterequested/?uid=' + this.selected.uid + "&ownerid=" + this.selected.ownerid
      const request = {
              "ownerid": this.datauser.ownerid,
              "movieid": this.selected._id
              }
      axios
          .delete(api,request
              ,{
              headers: {
              'Content-Type': 'application/json',
              'access_token': this.$route.params.token
              }
              }
              )
          .then(response => {
            console.log(response)
              this.response = response.data
              this.status = response.status
              if (response.status = 200){
                this.onStartup(),
                this.deletehidden = !this.deletehidden
                this.selected = []
              }

          })
      },

      submitRequest()  {
      const api = domain + "/user/requestmovie/"
      const request = {
              "ownerid": this.datauser.ownerid,
              "username": this.datauser.username,
              "requestedmovie": this.requestedmovie,
              "movieyear": this.movieyear,
              "message": this.message
              }
      axios
          .post(api,request
              ,{
              headers: {
              'Content-Type': 'application/json',
              'access_token': this.$route.params.token
              }
              }
              )
          .then(response => {
              this.response = response.data
              this.status = response.status
              if (response.status = 200){
                this.onStartup(),
                this.writehidden = !this.writehidden
                this.movieyear = "",
                this.message = "",
                this.requestedmovie= ""
              }

          })
      },

      // Update Crud

    }
}
</script>

<style>
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.link-active{
  background-color: #FCC139;
  color: #234899;
  animation: fadeInOut 1s;
}
.fa-solid{
  color: #234899;
}
.fa-house-chimney{
  color: #234899;
}
.fa-video{
  color: #234899;
}
.fa-calendar-check{
  color: #234899;
}
.fa-youtube{
  color: #234899;
}
</style>