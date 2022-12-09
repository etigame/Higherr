<template>
    <section v-if="gig.reviewers" class="reviews-stat flex column">
        <section class="stat-header flex align-center">
            <h2>{{ gig.reviewsCount }} Reviews </h2>
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
                    <li class="flex align-center" v-for="{ key, reviewsCount } in starsCounters" :key="key">
                        <span class="key">{{ key }}</span>
                        <section class="progress-container flex align-center">
                            <progress :value="`${reviewsCount}`" :max="`${gig.reviewsCount}`" />
                            <span class="star-num">({{ reviewsCount }})</span>
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
        gig: Object // gig.reviewers
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
                { key: '5 Stars', reviewsCount: Math.ceil(this.gig.reviewsCount * 0.9) },
                { key: '4 Stars', reviewsCount: Math.ceil(this.gig.reviewsCount * 0.08) },
                { key: '3 Stars', reviewsCount: Math.ceil(this.gig.reviewsCount * 0.015) },
                { key: '2 Stars', reviewsCount: Math.ceil(this.gig.reviewsCount * 0.003) },
                { key: '1 Star', reviewsCount: Math.ceil(this.gig.reviewsCount * 0.002) },
            ]
        }
    }
}
</script>
