<template>
  <section v-if="currComponent">
    <div class="backdrop full"></div>
    <section class="popup-content" v-clickOutside="closeContent">
      <component :is="currComponent" @close="closeContent" @signup="getCmp('signup')"></component>
    </section>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus-service.js'
import signup from "../signup.vue"
import login from "../login.vue"

export default {
  name: 'popup-content',

  components: {
    signup,
    login
  },

  data() {
    return {
      currComponent: null
    }
  },

  created() {
    eventBus.on('get-cmp', this.getCmp)
  },

  methods: {
    getCmp(name) {
      this.currComponent = name
    },

    closeContent() {
      this.currComponent = null
    },

  },
}
</script>