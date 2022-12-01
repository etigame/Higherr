<template>

    <section class="categories-list main-layout full">
        
        <section v-if="(type==='tag')" class="type-tag flex space-between " >
            <h3 v-for="category in categories">{{category.name}}</h3>
        </section>
     
    
        <section v-if="(type==='card')" class="type-card ">
            <h1>Popular Professional Services</h1>
            <div class="cards flex space-between">
            <div class="card" v-for="tag in tags" >
                <h2>{{tag.subTxt}}  <h3>{{tag.txt}}</h3></h2>
                <img :src="tag.imageUrl"/>
            </div>
        </div>
        </section>

        <section v-if="(type==='svg')" class="type-svg" >
            <span v-for="category in categories">
                <span  v-icon="category.svg"></span>
                <h4>{{category.name}}</h4>
            </span>
        </section>


       
    </section>
</template>

<script>

import categoriesService from "../services/categories-service.js"

export default {
    name: 'categories-list',
   
 props: {
        type: {
            type: String,
            required: true,
            
    },
},
    data(){
        return{
            categories: categoriesService.categories,
            tags: categoriesService.tags
        }
     
    },
    computed: {
       getImage(item){
        return {
            backgroundImage: url(item.imageUrl)
       } 
    }
}
}
</script>