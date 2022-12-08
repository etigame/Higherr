<template >
  <div class="header-search flex">
    <el-input v-model="title" placeholder="What service are you looking for today?" />
    <el-button @click="filter"><span v-icon="'search'"></span></el-button>
  </div>
</template>

<script>
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
