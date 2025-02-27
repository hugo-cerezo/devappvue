// import './assets/main.css'
// import './assets/menus.css'
import GoogleSignInPlugin from 'vue3-google-signin'
import { GOOGLE_CLIENT_ID } from './config/constant'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import components
import AddEvent from './components/forms/AddEvent.vue'

const app = createApp(App)

app.use(router)
app.use(BootstrapIconsPlugin)
app.use(GoogleSignInPlugin, {
  clientId: GOOGLE_CLIENT_ID,
})

// Register components
app.component('AddEvent', AddEvent)

app.mount('#app')
