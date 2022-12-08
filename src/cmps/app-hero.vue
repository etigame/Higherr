<template>
    <section class="hero-container main-layout full">
        <div class=" img-container full ">
            <Transition>
                <img v-if="(idx === 1)" :src="getImageUrl">
                <img v-else-if="(idx === 2)" :src="getImageUrl">
                <img v-else-if="(idx === 3)" :src="getImageUrl">
                <img v-else-if="(idx === 4)" :src="getImageUrl">
                <img v-else-if="(idx === 5)" :src="getImageUrl">
            </Transition>
        </div>
        <div class="search-container full flex">
            <h1>Find the perfect <span>freelance</span> services for your business</h1>
            <hero-search @filter="titleFilter"/>
            <div class="categories flex">
                Popular:
                <div class="tag" @click="tagFilter(tag)" v-for="tag in tags">{{ tag }}</div>
            </div>
        </div>
    </section>
</template>



<script>

import heroSearch from "./hero-search.vue"
import categoriesService from "../services/categories-service.js"
import heroService from "../services/hero-service.js"



export default {
    name: 'hero',
    components: { heroSearch },
    mounted() {
        setInterval(this.changeCurrImage, 5000)

    },
    data() {
        return {
            idx: 1,
            tags: categoriesService.popular,
            heroes: heroService.heroes,
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
    methods: {
        changeCurrImage() {
            this.idx = this.idx < 5 ? this.idx + 1 : 1

        },

        filter() {
            this.$emit('filter', { ...this.filterBy })
        },
        titleFilter(title) {
            this.filterBy.title = title
            this.filter()
        },
        tagFilter(tag) {
            this.filterBy.subCategory = tag
            this.filter()
        },
    },
    computed: {
        getImageUrl() {
            return `src/assets/img/hero${this.idx}.webp`
        }
    }
}



</script>



