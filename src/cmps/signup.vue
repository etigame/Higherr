     
<template>
  <section class="signup">
    <h2>Sign Up to Higherr</h2>
    <form @submit.prevent="doSignup">
      <label>
        <img-profile-uploader @uploaded="getImage" :imgUrl="signupCred.imgUrl"></img-profile-uploader>
      </label>
      <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
      <input type="text" v-model="signupCred.username" placeholder="Username" />
      <input type="text" v-model="signupCred.password" placeholder="Password" />
      <button>Signup</button>

    </form>

    <GoogleLogin :callback="callback" class="googleLogin" />
  </section>
</template>

<script>
import imgProfileUploader from './img-profile-uploader.vue'
import { decodeCredential } from 'vue3-google-login'
import { userService } from '../services/user-service'

export default {
  name: 'signup',
  data() {
    return {
      msg: '',
      signupCred: userService.createEmptyUser(),
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {

    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', user: { ...this.signupCred, isSeller: false } })
      this.close()
    },
    getImage(imgUrl) {
      if (!imgUrl) return
      this.signupCred.imgUrl = imgUrl
    },

    callback(response) {
      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData)

      const userCred = {
        fullname: userData.name,
        username: userData.email.substring(0, userData.email.indexOf('@')),
        imgUrl: userData.picture,
        memberSince: this.signupCred.memberSince,
        isSeller: this.signupCred.isSeller
      }

      this.$router.push('/explore')
      this.$store.dispatch({ type: "signupViaGoogle", user: userCred })
      this.close()
    },

    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    },
    close() {
      this.$emit('close')
    },

  },
  components: {
    imgProfileUploader
  }
}
</script> 
