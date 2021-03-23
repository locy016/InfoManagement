<template>
  <div class="home">
    <h1>处理中心</h1>

    <div class="m-4" v-if="false">
      <div class="m-4">
        <el-alert :title="info.software_name" :close-text="info.version_number"></el-alert>
      </div>
    </div>

    <div class="m-4 p-4">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" class="text-left border-primary">
            <div style="padding: 14px;">
              <span>已收录人资信息</span>
              <div class="bottom clearfix">
                <div class="memo">{{ tableData.length }}条</div>
                <el-button type="text" class="button" @click="hrBtn()">查看</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6" v-for="(item, index) in jobData" :key="index">
          <el-card :body-style="{ padding: '0px' }" class="text-left">
            <div style="padding: 14px;">
              <span>{{ item.job_name }}信息</span>
              <div class="bottom clearfix">
                <div class="memo">{{ item.job_count }}条</div>
                <el-button type="text" class="button">.</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="m-4 p-4">
      <el-button class="w-100" style="height:100px" type="primary" @click="prBtn()" plain>创建一个新的项目派工单</el-button>
    </div>
    <div>
      <el-button type="text"  @click="plBtn()">查看项目列表</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      info: {},
      tableData: [],
      jobData: []
    }
  },
  methods: {
    init () {
      this.ipcRenderer.send('getBaseInfo')
      this.ipcRenderer.once('getBaseInfo', (event, res) => {
        console.log('getBaseInfo', res)
        this.info = res
      })
      this.getHrList()
      this.getJobCount()
    },
    hrBtn () {
      this.$router.push('/hr-list')
    },
    prBtn () {
      this.$router.push('/project-add')
    },
    plBtn () {
      this.$router.push('/project-list')
    },
    getHrList () {
      this.ipcRenderer.send('getHrList')
      this.ipcRenderer.once('getHrList', (event, res) => {
        console.log('getHrList', res)
        this.tableData = res
      })
    },
    getJobCount () {
      this.ipcRenderer.send('getJobCount')
      this.ipcRenderer.once('getJobCount', (event, res) => {
        console.log('getJobCount', res)
        this.jobData = res
      })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () { }
}
</script>

<style scoped>
.memo {
    font-size: 13px;
    color: #999;
  }

.bottom {
    margin-top: 13px;
    line-height: 12px;
  }

.button {
    padding: 0;
    float: right;
  }

.image {
    width: 100%;
    min-height: 100px;
    display: block;
  }

.clearfix:before,
.clearfix:after {
      display: table;
      content: "";
  }

.clearfix:after {
      clear: both
  }
.border-primary {
  border: 1px solid rgba(130, 180, 255,0.5);
}
</style>
