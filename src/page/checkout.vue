<template>
    <div class="bg-mainblue min-h-screen h-full overflow-x-hidden">
      <Navbar />
      <div class="flex flex-col justify-center self-center mb-20">
        <div class="flex flex-col justify-center self-center h-full pt-20 w-9/12 ">
            <div class="flex justify-start text-2xl font-semibold text-white"> My Cart </div>
              <div class="flex flex-row justify-center w-full self-center items-center pt-10">
                <div class="border-4 w-full h-full rounded-xl flex text-white"> 
                <div class="flex flex-col w-full justify-start self-start p-10">
                    <div class="flex flex-row justify-between">
                        <div class="flex flex-row space-x-3 pl-4">
                            <Button @click="addbalance" class="bg-white bg-opacity-10 rounded-xl p-2 pr-4">
                                <font-awesome-icon icon="cart-plus" class="px-2" /> Balance
                            </Button>
                        </div>
                        <div class="flex flex-row space-x-3 pl-4">
                            <div class="bg-white bg-opacity-10 rounded-xl p-2 px-4">
                                <font-awesome-icon icon="clapperboard" class="pr-2" />
                                Subcription : {{ data.subscription}}
                            </div>
                            <div class="bg-white bg-opacity-10 rounded-xl p-2 px-4">
                                <font-awesome-icon icon="calendar-xmark" class="pr-2" />
                                Expire at : {{formatDate(data.expires)}}
                            </div>  
                            <div class="bg-white bg-opacity-10 rounded-xl p-2 px-4">
                                <font-awesome-icon icon="calendar" class="pr-2" />
                                Time left : {{ data.timeleft}} Day
                            </div>  
                            <div class="bg-white bg-opacity-10 rounded-xl p-2 px-4">
                                <font-awesome-icon icon="money-bill-1" class="pr-2" />
                                Balance : L$ {{ data.balance}}
                            </div>
                    </div>
                    </div>
                    <div v-if="this.$store.state.cart.total" class="flex flex-col w-full p-10">
                        <p class="flex justify-start text-lg font-semibold text-white pb-4">Checkout</p>
                        <div class="bg-white bg-opacity-10 p-4 px-10 rounded-2xl">
                            <ul class="grid grid-cols-5 border-b-2 p-2">
                                <li>
                                    Item
                                </li>
                                <li>
                                    Status
                                </li>
                                <li>
                                    Qty
                                </li>
                                <li>
                                    Price
                                </li>
                                <li>
                                    Total
                                </li>
                            </ul>
                        
                        <ul :key="item" v-for="item in this.$store.state.cart.items" class="grid grid-cols-5 p-2">
                            <li>
                                {{ item.item }}
                            </li>
                            <li>
                                {{ item.status }}
                            </li>
                            <li class="flex flex-row space-x-2">
                                <button class="w-4 bg-white bg-opacity-10 rounded text-center mr-2" id="increase" @click="decreaseValue(item)" value="Decrease Value">-</button> {{ item.qty }} <button class="w-4 bg-white bg-opacity-10 rounded text-center" id="decrease" @click="increaseValue(item)" value="Increase Value">+</button>
                            </li>
                            <li>
                                L$ {{ item.price }}
                            </li>
                            <li>
                                L$ {{ item.total }}
                            </li>
                        </ul>
                        <ul class="grid grid-cols-5 border-t-2 p-2">
                            <li>
                               
                            </li>
                            <li>
                            </li>
                            <li>
                            </li>
                            <li>
                            </li>
                            <li>
                            L$  {{this.$store.state.cart.total }}
                            </li>
                        </ul>
                    </div>
                    </div>
                    <div class="flex flex-row justify-end pt-10">
                        <p v-if="this.status" class="bg-mainyellow rounded text-mainblue font-semibold text-center p-2 w-2/12 ml-10">
                            {{this.response.message}}
                        </p>
                        <button v-if="this.$store.state.cart.total" @click="checkout" class="bg-mainyellow rounded text-mainblue font-semibold p-2 w-2/12 mr-10">
                            Checkout
                        </button>
                    </div>

                </div>
                </div>
            </div>
      </div>
      </div>
    </div>
    </template>
    
<script>
// Cookies
import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '

// Dep
import axios from "axios";
import dayjs from "dayjs";

import Navbar from "/src/components/Navbar.vue";
export default {
        name: 'App',
        data() {
            return {
            ready: 'no',
            page: '',
            status : '',
            response: [],
            data:[]
            }
        },
        components : {
            Navbar
    },
    beforeCreate() {
    this.$store.commit('cart/initialiseStore')
    },
    mounted(){
    this.onStartup()
    },
    watch:{
    page: function () {
        if ( cookies.get("page") != "/checkout/" + this.$route.params.token + "/" + this.$route.params.roomid ){
        this.$router.push( { path: cookies.get("page") } )
        }
    }
    },
    methods:{
    addbalance(){
    this.$socket.emit('topup', {
            roomid : this.$route.params.roomid,
            topup  : 'active'
        })
    },
    checkout() {
    const api = "https://api.bluebox.website/user/30daysub"
    const request = {
            "ownerid": this.data.ownerid,
            "item": this.$store.state.cart.items[0].item,
            "qty" : this.$store.state.cart.items[0].qty,
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
                this.$store.dispatch('cart/CheckoutCart')
            }

        })
    },
    increaseValue(item) {
    this.$store.dispatch('cart/updateProductOnCart', { item : 'subs30' , id : '1' , status: "standart" , qty: item.qty + 1 , price: 300 })
    },
    decreaseValue(item) {
    this.$store.dispatch('cart/updateProductOnCart', { item : 'subs30' , id : '1' , status: "standart" , qty: item.qty - 1 , price: 300 })
    },
    onTopupSelect() {
    this.$socket.emit('topup', {
                    roomid : this.$route.params.roomid ,
                    topup : "active"
    })
    },
    formatDate(date) {
        return dayjs(date).format('DD-MM-YYYY');
    },
    onStartup () {
    const api = "https://api.bluebox.website/user/me"
    axios
        .get(api, {
            headers: {
            'Content-Type': 'application/json',
            'access_token': this.$route.params.token
                }
        })
        .then(response => {
            this.data = response.data.message
            this.transaction = response.data.message.transaction
            this.total_transaction = response.data.totaltransaction
        });
    },
    Setupctx(){
            if (this.ready === "no")
            {
                this.$socket.emit('page', {
                    roomid : this.$route.params.roomid ,
                    page : "/myprofile/"+ this.$route.params.token + "/"+ this.$route.params.roomid
                    })
                this.$cookies.set('access_token',this.$route.params.token );
                this.$cookies.set('roomid',this.$route.params.roomid );
                setInterval(() => {
                if (this.ready === "no"){
                console.log("HIT")
                this.$router.go(0)
                }
            }, 5000)
            }
            },
    },
    sockets: {
            connect() {
                console.log('connected')
            },
            disconnect() {
                console.log('disconnected')
            },
            // Event Controller
            page( data ) {
                if ( data ){
                this.ready = "yes"
                this.page = data
                cookies.set("page", data)
                }
            }
        }
}
</script>