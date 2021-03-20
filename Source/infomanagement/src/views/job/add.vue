<template>
  <div class="add-job">
    <h1>This is an add job page</h1>
    <div class="m-4 p-4">
      <el-row>
        <el-col :span="4">
          <label for="">类型</label>
        </el-col>
        <el-col :span="20">
          <el-select v-model="form.type_no" placeholder="请选择类型" class="w-100">
              <el-option v-for="(item, index) in job_type_list" :key="index" :label="item.type_name" :value="item.type_no"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="4">
          <label for="">编号</label>
        </el-col>
        <el-col :span="8">
          <el-input v-model="form.job_no"></el-input>
        </el-col>
        <el-col :span="4">
          <label for="">工种</label>
        </el-col>
        <el-col :span="8">
          <el-input v-model="form.job_name"></el-input>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="4">
          <label for="">工期</label>
        </el-col>
        <el-col :span="8">
          <el-input v-model="form.schedule"></el-input>
        </el-col>
        <el-col :span="4">
          <label for="">工资</label>
        </el-col>
        <el-col :span="8">
          <el-input v-model="form.pay"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="m-4">
      <el-button type="primary" class="w-100" @click="onSubmit">立即创建</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'add-job',
  data () {
    return {
      form: {
        job_no: '',
        job_name: '',
        type_no: '',
        schedule: '',
        pay: 0
      },
      job_type_list: []
    }
  },
  components: {},
  methods: {
    init () {
      this.ipcRenderer.send('getJobTypeList')
      this.ipcRenderer.on('getJobTypeList', (_event, res) => {
        console.log('getJobTypeList', res)
        this.job_type_list = res
      })
    },
    onSubmit () {
      this.ipcRenderer.send('addJob', this.form)
      this.ipcRenderer.on('addJob', (_event, res) => {
        console.log('addJob', res)
        if (JSON.stringify(res) === '{}') {
          this.$message.success('添加完成')
        } else {
          this.$message.error(res)
        }
      })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.ipcRenderer.removeAllListeners('getJobTypeList')
    this.ipcRenderer.removeAllListeners('addJob')
  }
}
</script>
