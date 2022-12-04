<template>
  <header class="app-header main-layout full" ref="header" :class="{ visible: stickyHeader }">
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
      headerObserver: null,
      stickyHeader: false,
    }
  },
  mounted() {
    this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
      rootMargin: "-85px 0 0",
    })
    this.headerObserver.observe(this.$refs.header)
  },
  methods: {
    filter(title) {
      this.filterBy.title = title
      this.$emit('filter', { ...this.filterBy })
      console.log(this.filterBy)
    },
    onHeaderObserved(entries) {
      entries.forEach((entry) => {
        console.log(entry)
        console.log(entry.boundingClientRect)
        this.stickyHeader = entry.isIntersecting ? false : true
      })
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    filter(title) {
      this.filterBy.title = title
      this.$emit('filter', { ...this.filterBy })
      console.log(this.filterBy)
    },
    onHeaderObserved(entries) {
      entries.forEach((entry) => {
        console.log("change")
        this.class = entry.isIntersecting ? " " : "closed"
      })
    }
  },
}
</script>
