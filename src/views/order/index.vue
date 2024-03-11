<template>
  <div>
    <div class="container">
      <div class="search-box">
        <el-date-picker
          v-model="query.beginTime"
          type="datetime"
          placeholder="开始时间"
          format="YYYY-MM-DD HH:mm"
          value-format="YYYY-MM-DD HH:mm"
          date-format="MMM DD, YYYY"
          time-format="HH:mm"
        />
        <el-date-picker
          v-model="query.endTime"
          type="datetime"
          placeholder="结束时间"
          format="YYYY-MM-DD HH:mm"
          value-format="YYYY-MM-DD HH:mm"
          date-format="MMM DD, YYYY"
          time-format="HH:mm"
        />
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
          label="订单ID"
          width="65"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="number"
          label="订单号"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="totalPrices"
          label="总价"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="payTime"
          label="支付时间"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="trackingNumber"
          label="运单号"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="consumerId"
          label="买家ID"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="remark"
          label="买家留言"
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
              详情
            </el-button>
            <el-button
              type="success"
              size="small"
              :icon="View"
              @click="handleOrigin(scope.row)"
              v-permiss="15"
            >
              溯源
            </el-button>
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
              v-permiss="15"
            >
              发货
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

    <el-dialog
      title="获取订单新鲜详情"
      v-model="visible2"
      width="700px"
      destroy-on-close
    >
      <TableOrigin :data="rowData" />
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
// eslint-disable-next-line no-unused-vars
import { getOrder, deleteOrder, searchOrder } from "@/api/order";
import TableEdit from "./table-edit.vue";
import TableDetail from "./table-detail.vue";
import TableOrigin from "./table-origin.vue";

//用于分页查询
const query = reactive({
  beginTime: "",
  endTime: "",
  number: "",
  page: 1,
  pageSize: 10,
});

//用于ID查询
// const userID = reactive({
//   id: "",
// });

const tableData = ref([]);
const pageTotal = ref(0);

// 获取表格数据
const getData = async () => {
  console.log(query);
  const res = await getOrder(query);
  console.log(res);
  tableData.value = res.data.data.records;
  pageTotal.value = res.data.data.records.length || 50;

  // tableData.value = [
  //     {
  //         id: 10000,
  //         number: 1111,
  //         name: "张三",
  //         phone: 123456,
  //         address: "广东省惠州市",
  //         starLevel: 5,
  //     },
  //     {
  //         id: 2,
  //         number: 2222,
  //         name: "李四",
  //         phone: 78910,
  //         address: "广东省汕头市",
  //         starLevel: 4.5,
  //     },
  // ];
};
getData();

// 查询操作
const handleSearch = async () => {
  getData();
  // query.page = 1;
  // userID.value.id = userId;
  // const res = await searchOrder(userId)
  // console.log(res)
  // tableData.value = res.data.data.records;
  // pageTotal.value = res.data.data.records.length || 50;
};
// 分页导航
const handlePageChange = (val) => {
  query.page = val;
  getData();
};

// 删除操作
// eslint-disable-next-line no-unused-vars
const handleDelete = (index) => {
  // 二次确认删除
  ElMessageBox.confirm("确定要删除吗？", "提示", {
    type: "warning",
  })
    .then(() => {
      ElMessage.success("删除成功");
      // tableData.value.splice(index, 1);
      const res = deleteOrder();
      console.log(res);
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

const visible2 = ref(false);
const handleOrigin = (row) => {
  rowData.value = row;
  visible2.value = true;
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
