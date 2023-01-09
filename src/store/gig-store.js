import { gigService } from '../services/gig-service'
// import { userStore } from '../store/user-store.js'

export function getActionRemoveGig(gigId) {
  return {
    type: 'removeGig',
    gigId,
  }
}
export function getActionAddGig(gig) {
  return {
    type: 'addGig',
    gig,
  }
}
export function getActionUpdateGig(gig) {
  return {
    type: 'updateGig',
    gig,
  }
}

export const gigStore = {
  state: {
    gigs: [],
    selectedGig: null,
    filterBy: {
      title: '',
      category: '',
      subCategory: '',
      min: null,
      max: null,
      delivery: '',
    },
  },
  getters: {
    gigsByUser({ gigs }, rootGetters) {
      const user = rootGetters.loggedinUser
      var filteredGigs = gigs.filter((gig) => {
        return gig.owner._id === user._id
      })
      if (filteredGigs.length > 0) return filteredGigs
    },

    selectedGig({ selectedGig }) {
      return selectedGig
    },
    gigs({ gigs, filterBy }) {
      var filteredGigs = gigs
      const regex = new RegExp(filterBy.title, 'i')
      filteredGigs = gigs.filter((gig) => regex.test(gig.title))

      if (filterBy.category)
        filteredGigs = filteredGigs.filter(
          (gig) => gig.category === filterBy.category
        )

      if (filterBy.subCategory)
        filteredGigs = filteredGigs.filter(
          (gig) => gig.subCategory === filterBy.subCategory
        )

      if (filterBy.min)
        filteredGigs = filteredGigs.filter(
          (gig) => parseInt(gig.price) >= filterBy.min
        )
      if (filterBy.max)
        filteredGigs = filteredGigs.filter(
          (gig) => parseInt(gig.price) <= filterBy.max
        )
      if (filterBy.delivery)
        filteredGigs = filteredGigs.filter(
          (gig) => parseInt(gig.daysToMake) <= filterBy.delivery
        )

      return filteredGigs
    },
  },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    setSelectedGig(state, { gig }) {
      state.selectedGig = gig
    },
    setGigs(state, { gigs }) {
      state.gigs = gigs
    },
    addGig(state, { gig }) {
      state.gigs.push(gig)
    },
    updateGig(state, { gig }) {
      const idx = state.gigs.findIndex((c) => c.id === gig._id)
      state.gigs.splice(idx, 1, gig)
    },
    removeGig(state, { gigId }) {
      state.gigs = state.gigs.filter((gig) => gig._id !== gigId)
    },
    addGigMsg(state, { gigId, msg }) {
      const gig = state.gigs.find((gig) => gig._id === gigId)
      if (!gig.msgs) gig.msgs = []
      gig.msgs.push(msg)
    },
  },
  actions: {
    async addGig(context, { gig }) {
      try {
        gig = await gigService.save(gig)
        context.commit(getActionAddGig(gig))
        return gig
      } catch (err) {
        console.log('gigStore: Error in addGig', err)
        throw err
      }
    },
    async updateGig(context, { gig }) {
      try {
        gig = await gigService.save(gig)
        context.commit(getActionUpdateGig(gig))
        return gig
      } catch (err) {
        console.log('gigStore: Error in updateGig', err)
        throw err
      }
    },

    async loadGig(context, { gigId }) {
      try {
        const gig = await gigService.getById(gigId)
        context.commit({ type: 'setSelectedGig', gig })
      } catch (err) {
        console.log('gigStore: Error in loadGig', err)
        throw err
      }
    },
    async loadGigs(context, { filterBy }) {
      try {
        const gigs = await gigService.query()
        context.commit({ type: 'setGigs', gigs })
      } catch (err) {
        console.log('gigStore: Error in loadGigs', err)
        throw err
      }
    },
    async removeGig(context, { gigId }) {
      try {
        await gigService.remove(gigId)
        context.commit(getActionRemoveGig(gigId))
      } catch (err) {
        console.log('gigStore: Error in removeGig', err)
        throw err
      }
    },
    async addGigMsg(context, { gigId, txt }) {
      try {
        const msg = await gigService.addGigMsg(gigId, txt)
        context.commit({ type: 'addGigMsg', gigId, msg })
      } catch (err) {
        console.log('gigStore: Error in addGigMsg', err)
        throw err
      }
    },
  },
}
