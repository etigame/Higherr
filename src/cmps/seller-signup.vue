<template>

    <section class="seller-signup flex column">
        <h1>Become a Seller!</h1>
        <!-- <img-uploader @uploaded="onUploaded"></img-uploader> -->
        <form @submit.prevent="updateUser">
            <label class="flex"><span>Country:</span><input type="text" v-model="country" /></label>
            <label class="flex"><span>Description:</span>
                <textarea class="seller-description"
                    placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                    v-model="description">
            </textarea>
            </label>
        </form>
    </section>
</template>

<script>

import imgUploader from './img-uploader.vue'
export default {
    name: 'seller-signup',
    components: { imgUploader },

    data() {
        return {

            seller: {
                description: '',
                country: '',



            }
        }
    },
    methods: {
        updateUser() {


        }
    }

}

</script>