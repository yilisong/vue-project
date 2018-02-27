<template lang="html">
<div class="size">

</div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'

export default {
  props: {
    chartWidth: {
      type: Number,
      default: 300
    },
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
    }
  },
  watch: {
    xData(newData) {
      if (newData.length === 0) {
        const emptyData = [0, 0, 0, 0, 0]
        this.drawBar(emptyData, emptyData)
      } else {
        this.drawBar(this.xData, this.yData)
      }
    }
  },
  data() {
    return {
      formatX: [],
      formatY: []
    }
  },
  mounted() {
    this.$el.style.width = this.chartWidth
  },
  methods: {
    drawBar(xdata, ydata) {
      const barChart = echarts.init(this.$el)
      const option = {
        color: ['#2d90e6'],
        title: {
          text: this.title,
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
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
          },
          data: xdata
        }],
        yAxis: [{
          type: 'value',
          name: '单位（' + this.unit + '）',
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
          }
        }],
        series: [{
          // name: '直接访问',
          type: 'bar',
          barWidth: '25',
          data: ydata
        }]
      }
      barChart.setOption(option)
    }
  }
}
</script>

<style lang="css" scoped>
.size {
  width: 100%;
  height: inherit;
}
</style>
