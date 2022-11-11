<template>
    <nav class="bg-gray-300 p-2 space-x-3">
      <router-link to="/" active-class="p-2 rounded bg-gray-600 text-gray-200"
        >Home</router-link
      >
      <router-link
        to="/web"
        active-class="p-2 rounded bg-blue-400 text-blue-100"
        >Web</router-link
      >
      <router-link
        to="/youtube"
        active-class="p-2 rounded bg-blue-400 text-blue-100"
        >Youtube</router-link
      >
      <router-link
        to="/movielibrary/"
        active-class="p-2 rounded bg-red-500 text-gray-200"
        >Movielibrary</router-link
      >
      <router-link
        to="/watch/"
        active-class="p-2 rounded bg-red-500 text-gray-200"
        >Watch</router-link
      >
      <router-link
        to="/storemovies/"
        active-class="p-2 rounded bg-indigo-500 text-indigo-200"
        >Store Movies</router-link
      >
      <router-link
        to="/requestmovies/"
        active-class="p-2 rounded bg-indigo-500 text-indigo-200"
        >Request Movies</router-link
      >
    </nav>
  </template>