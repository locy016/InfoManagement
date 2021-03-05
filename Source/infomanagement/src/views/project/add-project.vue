<template>
  <div class="add-project">
    <h1>This is an add project page</h1>
    <div class="m-4">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="合同号">
          <el-col :span="10">
            <el-input v-model="form.project_no"></el-input>
          </el-col>
          <el-col :span="4">
            <label for="">项目名称</label>
          </el-col>
          <el-col :span="10">
             <el-input v-model="form.project_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="项目地点">
            <el-input v-model="form.project_address"></el-input>
        </el-form-item>
        <el-form-item label="承包范围">
            <el-input v-model="form.project_range"></el-input>
        </el-form-item>
        <el-form-item label="施工单位">
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
        <el-form-item label="工程价款">
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
        <el-form-item label="开始日期">
          <el-col :span="10">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.start_date" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="4">
            <label for="">结束日期</label>
          </el-col>
          <el-col :span="10">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.end_date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button class="w-100" @click="dialogVisible = true">选择人员</el-button>
        </el-form-item>

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="90%"
          style="height:600px;">
            <selecthr v-if="dialogVisible" :dataSource.sync="form.detailData" :show.sync="dialogVisible"></selecthr>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>

        <div class="mt-2">
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
                label="身份证号">
            </el-table-column>
            <el-table-column
                prop="pay"
                label="工资/天">
            </el-table-column>
            <el-table-column
                prop="date_array"
                label="施工日期">
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-form-item>
          <el-button type="primary" class="w-100" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import selecthr from './components/select-hr.vue' // 试卷树
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
        detailData: []
      },
      dialogVisible: false
    }
  },
  watch: {
    'form.detailData': {
      handler (val) {
        console.log('form.detailData', this.form.detailData)
      },
      deep: true
    }
  },
  components: { selecthr },
  methods: {
    init () {},
    delClick (row) {},
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
