<template>
    <section v-if="gig" class="gig-details">
        <section class="details-nav">
            <ul class="details-nav-list clean-list flex">
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
                <p>Graphics & Design > Logo Design</p>
                <p class="title">{{ gig.title }}</p>
                <user-preview :type="'sellerShort'" :gig="gig" />
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

                <section id="aboutSeller" class="seller-profile">
                    <h1>About The Seller</h1>
                    <user-preview />
                    <section class="seller-stat">
                        <ul class="clean-list">
                            <li v-for="{ key, value } in sellerStats" :key="key">
                                {{ key }} {{ value }}
                            </li>
                        </ul>
                    </section>
                    <section class="seller-desc">
                        <p>{{ gig.about }}</p>
                    </section>
                </section>

                <section id="reviews" class="reviews">
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