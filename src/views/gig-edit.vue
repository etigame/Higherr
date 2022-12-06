<template>
    <section v-if="gigToEdit" class="gig-edit">
        <form class="flex column" @submit.prevent="saveGig">
            <label>Gig Title
                <input v-model="gigToEdit.title" type="text" />
            </label>
            <label>Description
                <textarea v-model="gigToEdit.description"> </textarea>
            </label>
            <label>Categories
                <select v-model="gigToEdit.category" name="Graphics and Design" id="">
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Writing & Translation">Writing & Translation</option>
                    <option value="Video & Animation">Video & Animation</option>
                </select>
            </label>
            <label>Days to Make
                <select name="" id="" v-model="gigToEdit.daysToMake">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <label>Price<input v-model="gigToEdit.price" type="number" name="" id=""></label>
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