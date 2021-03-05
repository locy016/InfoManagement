<template>
  <div class="job">
    <h1>This is an job list page</h1>
    <div>
        <el-button type="primary" class="w-100" @click="onUpd">添加</el-button>
    </div>
    <div class="m-4">
        <el-table
            :data="tableData"
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
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
                prop="job_name"
                label="工种">
            </el-table-column>
            <el-table-column
                prop="level_name"
                label="级别">
            </el-table-column>
            <!-- <el-table-column
                prop="create_time"
                label="创建时间">
                <template slot-scope="scope">
                  <p>{{ formatShortDate(scope.row.create_time) }}</p>
                </template>
            </el-table-column> -->

        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'job',
  data () {
    return {
      tableData: [],
      multipleSelection: this.dataSource
    }
  },
  props: ['dataSource'],
  methods: {
    init () {
      this.ipcRenderer.send('getHrList')
      this.ipcRenderer.on('getHrList', (event, res) => {
        this.tableData = res
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onUpd () {
      this.dataSource = this.multipleSelection
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
