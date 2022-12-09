<template>
  <div class="hero-search flex">
    <div class="flex input-container">
      <div class="search-icon">
        <span v-icon="'searchGrey'"></span>
      </div>
      <input v-model="title" placeholder="Try &quot;Logo Design&quot; ">

    </div>
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
  