<template lang="html">
<div class="size">

</div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
export default {
  props: {
    chartWidth: {
      type: Number,
      default: 600
    },
    xData: {
      type: Array,
      required: true
    },
    yData: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    unit: {
      type: String
    }
  },
  data() {
    return {
      color: ['#f92c2d', '#334d63', '#79d9e7', '#fca475', '#c2fff0', '#95d9a5', '#fdae00', '#fedacc', '#878a91', '#627a8c']
    }
  },
  watch: {
    xData(newValue) {
      if (newValue.length === 0) {
        const emptyData = [{
          value: 0,
          name: '暂无数据'
        }]
        this.drawPie([], emptyData, ['#F7F7F7'])
      } else {
        this.drawPie(this.xData, this.yData, this.color)
      }
    }
  },
  methods: {
    drawPie(xdata, ydata, colorSetting) {
      const pieChart = echarts.init(this.$el)

      const option = {
        title: {
          text: this.title,
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}' + this.unit + '({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          top: '10%',
          data: xdata
        },
        series: [{
          name: this.title,
          type: 'pie',
          radius: ['30%', '70%'],
          color: colorSetting,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: ydata
        }]
      }

      pieChart.setOption(option)
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
