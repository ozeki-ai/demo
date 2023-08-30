<script setup>
import {run} from "../story"
const props = defineProps(["story", "avatar", "showStrategy"])
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
      <h1 class="title1 mb-6">{{ story.document.title }}</h1>
      <div class="pb-64">
        <Section v-for="section in story.document.sections" :story="story" :section="section" :showStrategy="showStrategy" />
      </div>
    </template>
  </Split>
</template>
