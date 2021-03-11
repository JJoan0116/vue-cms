<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
      <el-table :data="rightList" class="table">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
              >二级</el-tag
            >
            <el-tag type="warning" v-else-if="scope.row.level === '2'"
              >三级</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightList: []
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    getRightList() {
      this.$http.get('/rights').then((res) => {
        const { data } = res;
        if (data.meta.status !== 200) {
          this.$message.console.error('请求失败');
        }
        this.rightList = data.data;
        console.log('11', data);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  margin-top: 30px;
}
</style>
