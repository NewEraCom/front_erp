import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores'
import { createNotivue } from 'notivue'

import 'notivue/notification.css'
import 'notivue/animations.css'

import App from './App.vue'
import router from './router'
const notivue = createNotivue({
  position: 'top-right',
  limit: 4,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 10000
    }
  }
})

const app = createApp(App)
app.use(createPinia())

const authStore = useAuthStore()
authStore.initializeStore()

app.use(notivue)
app.use(router)

app.mount('#app')
