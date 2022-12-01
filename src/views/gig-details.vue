<template>
    <section v-if="gig" class="gig-details">
        <section class="details-nav">
            <ul class="details-nav-list clean-list flex">
                <li @click="selected = 1" :class="{ selected: selected == 1 }">
                    <!-- < a href =" #overview">Overview</> -->
                    Overview
                </li>
                <li @click="selected = 2" :class="{ selected: selected == 2 }">
                    <!-- <a href="#about-seller">About the seller</a> -->
                    About the seller
                </li>
                <li @click="selected = 3" :class="{ selected: selected == 3 }">Reviews</li>
            </ul>
        </section>

        <section class="details-container flex">
            <section id="overview" class="main">
                <p>Graphics & Design > Logo Design</p>
                <p class="title">{{ gig.title }}</p>
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

                <section id="about-seller" class="seller-profile">
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
                    <section class="reviews-stat">
                        <h1>reviews-stat</h1>
                    </section>
                    <review-list :reviews="gig.reviewers" />
                </section>

            </section>

            <section class="package-container">
                <gig-package :gig="gig" />
            </section>

        </section>
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
            gig: null,
            selected: null
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