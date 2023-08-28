<script setup>
import {computed} from "vue"
const props = defineProps({
  story: {
    type: Object,
    required: true
  },
  section: {
    type: Object,
    required: true
  }
})

function html(item) {
  if (typeof item === 'string') {
    return item
  } else {
    let label, value
    if (value = props.story.values[item.id]) {
      label = `<mark class="bg-yellow-100">${value}</mark>`
    } else {
      label = `[<em>${item.id}</em>]`
    }
    if (item.id === props.story.highlight) {
      return `<mark> ${label} </mark>`
    } else {
      return label
    }
  }
}

const revealed = computed(() => props.story.revealed[props.section.id])
const domid = computed(() => `section-${props.section.id}`)
const klass = computed(() => props.story.classes[props.section.id])

</script>
<template>
<div :id="domid" class="mb-8">
  <h2 v-if="section.title" class="title2">{{ section.number }}. {{ section.title }}</h2>
  <div v-if="revealed" :class="klass">
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
