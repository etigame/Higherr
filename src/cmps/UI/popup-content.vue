<template>
    <section v-if="currComponent"  >
      <div class="backdrop full"></div>
      <section class="popup-content" v-clickOutside="closeContent">
        <component :is="currComponent" ></component>
        <button @click="closeContent">Cancel</button>
      </section>
    </section>
</template>

<script>

import { eventBus } from '../../services/event-bus-service.js'
import loginSignup from "../login-signup.vue"


export default {
    name: 'popup-content',
    components:{loginSignup},
    data(){
        return {
            currComponent: null
        }
    },
    created() {
    this.unsubscribe = eventBus.on('get-cmp', this.getCmp)
  },
  methods: {
    getCmp(name) {
      this.currComponent = name
      
  },
  closeContent(){
    this.currComponent=null;
  },
  unmounted() {
    this.unsubscribe()
  },
}

}

</script>