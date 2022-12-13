<template>
    <section class="gig-preview-explore" v-if="gig">

        <vueper-slides fade :touchable="false">
            <vueper-slide @click="goToGig(`/gig/${gig._id}`)" v-for=" image  in gig.image" :key="1" :image="image"
                style="cursor: pointer">
            </vueper-slide>
        </vueper-slides>

        <div class="seller-info-preview">
            <div class="seller-img"><img :src="gig.owner.imgUrl"></div>
            <div>
                <p class="bold">{{ gig.owner.fullname }}</p>
                <p class="level">Level {{ gig.owner.level }} seller</p>
            </div>
        </div>
        <div class="preview-title">
            <router-link :to="`/gig/${gig._id}`">
                <a>{{ gig.title }}</a>
            </router-link>
        </div>
        <div class="content-info">
            <span v-icon="'star'" class="preview-rate-icon"></span>
            <span class="rate-preview">{{ gig.owner.rate }}</span>
            <span class="preview-reviews" v-if="gig.reviewers">({{ gig.reviewsCount }})</span>
        </div>
        <div class="preview-footer">
            <span v-icon="'fullHeart'" class="preview-heart"></span>
            <div class="preview-price-container flex">
                <p>starting at </p><span class="preview-price">US${{ gig.price }}</span>
            </div>
        </div>


    </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import { utilService } from '../services/util-service'

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
            ]
        }
    },
    methods: {
        goToGig(gig) {
            console.log(this.gig)
            this.$router.push({ path: gig })
        },
    },
    components: {
        VueperSlides,
        VueperSlide,
    },
}
</script>