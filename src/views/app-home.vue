<template>
  <section class="app-home main-layout full">
    <!-- <section class="hero full">
      <img class="hero-andrea" src="src/assets/img/hero1.webp" />
      <img class="hero-moon" src="src/assets/img/hero2.webp" />
      <img class="hero-moon" src="src/assets/img/hero3.webp" />
      <img class="hero-zach" src="src/assets/img/hero4.webp" />
      <img class="hero-gabrielle" src="src/assets/img/hero5.webp" />

    
    </section> -->
    <app-hero></app-hero>
    <categories-list :type="'card'"/>
    <section class="video-section flex full">
      <p>
      <h1>A whole world of freelance talent at your fingertips</h1>
      <ul>
        <li v-for="item in pageText">
          <span v-icon="'check'"></span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
      </ul>
      </p>
      <div class="vid-container ">
        <img src="src/assets/img/vid-teaser.webp">
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
