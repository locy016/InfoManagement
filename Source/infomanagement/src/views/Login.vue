<template>
  <div>
    <div class="login-box">
      <el-col :span="16">
        <el-input
          type="password"
          placeholder="请输入登录密钥."
          v-model="password"/>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-button type="primary" class="w-100" v-on:click="onSubmit('loginForm')"
          >登录</el-button>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      password: null
    }
  },
  methods: {
    onSubmit (formName) {
      // 验证功能
      if (this.password) {
        if (this.password === '.') {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          this.$router.push('/home')
        } else {
          this.$message.error('登录密钥验证失败.')
        }
      } else {
        this.$message.error('登录密钥不能为空.')
        return false
      }
    }
  }
}
</script>

<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  height: 60px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
