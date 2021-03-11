<template>
  <div class="hr">
    <h1>This is an hr list page</h1>

    <el-row>
      <el-col :span="3">
        <div class="ml-4 text-left">
          <p>
            <small @click="getHrList"><b>全部</b></small>
          </p>
          <!-- <span>{{jobData}}</span> -->
        </div>
        <div class="ml-4 text-left">
          <p v-for="(item, index) in jobData" :key="index">
            <small @click="getHrListByJobNo(item.job_no)">{{item.job_name}} ({{item.job_count}})</small>
          </p>
          <!-- <span>{{jobData}}</span> -->
        </div>
      </el-col>
      <el-col :span="21">
        <div class="">
          <div class="ml-4 p-2 text-left">
            <small>人资信息查询结果，共有 <b>{{ tableData.length }}</b> 条记录</small>
          </div>
          <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                  sortable
                  prop="real_name"
                  label="姓名">
              </el-table-column>
              <el-table-column
                  width="110"
                  prop="mobile_phone"
                  label="电话">
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
                    <span :class="(calculateAge(scope.row.id_number.substr(6,8)) >= 60) ? 'color-red' : ''">
                      {{ calculateAge(scope.row.id_number.substr(6,8)) }}
                    </span>
                  </template>
              </el-table-column>
              <el-table-column
                  width="170"
                  prop="id_number"
                  label="身份证号">
              </el-table-column>
              <el-table-column
                  sortable
                  width="90"
                  prop="job_name"
                  label="工种">
              </el-table-column>
              <el-table-column
                  sortable
                  prop="level_name"
                  label="级别">
              </el-table-column>
              <el-table-column
                  prop="address"
                  label="住址">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        <label for="">{{ scope.row.address }}</label>
                      </div>
                      <i class="el-icon-view"></i>
                    </el-tooltip>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="bank_of_deposit"
                  label="开户行">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        <label for="">{{ scope.row.bank_of_deposit }}</label>
                      </div>
                      <i class="el-icon-view"></i>
                    </el-tooltip>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="bank_account"
                  label="银行卡号">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        <label for="">{{ scope.row.bank_account }}</label>
                      </div>
                      <i class="el-icon-view"></i>
                    </el-tooltip>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="create_time"
                  label="创建时间">
                  <template slot-scope="scope">
                    <p>{{ formatShortDate(scope.row.create_time) }}</p>
                  </template>
              </el-table-column>

              <!-- <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column> -->
          </el-table>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'job',
  data () {
    return {
      tableData: [],
      jobData: []
    }
  },
  methods: {
    init () {
      this.getHrList()
      this.getJobCount()
    },
    getHrList () {
      this.ipcRenderer.send('getHrList')
      this.ipcRenderer.once('getHrList', (event, res) => {
        console.log('getHrList', res)
        this.tableData = res
      })
    },
    getHrListByJobNo (jobNo) {
      this.ipcRenderer.send('getHrListByJobNo', jobNo)
      this.ipcRenderer.once('getHrListByJobNo', (event, res) => {
        console.log('getHrListByJobNo', res)
        this.tableData = res
      })
    },
    getJobCount () {
      this.ipcRenderer.send('getJobCount')
      this.ipcRenderer.once('getJobCount', (event, res) => {
        console.log('getJobCount', res)
        this.jobData = res
      })
    },
    delClick (row) {

    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    // this.ipcRenderer.removeAllListeners('getHrList')
    // this.ipcRenderer.removeAllListeners('getJobCount')
  }
}
</script>
