<template>
  <el-container class="container">
    <el-header class="header">
      <img src="../../assets/logo.png" alt="" class="logo" />
      <h1>hello word</h1>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu
          active-text-color="#1890ff"
          unique-opened
          router
          class="menu"
          @select="menuClick"
        >
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
              :index="subIem.path + ''"
              :default-active="activePath"
            >
              <i class="el-icon-menu"></i>
              <span>{{ subIem.authName }}</span>
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
      },
      activePath: ''
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
        this.menuList = data.data;
      });
    },
    menuClick(key) {
      this.activePath = `/${key}`;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}

.header {
  border-bottom: solid 1px #e6e6e6;
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}

.aside {
  border-right: solid 1px #e6e6e6;
}

.menu {
  border-right: none;
}
</style>
