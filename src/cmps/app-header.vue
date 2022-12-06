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
        <button v-if="!loggedInUser" class="el-button is-text" @click="registerSeller">Become a Seller</button>
        <button v-if="!loggedInUser" class="signin-btn" @click="register">Sign In</button>
        <button v-if="!loggedInUser" class="join-btn" @click="register">Join</button>

        <button v-if="loggedInUser" class="el-button is-text">Orders</button>
        <button v-if="loggedInUser" class="el-button is-text">Switch To Selling</button>

        <div @click="toggleUserModal" class="user-img" v-if="loggedInUser">
          <!-- <img :src="loggedInUser.imgUrl"> -->
          {{ loggedInUser.fullname }}
          <!-- <div v-if="modalOpen" :class="{ transparent: (windowTop === 0) }"> -->
          <div v-if="modalOpen" class="user-modal">
            <!-- <div v-if="modalOpen" class="user-modal"> -->
            <router-link to="/seller/profile"><button class="el-button is-text">Profile</button></router-link>
            <router-link to="/seller/orders"><button class="el-button is-text">Dashboard</button></router-link>
            <button @click="doLogout" class="el-button is-text">Logout</button>
          </div>
        </div>

      </div>
    </nav>
  </header>
</template>

<script>
import loginSignup from './login-signup.vue'
import headerSearch from './header-search.vue'
import { eventBus } from '../services/event-bus-service.js'


export default {
  name: 'app-header',
  components: {
    loginSignup,
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
      modalOpen: false
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
      eventBus.emit('get-cmp', 'login-signup')
    },
    registerSeller() {
      eventBus.emit('get-cmp', 'seller-signup')
    },
    toggleUserModal() {
      this.modalOpen = !this.modalOpen
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },


  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    currRoutePath() {
      return this.$route.path
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.isSearchShown = route.path !== '/' ? true : false
      },
    },
  },
}
</script>
