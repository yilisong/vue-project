<template lang="html">
<div class="size">

</div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/funnel'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import SourceGuardResource from '../../resource/SourceGuardResource'
export default {
  data() {
    return {
      attackData: []
    }
  },
  props: {
    chartWidth: {
      type: Number,
      default: 500
    }
  },
  watch: {
    attackData(newValue) {
      if (newValue.length === 3) {
        this.drawFunnel()
      }
    }
  },
  mounted() {
    SourceGuardResource.getWafAttackSeniorTimes().then(response => {
      this.attackData.push({
        name: '高级黑客总数',
        value: response.data.data.distinct_sum_remote_addr.data
      }, {
        name: '高级攻击次数',
        value: response.data.data.sum_times.data
      })
    })
    SourceGuardResource.getwafAttackOrdinaryTimes().then(response => {
      this.attackData.push({
        name: '普通攻击次数',
        value: response.data.data.total_times.data
      })
    })
  },
  methods: {
    drawFunnel() {
      // this.$el.style.width = this.chartWidth + 'px'
      console.log(this.$el.style)
      const funnelChart = echarts.init(this.$el)
      const option = {
        title: {
          text: '近三十天攻击情况',
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        toolbox: {
          feature: {
            dataView: {
              readOnly: false
            }
          }
        },
        legend: {
          data: ['普通攻击次数', '高级攻击次数', '高级黑客总数'],
          top: '10%',
          padding: 10
        },
        calculable: true,
        series: [{
          type: 'funnel',
          left: '10%',
          top: 60,
          //x2: 80,
          bottom: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          color: ['#79d9e7', '#334d63', '#f92c2d'],
          label: {
            normal: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              textStyle: {
                fontSize: 20
              }
            }
          },
          labelLine: {
            normal: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1
            }
          },
          data: this.attackData,
          label: {
            normal: {
              formatter(params) {
                return params.value
              },
              position: 'center'
            }
          }
        }]
      }
      funnelChart.setOption(option)
    }
  }
}
</script>

<style lang="css">
.size {
  width: 100%;
  height: 100%;
}
</style>
