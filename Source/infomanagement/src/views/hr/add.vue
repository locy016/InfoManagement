<template>
  <div class="add-hr">
    <h1>This is an add hr page</h1>
    <div class="m-4">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
            <el-input v-model="form.real_name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="form.mobile_phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-input v-model="form.id_number"></el-input>
        </el-form-item>
        <el-form-item label="住址">
            <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
            <el-input v-model="form.bank_of_deposit"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
            <el-input v-model="form.bank_account"></el-input>
        </el-form-item>
        <el-form-item label="工种">
            <el-select v-model="form.job_no" placeholder="请选择类型" class="w-100">
                <el-option v-for="(item, index) in job_list" :key="index" :label="item.job_name" :value="item.job_no"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="级别">
            <el-select v-model="form.level" placeholder="请选择类型" class="w-100">
                <el-option v-for="(item, index) in hr_level" :key="index" :label="item.level_name" :value="item.level_no"></el-option>
            </el-select>
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
  name: 'add-hr',
  data () {
    return {
      form: {
        real_name: '',
        mobile_phone: '',
        id_number: '',
        address: '',
        bank_of_deposit: '',
        bank_account: '',
        job_no: '',
        level: ''
      },
      job_list: [],
      hr_level: []
    }
  },
  components: {},
  methods: {
    init () {
      this.getJobList()
      this.getHrLevel()
    },
    getJobList () {
      this.ipcRenderer.send('getJobList')
      this.ipcRenderer.once('getJobList', (_event, res) => {
        console.log('getJobList', res)
        this.job_list = res
      })
    },
    getHrLevel () {
      this.ipcRenderer.send('getHrLevel')
      this.ipcRenderer.once('getHrLevel', (_event, res) => {
        console.log('getHrLevel', res)
        this.hr_level = res
      })
    },
    onSubmit () {
      this.ipcRenderer.send('addHr', this.form)
      this.ipcRenderer.once('addHr', (_event, res) => {
        console.log('addHr', res)
        if (res === 20100) {
          this.$message.success('添加完成')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () { }
}
</script>
