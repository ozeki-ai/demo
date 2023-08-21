import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import Home  from './page/Home.vue'
import About from './page/About.vue'
import App   from './App.vue'

const routes = [
  { path: "/",      component: Home  },
  { path: "/about", component: About },
]

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
})

const app = createApp(App)
app.use(router)
app.mount('#app')
