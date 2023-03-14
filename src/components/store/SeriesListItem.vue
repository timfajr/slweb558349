<template>
    <li class="bg-gray-300 bg-opacity-5 rounded-xl m-4 shadow-xl aspect-[2/3]">
      <div class="relative group">
        <img class="mr-3 aspect-[2/3] container rounded-xl object-cover object-center shadow-xl hover:shadow-2xl" :src="thumbnailUrl" alt="pic" />
        <div
        class="flex justify-center items-center rounded-xl opacity-0 bg-gradient-to-t from-black via-gray-800 to-opacity-30 opacity-70 absolute top-0 left-0 h-full w-full">
      </div>
      <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-100">
        <div class="flex-row text-center w-11/12 self-center text-center place-items-cente">
          <h1 class="text-gray-50 font-bold text-sm capitalize text-elipsis max-h-12 ">{{ video.title }} </h1>
          <h1 class="text-gray-50 text-sm capitalize text-elipsis max-h-12 ">Series : {{ video.series }} </h1>
          <h1 class="text-gray-50 text-sm capitalize text-elipsis max-h-12 ">Episode : {{ video.episode }} </h1>
          <div class="flex flex-row space-x-4 justify-center my-4"> 
            <button @click="onVideoSelect" class="text-sm hover:animate-pulse font-semibold py-1 px-4 bg-mainyellow rounded-lg text-black text-center">Play</button>
        </div>
        </div>
      </div>
      </div>
    </li>
  </template>

  <script>
  export default {
    name: "VideoListItem",
    props: ["video","thumbnailUrl"],
    methods: {
      onVideoSelect: function () {
        this.$emit("Watchseries", this.video);
      }
    },
  };
  </script>
  
  <style scoped>
  li:hover {
    background-color: rgba(4, 83, 255, 0.438);
  }
  </style>