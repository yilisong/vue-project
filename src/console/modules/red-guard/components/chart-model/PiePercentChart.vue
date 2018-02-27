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
    colorConfig: {
      type: String,
      default: '#6934ff'
    },
    chartWidth: {
      type: Number,
      default: 130
    },
    chartHeight: {
      type: Number,
      default: 150
    },
    realData: {
      type: Object
    }
  },
  mounted() {
    this.$el.style.width = this.chartWidth + 'px'
    this.$el.style.height = this.chartHeight + 'px'
  },
  watch: {
    realData(newValue) {
      console.log(this.realData, 'realData')
      this.drawPie()
    }
  },
  methods: {
    drawPie() {
      const pieChart = echarts.init(this.$el)

      const option = {
        title: {
          text: this.realData.name
        },
        tooltip: {
          trigger: 'item',
          formatter: '攻击IP个数:' + this.realData.realData[0].count,
          show: true
        },
        series: [{
          // name: '访问来源',
          type: 'pie',
          radius: ['60%', '75%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: '25',
                fontWeight: 'normal'
              }
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            borderWidth: 5,
            shadowBlur: 40,
            borderColor: '#fc7a26'
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: [this.colorConfig, '#e5e5e5'],
          data: this.realData.realData
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
}
</style>
