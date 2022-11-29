
<template>
<div class="bg-mainblue w-screen h-screen">
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

    <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
        <button :disabled="isFirstPage" @click="prevPage" class="mr-6 bg-gray-500 p-1 rounded-lg px-2">prev page</button>
        <button :disabled="isLastPage" @click="nextPage" class="mr-6 bg-gray-500 p-1 rounded-lg px-2">next page</button>
      </template>
    </EasyDataTable>
    {{ restApiUrl }}
    </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { Header, ServerOptions, Item } from "vue3-easy-data-table";
import NavbarAdmin from "../../components/navbaradmin.vue";
import axios, { AxiosRequestConfig} from 'axios';


export default defineComponent({

components:{
    NavbarAdmin
},

setup() {
    const headers: Header[] = [
    { text: "_id", value: "_id" , width: 200},
    { text: "deviceid", value: "deviceid", sortable: true , width: 300 },
    { text: "ownerid", value: "ownerid", sortable: true , width: 300},
    { text: "transaction", value: "transaction" },
    { text: "purchased movie", value: "purchased_movie" },
    { text: "Operation", value: "operation" , width: 100}
    ];
    const items = ref<Item[]>([])

    const serverItemsLength = ref(0)
    const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 25,
    })

    var api = `http://localhost:3000/admin/getdevices?page=${1}&limit=${25}`
    const restApiUrl = computed(() => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
    if (sortBy && sortType) {
        if (sortType == "asc")
        {
            api = `http://localhost:3000/admin/getdevices?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy}`
            return `http://localhost:3000/admin/getdevices?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy}`
        }
        api = `http://localhost:3000/admin/getdevices?page=${page}&limit=${rowsPerPage}&sortBy=-${sortBy}`
        return `http://localhost:3000/admin/getdevices?page=${page}&limit=${rowsPerPage}&sortBy=-${sortBy}`
    } else {
        api = `http://localhost:3000/admin/getdevices?page=${page}&limit=${rowsPerPage}`
        return `http://localhost:3000/admin/getdevices?page=${page}&limit=${rowsPerPage}`
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

    const getListings = async () => {
        loading.value=true;
            const config: AxiosRequestConfig =  {
                method: 'get',
                url: api,
                headers: {
                    'Accept': 'application/json'
                }
            };
            axios(config)
            .then(function (response) {
                //state.tableData = response.data.data;
                items.value = response.data.devices
                serverItemsLength.value = response.data.totalitem
                console.log(items)
                loading.value = false;
            })
            .catch(function (error) {
                console.log(error);
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