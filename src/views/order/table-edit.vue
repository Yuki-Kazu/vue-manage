<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="订单ID" prop="id">
      <el-input v-model="form.id"></el-input>
    </el-form-item>

    <el-form-item label="运单号" prop="trackingNumber">
      <el-input v-model="form.trackingNumber"></el-input>
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
import { deliverOrder } from "@/api/order";

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
  trackingNumber: "",
};

const form = ref({ ...(props.edit ? props.data : defaultData) });

//表单校验
const rules = {
  trackingNumber: [
    {
      required: true,
      message: "运单号不能为空",
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

    //edit=true时执行修改，否则执行上传
    if (props.edit) {
      const updateData = {
        orderId: form.value.id,
        trackingNumber: form.value.trackingNumber,
      };
      console.log(updateData);
      const res = deliverOrder(updateData);
      console.log(res);
      res.then((result) => {
        console.log(result.data);
        if (result.code == 1) {
          ElMessage.success(result.data.msg);
        } else {
          ElMessage.error(result.data.msg);
        }
      });
    }
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
