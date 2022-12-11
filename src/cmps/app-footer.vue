<template>
    <section class="app-footer main-layout full">
        <div class="content-container flex align-center space-between">
            <div>
                <span class="logo">Higherr</span>
                <small class="copy-rights">© Higherr International Ltd. 2022</small>
            </div>
            <div class="social-links flex space-between ">
            
                <div><a v-icon="'twitter'"></a></div>
                <div><a v-icon="'facebook'"></a></div>
                <div><a v-icon="'linkedin'"></a></div>
                <div><a v-icon="'pinterest'"></a></div>
                <div><a v-icon="'instagram'"></a></div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'app-footer'
}
</script>