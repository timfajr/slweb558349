<template>
    <li class="bg-gray-300 bg-opacity-5 rounded-xl m-4 shadow-xl">
      <div class="relative group">
        <img class="mr-3 aspect-[2/3] container rounded-xl object-cover object-center shadow-xl hover:shadow-2xl" :src="thumbnailUrl" alt="pic" />
        <div
        class="flex justify-center items-center rounded-xl opacity-0 bg-gradient-to-t from-black via-gray-800 to-opacity-30 group-hover:opacity-70 absolute top-0 left-0 h-full w-full">
      </div>
      <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
        <div class="flex-row text-center w-11/12">
          <h1 class="text-gray-50 font-bold text-sm capitalize text-elipsis max-h-12 ">{{ video.title }} </h1>
          <button class="text-[11px] font-light text-gray-300 capitalize text-elipsis overflow-hidden max-h-16 ">{{ video.description }} </button>
          <div class="flex flex-row space-x-4 justify-center my-4"> 
            <button @click="onVideoSelect" class="text-sm hover:animate-pulse font-semibold py-1 px-4 bg-mainyellow rounded-lg text-black text-center">View</button>
        </div>
        </div>
      </div>
      </div>
    </li>
  </template>

  <script>
  export default {
    name: "VideoListItem",
    props: ["video"],
    computed: {
      thumbnailUrl: function () {
        return this.video.imgurl;
      },
    },
    methods: {
      onVideoSelect: function () {
        this.$emit("slideSelect", this.video);
      }
    },
  };
  </script>
  
  <style scoped>
  li:hover {
    background-color: rgba(4, 83, 255, 0.438);
  }
  </style>