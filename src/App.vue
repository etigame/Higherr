<template>
  <section class="main-layout">
    <user-msg />
    <app-header />
    <categories-list :type="'tag'" @filter="filter" />
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




export default {
  created() {
    this.$store.dispatch({ type: 'loadGigs' })
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
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
    }
  },
  methods: {
    filter(filterBy = this.filterBy) {
      this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })

    },
  },
  components: {
    appHeader,
    userMsg,
    categoriesList,
    appFooter,

  },
}
</script>