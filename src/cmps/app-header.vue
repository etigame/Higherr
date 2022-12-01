<template>
  <header class="app-header main-layout full">
    <nav class="flex space-between align-center">
  
      <router-link to="/">
        <div class="home">
          <span role="img" aria-label="logo">🙏</span>
          <h1>Higherr.</h1>
      </div>
    </router-link>
      <div>
        <router-link to="/explore">Explore</router-link>
        <login-signup/>
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

import loginSignup from './login-signup.vue';

export default {
  name: 'app-header',
  components: {
   loginSignup
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>