<template>
<section class="gig-preview-seller">
    <div class="img-container">
    <img :src="gig.image[0]" />
</div>
    <div  class="preview-title">
        <router-link :to="`/gig/${gig._id}`" >
        <a>{{ gig.title}}</a>
        </router-link>
    </div>
    <div class="preview-footer">
        <span v-icon="'dots'"></span>
        <div class="preview-price-container flex"><p>starting at </p><span class="preview-price">{{gig.price}}</span></div>
    </div>             
</section>
</template>

<script>
export default {
    props:{
        gig:Object
    },
}

</script>