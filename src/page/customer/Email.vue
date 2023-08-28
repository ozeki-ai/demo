<script setup>
import envelopeUrl from "../../assets/envelope.svg"
import shared from "../../shared"
</script>
<template>
  <div class="relative w-[40rem] mx-auto my-10">
    <img :src="envelopeUrl" class="absolute rounded-3xl bg-gray-100" />
    <div class="relative w-100 text-center mt-16">
      <div class="w-64 mx-auto text-dark mb-10">The team at <span>{{ shared.COMPANY_NAME }}</span> would like you to review a contract...</div>
      <router-link to="/customer/accept" class="btn btn-success z-10">Review NDA</router-link>
    </div>
  </div>
</template>
