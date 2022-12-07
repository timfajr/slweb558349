<template>
    <nav class="bg-gray-300 space-x-3 p-2 pt-10 text-lg font-semibold flex flex-row justify-center justify-items-center w-screen relative">
        <router-link
        to="/admin/upload"
        active-class="rounded bg-blue-400 text-blue-100"
        class="p-2"
        >Upload Movie</router-link
        >
        <router-link
        to="/admin/dashboard/"
        active-class="rounded bg-indigo-500 text-indigo-200"
        class="p-2"
        >Dashboard</router-link
        >
        <router-link
        to="/admin/transaction/"
        active-class="rounded bg-indigo-500 text-indigo-200"
        class="p-2"
        >Transaction</router-link
        >
        <router-link
        to="/admin/movies/"
        active-class="rounded bg-indigo-500 text-indigo-200"
        class="p-2"
        >Movies</router-link
        >
        <router-link
        to="/admin/login/"
        active-class="rounded bg-red-500 text-gray-200"
        class="p-2"
        >Logout</router-link
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