<template>
    <section class="gig-preview">
        <router-link :to="`/gig/${gig._id}`">
            <div class="gig-img"><img :src="gig.image"></div>
        </router-link>
        <div class="seller-info-preview">
        <div class="seller-img"><img :src="gig.imgUrl"></div>
        <p>{{gig.fullname}}</p>
        </div>
         <router-link :to="`/gig/${gig._id}`">
            <h2>{{ gig.title }}</h2>
            </router-link>
            <div class="content-info">
                
            </div>
        <div class="preview-footer">
            <span v-icon="'fullHeart'" class="preview-heart"></span>
            <p>starting at {{gig.price}}</p>
        </div>

            

                            <!-- <button @click="removeGig(gig._id)">x</button> -->
                            <!-- <button @click="updateGig(gig)">Update</button> -->
                            <!-- <hr /> -->
                            <!-- <button @click="addGigMsg(gig._id)">Add gig msg</button> -->
                            <!-- <button @click="printGigToConsole(gig)">Print msgs to console</button> -->
                            <!-- </li> -->
                            
    </section>
</template>

<script>
export default {
    name: 'gig-preview',
    props:{
        gig:Object,
    }
}
</script>