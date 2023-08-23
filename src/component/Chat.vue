<script setup>
import {ref, computed, watch} from "vue"
import debounce from "../util/debounce"
const props = defineProps(["messages", "avatar"])
const avatar = `/src/assets/avatar-${props.avatar}.png`
const scrollview = ref(null)
watch(
  props.messages,
  debounce((newVal, oldVal) => {
    scrollview.value.parentElement.scrollTo({
      top: scrollview.value.offsetHeight,
      left: 0,
      behaviour: "smooth"
    })
  }, 20)
)
</script>
<template>
  <div ref="scrollview">
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
