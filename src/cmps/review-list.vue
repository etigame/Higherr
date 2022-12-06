<template>
  <section v-if="reviews" class="review-list">

    <section v-if="(type === 'reviewSnippet')">
      <review-preview :review="firstReview" :type="type"  />
    </section>

    <section v-if="(type === 'reviewLong')">
      <ul class="clean-list">
        <review-preview v-for="review in reviews" :review="review" :key="review._id" :type="type" />
      </ul>
    </section>

   

  </section>
</template>

<script>
import reviewPreview from './review-preview.vue'

export default {
  name: 'review-list',
  props: {
    reviews: Array,
    type: String
  },
  data() {
    return {
      firstReview: this.reviews[0] 
    }
  },
  components: {
    reviewPreview
  }
}
</script>