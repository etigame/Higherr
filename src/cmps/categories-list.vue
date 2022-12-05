<template>

    <section class="categories-list main-layout full">

        <section v-if="(type === 'tag')" class="type-tag main-layout full" :class="{ shown: isCategoriesShown }">
            <div class="flex space-between ">
                <router-link v-for="category in categories" @click="categoryFilter(`${category.name}`)" to="/explore">{{
                        category.name
                }}</router-link>
                <!-- <a @click="categoryFilter(`${category.name}`)" href="" v-for="category in categories" >{{category.name}}</a> -->
            </div>
        </section>


        <section v-if="(type === 'card')" class="type-card ">
            <div>
                <h1>Popular Professional Services</h1>
                <!-- <div class="cards flex space-between "> -->
                    <vueper-slides class="no-shadow" :visible-slides="4" slide-multiple :slide-ratio="(1 / 5)" :gap="5">
                        <vueper-slide v-for="tag in tags" :key="tag" :image="tag.imageUrl" :title="tag.subTxt" :content="tag.txt" />
                    </vueper-slides>
                    <!-- <div class="card" v-for="tag in tags">
                        <h2><small>{{ tag.subTxt }}</small>{{ tag.txt }}</h2>
                        <div @click="tagFilter(`${tag.txt}`)">
                            <img :src="tag.imageUrl" />
                        </div>
                    </div> -->
                <!-- </div> -->
            </div>
        </section>

        <section v-if="(type === 'svg')" class="type-svg">
            <span v-for="category in categories">
                <div @click="categoryFilter(`${category.name}`)">
                    <span v-icon="category.svg"></span>
                    <h4>{{ category.name }}</h4>
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
    data() {
        return {
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
            windowTop: window.top.scrollY,
            isCategoriesShown: false
        }
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll)
    },
    computed: {
        getImage(item) {
            return {
                backgroundImage: url(item.imageUrl)
            }
        },
    },
    methods: {
        categoryFilter(category) {
            this.filterBy.category = category
            this.filter()
        },
        tagFilter(tag) {
            this.filterBy.subCategory = tag
            this.filter()
        },
        filter() {
            this.$emit('filter', { ...this.filterBy })
        },
        onScroll(e) {
            if (this.$route.path !== '/') return
            this.windowTop = window.top.scrollY
            this.isCategoriesShown = this.windowTop > 150 ? true : false
        }
    },
    watch: {
        $route: {
            handler(route) {
                this.isCategoriesShown = route.path !== '/' ? true : false
            },
        },
    },
    components: {
        VueperSlides,
        VueperSlide
    },
}

</script>