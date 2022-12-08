<template>
  <section class="img-uploader flex column">


    <label for="imgUpload">Upload Images</label>
    <label class="upload-container">
      <input type="file" @change="uploadImg" accept="img/*" id="imgUpload" />
    </label>

    <div className="upload-preview flex">
      <div v-for="img in images" class="img-container">
        <img v-if="images" :src="img" />
      </div>
    </div>
  </section>

</template>

<script>
import { uploadService } from "../services/upload-service.js"

export default {
  data() {
    return {
      images: [],
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
      this.images.push(secure_url)
      this.height = height
      this.width = width
      this.$emit('uploaded', this.images)
    }
  },

}
</script>
