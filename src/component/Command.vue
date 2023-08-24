<script setup>
import {ref, watch, nextTick} from "vue"
const props = defineProps(["answering"])
const emit = defineEmits(['answer'])
const textarea = ref(null)
const answer = ref("")
const publish = () => {
  if (props.answering) {
    emit("answer", answer.value)
    answer.value = ""
  }
}
watch(
  () => props.answering,
  (newValue, oldValue) => {
    if (newValue && !oldValue) {
      nextTick(() => {
        textarea.value.focus()
      })
    }
  }
)
</script>

<template>
  <div class="w-full h-32">
    <form action="#" class="relative h-full" @submit.prevent="publish">
      <textarea rows="1" ref="textarea" v-model="answer" @keydown.enter.prevent="publish" class="block rounded-md h-full w-full resize-none border-0 bg-white text-dark py-1.5 placeholder:text-gray-400 focus:ring-0" placeholder="Send a message..." autofocus></textarea>
      <div class="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
        <div class="flex-shrink-0">
          <button type="submit" class="btn btn-success font-semibold flex gap-3 items-baseline" :disabled="!answering">
            <span>Post</span><i class="fas fa-arrow-alt-up"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
