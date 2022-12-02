<template>
  <header class="app-header main-layout full">
    <nav class="flex space-between align-center">
      <router-link to="/">
        <div class="home">
          <span role="img" aria-label="logo"></span>
          <h1>Higherr.</h1>
        </div>
      </router-link>

      <app-search />
      <div class="nav-links flex align-center">
        <router-link to="/explore">Explore</router-link>
        <login-signup />
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
import appSearch from './app-search.vue'

export default {
  name: 'app-header',
  data() {
    return {
      filterBy: {
        title: '',
        category: '',
        subCategory: '',
        min: null,
        max: null,
        delivery: 'Anytime',
      },
    }
  },
  components: {
    loginSignup,
    appSearch,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    filter() {
      this.$store.dispatch({ type: 'loadGigs', filterBy: this.filterBy })
      //  filter() {
      //         this.$emit('filter', { ...this.filterBy })
      //         console.log(this.filterBy)
      //     },
    },
  },
}
</script>
