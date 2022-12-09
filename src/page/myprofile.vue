<template>
    <div class="bg-mainblue min-h-screen h-full overflow-x-hidden">
      <Navbar />
      <div class="flex flex-col justify-center self-center mb-20">
        <div class="flex flex-col justify-center self-center h-full w-11/12 ">
              <div class="flex flex-row justify-center w-full self-center items-center pt-10">
                <div class="bg-white bg-opacity-10 w-full h-full rounded-xl flex text-white text-sm"> 
                <div class="flex flex-col w-full justify-start self-start p-10">
                    <div class="flex flex-row justify-between">
                        <div class="flex flex-row space-x-3 pl-4 justify-center self-start">
                            <Button @click="addbalance" class="bg-white bg-opacity-10 rounded-xl p-2 pr-4">
                                <font-awesome-icon icon="cart-plus" class="px-2" /> Balance
                            </Button>
                            <Button @click="addtime" class="bg-white bg-opacity-10 rounded-xl p-2 pr-4">
                                <font-awesome-icon icon="cart-plus" class="px-2" /> Time
                            </Button>
                            <Button v-if="(this.$store.state.cart.checkoutStatus == 'active')" @click="checkout" class="bg-white bg-opacity-10 rounded-xl p-2 pr-4">
                                <font-awesome-icon icon="basket-shopping" class="px-2" /> Checkout
                            </Button>
                        </div>
                        <div class="flex flex-row space-x-3 pl-4">
                            <div class="flex flex-col space-y-3">
                                <div class="bg-white bg-opacity-10 rounded-xl p-2 px-4">
                                    <font-awesome-icon icon="clapperboard" class="pr-2" />
                                    Subcription : {{ data.subscription}}
                                </div>
                                <div class="bg-white bg-opacity-10 rounded-xl p-2 px-4">
                                    <font-awesome-icon icon="calendar-xmark" class="pr-2" />
                                    Expire at : {{formatDate(data.expires)}}
                                </div>  
                            </div>
                            <div class="flex flex-col space-y-3">
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
                    </div>
                    <div v-if="transaction" class="flex flex-col w-full p-10">
                        <p class="flex justify-start text-lg font-semibold text-white pb-4">Transaction History</p>
                        <div class="bg-white bg-opacity-10 p-4 px-10 rounded-2xl">
                            <ul class="grid grid-cols-5 border-b-2 p-2">
                                <li>
                                    Item
                                </li>
                                <li>
                                    Purchased Date
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
                        
                        <ul :key="item" v-for="item in transaction" class="grid grid-cols-5 p-2">
                            <li>
                                {{ item.item }}
                            </li>
                            <li>
                                {{formatDate(item.created_at)}}
                            </li>
                            <li>
                                {{ item.quantity }}
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
                            L$  {{ this.total_transaction }}
                            </li>
                        </ul>
                    </div>
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

// Dep
import axios from "axios";
import dayjs from "dayjs";

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '

import Navbar from "/src/components/Navbar.vue";
export default {
        name: 'App',
        data() {
            return {
            ready: 'no',
            page: '',
            data:[],
            ready: 'no',
            active: 'no',
            transaction:[],
            total_transaction: 0
            }
        },
        components : {
            Navbar
    },
    watch:{
    page: function () {
        if ( cookies.get("page") != "/myprofile/" + this.$route.params.token + "/" + this.$route.params.roomid ){
        this.$router.push( { path: cookies.get("page") } )
        console.log( "hit" )
        }
    }
    },
    beforeCreate() {
    this.$store.commit('cart/initialiseStore')
    },
    mounted(){
    this.onStartup()
    },
    methods:{
    addbalance(){
    this.$socket.emit('topup', {
            roomid : this.$route.params.roomid,
            topup  : 'active'
        })
    },
    checkout(){
    this.$socket.emit('page', {
            roomid : this.$route.params.roomid ,
            page : "/checkout/" + this.$route.params.token + "/" + this.$route.params.roomid
        })
    },
    addtime() {
    this.$store.dispatch('cart/addProductToCart', { item : 'subs30' , id : '1' , status: "standart" , qty: 1 , price: 300 })
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
            console.log(response)
            this.data = response.data.message
            this.transaction = response.data.transaction
            this.total_transaction = response.data.totaltransaction
        })
    },
    Setupctx(){
            if (this.ready === "no")
            {
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
    },
    topup( data ){
        if ( data ){
        this.active = data
        }
    }
},
}
</script>