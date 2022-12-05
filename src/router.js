import { createRouter, createWebHashHistory } from 'vue-router'

import { store } from './store/store.js'

import appHome from './views/app-home.vue'
import appExploreList from './views/app-explore-list.vue'
import gigDetails from './views/gig-details.vue'
import gigEdit from './views/gig-edit.vue'
import sellerProfile from './views/seller-profile.vue'
import sellerOrders from './views/seller-orders.vue'
import sellerRegister from './views/seller-register.vue'

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
    path: '/gig/:_id',
    name: 'gig-details',
    component: gigDetails,
  },
  {
    path: '/gig/edit/:_id?',
    name: 'gig-edit',
    component: gigEdit,
  },
  {
    path: '/seller/profile',
    name: 'seller-profile',
    component: sellerProfile,
    props: true,
    beforeEnter: (to, from, next) => {
      const loggedUser = store.getters.loggedinUser
      if (to.name === 'seller-profile' && loggedUser) {
        to.params = { loggedUser }
        next()
      } else {
        next('/')
      }
    },
  },
  // {
  //   path: '/seller/profile',
  //   name: 'seller-profile',
  //   component: sellerProfile,
  // },
  {
    path: '/seller/orders',
    name: 'seller-orders',
    component: sellerOrders,
    props: true,
    beforeEnter: (to, from, next) => {
      const loggedUser = store.getters.loggedinUser
      if (to.name === 'seller-orders' && loggedUser) {
        to.params = { loggedUser }
        next()
      } else {
        next('/')
      }
    },
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }
  },
  // base: process.env.BASE_URL,
})
