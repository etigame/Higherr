<template>
  <section class="app-home main-layout full">
    <section class="hero full"><img src="src/assets/img/hero1.webp" /></section>
    <categories-list type="cards"/>
  </section>
</template>

<script>

import categoriesList from '../cmps/categories-list.vue';

export default {
  name: 'app-home',
  components: {categoriesList},
 
  data() {
    return {
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
