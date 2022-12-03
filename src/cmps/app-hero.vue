<template>
    <section class="hero-container main-layout full ">
        <div class="img-container full ">
        <Transition>
            <img v-if="(idx===1)" :src="getImageUrl" >
            <img v-else-if="(idx===2)" :src="getImageUrl" >
            <img v-else-if="(idx===3)" :src="getImageUrl" >
            <img v-else-if="(idx===4)" :src="getImageUrl" >
            <img v-else-if="(idx===5)" :src="getImageUrl" >   
        </Transition>
        </div>
        <div class="search-container full">
                <h1>Find the perfect <span>freelance</span> services for your business</h1>
                <hero-search/>
                <div class="categories flex">
                    Popular: 
                    <a href="" class="tag" v-for="tag in tags">{{tag}}</a>
                </div>    
        </div>
    </section>
</template>



<script>

import heroSearch from "./hero-search.vue"
import heroImage from "./hero-image.vue"
import categoriesService from "../services/categories-service.js"
import  heroService from "../services/hero-service.js"



export default {
    name: 'hero',
    components: { heroSearch, heroImage},
    mounted(){
        setInterval(this.changeCurrImage, 5000)
         
    },
    data(){
        return {
          idx: 1,  
          tags: categoriesService.popular,
          heroes: heroService.heroes
          
        }
    },
    methods: {
        changeCurrImage(){
           this.idx= this.idx<5 ? this.idx+1 : 1
        
            }
        },
        computed: {
            getImageUrl(){
               return  `src/assets/img/hero${this.idx}.webp`
            }
        }  
    }
     


</script>



