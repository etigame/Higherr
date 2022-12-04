<template>
  <div v-if="!isOpen"  class="chat-seller-pill flex">
      <div @click="toggleChat" class="seller-info flex">
        <div class="img-seller">
          <img :src="gig.imgUrl" alt="seller-img" />
        </div>
        <div class="info-txt flex">
          <h4>Message {{ gig.fullname }}</h4>
          <span>Avg. response time: {{ gig.avgResponseTime }}</span>
        </div>
      </div>
  </div>


  <div v-if="isOpen" class="chat-seller">
    <div class="chat-seller-header flex">
    <div class="seller-info flex">
      <div class="img-seller">
        <img :src="gig.imgUrl" alt="seller-img" />
      </div>
      <div class="info-txt flex">
      <h2>Message {{ gig.fullname }}</h2>
      <h4>Avg. response time: {{ gig.avgResponseTime }}</h4>
      </div>
    </div>
    <div @click="toggleChat"><span v-icon="'x'"></span></div>
    </div>
    <div class="text-explanation">
    <span >Ask {{gig.fullname}} question or share your project details (requirements, timeline, budget, etc.)</span>
    </div>
    <div class="flex msg-area">
      <div><span v-icon="'clip'"></span></div>
      <div class="flex send-btn"><span v-icon="'send'"></span><p>Send Message</p></div>
    </div>
  </div>
  
  

</template>

<script>
// import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket-service'

export default {
  name: 'chat-seller',
  props: {
    gig: Object
  },
  data() {
    return {
      // msg: { from: 'Guest', txt: '' },
      // msgs: [],
      // topic: 'Love',
      isOpen:false
    }
  },
  created() {
    // socketService.setup()
    // socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    // socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  unmounted() {
    // socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
    // socketService.terminate()
  },
  methods: {
    toggleChat(){
      this.isOpen=!this.isOpen
    }
  }
}
</script>
