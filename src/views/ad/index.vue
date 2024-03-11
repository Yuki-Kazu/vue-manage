<template>
  <div>
    <div class="container">
      <div class="search-box">
        <!-- <el-input
          v-model="query.name"
          placeholder="用户名"
          class="search-input mr10"
          clearable
        ></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch"
          >搜索</el-button
        > -->
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
          prop="fname"
          label="用户名"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="cname"
          label="商品名"
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
      <!-- <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div> -->
    </div>

    <el-dialog
      :title="idEdit ? '编辑广告' : '新增广告'"
      v-model="visible"
      width="500px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <TableEdit :data="rowData" :edit="idEdit" :update="updateData" />
    </el-dialog>

    <el-dialog
      title="查看广告详情"
      v-model="visible1"
      width="700px"
      destroy-on-close
    >
      <TableDetail :data="rowData" />
    </el-dialog>
  </div>
</template>

<script setup name="customer">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Delete,
  Edit,
  Search,
  CirclePlusFilled,
  View,
} from "@element-plus/icons-vue";
import { getAd, deleteAd, searchAd } from "@/api/ad";
import TableEdit from "./table-edit.vue";
import TableDetail from "./table-detail.vue";

//用于分页查询
// const query = reactive({
//   name: "",
//   page: 1,
//   pageSize: 10,
// });

const tableData = ref([]);
const pageTotal = ref(0);

// 获取表格数据
const getData = async () => {
  const res = await getAd();
  tableData.value = res.data.data;
  pageTotal.value = res.data.data.length || 50;
  console.log(res);
};
getData();

// 查询操作
// const handleSearch = async () => {
//   getData();
//     tableData.value = "";
//     console.log(userID);
//     const res = await searchAd(userID.farmerId);
//     tableData.value[0] = res.data.data;
//     pageTotal.value = res.data.data.records.length || 50;
//     console.log(res);
//     console.log(tableData);
// };
// 分页导航
// const handlePageChange = (val) => {
//   query.page = val;
//   getData();
// };

// 删除操作
const handleDelete = (index, adId) => {
  // 二次确认删除
  ElMessageBox.confirm("确定要删除吗？", "提示", {
    type: "warning",
  })
    .then(() => {
      ElMessage.success("删除成功");
      const res = deleteAd(adId);
      console.log(res);
      //后端删除之后前端同步删除
      tableData.value.splice(index, 1);
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
