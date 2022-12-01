<template>
    <section v-if="gig" class="user-preview">

        <section v-if="(type === 'sellerShort')" class="seller-preview-short">
            <img :src="gig.imgURL" alt="seller-img" />
            <p> {{ gig.fullname }}</p>
            <p> Level 2 Seller </p>
            <div> | </div>
            <ul class="clean-list">
                <li v-for="n in sellerRate"><span v-icon="'star'"></span></li>
            </ul>

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
            sellerRate: 5
        }
    }
}
</script>