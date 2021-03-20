<template>
  <div class="job">
    <!-- <h1>This is an select hr page</h1> -->
    <div class="m-0">
      <el-row :gutter="10">
        <el-col :span="2">
          <el-button class="w-100" @click="getSelectHrList()">全部</el-button>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="8">
          <el-button class="w-100" type="primary" @click="dateAnalysis()" plain>工期分析</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="mt-2" style="height:350px;overflow-y:auto">
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
                label="最后施工">
                <template slot-scope="scope">
                  <p>{{ (scope.row.create_time) ? formatShortDate(scope.row.create_time) : '空' }}</p>
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
                label="结束时间">
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
      resultLog: null
    }
  },
  watch: {
    job_value (newVal) {
      if (newVal) {
        this.getSelectHrList(newVal)
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
      this.ipcRenderer.send('getSelectHrList', jobNo)
      this.ipcRenderer.once('getSelectHrList', (event, res) => {
        this.tableData = res
      })
    },
    getJobList () {
      this.ipcRenderer.send('getJobList')
      this.ipcRenderer.once('getJobList', (event, res) => {
        console.log('getJobList', res)
        this.jobData = res
      })
    },
    getLog (row) {
      this.ipcRenderer.send('getHrWorkLog', row.id_number)
      this.ipcRenderer.once('getHrWorkLog', (event, res) => {
        console.log('getHrWorkLog', res)
        this.resultLog = res
        if (res.length > 0) {
          res.forEach(element => {
            if (this.dateCheck(this.start_date, this.end_date, element.start_date, element.end_date)) {
              row.eligible = false
            }
          })
        } else {
          row.eligible = true
        }
      })
    },
    dateCheck (start, end, istart, iend) {
      // 项目开始日期
      start = new Date(start).getTime()
      // 项目结束日期
      end = new Date(end).getTime()
      // 工作开始日期
      istart = new Date(istart).getTime()
      // 工作结束日期
      iend = new Date(iend).getTime()
      // 判断工作开始时间是不是在项目日期内，是的话日期有冲突 && 判断工作结束日期是不是在项目日期内，是的话日期有冲突
      if ((start >= istart && start <= iend) || (end >= istart && end <= iend)) {
        console.log(this.formatShortDate(istart) + '-' + this.formatShortDate(iend) + '日期冲突，dateCheck', start, end, istart, iend)
        return false
      } else {
        console.log(this.formatShortDate(istart) + '-' + this.formatShortDate(iend) + '日期允许，dateCheck', start, end, istart, iend)
        return true
      }
    },
    dateAnalysis () {

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
