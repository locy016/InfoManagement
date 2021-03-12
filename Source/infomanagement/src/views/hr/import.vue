<template>
  <div class="hr-import">
    <h1>This is an hr import page</h1>

    <div class="m-4">
      <el-form ref="form" label-width="80px">
        <el-form-item label="选择表">
            <el-col :span="8">
                <el-button class="w-100" @click="getExcelInfo()">导入</el-button>
            </el-col>
            <el-col :span="16">
                <el-select v-model="sheet_index" placeholder="请选择数据表" class="w-100">
                    <el-option v-for="(item, index) in excel_info" :key="index" :label="item.name" :value="index"></el-option>
                </el-select>
            </el-col>
        </el-form-item>

        <el-form-item label="工种">
            <el-select v-model="job_no" placeholder="请选择工种" class="w-100">
                <el-option v-for="(item, index) in job_list" :key="index" :label="item.job_name" :value="item.job_no"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="级别">
            <el-select v-model="level" placeholder="请选择级别" class="w-100">
                <el-option v-for="(item, index) in hr_level" :key="index" :label="item.level_name" :value="item.level_no"></el-option>
            </el-select>
        </el-form-item>
        <template v-if="sheet_index !== null">
            <el-form-item label="姓名">
                <el-select v-model="field.real_name_index" placeholder="请选择姓名列" class="w-100">
                    <el-option v-for="(item, index) in excel_info[sheet_index].data[0]" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电话">
                <el-select v-model="field.mobile_phone_index" placeholder="请选择姓名列" class="w-100">
                    <el-option v-for="(item, index) in excel_info[sheet_index].data[0]" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-select v-model="field.id_number_index" placeholder="请选择姓名列" class="w-100">
                    <el-option v-for="(item, index) in excel_info[sheet_index].data[0]" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地址">
                <el-select v-model="field.address_index" placeholder="请选择姓名列" class="w-100">
                    <el-option v-for="(item, index) in excel_info[sheet_index].data[0]" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开户行">
                <el-select v-model="field.bank_of_deposit_index" placeholder="请选择姓名列" class="w-100">
                    <el-option v-for="(item, index) in excel_info[sheet_index].data[0]" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账号">
                <el-select v-model="field.bank_account_index" placeholder="请选择姓名列" class="w-100">
                    <el-option v-for="(item, index) in excel_info[sheet_index].data[0]" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
        </template>

        <el-form-item>
          <el-button type="primary" class="w-100" @click="onSubmit">数据导入</el-button>
        </el-form-item>

        <el-form-item>
            <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="output">
            </el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'hr-import',
  data () {
    return {
      job_list: [],
      hr_level: [],
      excel_info: [],
      sheet_index: null,
      field: {
        real_name_index: null,
        mobile_phone_index: null,
        id_number_index: null,
        address_index: null,
        bank_of_deposit_index: null,
        bank_account_index: null
      },
      job_no: null,
      level: null,
      output: null
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
    getExcelInfo () {
      this.ipcRenderer.send('getExcelInfo')
      this.ipcRenderer.once('getExcelInfo', (_event, res) => {
        this.$message.success('继续进行数据操作')
        console.log('getExcelInfo', res)
        this.excel_info = res
      })
    },
    onSubmit () {
      this.output += '数据准备导入...\r\n'
      this.output += '准备数据源' + this.excel_info[this.sheet_index].name + '\r\n'
      this.output += '准备导入数据' + this.excel_info[this.sheet_index].data.length + '条\r\n'
      this.output += '开始数据监听\r\n'
      this.ipcRenderer.on('addHr', (_event, res) => {
        this.output += '回执信息' + JSON.stringify(res) + '\r\n'
      })
      this.excel_info[this.sheet_index].data.forEach((element, index) => {
        if (index > 0) {
          let param = {
            real_name: element[this.field.real_name_index],
            mobile_phone: element[this.field.mobile_phone_index],
            id_number: element[this.field.id_number_index],
            address: element[this.field.address_index],
            bank_of_deposit: element[this.field.bank_of_deposit_index],
            bank_account: element[this.field.bank_account_index],
            job_no: this.job_no,
            level: this.level
          }
          this.output += '提交数据请求,第' + index + '条记录\r\n'
          this.output += JSON.stringify(param) + '\r\n'
          this.ipcRenderer.send('addHr', param)
        }
      })
      this.output += '操作完成，准备资源释放\r\n'
      // this.ipcRenderer.removeAllListeners('addHr')
      this.output += 'End'
      /* {
        real_name: '',
        mobile_phone: '',
        id_number: '',
        address: '',
        bank_of_deposit: '',
        bank_account: '',
        job_no: '',
        level: ''
      } */
      /* this.ipcRenderer.send('addHr', this.form)
      this.ipcRenderer.once('addHr', (_event, res) => {
        console.log('addHr', res)
        if (res === 20100) {
          this.$message.success('添加完成')
        } else {
          this.$message.error(res.msg)
        }
      }) */
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () { }
}
</script>
