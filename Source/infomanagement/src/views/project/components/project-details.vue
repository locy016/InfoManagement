<template>
  <div class="project-details">
    <!-- <h1>{{ itemData.project_name }}</h1> -->
    <div class="m-4">
        <el-row :gutter="10">
            <el-col :span="8">
                <label for="">项目编号</label>
                <h3>{{ itemData.project_no }}</h3>
            </el-col>
            <el-col :span="8">
                <label for="">项目名称</label>
                <h3>{{ itemData.project_name }}</h3>
            </el-col>
            <el-col :span="8">
                <label for="">项目地点</label>
                <h3>{{ itemData.project_address }}</h3>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8">
                <label for="">承包范围</label>
                <h3>{{ itemData.project_range }}</h3>
            </el-col>
            <el-col :span="8">
                <label for="">施工单位</label>
                <h3>{{ itemData.construction_unit }}</h3>
            </el-col>
            <el-col :span="8">
                <label for="">建设单位</label>
                <h3>{{ itemData.employer_unit }}</h3>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8">
                <label for="">工程价款</label>
                <h3>￥{{ itemData.project_price }}</h3>
            </el-col>
            <el-col :span="8">
                <label for="">工程税点</label>
                <h3>{{ itemData.tax_rate }}% <small>(￥{{ itemData.project_price*itemData.tax_rate/100 }})</small> </h3>
            </el-col>
            <el-col :span="8">
                <label for="">项目周期</label>
                <h3>{{ formatShortDate(itemData.start_date) }} 至 {{ formatShortDate(itemData.end_date) }} 止</h3>
            </el-col>
        </el-row>
    </div>
    <div class="m-4" v-if="itemData.details">
        <h3>共{{ itemData.details.length }}人参与施工</h3>
    </div>
    <template>
        <el-table
        :data="itemData.details"
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
                width="170"
                prop="id_number"
                label="身份证号">
            </el-table-column>
            <el-table-column
                width="170"
                prop="mobile_phone"
                label="电话号码">
            </el-table-column>
            <el-table-column
                width="170"
                prop="address"
                label="住址">
            </el-table-column>
            <el-table-column
                width="170"
                prop="bank_of_deposit"
                label="开户行">
                <template slot-scope="scope">
                    <span class="text-overflow">{{ scope.row.bank_of_deposit }}</span>
                </template>
            </el-table-column>
            <el-table-column
                width="180"
                prop="bank_account"
                label="账号">
            </el-table-column>
            <el-table-column
                prop="wages"
                label="工资">
            </el-table-column>
            <el-table-column
            width="120"
            prop="date_array"
            label="施工日期">
            <template slot-scope="scope">
                {{ JSON.parse('[' + scope.row.date_array + ']').length }}天
                <el-tooltip class="item" effect="dark" :content="scope.row.date_array" placement="left">
                    <div slot="content">
                    <p for="" v-for="(item, index) in JSON.parse('[' + scope.row.date_array + ']')" :key="index">
                        {{ formatShortDate(item) }}
                    </p>
                    </div>
                    <i class="el-icon-info"></i>
                </el-tooltip>
            </template>
        </el-table-column>
            <el-table-column
                prop="day_count"
                label="施工时长">
            </el-table-column>
        </el-table>
    </template>
    <div class="mt-4">
        <el-button class="w-100" type="primary" @click="outExcel()" >导出施工人员名单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'project-details',
  data () {
    return {

    }
  },
  props: {
    itemData: Object
  },
  methods: {
      outExcel () {
          this.ipcRenderer.send('outExcel', this.itemData)
      }
  }
}
</script>
