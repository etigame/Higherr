
<template>
    <section>
    <img  :src= "hero.imgUrl" />
    <div>
                <span v-for="n in hero.rating" v-icon="star"></span>
                <span>{{hero.name}}</span>
                <span>{{hero.profession}}r</span>       
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