<script setup>
import {preamble, purpose, sections} from "../../unda"
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
      <div class="mb-8">
        <h1 class="title1">MUTUAL NON-DISCLOSURE AGREEMENT</h1>
        <div v-html="preamble.html" class="mt-4"></div>
        <div v-html="purpose.html" class="mt-4"></div>
        <div class="mt-4">The parties therefore agree as follows:</div>
      </div>

      <div v-for="section in sections" class="mb-8">
        <h2 v-if="section.title" class="title2">{{ section.id }}. {{ section.title }}</h2>
        <Skeleton />
      </div>
    </template>
  </Split>
</template>
