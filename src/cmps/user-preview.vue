<template>
    <section v-if="gig" class="user-preview">

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
            <p class="seller-reviews-count">({{ gig.reviewers.length }})</p>


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
    data() {
        return {
            sellerRate: 5,
            ratingScore: 4.9
        }
    }
}
</script>