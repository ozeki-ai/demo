<script setup>
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

</script>
<template>
<div class="mb-8">
  <h2 v-if="section.title" class="title2">{{ section.title }}</h2>
  <div v-if="section.show">
    <span v-for="(item, index) in section.content" :key="index" v-html=html(item) />
  </div>
  <Skeleton v-else />
</div>
</template>
