
<template>
    <div class="relative bg-mainblue w-screen h-full min-h-screen pb-10">
              <!-- Update Crud  -->
        <!-- Delete Crud -->
        <div v-if="hidden == false" class="text-xs fixed z-20 w-screen h-full min-h-screen bg-black bg-opacity-50">
          <div class="flex h-screen flex-row place-items-center justify-center">
            <div class="h-4/12 w-4/12 bg-mainblue rounded-xl flex flex-col place-items-center">
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
                  Title : {{this.selected.title}}
                </p>
                <p>
                  Genre : {{this.selected.genre}}
                </p>
                <p>
                  Topick : {{this.selected.topick}}
                </p>
                <p> Uploaded :  {{formatDate(this.selected.created_at)}}</p>
                <p class="text-ellipsis overflow-hidden h-12">
                  Description : {{this.selected.description}}
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
        <template #item-operation="item">
            <div class="flex flex-row space-x-2 justify-center">
              <img
                src="/src/images/delete.png"
                class="w-6"
                @click="hideButton(item)"
              />
            </div>
        </template>

        <template #item-created_at="created_at">
          <p>{{formatDate(created_at.created_at)}}</p>
        </template>

    <template #expand="series">
    <div class="grid">
      <ul class="grid grid-cols-4 text-center border-b-2">
        <li>
          Title
        </li>
        <li>
          Episode
        </li>
        <li>
          Series
        </li>
        <li>
          Uploaded Date
        </li>
      </ul>
      <ul v-for="i in series.series" :key="i" class="grid grid-cols-4 text-center space-y-2">
          <li>
          {{i.title}}
          </li>
          <li>
            {{i.episode}}
          </li>
          <li>
            {{i.series}}
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
    import { defineComponent, ref, reactive , computed, watch } from "vue";
    import { Header, ServerOptions, Item } from "vue3-easy-data-table";
    import axios, { AxiosRequestConfig} from 'axios';
    import NavbarAdmin from "../../components/Navbaradmin.vue"
    import router from "../../router";
    import dayjs from "dayjs";

    // Cookies
    import { useCookies } from "vue3-cookies"
    const { cookies } = useCookies()

    // Update Domain
    const domain = "https://api.bluebox.website";
    //const domain = "http://localhost:3000";

    export default defineComponent({
    
    components:{
        NavbarAdmin
    },
    
    setup() {
        const headers: Header[] = [
        { text: "title", value: "title", sortable: true },
        { text: "genre", value: "genre", sortable: true  },
        { text: "topick", value: "topick" , sortable: true },
        { text: "created at", value: "created_at" , sortable: true },
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
                return domain + `/admin/gettvseriescategory?page=${page}&limit=${rowsPerPage}&sortBy=-${sortBy}`
            }
            else
            {
              return domain + `/admin/gettvseriescategory?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy}`
            }
        } else {
            return domain + `/admin/gettvseriescategory?page=${page}&limit=${rowsPerPage}&sortBy=-created_at`
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
                    if(response.status == 200){
                      items.value = response.data.data
                      serverItemsLength.value = response.data.totalitem
                      loading.value = false;
                    }
                    else{
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
        const title = ref("") ;
        const description = ref("");
        const genre = ref("");
        const topick = ref(false);

        const deleteItem = async (val: Item) => {
            console.log(val._id)
            loading.value=true;
                const config: AxiosRequestConfig =  {
                    method: 'delete',
                    url: `${domain}/admin/deleteseriestitle/?id=${val._id}`,
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
        
        const hideButton = (val: Item) => {
          hidden.value = !hidden.value
          title.value = val.title
          description.value = val.description
          genre.value = val.genre
          topick.value = val.topick
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
        hideButton,
        writehidden,
        hidden,
        selected,
        // Ref Edit
        title,
        description,
        genre,
        topick,
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