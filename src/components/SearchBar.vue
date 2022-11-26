<template>
    <div>
      <div class="relative text-gray-600 focus-within:text-gray-400 ">
        <span class="absolute inset-y-0 left-1 flex items-center pl-2">
          <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </span>
        <input @keypress.enter="onInput" type="text" class="w-full p-4 rounded-xl py-4 text-md pl-14 focus:outline-none focus:bg-gray-800 focus:text-white" placeholder="Search" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchBar",
    methods: {
      onInput: function (event) {
        this.$emit("termChange", event.target.value);
      }
    }
  }
  </script>