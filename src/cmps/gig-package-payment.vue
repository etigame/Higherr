<template>
    <section class="gig-package">
        <section class="package-content">
            <section class="header flex space-between">
                <h3 class="title">Order Details</h3>
                <h3 class="price"> {{ gig.price }} </h3>
            </section>
            <p>1 custom logo+high resolution file+3d mockup+logo transparency+ 300dpi</p>

            <section class="additional-info flex">
                <div class="delivery-wrapper flex">
                    <span v-icon="'clock'"></span>
                    <p> {{ gig.daysToMake }} </p>
                </div>
                <div class="revisions-wrapper flex">
                    <span v-icon="'revisions'"></span>
                    <p> Unlimited Revisions </p>
                </div>
            </section>

            <ul class="features clean-list">
                <li><span v-icon="'greenV'"></span> 1 concept included</li>
                <li><span v-icon="'greenV'"></span> Logo transparency</li>
                <li><span v-icon="'grayV'"></span> Vector file</li>
                <li><span v-icon="'greenV'"></span> Printable file</li>
                <li><span v-icon="'greenV'"></span> Include 3D mockup</li>
                <li><span v-icon="'grayV'"></span> Include source file</li>
                <li><span v-icon="'grayV'"></span> Include social media kit</li>
            </ul>

            <button @click="addOrder" class="continue-btn">Continue
                <span v-icon="'continueArrow'"></span>
            </button>
        </section>

        <section class="contact-seller">
            <button>Contact Seller</button>
        </section>

        <!-- <section class="highly-responsive">
            <span v-icon="'highlyResponsive'" class="highly-responsive-icon"></span>
            <p>Highly responsive!</p>
            <p>Known for exceptionally quick replies</p>
        </section> -->
    </section>
</template>

<script>
export default {
    name: 'gig-package',
    props: {
        gig: Object
    },
    methods:{
        addOrder(){
            this.$emit('addOrder')
        }
    },
}
</script>