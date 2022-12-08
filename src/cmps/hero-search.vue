<template>
  <div class="hero-search flex">
    <div class="flex input-container">
      <div class="search-icon">
      <span v-icon="'search'"></span>
      </div>
    <input v-model="title" size="large" placeholder="Try 'Logo Design'">
    </div>
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
  