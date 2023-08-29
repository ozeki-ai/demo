<script setup>
import envelopeUrl from "../../assets/envelope.svg"
import store from "../../store"
const waitingForContract = !store.contractGenerated
const alreadyAccepted = store.contractAccepted
const alreadyRejected = store.contractRejected
const readyForReview = !waitingForContract && !alreadyAccepted && !alreadyRejected
</script>
<template>

  <div v-if="readyForReview" class="relative w-[40rem] mx-auto my-10">
    <img :src="envelopeUrl" class="absolute rounded-3xl bg-gray-100" />
    <div class="relative w-100 text-center mt-16">
      <div class="w-64 mx-auto text-dark mb-10">The team at <span>{{ store.COMPANY_NAME }}</span> would like you to review a contract...</div>
      <router-link to="/customer/accept" class="btn btn-success z-10">Review NDA</router-link>
    </div>
  </div>

  <div v-if="waitingForContract || alreadyAccepted || alreadyRejected" class="max-w-7xl p-16">
    <div class="bg-white text-dark shadow sm:rounded-lg max-w-2xl">
      <div class="px-8 py-6">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Mutual NDA</h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>This Universal NDA (“uNDA”) is designed to standardize NDAs across companies in order to eliminate the time spent reading and negotiating NDA’s for routine commercial transactions. By open-sourcing this uNDA, we hope that this will become standardized and implemented for all routine commercial transactions locally, and ultimately nation-wide.</p>
        </div>
        <div class="mt-5">
          <div v-if="waitingForContract" class="italic bg-warning-100 p-4 text-sm rounded-lg">
            The sales team have not yet generated your NDA.
          </div>
          <div v-if="alreadyAccepted" class="italic bg-success-100 p-4 text-sm rounded-lg">
            You have accepted this agreement.
          </div>
          <div v-if="alreadyRejected" class="italic bg-danger-100 p-4 text-sm rounded-lg">
            You have rejected this agreement.
            <div class="pt-4 pl-4">
              <div v-if="store.preambleRejected"><b>Preamble</b>: {{ store.preambleRejected }}</div>
              <div v-if="store.purposeRejected"><b>Purpose</b>: {{ store.purposeRejected }}</div>
              <div v-if="store.termRejected"><b>Term</b>: {{ store.termRejected }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>