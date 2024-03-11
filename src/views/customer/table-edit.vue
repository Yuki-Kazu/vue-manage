<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="农民号" prop="number">
      <el-input v-model="form.number"></el-input>
    </el-form-item>

    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="联系方式" prop="phone">
      <el-input v-model.number="form.phone"></el-input>
    </el-form-item>

    <el-form-item label="地址" prop="address">
      <el-input v-model="form.address"></el-input>
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
import { uploadUser, updateUser } from "@/api/user";

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
  number: "",
  name: "",
  address: "",
  phone: "",
  starLevel: "",
};

const form = ref({ ...(props.edit ? props.data : defaultData) });

//表单校验
const rules = {
  number: [
    {
      required: true,
      message: "农民号不能为空",
      trigger: "blur",
    },
  ],
  phone: [
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
        farmerId: form.value.farmerId,
        name: form.value.name,
        address: form.value.address,
        phone: form.value.phone,
      };
      console.log(updateData);
      const res = updateUser(updateData);
      console.log(res);
    } else {
      console.log(form.value);
      const res = uploadUser(form.value);
      console.log(res);
    }

    ElMessage.success("保存成功！");
  });
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
