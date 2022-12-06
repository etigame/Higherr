<template>
  <header class="app-header main-layout full flex align-center"
    :class="{ transparent: (windowTop === 0 && currRoutePath === '/') }">
    <nav class="flex align-center space-between">
      <router-link to="/">
        <div class="logo">
          <h1>Higherr.</h1>
        </div>
      </router-link>

      <div class="search" :class="{ shown: isSearchShown }">
        <header-search @filter="filter" />
      </div>
      <div class="nav-links flex align-center">

        <router-link v-if="!loggedInUser" to="/explore">Explore</router-link>
        <button v-if="!loggedInUser" class="el-button is-text">Become a Seller</button>
        <button v-if="!loggedInUser" class="signin-btn" @click="login">Sign In</button>
        <button v-if="!loggedInUser" class="join-btn" @click="register">Join</button>

        <button v-if="loggedInUser" class="el-button is-text" @click="toggleOrdersModal">Orders</button>
        <div v-if="orderOpen" class="order-modal">

          <div @click="toggleOrdersModal" v-for="order in orders" class="order-container">

            <div class="img-container">
              <router-link :to="`/gig/${order.gig._id}`">
                <img :src="order.gig.img">
              </router-link>
            </div>
            <div>
              <router-link :to="`/gig/${order.gig._id}`">
                <p class="gig-title">{{ order.gig.name }}</p>
              </router-link>
              <div class="seller-status">
                <span>by {{ order.seller.fullname }}</span>
                <span class="status">{{ order.status }}</span>
              </div>
            </div>

          </div>

        </div>
        <button v-if="loggedInUser" class="el-button is-text">Switch To Selling</button>

        <div @click="toggleUserModal" class="user-img" v-if="loggedInUser">
          <!-- <img :src="loggedInUser.imgUrl"> -->
          {{ loggedInUser.fullname }}

          <div v-if="modalOpen" class="user-modal flex">
            <router-link to="/seller/profile"><a>Profile</a></router-link>
            <router-link to="/seller/orders"><a>Dashboard</a></router-link>
            <a @click="doLogout">Logout</a>
          </div>
        </div>

      </div>
    </nav>
  </header>
</template>

<script>
import signup from './signup.vue'
import login from './login.vue'
import headerSearch from './header-search.vue'
import { eventBus } from '../services/event-bus-service.js'


export default {
  name: 'app-header',
  components: {
    signup,
    login,
    headerSearch,
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
      windowTop: window.top.scrollY,
      isSearchShown: false,
      modalOpen: false,
      orderOpen: false
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods: {
    filter(title) {
      this.filterBy.title = title
      this.$emit('filter', { ...this.filterBy })
      console.log(this.filterBy)
    },
    onScroll(e) {
      if (this.$route.path !== '/') return
      this.windowTop = window.top.scrollY
      this.isSearchShown = this.windowTop > 150 ? true : false
    },
    register() {
      eventBus.emit('get-cmp', 'signup')
    },
    login() {
      eventBus.emit('get-cmp', 'login')
    },
    toggleUserModal() {
      this.modalOpen = !this.modalOpen
    },
    toggleOrdersModal() {
      this.orderOpen = !this.orderOpen
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
      this.toggleUserModal()
    },


  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    currRoutePath() {
      return this.$route.path
    },
    orders() {
      return this.$store.getters.buyerOrders
    },
  },
  watch: {
    $route: {
      handler(route) {
        this.isSearchShown = route.path !== '/' ? true : false
      },
    },
  }
}

</script>