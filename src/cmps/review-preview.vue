<template>
    <section class="review-preview">
        <p>{{ review.name }}</p>
        <img :src="review.flag" alt="reviewer-flag">
        <p>{{ review.country }}</p>
        <p>{{ review.reviewedAt }}</p>
        <p>{{ review.review }}</p>
    </section>
</template>
  
<script>
export default {
    name: 'review-preview',
    props: {
        review: Object
    }
}
</script>