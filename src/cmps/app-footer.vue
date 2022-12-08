<template>
    <section class="app-footer main-layout full">
        <div class=" flex align-center space-between">
        <div>
            <span class="logo">Higherr</span>
            <small class="copy-rights">© Higherr International Ltd. 2022</small>
        </div>
        <div class="social-links flex space-between ">
            <!-- //TODO: insert links to every a -->
            <a v-icon="'twitter'"></a>
            <a v-icon="'facebook'"></a>
            <a v-icon="'linkedin'"></a>
            <a v-icon="'pinterest'"></a>
            <a v-icon="'instagram'"></a>
        </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'app-footer'
}
</script>