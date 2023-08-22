<script setup>
import {sections} from "../../unda"
</script>

<template>
  <Split>
    <template v-slot:lhs>
      CHAT HERE
    </template>
    <template v-slot:rhs>
      <div v-for="section in sections" class="mb-8">
        <h2 class="title2">{{ section.title }}</h2>
        <div v-html="section.html"></div>
      </div>
    </template>
  </Split>
</template>
