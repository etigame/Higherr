<template>
  <div class="hero-search flex">
    <div class="flex input-container">
      <div class="search-icon">
        <span v-icon="'searchGrey'"></span>
      </div>
      <input v-model="title" placeholder="Try 'Logo Design'">
    </div>
    <!-- <el-input v-model="title" size="large" /> -->
    <el-button @click="filter">Search</el-button>
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
  