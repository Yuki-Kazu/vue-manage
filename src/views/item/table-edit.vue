<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="对应农民ID" prop="farmerId">
      <el-select v-model="form.farmerId">
        <el-option
          v-for="item in farmer"
          :key="item.number"
          :label="item.id"
          :value="item.id"
        >
          <span style="float: left">{{ `ID: ${item.id}` }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ `农民号: ${item.number} 星级: ${item.starLevel}` }}</span
          >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="商品名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description"></el-input>
    </el-form-item>

    <el-form-item label="价格" prop="price">
      <el-input v-model="form.price"></el-input>
    </el-form-item>

    <el-form-item label="库存" prop="inventory">
      <el-input v-model="form.inventory"></el-input>
    </el-form-item>

    <el-form-item label="上传图片" prop="image">
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        list-type="picture-card"
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
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="saveEdit(formRef)">保 存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ElMessage, FormInstance, FormRules, UploadProps } from "element-plus";
import { ref } from "vue";
import { updateItem, uploadItem, uploadData } from "@/api/item";
import { getFarmer } from "@/api/index";

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

const defaultData = {
  id: "",
  farmerId: "",
  name: "",
  description: "",
  image: "",
  price: "",
  inventory: "",
};

const farmer = ref([]);

//获取农民数据
const getFarmerData = async () => {
  const res = await getFarmer();
  farmer.value = res.data.data;
};
getFarmerData();

const form = ref({ ...(props.edit ? props.data : defaultData) });

//表单校验
const rules = {
  farmerId: [
    {
      pattern: /^[0-9]+$/,
      required: true,
      message: "对应农民号不能为空",
      trigger: "blur",
    },
  ],
  price: [
    {
      pattern: /^(0|[1-9][0-9]*)$/,
      message: "只能输入数字",
      trigger: "blur",
    },
  ],
  inventory: [
    {
      pattern: /^(0|[1-9][0-9]*)$/,
      message: "只能输入数字",
      trigger: "blur",
    },
  ],
};

const formRef = ref(FormInstance | null);
const saveEdit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (!valid) return false;
    props.update(form.value);

    // edit=true时执行修改，否则执行上传
    if (props.edit) {
      const updateData = {
        id: form.value.id,
        farmerId: form.value.farmerId,
        name: form.value.name,
        description: form.value.description,
        image: form.value.image,
        price: form.value.price,
        inventory: form.value.inventory,
      };
      console.log(updateData);
      const res = updateItem(updateData);
      console.log(res);
    } else {
      console.log(form.value);
      const res = uploadItem(form.value);
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
  form.value.image = response.data;
  console.log(response);
  console.log(form);
};
//文件检测
const beforeAvatarUpload = (rawFile) => {
  //   console.log(rawFile);
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("只能上传图片(JPG/PNG)");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.error("不能大于3MB");
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
