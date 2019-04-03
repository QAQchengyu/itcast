<template>
  <div class="orders-container">
    <!-- 面包屑 -->
    <my-bread sectitle="订单管理" threetitle="订单列表"></my-bread>
    <el-table :data="orderList" style="width: 100%" border>
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="160"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="160"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
        <template slot-scope="scope">
          <template>
            <el-button v-if="scope.row.order_pay==='0'" type="danger" plain>未付款</el-button>
            <el-button v-else type="success" plain>已付款</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | formatTime('YYYY-MM-DD HH:mm-ss')}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit()" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
      :total="total"
    ></el-pagination>
    <!-- 省市级联 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="省市级/县" :label-width="formLabelWidth">
        <v-distpicker></v-distpicker>
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import options from "../assets/city_data2017_element.js"

import VDistpicker from 'v-distpicker'

export default {
  name: "cates",
  components: { VDistpicker },
  data() {
    return {
      // 总条数
      total: 0,
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      options,
      selectedOptions2: [],
      orderList: [{}, {}],
      // 省市级联弹框是否显示
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleEdit() {
      this.dialogFormVisible = true;
    },
    async search() {
      let res = await this.$axios.get("orders", {
        params: this.sendData
      });
      // console.log(res);
      this.orderList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    stateChange(row) {
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    submitAdd(formName) {
      this.$refs[formName].validate(async valid => {
        console.log(valid);

        if (valid) {
          // 成功调用接口
          let res = await this.$axios.post("users", this.addForm);
          console.log(res);
          // 新增成功就重新获取用户列表
          if (res.data.meta.status === 201) {
            this.search();
            // 关闭对话框
            this.addFormVisible = false;
          }
        } else {
          this.$message.error("大侠，账号或密码格式有误");
          return false;
        }
      });
    },
    // 保存修改
    async submitEdit(formName) {
      let res = await this.$axios.put(`users/${this.editForm.id}`, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      });
      if (res.data.meta.status == 200) {
        this.search();
        this.editFormVisible = false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    del(row) {
      this.$confirm("大侠，你真的要删除该用户吗?", "提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "良心发现",
        type: "warning"
      })
        .then(async () => {
          // 发请求
          let res = await this.$axios.delete(`users/${row.id}`);
          console.log(res);
          if (res.data.meta.status === 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //
    async showRole(row) {
      // 编辑角色对话框显示
      this.roleFormVisible = true;
      // 保存编辑的用户信息
      this.editUser = row;
      // 获取所有角色的列表
      let res = await this.$axios.get("roles");
      console.log(res);

      this.roleList = res.data.data;
    },

    // 页码改变
    sizeChange(size) {
      console.log(size);

      this.sendData.pagesize = size;
      this.search();
    },
    // 也容量改变
    currentChange(current) {
      console.log(current);

      this.sendData.pagenum = current;
      this.search();
    }
  },
  // 接口调用
  created() {
    this.search();
  }
};
</script>

<style>
</style>
