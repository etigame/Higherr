<template>
    <section class="hero-container full">
      
        <div class="img-container">
        <Transition>
            <img  class="hero-img" v-if= "(this. idx===1)" :src= "`src/assets/img/hero${this.idx}.webp`" />
            <img  class="hero-img" v-else-if="(this.idx===2)" :src= "`src/assets/img/hero${this.idx}.webp`" />
            <img  class="hero-img" v-else-if="(this.idx===3)" :src= "`src/assets/img/hero${this.idx}.webp`" />
            <img  class="hero-img" v-else-if="(this.idx===4)" :src= "`src/assets/img/hero${this.idx}.webp`" />
            <img  class="hero-img" v-else-if="(this.idx===5)" :src= "`src/assets/img/hero${this.idx}.webp`" />
     </Transition>
    </div>
   
    
      
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
        setInterval(this.changeCurrImage, 7000)
         
    },
    data(){
        return {
            idx: 1,
          
        }
    },
    methods: {
        changeCurrImage(){
           this.idx= this.idx<5 ? this.idx+1 : 1
           console.log(this.idx)

         
            }
        }
    
    }
     

    



</script>