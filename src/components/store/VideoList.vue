<template>
  <div class="flex flex-row justify-center align-middle items-center ">
      <ul class="mx-10 grid grid-cols-3">
        <VideoListItem
          v-for="video in videos"
          :video="video"
          :key="video.id" 
          @videoSelect="onVideoSelect"
        ></VideoListItem>
      </ul>
    </div>
  </template>
  
  <script>
  import VideoListItem from "/src/components/store/VideoListItem.vue";
  import SearchBar from "/src/components/store/SearchBar.vue";
  export default {
    name: "VideoList",
    components: {
      VideoListItem,
      SearchBar
    },
    props: {
      videos: Array,
    },
    methods: {
      onVideoSelect: function (video) {
        this.$emit("videoSelect", video);
      }
    }
  }

  </script>