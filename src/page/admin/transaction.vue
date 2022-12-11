
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
        <template #item-created_at="created_at">
            <p>{{formatDate(created_at.created_at)}}</p>
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
    import axios, { AxiosRequestConfig} from 'axios';
    import NavbarAdmin from "../../components/Navbaradmin.vue"
    import dayjs from "dayjs";
    
    // Cookies
    import { useCookies } from "vue3-cookies"
    const { cookies } = useCookies()

    import router from "../../router";
    
    export default defineComponent({
    
    components:{
        NavbarAdmin
    },
    
    setup() {
        const headers: Header[] = [
        { text: "_id", value: "_id"},
        { text: "ownerid", value: "ownerid", sortable: true },
        { text: "item", value: "item", sortable: true  },
        { text: "quantity", value: "quantity" , sortable: true },
        { text: "price", value: "price" },
        { text: "total", value: "total" , sortable: true },
        { text: "transaction date", value: "created_at" , sortable: true }
        ];
        const items = ref<Item[]>([])

        const serverItemsLength = ref(0)
        const serverOptions = ref<ServerOptions>({
        page: 1,
        rowsPerPage: 2,
        })
        
        const restApiUrl = computed(() => {
        const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
        if (sortBy && sortType) {
            if (sortType == "asc")
            {
                return `https://api.bluebox.website/admin/gettransaction?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy}`
            }
            return `https://api.bluebox.website/admin/gettransaction?page=${page}&limit=${rowsPerPage}&sortBy=-${sortBy}`
        } else {
            return `https://api.bluebox.website/admin/gettransaction?page=${page}&limit=${rowsPerPage}`
        }
        })
        
        const loading = ref(false);
        
        const deleteItem = (val: Item) => {
          console.log(val)
        };
        
        const editItem = (val: Item) => {
          console.log(val)
        };

        const formatDate = (date) => {
            return dayjs(date).format('DD-MM-YYYY');
        };

        const submitEdit = (val: Item) => {
          console.log(val)
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
                    if(response.status == 200){
                    items.value = response.data.devices
                    serverItemsLength.value = response.data.totalitem
                    loading.value = false;
                    }
                    else{
                    router.push('/admin/login')
                    }
                })
                .catch(function (error) {
                    router.push('/admin/login')
                });
            }
        
        // first load when created
        getListings();
        
        watch(
        serverOptions,
        (value) => {
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