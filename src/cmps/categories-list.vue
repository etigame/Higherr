<template>
    <section class="categories-list main-layout full">
        <section v-if="(type === 'tag')" class="type-tag main-layout full" :class="{ shown: isCategoriesShown }">
            <section class="vuper-display">
                <vueper-slides class="no-shadow" ref="vueperslides2" :slide-ratio="1 / 8" :touchable="false"
                    @slide="$refs.vueperslides1 && $refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
                    :breakpoints="breakpointsCategories" :visible-slides="5" fixed-height="40px"
                    disable-arrows-on-edges>
                    <vueper-slide v-for="category in categories" :key="category"
                        @click="categoryFilter(`${category.name}`)">
                        <template #content>
                            <div class="vueperslide__content-wrapper">
                                <router-link to="/explore">
                                    {{ category.name }}
                                </router-link>
                            </div>
                        </template>
                    </vueper-slide>
                </vueper-slides>
            </section>

            <section>
                <div class="flex space-between wide-display">
                    <router-link v-for="category in categories" @click="categoryFilter(`${category.name}`)"
                        to="/explore">
                        {{ category.name }}
                    </router-link>
                </div>
            </section>
        </section>

        <section v-if="(type === 'card')" class="type-card">
            <div>
                <h1>Popular professional services</h1>
                <vueper-slides class="no-shadow" :breakpoints="breakpointsCards" :visible-slides="5" slide-multiple
                    :slide-ratio="(1 / 5)" :gap="3" fixed-height="280px" :touchable="false">
                    <vueper-slide v-for="tag in tags" :key="tag" :image="tag.imageUrl" :title="tag.subTxt"
                        style="cursor: pointer" :content="tag.txt" @click="cardFilter(tag.txt)" />
                </vueper-slides>
            </div>
        </section>

        <section v-if="(type === 'svg')" class="type-svg">
            <span v-for="category in categories">
                <div @click="categoryFilter(`${category.name}`)">
                    <span v-icon="category.svg"></span>
                    <h4 class="regular">{{ category.name }}</h4>
                </div>
            </span>
        </section>
    </section>
</template>

<script>
import categoriesService from "../data/gig-categories"
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
            breakpointsCategories: {
                1200: {
                    visibleSlides: 6
                },
                1050: {
                    visibleSlides: 5
                },
                900: {
                    visibleSlides: 4
                },
                700: {
                    visibleSlides: 3
                },
            },
            breakpointsCards: {
                1000: {
                    visibleSlides: 4,
                    slideRatio: 2 / 5,
                    gap: 3,
                },
                800: {
                    visibleSlides: 3
                },
                620: {
                    visibleSlides: 2
                },
                500: {
                    visibleSlides: 1,
                    fixedHeight: '350px'
                },
            },
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
    methods: {
        categoryFilter(category) {
            this.filterBy.category = category
            this.filter()
        },

        filter() {
            this.$emit('filter', { ...this.filterBy })
        },

        onScroll(e) {
            if (this.$route.path !== '/') return
            this.windowTop = window.top.scrollY
            this.isCategoriesShown = this.windowTop > 150 ? true : false
        },

        cardFilter(tag) {
            this.filterBy.subCategory = tag
            this.filter()
        },
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