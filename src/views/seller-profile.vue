<template>
    <section class="seller-profile">

        <div class="profile-container">
            profile container
        </div>

        <div class="user-gigs">
            <ul class=" status-filter-bar flex align-center">
                <li>Active Gigs</li>
            </ul>

            <seller-gig :gig="dummyGig" />
        </div>



    </section>
</template>

<script>

import sellerGig from "../cmps/gig-preview/seller-gig.vue"


export default {
    name: 'seller-profile',
    components: { sellerGig },
    async created() {
        await this.$store.dispatch({ type: 'loadUsers' })
    },
    data() {
        return {
            user: this.$store.getters.loggedInUser
        }

    },
    computed: {
        dummyGig() {
            const gig = {
                _id: "QlGv3b", image: ['https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
                    'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg'], price: "US$16.84", title: 'I will do hyper realistic pencil portrait by hand drawing'
            }
            return gig
        }
    }
}
</script>