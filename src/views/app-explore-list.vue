<template>
  <div class="app-explore-list main-layout full">
    <section class="results-title">
      <h1 v-if="$route.query.title">Results for "{{ $route.query.title }}"</h1>
      <h1 v-if="$route.query.category">{{ $route.query.category }}</h1>
      <h1 v-if="$route.query.subCategory">{{ $route.query.subCategory }}</h1>
    </section>
    <!-- <advanced-filter /> -->
    <section class="advanced-filter-container main-layout full" :class="{ shadow: isShadow }">
      <section class="advanced-filter">

        <div class="advanced-input">
          <button class="clear-filter-btn bold" @click="clearAllFilter" style="font-size: 16px; color: #222325">Clear
            Filter</button>
          <!-- <el-select v-model="filterBy.category" @change="filter()" class="m-2 category-input" placeholder="Category"
            size="large">
            <el-option v-for="item in options" :label="item.label" :value="item.value" />
          </el-select> -->


          <div @click="toggleBudget" class="budget-input-1 flex">
            <p class="bold">Budget</p>

            <div class="drop-arrow">
              <span v-if="!budgetDrop" v-icon="'dropDown'">
              </span>
              <div class="dropUp">
                <span v-if="budgetDrop" v-icon="'dropDown'"></span>
              </div>
            </div>
            <form @submit.prevent="filterBudget()" v-if="budgetDrop" v-clickOutside="toggleBudget"
              class="budget-dropdown">
              <div @click.stop class="inputs">
                <div>
                  <p class="bold">MIN.</p>
                  <input v-model.number="filterBy.min" />
                  <i>$</i>
                </div>
                <div>
                  <p class="bold">MAX.</p>
                  <input v-model.number="filterBy.max" />
                  <i>$</i>
                </div>
              </div>
              <div @click.stop class="buttons flex">
                <div @click.stop="clearBudget()">Clear All</div>
                <button>Apply</button>
              </div>
            </form>
          </div>

          <el-select @change="filter()" class="m-2 delivery-input" v-model="filterBy.delivery"
            placeholder="Delivery Time" size="large">
            <el-option v-for="item in deliveryOptions" :key="item.value" :label="item.label" :value="item.value"
              class="bold" />
          </el-select>
        </div>


        <div class="advanced-switches">
          <div class="pro-switch"><el-switch v-model="demoInfo" class="ml-2"
              style="--el-switch-on-color: #1dbf73; --el-switch-off-color: #dadbdd" />
            <h4>Pro services</h4>
          </div>
          <div class="online-switch"><el-switch v-model="demoInfo" class="ml-2"
              style="--el-switch-on-color: #1dbf73; --el-switch-off-color: #dadbdd" />
            <h4>Online sellers</h4>
          </div>
        </div>
      </section>
    </section>

    <div class="sorting-click">
      <div class="flex ">
        <h4 class="available-services" v-if="gigs">{{ gigs.length }} Services available</h4>
      </div>
      <div class="sort-input light">
        <h4> Sort by </h4><el-select id="sortby-select" class="m-2 sortby-select" placeholder="Relevance" size="large">
          <el-option value="bestSelling">Best Selling</el-option>
          <el-option value="newestArrivals">Newest Arrivals</el-option>
        </el-select>
      </div>
    </div>

    <div v-if="gigs" class="gig-list clean-list list-container">
      <gig-preview-explore v-for="gig in gigs" :gig="gig" :key="gig._id" />


    </div>

    <div class="pagination">
      <el-pagination large background layout="prev, pager, next" :total="10" class="mt-3" />
    </div>
  </div>
</template>

<script>

import gigPreviewExplore from '../cmps/gig-preview-explore.vue'




export default {
  components: {
    gigPreviewExplore,
  },
  data() {
    return {
      filterBy: {
        title: '',
        category: null,
        subCategory: '',
        min: null,
        max: null,
        delivery: null,
      },
      budgetDrop: false,
      demoInfo: true,
      windowTop: window.top.scrollY,
      isShadow: false,
      deliveryOptions: [
        {
          value: '1',
          label: 'Express 24H',
        },
        {
          value: '3',
          label: 'Up to 3 days',
        },
        {
          value: '7',
          label: 'Up to 7 days',
        },
        {
          value: '',
          label: 'Anytime',
        },
      ]


    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    gigs() {
      return this.$store.getters.gigs
    },
    titleId() {
      return this.$route.params.title
    }
  },
  created() {
    this.filterBy = { ...this.$route.query }
    this.filter()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.path === '/explore') this.filter(newValue.query)
      },
      deep: true
    },
  },
  methods: {
    filter(filterBy = this.filterBy) {
      console.log(filterBy)
      this.$router.push({ name: 'app-explore-list', query: { ...filterBy } })
      this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })
    },

    clearBudget() {
      this.budgetDrop = false
      this.filterBy.min = ''
      this.filterBy.max = ''
      this.filter()
    },
    filterBudget() {
      this.budgetDrop = false
      this.filter()
    },
    clearAllFilter() {
      this.filterBy = {
        title: '',
        category: '',
        subCategory: '',
        min: null,
        max: null,
        delivery: null,
      },
        this.filter()
    },
    toggleBudget() {
      this.budgetDrop = !this.budgetDrop
    },
    onScroll(e) {
      this.windowTop = window.top.scrollY
      this.isShadow = this.windowTop > 170 ? true : false
    },
  },




}
</script>
