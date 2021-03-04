<template>
  <div class="add-job">
    <h1>This is an add job page</h1>
    <div class="m-4">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="编号">
            <el-input v-model="form.job_no"></el-input>
        </el-form-item>
        <el-form-item label="工种">
            <el-input v-model="form.job_name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="form.type_no" placeholder="请选择类型" class="w-100">
                <el-option v-for="(item, index) in job_type_list" :key="index" :label="item.type_name" :value="item.type_no"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="工期">
            <el-input v-model="form.schedule"></el-input>
        </el-form-item>
        <el-form-item label="工资">
            <el-input v-model="form.pay"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
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
