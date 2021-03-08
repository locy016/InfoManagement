<template>
  <div class="job">
    <h1>This is an job list page</h1>
    <div class="m-4">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="real_name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="mobile_phone"
                label="电话">
            </el-table-column>
            <el-table-column
                prop="id_number"
                label="身份证号">
            </el-table-column>
            <el-table-column
                prop="address"
                label="住址">
            </el-table-column>
            <el-table-column
                prop="bank_of_deposit"
                label="开户行">
            </el-table-column>
            <el-table-column
                prop="bank_account"
                label="银行卡号">
            </el-table-column>
            <el-table-column
                prop="job_name"
                label="工种">
            </el-table-column>
            <el-table-column
                prop="level_name"
                label="级别">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="创建时间">
                <template slot-scope="scope">
                  <p>{{ formatShortDate(scope.row.create_time) }}</p>
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
  name: 'job',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    init () {
      this.ipcRenderer.send('getHrList')
      this.ipcRenderer.on('getHrList', (event, res) => {
        console.log('getHrList', res)
        this.tableData = res
      })
    },
    delClick (row) {

    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.ipcRenderer.removeAllListeners('getHrList')
  }
}
</script>
