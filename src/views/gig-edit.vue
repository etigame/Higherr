<template>
    <section v-if="gigToEdit" class="gig-edit full">
        <form class="flex column space-between" @submit.prevent="saveGig">
            <label class="title">
                <span class="flex-column">Gig Title
                    <p>As your Gig storefront, your title is the most important place to include keywords
                        that buyers would likely use to search for a service like yours.
                    </p>
                </span>
                <input v-model="gigToEdit.title" type="text" />
            </label>

            <label class="category">
                <span class="flex-column">Category
                    <p>Choose the category most suitable for your Gig.</p>
                </span>
                <select v-model="gigToEdit.category" name="Graphics and Design" id="">
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Writing & Translation">Writing & Translation</option>
                    <option value="Video & Animation">Video & Animation</option>
                </select>
            </label>

            <label class="description">
                <span class="flex-column">Description
                    <p>Briefly Describe Your Gig</p>
                </span>
                <textarea v-model="gigToEdit.description"
                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry...."> </textarea>
            </label>

            <label class="days-to-make">
                <span>Days to Make</span>
                <select name="" id="" v-model="gigToEdit.daysToMake">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>

            <label class="price">
                <span>Price
                </span>
                <input v-model="gigToEdit.price" type="number" name="" id=""></label>

            <label class="images">
                <img-uploader @uploaded="onUploaded"></img-uploader>
            </label>
        </form>
        <div class="btns flex space-between">
            <button @click="returnToProfile">Cancel</button>
            <button @click="saveGig">Save</button>

        </div>
    </section>
</template>



<script>

import { gigService } from "../services/gig-service.js"

import imgUploader from "../cmps/img-uploader.vue"

export default {
    name: 'gig-edit',
    components: { imgUploader },
    created() {
        const owner = this.$route.query
        console.log(this.$route.query)
        const { _id } = this.$route.params
        if (_id) {

            gigService.getById(_id).then((gig) => {
                this.gigToEdit = gig
            })
        } else this.gigToEdit = gigService.getEmptyGig(owner)
    },

    data() {
        return {
            gigToEdit: null
        }
    },
    methods: {
        async saveGig() {
            await this.$store.dispatch({ type: "addGig", gig: { ...this.gigToEdit } })
            this.$router.push('/seller/profile')
        },
        onUploaded(imgUrl) {
            this.gigToEdit.image.push(imgUrl)
        },
        returnToProfile() {
            this.$router.push('/seller/profile')
        }

    }
}
</script>