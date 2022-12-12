<template>
    <section v-if="user" class="seller-profile flex space-between main-layout full">
        <section class="content-wrapper flex space-between">

            <div class="profile-container">
                <div class="user-info">

                    <div class="img-container">
                        <img :src="user.imgUrl" />
                    </div>
                    <h2>{{ user.fullname }}</h2>


                    <div class="user-stats">
                        <ul>
                            <li v-if="user.location" class="flex space-between">
                                <div>
                                    <span v-icon="'location'"></span>Country
                                </div>
                                <span>{{ user.location }}</span>
                            </li>
                            <li class="flex space-between">
                                <div>
                                    <span v-icon="'member'"></span>Member Since
                                </div>
                                <span>{{ user.memberSince }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div v-if="user.description" class="description-container">
                    <ul>
                        <li>
                            <h3>Description</h3>
                            <p>{{ user.description }}</p>
                        </li>
                    </ul>
                </div>

                <button v-if="user.country" @click="toggleChat" class="chat-seller-btn">Messages</button>
            </div>

            <!-- <section class="chat-modal" v-if="gigsByUser">
                <chatVue :gig="randomGig" />
            </section> -->

            <div class="gigs-status">
                <ul class="status-filter-bar flex align-center">
                    <li>Active Gigs</li>
                </ul>

                <div v-if="user.location" class="gigs-list flex">
                    <div @click="editGig" class="add-gig  flex justify-center align-center">
                        <div class="flex column align-center">
                            <span class="add-gig-btn">+</span>
                            <p>Create a new Gig</p>
                        </div>
                    </div>
                    <gig-preview-seller @gigRemoved="removeGig" v-for="gig in gigsByUser" :gig="gig" />
                </div>
                <div v-else>
                    <h1><a>Become a seller</a> and create your first gig!</h1>
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
            user: null,
            isChatOpen: false,
        }
    },
    async created() {

        await this.$store.dispatch({ type: 'loadUsers' })
        await this.$store.dispatch({ type: 'loadGigs' })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.user = this.$store.getters.userById



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
    }
}

</script>