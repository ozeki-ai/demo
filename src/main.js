import {createApp} from "vue"
import {createRouter, createWebHistory} from "vue-router"
import VueClickAway from "vue3-click-away"
import LawyerPlaybooks from "./page/lawyer/Playbooks.vue"
import LawyerContracts from "./page/lawyer/Contracts.vue"
import SalesContracts  from "./page/sales/Contracts.vue"
import CustomerAccept  from "./page/customer/Accept.vue"
import Page  from "./component/Page.vue"
import Split from "./component/Split.vue"
import App from "./App.vue"

const routes = [
  {path: "/",                 redirect: "/lawyer/playbooks"},
  {path: "/lawyer",           redirect: "/lawyer/playbooks"},
  {path: "/sales",            redirect: "/sales/contracts"},
  {path: "/customer",         redirect: "/customer/accept"},
  {path: "/lawyer/playbooks", name: "lawyer-playbooks", component: LawyerPlaybooks},
  {path: "/lawyer/contracts", name: "lawyer-contracts", component: LawyerContracts},
  {path: "/sales/contracts",  name: "sales-contracts",  component: SalesContracts},
  {path: "/customer/accept",  name: "customer-accept",  component: CustomerAccept},
]

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
})

const app = createApp(App)
app.use(router)
app.use(VueClickAway)
app.component('Page', Page)
app.component('Split', Split)
app.mount('#app')
