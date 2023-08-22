<script setup>
import NavBar from "./component/NavBar.vue"
</script>
<template>
  <div class="h-full flex flex-col overflow-hidden">
    <NavBar />
    <router-view></router-view>
  </div>
</template>
