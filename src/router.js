import { createRouter, createWebHashHistory } from 'vue-router'

import appHome from './views/app-home.vue'
import appExploreList from './views/app-explore-list.vue'
import gigDetails from './views/gig-details.vue'
import sellerDashboard from './views/seller-dashboard.vue'
import userDetails from './views/user-details.vue'
import gigEdit from './views/gig-edit.vue'

const routes = [
  {
    path: '/',
    name: 'app-home',
    component: appHome,
  },
  {
    path: '/explore',
    name: 'app-explore-list',
    component: appExploreList,
  },
  {
    path: '/gig/:id',
    name: 'gig-details',
    component: gigDetails,
  },
  {
    path: '/gig/edit/:id?',
    name: 'gig-edit',
    component: gigEdit
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  },
  {
    path: '/seller-dashboard',
    name: 'seller-dashboard',
    component: sellerDashboard
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
})
