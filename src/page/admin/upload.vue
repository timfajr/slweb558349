<template>
<div class="bg-mainblue w-screen h-screen flex flex-col">
    <Navbaradmin />
	<h1 class="flex flex-row justify-center text-2xl font-semibold text-white mt-10"> Upload Movies </h1>
	<div class="flex flex-row justify-center space-x-10">
		<form @submit.prevent="submitForm" class="flex flex-col space-y-3 p-4 rounded-xl">
			  <input class="rounded-xl pl-4 p-2 bg-opacity-10 bg-white text-white"
			  placeholder="Title" id="Title" type="text" v-model="Title" required/>
			  <textarea rows="5" cols="60" class="rounded-xl pl-4 p-2 h-32 bg-opacity-10 bg-white text-white" 
			  placeholder="Description" id="description" type="text" v-model="Description" required/>
			  <input class="rounded-xl pl-4 p-2 bg-opacity-10 bg-white text-white" 
			  placeholder="Genre" id="Genre" type="text" v-model="Genre" required/>
			  <div class="flex flex-row space-x-3 w-full">
					<div class="flex items-center rounded-xl  p-2 w-full bg-opacity-10 bg-white">
						<input id="Topicks" type="checkbox" v-model="Topicks" value="true" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 ">
						<label for="Topicks" class="ml-2 text-sm font-medium text-gray-900 dark:text-white">Top picks</label>
					</div>
					<div class="flex items-center rounded-xl p-2 w-full bg-opacity-10 bg-white">
						<input id="Published" type="checkbox" v-model="Published" value="true" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
						<label for="Published" class="ml-2 text-sm font-medium text-white">Published</label>
					</div>
			  </div>
			<button v-if="videourl && imageurl" class="bg-white rounded-xl p-2 text-white bg-opacity-10" type="submit">Submit</button>
		  </form>
		<div class="flex flex-col space-y-20 justify-center">
			<div>
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
				<button v-if="file && !videourl && !hide" v-on:click="submitFile()" class="text-md text-white border-2 rounded-xl p-2">Submit</button>
				</div>
			</div>
			<div>
				<h2 class="font-bold text-white text-xl">Image Uploader</h2>
				<hr/>
				<div class="mt-5">
				<label>
					<input type="file" class="text-white mb-2"  name="myImage" id="myImage" v-on:change="handleImageUpload( $event )"/>
				</label>
				<br>
				<progress max="100" :value.prop="imageuploadPercentage"></progress>
				<p v-if="(imageuploadPercentage && imageuploadPercentage <= 99)" class="text-white text-md"> Upload Progress : {{this.imageuploadPercentage}} %</p>
				<p v-if="(imageuploadPercentage === 100)"> Upload Progress : Completed</p>
				<br>
				<button v-if="image && !imageurl" v-on:click="submitImage()" class="text-md text-white border-2 rounded-xl p-2">Submit</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import axios from 'axios'
	import Navbaradmin from "/src/components/Navbaradmin.vue"
	
	// Cookies
	import { useCookies } from "vue3-cookies"
	const { cookies } = useCookies()

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
				hide : "",

				// Form Data
				videourl : '',
				imageurl: '',
				Title: '',
				Description: '',
				Genre : '',
				Topicks : false,
				Published: false
			}
		},
		components : {
            Navbaradmin
        },
		methods: {
			handleFileUpload( event ){
				this.file = event.target.files[0]
			},
			handleImageUpload( event ){
				this.image = event.target.files[0]
			},
			submitFile(){
				let formData = new FormData()
				this.hide = true
				formData.append('myVideo', this.file)
				axios.post( 'https://api.bluebox.website/upload',
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
				).then((response) => (this.status = 'true', this.videourl=response.data.data.url))
				.catch((error) => {
				this.$router.push("/admin/login")
				this.status = error.response.status
            })
			},
			submitImage(){
				let formData = new FormData()
				formData.append('myImage', this.image)
				axios.post( 'https://api.bluebox.website/uploadimage',
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
			submitForm(){
				let formData2 = {
                title: this.Title,
                description: this.Description,
				genre : this.Genre,
				price: this.Price,
				discount: this.Discountprice,
				rentprice: this.Rentprice,
				rented: this.Rented,
				discounted: this.Discounted,
				topick: this.Topicks,
				published: this.Published,
				url: this.videourl,
				imgurl: this.imageurl
            	}
				axios.post( 'https://api.bluebox.website/admin/post/movie',
					formData2,
					{
						headers: {
								'Content-Type': 'application/json',
								'access_token': cookies.get('atoken')
						},
						onUploadProgress: function( progressEvent ) {
							this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
						}.bind(this)
					}
				).then((response) => {
					if(response.status == "200"){
						this.form = 'true'
						this.$router.push("/admin/movies/")
				}
				}
					)
				.catch((error) => {
				this.$router.push("/admin/login")
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