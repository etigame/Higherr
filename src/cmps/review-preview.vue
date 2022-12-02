<template>
    <section v-if="review" class="review-preview">

        <!-- REVIEW - SNIPPET -->
        <section v-if="(type === 'reviewSnippet')" class="review-preview-snippet">
            <!-- <p>{{ review.name }}</p>
            <img :src="review.flag" alt="reviewer-flag">
            <p>{{ review.country }}</p>
            <p>{{ review.reviewedAt }}</p>
            <p>{{ review.review }}</p> -->
        </section>

        <!-- REVIEW - LONG -->
        <section v-if="(type === 'reviewLong')" class="review-preview-long grid">
            <div class="reviewer-first-char"> <span>{{ reviewerFirstChar }}</span></div>
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
                        <li v-for="n in rateByReviewer"><span v-icon="'star'"
                                class="flex justify-center align-center"></span>
                        </li>
                    </ul>
                    <p class="rating-score"> {{ rateByReviewer }}</p>
                    <p class="reviewed-at">{{ review.reviewedAt }}</p>
                </section>
                <p class="review-description">{{ review.review }}</p>
            </section>
        </section>

    </section>
</template>
  
<script>
export default {
    name: 'review-preview',
    props: {
        review: Object,
        type: String
    },
    data() {
        return {
            rateByReviewer: 5,
        }
    },
    computed: {
        reviewerFirstChar() {
            return this.review.name.charAt(0).toUpperCase()
        }
    }
}
</script>