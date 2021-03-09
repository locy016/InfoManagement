<template>
  <div class="project-details">
    <!-- <h1>{{ itemData.project_name }}</h1> -->
    <el-form ref="form" label-width="80px">
        <el-form-item label="项目编号">
            <b>{{ itemData.project_no }}</b>
        </el-form-item>
        <el-form-item label="项目名称">
            <b>{{ itemData.project_name }}</b>
        </el-form-item>
        <el-form-item label="项目地点">
            <b>{{ itemData.project_address }}</b>
        </el-form-item>
        <el-form-item label="承包范围">
            <b>{{ itemData.project_range }}</b>
        </el-form-item>
        <el-form-item label="施工单位">
            <b>{{ itemData.construction_unit }}</b>
        </el-form-item>
        <el-form-item label="建设单位">
            <b>{{ itemData.employer_unit }}</b>
        </el-form-item>
        <el-form-item label="工程价款">
            <b>{{ itemData.project_price }}</b>
        </el-form-item>
        <el-form-item label="工程税点">
            <b>{{ itemData.tax_rate }}%</b>
        </el-form-item>
        <el-form-item label="项目周期">
            <b>{{ formatShortDate(itemData.start_date) }} 至 {{ formatShortDate(itemData.end_date) }} 止</b>
        </el-form-item>
        <el-form-item label="施工人员">
            <b>共{{ itemData.details.length }}人参与施工</b>
        </el-form-item>
    </el-form>
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
        <el-button class="w-100" >打印项目合同</el-button>
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
  }
}
</script>
