<template>
    <section class="gig-preview-explore" v-if="gig">
            <vueper-slides fade :touchable="false" >
                <vueper-slide v-for=" image  in gig.image" :key="1" :image="image">
                </vueper-slide>
            </vueper-slides>
        <div class="seller-info-preview">
        <div class="seller-img"><img :src="gig.owner.imgUrl"></div>
        <p>{{gig.owner.fullname}}</p>
        </div>
            <div  class="preview-title">
         <router-link :to="`/gig/${gig._id}`" >
            <a>{{ gig.title }}</a>
            </router-link>
            </div>
            <div class="content-info">
                <span v-icon="'star'" class="preview-rate-icon"></span>
                <span class="rate-preview">{{gig.owner.rate}}</span>
                <span class="preview-reviews" v-if="gig.reviewers">({{ gig.reviewers.length}})</span>
            </div>
        <div class="preview-footer">
            <span v-icon="'fullHeart'" class="preview-heart"></span>
            <div class="preview-price-container flex"><p>starting at </p><span class="preview-price">{{gig.price}}</span></div>
        </div>

                            
    </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'

export default {
    name: 'gig-preview-explore',
    props:{
        gig:Object,
    },
    data(){
        return{
            slides: [
                {
                    title: 'Slide #1',
                    content: 'Slide 1 content.'
                },
                {
                    title: 'Slide #2',
                    content: 'Slide 2 content.'
                }
            ]
        }
    },
    components: {
    VueperSlides,
    VueperSlide
    },
}
</script>