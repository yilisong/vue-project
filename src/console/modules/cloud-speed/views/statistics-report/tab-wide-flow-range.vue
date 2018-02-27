<template  lang="html">
<div>
  <div class="toolbar">
    <el-select v-model="selectValue" multiple filterable placeholder="默认所有域名" @change="changeDomain" @visible-change="searchInput($event)" id="searchInput_wide">
      <el-option v-for="(item, index) in optionsList" :key="index" :label="item.domain" :value="item.domain"></el-option>
    </el-select>
    <span class="select-cunt-text">已选：<span class="select-cunt">{{ selectLength }}</span></span>
    <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
  </div>
  <div>
    <el-row :gutter="20">
      <el-col :xs="6" :sm="6" :md="5" :lg="5">
        <div class="grid-content bg-purple" v-loading="speedUpLoading">
          <div class="traffic">命中缓存流量</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ speedUpTraffic }}</span>
            <span class="TrafficUnit">{{ speedUpTrafficUnit }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="5" :lg="5">
        <div class="grid-content bg-purple-light" v-loading="backSourceLoading">
          <div class="traffic">回源总流量</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ backSourceTraffic }}</span>
            <span class="TrafficUnit">{{ backSourceTrafficUnit }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="5" :lg="5">
        <div class="grid-content bg-purple-light" v-loading="backSourceLoading">
          <div class="traffic">CDN流量</div>
          <div class="traffic_margin">
            <span class="TrafficCunt">{{ cdnTraffic }}</span>
            <span class="TrafficUnit">{{ cdnTrafficUnit }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
      <div class="datalist">命中缓存流量趋势</div>
      <div class="charts" id="speedUpTrafficUnitCharts" v-loading="speedUpLoading"></div>
    </div>
    <div>
      <div class="datalist">回源流量趋势</div>
      <div class="charts" id="backSourceTrafficUnitCharts" v-loading="backSourceLoading"></div>
    </div>
    <div>
      <div class="datalist">CDN流量趋势</div>
      <div class="charts" id="cdnTrafficUnitCharts" v-loading="cdnLoading"></div>
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
      cdnyAxisDataCount: 0,
      testData: [],
      cdnTraffic: '',
      cdnTrafficUnit: '',
      speedUpTrafficData: 0,
      backSourceData: 0,
      speedUpLoading: true,
      backSourceLoading: true,
      cdnLoading: true,
      selectLength: '全部',
      endTimevalue: '',
      startTimevalue: '',
      optionsList: '',
      selectValue: [],
      backSourceTrafficUnit: '',
      backSourceTraffic: '',
      speedUpTrafficUnit: '',
      speedUpTraffic: '',
      speedUpTrafficChart: null,
      backSourceTrafficChart: null,
      speedUpTrafficChartDataxAxis: [],
      speedUpTrafficChartDataUnit: '',
      speedUpTrafficChartDataSeries: [],
      backSourceTrafficChartxAxis: [],
      backSourceTrafficChart: '',
      backSourceTrafficChartDataSeries: [],
      speedUpTrafficChartDataSeriesFormat: [],
      backSourceTrafficChartDataSeriesFormat: []
    }
  },
  created() {
    const params = {
      per_page: 1000
    }
    this.fetchGet('Web.Domain.list', params).then(result => {
      if (result.ok) {
        result.json().then(res => {
          if (res && (res.status.code === 1) && res.data) {
            this.optionsList = res.data.list
          }
        })
      }
    }, e => {})
  },
  watch: {
    testData(newValue) {
      if (newValue.length === 2) {
        console.log(newValue, 'newValue')
        this.cdnTotal = newValue[0] + newValue[1]
        console.log(this.cdnTotal, '~~~~~~~')
        if (this.cdnTotal >= 1024) {
          this.cdnTraffic = this.mbToSize(this.cdnTotal).data === 0 ? this.mbToSize(this.cdnTotal).data : this.mbToSize(this.cdnTotal).data.toFixed(1)
          this.cdnTrafficUnit = this.mbToSize(this.cdnTotal).unit
        } else {
          this.cdnTraffic = this.cdnTotal.toFixed(1)
          this.cdnTrafficUnit = 'MB'
        }

        this.testData = []
      }
    },
    cdnyAxisDataCount(newValue) {
      if (newValue === 2) {
        this.cdnLoading = false
        const yData = []
        const toFormat = this.speedUpTrafficChartDataSeriesFormat.data
        toFormat.forEach((item, i) => {
          yData[i] = (Number(item) + Number(this.backSourceTrafficChartDataSeriesFormat.data[i])).toFixed(1)
        })
        this.cdnTrafficUnitChart(this.backSourceTrafficChartDataSeriesFormat.unit, yData)
      }
    }
  },
  methods: {
    changeDomain() {
      this.speedUpLoading = true
      this.backSourceLoading = true
      this.cdnLoading = true
      this.cdnyAxisDataCount = 0
      const params = {
        sub_domain: this.selectValue,
        start_time: this.startTimevalue,
        end_time: this.endTimevalue
      }
      this.selectLength = this.selectValue.length
      this.fetchTraffic(params)
    },
    mbToSize(mb) {
      const formatData = {}
      if (mb < 1024)
        return
      if (mb === 0) {
        formatData.data = 0
        formatData.unit = 'MB'
      } else {
        const k = 1024

        const sizes = ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(mb) / Math.log(k))
        formatData.data = mb / Math.pow(k, i)
        formatData.unit = sizes[i]
      }
      console.log(formatData.data, '-mb-')
      return formatData
    },
    consoleTimeValue(startTimevalue, endTimevalue) {
      this.speedUpLoading = true
      this.backSourceLoading = true
      this.cdnLoading = true
      this.cdnyAxisDataCount = 0
      this.startTimevalue = startTimevalue
      this.endTimevalue = endTimevalue
      const params = {
        sub_domain: this.selectValue,
        start_time: this.startTimevalue,
        end_time: this.endTimevalue
      }
      this.fetchTraffic(params)
    },
    speedUpTrafficUnitChart() {
      if (!document.getElementById('speedUpTrafficUnitCharts')) {
        return
      }
      this.speedUpTrafficChart = Echarts.init(document.getElementById('speedUpTrafficUnitCharts'))
      this.speedUpTrafficChart.setOption({
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
          data: this.speedUpTrafficChartDataxAxis
        }],
        yAxis: [{
          name: '单位:' + (this.speedUpTrafficChartDataUnit ? this.speedUpTrafficChartDataUnit : 'KB'),
          type: 'value'
        }],
        series: [{
          name: '加速流量趋势',
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
          data: this.speedUpTrafficChartDataSeries
        }]
      })
    },
    backSourceTrafficUnitChart() {
      if (!document.getElementById('backSourceTrafficUnitCharts')) {
        return
      }
      this.backSourceTrafficChart = Echarts.init(document.getElementById('backSourceTrafficUnitCharts'))
      this.backSourceTrafficChart.setOption({
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
          data: this.backSourceTrafficChartxAxis
        }],
        yAxis: [{
          name: '单位:' + (this.backSourceTrafficChartUnit ? this.backSourceTrafficChartUnit : 'KB'),
          type: 'value'
        }],
        series: [{
          name: '回源流量趋势',
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
          data: this.backSourceTrafficChartDataSeries
        }]
      })
    },
    cdnTrafficUnitChart(unit, ydata) {
      if (!document.getElementById('cdnTrafficUnitCharts')) {
        return
      }
      this.backSourceTrafficChart = Echarts.init(document.getElementById('cdnTrafficUnitCharts'))
      this.backSourceTrafficChart.setOption({
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
          data: this.backSourceTrafficChartxAxis
        }],
        yAxis: [{
          name: '单位:' + unit,
          type: 'value'
        }],
        series: [{
          name: 'cdn流量趋势',
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
          data: ydata
        }]
      })
    },
    searchInput(ev) {
      const search = document.getElementById('searchInput_wide')
      const searchInput = search.childNodes[0].childNodes[1]
      if (ev === true) {
        searchInput.style.display = 'block'
      } else {
        searchInput.style.display = 'none'
      }
    },
    fetchTraffic(params) {
      this.fetchPost('Web.Domain.Report.Traffic.speed', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            if (res && (res.status.code === 1) && res.data) {
              this.speedUpLoading = false
              this.speedUpTrafficChartDataxAxis = res.data.trend.x_data
              this.speedUpTrafficChartDataSeries = res.data.trend.y_data.data
              this.speedUpTrafficChartDataUnit = res.data.trend.y_data.unit
              this.speedUpTrafficChartDataSeriesFormat = res.data.trend.y_data_format_unit
                ++this.cdnyAxisDataCount
              if (res.data.total.length === 0) {
                this.speedUpTraffic = '暂无数据'
                this.speedUpTrafficUnit = ''
              } else {
                this.speedUpTraffic = res.data.total.data
                this.speedUpTrafficUnit = res.data.total.unit
                //未格式化
                this.speedUpTrafficData = parseFloat(res.data.total_format_unit.data, 10)
                this.testData.push(this.speedUpTrafficData)
              }
            }
          }
          console.log(this.speedUpTraffic, this.speedUpTrafficUnit, 'feel')
        })
        .then(res => {
          this.$nextTick(function(e) {
            this.speedUpTrafficUnitChart('speedUpTrafficUnitCharts')
          })
        })

      this.fetchPost('Web.Domain.Report.Traffic.back', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            if (res && (res.status.code === 1) && res.data) {
              this.backSourceLoading = false
              this.backSourceTrafficChartxAxis = res.data.trend.x_data
              this.backSourceTrafficChartDataSeries = res.data.trend.y_data.data
              this.backSourceTrafficChartUnit = res.data.trend.y_data.unit
              this.backSourceTrafficChartDataSeriesFormat = res.data.trend.y_data_format_unit
                ++this.cdnyAxisDataCount
              if (res.data.total.length === 0) {
                this.backSourceTraffic = '暂无数据'
                this.backSourceTrafficUnit = ''
              } else {
                this.backSourceTraffic = res.data.total.data
                this.backSourceTrafficUnit = res.data.total.unit
                this.backSourceData = parseFloat(res.data.total_format_unit.data, 10)
                this.testData.push(this.backSourceData)
              }
            }
          }
        })
        .then(res => {
          this.$nextTick(function(e) {
            this.backSourceTrafficUnitChart('backSourceTrafficUnitCharts')
          })
        })
    }
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 400px;
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
