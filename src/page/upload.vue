<template>
    <div class="w-screen h-screen flex flex-col">
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
	export default {
		data(){
			return {
				file: '',
				uploadPercentage: 0
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
				axios.post( 'http://api.bluebox.website/',
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
		}
	}
</script>