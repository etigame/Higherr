<template>
    <section class="gig-preview">

         <router-link :to="`/gig/${gig._id}`">
            <h2> title: {{ gig.title }}</h2>
            </router-link>
            <router-link :to="`/gig/${gig._id}`">
            <div><img :src="gig.image"></div>
            </router-link>

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