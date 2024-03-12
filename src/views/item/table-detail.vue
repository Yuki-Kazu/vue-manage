<template>
  <el-descriptions title="" :column="2" border>
    <el-descriptions-item>
      <template #label> 商品ID </template>
      {{ data.id }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 用户名 </template>
      {{ data.name }}
    </el-descriptions-item>
    <el-descriptions-item :span="2">
      <template #label> 描述 </template>
      {{ data.description }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 价格 </template>
      {{ data.price }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 库存 </template>
      {{ data.inventory }}
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
      <img :src="data.image" style="width: 300px" alt="" />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
