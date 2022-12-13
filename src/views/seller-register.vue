<template>
    <section v-if="userToEdit" class="seller-register main-layout full">

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

            <div class="field">
                <label>
                    <h3>Password</h3>
                    <p>4 characters or more</p>
                </label>
                <div class="info-fill flex">
                    <el-input v-model="userToEdit.password" placeholder="enter password" />
                </div>
            </div>


            <div class="field ">
                <label>
                    <h3>Profile Picture</h3>
                    <p>Add a profile picture of yourself so customers will know exactly who they’ll be working with.</p>
                </label>
                <div class="info-fill">
                    <img-profile-uploader @uploaded="getImage" :imgUrl="userToEdit.imgUrl"></img-profile-uploader>
                </div>
            </div>
            <div class="field">
                <label>
                    <h3>Description</h3>
                </label>
                <div class="info-fill">
                    <el-input :rows="2" type="textarea" v-model="userToEdit.description"
                        placeholder="Share a bit about your work experience, cool projects you’ve completed, and your area of expertise." />
                </div>
            </div>

            <div class="field">
                <label>
                    <h3>Country</h3>
                    <p>4 characters or more</p>
                </label>
                <div class="info-fill flex">
                    <el-input v-model="userToEdit.location" placeholder="where are you from?" />
                </div>
            </div>
        </form>

        <!-- <button @click="saveUser">Sign up</button> -->
        <button @click="cancelSignup">Cancel</button>

    </section>
</template>

<script>
import imgProfileUploader from "../cmps/img-profile-uploader.vue"
import { userService } from "../services/user-service.js"


export default {
    name: 'seller-register',
    components: { imgProfileUploader },
    created() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        const loggedinUser = this.$store.getters.loggedinUser
        if (loggedinUser) {
            userService.getById(loggedinUser._id).then((user) => {
                this.userToEdit = user
            })
        }
        else {
            this.userToEdit = userService.createEmptyUser()
        }
    },
    data() {
        return {
            userToEdit: null,
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
            await this.$store.dispatch({ type: "updateUser", userCred: { ...this.userToEdit } })
            await this.$store.dispatch({ type: "signup", userCred: { ...this.userToEdit } })
            this.$router.push('/seller/profile')
        },
        cancelSignup() {
            this.$router.push('/')
        }
    }
}

</script>