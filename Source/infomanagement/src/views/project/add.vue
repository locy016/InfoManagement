<template>
  <div class="add-project">
    <h1>录入派工单信息</h1>
    <el-card class="m-4">
      <el-form ref="form" :model="form" label-width="90px">
        <!-- 基本信息字段 -->
        <el-form-item label="合同编号">
          <el-input v-model="form.project_no"></el-input>
        </el-form-item>
        <el-form-item label="合同名称">
          <el-input v-model="form.project_name"></el-input>
        </el-form-item>
        <el-form-item label="施工日期">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.start_date" style="width: 45%;margin-right:5%"></el-date-picker>
          <el-date-picker type="date" placeholder="结束日期" v-model="form.end_date" style="width: 45%;margin-left:5%"></el-date-picker>
        </el-form-item>
        <!-- 以下字段暂时不用, 隐藏处理 -->
        <el-form-item v-show="false" label="项目地点">
          <el-input v-model="form.project_address"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="项目地点">
          <el-input v-model="form.project_address"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="承包范围">
          <el-input v-model="form.project_range"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="施工单位">
          <el-input v-model="form.construction_unit"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="建设单位">
          <el-input v-model="form.employer_unit"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="工程价款">
          <el-input type="number" v-model="form.project_price"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="税点">
          <el-input v-model="form.tax_rate"></el-input>
        </el-form-item>
        <!-- 以上字段暂时不用, 隐藏处理 -->
      </el-form>
    </el-card>
    <!-- 添加人员及已添加人员工种信息统计 -->
    <div class="m-4">
      <el-button class="w-100 btn-block" type="info" @click="selectHr()" icon="el-icon-circle-plus-outline" plain>
        <label for="">添加人员, 已选 {{ form.detailData.length }} 人</label>
        <label class="btn-block" type="primary" v-for="(value, key, index) in detailDataCount" :key="index" plain> {{ key }} {{ value }} 人</label>
      </el-button>
      <!-- <el-button class="btn-block" type="primary" v-for="(value, key, index) in detailDataCount" :key="index" plain> {{ key }} {{ value }} 人</el-button> -->
    </div>

    <el-card class="m-4">
      <div style="height:300px;overflow-y:auto;">
        <el-table border :data="form.detailData" style="width: 100%">
          <el-table-column prop="job_name" label="工种"></el-table-column>
          <el-table-column prop="real_name" label="姓名"></el-table-column>
          <el-table-column prop="id_number" label="性别">
              <template slot-scope="scope">
                {{ (scope.row.id_number.substr(16,1) % 2 === 1) ? '男' : '女' }}
              </template>
          </el-table-column>
          <el-table-column prop="id_number" label="年龄">
              <template slot-scope="scope">
                {{ calculateAge(scope.row.id_number.substr(6,8)) }}
              </template>
          </el-table-column>
          <el-table-column width="170" prop="id_number" label="身份证号"></el-table-column>
          <el-table-column prop="pay" label="工资/天"></el-table-column>
          <el-table-column width="220" prop="date_array" label="施工日期">
              <template slot="header">
                <label for="">施工日期</label>
              </template>
              <template slot-scope="scope">
                <el-date-picker type="dates" style="width:200px;" v-model="scope.row.date_array" placeholder="选择" @change="upCount(scope.row)" value-format="timestamp">
                </el-date-picker>
              </template>
          </el-table-column>
          <el-table-column width="100" prop="date_array" label="时长/天">
              <template slot-scope="scope">
                <el-input disabled :placeholder="(scope.row.date_array) ? scope.row.date_array.length : 0"></el-input><!-- v-model="scope.row.day_count" -->
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
    </el-card>

    <div>
      <div class="m-4">
        <el-switch v-model="unifiedDate.enable" class="mr-4" active-text=">>>" inactive-text="为人员统一设置施工日期"></el-switch>
        <el-date-picker
          type="dates"
          align="center"
          placeholder="施工日期"
          @change="upAllDate()"
          v-model="unifiedDate.customDate"
          value-format="timestamp">
        </el-date-picker>
      </div>
      <div class="m-4">
        <el-button type="primary" class="w-100" @click="onSubmit">立即创建</el-button>
      </div>
      <div class="m-4">
        <el-button type="text" @click="listBtn()">查看派工单管理</el-button>
      </div>
    </div>
    <el-dialog
      title="添加施工人员"
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
      dialogVisible: false,
      unifiedDate: {
        enable: false,
        customDate: []
      }
    }
  },
  watch: {
    'form.detailData': {
      handler (val) {
        // console.log('form.detailData', this.form.detailData)
        // 清空已计算的数值
        this.detailDataCount = {}
        // 循环判断，计算已选人员的工种统计信息
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
    upCount (row) {
      row.day_count = row.date_array.length
    },
    upAllDate () {
      this.form.detailData.forEach(element => {
        element.date_array = this.unifiedDate.customDate
        element.day_count = this.unifiedDate.customDate.length
      })
    },
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
.btn-block {
  height: 50px
}
</style>
