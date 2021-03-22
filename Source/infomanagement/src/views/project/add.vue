<template>
  <div class="add-project">
    <h1>添加一个新的项目派工单</h1>
    <div class="m-4">
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item>
          <el-col :span="2">
            <label for="">编号</label>
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.project_no"></el-input>
          </el-col>
          <el-col :span="2">
            <label for="">名称</label>
          </el-col>
          <el-col :span="4">
             <el-input v-model="form.project_name"></el-input>
          </el-col>
          <el-col :span="2">
            <label for="">开始日期</label>
          </el-col>
          <el-col :span="4">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.start_date" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="2">
            <label for="">结束日期</label>
          </el-col>
          <el-col :span="4">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.end_date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-divider content-position="center">人员操作</el-divider>

        <el-form-item v-show="false" label="项目地点">
            <el-input v-model="form.project_address"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="承包范围">
            <el-input v-model="form.project_range"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="施工单位">
          <el-col :span="10">
            <el-input v-model="form.construction_unit"></el-input>
          </el-col>
          <el-col :span="4">
            <label for="">建设单位</label>
          </el-col>
          <el-col :span="10">
            <el-input v-model="form.employer_unit"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-show="false" label="工程价款">
          <el-col :span="10">
            <el-input type="number" v-model="form.project_price"></el-input>
          </el-col>
          <el-col :span="4">
            <label for="">税点</label>
          </el-col>
          <el-col :span="9">
            <el-input v-model="form.tax_rate"></el-input>
          </el-col>
          <el-col :span="1">
            <label for="">%</label>
          </el-col>
        </el-form-item>

        <div class="m-4 p-4 text-left">
          <el-form-item>
            <el-button class="btn-block" type="info" @click="selectHr()" icon="el-icon-circle-plus-outline" plain>已选 {{ form.detailData.length }} 人</el-button>
            <el-button class="btn-block" type="primary" v-for="(value, key, index) in detailDataCount" :key="index" plain> {{ key }} {{ value }} 人</el-button>
          </el-form-item>
        </div>

        <el-divider content-position="center">人员列表</el-divider>

        <div class="m-4 p-4 ">
          <el-form-item>
          <el-table
            :data="form.detailData"
            style="width: 100%">
            <el-table-column
                prop="job_name"
                label="工种">
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
                width="170"
                prop="id_number"
                label="身份证号">
            </el-table-column>
            <el-table-column
                prop="pay"
                label="工资/天">
            </el-table-column>
            <el-table-column
                width="220"
                prop="date_array"
                label="施工日期">
                <template slot-scope="scope">
                  <el-date-picker
                    type="dates"
                    style="width:200px;"
                    v-model="scope.row.date_array"
                    placeholder="选择"
                    value-format="timestamp">
                  </el-date-picker>
                  <!-- {{ (scope.row.date_array) ? scope.row.date_array.length : 0 }} -->
                </template>
            </el-table-column>

            <el-table-column
                width="100"
                prop="date_array"
                label="时长/天">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.day_count" :placeholder="(scope.row.date_array) ? scope.row.date_array.length : 0"></el-input>
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
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" class="w-50" @click="onSubmit">立即创建</el-button>
          <el-button class="w-25" @click="listBtn()">工单管理</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="选择项目施工人员名单"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :destroy-on-close="true"
      width="90%"
      top="5rem"
      :fullscreen="true"
      close-on-click-modal
      close-on-press-escape
      show-close>
        <selecthr v-if="dialogVisible" :dataSource.sync="form.detailData" :show.sync="dialogVisible" :start_date="form.start_date" :end_date="form.end_date"></selecthr>
    </el-dialog>
  </div>
</template>

<script>
import selecthr from './components/select-hr.vue' // 选择人员
export default {
  name: 'add-job',
  data () {
    return {
      form: {
        project_no: null,
        project_name: null,
        project_address: '略',
        project_range: '略',
        construction_unit: '略',
        employer_unit: '略',
        project_price: 0,
        tax_rate: 0,
        start_date: null,
        end_date: null,
        detailData: []
      },
      detailDataCount: {},
      dialogVisible: false
    }
  },
  watch: {
    'form.detailData': {
      handler (val) {
        console.log('form.detailData', this.form.detailData)
        // 清空已计算的数值
        this.detailDataCount = {}
        // 循环判断
        this.form.detailData.forEach(item => {
          if (this.detailDataCount.hasOwnProperty(item.job_name) > 0) {
            this.detailDataCount[item.job_name] = this.detailDataCount[item.job_name] + 1
          } else {
            this.detailDataCount[item.job_name] = 1
          }
        })
      },
      deep: true
    }
  },
  components: { selecthr },
  methods: {
    init () {},
    listBtn () {
      this.$router.push('/project-list')
    },
    delClick (row) {},
    onSubmit () {
      let checkPassed = true

      try {
        this.form.detailData.forEach(element => {
          if (!element.date_array) {
            checkPassed = false
            // eslint-disable-next-line no-throw-literal
            throw element.real_name + '施工日期不能为空'
          }
          if (!element.day_count) {
            checkPassed = false
            // eslint-disable-next-line no-throw-literal
            throw element.real_name + '工作时长不能为空'
          }
        })
      } catch (e) {
        this.$message.error(e)
      }

      if (checkPassed) {
        this.ipcRenderer.send('addProject', this.form)
        this.ipcRenderer.once('addProject', (_event, res) => {
          console.log('addProject', res)
          if (JSON.stringify(res) === '{}') {
            this.$message.success('添加完成')
            this.$router.push('/project-list')
          } else {
            this.$message.error(res)
          }
        })
      }
    },
    selectHr () {
      if (!this.form.project_no) {
        this.$message.error('先输入项目编号')
        return
      }
      if (!this.form.project_name) {
        this.$message.error('先输入项目名称')
        return
      }
      if (!this.form.start_date) {
        this.$message.error('先选择项目开始日期')
        return
      }
      if (!this.form.end_date) {
        this.$message.error('先选择项目结束日期')
        return
      }
      this.dialogVisible = true
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () { }
}
</script>

<style scoped>
.btn-block{
  margin: 2;
  width: 12%;
  height: 50px;
  border-radius: 20px;
}
</style>
