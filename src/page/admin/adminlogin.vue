<template>
    <Navbaradmin />
    <div class="bg-mainblue w-screen h-screen">
        <form @submit.prevent="submitForm">
            <div>
              <label for="name">Username:</label><br>
              <input id="name" type="text" v-model="username" required/>
            </div>
            <div>
              <label for="email">Password:</label><br>
              <input id="email" type="password" v-model="password" required/>
            </div>
            <button class="" type="submit">Submit</button>
            <div>
              <h3>Data retrieved from server:</h3>
              <p v-if="success"> {{ success }}</p>
              <pre>{{ response }}</pre>
            </div>
          </form>
    </div>
    
</template>
    
<script>
    import axios from 'axios';

    // Cookies
    import { useCookies } from "vue3-cookies"
    const { cookies } = useCookies()
    
    import Navbaradmin from "/src/components/Navbaradmin.vue"
    export default {
            name: 'App',
            data() {
              return {
                user: '',
                jwtstatus: '',
                response: '',
                success: '',
              }
            },
            components : {
                Navbaradmin
      },
      mounted(){
        this.Setupctx()
      },
      methods:{
        Setupctx(){
            setInterval(() => {

            const api = "http://localhost:3000/admin/token"
            axios
            .post(api,{},{ 
              headers: {
                'access_token': cookies.get("atoken")
            }})
            .then(response => {
              console.log(response.status)
                if ( response.status === 200 ){
                  this.jwtstatus = "OK"
                  this.$router.push("/admin/dashboard")
                }
            }).catch(error => {
                console.log(error)
                this.response = error
                this.jwtstatus = 'Expired'
            })
            if ( this.jwtstatus == 'Expired' ) {
            this.$router.push("/admin/login")
            }
        }, 5000)
        },
        submitForm() {
            axios.post('http://localhost:3000/admin/login', {
                username: this.username,
                password: this.password
            }).then(response => {

                console.log( response )
                this.success = response.data.message
                this.response = JSON.stringify( response.data, null, 2 )
                if ( response.data.message === "success" ){
                    cookies.set('atoken', response.data.access_token)
                    this.jwtstatus ='OK'
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