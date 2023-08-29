<script setup>
import {ref} from "vue"
import store from "../../store"
const completed = store.playbookCompleted
const purpose = store.strategy && store.strategy.purpose
const term    = store.strategy && store.strategy.term
</script>
<template>
  <div class="max-w-7xl p-16">
    <div class="bg-white text-dark shadow sm:rounded-lg max-w-2xl">
      <div class="px-8 py-6">
        <h3 class="text-base font-semibold leading-6 text-gray-900">NDA Playbook</h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>This Universal NDA (“uNDA”) is designed to standardize NDAs across companies in order to eliminate the time spent reading and negotiating NDA’s for routine commercial transactions. By open-sourcing this uNDA, we hope that this will become standardized and implemented for all routine commercial transactions locally, and ultimately nation-wide.</p>
        </div>
        <div v-if="completed" class="mt-5">
          <div class="bg-warning-100 p-4 text-sm rounded-lg">
            <div v-if="purpose">
              <h3 class="title3">Business Purpose</h3>
              <div v-for="rule in purpose" v-html="rule"></div>
            </div>
            <div v-if="term" class="mt-8">
              <h3 class="title3">Term</h3>
              <div v-for="rule in term" v-html="rule"></div>
            </div>
          </div>
        </div>
        <div v-else class="mt-5">
          <a href="/lawyer/playbooks" class="btn inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Create NDA Playbook</a>
        </div>
      </div>
    </div>
  </div>
</template>
