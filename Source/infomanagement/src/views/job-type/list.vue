<template>
  <div class="job-type">
    <h1>This is an job type page</h1>
    <div class="m-4 p-4">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="type_no"
                label="编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="type_name"
                label="类别"
                width="180">
            </el-table-column>
            <el-table-column
                prop="schedule"
                label="工期">
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'job-type',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    init () {
      this.ipcRenderer.send('getJobTypeList')
      this.ipcRenderer.once('getJobTypeList', (event, res) => {
        console.log('getJobTypeList', res)
        this.tableData = res
      })
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () { }
}
</script>
