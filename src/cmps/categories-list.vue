<template>
    <section class="categories-list main-layout full">
        <section v-if="type==='cards'">
            <h1>Popular Professional Services</h1>
            <div class="card" v-for="item in list">
                <img :src="item.imageUrl"/>
            </div>
        </section>
        <section class="type-txt flex space-between" v-else-if="type==='txt'">
            <h3 v-for="item in list">{{item.txt}}</h3>
        </section>
    </section>
</template>

<script>

import {subCategories} from "../services/categories-service.js"

export default {
    name: 'categories-list',
 props: {
        type: {
            type: String,
            required: true,
            
        }
    },
    data(){
        return {
          
          list: subCategories


        }
    }
}
</script>