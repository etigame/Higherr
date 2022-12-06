<template>
    <section v-if="gig" class="gig-details">
        <section class="details-container flex">
            <section id="overview" class="main">
                <p class="bread-crumbs">
                    Graphics & Design
                    <span v-icon="'breadCrumbsArrow'"></span>
                    Logo Design
                </p>

                    <section class="seller-details-container">
                        <section class="seller-stat">
                            <ul class="grid clean-list">
                                <li class="flex column" v-for="{ key, value } in sellerStats" :key="key">
                                    <span class="key">{{ key }}</span>
                                    <span class="value">{{ value }}</span>
                                </li>
                            </ul>
                        </section>

                        <section class="seller-desc">
                            <p>{{ gig.about }}</p>
                        </section>
                    </section> 
                


            </section>

            <section class="package-container">
                <gig-package-payment :gig="gig" @addOrder="addOrder" />
            </section>
            <!-- <chat-seller :gig="gig" /> -->
        </section>
    </section>
</template>

<script>
import { gigService } from '../services/gig-service.js'
import { utilService } from '../services/util-service.js'
import gigPackagePayment from '../cmps/gig-package-payment.vue'

// import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_USER_WATCH } from '../services/socket-service'

export default {
    name: 'gig-details',
    components: {
        gigPackagePayment,


    },
    data() {
        return {
            gig: null,
            selected: null,
            links: [
                { to: 'overview', title: 'Overview' },
                { to: 'aboutSeller', title: 'About the seller' },
                { to: 'reviews', title: 'Reviews' },
            ]
        }
    },
    async created() {
        try {
            const { _id } = this.$route.params
            const gig = await gigService.getById(_id)
            this.gig = gig

            // socketService.setup()
            // socketService.emit(SOCKET_EMIT_USER_WATCH, this.gig._id)
        } catch (err) {
            console.error(err)
        }
    },
    unmounted() {
        // socketService.terminate()
    },
    computed: {
        sellerStats() {
            return [
                { key: 'From', value: this.gig.loc },
                { key: 'Member since', value: this.gig.memberSince },
                { key: 'Avg. response time', value: this.gig.avgResponseTime },
                { key: 'Last delivery', value: this.gig.lastDelivery },
            ]
        },
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },

    },
    methods: {
        addOrder() {
            const order =
            {
                "buyer": '',
                "seller": this.gig.owner,
                "gig": {
                    "_id": this.gig._id,
                    "name": this.gig.title,
                    "price": this.gig.price,
                    "img":this.gig.image[0]
                },
                "status": "Pending",
                createdAt: new Date()
            }

            this.$store.dispatch({ type: 'saveOrder', order: { ...order } })
            console.log(order)
        },
    }

}
</script>