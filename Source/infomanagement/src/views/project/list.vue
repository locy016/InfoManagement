<template>
  <div class="project-list">
    <h1>This is an project list page</h1>
    <div class="m-4">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="project_no"
                label="合同号">
            </el-table-column>
            <el-table-column
                prop="project_name"
                label="项目名称">
            </el-table-column>
            <el-table-column
                prop="project_address"
                label="项目地点">
            </el-table-column>
            <el-table-column
                prop="project_range"
                label="承包范围">
            </el-table-column>
            <el-table-column
                prop="construction_unit"
                label="施工单位">
            </el-table-column>
            <el-table-column
                prop="employer_unit"
                label="建设单位">
            </el-table-column>
            <el-table-column
                prop="project_price"
                label="工程价款">
            </el-table-column>
            <el-table-column
                prop="tax_rate"
                label="税点">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="创建时间">
                <template slot-scope="scope">
                  <p>{{ formatShortDate(scope.row.start_date) }}</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="创建时间">
                <template slot-scope="scope">
                  <p>{{ formatShortDate(scope.row.end_date) }}</p>
                </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hr-list',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    init () {
      this.ipcRenderer.send('getProjectList')
      this.ipcRenderer.on('getProjectList', (event, res) => {
        console.log('getProjectList', res)
        this.tableData = res
      })
    },
    delClick (row) {
      this.ipcRenderer.send('delProject', row)
      this.ipcRenderer.on('delProject', (event, res) => {
        console.log('delProject', res)
        this.init()
      })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.ipcRenderer.removeAllListeners('getJobList')
    this.ipcRenderer.removeAllListeners('delProject')
  }
}
</script>
