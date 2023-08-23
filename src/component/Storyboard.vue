<script setup>
import {run} from "../story"
const props = defineProps(["story", "avatar"])
const story = run(props.story)
const onanswer = (e) => story.provideAnswer(e)
</script>

<template>
  <Split>
    <template v-slot:chat>
      <Chat :messages="story.messages" :avatar="avatar" />
    </template>
    <template v-slot:command>
      <Command :answering="story.answering" @answer="onanswer" />
    </template>
    <template v-slot:document>
      <h1 class="title1 mb-6">{{ story.title }}</h1>
      <Section v-for="section in story.sections" :section="section" :highlight="story.highlight" />
    </template>
  </Split>
</template>
