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
  props: {
    xData: {
      type: Array,
      required: true
    },
    yData: {
      type: Array,
      required: true
    },
    unit: {
      type: String
    },
    title: {
      type: String
    },
    legendData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  watch: {
    xData(newValue) {
      if (newValue.length === 0) {
        // let legend = []
        const ydata = []
        let xdata = []
        // legend = [0, 0, 0, 0, 0]
        ydata.push({
          name: 0,
          type: 'line',
          symbolSize: '8',
          smooth: false,
          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [0, 0, 0, 0, 0]
        })
        xdata = [0, 0, 0, 0, 0]
        this.drawLine(xdata, ydata, ' ')
      } else {
        this.drawLine(this.xData, this.yData, this.unit, this.legendData)
      }
    }
  },
  methods: {
    drawLine(xData, yData, unit, legendData) {
      console.log(legendData, '~!@#$%^&*()')
      const lineChart = echarts.init(this.$el)
      const option = {
        tooltip: {
          trigger: 'axis',
          position: pt => [pt[0], '10%']
        },
        color: ['#f93839', '#3996e7', '#3e576c', '#fca97d', '#878a91', '#627a8c', '#FFB6C1', '#FF69B4', '#DB7093', '#FF1493'],
        title: {
          left: 'left',
          text: this.title,
          textStyle: {
            fontSize: 16
          }
        },
        legend: {
          data: legendData,
          left: 'right',
          padding: [1, 0, 0, 15]
        },
        grid: {
          left: '1%',
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
          name: '单位( ' + unit + ')',
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
        series: yData
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
