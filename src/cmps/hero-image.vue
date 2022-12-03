
<template>
    <section class="hero-image">
            <img  :src= "hero.imgUrl" />
            <div class="hero-info">
                <span v-for="n in (hero.rating)" >⭐</span>
                <span>{{hero.name}}, </span>
                <span>{{hero.profession}}</span>
            </div>
            
</section>
</template>

<script>

import heroSearch from "./hero-search.vue"


export default {
    props: {
        hero: {
            type: Object,
            required: true     
        },
    },
}

</script>