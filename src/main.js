import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import ElementPlus from 'element-plus'

// import { VueperSlides, VueperSlide } from 'vueperslides'

import 'vueperslides/dist/vueperslides.css'

import 'element-plus/dist/index.css'
import './assets/styles/main.scss'
import { icon, clickOutsideDirective } from './directives.js'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'

const app = createApp(App)

app.directive('icon', icon)
app.directive('clickOutside', clickOutsideDirective)
app.use(ElementPlus)

app.use(vue3GoogleLogin, {
  clientId:
    '38141421086-k462ble0usra6l9n070paqnngee5ojgq.apps.googleusercontent.com'
})

// app.use(VueperSlides)
// app.use(VueperSlide)

app.use(router)
app.use(store)

app.mount('#app')
