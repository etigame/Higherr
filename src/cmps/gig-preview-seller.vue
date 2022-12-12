<template>
    <section class="gig-preview-seller">

        <div class="gig-info flex column space-between" v-if="!modalOpen">
            <div class="img-container">
                <img ref="img" :src="gig.image[0]"
                    onerror="this.onerror=null;this.src='https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670794425/gigs/twojxakjb7tdlrbinkdq.jpg';" />

            </div>
            <div class="preview-title">
                <router-link :to="`/gig/${gig._id}`">
                    <a>{{ gig.title }}</a>
                </router-link>
            </div>
            <div class="preview-footer">
                <span @click="toggleGigModal" v-icon="'dots'"></span>

                <div class="preview-price-container flex">
                    <p>starting at </p><span class="preview-price">${{ gig.price }}</span>
                </div>
            </div>
        </div>

        <div v-else class="user-modal flex column" v-clickOutside="toggleGigModal">
            <router-link :to="`/gig/edit/${gig._id}`"><button>Edit</button></router-link>
            <button @click="removeGig">Remove</button>
            <router-link :to="`/gig/${gig._id}`"><button>Preview</button></router-link>
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
        },

    },
    computed: {
        getInvalidImg() {
            this.$refs.img.src = "/src/assets/img/image-unavailable.jpg"
        }
    }

}


</script>