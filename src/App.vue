<template>
  <popup-content />
  <section class="main-layout">
    <user-msg />
    <section class="main-header main-layout full" :class="{ sticky: isHeaderSticky }">
      <app-header @filter="filter" :isActiveOrders="this.isActiveOrders" :isActiveDashboard="this.isActiveDashboard"
        @closeOrderNotification="closeOrderNotification" @closeDashboardNotification="closeDashboardNotification" />
      <categories-list :type="'tag'" @filter="filter" />
    </section>

    <main class="app-container main-layout full">
      <router-view />
    </main>
    <app-footer />
  </section>
</template>

<script>


import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
import categoriesList from './cmps/categories-list.vue'
import appFooter from './cmps/app-footer.vue'
import { userService } from './services/user-service'
import popupContent from './cmps/UI/popup-content.vue'
import { socketService } from './services/socket-service'
import { eventBus, showSuccessMsg } from './services/event-bus-service'
import { utilService } from './services/util-service'

export default {
  created() {
    if (userService.getLoggedInUser()) socketService.emit('set-user-socket', userService.getLoggedInUser())

    this.$store.dispatch({ type: 'loadGigs' })
    this.$store.dispatch({ type: 'loadOrders' })

    const user = userService.getLoggedInUser()
    if (user) store.commit({ type: 'setLoggedInUser', user })

    socketService.on('user-is-watching', (msg) => {
      showSuccessMsg(msg)
    })

    socketService.on('user-ordered-gig', (msg) => {
      showSuccessMsg(msg)
      this.isActiveDashboard = true
    })

    socketService.on('order-approved', (msg) => {
      showSuccessMsg(msg)
      this.isActiveOrders = true
    })

    socketService.on('order-status-update', (msg) => {
      showSuccessMsg(msg)
      this.isActiveOrders = true
    })
  },
  data() {
    return {
      filterBy: {
        title: '',
        category: '',
        subCategory: '',
        min: null,
        max: null,
        delivery: '',
      },
      isHeaderSticky: false,
      isActiveOrders: false,
      isActiveDashboard: false
    }
  },
  methods: {
    filter(filterBy = this.filterBy) {
      this.$router.push({ name: 'app-explore-list', query: { ...filterBy } })
      this.$router.push({ name: 'app-explore-list', query: { ...filterBy } })
      // this.$router.push({ name: 'app-explore-list', query: JSON.parse(JSON.stringify(filterBy)) })
      this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })
    },
    closeOrderNotification() {
      this.isActiveOrders = false
    },
    closeDashboardNotification() {
      this.isActiveDashboard = false
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.isHeaderSticky = route.path === '/' ? true : false
      },
    },
  },
  components: {
    appHeader,
    userMsg,
    categoriesList,
    appFooter,
    popupContent

  },
}
</script>