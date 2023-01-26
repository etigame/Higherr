<template>
    <section class="skeleton main-layout full">
        <section class="details-container flex">
            <section class="main">

                <div class="title skeleton-item"></div>

                <section class="seller-preview-short flex align-center">
                    <div class="img-container skeleton-item"></div>
                    <div class="text-container skeleton-item"></div>
                </section>

                <section class="gig-gallery">
                    <section class="slideshow">
                        <div class="main-image skeleton-item"></div>
                        <div class="thumbnails-slider skeleton-item"></div>
                    </section>
                </section>

                <section class="package-container-narrow skeleton-item"></section>

                <section class="gig-reviews-snippet">
                    <section class="header flex align-center space-between skeleton-item"></section>
                    <section class="review-list-container skeleton-item"></section>
                </section>

            </section>

            <section class="package-container skeleton-item"></section>
        </section>
    </section>
</template>

<script>
export default {
    name: 'skeleton'
}
</script>