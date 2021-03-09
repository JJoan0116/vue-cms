<template>
  <el-container class="container">
    <el-header></el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu active-text-color="#333" unique-opened router class="menu">
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <template slot="title">
              <i :class="icons[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              v-for="subIem in item.children"
              :key="subIem.id"
              :index="subIem.id + ''"
            >
              <i class="el-icon-menu"></i>
              <span>{{ item.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      menuList: [],
      icons: {
        101: 'el-icon-user',
        201: 'el-icon-setting',
        301: 'el-icon-goods',
        401: 'el-icon-document',
        501: 'el-icon-pie-chart'
      }
    };
  },
  created() {
    this.getMunus();
  },
  methods: {
    getMunus() {
      this.$http.get('/menus').then((res) => {
        const { data } = res || {};
        if (data.meta.status !== 200) {
          this.$message.console.error(data.meta.msg);
        }
        console.log('data.data', data.data);
        this.menuList = data.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}
.aside {
  border-right: solid 1px #e6e6e6;
}
.menu {
  border-right: none;
}
</style>
