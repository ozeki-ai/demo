<script setup>
import {run} from "../story"
const props = defineProps(["story", "avatar"])
const story = run(props.story)
</script>

<template>
  <Split>
    <template v-slot:chat>
      <Chat :messages="story.messages" :avatar="avatar" />
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
