<template>
  <section class="gig-package-payment">
    <section class="package-content">
      <section class="header flex space-between">
        <div class="img-container">
          <img :src="`${gig.images[0]}`" />
        </div>
        <p class="title">{{ gig.title }}</p>
      </section>
      <h3 class="price">US${{ gig.price }}</h3>
      <p>
        1 custom logo+high resolution file+3d mockup+logo transparency+ 300dpi
      </p>

      <ul class="features clean-list">
        <li class="regular" v-for="feature in features">
          <div class="v-svg-container"><span v-icon="'greenV'"></span></div>
          {{ feature }}
        </li>
      </ul>

      <div class="pricing">
        <p>Service Fee</p>
        <p>US${{ serviceCalc(gig.price) }}</p>
      </div>
      <div class="pricing">
        <p>VAT</p>
        <p>US${{ vatCalc(gig.price) }}</p>
      </div>
      <div class="pricing total">
        <p>Total</p>
        <p>US${{ totalPrice(gig.price) }}</p>
      </div>
      <div class="pricing">
        <p class="bold">Delivery Time</p>
        <p>{{ gig.daysToMake }} Days</p>
      </div>

      <button @click="addOrder" class="continue-btn">Confirm And Pay</button>
    </section>
  </section>
</template>

<script>
import { socketService } from '../services/socket-service'

export default {
  name: 'gig-package',
  props: {
    gig: Object,
  },
  data() {
    return {
      features: ['1 concept included', 'Logo transparency', 'Printable file', 'Include 3D mockup']
    }
  },
  methods: {
    addOrder() {
      this.$emit('addOrder')
      // setTimeout(() => {
      //   this.$router.push('/')
      // }, 500)
      // socketService.emit('gig-ordered', this.gig)
    },

    serviceCalc(price) {
      return (price * 0.15).toFixed(2)
    },

    vatCalc(price) {
      return (price - price / 1.17).toFixed(2)
    },

    totalPrice(price) {
      return (price * 1.17 + price * 0.15).toFixed(2)
    },
  },
}
</script>