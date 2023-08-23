<script setup>
import {ref} from "vue"
const props = defineProps({
  story: {
    type: Function,
    required: true
  }
})

const story = props.story()
</script>
<template>
  <Split>
    <template v-slot:chat>
      CHAT HERE
    </template>
    <template v-slot:command>
      <Command />
    </template>
    <template v-slot:document>
      <h1 class="title1 mb-6">{{ story.title }}</h1>
      <Section v-for="section in story.sections" :section="section" />
    </template>
  </Split>
</template>
