<template>
    <section v-if="gig && seller" class="gig-details main-layout full">
        <section class="details-nav main-layout full">
            <ul class="details-nav-list clean-list flex align-center">
                <li v-for="({ to, title }, idx) in links" :key="to" @click="(selected = idx)"
                    :class="{ selected: selected === idx }">
                    <router-link :to="`#${to}`"> {{ title }}</router-link>
                </li>
            </ul>
        </section>
        <section class="details-container flex">
            <section id="overview" class="main">
                <p class="title">{{ gig.title }}</p>
                <user-preview :type="'sellerShort'" :gig="gig" />
                <section class="gig-gallery">
                    <section class="slideshow">
                        <vueper-slides ref="vueperslides1" :touchable="false" :autoplay="false" :bullets="false"
                            @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
                            :slide-ratio="(48 / 67)">
                            <vueper-slide v-for="image in gig.images" :key="1" :image="image" style="cursor: pointer">
                            </vueper-slide>
                        </vueper-slides>
                        <div class="thumbnails-slider">
                            <vueper-slides class="no-shadow thumbnails" ref="vueperslides2"
                                @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
                                :visible-slides="gig.images.length" :fixed-height="'90px'" :bullets="false"
                                :touchable="false" :gap="1" :arrows="false" :breakpoints="breakpoints">
                                <vueper-slide v-for="(image, i) in gig.images" :slide-ratio="(48 / 67)" :key="i"
                                    :image="image" style="cursor:pointer"
                                    @click.native="$refs.vueperslides2.goToSlide(i)">
                                </vueper-slide>
                            </vueper-slides>
                        </div>
                    </section>
                </section>
                <section class="package-container-narrow">
                    <gig-package :gig="gig" />
                </section>
                <section class="gig-reviews-snippet" v-if="gig.reviewers">
                    <section class="header flex align-center space-between">
                        <h2>What people loved about this seller</h2>
                        <router-link to="#reviews">
                            <p>See all reviews</p>
                        </router-link>
                    </section>
                    <section class="review-list-container">
                        <review-list :type="'reviewSnippet'" :reviews="gig.reviewers" />
                    </section>
                </section>
                <section class="gig-desc">
                    <h2>About This Gig</h2>
                    <p>{{ gig.description }}</p>
                </section>
                <section id="aboutSeller" class="seller-preview">
                    <h2>About The Seller</h2>
                    <user-preview :type="'sellerLong'" :gig="gig" />
                    <section class="seller-details-container">
                        <section class="seller-stat">
                            <ul class="grid clean-list user-info">
                                <li class="flex column" v-for="{ key, value } in sellerStats" :key="key">
                                    <span class="key">{{ key }}</span>
                                    <span class="value">{{ value }}</span>
                                </li>
                            </ul>
                        </section>
                        <section class="seller-desc">
                            <p>{{ seller.description }}</p>
                        </section>
                    </section>
                </section>
                <section id="reviews" class="reviews-container" v-if="gig.reviewers">
                    <reviews-stat :gig="gig" />
                    <review-list :type="'reviewLong'" :reviews="gig.reviewers" />
                </section>
            </section>
            <section class="package-container">
                <gig-package :gig="gig" />
            </section>
        </section>
    </section>

    <skeleton v-else />
</template>

<script>
import gigPackage from '../cmps/gig-package.vue'
import userPreview from '../cmps/user-preview.vue'
import reviewList from '../cmps/review-list.vue'
import reviewsStat from '../cmps/reviews-stat.vue'
import skeleton from './skeleton.vue'
import { VueperSlides, VueperSlide } from 'vueperslides'
import { socketService, SOCKET_EMIT_USER_WATCH } from '../services/socket-service'
import { store } from '../store/store'

export default {
    name: 'gig-details',
    components: {
        gigPackage,
        userPreview,
        reviewList,
        reviewsStat,
        skeleton,
        VueperSlides,
        VueperSlide
    },
    data() {
        return {
            gig: null,
            seller: null,
            selected: 0,
            links: [
                { to: 'overview', title: 'Overview' },
                { to: 'aboutSeller', title: 'About the seller' },
                { to: 'reviews', title: 'Reviews' },
            ],
            breakpoints: {
                1150: {
                    fixedHeight: "80px"
                },
                850: {
                    fixedHeight: "70px"
                },
                700: {
                    fixedHeight: "80px"
                },
                550: {
                    fixedHeight: "60px"
                },
                420: {
                    fixedHeight: "50px"
                },
            },
        }
    },
    async created() {
        const { _id } = this.$route.params
        await this.$store.dispatch({ type: "loadGig", gigId: _id })
        this.gig = this.$store.getters.selectedGig
        await this.$store.dispatch({ type: "loadUser", userId: this.gig.owner._id })
        this.seller = this.$store.getters.user

        if (this.loggedInUser._id !== this.gig.owner._id) socketService.emit(SOCKET_EMIT_USER_WATCH, this.gig.owner)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    computed: {
        sellerStats() {
            return [
                { key: 'From', value: this.seller.location },
                { key: 'Member since', value: this.seller.memberSince },
                { key: 'Avg. response time', value: this.seller.avgResponseTime + `${this.seller.avgResponseTime > 1 ? ' hours' : ' hour'}` },
                { key: 'Last delivery', value: `${this.seller.lastDelivery ? this.seller.lastDelivery : "---"}` },
            ]
        },
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
    },
}
</script>