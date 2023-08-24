<script setup>
import {computed} from "vue"
const props = defineProps({
  section: {
    type: Object,
    required: true
  },
  highlight: {
    type: String,
    default: "none",
  }
})

function html(item) {
  if (typeof item === 'string') {
    return item
  } else {
    if (item.id === props.highlight) {
      return `<mark> [<em>${item.id}</em>] </mark>`
    } else {
      return `[<em>${item.id}</em>]`
    }
  }
}

const domid = computed(() => `section-${props.section.id}`)

</script>
<template>
<div :id="domid" class="mb-8">
  <h2 v-if="section.title" class="title2">{{ section.number }}. {{ section.title }}</h2>
  <div v-if="section.show">
    <div class="prose">
      <span v-for="(item, index) in section.content" :key="index" v-html=html(item) />
    </div>
    <div v-if="section.strategy" class="bg-yellow-100 text-yellow-900 border border-yellow-300 p-4 rounded-lg mt-4 prose max-w-none">
      <div v-for="rule in section.strategy" v-html="rule"></div>
    </div>
  </div>
  <Skeleton v-else />
</div>
</template>
