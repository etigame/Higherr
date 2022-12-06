     
<template>
<Section class="login-signup">
  <section>
<form  @submit.prevent="doLogin">
  <h2>Login</h2>
        <input type="text" v-model="loginCred.username" placeholder="username" />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password"
        />
      <button>Login</button>
      </form>
    </section>
    <section>
      <form  @submit.prevent="doSignup">
        <h2>Signup</h2>
        <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
        <input type="text" v-model="signupCred.password" placeholder="Password" />
        <input type="text" v-model="signupCred.username" placeholder="Username" />
        <img-uploader @uploaded="onUploaded"></img-uploader>
        <button>Signup</button>
      </form>
  </section>
</Section>
</template>
     
<script>
     import imgUploader from '../cmps/img-uploader.vue'
     
     export default {
       name: 'login-signup',
       data() {
         return {
           msg: '',
           loginCred: { username: 'user1', password: '123' },
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
         async doLogin() {
           if (!this.loginCred.username) {
             this.msg = 'Please enter username/password'
             return
           }
           try {
             await this.$store.dispatch({ type: "login", userCred: this.loginCred })
             this.$router.push('/')
           } catch (err) {
             console.log(err)
             this.msg = 'Failed to login'
           }
         },
         doLogout() {
           this.$store.dispatch({ type: 'logout' })
         },
         async doSignup() {
           if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
             this.msg = 'Please fill up the form'
             return
           }
           await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
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
     