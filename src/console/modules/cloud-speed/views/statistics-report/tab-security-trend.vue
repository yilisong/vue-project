<template  lang="html">
<div>
  <div class="toolbar">
    <el-select v-model="selectValue" multiple filterable placeholder="默认所有域名" @change="changeDomain" @visible-change="searchInput($event)" id="searchInput_security">
      <el-option v-for="(item, index) in optionsList" :key="index" :label="item.domain" :value="item.domain"></el-option>
    </el-select>
    <span class="select-cunt-text">已选：<span class="select-cunt">{{ selectLength }}</span></span>
    <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
  </div>

  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="grid-content bg-purple" v-loading="ccLoading"  element-loading-text="拼命加载中">
          <el-row :gutter="20">
            <el-col :xs="4" :sm="4" :md="4" :lg="4">
              <div class="traffic_title">CC攻击</div>
            </el-col>
            <el-col :xs="10" :sm="10" :md="10" :lg="10">
              <div class="traffic_margin traffic_border_left">
                <div class="TrafficUnit">峰值QPS</div>
                <div class="TrafficCunt">{{ ccAttackTrendValue }}
                  <span class="font20">{{ ccAttackTrendUnit }}</span>
                </div>
              </div>
            </el-col>
            <el-col :xs="10" :sm="10" :md="10" :lg="10">
              <div class="traffic_margin">
                <div class="TrafficUnit">峰值发生时间</div>
                <div class="TrafficCunt2">{{ ccAttackTrendTime }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="grid-content bg-purple-light" v-loading="idsLoading"  element-loading-text="拼命加载中">
          <el-row :gutter="20">
            <el-col :xs="4" :sm="4" :md="4" :lg="4">
              <div class="traffic_title">云IDS</div>
            </el-col>
            <el-col :xs="10" :sm="10" :md="10" :lg="10">
              <div class="traffic_margin traffic_border_left">
                <div class="TrafficUnit">总次数</div>
                <div class="TrafficCunt">{{ trendofIDSDetectionValue }}
                  <span class="font20">{{ trendofIDSDetectionUnit }}</span>
                </div>
              </div>
            </el-col>
            <el-col :xs="10" :sm="10" :md="10" :lg="10">
              <div class="traffic_margin">
                <div class="TrafficUnit">黑客数</div>
                <div class="TrafficCunt">{{ trendofIDSDetectionHackerCount }}
                <span class="font20">{{ trendofIDSDetectionHackerCountUnit }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div>
      <div class="datalist">CC攻击趋势</div>
      <div class="charts" id="ccAttackTrendCharts" v-loading="ccLoading" element-loading-text="拼命加载中"></div>
    </div>
    <div>
      <div class="datalist">IDS检出趋势</div>
      <div class="charts" id="trendofIDSDetectionCharts" v-loading="idsLoading" element-loading-text="拼命加载中"></div>
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
        /*loading 效果 开始*/
        ccLoading: true,
        idsLoading: true,
        /*loading 效果 结束*/
        selectLength: '全部',
        startTimevalue: '',
        endTimevalue: '',
        optionsList: '',
        selectValue: [],
        ccAttackTrendUnit: '',
        ccAttackTrendValue: '',
        ccAttackTrendTime: '',
        ccAttackTrendXAxis: [],
        ccAttackTrendSeries: [],
        ccAttackTrendSeriesUnit: '',
        trendofIDSDetectionUnit: '',
        trendofIDSDetectionValue: '',
        trendofIDSDetectionHackerCountUnit: '',
        trendofIDSDetectionHackerCount: '',
        trendofIDSDetectionXAxis: [],
        trendofIDSDetectionSeries: [],
        trendofIDSDetectionSeriesUnit: '',
        speedUpTrafficChart: null,
        backSourceTrafficChart: null
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
        this.ccLoading = true
        this.idsLoading = true
        const params = {
          sub_domain:this.selectValue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue
        }
        this.selectLength = this.selectValue.length
        this.fetchSecurityTrend(params)
      },
      consoleTimeValue(startTimevalue, endTimevalue) {
        this.ccLoading = true
        this.idsLoading = true
        this.startTimevalue = startTimevalue
        this.endTimevalue = endTimevalue
        const params = {
          sub_domain:this.selectValue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue
        }
        this.fetchSecurityTrend(params)
      },
      searchInput(ev) {
        const search = document.getElementById('searchInput_security')
        const searchInput = search.childNodes[0].childNodes[1]
        if (ev === true) {
          searchInput.style.display = 'block'
        } else {
          searchInput.style.display = 'none'
        }
      },
      ccAttackTrend() {
        if (!document.getElementById('ccAttackTrendCharts')) {
          return
        }
        this.speedUpTrafficChart = Echarts.init(document.getElementById('ccAttackTrendCharts'))
        this.speedUpTrafficChart.setOption({
          title: {
            subtext: '单位(' + this.ccAttackTrendSeriesUnit + ')'
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
              data : this.ccAttackTrendXAxis
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name: 'CC攻击趋势',
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
              data: this.ccAttackTrendSeries
            }
          ]
        })
      },
      trendofIDSDetection() {
        if (!document.getElementById('trendofIDSDetectionCharts')) {
          return
        }
        this.speedUpTrafficChart = Echarts.init(document.getElementById('trendofIDSDetectionCharts'))
        this.speedUpTrafficChart.setOption({
          title: {
            subtext: '单位(' + this.trendofIDSDetectionSeriesUnit + ')'
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
              data : this.trendofIDSDetectionXAxis
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name: 'IDS攻击趋势',
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
              data: this.trendofIDSDetectionSeries
            }
          ]
        })
      },
      fetchSecurityTrend(params) {
        /*Web.Domain.Report.Safe.cc   cc统计*/
        this.fetchPost('Web.Domain.Report.Safe.cc', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            this.ccLoading = false
            this.ccAttackTrendXAxis = res.data.trend.x_data
            this.ccAttackTrendSeries = res.data.trend.y_data.data
            this.ccAttackTrendSeriesUnit = res.data.trend.y_data.unit ? res.data.trend.y_data.unit : 'QPS'
            if (!res.data.max.data.data) {
              this.ccAttackTrendValue = '暂无数据'
              this.ccAttackTrendUnit = ''
              this.ccAttackTrendTime = '暂无数据'
            } else {
              this.ccAttackTrendValue = res.data.max.data.data
              this.ccAttackTrendUnit = res.data.max.data.unit
              this.ccAttackTrendTime = res.data.max.time
            }
          }
        })
        .then(res => {
          this.$nextTick(function(e) {
            this.ccAttackTrend('ccAttackTrendCharts')
          })
        })
        /*Web.Domain.Report.Safe.ids  ids统计*/
        this.fetchPost('Web.Domain.Report.Safe.ids', params)
        .then(result => {
          if (result.ok) {
            return result.json()
          }
        })
        .then(res => {
          if (res && res.status.code === 1 && res.data) {
            this.idsLoading = false
            this.trendofIDSDetectionXAxis = res.data.trend.x_data
            this.trendofIDSDetectionSeries = res.data.trend.y_data.data
            this.trendofIDSDetectionSeriesUnit = res.data.trend.y_data.unit ? res.data.trend.y_data.unit : '次'

            if (!res.data.total.data) {
              this.trendofIDSDetectionValue = '暂无数据'
              this.trendofIDSDetectionUnit = ''
              this.trendofIDSDetectionHackerCount = '暂无数据'
              this.trendofIDSDetectionHackerCountUnit = ''
            } else {
              this.trendofIDSDetectionValue = res.data.total.data
              this.trendofIDSDetectionUnit = res.data.total.unit
              this.trendofIDSDetectionHackerCount = res.data.hacker_count.data
              this.trendofIDSDetectionHackerCountUnit = res.data.hacker_count.unit
            }
          }
        })
        .then(res => {
          this.$nextTick(function(e) {
            this.trendofIDSDetection('trendofIDSDetectionCharts')
          })
        })
      }
    }
  }
</script>

<style lang="css" scoped>
.font20 {
  font-size: 20px;
}
.charts{
  width: 100%;
  height: 450px;
}
.datalist{
  padding: 10px;
  margin-top: 20px;
}
.traffic_title{
  font-size: 22px;
  margin-top: 60px;
  text-align: center;
}
.TrafficUnit{
  font-size: 18px;
  color: #010101
}
.TrafficCunt2 {
  font-size: 30px;
  color: #1a82e1;
}
.traffic_border_left{
  border-left: 2px solid #d7d7d7;
  padding-left: 20px;
  margin-left: -10px;
}
.traffic_data{
  margin-top: 20px;
  color: #000;
}
.TrafficCunt{
  padding-top: 5px;
}
.traffic_time{
  padding-top: 20px;
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
  .TrafficCunt2 {
    font-size: 20px;
    color: #1a82e1;
  }
}
</style>
