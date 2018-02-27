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
  data() {
    return {
      xData: [],
      yData: [],
      yDataAnother: [],
      attackUnit: '',
      visitUnit: ''
    }
  },
  mounted() {
    SourceGuardResource.getwafAPTAttackLine({
      remote_addr: this.$route.query.ip
    }).then(response => {
      const data = response.data.data.trend
      this.xData = data.x_data
      this.yData = data.y_data.data
      this.attackUnit = data.y_data.unit
    }).then(response => {
      SourceGuardResource.getwafAPTVisitLine({
        remote_addr: this.$route.query.ip
      }).then(response => {
        const data = response.data.data.trend
        this.yDataAnother = data.y_data.data
        this.visitUnit = data.y_data.unit
      }).then(response => {
        if (this.xData.length === 0) {
          this.xData = [0, 0, 0, 0, 0]
          this.yData = [0, 0, 0, 0, 0]
          this.yDataAnother = [0, 0, 0, 0, 0]
        }
        this.drawLine(this.xData, this.yData, this.yDataAnother, this.attackUnit, this.visitUnit)
      })
    })
  },
  methods: {
    drawLine(xData, yData, yDataAnother, attackUnit, visitUnit) {
      const lineChart = echarts.init(this.$el)
      const option = {
        title: {
          text: '近30天活跃度',
          x: 'left'
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            return params[0].name + '<br/>' +
              params[0].seriesName + ' : ' + params[0].value + '<br/>' + params[1].name + '<br/>' +
              params[1].seriesName + ' : ' + params[1].value
          }
        },
        axisPointer: {
          link: {
            xAxisIndex: 'all'
          }
        },
        // legend: {
        //     data:['流量','降雨量'],
        //     x: 'left'
        // },
        dataZoom: [{
          type: 'inside',
          show: true,
          start: 0,
          end: 100,
          zoomLock: true,
          xAxisIndex: [0, 1]
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
          showDataShadow: false,
          xAxisIndex: [0, 1]
        }],
        grid: [{
          left: 70,
          right: 70,
          height: '35%'
        }, {
          left: 70,
          right: 70,
          top: '55%',
          height: '35%'
        }],
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              onZero: true,
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
            data: xData
          },
          {
            gridIndex: 1,
            type: 'category',
            boundaryGap: false,
            axisLine: {
              onZero: true,
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
            data: xData,
            position: 'top'
          }
        ],
        yAxis: [{
            name: '攻击次数' + '(' + attackUnit + ')',
            type: 'value',
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: '#333'
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
                color: ['#F5F5F5']
              }
            }
          },
          {
            gridIndex: 1,
            name: '访问次数' + '(' + visitUnit + ')',
            type: 'value',
            inverse: true,
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: '#333'
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
                color: ['#F5F5F5']
              }
            }
          }
        ],
        series: [{
            name: '攻击次数',
            type: 'line',
            symbol: 'emptyCircle',
            symbolSize: 8,
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
          },
          {
            name: '访问次数',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: 'rgba(45,144,230,0.8)'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,198,255,0.2)'
                }, {
                  offset: 0.8,
                  color: 'rgba(33,57,183,0.2)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            data: yDataAnother
          }
        ]
      }
      lineChart.setOption(option)
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
