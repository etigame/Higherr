<template>
    <section v-if="gig" class="user-preview">

        <!-- SELLER DETAILS SHORT -->
        <section v-if="(type === 'sellerShort')" class="seller-preview-short flex align-center">
            <div class="img-container">
                <img :src="gig.imgUrl" alt="seller-img" />
            </div>
            <p class="seller-fullname"> {{ gig.fullname }}</p>
            <p class="seller-level"> Level 2 Seller </p>
            <div class="line"> | </div>
            <ul class="stars clean-list flex">
                <li v-for="n in sellerRate"><span v-icon="'star'" class="flex justify-center align-center"></span></li>
            </ul>
            <p class="rate-score"> {{ ratingScore }} </p>
            <p class="seller-reviews-count" v-if="gig.reviewers">({{ gig.reviewers.length }})</p>
        </section>

        <!-- SELLER DETAILS LONG -->
        <section v-if="(type === 'sellerLong')" class="seller-preview-long flex">
            <div class="img-container">
                <img :src="gig.imgUrl" alt="seller-img" />
            </div>

            <section class="seller-details flex column">
                <section class="name-line flex">
                    <p class="seller-fullname"> {{ gig.fullname }}</p>
                    <div class="online-indicator">
                        <span v-icon="'onlineSeller'"></span>
                        Online
                    </div>
                </section>

                <p class="seller-level"> Level 2 Seller </p>
                <section class="seller-reviews-stat flex align-center">
                    <ul class="stars clean-list flex">
                        <li v-for="n in sellerRate"><span v-icon="'star'"
                                class="flex justify-center align-center"></span>
                        </li>
                    </ul>
                    <p class="rate-score"> {{ ratingScore }} </p>
                    <p class="seller-reviews-count" v-if="gig.reviewers">({{ gig.reviewers.length }})</p>
                </section>
                <button class="contact-me-btn">Contact Me</button>
            </section>
        </section>

    </section>
</template>

<script>
export default {
    name: 'user-preview',
    props: {
        type: String,
        gig: Object
    },
    // DEMO DATA - should get from the gigService
    data() {
        return {
            sellerRate: 5,
            ratingScore: 5
        }
    }
}
</script>