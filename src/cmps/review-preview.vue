<template>
    <section v-if="review" class="review-preview">

        <!-- REVIEW - SNIPPET -->
        <section v-if="(type === 'reviewSnippet')" class="review-preview-snippet">
            <section class="review-snippet-temporary grid">
                <img class="reviewer-img" :src="`https://randomuser.me/api/portraits/${randomGender}/${randomNum}.jpg`"
                    alt="user-img">

                <section class="reviewer-details flex">
                    <p class="fullname">{{ review.name }}</p>
                    <section class="country-wrapper flex">
                        <img :src="review.flag" alt="reviewer-flag">
                        <p class="country">{{ review.country }}</p>
                        <ul class="stars clean-list flex">
                            <li v-for="n in review.rate"><span v-icon="'star'"
                                    class="flex justify-center align-center"></span>
                            </li>
                        </ul>
                        <p class="rating-score"> {{ review.rate }}</p>
                    </section>
                </section>

                <section class="review-content">
                    <p class="review-description">{{ review.review }}</p>
                    <p class="reviewed-at">{{ review.reviewedAt }}</p>
                </section>
            </section>
        </section>

        <!-- REVIEW - LONG -->
        <section v-if="(type === 'reviewLong')" class="review-preview-long grid">
            <img class="reviewer-img" :src="`https://randomuser.me/api/portraits/${randomGender}/${randomNum}.jpg`"
                alt="user-img">

            <section class="reviewer-details flex column">
                <p class="fullname">{{ review.name }}</p>
                <section class="country-wrapper flex">
                    <img :src="review.flag" alt="reviewer-flag">
                    <p class="country">{{ review.country }}</p>
                </section>
            </section>

            <section class="review-content">
                <section class="review-rate flex align-center">
                    <ul class="stars clean-list flex">
                        <li v-for="n in review.rate"><span v-icon="'star'"
                                class="flex justify-center align-center"></span>
                        </li>
                    </ul>
                    <p class="rating-score"> {{ review.rate }}</p>
                    <p class="reviewed-at">{{ review.reviewedAt }}</p>
                </section>
                <p class="review-description">{{ review.review }}</p>
            </section>
        </section>
    </section>
</template>
  
<script>
import { utilService } from '../services/util-service.js'

export default {
    name: 'review-preview',
    props: {
        review: Object,
        type: String
    },
    computed: {
        reviewerFirstChar() {
            return this.review.name.charAt(0).toUpperCase()
        },
        randomNum() {
            return utilService.getRandomIntInclusive(1, 99)
        },
        randomGender() {
            return Math.random() > 0.5 ? 'women' : 'men'
        }
    },
}
</script>