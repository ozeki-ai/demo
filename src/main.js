import {createApp}                      from "vue"
import {createRouter, createWebHistory} from "vue-router"
import VueClickAway                     from "vue3-click-away"

import LawyerDashboard from "./page/lawyer/Dashboard.vue"
import LawyerPlaybooks from "./page/lawyer/Playbooks.vue"
import SalesDashboard  from "./page/sales/Dashboard.vue"
import SalesContracts  from "./page/sales/Contracts.vue"
import CustomerEmail   from "./page/customer/Email.vue"
import CustomerAccept  from "./page/customer/Accept.vue"
import Login           from "./page/Login.vue"
import Split           from "./component/Split.vue"
import Skeleton        from "./component/Skeleton.vue"
import Command         from "./component/Command.vue"
import Section         from "./component/Section.vue"
import Storyboard      from "./component/Storyboard.vue"
import Chat            from "./component/Chat.vue"
import App             from "./App.vue"

const routes = [
  {path: "/",                 redirect: "/lawyer"},
  {path: "/customer",         redirect: "/customer/email"},
  {path: "/lawyer",           name: "lawyer-dashboard", component: LawyerDashboard},
  {path: "/lawyer/playbooks", name: "lawyer-playbooks", component: LawyerPlaybooks},
  {path: "/sales",            name: "sales-dashboard",  component: SalesDashboard},
  {path: "/sales/contracts",  name: "sales-contracts",  component: SalesContracts},
  {path: "/customer/email",   name: "customer-email",   component: CustomerEmail},
  {path: "/customer/accept",  name: "customer-accept",  component: CustomerAccept},
  {path: "/login",            name: "login",            component: Login},
]

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
})

router.beforeEach((to, from) => {
  if (!store.loggedIn && (to.name !== "login")) {
    return { name: "login" }
  }
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
