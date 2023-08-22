<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

// hacked together version of tailwindui navbar - https://tailwindui.com/components/application-ui/navigation/navbars
//   - hard coded some links and styles based off route.name
//   - other links left href="#"

const showMobileMenu = ref(false)
const showProfileMenu = ref(false)
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  showProfileMenu.value = false
}
const toggleProfileMenu = () => {
  showMobileMenu.value = false
  showProfileMenu.value = !showProfileMenu.value
}
const hideMenus = () => {
  showMobileMenu.value = false
  showProfileMenu.value = false
}
const route = useRoute();
const links = ref([])
const showBell = ref(true)
const showSignout = ref(true)
const avatar = ref("/src/assets/avatar-lawyer.png")
const styles = {
  tab: {
    active:   "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium cursor-default",
    inactive: "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
  },
  mobile: {
    active: "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium",
    inactive: "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
  }
}

const hasLinks = computed(() => links.value.length > 0)

watch(
  () => route.name,
  async name => {
    hideMenus()
    switch(route.name) {
      case "lawyer-playbooks":
        avatar.value = "/src/assets/avatar-lawyer.png"
        showBell.value = true
        showSignout.value = true
        links.value = [
          {label: "Playbooks",  href:"#",                 style: "active"},
          {label: "Agreements", href:"/lawyer/contracts", style: "inactive"},
        ]
        break;
      case "lawyer-contracts":
        avatar.value = "/src/assets/avatar-lawyer.png"
        showBell.value = true
        showSignout.value = true
        links.value = [
          {label: "Playbooks",  href: "/lawyer/playbooks", style: "inactive"},
          {label: "Agreements", href: "#",                 style: "active"},
        ]
        break;
      case "sales-contracts":
        avatar.value = "/src/assets/avatar-sales.png"
        showBell.value = true
        showSignout.value = true
        links.value = [
          {label: "Agreements", href: "#", style: "active"},
        ]
        break;
      case "customer-accept":
        avatar.value = "/src/assets/avatar-customer.png"
        showBell.value = false
        showSignout.value = false
        links.value = []
    }
  }
)
</script>
<template>
<nav class="bg-gray-800" @keydown.esc="hideMenus()">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div v-if="hasLinks" class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button @click="toggleMobileMenu()" type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
          <svg v-if="!showMobileMenu" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-if="showMobileMenu" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <img class="h-8 w-8" src="/logo.png">
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <router-link v-for="link in links" :to="link.href" :class="styles.tab[link.style]">{{ link.label }}</router-link>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button v-if="showBell" type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span class="absolute -inset-1.5"></span>
          <span class="sr-only">View notifications</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>

        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div>
            <button @click="toggleProfileMenu()" type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="h-10 w-10 rounded-full" :src="avatar" alt="">
            </button>
          </div>

          <div v-if="showProfileMenu" v-click-away="hideMenus" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <!-- Active: "bg-gray-100", Not Active: "" -->
            <a href="/lawyer" class="flex items-center gap-4 px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">
              <img class="h-10 w-10 rounded-full" src="/src/assets/avatar-lawyer.png" alt="">
              <span>Lisa Lawyer</span>
            </a>
            <a href="/sales" class="flex items-center gap-4 px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">
              <img class="h-10 w-10 rounded-full" src="/src/assets/avatar-sales.png" alt="">
              <span>Sam Sales</span>
            </a>
            <a href="/customer" class="flex items-center gap-4 px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">
              <img class="h-10 w-10 rounded-full" src="/src/assets/avatar-customer.png" alt="">
              <span>Colin Customer</span>
            </a>
            <template v-if="showSignout">
              <hr>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Sign out</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div v-if="showMobileMenu" class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <router-link v-for="link in links" :to="link.href" :class="styles.mobile[link.style]">{{ link.label }}</router-link>
    </div>
  </div>
</nav>
</template>
