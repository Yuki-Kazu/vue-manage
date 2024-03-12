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

        <el-table-column prop="consumerId" label="买家ID" align="center">
        </el-table-column>

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
              商品
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
      :title="idEdit ? '编辑订单' : '新增订单'"
      v-model="visible"
      width="500px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <TableEdit :data="rowData" :edit="idEdit" :update="updateData" />
    </el-dialog>

    <el-dialog
      title="查看订单详情"
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
import { getOrder } from "@/api/order";
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

const tableData = ref([]);
const address_name = ref([]);
let Data = ref([])
const pageTotal = ref(0);

// 获取表格数据
const getData = async () => {
  const res = await getOrder(query);
  console.log(res);
  tableData.value = res.data.data.records;
  pageTotal.value = res.data.data.records.length || 50;

//   //获取地址、姓名、联系方式
//   for (let index = 0; index < res.data.data.records.length; index++) {
//     if (tableData.value[index].addressId != null) {
//       const addressId = tableData.value[index].addressId;
//       const res_2 = await getAddress(addressId);
//       console.log(res_2);
//       address_name.value[index] = res_2.data.data;
//     } else {
//       address_name.value[index] = null;
//     }
//   }
//   console.log(tableData);
//   console.log(address_name);
//   Data = tableData.value[0].concat(address_name.value[0])
//   console.log(Data)
};
getData();

// 查询操作
const handleSearch = async () => {
  getData();
};
// 分页导航
const handlePageChange = (val) => {
  query.page = val;
  getData();
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
