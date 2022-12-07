<template>
  <!-- ON DETAILS PAGE -->
  <section :v-if="currRoutePath === `/gig/:${gig._id}`">
    <section v-if="!isOpen" class="chat-seller-pill flex">
      <section @click="toggleChat" class="seller-info flex">
        <div class="img-seller">
          <img :src="gig.owner.imgUrl" alt="seller-img" />
        </div>
        <div class="info-txt flex">
          <h4>Message {{ gig.owner.fullname }}</h4>
          <span>Avg. response time: {{ gig.avgResponseTime }}</span>
        </div>
      </section>
    </section>

    <section v-if="isOpen" class="chat-seller flex column">
      <section class="chat-seller-header flex">
        <div class="seller-info flex">
          <div class="img-seller">
            <img :src="gig.owner.imgUrl" alt="seller-img" />
          </div>
          <div class="info-txt flex">
            <h2>Message {{ gig.owner.fullname }}</h2>
            <h4>Avg. response time: {{ gig.avgResponseTime }}</h4>
          </div>
        </div>
        <div @click="toggleChat"><span v-icon="'x'"></span></div>
      </section>

      <section class="text-explanation">
        <span>Ask {{ gig.owner.fullname }} question or share your project details (requirements, timeline, budget,
          etc.)</span>
      </section>

      <section class="msgs-area flex">
        <ul class="msgs clean-list">
          <li v-for="(msg, idx) in msgs" :key="idx">
            <span>{{ msg.from }}:</span>{{ msg.txt }}
          </li>
        </ul>
      </section>

      <section class="write-msg flex">
        <form @submit.prevent="sendMsg" class="flex">
          <input type="text" v-model="msg.txt" :placeholder="`Write ${gig.owner.fullname} here`" />
          <div><span v-icon="'clip'"></span></div>
          <button class="flex send-btn"><span v-icon="'send'">Send Message</span></button>
        </form>
      </section>
    </section>
  </section>

  <!-- ON SELLER PROFILE PAGE -->
  <section v-if="currRoutePath === '/seller/profile'">
    <section class="chat-seller flex column">
      <section class="chat-seller-header flex">
        <div class="seller-info flex">
          <div class="img-seller">
            <img :src="gig.owner.imgUrl" alt="seller-img" />
          </div>
        </div>
        <div @click="toggleChat"><span v-icon="'x'"></span></div>
      </section>

      <section class="msgs-area flex">
        <ul class="msgs clean-list">
          <li v-for="(msg, idx) in msgs" :key="idx">
            <span>{{ msg.from }}:</span>{{ msg.txt }}
          </li>
        </ul>
      </section>

      <section class="write-msg flex">
        <form @submit.prevent="sendMsg" class="flex">
          <input type="text" v-model="msg.txt" :placeholder="`Write ${gig.owner.fullname} here`" />
          <div><span v-icon="'clip'"></span></div>
          <button class="flex send-btn"><span v-icon="'send'">Send Message</span></button>
        </form>
      </section>
    </section>
  </section>
</template>

<script>
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_JOIN_CHAT } from '../services/socket-service'
import { userService } from '../services/user-service'

export default {
  name: 'chat-seller',
  props: {
    gig: Object
  },
  data() {
    return {
      msg: {
        from: '',
        txt: '',
        topic: '',
        // to: ''
      },
      msgs: [],
      isOpen: false
    }
  },
  created() {
    const user = userService.getLoggedinUser()
    socketService.emit(SOCKET_EMIT_JOIN_CHAT, user)
    const topic = this.gig.owner._id
    socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
    // socketService.terminate()
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
      console.log(this.msgs)
    },
    sendMsg() {
      // TODO: next line not needed after connecting to backend
      // this.addMsg(this.msg)
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      const user = userService.getLoggedinUser()
      const from = (user && user.fullname) || 'Guest'
      this.msg.from = from
      if (this.msg.txt === '') return
      socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
      this.msg = { from: '', txt: '' }
    },
    toggleChat() {
      this.isOpen = !this.isOpen
    }
  },
  computed: {
    currRoutePath() {
      return this.$route.path
    }
  }
}
</script>
