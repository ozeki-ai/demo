import {createApp}                      from "vue"
import {createRouter, createWebHistory} from "vue-router"
import VueClickAway                     from "vue3-click-away"

import LawyerDashboard from "./page/lawyer/Dashboard.vue"
import LawyerPlaybooks from "./page/lawyer/Playbooks.vue"
import SalesContracts  from "./page/sales/Contracts.vue"
import CustomerAccept  from "./page/customer/Accept.vue"
import Split           from "./component/Split.vue"
import Skeleton        from "./component/Skeleton.vue"
import Command         from "./component/Command.vue"
import Section         from "./component/Section.vue"
import Storyboard      from "./component/Storyboard.vue"
import Chat            from "./component/Chat.vue"
import App             from "./App.vue"

const routes = [
  {path: "/",                 redirect: "/lawyer"},
  {path: "/sales",            redirect: "/sales/contracts"},
  {path: "/customer",         redirect: "/customer/accept"},
  {path: "/lawyer",           name: "lawyer-dashboard", component: LawyerDashboard},
  {path: "/lawyer/playbooks", name: "lawyer-playbooks", component: LawyerPlaybooks},
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
app.component("Split", Split)
app.component("Skeleton", Skeleton)
app.component("Command", Command)
app.component("Section", Section)
app.component("Storyboard", Storyboard)
app.component("Chat", Chat)
app.mount('#app')
