<template>
    <li @click="onVideoSelect" class="bg-neutral-800 rounded-xl m-4">
      <div class="relative group">
        <img class="mr-3 aspect-video container rounded-t-xl object-cover object-center shadow-xl hover:shadow-2xl" :src="thumbnailUrl" alt="pic" />
        <div
        class="flex justify-center items-center opacity-0 bg-gradient-to-t from-black via-gray-800 to-opacity-30 group-hover:opacity-70 absolute top-0 left-0 h-full w-full">
      </div>
      <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
        <div class="flex-row text-center  w-11/12">
          <h1 class="text-gray-50 font-bold text-lg truncate">{{ video.snippet.title }}</h1>
          <p class="text-gray-300 text-md font-bold">{{ video.snippet.channelTitle }}</p>
          <p class="text-xs font-light text-gray-300">{{ video.snippet.description }}</p>
        </div>
      </div>
      </div>
      <div class="flex flex-col container justify-center align-middle mx-5 my-2">
        <div class="text-white font-semibold truncate w-11/12">{{ video.snippet.title }}</div>
        <div class="text-white font-light truncate h-10 w-11/12 ">{{ video.snippet.channelTitle }}</div>
      </div>
    </li>
  </template>
  
  <script>
  export default {
    name: "VideoListItem",
    props: ["video"],
    computed: {
      thumbnailUrl: function () {
        return this.video.snippet.thumbnails.high.url;
      },
    },
    methods: {
      onVideoSelect: function () {
        this.$emit("videoSelect", this.video);
      },
    },
  };
  </script>
  
  <style scoped>
  li:hover {
    background-color: rgb(119, 0, 255);
  }
  </style>