<template>
    <section class="seller-profile flex space-between full">

        <div class="profile-container">
            <div class="img-container">
                <img src="https://randomuser.me/api/portraits/women/1.jpg"/> 
            </div>
            
            <span v-icon="'edit'"></span>
            <div class="user-stats">
                <ul>
                    <li class="flex space-between"><span><span v-icon="'location'"></span>From</span><span>Israel</span></li>
                    <li class="flex space-between"><span><span v-icon="'member'"></span>Member Since</span><span>Feb 2021</span></li>
                </ul>
            </div>
        </div>

        <div class="gigs-status">
            <ul class=" status-filter-bar flex align-center">
                <li>Active Gigs</li>
            </ul>

            <div class="gigs-list flex">
                <gig-preview-seller :gig="dummyGig" />
                <div @click="editGig" class="add-gig  flex justify-center align-center">
                    <div class= "flex column align-center">
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


export default {
    name: 'seller-profile',
    components: { gigPreviewSeller }, 

   async created(){
        await this.$store.dispatch({ type: 'loadGigs' })
        
    },
    methods:{
        editGig(){
            this.$router.push({ name: 'gig-edit'})
        }
    },
    computed: {
        dummyGig() {
            const gig = {
                _id: "QlGv3b", image: ['https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
                    'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg'], price: "$16.84", title: 'I will do hyper realistic pencil portrait by hand drawing'
            }
            return gig
        }, 
        gigsByUser(){
            return this.$store.getters.gigsByUser
        } 
    
    }
    }

</script>