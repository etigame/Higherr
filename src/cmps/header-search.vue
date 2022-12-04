<template >
  <div class="header-search flex">
    <el-input v-model="title" size="large" />
    <el-button @click="filter" size="large"/>
  </div>
</template>

<script>

// import { Search } from '@element-plus/icons-vue'

export default {
  name: 'header-search',
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
