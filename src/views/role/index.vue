<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
      <el-table :data="roleList" class="table">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="level0 in scope.row.children"
              :key="level0.id"
              class="levelFir"
            >
              <el-col :span="5">
                <el-tag>{{ level0.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>

              <el-col :span="19">
                <el-row v-for="level1 in level0.children" :key="level1.id">
                  <el-col :span="8">
                    <el-tag type="success">{{ level1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <el-col :span="16">
                    <el-tag
                      type="warning"
                      v-for="level2 in level1.children"
                      :key="level2.id"
                      class="tag"
                      >{{ level2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showDialog"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配权限" :visible.sync="setDialogVisible" width="50%">
      <el-tree
        :data="rightList"
        show-checkbox
        node-key="id"
        :props="treeProps"
        default-expand-all
      >
      </el-tree>
      <span slot="footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="hideDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      setDialogVisible: false,
      rightList: [],
      treeProps: {
        children: 'children',
        label: 'authName'
      }
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      this.$http.get('/roles').then((res) => {
        const { data } = res;
        if (data.meta.status !== 200) {
          this.$message.console.error('请求失败');
        }
        this.roleList = data.data;
      });
    },
    showDialog() {
      this.setDialogVisible = true;
      this.getRightList();
    },
    getRightList() {
      this.$http.get('/rights/tree').then((res) => {
        const { data } = res;
        if (data.meta.status !== 200) {
          this.$message.console.error('请求失败');
        }
        this.rightList = data.data;
      });
    },
    hideDialog() {
      this.setDialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  margin-top: 30px;
}

.levelFir {
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ccc;
}

.tag {
  margin-right: 10px;
}
</style>
