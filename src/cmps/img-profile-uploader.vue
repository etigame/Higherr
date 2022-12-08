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
    data() {
        return {

            imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
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
            this.imgUrl = secure_url
            this.height = height
            this.width = width
            this.$emit('uploaded', this.imgUrl)
        }
    },
    computed: {

    }
}
</script>
  