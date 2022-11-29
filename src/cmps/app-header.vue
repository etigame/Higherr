<template>
  <header class="app-header main-layout full">
    <nav>
      <app-nav />


      <router-link to="/">
        <span role="img" aria-label="logo">🙏</span>
      </router-link>
      <router-link to="/explore">Explore</router-link>
      <!-- <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/login">Login / Signup</router-link> -->
    </nav>
    <section class="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
    </section>
  </header>
</template>


<script>
import appNav from './app-nav.vue'

export default {
  name: 'app-header',
  components: {
    appNav
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>