<script setup>
import {ref, computed, watch} from "vue"
import debounce from "../util/debounce"
import {avatarUrl} from "../avatar"

const props = defineProps(["messages", "avatar"])
const avatar = avatarUrl(props.avatar)
const scrollview = ref(null)
watch(
  props.messages,
  debounce((newVal, oldVal) => {
    scrollview.value.parentElement.scrollTo({
      top: scrollview.value.offsetHeight,
      left: 0,
      behavior: "smooth"
    })
  }, 20)
)
</script>
<template>
  <div ref="scrollview">
    <div v-for="message in messages">
      <template v-if="message.user && message.content.length">
        <div class="flex gap-3 my-4 bg-gray-700 text-light px-2 py-1 rounded-xl">
          <div v-html="message.content" class="mt-2 flex-1 text-right font-medium"></div>
          <img class="h-10 w-10 rounded-full" :src="avatar">
        </div>
      </template>
      <template v-if="!message.user">
        <div class="flex gap-3 mb-2">
          <div class="w-10">
            <i v-if="message.avatar !== false" class="fas fa-robot text-3xl text-primary-300"></i>
          </div>
          <div v-html="message.content" class="flex-1 prose text-light pr-10"></div>
        </div>
      </template>
    </div>
  </div>
</template>
