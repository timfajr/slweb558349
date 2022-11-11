<script setup lang="ts">

import { usePlayer , PlayerState } from '@vue-youtube/core';
import { ref } from 'vue';

const videoId = ref('dQw4w9WgXcQ');
const youtube = ref();  

const { onReady } = usePlayer(videoId, youtube, {
  cookie: false,
  playerVars: {
    mute: 1,
  },
});

const { onStateChange } = usePlayer(videoId, youtube, {
  cookie: false,
  playerVars: {
    mute: 1,
  },
});

onStateChange((event) => {
  if (event.data == PlayerState.PLAYING) {
    console.log("I'm playing", videoId.value)
    router.push('/')
  }
});

onReady((event) => {
  event.target.playVideo();
});

</script>
<template>
  <div ref="youtube" />
</template>