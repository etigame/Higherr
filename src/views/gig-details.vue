<template>
    <section class="gig-details">
        <!-- <gig-package /> -->
        <pre>{{gig}}</pre>
    </section>
</template>

<script>
import gigPackage from '../cmps/gig-package.vue'
import {gigService} from '../services/gig-service.js'

export default {
    name: 'gig-details',
    component: {
        gigPackage
    },
    data(){
        return{
            gig:null
        }
    },
    async created() {
        try {
            const { _id } = this.$route.params
            console.log(_id);
            const gig = await gigService.getById(_id)
            console.log(gig);
            this.gig = gig
            // // const filterBy = { byToyId: toyId }
            // await this.$store.dispatch({ type: 'loadgigs' })
            // // await this.$store.dispatch({ type: 'loadgigs', filterBy })
        } catch (err) {
            console.error(err)
        }
    },
}
</script>