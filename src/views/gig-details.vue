<template>
    <section v-if="gig" class="gig-details">
        <section class="details-nav">
            <ul class="clean-list">
                <li>Overview</li>
                <li>About the seller</li>
                <li>Reviews</li>
            </ul>
        </section>

        <section class="main">
            <p>{{ gig.title }}</p>
            <user-preview />
            <section class="slideshow">
                <img :src="gig.image" alt="gig-image">
            </section>
            <section class="gallery-thumbnails">
                <h1>gallery-thumbnails</h1>
            </section>

            <section class="gig-reviews-snippet">
                <h1>What people loved about this seller</h1>
                <h1>gig-reviews-snippet</h1>
            </section>

            <section class="gig-desc">
                <h1>About This Gig</h1>
                <p>{{ gig.description }}</p>
            </section>

            <section class="seller-profile">
                <h1>About The Seller</h1>
                <user-preview />
                <section class="seller-stat">
                    <ul class="clean-list">
                        <li>From {{ gig.loc }}</li>
                        <li>Member since {{ gig.memberSince }}</li>
                        <li>Avg. response time {{ gig.avgResponseTime }}</li>
                        <li>Last delivery {{ gig.lastDelivery }}</li>
                    </ul>
                </section>
                <section class="seller-desc">
                    <p>{{ gig.about }}</p>
                </section>
            </section>

            <section class="reviews">
                <h1>{{ gig.reviewers.length }} Reviews </h1>
                <review-list />
            </section>

        </section>

        <!-- <pre>{{ gig }}</pre> -->
        <gig-package :gig="gig" />
    </section>
</template>

<script>
import { gigService } from '../services/gig-service.js'
import gigPackage from '../cmps/gig-package.vue'
import userPreview from '../cmps/user-preview.vue'
import reviewList from '../cmps/review-list.vue'

export default {
    name: 'gig-details',
    components: {
        gigPackage,
        userPreview,
        reviewList
    },
    data() {
        return {
            gig: null
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
    },
}
</script>