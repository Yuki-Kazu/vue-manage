<template>
  <el-descriptions title="" :column="2" border>
    <el-descriptions-item :span="2">
      <template #label> ID </template>
      {{ tableData.number }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 名字 </template>
      {{ tableData.name }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 单价 </template>
      {{ tableData.price }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 图片 </template>
      {{ tableData.image }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { getOrigin } from "@/api/order";
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const tableData = ref([]);

// 获取表格数据
const getData = async () => {
  const res = await getOrigin(props.data.id);
  console.log(res)
  tableData.value = res.data.data[0];
};
getData();
</script>
