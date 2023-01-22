<template>
    <section v-if="gig" class="gig-payment">
        <section class="payment-container flex">
            <section class="payment-details-container">
                <h2>Payment Option</h2>
                <section class="credit-selection flex">
                    <div class="credit-txt">
                        <p>Credit & Debit Cards</p>
                    </div>
                    <div class="visa">
                        <span v-icon="'visa'"></span>
                    </div>
                </section>
                <section class="payment-option">
                    <div class="card-info flex">
                        <div class="card-num-container">
                            <p>Card Number</p>
                            <input class="card-num" type="text" value="4580 5926 2262 7546" />
                        </div>
                        <div class="shorts-input">
                            <div>
                                <p>Expiration Date</p>
                                <input class="short" type="text" value="12 / 26" />
                            </div>
                            <div>
                                <p>Security Code</p>
                                <input class="short" type="text" value="226" />
                            </div>
                        </div>
                    </div>
                    <div class="name-inputs flex">
                        <div>
                            <p>First Name</p>
                            <input class="name-input" type="text" />
                        </div>
                        <div>
                            <p>Last Name</p>
                            <input class="name-input" type="text" />
                        </div>
                    </div>
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
import gigPackagePayment from '../cmps/gig-package-payment.vue'

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

        } catch (err) {
            console.error(err)
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
    },
    methods: {
        addOrder() {
            if (!this.loggedInUser) return
            const order =
            {
                "buyer": '',
                "seller": this.gig.owner,
                "gig": {
                    "_id": this.gig._id,
                    "name": this.gig.title,
                    "price": this.gig.price,
                    "img": this.gig.images[0]
                },
                "status": "Pending",
            }
            this.$store.dispatch({ type: 'saveOrder', order: { ...order } })
        },
    }
}
</script>