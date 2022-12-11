
<template>
<div class="bg-mainblue w-screen h-full min-h-screen pb-10">
    <NavbarAdmin />
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
            @click="deleteItem(item)"
          />
          <img
            src="/src/images/edit.png"
            class="w-6"
            @click="editItem(item)"
          />
        </div>
    </template>

  <template #item-devices="devices">
      <div class="flex flex-row space-x-2 justify-center border-b-2">
        Device ID
      </div>
      <div v-for="i in devices.devices" :key="i" class="flex flex-row space-x-2 justify-center">
        {{i.deviceid}}
      </div>
  </template>

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
    { text: "_id", value: "_id" , width: 200},
    { text: "deviceid", value: "devices", sortable: true , width: 300 },
    { text: "ownerid", value: "ownerid", sortable: true , width: 300},
    { text: "subscription", value: "subscription" },
    { text: "timeleft", value: "timeleft" },
    { text: "balance", value: "balance" },
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
            return `https://api.bluebox.website/admin/getdevices?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy}`
        }
        return `https://api.bluebox.website/admin/getdevices?page=${page}&limit=${rowsPerPage}&sortBy=-${sortBy}`
    } else {
        return `https://api.bluebox.website/admin/getdevices?page=${page}&limit=${rowsPerPage}`
    }
    })

    const loading = ref(false);

    const deleteItem = (val: Item) => {
      console.log(val)
    };

    const editItem = (val: Item) => {
      console.log(val)
    };

    const submitEdit = (val: Item) => {
      console.log(val)
    };

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

    return {
    headers,
    items,
    serverOptions,
    serverItemsLength,
    restApiUrl,
    loading,
    deleteItem,
    editItem,
    formatDate,
    submitEdit
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