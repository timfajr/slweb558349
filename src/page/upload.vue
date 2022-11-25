<template>
    <div class="bg-mainblue w-screen h-screen flex flex-col">
    <Navbar />
	<div class="">
		<div>
			<h2>File Progress</h2>
			<hr/>
			<label>File
				<input type="file" name="myVideo" id="myVideos" v-on:change="handleFileUpload( $event )"/>
			</label>
			<br>
			<progress max="100" :value.prop="uploadPercentage"></progress>
			<br>
			<button v-on:click="submitFile()">Submit</button>
		</div>
	</div>
</div>
</template>

<script>
	import axios from 'axios';
	import Navbar from "/src/components/Navbar.vue";
	
	// Cookies
	import { useCookies } from "vue3-cookies";
	const { cookies } = useCookies();

	export default {
		data(){
			return {
				file: '',
				uploadPercentage: 0,
				page: ''
			}
		},
		components : {
            Navbar
        },
		methods: {
			handleFileUpload( event ){
				this.file = event.target.files[0];
			},
			
			submitFile(){
				let formData = new FormData();
				formData.append('myVideo', this.file);
				axios.post( 'https://api.bluebox.website/',
					formData,
					{
						headers: {
								'Content-Type': 'multipart/form-data'
						},
						onUploadProgress: function( progressEvent ) {
							this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
						}.bind(this)
					}
				).then(function(){
					console.log('SUCCESS!!');
				})
				.catch(function(){
					console.log('FAILURE!!');
				});
			},
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
            },
        },
	}
</script>