import { createRouter, createWebHashHistory } from 'vue-router'

import appHome from './views/app-home.vue'
import appExploreList from './views/app-explore-list.vue'
import gigDetails from './views/gig-details.vue'
import sellerDashboard from './views/seller-dashboard.vue'
import userDetails from './views/user-details.vue'

const routes = [
  {
    path: '/',
    name: 'app-home',
    component: appHome
  },
  {
    path: '/explore',
    name: 'app-explore-list',
    component: appExploreList
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

