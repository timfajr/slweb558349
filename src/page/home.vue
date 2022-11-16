<template>
<Navbar />
<div class=" bg-orange-600 w-screen h-screen">

</div>

</template>

<script>
import Navbar from "/src/components/Navbar.vue";
export default {
        name: 'App',
        data() {
          return {
            user: '',
            host: '',
            status: 'Stopped',
            currentime: '0',
            videotime:'0',
            totaluser:'0',
            list:[]
          }
        },
        components : {
            Navbar
  }
}
</script>