<template>
    <section v-if="user" class="seller-profile flex space-between main-layout full">
        <section class="content-wrapper flex full">

            <div class="profile-container">
                <div class="user-info">

                    <div class="img-container">
                        <img :src="user.imgUrl" />
                    </div>
                    <h2>{{ randomGig.owner.fullname }}</h2>


                    <div class="user-stats">
                        <ul>
                            <li class="flex space-between">
                                <div>
                                    <span v-icon="'location'"></span>Country
                                </div>
                                <span>{{ randomGig.loc }}</span>
                            </li>
                            <li class="flex space-between">
                                <div>
                                    <span v-icon="'member'"></span>Member Since
                                </div>
                                <span>{{ randomGig.memberSince }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="description-container">
                    <ul>
                        <li>
                            <h3>Description</h3>
                            <p>{{ randomGig.about }}</p>
                        </li>
                    </ul>
                </div>

                <button @click="toggleChat" class="chat-seller-btn">Messages</button>
            </div>

            <section class="chat-modal" v-if="isChatOpen">
                <chatVue :gig="randomGig" />
            </section>

            <div class="gigs-status">
                <ul class="status-filter-bar flex align-center">
                    <li>Active Gigs</li>
                </ul>

                <div class="gigs-list flex">
                    <div @click="editGig" class="add-gig  flex justify-center align-center">
                        <div class="flex column align-center">
                            <span class="add-gig-btn">+</span>
                            <p>Create a new Gig</p>
                        </div>
                    </div>
                    <gig-preview-seller @gigRemoved="removeGig" v-for="gig in gigsByUser" :gig="gig" />

                </div>
            </div>
        </section>
    </section>
</template>

<script>
import gigPreviewSeller from "../cmps/gig-preview-seller.vue"
import chatVue from '../cmps/chat.vue'

export default {
    name: 'seller-profile',
    props: ['loggedUser'],
    components: {
        gigPreviewSeller,
        chatVue
    },
    data() {
        return {
            isChatOpen: false,
            // randomGig: null
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

            this.$router.push({ name: 'gig-edit', query: { ...this.loggedUser } })
        },
        toggleChat() {
            this.isChatOpen = !this.isChatOpen
        }
    },
    computed: {
        gigsByUser() {
            return this.$store.getters.gigsByUser
        },
        randomGig() {
            return this.gigsByUser[0]
        },
        user() {

            return this.$store.getters.loggedinUser
        }
    }
}

</script>