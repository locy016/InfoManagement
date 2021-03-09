<template>
  <div class="job">
    <h1>This is an select hr page</h1>
    <div>
        <el-button type="primary" class="w-100" @click="onUpd">更新人员名单</el-button>
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
            <el-table-column
                width="120"
                prop="last_date_array"
                label="近期项目日期">
                <template slot-scope="scope">
                  <template v-if="scope.row.last_date_array">
                    {{ JSON.parse('[' + scope.row.last_date_array + ']').length }}天
                    <el-tooltip class="item" effect="dark" :content="scope.row.last_date_array" placement="left">
                      <div slot="content">
                        <p for="" v-for="(item, index) in JSON.parse('[' + scope.row.last_date_array + ']')" :key="index">
                          {{ formatShortDate(item) }}
                        </p>
                      </div>
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                  </template>
                  <template v-else>
                    空
                  </template>
                </template>
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
  props: ['dataSource', 'show'],
  methods: {
    init () {
      this.ipcRenderer.send('getSelectHrList')
      this.ipcRenderer.on('getSelectHrList', (event, res) => {
        console.log('res', res)
        this.tableData = res
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onUpd () {
      // this.dataSource = this.multipleSelection
      this.$emit('update:dataSource', this.multipleSelection)
      this.$emit('update:show', false)
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.ipcRenderer.removeAllListeners('getSelectHrList')
  }
}
</script>
