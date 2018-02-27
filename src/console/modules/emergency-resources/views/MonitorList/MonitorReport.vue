<template>
<console-page-layout :title="totalIp" class="csMonitorReoprt">
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
      </el-col>
    </el-row>
  </div>
  <div class="monitorReoprt">
    <div class="margin_20 marginCharts">
      <el-row :gutter="20">
        <el-col :span="18" class="chartsBoder">
          <div class="charts" id="usedAvailability"></div>
        </el-col>
        <el-col :span="6" class="chartsBoder">
          <div class="charts" id="failureRate"></div>
        </el-col>
      </el-row>
    </div>
    <ComboTable :total="monitorTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getDNSLog" @on-current-change="getDNSLog">
      <div slot="body">
        <div class="margin_20 margin_btm_40">
          <div class="monitorTitle">
            <h3>联动DNS记录日志</h3></div>
          <el-table :data="dnsLog" element-loading-text="拼命加载中" fit style="width: 100%">
            <el-table-column prop="alert_info.down_time" label="宕机时间" align="left" width="250"></el-table-column>
            <el-table-column prop="record_domain" label="域名" align="left" width="250" class="domainTdWidth"></el-table-column>
            <el-table-column prop="" label="记录类型/线路类型" align="left">
              <template scope="scope">
              <span>{{scope.row.record_type}} / {{scope.row.record_view}}</span>
            </template>
            </el-table-column>
            <el-table-column prop="alert_info.down_operate" label="宕机联动"></el-table-column>
            <el-table-column prop="alert_info.resume_time" label="恢复时间"></el-table-column>
            <el-table-column prop="" label="恢复处理">
              <template scope="scope">
              <span v-if="scope.row.alert_info.resume_operate === ''">暂未恢复</span>
              <span v-else>{{scope.row.alert_info.resume_operate}}</span>
            </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </ComboTable>
  </div>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import DateSelection from 'common/components/DateSelect/date-selection'
import ComboTable from 'common/components/ComboTable/ComboTable'
import Echarts from 'echarts'
import EchartsLine from 'echarts/lib/chart/line'
import SourceMonitorResource from '../../resource/SourceMonitorResource'

export default {
  components: {
    DateSelection,
    ComboTable,
    Echarts,
    ConsolePageLayout
  },
  computed: {
    totalIp: {
      get() {
        return '统计报表' + '(' + window.localStorage.getItem('monitorReportip') + ')'
      }
    }
  },
  data() {
    return {
      startTimevalue: '',
      endTimevalue: '',
      dnsLog: [],
      availabilityReoprtX: [],
      availabilityReoprtY: [],
      availabilityReoprtUnit: '',
      failure: '',
      success: '',
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      monitorTotal: 0
    }
  },
  created() {},
  methods: {
    getDNSLog(current, size) {
      this.linkageLogDns({
        task_id: window.localStorage.monitorReportid,
        page: current,
        per_page: size
      })
    },
    consoleTimeValue(startTimevalue, endTimevalue) {
      this.startTimevalue = startTimevalue
      this.endTimevalue = endTimevalue
      const data = {
        task_id: window.localStorage.monitorReportid,
        start_time: this.startTimevalue,
        end_time: this.endTimevalue
      }
      const params = {
        task_id: window.localStorage.monitorReportid,
        start_time: this.startTimevalue,
        end_time: this.endTimevalue,
        page: 1,
        per_page: 5
      }
      this.availabilityReoprt(data)
      this.failurerateReoprt(data)
      this.linkageLogDns(params)
    },
    drawUsedAvailability() {
      this.usedAvailabilityChart = Echarts.init(document.getElementById('usedAvailability'))
      this.usedAvailabilityChart.setOption({
        title: {
          left: 'left',
          text: '可用率统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.availabilityReoprtX
        }],
        yAxis: [{
          name: '单位: ' + this.availabilityReoprtUnit,
          type: 'value'
        }],
        series: [{
          name: '可用率',
          type: 'line',
          stack: '总量',
          itemStyle: {
            normal: {
              color: '#2d90e6',
              lineStyle: {
                color: '#2d90e6'
              }
            }
          },
          data: this.availabilityReoprtY
        }]
      })
    },
    drawFailureRate() {
      this.failureRateChart = Echarts.init(document.getElementById('failureRate'))
      this.failureRateChart.setOption({
        title: {
          left: 'left',
          text: '故障率汇总'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          top: 30,
          data: ['不可用', '可用']
        },
        color: ['#ff1a1a', '#2d90e6'],
        series: [{
          name: '故障率汇总',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          data: [{
              value: this.failure,
              name: '不可用'
            },
            {
              value: this.success,
              name: '可用'
            }
          ]
        }]
      })
    },
    availabilityReoprt(params) {
      SourceMonitorResource.availabilityReoprt(params).then(response => {
        if (response.data.status.code = 1 && response.data.data) {
          const data = response.data.data
          this.availabilityReoprtX = data.trend.x_data
          this.availabilityReoprtY = data.trend.y_data.data
          this.availabilityReoprtUnit = data.trend.y_data.unit
          this.drawUsedAvailability()
        }
      })
    },
    failurerateReoprt(params) {
      SourceMonitorResource.failurerateReoprt(params).then(response => {
        if (response.data.status.code = 1 && response.data.data) {
          const data = response.data.data
          this.failure = data.failure
          this.success = data.success
          this.drawFailureRate()
        }
      })
    },
    linkageLogDns(params) {
      SourceMonitorResource.linkageLogDns(params).then(response => {
        if (response.data.status.code = 1 && response.data.data) {
          const data = response.data.data
          this.dnsLog = []
          this.dnsLog = data.list
          this.monitorTotal = parseInt(data.total, 10)
        }
      })
    }
  },
  mounted() {}
}
</script>

<style lang="css">
.charts {
  width: 100%;
  height: 350px;
}

.monitorTitle {
  line-height: 40px;
}

.margin_20 {
  margin-top: 20px;
}

.margin_btm_40 {
  margin-bottom: 40px;
}

.csMonitorReoprt .page-body {
  background: #f7f7f7;
}

.monitorReoprt .marginCharts {
  margin: 12px;
  /*background: #fff;*/
}

.monitorReoprt .charts {
  margin: 10px;
}

.monitorReoprt .chartsBoder {
  border: 1px solid #ccc;
  background: #fff;
}
</style>
