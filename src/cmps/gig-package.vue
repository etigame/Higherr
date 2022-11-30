<template>
    <section class="gig-package">
        <section class="package-content">
            <section class="header flex space-between">
                <h3 class="title">Order Details</h3>
                <h3 class="price"> {{ gig.price }} </h3>
            </section>
            <h3> {{ gig.daysToMake }} </h3>
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