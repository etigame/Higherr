     
<template>
  <section class="signup">
    <h2>Signup</h2>
    <form @submit.prevent="doSignup">
      <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
      <input type="text" v-model="signupCred.password" placeholder="Password" />
      <input type="text" v-model="signupCred.username" placeholder="Username" />
      <button>Signup</button>
      <img-uploader class="upload-img" @uploaded="onUploaded"></img-uploader>
    </form>
  </section>
</template>

<script>
import imgUploader from './img-uploader.vue'
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
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', user: { ...this.signupCred, isSeller: false } })
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
