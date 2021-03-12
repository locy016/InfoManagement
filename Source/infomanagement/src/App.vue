<template>
  <div id="app">
    <template v-if="$route.meta.topShow">
      <header>
        <el-menu
          :router="true"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="/home">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">信息管理</template>
            <el-menu-item index="/job-type">工种类别</el-menu-item>
            <el-menu-item index="/job-add">添加工种</el-menu-item>
            <el-menu-item index="/job-list">工种管理</el-menu-item>
            <el-menu-item index="/hr-add">添加人员</el-menu-item>
            <el-menu-item index="/hr-import">导入人员</el-menu-item>
            <el-menu-item index="/hr-list">人员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">我的工作台</template>
            <el-menu-item index="/project-add">添加项目</el-menu-item>
            <el-menu-item index="/project-list">项目列表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">帮助</template>
            <el-menu-item index="/about">关于</el-menu-item>
            <el-menu-item index="/">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </header>
    </template>
    <div class="main">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {},
  components: {}
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
/* 可以设置不同的进入和离开动画, 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: opacity 1.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
header{
  position: fixed;
  width: 100%;
  height: 7%;
  background: #F0F0F0;
}
.main{
  position: fixed;
  top: 10%;
  height: 93%;
  width: 100%;
  overflow-y: auto;
}
</style>
