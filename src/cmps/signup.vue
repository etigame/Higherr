     
<template>
  <section class="signup">
    <form @submit.prevent="doSignup">
      <h2>Signup</h2>
      <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
      <input type="text" v-model="signupCred.password" placeholder="Password" />
      <input type="text" v-model="signupCred.username" placeholder="Username" />
      <img-uploader class="upload-img" @uploaded="onUploaded"></img-uploader>
      <button>Signup</button>
    </form>

    <GoogleLogin :callback="callback" class="googleLogin" />
  </section>
</template>

<script>
import imgUploader from './img-uploader.vue'
import { decodeCredential } from 'vue3-google-login'

export default {
  name: 'signup',
  data() {
    return {
      msg: '',
      signupCred: { username: '', password: '', fullname: '' },
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
    // async doLogin() {    // not in use - delete
    //   if (!this.loginCred.username) {
    //     this.msg = 'Please enter username/password'
    //     return
    //   }
    //   try {
    //     await this.$store.dispatch({ type: "login", userCred: this.loginCred })
    //   } catch (err) {
    //     console.log(err)
    //     this.msg = 'Failed to login'
    //   }
    // },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', user: this.signupCred })
      this.close()
    },

    callback(response) {
      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData)

      const userCred = {
        fullName: userData.name,
        username: userData.given_name,
        imgUrl: userData.picture
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
    imgUploader
  }
}
</script> 
