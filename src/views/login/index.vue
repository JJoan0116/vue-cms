<template>
  <div class="wrap">
    <div class="container">
      <!-- logo -->
      <div class="logoWrap">
        <img src="../../assets/logo.png" alt="" class="logo" />
      </div>
      <!-- form -->
      <el-form
        :model="loginForm"
        :rules="loginRules"
        class="loginForm"
        ref="loginForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">确定</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post('/login', this.loginForm).then((res) => {
            const { data } = res || {};
            window.sessionStorage.setItem('cms-vue-token', data?.data?.token);
            this.$message.success('登录成功');
            this.$router.push('/home');
          });
        } else {
          this.$message.error('登录失败');
        }
      });
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: #2b4b6b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 10px;
  position: relative;
}

.logoWrap {
  width: 130px;
  height: 130px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: -65px;
  left: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 120px;
  height: 120px;
  background: #c9c9c9;
  border-radius: 50%;
}

.loginForm {
  width: 400px;
  height: 200px;
  margin: 75px auto;
}
</style>
