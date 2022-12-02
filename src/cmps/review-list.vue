<template>
  <section v-if="reviews" class="review-list">
    <ul class="clean-list">
      <review-preview v-for="review in reviews" :review="review" :key="review._id" :type="type" />
    </ul>
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
  components: {
    reviewPreview
  }
}
</script>