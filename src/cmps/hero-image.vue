
<template>
    <section class="hero-image">
        <img  :src= "hero.imgUrl" />
        <div class="info-container">
            <!-- <span v-for="n in hero.rating" v-icon="star"></span> -->
            <span>{{hero.name}}</span>
            <span>{{hero.profession}}</span>       
        </div>

</section>
</template>

<script>


export default {
    props: {
        hero: {
            type: Object,
            required: true     
        },
    }
}

</script>