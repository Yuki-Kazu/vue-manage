<template>
	<el-descriptions title="" :column="2" border>
		<el-descriptions-item>
			<template #label> 用户ID </template>
			{{ data.id }}
		</el-descriptions-item>
		<el-descriptions-item>
			<template #label> 用户名 </template>
			{{ data.name }}
		</el-descriptions-item>
		<el-descriptions-item>
			<template #label> 联系方式 </template>
			{{ data.phone }}
		</el-descriptions-item>
		<el-descriptions-item>
			<template #label> 账户状态 </template>
			{{ data.state ? '顾客' : '农民' }}
		</el-descriptions-item>
		<el-descriptions-item :span="2">
			<template #label> 地址 </template>
			{{ data.address }}
		</el-descriptions-item>
		<el-descriptions-item>
			<template #label> 日期 </template>
			{{ data.date }}
		</el-descriptions-item>
		<el-descriptions-item>
			<template #label> 头像 </template>
			<img :src="data.thumb" style="width: 120px" alt="" />
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
