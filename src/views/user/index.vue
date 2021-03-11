<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="params.query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="addUserBttn">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表单 -->
      <el-table :data="userList" class="table">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch active-color="#13ce66" v-model="scope.row.mg_state" />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template>
            <el-tooltip content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteUser"
              />
            </el-tooltip>

            <el-tooltip content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="pagination"
        :current-page="params.pagenum"
        :page-sizes="[1, 2, 3, 4, 5, 10]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-card>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialogVisible"
      width="50%"
      :close="addDialogVisible"
    >
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm">
        <el-form-item prop="username" label="用户名" label-width="80px">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" label-width="80px">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="密码" label-width="80px">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="addDialogVisible">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }

      cb(new Error('请输入合法的手机号'));
    };

    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      total: 0,
      addUserDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$http.get('/users', this.params).then((res) => {
        const { data } = res;
        if (data.meta.status !== 200) {
          this.$message.error('获取失败');
        }
        this.userList = data.data.users;
        this.total = data.data.total;
      });
    },
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.params.pagenum = val;
      this.getUserList();
    },
    addUserBttn() {
      this.addUserDialogVisible = true;
    },
    addDialogVisible() {
      this.$refs.addUserForm.resetFields();
      this.addUserDialogVisible = false;
    },
    addUser() {
      this.$refs.addUserForm.resetFields();
      this.addUserDialogVisible = false;
    },
    deleteUser() {
      this.$confirm('此操作将删除永辉, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  margin-top: 30px;
}

.table {
  margin-top: 30px;
}

.pagination {
  margin-top: 30px;
}
</style>
