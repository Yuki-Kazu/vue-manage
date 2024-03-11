<template>
	<el-descriptions title="" :column="2" border>
        <el-descriptions-item>
			<template #label> ID </template>
			{{ data.farmerId }}
		</el-descriptions-item>
        
		<el-descriptions-item>
			<template #label> 农民号 </template>
			{{ data.number }}
		</el-descriptions-item>

		<el-descriptions-item>
			<template #label> 用户名 </template>
			{{ data.name }}
		</el-descriptions-item>

		<el-descriptions-item>
			<template #label> 联系方式 </template>
			{{ data.phone }}
		</el-descriptions-item>

		<el-descriptions-item :span="2">
			<template #label> 地址 </template>
			{{ data.address }}
		</el-descriptions-item>

		<el-descriptions-item>
			<template #label> 账户等级 </template>
			{{ data.starLevel }}
		</el-descriptions-item>
	</el-descriptions>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
	data: {
		type: Object,
		required: true
	}
});
</script>
