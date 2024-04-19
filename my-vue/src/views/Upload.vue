<!--
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-19 15:01:21
 * @LastEditTime: 2024-04-19 17:58:25
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\my-vue\src\views\Upload.vue
-->
<template>
  <div class="minio-container common-container">
    <el-button icon="el-icon-upload" type="primary" @click="handleUploadFile"
      >上传图片</el-button
    >
    <transition name="transition-preview">
      <div class="demo-image__preview" style="margin-top: 20px" v-if="imageUrl">
        <el-image
          style="width: 100px; height: 100px"
          :src="imageUrl"
          :preview-src-list="srcList"
        >
        </el-image>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { ElMessage } from 'element-plus'
import { isImage } from "@/utils";
import { uploadImage } from "@/request/api";
import { reactive, ref } from "vue";

const imageUrl = ref("");
let srcList = reactive([]);

const handleUploadFile = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("multiple", "multiple");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async function (event) {
    debugger;
    const file = event.target.files[0];
    if (!isImage(file)) {
      return ElMessage.error("不是可上传的图片格式");
    }
    const formData = new FormData();
    formData.append("file", file);
    const data = await uploadImage(formData);
    if (data?.code && data.code == 200) {
      imageUrl.value = data.url;
      srcList = [].concat(data.url);
    }
  };
  input.remove();
};
</script>

<style  scoped>
.fold-height-enter-active,
.fold-height-leave-active {
  transition: height 0.5s ease;
  overflow: hidden;
}

.fold-height-enter,
.fold-height-leave-to {
  height: 0 !important;
}
</style>
