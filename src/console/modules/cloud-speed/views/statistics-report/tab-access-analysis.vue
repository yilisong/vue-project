<template  lang="html">
<div>
  <div class="toolbar">
    <el-select v-model="selectValue" multiple filterable placeholder="默认所有域名" @change="changeDomain" @visible-change="searchInput($event)" id="searchInput_access">
      <el-option v-for="(item, index) in optionsList" :key="index" :label="item.domain" :value="item.domain"></el-option>
    </el-select>
    <span class="select-cunt-text">已选：<span class="select-cunt">{{ selectLength }}</span></span>
    <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
  </div>
  <div>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <div class="grid-content bg-purple" v-loading="numberOfRequestsLoading">
          <div class="traffic">总请求数</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ numberOfRequestsValue }}</span>
            <span class="TrafficUnit">{{ numberOfRequestsUnit }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <div class="grid-content bg-purple-light" v-loading="accelerateNumberOfRequestsLoading">
          <div class="traffic">加速请求数</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ accelerateNumberOfRequestsValue }}</span>
            <span class="TrafficUnit">{{ accelerateNumberOfRequestsUnit }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <div class="grid-content bg-purple" v-loading="independentIPTrendLoading">
          <div class="traffic">独立IP个数</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ independentIPTrendValue }}</span>
            <span class="TrafficUnit">{{ independentIPTrendUnit }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <div class="grid-content bg-purple"  v-loading="pageViewsLoading">
          <div class="traffic">页面浏览量</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ pageViewsValue }}</span>
            <span class="TrafficUnit">{{ pageViewsUnit }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
      <div class="datalist">请求数趋势</div>
      <div class="charts" id="numberOfRequestsTrendCharts" v-loading="numberOfRequestsLoading"></div>
    </div>
    <div>
      <div class="datalist">独立IP趋势</div>
      <div class="charts" id="independentIPTrendCharts" v-loading="independentIPTrendLoading"></div>
    </div>
    <div>
      <div class="datalist">页面浏览量趋势</div>
      <div class="charts" id="pageViewsTrendCharts" v-loading="pageViewsLoading"></div>
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
        /*loading 效果 开始*/
        numberOfRequestsLoading: true,
        pageViewsLoading: true,
        independentIPTrendLoading: true,
        accelerateNumberOfRequestsLoading: true,
        /*loading 效果 结束*/
        speedUpTrafficChart: null,
        backSourceTrafficChart: null,
        numberOfRequestsValue: '',
        numberOfRequestsUnit: '',
        accelerateNumberOfRequestsValue: '',
        accelerateNumberOfRequestsUnit: '',
        independentIPTrendValue: '',
        independentIPTrendUnit: '',
        pageViewsValue: '',
        pageViewsUnit: '',
        pageViewsXdata: [],
        pageViewsSeries: [],
        pageViewsSeriesUnit: '',
        independentIPTrendXdata: [],
        independentIPTrendSeries: [],
        independentIPTrendSeriesUnit: '',
        numberOfRequestsTrendXdata: [],
        numberOfRequestsTrendSeries: [],
        numberOfRequestsTrendSeriesUnit: ''
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
      searchInput(ev) {
        const search = document.getElementById('searchInput_access')
        const searchInput = search.childNodes[0].childNodes[1]
        if (ev === true) {
          searchInput.style.display = 'block'
        } else {
          searchInput.style.display = 'none'
        }
      },
      changeDomain() {
        this.numberOfRequestsLoading = true
        this.pageViewsLoading = true
        this.independentIPTrendLoading = true
        this.accelerateNumberOfRequestsLoading = true
        const params = {
          sub_domain:this.selectValue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue
        }
        this.selectLength = this.selectValue.length
        this.fetchAccessAnalysis(params)
      },
      numberOfRequestsTrend() {
        if (!document.getElementById('numberOfRequestsTrendCharts')) {
          return
        }
        this.speedUpTrafficChart = Echarts.init(document.getElementById('numberOfRequestsTrendCharts'))
        this.speedUpTrafficChart.setOption({
          title: {
            subtext: '单位(' + this.numberOfRequestsTrendSeriesUnit + ')'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
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
              data : this.numberOfRequestsTrendXdata
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name: '请求数趋势',
              type: 'line',
              stack: '总量',
              itemStyle : {
                normal : {
                  color:'#2d90e6',
                  lineStyle:{
                    color:'#2d90e6'
                  }
                }
              },
              data: this.numberOfRequestsTrendSeries
            }
          ]
        })
      },
      independentIPTrend() {
        if (!document.getElementById('independentIPTrendCharts')) {
          return
        }
        this.speedUpTrafficChart = Echarts.init(document.getElementById('independentIPTrendCharts'))
        this.speedUpTrafficChart.setOption({
          title: {
            subtext: '单位(' + this.independentIPTrendSeriesUnit + ')'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
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
              data : this.independentIPTrendXdata
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name: '独立IP趋势',
              type: 'line',
              stack: '总量',
              itemStyle : {
                normal : {
                  color:'#2d90e6',
                  lineStyle:{
                    color:'#2d90e6'
                  }
                }
              },
              data: this.independentIPTrendSeries
            }
          ]
        })
      },
      pageViewsTrend() {
        if (!document.getElementById('pageViewsTrendCharts')) {
          return
        }
        this.speedUpTrafficChart = Echarts.init(document.getElementById('pageViewsTrendCharts'))
        this.speedUpTrafficChart.setOption({
          title: {
            subtext: '单位(' + this.pageViewsSeriesUnit + ')'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
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
              data : this.pageViewsXdata
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name: '页面浏览量趋势',
              type: 'line',
              stack: '总量',
              itemStyle : {
                normal : {
                  color:'#2d90e6',
                  lineStyle:{
                    color:'#2d90e6'
                  }
                }
              },
              data: this.pageViewsSeries
            }
          ]
        })
      },
      consoleTimeValue(startTimevalue, endTimevalue) {
        this.numberOfRequestsLoading = true
        this.pageViewsLoading = true
        this.independentIPTrendLoading = true
        this.accelerateNumberOfRequestsLoading = true
        this.endTimevalue = endTimevalue
        this.startTimevalue = startTimevalue
        const params = {
          sub_domain:this.selectValue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue
        }
        this.fetchAccessAnalysis(params)
      },
      fetchAccessAnalysis(params) {
        /*总访问统计*/
        this.fetchPost('Web.Domain.Report.Visit.list', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            this.numberOfRequestsLoading = false
            this.numberOfRequestsTrendXdata = res.data.trend.x_data
            this.numberOfRequestsTrendSeries = res.data.trend.y_data.data
            this.numberOfRequestsTrendSeriesUnit = res.data.trend.y_data.unit
            if (res.data.total.length === 0) {
              this.numberOfRequestsValue = '暂无数据'
              this.numberOfRequestsUnit = ''
            } else {
              this.numberOfRequestsValue = res.data.total.data
              this.numberOfRequestsUnit = res.data.total.unit
            }
          }
        })
        .then(res => {
          this.$nextTick(function(e) {
            this.numberOfRequestsTrend('numberOfRequestsTrendCharts')
          })
        })
        /*Web.Domain.Report.Visit.speed   访问加速请求*/
        this.fetchPost('Web.Domain.Report.Visit.speed', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            this.accelerateNumberOfRequestsLoading = false
            this.accelerateNumberOfRequestsValue = res.data.total.data
            this.accelerateNumberOfRequestsUnit = res.data.total.unit
            if (res.data.total.length === 0) {
              this.accelerateNumberOfRequestsValue = '暂无数据'
              this.accelerateNumberOfRequestsUnit = ''
            } else {
              this.accelerateNumberOfRequestsValue = res.data.total.data
              this.accelerateNumberOfRequestsUnit = res.data.total.unit
            }
          }
        })
        /*Web.Domain.Report.Visit.uv  独立IP个数*/
        this.fetchPost('Web.Domain.Report.Visit.uv', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            this.independentIPTrendLoading = false
            this.independentIPTrendXdata = res.data.trend.x_data
            this.independentIPTrendSeries = res.data.trend.y_data.data
            this.independentIPTrendSeriesUnit = res.data.trend.y_data.unit
            if (res.data.total.length === 0) {
              this.independentIPTrendValue = '暂无数据'
              this.independentIPTrendUnit = ''
            } else {
              this.independentIPTrendValue = res.data.total.data
              this.independentIPTrendUnit = res.data.total.unit
            }
          }
        })
        .then(res => {
          this.$nextTick(function(e) {
            this.independentIPTrend('independentIPTrendCharts')
          })
        })
        /*Web.Domain.Report.Visit.pv 访问PV统计页面浏览量*/
        this.fetchPost('Web.Domain.Report.Visit.pv', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            this.pageViewsLoading = false
            this.pageViewsXdata = res.data.trend.x_data
            this.pageViewsSeries = res.data.trend.y_data.data
            this.pageViewsSeriesUnit = res.data.trend.y_data.unit
            if (res.data.total.length === 0) {
              this.pageViewsValue = '暂无数据'
              this.pageViewsUnit = ''
            } else {
              this.pageViewsValue = res.data.total.data
              this.pageViewsUnit = res.data.total.unit
            }
          }
        })
        .then(res => {
          this.$nextTick(function(e) {
            this.pageViewsTrend('pageViewsTrendCharts')
          })
        })
      }
    }
  }
</script>

<style lang="css" scoped>
.charts{
  width: 100%;
  height: 350px;
  margin-top: 30px;
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
