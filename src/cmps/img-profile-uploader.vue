<template>
    <section class="img-profile-uploader">
        <div className="upload-preview">
            <div class="img-container">
                <img v-if="imgUrl" :src="imgUrl" />
            </div>
            <label class="upload-container">
                <input type="file" @change="uploadImg" accept="img/*" id="imgUpload" />
            </label>
        </div>
    </section>
</template>
  
<script>
import { uploadService } from "../services/upload-service.js"

export default {
    props: ['imgUrl'],
    data() {
        return {

            img: this.imgUrl,
            height: 250,
            width: 500,
            isUploading: false
        }
    },
    methods: {
        async uploadImg(ev) {
            this.isUploading = true
            const { secure_url, height, width } = await uploadService.uploadImg(ev)
            this.isUploading = false
            this.img = secure_url
            this.height = height
            this.width = width
            this.$emit('uploaded', this.img)
        }
    },
    computed: {

    }
}
</script>
  