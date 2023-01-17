     
<template>
  <section class="login">
    <form @submit.prevent="doLogin">
      <h2>Sign In to Higherr</h2>
      <input type="text" v-model="loginCred.username" placeholder="username" />
      <input type="text" v-model="loginCred.password" placeholder="Password" />
      <button>Login</button>
      <span>Don't have an account yet?</span><a @click="goToSignup">Open account</a>
    </form>

    <GoogleLogin :callback="callback" class="googleLogin" />

  </section>
</template>

<script>
import { decodeCredential } from 'vue3-google-login'

export default {
  name: 'login',
  data() {
    return {
      msg: '',
      loginCred: { username: 'fred', password: '123' },
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
        this.$router.push('/explore')
        await this.$store.dispatch({ type: "login", userCred: { ...this.loginCred } })
        this.close()
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },

    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },

    close() {
      this.$emit('close')
    },

    goToSignup() {
      this.$emit('signup')
    },

    callback(response) {
      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData)

      const userCred = {
        fullName: userData.name,
        username: userData.email.substring(0, userData.email.indexOf('@')),
        imgUrl: userData.picture
      }

      this.$router.push('/explore')
      this.$store.dispatch({ type: "loginViaGoogle", userCred })
      this.close()
    },
  },

}
</script> 
