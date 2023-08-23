<script setup>
import {computed} from "vue"
const props = defineProps(["answering"])
</script>

<template>
  <div class="w-full h-48">
    <form action="#" class="relative h-full">
      <textarea rows="3" name="comment" id="comment" class="block rounded-md h-full w-full resize-none border-0 bg-white text-dark py-1.5 placeholder:text-gray-400 focus:ring-0" placeholder="Send a message..." autofocus></textarea>
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
