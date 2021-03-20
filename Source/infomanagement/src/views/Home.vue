<template>
  <div class="home">
    <h1>系统概述</h1>
    <div class="m-4">
      <div class="m-1">
        <el-alert :title="info.software_name" type="success" :close-text="info.version_number"></el-alert>
      </div>
    </div>
    <div class="m-4">
        <el-alert :title="info.contact" type="info" :close-text="info.author"></el-alert>
    </div>
    <div class="m-4">
        <el-alert title="工种信息统计" type="warning" close-text="开发中"></el-alert>
    </div>
    <div class="m-4">
        <el-alert title="工人信息统计" type="warning" close-text="开发中"></el-alert>
    </div>
    <div class="m-4">
        <el-alert title="项目信息统计" type="warning" close-text="开发中"></el-alert>
    </div>
    <div class="m-4">
        <el-alert title="人资信息统计" type="warning" close-text="开发中"></el-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      info: {}
    }
  },
  methods: {
    init () {
      this.ipcRenderer.send('getBaseInfo')
      this.ipcRenderer.once('getBaseInfo', (event, res) => {
        console.log('getBaseInfo', res)
        this.info = res
      })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () { }
}
</script>
