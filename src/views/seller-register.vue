<template>
    <section v-if="userToEdit" class="seller-register main-layout full">

        <h1>Register as Seller</h1>

        <form>

            <label>
                <span>Full Name
                    <p>Ex. John Smith</p>
                </span>
                <input v-model="userToEdit.fullname" />
            </label>


            <label>
                <span class="flex-column">Username
                    <p>this name will be shown to other users</p>
                </span>
                <input v-model="userToEdit.username" />
            </label>


            <label v-if="!userToEdit.username">
                <span class="flex-column">Password
                    <p>4 characters or more</p>
                </span>
                <input v-model="userToEdit.password" />
            </label>

            <div>
                <span class="flex-column">Profile Picture
                    <p>Add a profile picture of yourself so customers will know exactly who they’ll be working with.
                    </p>
                </span>
                <label>
                    <img-profile-uploader @uploaded="getImage" :imgUrl="userToEdit.imgUrl"></img-profile-uploader>
                </label>
            </div>

            <label>
                <span class="flex-column">Description
                    <p>Share a bit about your work experience, cool projects you’ve completed, and your area of
                        expertise.</p>
                </span>
                <textarea v-model="userToEdit.description" />
            </label>


            <label>
                <span>Country
                    <p>Where are you from?</p>
                </span>
                <input v-model="userToEdit.location" />
            </label>

        </form>

        <div class="btns flex space-between">
            <button class="cancel-btn" @click="cancelSignup">Cancel</button>
            <button class="save-btn" @click="saveUser">Sign up</button>

        </div>



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
        }
    },
    methods: {
        getImage(imgUrl) {
            if (!imgUrl) return
            this.userToEdit.imgUrl = imgUrl
        },
        async saveUser() {
            if (!this.userToEdit._id) await this.$store.dispatch({ type: "signup", user: { ...this.userToEdit, isSeller: true } })
            else await this.$store.dispatch({ type: "updateUsers", user: { ...this.userToEdit, isSeller: true } })
            this.$router.push('/seller/profile')


        },
        cancelSignup() {
            this.$router.push('/')
        }
    }
}

</script>