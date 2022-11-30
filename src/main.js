import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import './assets/styles/main.scss'
import { icon } from './directives.js'
import App from './App.vue'

const app = createApp(App)
app.directive('icon', icon)
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
