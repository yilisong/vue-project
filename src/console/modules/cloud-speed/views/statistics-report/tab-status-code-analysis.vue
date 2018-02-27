<template  lang="html">
<div>
  <div class="toolbar">
    <el-select v-model="selectValue" multiple filterable placeholder="默认所有域名" @change="changeDomain" @visible-change="searchInput($event)" id="searchInput_status_code">
      <el-option v-for="(item, index) in optionsList" :key="index" :label="item.domain" :value="item.domain"></el-option>
    </el-select>
    <span class="select-cunt-text">已选：<span class="select-cunt">{{ selectLength }}</span></span>
    <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
  </div>

  <div>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :md="8" :lg="8">
        <div class="grid-content bg-purple" v-loading="codeStatusLoading">
          <div class="traffic">状态码总数</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ sumCountData }}</span>
            <span class="TrafficUnit">{{ sumCountUnit }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8">
        <div class="grid-content bg-purple-light" v-loading="codeStatusLoading">
          <div class="traffic">错误码总数</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ wrongSumData }}</span>
            <span class="TrafficUnit">{{ wrongSumUnit }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8">
        <div class="grid-content bg-purple" v-loading="codeStatusLoading">
          <div class="traffic">错误率</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ errorPercent }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
      <div class="datalist">状态码趋势</div>
      <div class="charts" id="statusCodeTrendCharts" v-loading="codeStatusLoading" element-loading-text="拼命加载中"></div>
    </div>
    <div class="status_table" id="fixedList">
      <div class="datalist">数据详细列表</div>
      <el-table :data="tableData" border style="width: 100%" height="600" v-loading="codeStatusTableLoading" element-loading-text="拼命加载中">
        <el-table-column fixed prop="date" label="时间段" width="180"></el-table-column>
        <el-table-column prop="sum_count" label="状态码总数" width="180"></el-table-column>
        <el-table-column prop="wrong_sum_count" label="错误码总数" width="180"></el-table-column>
        <el-table-column prop="2xx" label="2xx状态码" width="160"></el-table-column>
        <el-table-column prop="3xx" label="3xx状态码" width="160"></el-table-column>
        <el-table-column prop="4xx" label="4xx状态码" width="160"></el-table-column>
        <el-table-column prop="5xx" label="5xx状态码" width="160"></el-table-column>
        <el-table-column prop="403" label="403状态码" width="160"></el-table-column>
        <el-table-column prop="404" label="404状态码" width="160"></el-table-column>
        <el-table-column prop="500" label="500状态码" width="160"></el-table-column>
        <el-table-column prop="502" label="502状态码" width="160"></el-table-column>
        <el-table-column prop="504" label="504状态码" width="160"></el-table-column>
      </el-table>
    </div>
  </div>
</div>
</template>
<script>
import Echarts from 'echarts'
import EchartsLine from 'echarts/lib/chart/line'
import DateSelection from 'common/components/DateSelect/date-selection'

  export default {
    components: {
      DateSelection,
      Echarts
    },
    data() {
      return {
        selectLength: '全部',
        endTimevalue: '',
        startTimevalue: '',
        optionsList: '',
        selectValue: [],
        codeStatusLoading: true,
        codeStatusTableLoading: true,
        sumCountData: '',
        sumCountUnit: '',
        wrongSumData: '',
        wrongSumUnit: '',
        errorPercent: '',
        tableData: [],
        speedUpTrafficChart: null,
        wrongCodeStatusChartDataxAxis: [],
        wrongCodeStatusChartDataSeries: [],
        wrongCodeStatusChartDataSeriesUnit: '',
        fztCodeStatusChartDataxAxis: [],
        fztCodeStatusChartDataSeries: [],
        fztCodeStatusChartDataSeriesUnit: '',
        fzfCodeStatusChartDataxAxis: [],
        fzfCodeStatusChartDataSeries: [],
        fzfCodeStatusChartDataSeriesUnit: '',
        fivezfCodeStatusChartDataxAxis: [],
        fivezfCodeStatusChartDataSeries: [],
        fivezfCodeStatusChartDataSeriesUnit: '',
        fiveztCodeStatusChartDataxAxis: [],
        fiveztCodeStatusChartDataSeries: [],
        fiveztCodeStatusChartDataSeriesUnit: '',
        codeStatusChartDataxAxis: [],
        codeStatusChartDataSeries: [],
        codeStatusChartDataSeriesUnit: ''
      }
    },
    watch: {

    },
    created() {
      const params = { per_page:1000 }
      this.fetchGet('Web.Domain.list' , params).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data) {
              this.optionsList = res.data.list
            }
          })
        }
      }, e => {})
    },
    methods: {
      changeDomain() {
        this.codeStatusLoading = true
        this.codeStatusTableLoading = true
        const params = {
          sub_domain:this.selectValue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue
        }
        this.selectLength = this.selectValue.length
        this.fetchCodeStatus(params)
      },
      consoleTimeValue(startTimevalue, endTimevalue) {
        this.codeStatusLoading = true
        this.codeStatusTableLoading = true
        this.startTimevalue = startTimevalue
        this.endTimevalue = endTimevalue
        const params = {
          sub_domain:this.selectValue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue
        }
        this.fetchCodeStatus(params)
      },
      searchInput(ev) {
        const search = document.getElementById('searchInput_status_code')
        const searchInput = search.childNodes[0].childNodes[1]
        if (ev === true) {
          searchInput.style.display = 'block'
        } else {
          searchInput.style.display = 'none'
        }
      },
      statusCodeTrend() {
        if (!document.getElementById('statusCodeTrendCharts')) {
          return
        }
        this.speedUpTrafficChart = Echarts.init(document.getElementById('statusCodeTrendCharts'))
        this.speedUpTrafficChart.setOption({
          title: {
            subtext: '单位(' + this.codeStatusChartDataSeriesUnit + ')'
          },
          tooltip : {
            trigger: 'item',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            },
            formatter: '{a0}:{c0}' + this.codeStatusChartDataSeriesUnit
          },
          legend: {
            selected: {
              状态码总数: true,
              错误码总数: true,
              '403错误码': false,
              '404错误码': false,
              '502错误码': false,
              '504错误码': false
            },
            data:['状态码总数','错误码总数','403错误码','404错误码','502错误码','504错误码']
          },
          grid: {
            left: '1%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : this.codeStatusChartDataxAxis
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name: '状态码总数',
              type: 'line',
              itemStyle : {
                normal : {
                  color:'#0593e6',
                  lineStyle:{
                    color:'#0593e6'
                  }
                }
              },
              data: this.codeStatusChartDataSeries
            },{
              name: '错误码总数',
              type: 'line',
              itemStyle : {
                normal : {
                  color:'#afd4c3',
                  lineStyle:{
                    color:'#afd4c3'
                  }
                }
              },
              data: this.wrongCodeStatusChartDataSeries
            },{
              name: '403错误码',
              type: 'line',
              itemStyle : {
                normal : {
                  color:'#dda490',
                  lineStyle:{
                    color:'#dda490'
                  }
                }
              },
              data: this.fztCodeStatusChartDataSeries
            },{
              name: '404错误码',
              type: 'line',
              itemStyle : {
                normal : {
                  color:'#8db9be',
                  lineStyle:{
                    color:'#8db9be'
                  }
                }
              },
              data: this.fzfCodeStatusChartDataSeries
            },{
              name: '502错误码',
              type: 'line',
              itemStyle : {
                normal : {
                  color:'#6b7984',
                  lineStyle:{
                    color:'#6b7984'
                  }
                }
              },
              data: this.fiveztCodeStatusChartDataSeries
            },{
              name: '504错误码',
              type: 'line',
              itemStyle : {
                normal : {
                  color:'#d06e6b',
                  lineStyle:{
                    color:'#d06e6b'
                  }
                }
              },
              data: this.fivezfCodeStatusChartDataSeries
            }
          ]
        })
      },
      fetchCodeStatus(params) {
        // Web.Domain.Report.Code.stat
        this.fetchPost('Web.Domain.Report.Code.stat', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            this.codeStatusLoading = false
            this.sumCountData = res.data.total.sum_count.data
            this.sumCountUnit = res.data.total.sum_count.unit
            this.wrongSumData = res.data.total.wrong_sum_count.data
            this.wrongSumUnit = res.data.total.wrong_sum_count.unit
            this.errorPercent = res.data.total.wrong_percent + '%'
            /*charts  data*/
            /*数组为空或者不存在的时候 用0补全*/
            const emptyData = []
            let len
            if (res.data.total.sum_count.data) {
              len = res.data.trend.sum_count.x_data.length
            } else {
              len = 24
            }
            for (let i = 0; i < len; i++) {
              emptyData[i] = 0
            }
            /*状态码总数*/
            if (res.data.total.sum_count.data) {
              this.sumCountData = res.data.total.sum_count.data
              this.sumCountUnit = res.data.total.sum_count.unit
            } else {
              this.sumCountData = 0
              this.sumCountUnit = ''
            }
            if (res.data.trend.sum_count) {
              this.codeStatusChartDataSeriesUnit = res.data.trend.sum_count.y_data.unit ? res.data.trend.sum_count.y_data.unit : '次'
              this.codeStatusChartDataSeries = res.data.trend.sum_count.y_data.data
              this.codeStatusChartDataxAxis = res.data.trend.sum_count.x_data
            } else {
              this.codeStatusChartDataSeries = emptyData
            }
            /*错误码总数*/
            if (res.data.total.wrong_sum_count.data) {
              this.wrongSumData = res.data.total.wrong_sum_count.data
              this.wrongSumUnit = res.data.total.wrong_sum_count.unit
            } else {
              this.wrongSumData = 0
              this.wrongSumUnit = ''
            }
            if (res.data.trend.wrong_sum_count) {
              this.wrongCodeStatusChartDataSeries = res.data.trend.wrong_sum_count.y_data.data
              this.wrongCodeStatusChartDataxAxis = res.data.trend.wrong_sum_count.x_data
            } else {
              this.wrongCodeStatusChartDataSeries = emptyData
            }
            /*403错误码总数*/
            if (res.data.trend[403]) {
              this.fztCodeStatusChartDataSeriesUnit = res.data.trend[403].y_data.unit
              this.fztCodeStatusChartDataSeries = res.data.trend[403].y_data.data
              this.fztCodeStatusChartDataxAxis = res.data.trend[403].x_data
            } else {
              this.fztCodeStatusChartDataSeries = emptyData
            }
            /*404错误码总数*/
            if (res.data.trend[404]) {
              this.fzfCodeStatusChartDataSeriesUnit = res.data.trend[404].y_data.unit
              this.fzfCodeStatusChartDataSeries = res.data.trend[404].y_data.data
              this.fzfCodeStatusChartDataxAxis = res.data.trend[404].x_data
            } else {
              this.fzfCodeStatusChartDataSeries = emptyData
            }
            /*502错误码总数*/
            if (res.data.trend[502]) {
              this.fiveztCodeStatusChartDataSeriesUnit = res.data.trend[502].y_data.unit
              this.fiveztCodeStatusChartDataSeries = res.data.trend[502].y_data.data
              this.fiveztCodeStatusChartDataxAxis = res.data.trend[502].x_data
            } else {
              this.fiveztCodeStatusChartDataSeries = emptyData
            }
            /*504错误码总数*/
            if (res.data.trend[504]) {
              this.fivezfCodeStatusChartDataSeriesUnit = res.data.trend[504].y_data.unit
              this.fivezfCodeStatusChartDataSeries = res.data.trend[504].y_data.data
              this.fivezfCodeStatusChartDataxAxis = res.data.trend[504].x_data
            } else {
              this.fivezfCodeStatusChartDataSeries = emptyData
            }
          }
        })
        .then(res => {
          this.statusCodeTrend('statusCodeTrendCharts')
        })
         /*错误码分布统计详情   Web.Domain.Report.Code.statDetail*/
         this.fetchPost('Web.Domain.Report.Code.statDetail', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            this.codeStatusTableLoading = false
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].sum_count) {
                this.tableData.push(res.data[i].sum_count)
              } else {
                res.data[i].sum_count = 0
                this.tableData.push(res.data[i].sum_count)
              }
              if (res.data[i].wrong_sum_count) {
                this.tableData.push(res.data[i].wrong_sum_count)
              } else {
                res.data[i].wrong_sum_count = 0
                this.tableData.push(res.data[i].wrong_sum_count)
              }
              if (res.data[i]['2xx']) {
                this.tableData.push(res.data[i]['2xx'])
              } else {
                res.data[i]['2xx'] = 0
                this.tableData.push(res.data[i]['2xx'])
              }
              if (res.data[i]['3xx']) {
                this.tableData.push(res.data[i]['3xx'])
              } else {
                res.data[i]['3xx'] = 0
                this.tableData.push(res.data[i]['3xx'])
              }
              if (res.data[i]['4xx']) {
                this.tableData.push(res.data[i]['4xx'])
              } else {
                res.data[i]['4xx'] = 0
                this.tableData.push(res.data[i]['4xx'])
              }
              if (res.data[i]['5xx']) {
                this.tableData.push(res.data[i]['5xx'])
              } else {
                res.data[i]['5xx'] = 0
                this.tableData.push(res.data[i]['5xx'])
              }
               if (res.data[i]['403']) {
                this.tableData.push(res.data[i]['403'])
              } else {
                res.data[i]['403'] = 0
                this.tableData.push(res.data[i]['403'])
              }
               if (res.data[i]['404']) {
                this.tableData.push(res.data[i]['404'])
              } else {
                res.data[i]['404'] = 0
                this.tableData.push(res.data[i]['404'])
              }
               if (res.data[i]['500']) {
                this.tableData.push(res.data[i]['500'])
              } else {
                res.data[i]['500'] = 0
                this.tableData.push(res.data[i]['500'])
              }
               if (res.data[i]['502']) {
                this.tableData.push(res.data[i]['502'])
              } else {
                res.data[i]['502'] = 0
                this.tableData.push(res.data[i]['502'])
              }
              if (res.data[i]['504']) {
                this.tableData.push(res.data[i]['504'])
              } else {
                res.data[i]['504'] = 0
                this.tableData.push(res.data[i]['504'])
              }
            }
            this.tableData = res.data
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>
.marleft5{
  margin-left: 5%;
}
.charts{
  width: 100%;
  height: 450px;
}
.datalist{
  padding: 10px;
  margin-top: 20px;
}
</style>
<style>
#fixedList .el-table__body-wrapper{
  overflow: auto!important;
}
#fixedList .el-table .cell, #fixedList .el-table__footer-wrapper, #fixedList .el-table__header-wrapper {
    overflow: hidden!important;
}
.el-select {
  /*width: 300px!important;*/
}
@media (max-width: 1280px) {
  .el-select {
    /*width: 167px!important;*/
  }
}
@media (max-width: 1366px) {
  .el-select {
    /*width: 240px!important;*/
  }
}
</style>
