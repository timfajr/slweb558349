
<template>
    <div class="bg-mainblue w-screen h-full min-h-screen pb-10">
                      <!-- Update Crud  -->
            <!-- Delete Crud -->
            <div v-if="hidden == false" class="fixed z-20 w-screen h-full min-h-screen bg-black bg-opacity-50">
              <div class="flex h-screen flex-row place-items-center justify-center">
                <div class="h-5/12 w-4/12 bg-mainblue rounded-xl flex flex-col place-items-center">
                  <div class="flex self-end p-4">
                  <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="hidden = !hidden">
                    X
                  </button>
                </div>
                <div class="text-xs flex self-center w-full h-full p-4 flex-col  text-white">
                  <div class="text-xs  bg-white rounded flex pl-4 py-2 justify-center place-items-center bg-opacity-10">
                    Are you sure want to delete this item ?
                  </div>
                  <div class="bg-white rounded flex flex-col px-4 py-2 mt-4 bg-opacity-10">
                    <p>
                      Username : {{this.selected.username}}
                    </p>
                    <p>
                      Ownerid : {{this.selected.ownerid}}
                    </p>
                    <p>
                      Requested Movie : {{this.selected.requestedmovie}}
                    </p>
                    <p>
                      Movie Year: {{this.selected.movieyears}}
                    </p>
                    <p>
                      Message : {{this.selected.message}}
                    </p>
                    <p>
                      Status : {{this.selected.status}}
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
              <div class="flex shrink min-h-screen flex-row place-items-center justify-center">
                <div class="w-4/12 h-4/12 bg-mainblue rounded-xl flex flex-col">
                  <div class="flex self-end p-4">
                  <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="writehidden = !writehidden">
                    X
                  </button>
                </div>
                <div class="flex self-center w-full p-4 flex-col text-xs text-white">
                  <div class="bg-white rounded flex pl-4 py-2 justify-center place-items-center bg-opacity-10">
                    Edit Requested Movie
                  </div>
                  <div class="bg-white rounded flex flex-col px-4 py-2 mt-4 bg-opacity-10">
                    <p class="pl-2"> Username </p>
                    <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                      {{this.selected.username}}
                    </p>

                    <p class="pl-2"> Ownerid </p>
                    <p class="bg-white bg-opacity-10 rounded-xl p-2">
                      {{this.selected.ownerid}}
                    </p>

                    <p class="pl-2"> Requested Movie  </p>
                    <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                      {{this.selected.requestedmovie}}
                    </p>
                      
                    <p class="pl-2"> Movie Year </p>
                    <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                      {{this.selected.movieyear}}
                    </p>

                    <p class="pl-2"> Message </p>
                    <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                       {{this.selected.message}}
                    </p>

                    <p class="pl-2"> Reply </p>
                    <input id="Reply" type="text" class="bg-white bg-opacity-10  rounded-xl p-2"  v-model="reply" required />

                    <p class="pl-2"> Status </p>
                    <p class="bg-white bg-opacity-10 rounded-xl p-2">
                       {{this.selected.status}}
                    </p>
                    
                  </div>
                  <div class="flex flex-row space-x-2 justify-between">
                    <div class="flex flex-row space-x-2 mt-2 my-2 ">
                      <div class="flex items-center rounded-xl  p-2 w-full bg-opacity-10 bg-white">
                        <label for="Uploaded" class="ml-2 pr-2">Status</label>
                        <select id="Uploaded"  v-model="uploaded" class="text-white rounded p-2 bg-opacity-10 bg-white ">
                      <option value="pending" class="text-black">Pending</option>
                      <option value="uploaded"  class="text-black">Uploaded</option>
                    </select>
                  </div>
                    </div>
                  <button @click="submitEdit(selected)" class="font-semibold text-mainblue bg-mainyellow rounded flex flex-col px-4 py-2 mt-4 w-28 place-items-center self-end  bg-mainyellow">
                      Submit
                  </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <!-- Write Crud -->
            <!-- Update Crud -->
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
    
    const domain = "https://api.bluebox.website";
    //const domain = "http://localhost:3000";
    
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
        { text: "status", value: "status", sortable: true },
        { text: "username", value: "username", sortable: true },
        { text: "requested movie", value: "requestedmovie", sortable: true },
        { text: "movie year", value: "movieyear", sortable: true },
        { text: "message", value: "message" , width: 500},
        { text: "created_at", value: "created_at" , sortable: true },
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
                return domain + `/admin/getrequested/?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy}`
            }
            else {
              return domain +  `/admin/getrequested/?page=${page}&limit=${rowsPerPage}&sortBy=-${sortBy}`
            }
        } else {
            return domain +  `/admin/getrequested/?page=${page}&limit=${rowsPerPage}&sortBy=-created_at`
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
                      items.value = response.data.data
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
        const uploaded = ref("false");
        const secret = ref("");
        const reply = ref("");
    
        const deleteItem = async (val: Item) => {
            loading.value=true;
                const config: AxiosRequestConfig =  {
                    method: 'delete',
                    url: `${domain}/admin/deleterequested/?id=${val._id}`,
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
            status: uploaded.value,
            reply: reply.value
           }
                const config: AxiosRequestConfig =  {
                    method: 'PATCH',
                    url: domain + `/admin/updaterequest/?id=${val._id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': cookies.get("atoken")
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
          uploaded.value = val.status
          reply.value = val.reply
          secret.value = val.secret
          selected.value = val
        };
    
        const writeButton = (val: Item) => {
          writehidden.value = !writehidden.value
          ownerid.value = val.ownerid
          uploaded.value = val.status
          reply.value = val.reply
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
        writehidden,
        hidden,
        selected,
        // Ref Edit
        ownerid,
        uploaded,
        reply,
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