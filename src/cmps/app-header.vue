<template>
  <header class="app-header main-layout full flex align-center" :class="{ transparent: windowTop === 0 }">
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
        <router-link to="/explore">Explore</router-link>
        <button class="el-button is-text">Become a Seller</button>
        <el-button class="signin-btn" @click="register">
      Sign In
    </el-button>
    <el-button class="join-btn" @click="register">
      Join
    </el-button>

      </div>
    </nav>
    <!-- <section class="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
    </section> -->
  </header>
</template>

<script>
import loginSignup from './login-signup.vue'
import headerSearch from './header-search.vue'
import {eventBus} from '../services/event-bus-service.js'


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
      isSearchShown: false
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
    register(){
        eventBus.emit('get-cmp', 'login-signup')
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
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
