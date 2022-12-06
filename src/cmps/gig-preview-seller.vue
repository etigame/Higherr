<template>
    <section class="gig-preview-seller">

        <div class="gig-info" v-if="!modalOpen">
            <div class="img-container">
                <img :src="gig.image[0]" />
            </div>
            <div class="preview-title">
                <router-link :to="`/gig/${gig._id}`">
                    <a>{{ gig.title }}</a>
                </router-link>
            </div>
            <div class="preview-footer">
                <span @click="toggleGigModal" v-icon="'dots'"></span>

                <div class="preview-price-container flex">
                    <p>starting at </p><span class="preview-price">{{ gig.price }}</span>
                </div>
            </div>
        </div>

        <div v-else class="user-modal flex column" v-clickOutside="toggleGigModal">
            <router-link :to="`/gig/edit/${gig._id}`"><button class="el-button is-text">Edit</button></router-link>
            <button class="el-button is-text" @click="removeGig">Remove</button>
            <router-link to="/seller/orders"><button class="el-button is-text">Preview</button></router-link>
        </div>

    </section>
</template>

<script>
export default {
    props: {
        gig: Object
    },
    data() {
        return {
            modalOpen: false
        }
    },
    methods: {
        toggleGigModal() {
            this.modalOpen = !this.modalOpen
        },
        removeGig() {
            this.toggleGigModal()
            this.$emit('gigRemoved', this.gig._id)
        }

    }
}

</script>