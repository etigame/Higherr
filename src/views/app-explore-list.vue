<template>
  <div class="app-explore-list main-layout full">
    <section class="results-title">
    <h1 v-if="$route.query.title">Results for "{{ $route.query.title }}"</h1>
    <h1 v-if="$route.query.category">{{ $route.query.category }}</h1>
    <h1 v-if="$route.query.subCategory">{{ $route.query.subCategory }}</h1>
    </section>
    <!-- <advanced-filter /> -->
<section class="shadow  main-layout full">
    <section class="advanced-filter">

      <div class="advanced-input">
        <button class="clear-filter-btn" @click="clearAllFilter">Clear Filter</button>
        <el-select v-model="filterBy.category" @change="filter()" class="m-2 category-input" placeholder="Category"
          size="large">
          <el-option v-for="item in options"  :label="item.label" :value="item.value" />
        </el-select>


        <div @click="toggleBudget" class="budget-input-1 flex">
          <span>Budget</span>
          <form @submit.prevent="filterBudget()" v-if="budgetDrop" v-clickOutside="toggleBudget" class="budget-dropdown">
            <div @click.stop class="inputs">
              <div>
              <p>MIN</p>
              <input v-model.number="filterBy.min"/>
              </div>
              <div>
              <p>MAX</p>
              <input v-model.number="filterBy.max"/>
              </div>
            </div>
            <div @click.stop class="buttons flex">
              <div @click.stop="clearBudget()">Clear All</div>
              <button>Apply</button>
            </div>
          </form>
        </div>

        <el-select @change="filter()" class="m-2 delivery-input" v-model="filterBy.delivery" placeholder="Delivery Time"
          size="large">
          <el-option value="1" v-model="filterBy.delivery">Express 24H</el-option>
          <el-option value="3" v-model="filterBy.delivery">Up to 3 days</el-option>
          <el-option value="7" v-model="filterBy.delivery">Up to 7 days</el-option>
          <el-option value="" v-model="filterBy.delivery">Anytime</el-option>
        </el-select>
      </div>

      <div class="advanced-switches">
        <div class="pro-switch"><el-switch v-model="demoInfo" class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #dadbdd" />
          <h4>Pro service</h4>
        </div>
        <div class="online-switch"><el-switch v-model="demoInfo" class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #dadbdd" />
          <h4>Online seller</h4>
        </div>
      </div>
    </section>
    </section>

    <div class="sorting-click">
      <div class="flex ">
        <h4 class="available-services" v-if="gigs">{{ gigs.length }} Services available</h4>
      </div>
      <div class="sort-input">
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
import advancedFilter from '../cmps/advanced-filter.vue'



export default {
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
      options: [
        {
          value: '',
          label: 'All category',
        },
        {
          value: 'Graphics & Design',
          label: 'Graphics & Design',
        },
        {
          value: 'Lifestyle',
          label: 'Lifestyle',
        },
        {
          value: 'Other',
          label: 'Other',
        },
        {
          value: 'Other',
          label: 'Other',
        },
      ],
        
    }
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
  },
  components: {
    gigPreviewExplore,
    advancedFilter
  },
  methods: {
    filter(filterBy = this.filterBy) {
      this.$router.push({ name: 'app-explore-list', query: { ...filterBy } })
      this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })
    },
    clearBudget() {
      this.budgetDrop = false
      this.filterBy.min = ''
      this.filterBy.max = ''
      this.filter()
    },
    filterBudget(){
      this.budgetDrop=false
      this.filter()
    },
    clearAllFilter() {
    this.filterBy= {
      title: '',
      category: '',
      subCategory: '',
      min: null,
      max: null,
      delivery: null,
      },



      this.filter()
    },
    toggleBudget(){
      this.budgetDrop=!this.budgetDrop
    }

  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.path == '/explore') this.filter(newValue.query)
      },
      deep: true
    },
  }


}
</script>
