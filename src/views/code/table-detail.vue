<template>
  <el-descriptions title="" :column="2" border>
    <el-descriptions-item>
      <template #label> ID </template>
      {{ tableData.id }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 收获时间 </template>
      {{ tableData.harvestDate }}
    </el-descriptions-item>
    
    <el-descriptions-item>
      <template #label> 地址 </template>
      {{ tableData.address }}
    </el-descriptions-item>

    <el-descriptions-item :span="2">
      <template #label> 溯源码 </template>
      {{ tableData.keyCode }}
    </el-descriptions-item>

    <el-descriptions-item :span="2">
      <template #label> 描述 </template>
      {{ tableData.description }}
    </el-descriptions-item>

    <el-descriptions-item :span="2">
      <template #label> 官方检测 </template>
      {{ tableData.officialDetection }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 视频 </template>
      {{ tableData.video }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { ref } from "vue";
import { getCodeDetail } from "@/api/code";

// eslint-disable-next-line no-undef
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const tableData = ref([]);

// 获取表格数据
const getData = async () => {
  console.log(props.data.id);
  const res = await getCodeDetail(props.data.id);
  tableData.value = res.data.data;
  console.log(res);
  console.log(tableData);
};
getData();
</script>
