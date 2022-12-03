<template>
  <section class="app-home main-layout full">

    
    <app-hero></app-hero>

    <div class="trusted-by main-layout full">
      <div class="logos flex justify-center align-center">
        <span>Trusted By:</span>
        <div class="logo-container"  v-for="num in 5">
          <img :src="`src/assets/img/trustby${num}.png`">
      </div>
    </div>
    </div>
    <categories-list :type="'card'"/>
   
    <section class="video-section flex full main-layout">

      <div class="flex">
        <div class="info">
          <p class="side-text">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <ul>
            <li v-for="item in pageText">
              <span v-icon="'check'"></span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </li>
          </ul>
          </p>
        </div>
        <div class="vid-container ">
          <img src="src/assets/img/vid-teaser.webp">
        </div>
      </div>
      </section>
    <categories-list :type="'svg'"/>
  </section>
</template>

<script>
import appHero from "../cmps/app-hero.vue"
import categoriesList from '../cmps/categories-list.vue';

export default {
  name: 'app-home',
  components: {categoriesList, appHero},
 
  data() {
    return {
      pageText: [
        { title: 'The best for every budget', text: ' Find high-quality services at every price point. No hourly rates, just project-based pricing.' },
        { title: 'Quality work done quickly', text: ' Find the right freelancer to begin working on your project within minutes.' },
        { title: 'Protected payments, every time', text: " Always know what you'll pay upfront. Your payment isn't released until you approve the work." },
        { title: 'Quality work done quickly', text: ' Find the right freelancer to begin working on your project within minutes.' },
      ]
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  }

}
</script>
