<template>
    <section v-if="gig" class="gig-payment">
        <section class="payment-container flex">
            <section id="overview" class="main">
                    <section class="payment-details-container">
                        <h2>Payment Option</h2>
                        <section class="credit-selection">
                        <div class="visa">
                            <span v-icon="'visa'"></span>
                        </div>
                        </section>
                    <section class="payment-option">
                        <div class="card-info flex">
                            <div>
                            <p>Card Number</p>
                        <input class="card-num" type="text" value="4580 5926 2262 7546"/>
                        </div>
                        <div class="shorts-input">
                            <div>
                            <p>Expiration Date</p>
                        <input class="short" type="text" value="12 / 26"/>
                        </div>
                        <div>
                            <p>Security Code</p>
                        <input class="short" type="text"  value="226"/>
                        </div>
                        </div>
                        </div>
                        <div class="name-inputs flex">
                            <div>
                                <p>First Name</p>
                                <input class="name-input" type="text"/>
                                </div>
                            <div>
                                <p>Last Name</p>
                                <input class="name-input" type="text"/>
                            </div>
                        </div>
                    </section>
 
                    </section> 
            </section>
            <section class="package-container">
                <gig-package-payment :gig="gig" @addOrder="addOrder" />
            </section>

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