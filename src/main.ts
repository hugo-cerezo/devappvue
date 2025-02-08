import './assets/main.css'
import './assets/menus.css'
import GoogleSignInPlugin from 'vue3-google-signin'
import { GOOGLE_CLIENT_ID } from './config/constant'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(GoogleSignInPlugin, {
  clientId: GOOGLE_CLIENT_ID,
})

app.mount('#app')
