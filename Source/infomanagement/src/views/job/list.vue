<template>
  <div class="hr-list">
    <h1>工种信息管理</h1>

    <div class="w-100">
      <div class="m-4">
        <el-button @click="addBtn()" plain round><b>添加工种</b></el-button>
      </div>
    </div>

    <div class="pt-4 w-100">
      <small>工种信息查询，共录入 <b>{{ tableData.length }}</b> 条信息</small>
    </div>

    <div class="w-100">
        <div class="m-4">
          <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                  prop="job_no"
                  label="编号">
              </el-table-column>
              <el-table-column
                  prop="job_name"
                  label="名称"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="type_name"
                  label="类别">
              </el-table-column>
              <el-table-column
                  prop="schedule"
                  label="工期">
              </el-table-column>
              <el-table-column
                  prop="pay"
                  label="工资"
                  width="180">
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
      this.getJobList()
    },
    addBtn () {
      this.$router.push('/job-add')
    },
    getJobList () {
      this.ipcRenderer.send('getJobList')
      this.ipcRenderer.once('getJobList', (event, res) => {
        console.log('getJobList', res)
        this.tableData = res
      })
    },
    delClick (row) {
      this.ipcRenderer.send('delJob', row)
      this.ipcRenderer.once('delJob', (event, res) => {
        console.log('delJob', res)
        this.init()
      })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {}
}
</script>
