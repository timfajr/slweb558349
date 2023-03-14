<template>
    <div class="bg-mainblue w-screen h-screen flex flex-col">
        <Navbaradmin />
        <h1 class="flex flex-row justify-center text-2xl font-semibold text-white mt-10"> Upload Series </h1>
        <div class="flex flex-col justify-center space-x-10 w-6/12 self-center place-item-center">
            <button v-on:click="categoryhidden = !categoryhidden" class="ml-14 justify-center w-40 mt-5 flex text-md text-white bg-white bg-opacity-10 rounded-xl p-2">Add New Title</button>
            <form @submit.prevent="submitSeries" class="flex flex-col space-y-3 p-4 rounded-xl">
                  <select id="Title" class="rounded-xl pl-4 p-2 bg-opacity-10 bg-white text-white"
                  type="text" v-model="category_selected">
                   <option v-for="(item , index) in category_list" :key="index" :value="item" class="text-black">{{ item.title }}</option>
                  </select>
                  <textarea rows="5" cols="60" class="rounded-xl pl-4 p-2 h-32 bg-opacity-10 bg-white text-white" 
                  placeholder="Description" id="description" type="text" v-model="Description" required />
                  <input class="rounded-xl pl-4 p-2 bg-opacity-10 bg-white text-white" 
                  placeholder="Series" id="Series" type="text" v-model="Series" required/>
                  <input class="rounded-xl pl-4 p-2 bg-opacity-10 bg-white text-white" 
                  placeholder="Episode" id="Episode" type="text" v-model="Episode" required/>
                <button v-if="videourl" class="bg-white rounded-xl p-2 text-white bg-opacity-10" type="submit">Submit</button>
              </form>
              <div class="flex flex-col space-y-20 justify-start mt-10">
                <div class="ml-4">
                    <h2 class="font-bold text-white text-xl">Video Uploader</h2>
                    <hr/>
                    <div class="mt-5">
                    <label>
                        <input type="file" class="text-white mb-2" name="myVideo" id="myVideo" v-on:change="handleFileUpload( $event )"/>
                    </label>
                    <br>
                    <progress max="100" :value.prop="uploadPercentage"></progress>
                    <p v-if="(uploadPercentage && uploadPercentage <= 99)" class="text-white text-md"> Upload Progress : {{this.uploadPercentage}} %</p>
                    <p v-if="(uploadPercentage === 100)" class="text-white text-md"> Upload Progress : Completed</p>
                    <br>
                    <button v-if="file && !videourl && !hide == true" v-on:click="submitFile()" class="text-md text-white border-2 rounded-xl p-2">Submit</button>
                    </div>
                </div>
            </div>

        </div>

        <!-- Add Category -->
        <div v-if="categoryhidden == true" class="text-xs fixed z-20 w-screen h-full min-h-screen bg-black bg-opacity-50">
        <div class="flex h-screen flex-row place-items-center justify-center">
        <div class="flex flex-row justify-center space-x-10 bg-mainblue rounded-xl p-2">
            <form @submit.prevent="submitCategory" class="flex flex-col space-y-3 p-4 rounded-xl">
                  <input class="rounded-xl pl-4 p-2 bg-opacity-10 bg-white text-white"
                  placeholder="Title" id="Title" type="text" v-model="Title_category" required/>
                  <textarea rows="5" cols="60" class="rounded-xl pl-4 p-2 h-32 bg-opacity-10 bg-white text-white" 
                  placeholder="Description" id="description" type="text" v-model="Description_category" required />
                  <input class="rounded-xl pl-4 p-2 bg-opacity-10 bg-white text-white" 
                  placeholder="Genre" id="Genre" type="text" v-model="Genre_category" required/>
                  <div class="flex flex-row space-x-3 w-full">
                        <div class="flex items-center rounded-xl  p-2 w-full bg-opacity-10 bg-white">
                            <input id="Topicks" type="checkbox" v-model="Topicks_category" value="true" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 ">
                            <label for="Topicks" class="ml-2 text-sm font-medium text-white dark:text-white">Top picks</label>
                        </div>
                        <div class="flex items-center rounded-xl p-2 w-full bg-opacity-10 bg-white">
                            <input id="Published" type="checkbox" v-model="Published_category" value="true" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                            <label for="Published" class="ml-2 text-sm font-medium text-white">Published</label>
                        </div>
                  </div>
                <button v-if="image && imageurl" class="bg-white rounded-xl p-2 text-white bg-opacity-10" type="submit">Submit</button>
              </form>
            <div class="flex flex-col space-y-20 justify-start mt-10">
                <div class="flex flex-col justify-center self-start">
                <div >
                    <h2 class="font-bold text-white text-xl">Image Uploader</h2>
                    <hr/>
                    <div class="mt-5">
                    <label>
                        <input type="file" class="text-white mb-2"  name="myImage" id="myImage" v-on:change="handleImageUpload( $event )"/>
                    </label>
                    <br>
                    <progress max="100" :value.prop="imageuploadPercentage"></progress>
                    <p v-if="(imageuploadPercentage && imageuploadPercentage <= 99)" class="text-white text-md"> Upload Progress : {{this.imageuploadPercentage}} %</p>
                    <p v-if="(imageuploadPercentage === 100)"  class="text-white text-md"> Upload Progress : Completed</p>
                    <br>
                    <button v-if="image && !imageurl" v-on:click="submitImage()" class="text-md text-white border-2 rounded-xl p-2">Submit</button>
                    </div>
                </div>
            </div>
            </div>
            <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="categoryhidden = !categoryhidden">
                X
            </button>
        </div>
    </div>
</div>
<!-- Add Category -->
    </div>
    </template>
    
    <script>
        import axios from 'axios'
        import Navbaradmin from "/src/components/Navbaradmin.vue"
        
        // Cookies
        import { useCookies } from "vue3-cookies"
        const { cookies } = useCookies()
    
        const domain = "https://api.bluebox.website";
        //const domain = "http://localhost:3000";
        
        export default {
        data(){
            return {
                file: '',
                image: '',
                uploadPercentage: 0,
                imageuploadPercentage: 0,
                page: '',
                status : "false",
                imagestatus : "false",
                form : "false",
                categoryform : "false",
                hide : false,
                categoryhidden: false,
                selectedindex: "",
                
                videourl : '',
                imageurl: '',

                category_list: [],
                category_selected: [],

                // Form Data Series
                Description: '',
                Series: '',
                Episode: '',

                // Form Data Title Category 
                Description_category: '',
                Genre_category : '',
                Topicks_category : false,
                Published_category: false
            }
        },
        components : {
            Navbaradmin
        },
        mounted(){
        this.onStartup()
        },
        methods: {
            onStartup () {
            const api2 = domain + "/admin/gettvseriescategory"
            axios
            .get(api2, {
                headers: {
                'access_token': cookies.get('atoken')
                 }
            })
            .then(response => {
                this.category_list = response.data.data
            })
            },
            handleFileUpload( event ){
                this.file = event.target.files[0]
            },
            handleImageUpload( event ){
                this.image = event.target.files[0]
            },
            selectTitle( i ){
                console.log(i)
                this.category_selected = i
            },
            submitFile(){
                let formData = new FormData()
                formData.append('myVideo', this.file)
                this.hide = true
                axios.post( domain + '/uploadseries',
                    formData,
                    {
                        headers: {
                                'Content-Type': 'multipart/form-data',
                                'access_token': cookies.get('atoken')
                        },
                        onUploadProgress: function( progressEvent ) {
                            this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
                        }.bind(this)
                    }
                ).then((response) => (this.status = 'true', this.videourl=response.data.data.url ,this.hide = true))
                .catch((error) => {
                this.$router.push("/admin/login")
                this.status = error.response.status
            })
            },
            submitImage(){
                let formData = new FormData()
                formData.append('myImage', this.image)
                axios.post( domain + '/uploadseriesimage',
                    formData,
                    {
                        headers: {
                                'Content-Type': 'multipart/form-data',
                                'access_token': cookies.get('atoken')
                        },
                        onUploadProgress: function( progressEvent ) {
                            this.imageuploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
                        }.bind(this)
                    }
                ).then((response) => (this.imagestatus = 'true', this.imageurl=response.data.data.url))
                .catch((error) => {
                this.$router.push("/admin/login")
                this.imagestatus = error.response.status
            })
            },
            submitCategory(){
                let formData2 = {
                title: this.Title_category,
                description: this.Description_category,
                genre : this.Genre_category,
                topick: this.Topicks_category,
                published: this.Published_category,
                imgurl: this.imageurl
                }
                axios.post( domain + '/admin/post/tvseriescategory',
                    formData2,
                    {
                        headers: {
                                'Content-Type': 'application/json',
                                'access_token': cookies.get('atoken')
                        },
                    }
                ).then((response) => {
                    if(response.status == "200"){
                        this.categoryhidden = false
                        this.image = []
                        this.imageurl = ""
                        this.Title_category = ''
                        this.Description_category= ''
                        this.Genre_category = ''
                        this.Topicks_category = false
                        this.Published_category= false
                        this.form = 'true'
                        this.imageuploadPercentage = 0
                        this.onStartup()
                }
                }
                    )
                .catch((error) => {
                this.$router.push("/admin/login")
                this.status = error.response.status
                
            })
            },
            submitSeries(){
                let formData2 = {
                title: this.category_selected.title,
                description: this.Description,
                series : this.Series,
                episode: this.Episode,
                url: this.videourl,
                identifier: this.category_selected.identifier
                }
                axios.post( domain + '/admin/post/tvseries',
                    formData2,
                    {
                        headers: {
                                'Content-Type': 'application/json',
                                'access_token': cookies.get('atoken')
                        },
                    }
                ).then((response) => {
                    if(response.status == "200"){
                        this.form = 'true'
                        this.$router.go(0)
                }
                }
                    )
                .catch((error) => {
                this.status = error.response.status
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
                    this.page = data
                    cookies.set("page", data)
                  }
                },
                usercount(data) {
                  this.totaluser = data
                }
            }
        }
    </script>