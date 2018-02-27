<template lang="html">
<div class="base-border">
  <p class="chart-title">近7日CDN流量使用趋势</p>
  <div class="">
    <div ref="chart" id="main" class="charts" v-loading="chartLoading"></div>
  </div>
</div>
</template>

<script>
import SourceOverviewResource from 'home/resource/SourceOverviewResource'
import Echarts from 'echarts'
import moment from 'moment'

export default {
  name: 'FlowmeterTendency',
  components: {
    Echarts
  },
  data() {
    return {
      chartLoading: false,
      xData: [],
      yData: [],
      unit: ''
    }
  },
  created() {
    this.getTrendData()
  },
  mounted() {},
  methods: {
    getTrendData() {
      const startTime = moment().subtract(6, 'days').format('YYYY-MM-DD')
      const endTime = moment().format('YYYY-MM-DD')
      const params = {
        start_time: startTime + ' 00:00:00',
        end_time: endTime + ' 23:59:59'
      }
      SourceOverviewResource.getCDNFloweter(params).then(res => {
        const trend = res.data.data.trend
        this.xData = trend.x_data
        this.yData = trend.y_data.data
        this.unit = trend.y_data.unit
        this.drawLine()
      })
    },
    drawLine() {
      const lineChart = Echarts.init(this.$refs.chart)
      const option = {
        tooltip: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData,
          axisLine: {
            lineStyle: {
              color: '#a5a5a5'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#f5f5f5'
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          name: `单位(${this.unit})`,
          axisLine: {
            lineStyle: {
              color: '#a5a5a5'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#f5f5f5'
            }
          }
        },
        series: [
          {
            name: 'CDN流量',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            symbolSize: 6,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: 'rgb(56,149,231)',
                borderWidth: 1
              }
            },
            markLine: {
              mormal: {
                color: '#f5f5f5'
              }
            },
            areaStyle: {
              normal: {
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(190,230,241)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(211,216,241)'
                  }
                ])
              }
            },
            data: this.yData
          }
        ]
      }

      lineChart.setOption(option)
    }
  }
}
</script>

<style scope>
.charts{
  width: 100%;
  height: 400px;
}

.chart-title {
  margin: 20px 0 0 20px;
}
</style>
