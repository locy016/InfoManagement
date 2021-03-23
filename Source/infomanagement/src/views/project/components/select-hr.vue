<template>
  <div class="job">
    <!-- <h1>This is an select hr page</h1> -->
    <div class="m-0">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-button class="w-100" @click="getSelectHrList()">查看全部</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="job_value" placeholder="按工种筛选" style="width:100%;">
            <el-option
              v-for="(item, index) in jobData"
              :key="index"
              :label="item.job_name"
              :value="item.job_no">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="start_date" disabled></el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="end_date" disabled></el-date-picker>
        </el-col>
        <el-col :span="5">
          <el-input v-model="autoCheckUp.workCount">
            <template slot="prepend">查询前</template>
            <template slot="append">人</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button class="w-100" type="primary" @click="dateAnalysis()" plain>
            <label for="">工期分析</label>
            <template v-if="autoCheckUp.autoStatus">
              {{ autoCheckUp.currNumber }} / {{ autoCheckUp.workCount }}
            </template>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="mt-2" style="height:500px;overflow-y:auto">
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
                prop="eligible"
                label="可用标记">
                <template slot-scope="scope">
                  <template v-if="scope.row.eligible">
                    <i class="el-icon-circle-check color-success"></i>
                    </template>
                    <template v-else>
                      <i class="el-icon-warning-outline color-gray"></i>
                    </template>
                  {{ scope.row.eligible }}
                </template>
            </el-table-column>
            <el-table-column
                prop="level_name"
                label="级别">
            </el-table-column>
            <el-table-column
                prop="real_name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="id_number"
                label="性别">
                <template slot-scope="scope">
                  {{ (scope.row.id_number.substr(16,1) % 2 === 1) ? '男' : '女' }}
                </template>
            </el-table-column>
            <el-table-column
                prop="id_number"
                label="年龄">
                <template slot-scope="scope">
                  {{ calculateAge(scope.row.id_number.substr(6,8)) }}
                </template>
            </el-table-column>
            <el-table-column
                width="120"
                prop="mobile_phone"
                label="电话">
            </el-table-column>
            <el-table-column
                width="170"
                prop="id_number"
                label="身份证号">
            </el-table-column>
            <el-table-column
                prop="job_name"
                label="工种">
            </el-table-column>
            <el-table-column
                width="120"
                prop="start_date"
                label="施工记录">
                <template slot-scope="scope">
                  <!-- <el-button type="text" @click="getLog(scope.row.id_number)">点击查询</el-button> -->
                  <el-popover
                    placement="left"
                    width="400"
                    trigger="click">
                    <div>
                      <ul>
                        <li v-for="(item, index) in resultLog" :key="index">{{'项目:'+item.project_name+'(工作'+item.day_count+'天)'}}:{{formatShortDate(item.start_date)}}-{{formatShortDate(item.end_date)}}</li>
                      </ul>
                    </div>
                    <el-button slot="reference" type="text" @click="getLog(scope.row)">点击查询</el-button>
                  </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                width="120"
                prop="start_date"
                label="最后施工开始">
                <template slot-scope="scope">
                  <p>{{ (scope.row.start_date) ? formatShortDate(scope.row.start_date) : '空' }}</p>
                </template>
            </el-table-column>
            <el-table-column
                width="120"
                prop="last_date_array"
                label="施工日期">
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
            <el-table-column
                width="120"
                prop="end_date"
                label="最后施工截至">
                <template slot-scope="scope">
                  <p>{{ (scope.row.end_date) ? formatShortDate(scope.row.end_date) : '空' }}</p>
                </template>
            </el-table-column>

        </el-table>
    </div>
    <div class="m-2">
      <el-button class="w-100" @click="onUpd" type="primary" >添加所选人员名单</el-button>
    </div>
    <div class="mt-4">
      <span>当前已选择 <b>{{ multipleSelection.length }}</b> 人</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'job',
  data () {
    return {
      tableData: [],
      job_value: null,
      jobData: [],
      multipleSelection: [],
      resultLog: null,
      checkStatus: false,
      autoCheckUp: {
        autoStatus: false,
        workCount: 0,
        currNumber: 0
      }
    }
  },
  watch: {
    job_value (newVal) {
      if (newVal) {
        this.getSelectHrList(newVal)
      }
    },
    checkStatus (newVal) {
      if (!newVal) {
        if (this.autoCheckUp.autoStatus) {
          if (this.autoCheckUp.currNumber < this.autoCheckUp.workCount - 1) {
            this.autoCheckUp.currNumber += 1
            this.getLog(this.tableData[this.autoCheckUp.currNumber])
          } else {
            this.autoCheckUp.autoStatus = false
          }
        }
      }
    }
  },
  props: ['dataSource', 'show', 'start_date', 'end_date'],
  methods: {
    init () {
      this.getSelectHrList()
      this.getJobList()
    },
    getSelectHrList (jobNo) {
      if (!jobNo) {
        // 如果工种不为空的话，在查询后置为空
        this.job_value = null
      }
      this.ipcRenderer.send('getSelectHrList', jobNo)
      this.ipcRenderer.once('getSelectHrList', (event, res) => {
        this.tableData = res
        console.log('getSelectHrList', res)
        this.autoCheckUp.workCount = res.length
      })
    },
    getJobList () {
      this.ipcRenderer.send('getJobList')
      this.ipcRenderer.once('getJobList', (event, res) => {
        this.jobData = res
      })
    },
    getLog (row) {
      this.checkStatus = true
      this.ipcRenderer.send('getHrWorkLog', row.id_number)
      this.ipcRenderer.once('getHrWorkLog', (event, res) => {
        console.log('getHrWorkLog', res)
        // 输出日志
        this.resultLog = res
        if (res.length > 0) {
          row.eligible = true
          // 循环检测
          res.forEach(element => {
            if (!this.dateCheck(element.start_date, element.end_date)) {
              // 检测到冲突状态置为否
              row.eligible = false
            }
          })
          // 工人可用的话添加选中标记
          if (row.eligible) {
            this.toggleSelection(row, true)
            console.log('复选', row)
          }
        } else {
          // 没有施工记录的人员直接标记为可用并选中
          row.eligible = true
          this.toggleSelection(row, true)
          console.log('选中', row)
        }
        this.checkStatus = false
      })
    },
    dateCheck (istart, iend) {
      // 项目开始日期
      let thisStart = new Date(this.start_date).getTime()
      // 项目结束日期
      let thisEnd = new Date(this.end_date).getTime()
      // 工作开始日期
      istart = new Date(istart).getTime()
      // 工作结束日期
      iend = new Date(iend).getTime()
      // 判断工作开始时间是不是在项目日期内，是的话日期有冲突 && 判断工作结束日期是不是在项目日期内，是的话日期有冲突
      // 1.判断工作开始日期有没有在其他项目工期内
      if (thisStart <= istart && istart <= thisEnd) {
        console.log(this.formatShortDate(istart) + '-' + this.formatShortDate(iend) + '冲突，工作开始日期正在进行其他项目，dateCheck')
        console.log(this.formatShortDate(thisStart), this.formatShortDate(thisEnd), this.formatShortDate(istart), this.formatShortDate(iend))
        return false
      } else if (thisStart <= iend && iend <= thisEnd) {
        console.log(this.formatShortDate(istart) + '-' + this.formatShortDate(iend) + '冲突，工作结束日期正在进行其他项目，dateCheck')
        console.log(this.formatShortDate(thisStart), this.formatShortDate(thisEnd), this.formatShortDate(istart), this.formatShortDate(iend))
        return false
      } else {
        console.log(this.formatShortDate(istart) + '-' + this.formatShortDate(iend) + '日期允许，dateCheck')
        console.log(this.formatShortDate(thisStart), this.formatShortDate(thisEnd), this.formatShortDate(istart), this.formatShortDate(iend))
        return true
      }
    },
    dateAnalysis () {
      if (this.autoCheckUp.autoStatus) {
        this.autoCheckUp.autoStatus = false
      } else {
        this.autoCheckUp.autoStatus = true
        // this.autoCheckUp.workCount = this.tableData.length
        this.autoCheckUp.currNumber = 0
        this.getLog(this.tableData[0])
      }
    },
    toggleSelection (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onUpd () {
      // this.dataSource = this.multipleSelection
      this.$emit('update:dataSource', [...this.dataSource, ...this.multipleSelection])
      this.$emit('update:show', false)
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () { }
}
</script>
