<template>
    <nav class="bg-gray-300 space-x-3 p-2 pt-10 text-lg font-semibold flex flex-row justify-center justify-items-center w-screen relative">
      <router-link
        to="/admin/login/"
        active-class="p-2 rounded bg-red-500 text-gray-200"
        >Login</router-link
      >
        <router-link
        to="/admin/upload"
        active-class="p-2 rounded bg-blue-400 text-blue-100"
        >Upload Movie</router-link
      >
      <router-link
        to="/admin/dashboard/"
        active-class="p-2 rounded bg-indigo-500 text-indigo-200"
        >Dashboard</router-link
      >
      <router-link
        to="/admin/transaction/"
        active-class="p-2 rounded bg-indigo-500 text-indigo-200"
        >Transaction</router-link
      >
      <router-link
        to="/admin/movies/"
        active-class="p-2 rounded bg-indigo-500 text-indigo-200"
        >Movies</router-link
      >
    </nav>
  </template>

<script>

// Cookies
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
    name: 'App',
    data() {
      return {
        page: ''
      }
    }
}
</script>