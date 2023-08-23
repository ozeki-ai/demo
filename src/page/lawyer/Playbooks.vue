<script setup>
import nda from "../../playbook/nda"
const playbook = nda()
</script>
<template>
  <Split>
    <template v-slot:chat>
      Ok, Let's get started with your mutual NDA playbook...
    </template>
    <template v-slot:command>
      <Command />
    </template>
    <template v-slot:document>
      <h1 class="title1 mb-6">{{ playbook.title }}</h1>
      <Section v-for="section in playbook.sections" :section="section" />
    </template>
  </Split>
</template>
