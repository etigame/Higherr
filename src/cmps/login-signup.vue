     
<template>
  <form @submit.prevent="doLogin">
    <h2>Login</h2>
    <input type="text" v-model="loginCred.username" placeholder="username" />
    <input type="text" v-model="loginCred.password" placeholder="Password" />
    <button>Login</button>
  </form>


  <!-- <form @submit.prevent="doSignup">
    <h2>Signup</h2>
    <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
    <input type="text" v-model="signupCred.password" placeholder="Password" />
    <input type="text" v-model="signupCred.username" placeholder="Username" />
    <img-uploader @uploaded="onUploaded"></img-uploader>
    <button>Signup</button>
  </form> -->
</template>
     
<script>
import imgUploader from '../cmps/img-uploader.vue'
import { socketService } from '../services/socket-service'

export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: 'etika', password: '123' },
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
    doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      this.$store.dispatch({ type: 'login', userCred: this.loginCred })
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')
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
    }

  },
  components: {
    imgUploader
  }
}
</script> 
     