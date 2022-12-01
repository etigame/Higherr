<template>
    <section class="gig-preview">
        <router-link :to="`/gig/${gig._id}`">
            <div class="gig-img"><img :src="gig.image"></div>
        </router-link>
        <div class="seller-info-preview">
        <div class="seller-img"><img :src="gig.imgUrl"></div>
        <p>{{gig.fullname}}</p>
        </div>
            <div  class="preview-title">
         <router-link :to="`/gig/${gig._id}`" >
            <h3>{{ gig.title }}</h3>
            </router-link>
            </div>
            <div class="content-info">
                <span v-icon="'star'" class="preview-rate-icon"></span>
                <p class="rate-preview">5.0</p>
                <p class="preview-reviews" v-if="gig.reviewers">({{ gig.reviewers.length}})</p>
            </div>
        <div class="preview-footer">
            <span v-icon="'fullHeart'" class="preview-heart"></span>
            <div class="preview-price-container flex"><p>starting at </p><h3 class="preview-price">{{gig.price}}</h3></div>
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