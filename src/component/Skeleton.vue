<script setup>
const rows = [
  "w-1/3",
  "w-full",
  "w-5/6",
  "w-1/2",
]
</script>
<template>
  <div class="space-y-1">
    <div v-for="row in rows" :class="row" class="h-4 bg-gradient-to-r from-gray-300 to-gray-50 border border-gray-100 rounded-md"></div>
  </div>
</template>
