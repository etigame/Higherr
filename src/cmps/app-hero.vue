<template>
    <section class="hero-container main-layout full">
        <div class="img-container full">
            <Transition>
                <img v-if="(idx === 0)" :src="getImageUrl" />
                <img v-else-if="(idx === 1)" :src="getImageUrl" />
                <img v-else-if="(idx === 2)" :src="getImageUrl" />
                <img v-else-if="(idx === 3)" :src="getImageUrl" />
                <img v-else-if="(idx === 4)" :src="getImageUrl" />
            </Transition>
        </div>

        <div class="search-container flex">
            <h1>Find the perfect <span>freelance</span> services for your business</h1>
            <hero-search @filter="titleFilter" />
            <div class="categories flex">
                Popular:
                <div class="tag" @click="tagFilter(tag)" v-for="tag in tags">{{ tag }}</div>
            </div>
        </div>

        <div class="hero-info flex">
            <Transition>
                <p v-if="(idx === 0)">
                <div>
                    <span v-for="n in getRate" v-icon="'star'"></span>
                </div>
                {{ getHeroName }},
                <span>{{ getHeroJob }}</span>
                </p>

                <p v-else-if="(idx === 1)">
                <div>
                    <span v-for="n in getRate" v-icon="'star'"></span>
                </div>
                {{ getHeroName }},
                <span>{{ getHeroJob }}</span>
                </p>

                <p v-else-if="(idx === 2)">
                <div><span v-for="n in getRate" v-icon="'star'"></span></div>{{ getHeroName }},<span>{{
                    getHeroJob
                }}</span></p>

                <p v-else-if="(idx === 3)">
                <div><span v-for="n in getRate" v-icon="'star'"></span></div>{{ getHeroName }},<span>{{
                    getHeroJob
                }}</span></p>

                <p v-else-if="(idx === 4)">
                <div><span v-for="n in getRate" v-icon="'star'"></span></div>{{ getHeroName }},<span>{{
                    getHeroJob
                }}</span></p>
            </Transition>
        </div>
    </section>
</template>

<script>
import heroSearch from "./hero-search.vue"
import categoriesService from "../data/gig-categories"
import heroService from "../data/heroes.js"

export default {
    name: 'hero',

    components: {
        heroSearch
    },

    mounted() {
        setInterval(this.changeCurrImage, 5000)
    },

    data() {
        return {
            idx: 0,
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
            this.idx = this.idx < 4 ? this.idx + 1 : 0
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
            return this.heroes[this.idx].imgUrl
        },

        getHeroName() {
            return this.heroes[this.idx].name
        },

        getHeroJob() {
            return this.heroes[this.idx].profession
        },

        getRate() {
            return this.heroes[this.idx].rating
        }
    }
}
</script>



