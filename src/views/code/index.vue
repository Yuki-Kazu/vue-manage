<template>
  <div>
    <div class="container">
      <div class="search-box">
        <el-input
          v-model="query.keyCode"
          placeholder="溯源码"
          class="search-input mr10"
          clearable
        ></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch"
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
          prop="harvestDate"
          label="收获时间"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="keyCode"
          label="溯源码"
          align="center"
        ></el-table-column>

        <el-table-column prop="video" label="视频" align="center">
          <VideoPlayer :videoSrc="video" />
        </el-table-column>

        <el-table-column label="操作" width="240" align="center">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              :icon="View"
              @click="handleView(scope.row)"
            >
              详情
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
      :title="idEdit ? '编辑用户' : '新增用户'"
      v-model="visible"
      width="500px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <TableEdit :data="rowData" :edit="idEdit" :update="updateData" />
    </el-dialog>

    <el-dialog
      title="查看用户详情"
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
import { getCode, deleteCode, searchCode } from "@/api/code";
import TableEdit from "./table-edit.vue";
import TableDetail from "./table-detail.vue";
import VideoPlayer from "../../component/video/video.vue";

//用于分页查询
const query = reactive({
  keyCode: "",
  page: 1,
  pageSize: 10,
});

//用于ID查询
// const userID = reactive({
//   codeId: "",
// });

const tableData = ref([]);
const pageTotal = ref(0);

// 获取表格数据
const getData = async () => {
  console.log(query);
  const res = await getCode(query);
  tableData.value = res.data.data.records;
  pageTotal.value = res.data.data.records.length || 50;
  console.log(res);
};
getData();

// 查询操作
const handleSearch = async () => {
  query.page = 1;
  getData();
  //   tableData.value = "";
  //   console.log(userID);
  //   const res = await searchCode(userID.codeId);
  //   tableData.value[0] = res.data.data;
  //   pageTotal.value = res.data.data.records.length || 50;
  //   console.log(res);
  //   console.log(tableData);
};
// 分页导航
const handlePageChange = (val) => {
  query.page = val;
  getData();
};

// 删除操作
const handleDelete = (index, codeId) => {
  // 二次确认删除
  ElMessageBox.confirm("确定要删除吗？", "提示", {
    type: "warning",
  })
    .then(() => {
      ElMessage.success("删除成功");
      const res = deleteCode(codeId);
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
