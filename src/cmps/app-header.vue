<template>
  <section class="main-layout full">

    <!-- SIDE-MENU ON MOBILE-SCREEN -->
    <section v-if="menuOpen" @click="toggleSideMenu" class="side-menu" v-clickOutside="toggleSideMenu">
      <router-link v-if="!loggedInUser" to="/explore" class="btn txt">Explore</router-link>

      <div v-if="!loggedInUser" @click="login"><a>Sign In</a></div>
      <div v-if="!loggedInUser" @click="register"><a>Join</a></div>
      <div v-if="loggedInUser" class="user-info flex">
        <div class="img-container">
          <img v-if="loggedInUser" :src="loggedInUser.imgUrl">
        </div>
        <p v-if="loggedInUser">{{ loggedInUser.username }}</p>
      </div>
      <div v-if="(!loggedInUser || !loggedInUser.isSeller)" @click="registerSeller"><a>Become a Seller</a></div>
      <router-link v-if="(loggedInUser && loggedInUser.isSeller)" to="/seller/profile">Profile</router-link>
      <router-link v-if="(loggedInUser && loggedInUser.isSeller)" to="/seller/orders">Dashboard</router-link>

      <a v-if="loggedInUser" @click="doLogout">Logout</a>

      <div class="orders-container" v-if="(loggedInUser && orders)">
        <div class="flex drop-wrapper" @click.stop="toggleOrdersModal(); closeActiveOrders();">
          <div class="orders-title flex">
            <div v-if="isActiveOrders" class="notification-orders"></div>
            <a>My Orders</a>
          </div>

          <div class="drop-arrow">
            <span v-if="!orderOpen" v-icon="'dropDown'"></span>
            <div class="dropUp">
              <span v-if="orderOpen" v-icon="'dropDown'"></span>
            </div>
          </div>
        </div>

        <section class="orders-wrapper">
          <article v-if="orderOpen" v-for="order in orders" class="order-container">
            <router-link :to="`/gig/${order.gig._id}`">
              <div class="info flex">
                <div class="img-container">
                  <img :src="order.gig.img">
                </div>
                <p class="gig-title">{{ order.gig.name }}</p>
              </div>
            </router-link>
            <div>
              <div class="seller-status flex">
                <span>Status:</span>
                <span class="status " :class="className(order.status)">{{ order.status }}</span>
              </div>
            </div>
          </article>
        </section>
      </div>
    </section>

    <!-- ON WIDE-SCREEN -->
    <header class="app-header main-layout full flex align-center"
      :class="{ transparent: (windowTop === 0 && currRoutePath === '/') }">
      <nav class="flex align-center space-between">
        <div @click="toggleSideMenu" class="menu-icon">
          <div v-if="isActiveOrders" class="notification-orders"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div class="logo-container">
          <router-link to="/">
            <div class="logo">
              <h1>Higherr</h1>
            </div>
          </router-link>
        </div>

        <div class="search" :class="{ shown: isSearchShown }">
          <header-search @filter="filter" />
        </div>

        <div class="nav-links flex align-center">
          <router-link to="/explore" class="btn txt">Explore</router-link>
          <button class="btn txt" @click="registerSeller">Become a
            Seller</button>
          <button v-if="!loggedInUser" class="signin-btn btn txt" @click="login">Sign In</button>
          <button v-if="!loggedInUser" class="join-btn btn txt" @click="register">Join</button>

          <button v-if="loggedInUser" class="orders btn txt" @click="toggleOrdersModal(); closeActiveOrders();">
            Orders
            <div v-if="isActiveOrders" class="notification-orders"></div>
          </button>

          <div v-if="orderOpen" class="order-modal" v-clickOutside="toggleOrdersModal">
            <div class="modal-tip"></div>

            <div v-if="(!orders || orders.length === 0)" class="no-order">
              <div class="empty-icon">
                <span v-icon="'empty'"></span>
              </div>
              <h3>No Orders Yet</h3>
              <p class="light empty-txt">Use the search box to find the digital service you need</p>
            </div>

            <section class="orders-wrapper">
              <article v-if="loggedInUser" @click="toggleOrdersModal" v-for="order in orders" class="order-container">
                <router-link :to="`/gig/${order.gig._id}`">
                  <div class="img-container">
                    <img :src="order.gig.img">
                  </div>
                </router-link>
                <div>
                  <router-link :to="`/gig/${order.gig._id}`">
                    <p class="gig-title">{{ order.gig.name }}</p>
                  </router-link>
                  <div class="seller-status">
                    <span>by {{ order.seller.username }}</span>
                    <span class="status" :class="className(order.status)">{{ order.status }}</span>
                  </div>
                </div>

              </article>
            </section>
          </div>

          <div @click="toggleUserModal" class="user-img " v-if="loggedInUser">
            <div v-if="isActiveDashboard" class="notification-dashboard"></div>
            <img :src="loggedInUser.imgUrl">

            <div v-if="modalOpen" class="user-modal flex" v-clickOutside="toggleUserModal">
              <div class="modal-tip"></div>
              <router-link v-if="loggedInUser.isSeller" to="/seller/profile" class=" light">Profile</router-link>
              <div v-if="isActiveDashboard" class="notification-dashboard"></div>
              <router-link v-if="loggedInUser.isSeller" to="/seller/orders"
                @click="closeActiveDashboard">Dashboard</router-link>
              <a @click="doLogout">Logout</a>
            </div>
          </div>

        </div>
      </nav>
    </header>

    <section>
      <div class="search-narrow">
        <header-search @filter="filter" />
      </div>
    </section>

  </section>
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

  props: {
    isActiveOrders: Boolean,
    isActiveDashboard: Boolean
  },

  data() {
    return {
      windowTop: window.top.scrollY,
      isSearchShown: false,
      modalOpen: false,
      orderOpen: false,
      menuOpen: false,
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
      this.$emit('filter', { title: title })
    },

    onScroll(e) {
      if (this.$route.path !== '/') return
      this.windowTop = window.top.scrollY
      this.isSearchShown = this.windowTop > 150 ? true : false
    },

    register() {
      eventBus.emit('get-cmp', 'signup')
    },

    registerSeller() {
      this.$router.push('/seller/register')
    },

    login() {
      eventBus.emit('get-cmp', 'login')
    },

    toggleSideMenu() {
      this.menuOpen = !this.menuOpen
    },

    toggleUserModal() {
      this.modalOpen = !this.modalOpen
    },

    toggleOrdersModal() {
      this.orderOpen = !this.orderOpen
    },

    closeActiveOrders() {
      this.$emit('closeOrderNotification')
    },

    closeActiveDashboard() {
      this.$emit('closeDashboardNotification')
    },

    doLogout() {
      this.$store.dispatch({ type: 'logout' })
      this.toggleUserModal()
      this.$router.push('/')
    },

    className(str) {
      if (str === 'Pending') return 'pending'
      if (str === 'Completed') return 'completed'
      if (str === 'In Progress') return 'in-progress'
      if (str === 'Rejected') return 'rejected'
    }
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