<template>
    <section v-if="reviews" class="reviews-stat flex column">
        <section class="stat-header flex align-center">
            <h2>{{ reviews.length }} Reviews </h2>
            <section class="reviews-rate flex">
                <ul class="stars clean-list flex">
                    <li v-for="n in reviewsAvg"><span v-icon="'star'" class="flex justify-center align-center"></span>
                    </li>
                </ul>
                <p class="rating-score"> {{ reviewsAvg }}</p>
            </section>
        </section>

        <section class="stat-main flex">
            <section class="stars-counters">
                <ul class="clean-list flex column">
                    <li class="flex align-center" v-for="{ key, reviewsAvg } in starsCounters" :key="key">
                        <span class="key">{{ key }}</span>
                        <section class="progress-container flex align-center">
                            <progress :value="`${reviewsAvg}`" :max="`${reviews.length}`" />
                            <span class="star-num">({{ reviewsAvg }})</span>
                        </section>
                    </li>
                </ul>
            </section>

            <section class="ranking flex column">
                <h6>Rating Breakdown</h6>
                <ul class="clean-list flex column">
                    <li class="flex align-center space-between" v-for="{ key, value } in ranking" :key="key">
                        <span class="key">{{ key }}</span>
                        <section class="star-container flex align-center">
                            <span v-icon="'star'"></span>
                            <span class="value">{{ value }}</span>
                        </section>
                    </li>
                </ul>
            </section>
        </section>
    </section>
</template>

<script>
export default {
    name: 'reviews-stat',
    props: {
        reviews: Array // gig.reviewers
    },
    data() {
        return {
            reviewsAvg: 5,
        }
    },
    computed: {
        ranking() {
            return [
                { key: 'Seller communication level', value: this.reviewsAvg },
                { key: 'Recommend to a friend', value: this.reviewsAvg },
                { key: 'Service as described', value: this.reviewsAvg },
            ]
        },
        starsCounters() {
            return [
                { key: '5 Stars', reviewsAvg: this.reviewsAvg },
                { key: '4 Stars', reviewsAvg: 0 },
                { key: '3 Stars', reviewsAvg: 0 },
                { key: '2 Stars', reviewsAvg: 0 },
                { key: '1 Star', reviewsAvg: 0 },
            ]
        }
    }
}
</script>
