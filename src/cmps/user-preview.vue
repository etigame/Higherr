<template>
    <section v-if="gig" class="user-preview">

        <!-- SELLER DETAILS SHORT -->
        <section v-if="(type === 'sellerShort')" class="seller-preview-short flex align-center">

            <div class="img-container">
                <img :src="gig.owner.imgUrl" alt="seller-img" />
            </div>
            <div class="text-container">
                <div class="text">
                    <router-link to="#aboutSeller">
                        <p class="seller-fullname"> {{ gig.owner.fullname }}</p>
                    </router-link>
                    <p class="seller-level"> Level {{ gig.owner.level }} Seller </p>
                    <div class="line"> | </div>
                </div>
                <div class="rate">
                    <ul class="stars clean-list flex">
                        <li v-for="n in sellerRate"><span v-icon="'star'"
                                class="flex justify-center align-center"></span></li>
                    </ul>
                    <p class="rate-score"> {{ gig.owner.rate }} </p>
                    <p class="seller-reviews-count" v-if="gig.reviewers">({{ gig.reviewsCount }})</p>
                </div>
            </div>
        </section>

        <!-- SELLER DETAILS LONG -->
        <section v-if="(type === 'sellerLong')" class="seller-preview-long flex">
            <div class="img-container">
                <img :src="gig.owner.imgUrl" alt="seller-img" />
            </div>

            <section class="seller-details flex column">
                <section class="name-line flex">
                    <p class="seller-fullname"> {{ gig.owner.fullname }}</p>
                    <div class="online-indicator">
                        <span v-icon="'onlineSeller'"></span>
                        <p>Online</p>
                    </div>
                </section>

                <p class="seller-level"> Level {{ gig.owner.level }} Seller </p>
                <section class="seller-reviews-stat flex align-center">
                    <ul class="stars clean-list flex">
                        <li v-for="n in sellerRate"><span v-icon="'star'"
                                class="flex justify-center align-center"></span>
                        </li>
                    </ul>
                    <p class="rate-score"> {{ gig.owner.rate }} </p>
                    <p class="seller-reviews-count" v-if="gig.reviewers">({{ gig.reviewsCount }})</p>
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
        }
    }
}
</script>