<script setup>
import store from "../../store"
const waitingForPlaybook = !store.playbookCompleted
const generated = store.contractGenerated
const accepted  = store.contractAccepted
const rejected  = store.contractRejected

const suggestions = []
if (store.purposeRejected && store.termRejected) {
  suggestions.push({label: "Accept specific purpose in exchange for longer term", klass: "btn-success", cta: "Accept specific purpose"})
  suggestions.push({label: "Accept shorter term in exchange for generic purpose", klass: "btn-success", cta: "Accept shorter term"})
} else if (store.purposeRejected) {
  suggestions.push({label: "Accept specific purpose", klass: "btn-success", cta: "Accept agreement"})
} else if (store.termRejected) {
  suggestions.push({label: "Accept shorter term", klass: "btn-success", cta: "Accept agreement"})
}
suggestions.push({label: "Reject agreement outright", klass: "btn-danger", cta: "Reject agreement"})

</script>
<template>
  <div class="max-w-7xl mx-auto p-16">
    <div class="bg-white text-dark shadow sm:rounded-lg max-w-2xl">
      <div class="px-8 py-6">

        <h3 class="text-base font-semibold leading-6 text-gray-900">
          Mutual NDA <span v-if="generated" class="font-normal"> - with {{ store.counterpartyName }}</span>
        </h3>

        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>This Universal NDA (“uNDA”) is designed to standardize NDAs across companies in order to eliminate the time spent reading and negotiating NDA’s for routine commercial transactions. By open-sourcing this uNDA, we hope that this will become standardized and implemented for all routine commercial transactions locally, and ultimately nation-wide.</p>
        </div>

        <div v-if="waitingForPlaybook" class="mt-5">
          <div class="italic bg-warning-100 p-4 text-sm rounded-lg">The legal team have not yet created an NDA playbook.</div>
        </div>

        <div v-if="generated" class="mt-5">
          <div class="bg-warning-100 p-4 text-sm rounded-lg">
            <table>
              <tr><th class="text-left pr-4">Agreement Date</th><td>{{ store.agreementDate }}</td></tr>
              <tr><th class="text-left pr-4">Company Name</th><td>{{ store.companyName }}</td></tr>
              <tr><th class="text-left pr-4">Company Address</th><td>{{ store.companyAddress }}</td></tr>
              <tr><th class="text-left pr-4">Counterparty Name</th><td>{{ store.counterpartyName }}</td></tr>
              <tr><th class="text-left pr-4">Counterparty State</th><td>{{ store.counterpartyIncorporationState }}</td></tr>
              <tr><th class="text-left pr-4">Counterparty Address</th><td>{{ store.counterpartyAddress }}</td></tr>
              <tr><th class="text-left pr-4">Business Purpose</th><td>{{ store.businessPurpose }}</td></tr>
              <tr><th class="text-left pr-4">Term</th><td>{{ store.term }}</td></tr>
            </table>
          </div>
        </div>

        <div v-if="!waitingForPlaybook && !generated" class="mt-5">
          <a href="/sales/contracts" class="btn inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Generate NDA for Customer</a>
        </div>

        <div v-if="accepted || rejected" class="mt-8">
          <div v-if="accepted" class="bg-success-100 p-4 text-sm rounded-lg">
            <b>{{ store.counterpartyName }}</b> has accepted this agreement.
          </div>
          <div v-if="rejected" class="italic bg-danger-100 p-4 text-sm rounded-lg">
            <div>
              <b>{{ store.counterpartyName }}</b> has rejected parts of this agreement:
              <div class="pt-2 pl-4">
                <div v-if="store.preambleRejected"><b>Preamble</b>: {{ store.preambleRejected }}</div>
                <div v-if="store.purposeRejected"><b>Purpose</b>: {{ store.purposeRejected }}</div>
                <div v-if="store.termRejected"><b>Term</b>: {{ store.termRejected }}</div>
              </div>
            </div>
            <div class="mt-4">
              <b>Negotiation Preferences</b>:
              <ul class="pt-2 pl-4 list-disc list-inside">
                <li>prefer <b>{{store.purposePreference}}</b> business purpose</li>
                <li>prefer <b>{{store.termPreference}}</b> term</li>
              </ul>
            </div>
            <div class="mt-4">
              <b>Negotiation Suggestions</b>:
              <table class="ml-4">
                <tr v-for="suggestion in suggestions">
                  <td class="text-right pr-4">
                    {{ suggestion.label }}
                  </td>
                  <td>
                    <button class="btn btn-sm btn-block" :class="suggestion.klass">
                      {{ suggestion.cta }}
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
