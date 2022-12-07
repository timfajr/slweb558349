<template>
    <button @click="Toupup" class="w-fit bg-mainyellow rounded-xl border-2">
      <div class="relative font-semibold text-mainblue hover:text-black shadow-xl p-2">
        <span class="absolute inset-y-0 left-1 flex items-center pl-2">
          <div class="p-1 focus:outline-none focus:shadow-outline w-full">
            <font-awesome-icon icon="basket-shopping" />
          </div>
        </span>
        <div class="ml-10 pr-2"> Wallet <span class="text-bold">( L$ {{ count }} ) </span> </div>
      </div>
    </button>
  </template>
  
  <script>
  export default {
    name: "CartButton",
    props: {
      balance: Number,
    },
    methods: {
      Toupup: function () {
        this.$emit("topup","clicked");
      }
    },
  }
  </script>