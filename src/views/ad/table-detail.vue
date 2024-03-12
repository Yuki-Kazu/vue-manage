<template>
  <el-descriptions title="" :column="2" border>
    <el-descriptions-item :span="2">
      <template #label> ID </template>
      {{ data.id }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 用户名 </template>
      {{ data.fname }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 商品名 </template>
      {{ data.cname }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 创建时间 </template>
      {{ data.createTime }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 更新时间 </template>
      {{ data.updateTime }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 图片 </template>
      <img :src="data.image" style="width: 500px" alt="" />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
