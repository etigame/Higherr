<template>
  <div class="app-explore-list">
    <h1 v-if="$route.query.title">Results for "{{ $route.query.title }}"</h1>
    <div class="advanced-filter">
      <div class="advanced-input">
        <el-select v-model="filterBy.category" @change="filter()" class="m-2 category-input" placeholder="Category"
          size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>


        <!-- <div class="budget-input-1 flex">
          <span>Budget</span>
          <div>
            
          </div>
        </div> -->
        <el-select value="1" class="m-2 budget-input" placeholder="Budget" size="large">
          <el-option value="1"><el-input type="number" v-model.number="filterBy.min" @click.stop
              placeholder="Any" /></el-option>
          <el-option value="1"><el-input type="number" v-model.number="filterBy.max" @click.stop
              placeholder="Any" /></el-option>
          <div><el-button @click="filter()">Apply</el-button><el-button @click="clearBudget()">Clear All</el-button>
          </div>
        </el-select>

        <!-- // TODO IN V-FOR -->
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

    </div>
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
      <gig-preview v-for="gig in gigs" :gig="gig" :key="gig._id" />
      

    </div>

    <div class="pagination">
      <el-pagination large background layout="prev, pager, next" :total="30" class="mt-3" />
    </div>
  </div>
</template>

<script>
import { gigService } from '../services/gig-service'
import gigPreview from '../cmps/gig-preview.vue'


export default {
  data() {
    return {
      filterBy: {
        title: '',
        category: '',
        subCategory: '',
        min: null,
        max: null,
        delivery: null,
      },
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
      ]

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
    gigPreview,
  },
  methods: {
    filter(filterBy = this.filterBy) {

      console.log(filterBy)
      this.$router.push({ name: 'app-explore-list', query: { ...filterBy } })
      this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })

      console.log(this.$router)



    },


    clearBudget() {
      this.filterBy.min = ''
      this.filterBy.max = ''
      this.filter()
    },

  },
  watch: {
    $route: {
      handler(newValue) {
        this.filter(newValue.query)
        console.log('route', newValue.query)

      },
      deep: true
    },
    '$route.query'(newValue) {
      // this.filter(newValue.query)
      console.log('query', newValue)

    },

    // filterBy: {
    //   handler(newValue) {
    //     this.filter()
    //     console.log('filter',newValue);

    //   },
    //   deep: true
    // }
  }


}
</script>
