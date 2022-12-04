<template>
  <header class="app-header main-layout full"   ref="header">
    <nav class="flex align-center space-between">
      <router-link to="/">
        <div class="home">
          <h1>Higherr</h1>
        </div>
      </router-link>

      <div class="search">
      <header-search @filter="filter" />
    </div>
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
import headerSearch from './header-search.vue'

export default {
  name: 'app-header',

  mounted() {
    this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
      rootMargin: "100px 0px 0px",
    });
    this.headerObserver.observe(this.$refs.header);
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
      headerObserver: null,
      headerState: "closed",
    }
  },
  components: {
    loginSignup,
    headerSearch,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
       filter(title) {
        this.filterBy.title=title
        this.$emit('filter', { ...this.filterBy })
     
      },
      onHeaderObserved(entries) {
        entries.forEach((entry) => {
        this.class = entry.isIntersecting ? " ": "closed";
        });
      }
  },
}
</script>
