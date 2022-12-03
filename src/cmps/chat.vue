<template>
  <div class="chat-seller">
    <h2>{{ gig.fullname }}</h2>
    <div class="img-seller">
      <img :src="gig.imgUrl" alt="seller-img" />
    </div>
    <h4>{{ gig.avgResponseTime }}</h4>
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

  }
}
</script>
