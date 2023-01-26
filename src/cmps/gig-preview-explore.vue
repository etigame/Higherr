<template>
    <section class="gig-preview-explore" v-if="gig">
        <vueper-slides fade :touchable="false">
            <vueper-slide @click="goToGig(`/gig/${gig._id}`)" v-for="image in gig.images" :key="1" :image="image"
                style="cursor: pointer">
            </vueper-slide>
        </vueper-slides>

        <div class="seller-info-preview">
            <div class="seller-img"><img :src="gig.owner.imgUrl"></div>
            <div>
                <p class="bold">{{ gig.owner.username }}</p>
                <p class="level">{{ level }} Seller</p>
            </div>
        </div>

        <div class="preview-title">
            <router-link :to="`/gig/${gig._id}`">
                <a>{{ gig.title }}</a>
            </router-link>
        </div>

        <div class="content-info">
            <span v-icon="'star'" v-if="gig.owner.rate" class="preview-rate-icon"></span>
            <span v-if="gig.owner.rate" class="rate-preview">{{ gig.owner.rate }}</span>
            <span class="preview-reviews" v-if="gig.reviewers">({{ gig.reviewsCount }})</span>
        </div>

        <div class="preview-footer">
            <span v-icon="'fullHeart'" class="preview-heart" @click="isLiked = !isLiked"
                :class="{ liked: isLiked }"></span>
            <div class="preview-price-container flex">
                <p>starting at </p>
                <span class="preview-price">US${{ gig.price }}</span>
            </div>
        </div>
    </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'

export default {
    name: 'gig-preview-explore',
    props: {
        gig: Object,
    },
    data() {
        return {
            slides: [
                {
                    title: 'Slide #1',
                    content: 'Slide 1 content.'
                },
                {
                    title: 'Slide #2',
                    content: 'Slide 2 content.'
                }
            ],
            isLiked: false
        }
    },
    methods: {
        goToGig(gig) {
            this.$router.push({ path: gig })
        },
    },
    computed: {
        level() {
            const level = this.gig.owner.level ? `Level ${this.gig.owner.level}` : 'New'
            return level
        }
    },
    components: {
        VueperSlides,
        VueperSlide,
    }
}
</script>