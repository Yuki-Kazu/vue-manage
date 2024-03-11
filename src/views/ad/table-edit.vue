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
          <span style="float: left">{{ `农民ID: ${item.id}` }}</span>
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

    <el-form-item label="对应商品ID" prop="commodityId">
      <el-select v-model="form.commodityId">
        <el-option
          v-for="item in commodity"
          :key="item.name"
          :label="item.id"
          :value="item.id"
        >
          <span style="float: left">{{ `商品ID: ${item.id}` }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ `商品名: ${item.name} 农民ID: ${item.farmerId}` }}</span
          >
        </el-option>
      </el-select>
    </el-form-item>

    <!-- <el-form-item label="上传图片" prop="image">
      <el-upload
        v-model="fileData.file"
        list-type="picture-card"
        :auto-upload="false"
        limit="1"
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

    <el-form-item>
      <el-button type="primary" @click="saveEdit(formRef)">保 存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ElMessage, FormInstance, FormRules, UploadProps } from "element-plus";
import { ref, reactive } from "vue";
import { uploadAd, updateAd } from "@/api/ad";
import { getFarmer } from "@/api/index";
import { getItem } from "@/api/item";

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
  farmerId: "",
  commodityId: "",
  image: "",
};

//存放文件
const fileData = ref({
  file: "",
});

const farmer = ref([]);
const commodity = ref([]);
const query = reactive({
  number: "",
  page: 1,
  pageSize: 100,
});
//获取农民数据
const getFarmerData = async () => {
  const res = await getFarmer();
  farmer.value = res.data.data;
};
getFarmerData();
//获取商品数据
const getData = async () => {
  const res = await getItem(query);
  commodity.value = res.data.data.records;
  console.log(res);
};
getData();

const form = ref({ ...(props.edit ? props.data : defaultData) });

//表单校验
const rules = {
  farmerId: [
    {
      required: true,
      message: "农民ID不能为空",
      trigger: "blur",
    },
  ],
  commodityId: [
    {
      required: true,
      message: "商品ID不能为空",
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
        commodityId: form.value.commodityId,
        image: form.value.image,
      };
      console.log(updateData);
      console.log("updateData");
      const res = updateAd(updateData);
      console.log(res);
    } else {
      console.log(fileData);
      //   console.log(form.value);
      //   const res = uploadAd(form.value);
      //   console.log(res);
    }

    ElMessage.success("保存成功！");
  });
};

const loadFile = async (param) => {
  const formData = new FormData(); // 添加文件对象
  formData.append("file", param.file);
  console.log(formData);
  console.log("formData");
};
const handleAvatarSuccess = (response, uploadFile) => {
  // eslint-disable-next-line no-undef
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
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
