import { gigService } from '../services/gig-service'

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
    filterBy: {
      title: '',
      category: '',
      tags: '',
    },
  },
  getters: {
    gigs({ gigs }) {
      return gigs
    },

    filteredGigs({ gigs, filterBy }) {
      var filteredGigs = gigs
      if (
        !filterBy.title &&
        filterBy.label === 'All' &&
        filterBy.inStock === 'All'
      ) {
        filteredGigs = gigs
      } else {
        if (!filterBy.category) {
          filteredGigs = gigs
        } else {
          filteredGigs = gigs.filter((gig) =>
            gig.category.includes(filterBy.category)
          )
        }
        if (!filterBy.tags) {
          filteredGigs = filteredGigs
        } else {
          filteredGigs = gigs.filter((gig) => gig.tags.includes(filterBy.tags))
        }
        const regex = new RegExp(filterBy.title, 'i')
        filteredGigs = filteredGigs.filter((gig) => regex.test(gig.title))
      }
      return filteredGigs
    },
  },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
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
    async loadGigs(context) {
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
