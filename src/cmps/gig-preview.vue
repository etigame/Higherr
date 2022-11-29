<template>
    <section class="gig-preview">
        <h1>gig-preview</h1>
            <p>
                title: {{ gig.title }}
        
            </p>
            <p v-for="review in gig.reviewers">
               <p> name: {{review.name}}</p>
                <p> review: {{review.review}}</p>
        
            </p>
            <img :src="gig.image">

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