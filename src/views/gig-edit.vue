<template>
    <section v-if="gigToEdit" class="gig-edit">
        <form class="flex column space-between" @submit.prevent="saveGig">
            <label>
                <span class="flex-column">Gig Title
                    <p>As your Gig storefront, your title is the most important place to include keywords
                        that buyers would likely use to search for a service like yours.
                    </p>
                </span>
                <input v-model="gigToEdit.title" type="text" />
            </label>
            <label>
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
            <label><span class="flex-column">Description
                    <p>Briefly Describe Your Gig</p>
                </span>
                <textarea v-model="gigToEdit.description"
                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..."> </textarea>
            </label>

            <label>Days to Make
                <select name="" id="" v-model="gigToEdit.daysToMake">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <label>
                <span>Price
                </span>
                <input v-model="gigToEdit.price" type="number" name="" id=""></label>
            <label>Image
                <img-uploader @uploaded="onUploaded"></img-uploader>
            </label>


            <button>Submit</button>
        </form>
    </section>
</template>



<script>

import { gigService } from "../services/gig-service.js"

import imgUploader from "../cmps/img-uploader.vue"

export default {
    name: 'gig-edit',
    components: { imgUploader },
    created() {
        const { _id } = this.$route.params
        if (_id) {
            gigService.getById(_id).then((gig) => {
                this.gigToEdit = gig
            })
        } else this.gigToEdit = gigService.getEmptyGig()
    },

    data() {
        return {
            gigToEdit: null
        }
    },
    methods: {
        saveGig() {
            this.$store.dispatch({ type: "addGig", gig: { ...this.gigToEdit } })
        },
        onUploaded(imgUrl) {
            this.gigToEdit.image.push(imgUrl)
        }

    }
}
</script>