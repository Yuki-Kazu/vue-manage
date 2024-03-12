<template>
  <el-table
    :data="tableData"
    border
    class="table"
    ref="multipleTable"
    header-cell-class-name="table-header"
  >
    <el-table-column label="图片" align="center">
      <template #default="scope">
        <el-image
          class="table-td-thumb"
          :src="tableData[scope.$index].image"
          :preview-src-list="scope.row"
          :z-index="50"
          preview-teleported
        >
        </el-image>
      </template>
    </el-table-column>

    <el-table-column prop="name" label="商品名称" align="center"></el-table-column>

    <el-table-column
      prop="number"
      label="数量"
      width="65"
      align="center"
    ></el-table-column>

    <el-table-column prop="price" label="单价" align="center"></el-table-column>
  </el-table>
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
  console.log(res);
  tableData.value = res.data.data;
};
getData();
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 200px;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
