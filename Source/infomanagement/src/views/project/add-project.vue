<template>
  <div class="add-project">
    <h1>This is an add project page</h1>
    <div class="m-4">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="合同号">
            <el-input v-model="form.project_no"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
            <el-input v-model="form.project_name"></el-input>
        </el-form-item>
        <el-form-item label="项目地点">
            <el-input v-model="form.project_address"></el-input>
        </el-form-item>
        <el-form-item label="承包范围">
            <el-input v-model="form.project_range"></el-input>
        </el-form-item>
        <el-form-item label="施工单位">
            <el-input v-model="form.construction_unit"></el-input>
        </el-form-item>
        <el-form-item label="建设单位">
            <el-input v-model="form.employer_unit"></el-input>
        </el-form-item>
        <el-form-item label="工程价款">
            <el-input type="number" v-model="form.project_price"></el-input>
        </el-form-item>
        <el-form-item label="税点">
            <el-input v-model="form.tax_rate"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.start_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.end_date" style="width: 100%;"></el-date-picker>
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
        project_no: null,
        project_name: null,
        project_address: null,
        project_range: null,
        construction_unit: null,
        employer_unit: null,
        project_price: 0,
        tax_rate: 0,
        start_date: null,
        end_date: null,
        detail: []
      }
    }
  },
  components: {},
  methods: {
    init () {},
    onSubmit () {
      this.ipcRenderer.send('addProject', this.form)
      this.ipcRenderer.on('addProject', (_event, res) => {
        console.log('addProject', res)
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
    this.ipcRenderer.removeAllListeners('addProject')
  }
}
</script>
