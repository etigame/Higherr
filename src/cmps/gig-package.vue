<template>
    <section class="gig-package">
        <section class="package-content">
            <h3>Basic</h3>
            <h3> {{ gig.price }} </h3>
        </section>
        <section class="package-continue">
            <button>continue</button>
        </section>
        <section class="package-continue">
            <button>continue</button>
        </section>
        <section class="contact-seller">
            <button>contact-seller</button>
        </section>
    </section>
</template>

<script>
export default {
    name: 'gig-package',
    props: {
        gig: Object
    }
}
</script>