<template>
    <section class="hero-container full">
      
        <div class="img-container">
        <Transition>
            <img  class="hero-img" v-if="(idx===1)" :src= "getImageUrl" />
            <img  class="hero-img" v-else-if="(idx===2)" :src= "getImageUrl" />
            <img  class="hero-img" v-else-if="(idx===3)" :src= "getImageUrl" />
            <img  class="hero-img" v-else-if="(idx===4)" :src= "getImageUrl" />
            <img  class="hero-img" v-else-if="(idx===5)" :src= "getImageUrl" />
        </Transition>
    </div>
       
        <div class="search-container main-layout">
            <h1>Find the perfect freelance services for your business</h1>
            <hero-search/>
        </div>
    
    </section>
</template>



<script>

import heroSearch from "./hero-search.vue"

export default {
    name: 'hero',
    components: {heroSearch},
    mounted(){
        setInterval(this.changeCurrImage, 5000)
         
    },
    data(){
        return {
          idx: 1,          
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