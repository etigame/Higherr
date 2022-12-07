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

            imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
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
  