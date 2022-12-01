<template>
    <section class="hero-container full">
     
            <Transition>
      <!-- <img v-for= "(image, idx) in images"  :src= "getUrl(idx)" /> -->
        <img class="hero-img" v-if="show" :src= "getImgUrl" />
     </Transition>
  
      
      <!-- <img v-else-if="image==='moon'"  key="moon" src="src/assets/img/hero2.webp" />
      <img v-else-if="image==='rikita'"   key="rikita" src="src/assets/img/hero3.webp" />
      <img v-else-if="image==='zach'"  key="zach" src="src/assets/img/hero4.webp" />
      <img v-else-if="image==='gabrie`lle'" key="gabrielle" src="src/assets/img/hero5.webp" /> -->

    </section>
</template>

<script>
export default {
    name: 'hero',
    mounted(){
        setInterval(this.changeCurrImage, 3000)
         
    },
    data(){
        return {
            show: false,
            idx: 1,
        }
    },
    methods: {
        changeCurrImage(){
            this.show=!this.show
            if(!this.show){
          this.idx=this.idx< 5 ? this.idx+1 : 1
         
            }
        }
    },

        computed:{
            getImgUrl(){
                return `src/assets/img/hero${this.idx}.webp`
            },
        
        }
    }
     

    



</script>