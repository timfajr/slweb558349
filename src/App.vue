<template>
    <div class="flex flex-col items-center justify-center bg-red-500 h-12">
        <div class="items-center justify-center">
        <a href="/">Home</a> |
        <a href="#/youtube">Youtube</a> |
    </div>
    </div>
  <component :is="currentView" />
</template>

<script>
import Home from '/src/page/home.vue'
import Youtube from '/src/page/youtube.vue'

const routes = {
  '/': Home,
  '/youtube': Youtube
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>