<script setup>
import {ref} from "vue"
import {useRouter} from "vue-router"
import store from "../store"
const router = useRouter()
const password = ref("")
const error = ref(null)
function onsubmit(e) {
  if (password.value === store.MAGIC) { // password protection here is a placebo, there are no secrets, so it's ok to do something dumb here.
    store.loggedIn = true
    router.push({name: "lawyer-dashboard"})
  } else {
    error.value = "incorrect password"
  }
}
</script>
<template>
  <div class="h-full flex flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-3" @submit.prevent="onsubmit">
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
          </div>
          <div class="mt-2">
            <input type="password" v-model="password" autofocus class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6">
          </div>
        </div>
        <div class="flex">
          <span class="flex-1 text-danger-400">{{ error }}</span>
          <button type="submit" class="btn">Demo</button>
        </div>
      </form>
    </div>
  </div>
</template>
