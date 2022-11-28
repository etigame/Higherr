import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import explore from './views/explore.vue'
import gigDetails from './views/gig-details.vue'
import sellerDashboard from './views/seller-dashboard.vue'
import userDetails from './views/user-details.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/explore',
    name: 'explore',
    component: explore
  },
  {
    path: '/details/:id',
    name: 'gig-details',
    component: gigDetails
  },
  {
    path: '/seller-dashboard',
    name: 'seller-dashboard',
    component: sellerDashboard
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  },
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

