<template>
  <section class=" main-layout">
    <user-msg />
    <app-header />
    <categories-list type="txt" />
    <router-view  class="app-container main-layout full" />
    <!-- <main><router-view /></main> -->
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
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    appHeader,
    userMsg,
    categoriesList,
    appFooter
  },
}
</script>