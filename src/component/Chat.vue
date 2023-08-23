<script setup>
const props = defineProps(["messages", "avatar"])
const avatar = `/src/assets/avatar-${props.avatar}.png`
</script>
<template>
  <div>
    <div v-for="message in messages" class="flex gap-4 mb-4">
      <template v-if="message.user">
        <div v-html="message.content" class="mt-2 flex-1 text-right"></div>
        <img class="h-10 w-10 rounded-full" :src="avatar">
      </template>
      <template v-else>
        <i class="fas fa-robot fa-2x text-gray-400"></i>
        <div v-html="message.content" class="mt-2 flex-1 prose text-light"></div>
      </template>
    </div>
  </div>
</template>
