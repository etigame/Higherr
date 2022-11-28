<template>
    <section class="gig-list">
        <h1>gig-list</h1>
        <gig-preview @removeGig="removeGig" v-for="gig in gigs" :gig="gig" :key="gig._id" />
    </section>
</template>

<script>
export default {
    name: 'gig-list'
}
</script>