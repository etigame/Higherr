import { gigService } from '../services/gig-service'

export const gigStore = {
    state: {
        gigs: []
    },
    getters: {
        gigs({gigs}) { return gigs },
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs
        },
        addGig(state, { gig }) {
            state.gigs.push(gig)
        },
        updateGig(state, { gig }) {
            const idx = state.gigs.findIndex(c => c.id === gig._id)
            state.gigs.splice(idx, 1, gig)
        },
        removeGig(state, { gigId }) {
            state.gigs = state.gigs.filter(gig => gig._id !== gigId)
        },
    },
    actions: {
        async addGig(context, { gig }) {
            try {
                gig = await gigService.save(gig)
                context.commit({type: 'addGig', gig})
                return gig
            } catch (err) {
                console.log('gigStore: Error in addGig', err)
                throw err
            }
        },
        async updateGig(context, { gig }) {
            try {
                gig = await gigService.save(gig)
                context.commit({type: 'updateGig', gig})
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
                context.commit({type: 'removeGig', gigId})
            } catch (err) {
                console.log('gigStore: Error in removeGig', err)
                throw err
            }
        },

    }
}