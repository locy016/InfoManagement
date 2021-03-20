<template>
  <div class="project-list">
    <h1>这里列出了所有的已保存项目</h1>
    <div class="m-4">
      <el-button type="info" class="w-100" @click="addBtn()">添加一个新的项目派工单</el-button>
    </div>
    <div class="m-4">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="project_no"
                label="合同号">
            </el-table-column>
            <el-table-column
                prop="project_name"
                label="项目名称">
            </el-table-column>
            <!-- <el-table-column
                prop="project_address"
                label="项目地点">
            </el-table-column> -->
            <el-table-column
                prop="project_range"
                label="承包范围">
            </el-table-column>
            <el-table-column
                prop="construction_unit"
                label="施工单位">
            </el-table-column>
            <el-table-column
                prop="employer_unit"
                label="建设单位">
            </el-table-column>
            <el-table-column
                prop="project_price"
                label="工程价款">
            </el-table-column>
            <el-table-column
                prop="tax_rate"
                label="税点">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="开始时间">
                <template slot-scope="scope">
                  <p>{{ formatShortDate(scope.row.start_date) }}</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="结束时间">
                <template slot-scope="scope">
                  <p>{{ formatShortDate(scope.row.end_date) }}</p>
                </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              label="查看"
              width="100">
              <template slot-scope="scope">
                <el-button @click="getProjectDetails(scope.row)" type="text" size="small">详情</el-button>
              </template>
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
    <el-dialog
      :title="'No.' + itemData.project_no"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :destroy-on-close="true"
      width="90%"
      top="5rem"
      close-on-click-modal
      close-on-press-escape
      show-close>
        <projectdetails v-if="dialogVisible" :itemData="itemData" :show.sync="dialogVisible"></projectdetails>
    </el-dialog>
  </div>
</template>

<script>
import projectdetails from './components/project-details.vue' // 查看详情
export default {
  name: 'hr-list',
  data () {
    return {
      tableData: [],
      itemData: [],
      dialogVisible: false
    }
  },
  components: { projectdetails },
  methods: {
    init () {
      this.getProjectList()
    },
    addBtn () {
      this.$router.push('/project-add')
    },
    getProjectList () {
      this.ipcRenderer.send('getProjectList')
      this.ipcRenderer.once('getProjectList', (event, res) => {
        this.tableData = res
      })
    },
    getProjectDetails (row) {
      this.ipcRenderer.send('getProjectDetails', row.project_no)
      this.ipcRenderer.once('getProjectDetails', (event, res) => {
        this.dialogVisible = true
        this.itemData = row
        this.itemData.details = res
      })
    },
    delClick (row) {
      this.ipcRenderer.send('delProject', row)
      this.ipcRenderer.once('delProject', (event, res) => {
        this.init()
      })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () { }
}
</script>
