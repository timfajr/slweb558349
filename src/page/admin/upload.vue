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
				<input class="rounded-xl pl-4 p-2 w-full bg-opacity-10 bg-white text-white" 
				placeholder="Price" id="Price" type="number" v-model="Price" required/>
				<input class="rounded-xl pl-4 p-2 w-full bg-opacity-10 bg-white text-white" 
				placeholder="Discount" id="Discount" type="number" v-model="Discount" required/>
			  </div>
			  <div class="flex flex-row space-x-3 w-full">
				<input class="rounded-xl pl-4 p-2 w-full bg-opacity-10 bg-white text-white" 
				placeholder="Rent price" id="Rentprice" type="text" v-model="Rentprice" required/>
					<div class="flex items-center bg-opacity-10 bg-white rounded-xl p-2 w-full">
						<input id="Rented" type="checkbox" v-model="Rented" value="true" class="bg-opacity-10 bg-white w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ">
						<label for="Rented" class="ml-2 text-sm font-medium text-gray-900 dark:text-white">Rent</label>
					</div>
					<div class="flex items-center rounded-xl p-2 w-full bg-opacity-10 bg-white">
						<input id="Topicks" type="checkbox" v-model="Topicks" value="true" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 ">
						<label for="Topicks" class="ml-2 text-sm font-medium text-gray-900 dark:text-white">Top picks</label>
					</div>
					<div class="flex items-center rounded-xl p-2 w-full bg-opacity-10 bg-white">
						<input id="Discounted" type="checkbox" v-model="Discounted" value="true" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
						<label for="Discounted" class="ml-2 text-sm font-medium text-white">Discounted</label>
					</div>
					<div class="flex items-center rounded-xl p-2 w-full bg-opacity-10 bg-white">
						<input id="Published" type="checkbox" v-model="Published" value="true" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
						<label for="Published" class="ml-2 text-sm font-medium text-white">Published</label>
					</div>
			  </div>
			<button v-if="videourl" class="bg-white rounded-xl p-2 text-white bg-opacity-10" type="submit">Submit</button>
		  </form>
		<div class="flex flex-row justify-center mt-10">
			<div>
				<h2 class="font-bold text-white text-xl">Video Uploader</h2>
				<hr/>
				<div class="mt-5">
				<label>File
					<input type="file" name="myVideo" id="myVideos" v-on:change="handleFileUpload( $event )"/>
				</label>
				<br>
				<progress max="100" :value.prop="uploadPercentage"></progress>
				<p v-if="uploadPercentage" class="text-white text-md"> Upload Progress : {{this.uploadPercentage}} %</p>
				<br>
				<button v-if="file && !videourl" v-on:click="submitFile()" class="text-md text-white border-2 rounded-xl p-2">Submit</button>
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
				uploadPercentage: 0,
				page: '',
				status : "false",
				form : "false",

				// Form Data
				videourl : '',
				Title: '',
				Description: '',
				Genre : '',
				Price :  '',
				Discount: '',
				Rentprice: '',
				Rented : false,
				Topicks : false,
				Discounted: false,
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
			
			submitFile(){
				let formData = new FormData()
				formData.append('myVideo', this.file)
				axios.post( 'http://localhost:3000/upload',
					formData,
					{
						headers: {
								'Content-Type': 'multipart/form-data'
						},
						onUploadProgress: function( progressEvent ) {
							this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
						}.bind(this)
					}
				).then((response) => (this.status = 'true', this.videourl=response.data.data.url))
				.catch((error) => {
				this.status = error.response.status
                console.log(error)
            })
			},
			submitForm(){
				let formData2 = {
                title: this.Title,
                description: this.Description,
				genre : this.Genre,
				price: this.Price,
				discount: this.Discount,
				rentprice: this.Rentprice,
				discounted: this.Discounted,
                rented: this.Rented,
				topick: this.Topicks,
				published: this.Published,
				url: this.videourl
            	}
				axios.post( 'http://localhost:3000/admin/post/movie',
					formData2,
					{
						headers: {
								'Content-Type': 'application/json'
						},
						onUploadProgress: function( progressEvent ) {
							this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
						}.bind(this)
					}
				).then((response) => {
					if(response.status == "200"){
						this.form = 'true'
						this.$router.push("/admin/dashboard")
				}
				}
					)
				.catch((error) => {
				this.status = error.response.status
                console.log(error)
				
            })
			}
		},
	
	watch:{
      page: function () {
          if ( cookies.get("page") != "/upload" ){
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
            usercount(data) {
              this.totaluser = data
            }
        }
	}
</script>