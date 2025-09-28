import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/app.css'
import './services/axios'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import Button from './components/Button.vue'
import DropDown from './components/DropDown.vue'
import ValidateErrors from './components/ValidateErrors.vue'
import Input from './components/Input.vue'
import Modal from './components/Modal.vue'

const app = createApp(App)

library.add(fas)
library.add(far)
library.add(fab)

app.component('Icon',FontAwesomeIcon)
.component('Button', Button)
.component('Input',Input)
.component('Drop-Down',DropDown)
.component('Modal',Modal)
.component('Validate-Errors',ValidateErrors)

app.use(createPinia())
app.use(router)

app.mount('#app')
