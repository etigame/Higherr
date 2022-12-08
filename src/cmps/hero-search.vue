<template>
  <div class="hero-search flex">
    <input v-model="title" size="large" placeholder="Try 'Logo Design'">
    <!-- <el-input v-model="title" size="large" /> -->
    <el-button @click="filter"  size="large">Search</el-button>
  </div>
</template>
  
<script>

export default {
  name: 'hero-search',
  data() {
    return {
      title: '',
    }
  },

  methods: {
    filter() {
      this.$emit('filter', this.title)
    },

  },
}

</script>
  