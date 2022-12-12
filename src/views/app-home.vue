<template>
  <section class="app-home main-layout full">


    <app-hero @filter="filter"></app-hero>

    <div class="trusted-by main-layout full ">
      <div class="logos flex align-center justify-center">
        <span>Trusted By:</span>
        <div class="logo-container" v-for="image in getLogos">
          <img :src="image">
        </div>
      </div>
    </div>
    <categories-list :type="'card'" />
    <!-- <categories-list :type="'card'" @filter="filter" /> -->

    <section class="video-section flex full main-layout">
      <div class="flex video-layout">
        <div class="site-info">
          <p class="side-text">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <ul>
            <li v-for="item in getPageText">
              <section class="flex align-center">
                <span v-icon="'check'"></span>
                <h3>{{ item.title }}</h3>
              </section>
              <p>{{ item.text }}</p>
            </li>
          </ul>
          </p>
        </div>
        <div class="vid-container ">
          <img src="https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793711/gigs/ostlxosopzlu6ccomezg.webp">
        </div>
      </div>
    </section>

    <section class="category-svg">
      <categories-list :type="'svg'" @filter="filter" />
    </section>
  </section>
</template>

<script>
import appHero from "../cmps/app-hero.vue"
import categoriesList from '../cmps/categories-list.vue'

export default {
  name: 'app-home',
  components: { categoriesList, appHero },

  data() {
    return {
      // pageText: [
      //   { title: 'The best for every budget', text: ' Find high-quality services at every price point. No hourly rates, just project-based pricing.' },
      //   { title: 'Quality work done quickly', text: ' Find the right freelancer to begin working on your project within minutes.' },
      //   { title: 'Protected payments, every time', text: " Always know what you'll pay upfront. Your payment isn't released until you approve the work." },
      //   { title: 'Quality work done quickly', text: ' Find the right freelancer to begin working on your project within minutes.' },
      // ]

    }
  },
  computed: {
    getPageText() {
      return [
        { title: 'The best for every budget', text: ' Find high-quality services at every price point. No hourly rates, just project-based pricing.' },
        { title: 'Quality work done quickly', text: ' Find the right freelancer to begin working on your project within minutes.' },
        { title: 'Protected payments, every time', text: " Always know what you'll pay upfront. Your payment isn't released until you approve the work." },
        { title: 'Quality work done quickly', text: ' Find the right freelancer to begin working on your project within minutes.' },
      ]
    },
    getLogos() {
      return ['https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793766/gigs/fdbg9kvjrydeqaere8sn.png', 'https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793766/gigs/hgxyurzmqgdevqmg979v.png', 'https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793766/gigs/ktprdhufw3xhhsrgd5ij.png', 'https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793766/gigs/sj7qx56f9tkb3vthvtbl.png', 'https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793766/gigs/dnvcm1ob8c9r0azmzk2g.png']
    }

  },
  created() {
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
      this.$router.push({ name: 'app-explore-list', query: { ...filterBy } })
      this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })
    },
  }

}
</script>
