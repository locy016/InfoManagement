<template>
  <div class="hr">
    <h1>人员信息管理</h1>

    <div class="w-100">
      <div class="m-4">
        <el-button @click="addBtn()" plain round><b>添加人员信息</b></el-button>
        <el-button @click="importBtn()" plain round><b>导入人员数据</b></el-button>
      </div>
    </div>

    <div class="m-4">
      <el-input placeholder="关键词" class="w-50" icon="search" v-model="schfilter">
        <template slot="prepend">搜索</template>
        <el-button slot="append" @click="getHrListBySearch()" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <div class="w-100">
      <div class="m-4">
        <span class="job-box" @click="getHrList">
          <small>查看全部</small>
        </span>
        <span class="job-box" v-for="(item, index) in jobData" :key="index">
          <small @click="getHrListByJobNo(item.job_no)">{{ item.job_name }} ({{ item.job_count }}人)</small>
        </span>
      </div>
    </div>

    <div class="pt-4 w-100">
      <small>人资信息查询结果，共有 <b>{{ tableData.length }}</b> 条记录</small>
    </div>

    <div class="w-100">
      <div class="m-4">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column sortable prop="real_name" label="姓名">
          </el-table-column>
          <el-table-column width="110" prop="mobile_phone" label="电话">
          </el-table-column>
          <el-table-column prop="id_number" label="性别">
            <template slot-scope="scope">
              {{ scope.row.id_number.substr(16, 1) % 2 === 1 ? "男" : "女" }}
            </template>
          </el-table-column>
          <el-table-column prop="id_number" label="年龄">
            <template slot-scope="scope">
              <span
                :class="
                  calculateAge(scope.row.id_number.substr(6, 8)) >= 60
                    ? 'color-red'
                    : ''
                "
              >
                {{ calculateAge(scope.row.id_number.substr(6, 8)) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column width="170" prop="id_number" label="身份证号">
          </el-table-column>
          <el-table-column sortable width="90" prop="job_name" label="工种">
          </el-table-column>
          <el-table-column sortable prop="level_name" label="级别">
          </el-table-column>
          <el-table-column prop="address" label="住址">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  <label for="">{{ scope.row.address }}</label>
                </div>
                <i class="el-icon-view"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="bank_of_deposit" label="开户行">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  <label for="">{{ scope.row.bank_of_deposit }}</label>
                </div>
                <i class="el-icon-view"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="bank_account" label="银行卡号">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  <label for="">{{ scope.row.bank_account }}</label>
                </div>
                <i class="el-icon-view"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'job',
  data () {
    return {
      tableData: [],
      jobData: [],
      schfilter: null
    }
  },
  watch: {
    schfilter: function (val, oldval) {

    }
  },
  methods: {
    init () {
      this.getHrList()
      this.getJobCount()
    },
    addBtn () {
      this.$router.push('/hr-add')
    },
    importBtn () {
      this.$router.push('/hr-import')
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
    getHrListBySearch () {
      this.ipcRenderer.send('getHrListBySearch', this.schfilter)
      this.ipcRenderer.once('getHrListBySearch', (event, res) => {
        console.log('getHrListBySearch', res)
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
    delClick (row) {}
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

<style scoped>
.job-box {
  margin: 1%;
  color: #979797;
}
</style>
