
<template>
<div class="bg-mainblue w-screen h-full min-h-screen pb-10">
    <NavbarAdmin />
            <!-- Update Crud  -->
        <!-- Delete Crud -->
        <div v-if="hidden == false" class="fixed z-20 w-screen h-full min-h-screen bg-black bg-opacity-50">
          <div class="flex h-screen flex-row place-items-center justify-center">
            <div class="h-2/5 w-4/12 bg-mainblue rounded-xl flex flex-col place-items-center">
              <div class="flex self-end p-4">
              <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="hidden = !hidden">
                X
              </button>
            </div>
            <div class="flex self-center w-full h-full p-4 flex-col  text-white">
              <div class="bg-white rounded flex pl-4 py-2 justify-center place-items-center bg-opacity-10">
                Are you sure want to delete this item ?
              </div>
              <div class="bg-white rounded flex flex-col px-4 py-2 mt-4 bg-opacity-10">
                <p>
                  Username : {{this.selected.username}}
                </p>
                <p>
                  Subscription : {{this.selected.subscription}}
                </p>
                <p>
                  timeleft : {{this.selected.timeleft}} Day
                </p>
                <p> Expired at :  {{formatDate(this.selected.expires)}}</p>
                <p class="text-ellipsis overflow-hidden h-12">
                  Balance : L$ {{this.selected.balance}}
                </p>
              </div>
              <button @click="deleteItem(selected)" class="font-semibold text-white bg-red-700 rounded flex flex-col px-4 py-2 mt-4 w-28 place-items-center self-end  bg-mainyellow">
                  Delete
              </button>
            </div>
          </div>
        </div>
        </div>
        <!-- Delete Crud -->

        <!-- Write Crud -->
        <div v-if="writehidden == false" class="fixed z-20 w-screen h-full min-h-screen bg-black bg-opacity-50">
          <div class="flex h-screen flex-row place-items-center justify-center">
            <div class="h-2/5 w-4/12 bg-mainblue rounded-xl flex flex-col place-items-center">
              <div class="flex self-end p-4">
              <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="writehidden = !writehidden">
                X
              </button>
            </div>
            <div class="flex self-center w-full h-full p-4 flex-col  text-white">
              <div class="bg-white rounded flex pl-4 py-2 justify-center place-items-center bg-opacity-10">
                Edit User
              </div>
              <div class="bg-white rounded flex flex-col px-4 py-2 mt-4 bg-opacity-10">
                <p>
                  Username : {{this.selected.username}}
                </p>
                <p>
                  Subscription : {{this.selected.subscription}}
                </p>
                <p>
                  timeleft : {{this.selected.timeleft}} Day
                </p>
                <p> Expired at :  {{formatDate(this.selected.expires)}}</p>
                <p class="text-ellipsis overflow-hidden h-12">
                  Balance : L$ {{this.selected.balance}}
                </p>
              </div>
              <div class="flex flex-row space-x-2 justify-between">
                <div class="flex flex-row space-x-2 mt-2 my-2 ">
                  <p class="place-items-center justify-center flex bg-white bg-opacity-10 rounded px-6 ">
                  Give Time
                </p>
                <li class="flex flex-row space-x-2 place-items-center justify-center bg-white bg-opacity-10 rounded px-6 ">
                  <button class="w-4 bg-white bg-opacity-10 rounded text-center mr-2" id="increase" @click="decreaseValue()" value="Decrease Value">-</button>
                  {{ qty }} Month
                  <button class="w-4 bg-white bg-opacity-10 rounded text-center" id="decrease" @click="increaseValue()" value="Increase Value">+</button>
              </li>
                </div>
              <button @click="submitEdit(selected)" class="font-semibold text-mainblue bg-mainyellow rounded flex flex-col px-4 py-2 mt-4 w-28 place-items-center self-end  bg-mainyellow">
                  Submit
              </button>
              </div>
              <p class="flex rounded px-4 ">
                  ** Submit 0 Month To update Time Manually
                </p>
            </div>
          </div>
        </div>
        </div>
        <!-- Write Crud -->
        <!-- Update Crud -->

    <div class="flex flex-row justify-center justify-items-center mt-10">
    <div class="w-8/12">
        <EasyDataTable
        v-model:server-options="serverOptions"
        :headers="headers"
        :items="items"
        :server-items-length="serverItemsLength"
        :loading="loading"
        theme-color="#1d90ff"
        table-class-name="customize-table"
        header-text-direction="center"
        body-text-direction="center"
        alternating
        border-cell
        buttons-pagination
    >
    
     <template #item-operation="item">
        <div class="flex flex-row space-x-2 justify-center">
          <img
            src="/src/images/delete.png"
            class="w-6"
            @click="hideButton(item)"
          />
          <img
            src="/src/images/edit.png"
            class="w-6"
            @click="writeButton(item)"
          />
        </div>
    </template>
    <!--
    
   <template #item-devices="devices">
      <div class="flex flex-row space-x-2 justify-center border-b-2">
        Device ID
      </div>
      <div v-for="i in devices.devices" :key="i" class="flex flex-row space-x-2 justify-center">
        {{i.deviceid}}
      </div>
  </template>
  -->
  <template #item-timeleft="timeleft">
    <p>{{timeleft.timeleft}} Day</p>
  </template>
  
  <template #expand="transaction">
    <div class="grid">
      <ul class="grid grid-cols-4 text-center border-b-2">
        <li>
          Item
        </li>
        <li>
          QTY
        </li>
        <li>
          Total
        </li>
        <li>
          Transaction Date 
        </li>
      </ul>
      <ul v-for="i in transaction.transaction" :key="i" class="grid grid-cols-4 text-center space-y-2">
          <li>
          {{i.item}}
          </li>
          <li>
            {{i.quantity}}
          </li>
          <li>
            {{i.total}}
          </li>
          <li>
            {{ formatDate(i.created_at) }}
          </li>
        </ul>
    </div>
    </template>
    <!--
    <template #item-created_at="created_at">
      <p>{{formatDate(created_at.created_at)}}</p>
    </template>
    -->
    <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
        <button :disabled="isFirstPage" @click="prevPage" class="mr-6 bg-gray-500 p-1 rounded-lg px-2">prev page</button>
        <button :disabled="isLastPage" @click="nextPage" class="mr-6 bg-gray-500 p-1 rounded-lg px-2">next page</button>
    </template>

    </EasyDataTable>
    </div>
    </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, computed, watch } from "vue";
import { Header, ServerOptions, Item } from "vue3-easy-data-table";
import NavbarAdmin from "../../components/Navbaradmin.vue"
import axios, { AxiosRequestConfig} from 'axios';
import dayjs from "dayjs";

//const domain = "https://api.bluebox.website";
const domain = "http://localhost:3000";

// Cookies
import { useCookies } from "vue3-cookies"
import router from "../../router";
const { cookies } = useCookies()

export default defineComponent({

components:{
    NavbarAdmin
},

setup() {
    const headers: Header[] = [

    /// { text: "deviceid", value: "devices", sortable: true , width: 300 },
    { text: "ownerid", value: "ownerid", sortable: true , width: 300},
    { text: "username", value: "username", sortable: true , width: 300},
    { text: "subscription", value: "subscription", sortable: true },
    { text: "timeleft", value: "timeleft", sortable: true },
    { text: "balance", value: "balance" , sortable: true },
    { text: "Operation", value: "operation" , width: 100}
    ];
    const items = ref<Item[]>([])

    const serverItemsLength = ref(0)
    const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 25,
    })

    const restApiUrl = computed(() => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
    if (sortBy && sortType) {
        if (sortType == "asc")
        {
            return domain + `/admin/getdevices?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy}`
        }
        else {
          return domain +  `/admin/getdevices?page=${page}&limit=${rowsPerPage}&sortBy=-${sortBy}`
        }
    } else {
        return domain +  `/admin/getdevices?page=${page}&limit=${rowsPerPage}&sortBy=-created_at`
    }
    })

    const loading = ref(false);
    
    const formatDate = (date) => {
            return dayjs(date).format('DD-MM-YYYY');
    };

    const getListings = async () => {
        var api = restApiUrl.value
        loading.value=true;
            const config: AxiosRequestConfig =  {
                method: 'get',
                url: api,
                headers: {
                    'Accept': 'application/json',
                    'access_token': cookies.get("atoken")
                }
            };
            axios(config)
            .then(function (response) {
                //state.tableData = response.data.data;
                if ( response.status == 200 ){
                  items.value = response.data.devices
                  serverItemsLength.value = response.data.totalitem
                  loading.value = false;
                }
                else {
                  router.push("/admin/login")
                }
            })
            .catch(function (error) {
                router.push("/admin/login")
            });
        }


    // first load when created
    getListings();

    watch(
    serverOptions,
    () => {
        getListings();
    },
    { deep: true }
    );


    // Update CRUD //

    const hidden = ref(true);
    const writehidden = ref(true);
    const selected = ref({});

    // Edit Crud Ref
    const ownerid = ref("") ;
    const qty = ref(0);
    const secret = ref("");

    const deleteItem = async (val: Item) => {
        loading.value=true;
            const config: AxiosRequestConfig =  {
                method: 'delete',
                url: `${domain}/admin/user/delete/?id=${val._id}`,
                headers: {
                    'access_token': cookies.get("atoken")
                }
            }
            axios(config)
            .then(function (response) {
                if(response.status == 200){
                  loading.value=false;
                  hidden.value= true;
                  writehidden.value= true;
                  getListings();
                }
                else{
                  console.log(response)
                }
            })
            .catch(function (error) {
              console.log(error)
            })
    };
    
    const submitEdit = (val: Item) => {
      loading.value=true;
      const data = { 
        ownerid: ownerid.value,
        qty: qty.value,
        secret: secret.value
       }
            const config: AxiosRequestConfig =  {
                method: 'post',
                url: `${domain}/user/inworld/30daysub/`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data, null)
            }
            axios(config)
            .then(function (response) {
                if(response.status == 200){
                  loading.value=false;
                  hidden.value= true;
                  writehidden.value= true;
                  getListings();
                }
                else{
                  console.log(response)
                }
            })
            .catch(function (error) {
              console.log(error)
            })
    };

    const hideButton = (val: Item) => {
      hidden.value = !hidden.value
      ownerid.value = val.ownerid
      qty.value = 0
      secret.value = val.secret
      selected.value = val
    };
    const decreaseValue = () => {
      if ( qty.value >= 0) {
        --qty.value
      }
      if (qty.value <= 0){
        qty.value = 0
      }
    };
    const increaseValue = () => {
      ++qty.value
    };

    const writeButton = (val: Item) => {
      writehidden.value = !writehidden.value
      ownerid.value = val.ownerid
      qty.value = 0
      secret.value = val.secret
      selected.value = val
    };

    // Update CRUD //

    return {
    headers,
    items,
    serverOptions,
    serverItemsLength,
    restApiUrl,
    loading,
    // Update Crud //
    deleteItem,
    submitEdit,
    hideButton,
    writeButton,
    decreaseValue,
    increaseValue,
    writehidden,
    hidden,
    selected,
    // Ref Edit
    ownerid,
    qty,
    secret,
    // Update Crud //
    formatDate
    }
},
}
);
</script>

<style>
.customize-table {
  --easy-table-border: 1px solid #445269;
  --easy-table-border-radius: 16px;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #2d3a4f;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #395888;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-footer-background-color: #2d3a4f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>