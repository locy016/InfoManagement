<template>
  <div class="home">
    <h1>Home</h1>
    <div>
      <div class="m-1">
        <el-tag type="success">{{ info.software_name }}</el-tag>
      </div>
      <div class="m-1">
        <el-tag type="danger">{{ info.version_number }}</el-tag>
      </div>
      <div class="m-1">
        <el-tag type="info">{{ info.author }}</el-tag>
      </div>
      <div class="m-1">
        <el-tag type="warning">{{ info.contact }}</el-tag>
      </div>
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
      this.ipcRenderer.on('getBaseInfo', (event, res) => {
        console.log('getBaseInfo', res)
        this.info = res
      })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.ipcRenderer.removeAllListeners('getBaseInfo')
  }
}
</script>
