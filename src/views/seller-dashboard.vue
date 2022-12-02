<template>
    <section class="seller-dashboard">
        <h1>seller-dashboard</h1>
    </section>
        <!-- <form @submit.prevent="addGig()">
                    <h2>Add gig</h2>
                    <input type="text" v-model="gigToAdd.title" />
                    <button>Save</button>
                </form> -->
</template>

<script>

import { showErrorMsg, showSuccessMsg } from '../services/event-bus-service'
import { getActionRemoveGig, getActionUpdateGig } from '../store/gig-store'
export default {
    name: 'seller-dashboard'
}
// gigToAdd: gigService.getEmptyGig(),
// async addGig() {
//       try {
//         await this.$store.dispatch({ type: 'addGig', gig: this.gigToAdd })
//         showSuccessMsg('Gig added')
//         this.gigToAdd = gigService.getEmptyGig()
//       } catch (err) {
//         console.log(err)
//         showErrorMsg('Cannot add gig')
//       }
//     },
//     async removeGig(gigId) {
//       try {
//         await this.$store.dispatch(getActionRemoveGig(gigId))
//         showSuccessMsg('Gig removed')

//       } catch (err) {
//         console.log(err)
//         showErrorMsg('Cannot remove gig')
//       }
//     },
//     async updateGig(gig) {
//       try {
//         gig = { ...gig }
//         gig.price = +prompt('New price?', gig.price)
//         await this.$store.dispatch(getActionUpdateGig(gig))
//         showSuccessMsg('Gig removed')

//       } catch (err) {
//         console.log(err)
//         showErrorMsg('Cannot remove gig')
//       }
//     },
//     async addGigMsg(gigId) {
//       try {
//         await this.$store.dispatch(getActionAddGigMsg(gigId))
//         showSuccessMsg("Gig msg added")
//       } catch (err) {
//         console.log(err)
//         showErrorMsg("Cannot add gig msg")
//       }
//     },
//     printGigToConsole(gig) {
//       console.log("Gig msgs:", gig.msgs)
//     },

</script>