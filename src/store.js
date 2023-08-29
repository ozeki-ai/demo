import {reactive, watch} from "vue"

const KEY = "STORE"
const db = window.localStorage.getItem(KEY)
const store = reactive(db ? JSON.parse(db) : {})

watch(
  store,
  async (values, x) => {
    window.localStorage.setItem(KEY, JSON.stringify(values))
  }
)

function reset() {
  window.localStorage.setItem(KEY, null)
  for(var key in store) {
    if (store.hasOwnProperty(key)) {
      delete store[key]
    }
  }
  addDefaults()
}

function addDefaults() {
  store.TODAY = (new Date()).toLocaleDateString()
  store.COMPANY_NAME = "Acme, Inc"
  store.COMPANY_ADDRESS = "100 Main Street, Springfield, OH"
  store.GENERIC_BUSINESS_PURPOSE = "a business opportunity of mutual interest and benefit"
  store.MAGIC = "ozeki".split("").reverse().join("")
  store.reset = reset
}
addDefaults()

window.store = store

export default store
