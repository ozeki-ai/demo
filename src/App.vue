<script setup>
import {computed} from "vue"
import {useRoute} from "vue-router"
import NavBar from "./component/NavBar.vue"
const route = useRoute()
const klass = computed(() => route.meta.scrollable ? 'overflow-auto' : 'overflow-hidden')
</script>
<template>
  <div class="h-full flex flex-col" :class="klass">
    <NavBar />
    <router-view></router-view>
  </div>
</template>
