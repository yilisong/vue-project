<template lang="html">
<div class="size">

</div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/map'
import 'echarts/map/js/china'
import 'echarts/map/js/world'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/visualMap'
import NameMapVal from 'common/config/nameMap'
export default {
  props: {
    chartWidth: {
      type: Number,
      default: 630
    },
    chartHeight: {
      type: Number,
      default: 650
    },
    mapData: {
      type: Array,
      required: true
    },
    mapType: {
      type: String,
      default: 'china'
    },
    mapTitle: {
      type: String,
      default: '近30天攻击IP地理分布'
    },
    max: {
      type: Number
    }
  },
  computed: {
    mapDataContainer: {
      get() {
        return this.max
      }
    }
  },
  data() {
    return {
      values: []
    }
  },
  watch: {
    mapData(newValue) {
      console.log(newValue, 'neee')
      this.values = newValue
      if (this.mapData.length !== 0) {
        this.drawMap(this.mapData)
      }
    }
  },
  mounted() {
    this.drawMap([])
  },
  methods: {
    drawMap(mapData) {
      this.$el.style.width = this.chartWidth + 'px'
      // this.$el.style.height = this.chartHeight + 'px'
      // const maxValue = Math.max.apply(...this.values)
      const mapChart = echarts.init(this.$el)
      const option = {
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: this.max,
          calculable: true,
          inRange: {
            color: ['#0e88c5', '#6934ff']
          },
          textStyle: {
            color: '#333'
          }
        },
        title: {
          text: this.mapTitle,
          textStyle: {
            fontSize: 16,
            padding: 10
          }
        },
        series: [{
          name: '攻击IP数',
          type: 'map',
          mapType: this.mapType,
          selectedMode: 'multiple',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              areaColor: '#d5d5d5'
            },
            emphasis: {
              areaColor: '#ffba00'
            }
          },
          data: mapData
        }]
      }
      if (this.mapType === 'world') {
        option.nameMap = NameMapVal.nameMap
      }
      mapChart.setOption(option)
    }
  }

}
</script>

<style lang="css" scoped>
.size {
  width: 100%;
  height: 100%;
}
</style>
