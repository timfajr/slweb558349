<template>
    <div class="bg-mainblue w-screen h-screen flex flex-col justify-center self-center">
      <div class="flex flex-col justify-center self-center">
        <img src="../../images/Untitled.png " class="object-contain h-28 w-22 rounded mb-20" />
        <div class="flex flex-col px-24 py-12 bg-white bg-opacity-10 justify-center self-center rounded-xl">
          <form @submit.prevent="submitForm" class="p-2">
            <div>
              <label for="name" class="text-white" >Username:</label><br>
              <input id="name" type="text" class="rounded-xl p-2"  v-model="username" required/>
            </div>
            <div class="pt-4">
              <label for="password" class="text-white" >Password:</label><br>
              <input id="password" type="password" class="rounded-xl p-2" v-model="password" required/>
            </div>
            <button class="flex bg-mainyellow text-mainblue p-2 rounded-xl mt-4 font-semibold" type="submit">Login</button>
          </form>
        </div>
        <div v-if="response" class="mt-4 flex flex-col space-y-2 w-full max-h-25 p-2 text-md rounded-lg text-white flex-grow-0">
          <h3 class="bg-white bg-opacity-10 p-2 flex rounded-xl w-fit">Notification</h3>
          <p v-if="response" class="bg-white bg-opacity-10 rounded-xl p-2 text-elipsis flex overflow-clip"> {{ response }}</p>
        </div>
      </div>
    </div>
    
</template>
    
<script>
    import axios from 'axios';

    // Cookies
    import { useCookies } from "vue3-cookies"
    const { cookies } = useCookies()
    
    const domain = "https://api.bluebox.website";
    //const domain = "http://localhost:3000";

    export default {
            name: 'App',
            data() {
              return {
                user: '',
                jwtstatus: '',
                response: '',
                success: '',
                username: '',
                password: ''
              }
            },
      mounted(){
        this.Setupctx()
      },
      methods:{
        Setupctx(){
            cookies.set('atoken', '')
            setInterval(() => {
            console.log('hit')
            const api = domain + "/admin/token"
            axios
            .post(api,{},{ 
              headers: {
                'access_token': cookies.get("atoken")
            }})
            .then(response => {
                if ( response.status === 200 ){
                  console.log(response.status)
                  this.jwtstatus = "OK"
                }
            }).catch(error => {
                this.response = error
                this.jwtstatus = 'Expired'
            })
            if ( this.jwtstatus == 'Expired' ) {
            this.$router.push("/admin/login")
            }
        }, 1000 * 60)
        },
        submitForm() {
            axios.post(domain +  '/admin/login', {
                username: this.username,
                password: this.password
            }).then(response => {
                this.success = response.data.message
                this.response = JSON.stringify( response.data.message )
                if ( response.data.message === "success" ){
                    cookies.set('atoken', response.data.access_token)
                    this.jwtstatus ='OK'
                    this.$router.push("/admin/dashboard")
                }
            }).catch(error => {
                this.response = 'Error: ' + error.response.status
            })
            this.username = ''
            this.password = ''
            this.jwtstatus == 'Expired'
            }
      }
    }

</script>