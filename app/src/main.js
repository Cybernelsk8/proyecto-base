import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/app.css'
import './services/axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import App from './App.vue'
import router from './router'

const app = createApp(App)

library.add(fas)
library.add(far)
library.add(fab)

app.component('Icon',FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
