<template lang="html">
<div class="size">

</div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import SourceGuardResource from '../../resource/SourceGuardResource'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/dataZoom'
import path from '../../assets/images/srollbar.png'

export default {
  mounted() {
    SourceGuardResource.getAttackTrend().then(response => {
      if (response.data.status.code === 1) {
        const xData = response.data.data.trend.x_data
        const yData = response.data.data.trend.y_data.data
        const unit = response.data.data.trend.y_data.unit
        console.log(yData, '---0-0-0')
        this.drawLine(xData, yData, unit)
      }
    })
  },
  methods: {
    drawLine(xData, yData, unit) {
      console.log(this.$el, '~!@#$%^&*()')
      const lineChart = echarts.init(this.$el)
      const option = {
        tooltip: {
          trigger: 'axis',
          position: pt => [pt[0], '10%']
        },
        title: {
          left: 'left',
          text: '近7天攻击趋势',
          textStyle: {
            fontSize: 16
          }
        },
        // toolbox: {
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     }
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData,
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '单位(' + unit + ')',
          nameTextStyle: {
            color: '#333'
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          splitLine: {
            lineStyle: {
              width: 1,
              color: ['#efefef']
            }
          },
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          show: true,
          start: 0,
          end: 100,
          zoomLock: true
        }, {
          start: 0,
          end: 100,
          height: 5,
          bottom: 8,
          handleIcon: 'image://' + path,
          handleSize: '350%',
          borderColor: '#F3F3F3',
          backgroundColor: '#F3F3F3',
          fillerColor: '#2d90e6',
          showDataShadow: false
        }],
        series: [{
          name: '攻击总数',
          type: 'line',
          smooth: true,
          symbol: 'emptyCircle',
          symbolSize: 8,
          sampling: 'average',
          itemStyle: {
            normal: {
              color: 'rgba(255,0,0,0.6)'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255,0,0,0.2)'
              }, {
                offset: 0.8,
                color: 'rgba(255,114,0,0.2)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          data: yData
        }]
      }

      lineChart.setOption(option)
    }
  }
}
</script>

<style lang="css" scoped>
.size {
  width: 100%;
  height: 494px;
}
</style>
