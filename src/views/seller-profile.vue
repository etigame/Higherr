<template>
    <section class="seller-profile flex space-between full">

        <div class="profile-container">
            <div class="user-info">
                <div class="img-container">
                    <img :src="user.imgUrl" />
                </div>

                <span v-icon="'edit'"></span>
                <div class="user-stats">
                    <ul>
                        <li class="flex space-between"><span><span v-icon="'member'"></span>Member Since</span><span>Feb
                                2021</span></li>
                    </ul>
                </div>
            </div>

            <div class="description-container">
                <h3>Description</h3>
                <p>{{ user.description }}</p>
            </div>

        </div>

        <div class="gigs-status">
            <ul class=" status-filter-bar flex align-center">
                <li>Active Gigs</li>
            </ul>

            <div class="gigs-list flex">
                <gig-preview-seller @gigRemoved="removeGig" v-for="gig in gigsByUser" :gig="gig" />
                <div @click="editGig" class="add-gig  flex justify-center align-center">
                    <div class="flex column align-center">
                        <span class="add-gig-btn flex justify-center align-center">+</span>
                        <h2>Create a new Gig</h2>
                    </div>
                </div>
            </div>
        </div>


    </section>
</template>

<script>

import gigPreviewSeller from "../cmps/gig-preview-seller.vue"
import chatVue from '../cmps/chat.vue'


export default {
    name: 'seller-profile',
    props: ['loggedUser'],
    components: { gigPreviewSeller },

    components: {
        gigPreviewSeller,
        chatVue
    },
    props: ["loggedUser"],
    data() {
        return {
            isChatOpen: false
        }
    },
    async created() {
        await this.$store.dispatch({ type: 'loadGigs' })

    },
    methods: {

        removeGig(gigId) {

            this.$store.dispatch({ type: 'removeGig', gigId })

        },
        editGig() {
            this.$router.push("/gig/edit/")
        }
    },
    computed: {

        gigsByUser() {
            return this.$store.getters.gigsByUser
        },
        user() {
            return this.$store.getters.loggedinUser
        }

    }
}

</script>