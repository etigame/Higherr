<template>
    <section class="gig-details">
        <gig-package />
    </section>
</template>

<script>
import gigPackage from '../cmps/gig-package.vue'

export default {
    name: 'gig-details',
    component: {
        gigPackage
    }
}
</script>