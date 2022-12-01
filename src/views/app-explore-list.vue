<template>
  <div class="app-explore-list">

    <div class="advanced-filter">
      <div class="advanced-input">
        <el-select v-model="demoOption" class="m-2 category-input" placeholder="Category" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>


        <el-dropdown split-button type="secondary" class="m-2">
          Default
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <div class="preview-budget-container flex">
                <div class="preview-budget flex">
                  <div>
                    <p>Min.</p>
                    <el-input @click.stop placeholder="Any" />
                  </div>
                  <div>
                    <p>Max.</p>
                    <el-input @click.stop placeholder="Any" />
                  </div>
                </div>
                <div>
                <el-button type="secondary" @click="onSubmit">Apply</el-button>
                </div>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- <el-select value="1" class="m-2 budget-input" placeholder="Budget" size="large">
          <el-option value="1"><el-input @click.stop  placeholder="Any" /></el-option>
          <el-option value="1"><el-input @click.stop  placeholder="Any" /></el-option>
          <el-button type="primary" @click="onSubmit">Apply</el-button>
        </el-select> -->

        <el-select class="m-2 delivery-input" placeholder="Delivery Time" size="large">
          <el-option value="1"><el-checkbox label="Express 24H" /></el-option>
          <el-option value="1"><el-checkbox label="Up to 3 days" /></el-option>
          <el-option value="1"><el-checkbox label="Up to 7 days" /></el-option>
          <el-option value="1"><el-checkbox label="Anytime" /></el-option>
        </el-select>

        <!-- <el-select v-model="value" class="m-2 budget-input" placeholder="Budget" size="large">
          <el-option><el-input v-model="demoInfo1" placeholder="Any" /></el-option>
          <el-option><el-input v-model="demoInfo1" placeholder="Any" /></el-option>
        </el-select>

        <el-select v-model="demoInfo1" class="m-2 delivery-input" placeholder="Delivery Time" size="large">
          <el-option><el-checkbox v-model="demoInfo1" label="Express 24H"/></el-option>
          <el-option><el-checkbox v-model="demoInfo1" label="Up to 3 days"/></el-option>
          <el-option><el-checkbox v-model="demoInfo1" label="Up to 7 days"/></el-option>
          <el-option><el-checkbox v-model="demoInfo1" label="Anytime"/></el-option>
        </el-select> -->
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
        <h4 v-if="gigs">{{ gigs.length }} Services available</h4>
      </div>
      <div class="sort-input">
        <h4> Sort by </h4><el-select id="sortby-select" class="m-2 sortby-select" placeholder="Relevance" size="large">
          <el-option value="bestSelling">Best Selling</el-option>
          <el-option value="newestArrivals">Newest Arrivals</el-option>
        </el-select>
      </div>
    </div>

    <el-dropdown>
      <span class="el-dropdown-link">
        Relevance
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Relevance</el-dropdown-item>
          <el-dropdown-item>Best Selling</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>




    <div v-if="gigs" class="gig-list clean-list list-container">

      <gig-preview v-for="gig in gigs" :gig="gig" :key="gig._id" />

    </div>
    <hr />
    <!-- <form @submit.prevent="addGig()">
            <h2>Add gig</h2>
            <input type="text" v-model="gigToAdd.title" />
            <button>Save</button>
        </form> -->
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus-service'
import { gigService } from '../services/gig-service'
import { getActionRemoveGig, getActionUpdateGig } from '../store/gig-store'
import gigPreview from '../cmps/gig-preview.vue'

export default {
  data() {
    return {
      gigToAdd: gigService.getEmptyGig(),
      demoInfo: true,
      demoInfo1: 1,
      value: 'str',
      demoOption: 'Category',

      options: [
        {
          value: 'All category',
          label: 'All category',
        },
        {
          value: 'Other',
          label: 'Other',
        },
        {
          value: 'Other',
          label: 'Other',
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
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadGigs' })
  },
  components: {
    gigPreview
  },
  methods: {
    async addGig() {
      try {
        await this.$store.dispatch({ type: 'addGig', gig: this.gigToAdd })
        showSuccessMsg('Gig added')
        this.gigToAdd = gigService.getEmptyGig()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add gig')
      }
    },
    async removeGig(gigId) {
      try {
        await this.$store.dispatch(getActionRemoveGig(gigId))
        showSuccessMsg('Gig removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove gig')
      }
    },
    async updateGig(gig) {
      try {
        gig = { ...gig }
        gig.price = +prompt('New price?', gig.price)
        await this.$store.dispatch(getActionUpdateGig(gig))
        showSuccessMsg('Gig removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove gig')
      }
    },
    async addGigMsg(gigId) {
      try {
        await this.$store.dispatch(getActionAddGigMsg(gigId))
        showSuccessMsg("Gig msg added")
      } catch (err) {
        console.log(err)
        showErrorMsg("Cannot add gig msg")
      }
    },
    printGigToConsole(gig) {
      console.log("Gig msgs:", gig.msgs)
    },

  }


}
</script>
