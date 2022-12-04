<template>

    <section class="categories-list main-layout full">
        
        <section  v-if="(type==='tag')"  class="type-tag  main-layout full" >
            <div class="flex space-between ">
            <router-link v-for="category in categories" @click="categoryFilter(`${category.name}`)" to="/explore" >{{category.name}}</router-link>
            <!-- <a @click="categoryFilter(`${category.name}`)" href="" v-for="category in categories" >{{category.name}}</a> -->
        </div>
        </section>
     
    
        <section v-if="(type==='card')" class="type-card ">
            <div class="main-layout full">
            <h1>Popular Professional Services</h1>
            <div class="cards flex space-between ">
            <div class="card" v-for="tag in tags" >
                <h2><small>{{tag.subTxt}}</small>{{tag.txt}}</h2>
                <div @click="tagFilter(`${tag.txt}`)">
                <img :src="tag.imageUrl"/>
                </div>
            </div>
        </div>
    </div>
        </section>

        <section v-if="(type==='svg')" class="type-svg" >
            <span v-for="category in categories">
                <div @click="categoryFilter(`${category.name}`)">
                <span  v-icon="category.svg"></span>
                <h4>{{category.name}}</h4>
                </div>
            </span>
            
        </section>


       
    </section>
</template>

<script>

import categoriesService from "../services/categories-service.js"
import { VueperSlides, VueperSlide } from 'vueperslides'

export default {
    name: 'categories-list',
   
 props: {
        type: {
            type: String,
            required: true,
            
    },
},
created(){
   
},
    data(){
        return{
            categories: categoriesService.categories,
            tags: categoriesService.tags,
            filterBy: {
                title: '',
                category: '',
                subCategory: '',
                min: null,
                max: null,
                delivery: '',
            },
        
        }
     
    },
    computed: {
       getImage(item){
        return {
            backgroundImage: url(item.imageUrl)
       }
    },   
    },
    methods:{
        categoryFilter(category){
            this.filterBy.category=category
            this.filter()
        },
        tagFilter(tag){
            this.filterBy.subCategory=tag
            this.filter()
        },
         filter() {
            this.$emit('filter', { ...this.filterBy })
        },     
  }
    }

</script>