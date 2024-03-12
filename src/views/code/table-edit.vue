<template>
  <el-form ref="formRef" :model="tableData" :rules="rules" label-width="100px">
    <el-form-item label="地址" prop="address">
      <el-input v-model="tableData.address"></el-input>
    </el-form-item>

    <el-form-item label="收获时间" prop="harvestDate">
      <el-date-picker
        type="date"
        v-model="tableData.harvestDate"
        value-format="YYYY-MM-DD"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="描述" prop="description">
      <el-input
        v-model="tableData.description"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="描述"
      />
    </el-form-item>

    <el-form-item label="官方检测" prop="officialDetection">
      <el-input
        v-model="tableData.officialDetection"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="官方检测"
      />
    </el-form-item>

    <!-- <el-form-item label="上传图片" prop="image">
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        :action="uploadUrl.uploadUrl"
        :headers="user"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :limit="1"
      >
        <el-icon><Plus /></el-icon>
        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
          </div>
        </template>
      </el-upload>
    </el-form-item> -->
    <el-form-item label="视频" prop="video">
      <!-- <el-upload
        class="upload-demo"
        :action="uploadUrl.uploadUrl"
        :headers="user"
        :auto-upload="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload> -->
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl.uploadUrl"
        :headers="user"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        <template #tip>
          <div class="el-upload__tip">视频大小不能超过10MB</div>
        </template>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="saveEdit(formRef)">保 存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage, FormInstance, FormRules, UploadProps } from "element-plus";
import { ref } from "vue";
import { uploadCode, updateCode, getCodeDetail } from "@/api/code";

// eslint-disable-next-line no-undef
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  edit: {
    type: Boolean,
    required: false,
  },
  update: {
    type: Function,
    required: true,
  },
});

const tableData = ref({
  address: "",
  harvestDate: "",
  description: "",
  officialDetection: "",
  video: "",
});

// 获取表格数据
const getData = async () => {
  console.log(props.edit);
  if (props.edit) {
    console.log(props.data.id);
    const res = await getCodeDetail(props.data.id);
    tableData.value = res.data.data;
    console.log(res);
  }
};
getData();

//表单校验
const rules = {
  harvestDate: [
    {
      required: true,
      message: "收获时间不能为空",
      trigger: "blur",
    },
  ],
  address: [
    {
      required: true,
      message: "地址不能为空",
      trigger: "blur",
    },
  ],
};

const formRef = ref(FormInstance | null);
const saveEdit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (!valid) return false;
    props.update(tableData.value);

    // edit=true时执行修改，否则执行上传
    if (props.edit) {
      console.log(tableData.value);
      const res = updateCode(tableData.value);
      console.log(res);
    } else {
      console.log(tableData.value);
      const res = uploadCode(tableData.value);
      console.log(res);
    }

    ElMessage.success("保存成功！");
  });
};

//文件上传
const uploadUrl = ref({
  uploadUrl: process.env.VUE_APP_BASE_API + "/admin/common/upload",
});
const user = ref({
  token: localStorage.getItem("token") || "{}",
});
const handleAvatarSuccess = (response, _file) => {
    tableData
  tableData.value.video = response.data;
  console.log(response);
  console.log(tableData);
};
//文件检测
const beforeAvatarUpload = (rawFile) => {
  //   console.log(rawFile);
  if (rawFile.type !== "video/mp4") {
    ElMessage.error("只能上传视频(MP4)");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error("不能大于10MB");
    return false;
  }
  return true;
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
