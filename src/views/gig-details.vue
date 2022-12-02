<template>
    <section v-if="gig" class="gig-details">
        <section class="details-nav">
            <ul class="details-nav-list clean-list flex align-center">
                <!-- //TODO: try implement with exact-active -->
                <!-- //TODO: fix bug in URL with hash -->
                <li v-for="({ to, title }, idx) in links" :key="to" @click="(selected = idx)"
                    :class="{ selected: selected === idx }">
                    <router-link :to="`#${to}`"> {{ title }}</router-link>
                </li>

                <!-- <li @click="selected = 1" :class="{ selected: selected == 1 }">
                    <router-link to="#overview">Overview</router-link>
                </li>
                <li @click="selected = 2" :class="{ selected: selected == 2 }">
                    <router-link to="#aboutSeller">About the seller</router-link>
                </li>
                <li @click="selected = 3" :class="{ selected: selected == 3 }">
                    <router-link to="#reviews">Reviews</router-link>
                </li> -->
            </ul>
        </section>

        <section class="details-container flex">
            <section id="overview" class="main">
                <p class="bread-crumbs">
                    Graphics & Design
                    <span v-icon="'breadCrumbsArrow'"></span>
                    Logo Design
                </p>
                <p class="title">{{ gig.title }}</p>
                <user-preview :type="'sellerShort'" :gig="gig" />
                <section class="gig-gallery">
                    <section class="slideshow">
                        <img :src="gig.image" alt="gig-image">
                    </section>
                    <section class="gallery-thumbnails">
                        <h1>gallery-thumbnails</h1>
                    </section>
                </section>

                <section class="gig-reviews-snippet">
                    <section class="header flex align-center space-between">
                        <h2>What people loved about this seller</h2>
                        <p>See all reviews</p>
                    </section>
                    <section class="review-list-container">
                        <review-list :type="'reviewSnippet'" :reviews="gig.reviewers" />
                    </section>
                </section>

                <section class="gig-desc">
                    <h2>About This Gig</h2>
                    <p>{{ gig.description }}</p>
                </section>

                <section id="aboutSeller" class="seller-profile">
                    <h2>About The Seller</h2>
                    <user-preview :type="'sellerLong'" :gig="gig" />

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

                <section id="reviews" class="reviews-container" v-if="gig.reviewers">
                    <h2>{{ gig.reviewers.length }} Reviews </h2>
                    <section class="reviews-stat">
                        <h1>reviews-stat</h1>
                    </section>
                    <review-list :type="'reviewLong'" :reviews="gig.reviewers" />
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
    },
    computed: {
        sellerStats() {
            return [
                { key: 'From', value: this.gig.loc },
                { key: 'Member since', value: this.gig.memberSince },
                { key: 'Avg. response time', value: this.gig.avgResponseTime },
                { key: 'Last delivery', value: this.gig.lastDelivery },
            ]
        }
    }
}
</script>