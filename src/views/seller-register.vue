<template>
    <section v-if="userToEdit" class="seller-register">
        <h1>Register as Seller</h1>

        <form>
            <div class="field">
                <label>
                    <h3>Full Name</h3>
                    <p>Ex. John Smith</p>
                </label>
                <div class="info-fill flex">
                    <el-input v-model="userToEdit.fullname" placeholder="enter your full name" />
                </div>
            </div>
            <div class="field">
                <label>
                    <h3>Username</h3>
                    <p>this name will be shown to other users</p>
                </label>
                <div class="info-fill flex">
                    <el-input v-model="userToEdit.username" placeholder="enter username" />
                </div>
            </div>

            <div class="field ">
                <label>
                    <h3>Profile Picture</h3>
                    <p>Add a profile picture of yourself so customers will know exactly who they’ll be working with.</p>
                </label>
                <div class="info-fill">
                    <img-profile-uploader @uploaded="getImage"></img-profile-uploader>
                </div>
            </div>


            <div class="field">
                <label>
                    <h3>Description</h3>
                </label>
                <div class="info-fill">
                    <el-input v-model="userToEdit.description" :rows="2" type="textarea"
                        placeholder="Share a bit about your work experience, cool projects you’ve completed, and your area of expertise." />
                </div>
            </div>

            <div class="field">
                <label>
                    <h3>Languages</h3>
                    <p>Select which languages you can communicate in and your proficiency level.</p>
                </label>
                <div class="info-fill">
                    <div class="m-4">
                        <el-select v-model="userToEdit.languages" multiple placeholder="Select Languages"
                            style="width: 240px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </div>
        </form>

        <button @click="saveUser">Sign up</button>


    </section>
</template>

<script>
import imgProfileUploader from "../cmps/img-profile-uploader.vue"
import { userService } from "../services/user-service.js"


export default {
    name: 'seller-register',
    components: { imgProfileUploader },
    data() {
        return {
            userToEdit: userService.createEmptyUser(),
            value1: [],
            options:

                [{
                    value: 'Amharic',
                    label: 'Amharic',
                },
                {
                    value: 'Arabic',
                    label: 'Arabic',
                },
                {
                    value: 'English',
                    label: 'English',
                },
                {
                    value: 'French',
                    label: 'French',
                },
                {
                    value: 'Hebrew',
                    label: 'Hebrew',
                },
                {
                    value: 'Russian',
                    label: 'Russian',
                },

                ]
        }
    },
    methods: {
        getImage(imgUrl) {
            this.userToEdit.imgUrl = imgUrl
        },
        async saveUser() {
            console.log(this.userToEdit)
            await this.$store.dispatch({ type: "signup", userCred: { ...this.userToEdit } })
            this.$router.push('/seller/profile')
        },
    }

}

</script>