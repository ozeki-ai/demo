<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <h1 className='text-3xl font-bold'>Hello World</h1>
  <button type="button" @click="count++">count is {{ count }}</button>
</template>
