<template>
  <div>
    <div class="container">
      <div class="search-box">
        <el-input
          v-model="query.name"
          placeholder="商品名"
          class="search-input mr10"
          clearable
        ></el-input>
        <el-button type="primary" :icon="Search" @click="getData"
          >搜索</el-button
        >
        <el-button
          type="warning"
          :icon="CirclePlusFilled"
          @click="visible = true"
          >新增</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="65"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="name"
          label="商品名"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="description"
          label="描述"
          align="center"
        ></el-table-column>

        <el-table-column label="图片(查看大图)" align="center">
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

        <el-table-column
          prop="price"
          label="价格"
          width="65"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="inventory"
          label="库存"
          width="65"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="farmerId"
          label="对应农民ID"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" width="240" align="center">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              :icon="View"
              @click="handleView(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
              v-permiss="15"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="handleDelete(scope.$index, scope.row.id)"
              v-permiss="16"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      :title="idEdit ? '编辑商品' : '新增商品'"
      v-model="visible"
      width="500px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <TableEdit :data="rowData" :edit="idEdit" :update="updateData" />
    </el-dialog>
    <el-dialog
      title="查看商品详情"
      v-model="visible1"
      width="700px"
      destroy-on-close
    >
      <TableDetail :data="rowData" />
    </el-dialog>
  </div>
</template>

<script setup name="item">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Delete,
  Edit,
  Search,
  CirclePlusFilled,
  View,
} from "@element-plus/icons-vue";
import { getItem, searchItem, deleteItem } from "@/api/item";
import TableEdit from "./table-edit.vue";
import TableDetail from "./table-detail.vue";

//用于分页查询
const query = reactive({
  name: "",
  page: 1,
  pageSize: 10,
});

//用于ID查询
const itemID = "";

const tableData = ref([]);
const pageTotal = ref(0);

// 获取表格数据
const getData = async () => {
  const res = await getItem(query);
  tableData.value = res.data.data.records;
  pageTotal.value = res.data.data.records.length || 50;
  console.log(res);
};
getData();

// 分页导航
const handlePageChange = (val) => {
  query.page = val;
  getData();
};

// 删除操作
const handleDelete = (index, itemID) => {
  // 二次确认删除
  ElMessageBox.confirm("确定要删除吗？", "提示", {
    type: "warning",
  })
    .then(() => {
      tableData.value.splice(index, 1);
      const res = deleteItem(itemID);
      console.log(res);
      ElMessage.success("删除成功");
    })
    .catch(() => {});
};

const visible = ref(false);
let idx = -1;
const idEdit = ref(false);
const rowData = ref({});
const handleEdit = (index, row) => {
  idx = index;
  rowData.value = row;
  idEdit.value = true;
  visible.value = true;
};

const updateData = (row) => {
  idEdit.value ? (tableData.value[idx] = row) : tableData.value.unshift(row);
  closeDialog();
};

const closeDialog = () => {
  visible.value = false;
  idEdit.value = false;
};

const visible1 = ref(false);
const handleView = (row) => {
  rowData.value = row;
  visible1.value = true;
};
</script>

<style scoped>
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
