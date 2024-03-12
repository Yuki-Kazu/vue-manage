<template>
  <el-descriptions title="" :column="2" border>
    <el-descriptions-item>
      <template #label> 订单ID </template>
      {{ data.id }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 订单号 </template>
      {{ data.number }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 总价 </template>
      {{ data.totalPrices }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 运单号 </template>
      {{ data.trackingNumber }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 创建时间 </template>
      {{ data.createTime }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 支付时间 </template>
      {{ data.payTime }}
    </el-descriptions-item>

    <el-descriptions-item :span="2">
      <template #label> 交易代码 </template>
      {{ data.tradeCode }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 买家ID </template>
      {{ data.consumerId }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 买家名称 </template>
      {{ addressData.name }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 地址ID </template>
      {{ data.addressId }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 地址 </template>
      {{ addressData.address }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 联系方式 </template>
      {{ addressData.phone }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label> 星级 </template>
      {{ data.status }}
    </el-descriptions-item>

    <el-descriptions-item :span="2">
      <template #label> 买家留言 </template>
      {{ data.remark }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { ref } from "vue";
import { getAddress } from "@/api/order";
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const addressData = ref({
  name: "",
  address: "",
  phone: "",
});
const getData = () => {
  //地址id可能为空
  if (props.data.addressId != null) {
    const res = getAddress(props.data.addressId);
    res.then((result) => {
      //传回来的值可能为空
      if (result.data.data != null) {
        addressData.value = result.data.data;
      }
    });
    console.log(addressData);
  }
};
getData();
</script>
