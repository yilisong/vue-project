<template lang="html">
<div class="chart-size">

</div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import SourceGuardResource from '../../resource/SourceGuardResource'
import 'echarts/lib/chart/graph'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
export default {
  data() {
    return {
      categories: [],
      fingerPrint: [],
      links: [],
      linkIp: [],
      linkData: [{
        name: this.$route.query.ip,
        draggable: true, // 是否可以拖拽，默认false
        category: 0, // 这是种类，运维1测试2应用3实施4开发5
        number: 0, // 这是编号 非必须，目的仅为方便编写line
        value: 85, //图形大小
        showNum: 25
      }],
      count: 1
    }
  },
  mounted() {
    SourceGuardResource.getwafAPTIpAssociationInfo({
      remote_addr: this.$route.query.ip
    }).then(response => {
      console.log(response, 'response')
      const data = response.data.data
      delete data.from_cache
      for (const i in data) {
        if (i !== 'country' && i !== 'province') {
          this.linkData.push({
              name: data[i] + i,
              draggable: true, // 是否可以拖拽，默认false
              number: this.count, // 这是编号 非必须，目的仅为方便编写line
              value: 65, //图形大小
              showNum: 25 //节点需要显示的额外内容
            })
            ++this.count
        }
      }
      this.linkData.push({
          name: '归属地 ' + data.country + data.province,
          draggable: true, // 是否可以拖拽，默认false
          number: this.count, // 这是编号 非必须，目的仅为方便编写line
          value: 65, //图形大小
          showNum: 25 //节点需要显示的额外内容
        })
        ++this.count
      for (let i = 1; i <= this.count; i++) {
        this.links.push({
          source: this.$route.query.ip, // 可以用name 可以用number，但name不能重名
          target: i
        })
      }
    }).then(response => {
      SourceGuardResource.getwafAPTFingerPrint({
        remote_addr: this.$route.query.ip
      }).then(response => {
        const data = response.data.data
        this.fingerPrint = data.finger_print
        if (data.finger_print.length !== 0)
          data.finger_print.forEach(item => {
            this.linkData.push({
                name: item,
                draggable: true, // 是否可以拖拽，默认false
                number: this.count, // 这是编号 非必须，目的仅为方便编写line
                value: 65, //图形大小
                showNum: 25 //节点需要显示的额外内容
              })
              ++this.count
            this.links.push({
              source: this.$route.query.ip, // 可以用name 可以用number，但name不能重名
              target: item
            })
          })
      }).then(response => {
        if (this.fingerPrint.length !== 0) {
          SourceGuardResource.getwafAPTFingerPrintAssociationAttackIP({
            finger_print: this.fingerPrint
          }).then(response => {
            console.log(response.data.data)
            // this.asso
            const data = response.data.data
            data.ip.forEach((item, index) => {
              if (item === this.$route.query.ip)
                data.ip.splice(index, 1)
            })
            this.linkIp = data.ip
            data.ip.forEach((item, index) => {
              this.linkData.push({
                  name: item,
                  draggable: true, // 是否可以拖拽，默认false
                  number: this.count, // 这是编号 非必须，目的仅为方便编写line
                  value: 45, //图形大小
                  showNum: 25 //节点需要显示的额外内容
                })
                ++this.count
              this.links.push({
                source: this.fingerPrint[index], // 可以用name 可以用number，但name不能重名
                target: item
              })
            })
            // this.drawLink()
          }).then(response => {
            if (this.linkIp.length !== 0) {
              SourceGuardResource.getwafAPTIpAssociationInfo({
                remote_addr: this.linkIp
              }).then(response => {
                this.linkIp.forEach((item, index) => {
                  const preCount = this.count
                  const data = response.data.data
                  delete data.from_cache
                  for (const i in data) {
                    if (i !== 'country' && i !== 'province') {
                      this.linkData.push({
                          name: data[i] + i + 'a',
                          draggable: true, // 是否可以拖拽，默认false
                          number: this.count, // 这是编号 非必须，目的仅为方便编写line
                          value: 35, //图形大小
                          showNum: 25 //节点需要显示的额外内容
                        })
                        ++this.count
                    }
                  }
                  this.linkData.push({
                      name: '归属地1 ' + data.country + data.province,
                      draggable: true, // 是否可以拖拽，默认false
                      number: this.count, // 这是编号 非必须，目的仅为方便编写line
                      value: 35, //图形大小
                      showNum: 25 //节点需要显示的额外内容
                    })
                    ++this.count
                  console.log(preCount, 'pre', this.count, '---')
                  for (let i = preCount; i < this.count; i++) {
                    this.links.push({
                      source: this.linkIp[index], // 可以用name 可以用number，但name不能重名
                      target: i
                    })
                  }
                })
                this.drawLink()
              })
              console.log(this.links, this.linkData)
            } else {
              this.drawLink()
            }
          })
        } else {
          this.drawLink()
        }
      })
    })
  },
  methods: {
    drawLink() {
      const graphChart = echarts.init(this.$el)
      //   const optionTest = {
      //     title: {
      //       text: 'testing'
      //     },
      //     tooltip: {},
      //     animationDurationUpdate: 1500,
      //     animationEasingUpdate: 'quinticInOut',
      //     // legend: {
      //     //   x: "center",
      //     //   show: true,
      //     //   data: ["运维", "测试", '应用', '实施', '开发'] // 此处不显示根节点学生
      //     // },
      //     series: [
      //
      //       {
      //         type: 'graph',
      //         layout: 'force',
      //         symbolSize(size) {
      //           return size
      //         },
      //         focusNodeAdjacency: true,
      //         roam: true,
      //         categories: [{
      //           name: '121.230.208.67'
      //         }, {
      //           name: 'e7bd1bde7bacc703243f8228cc93ea11'
      //         }, {
      //           name: 'acc257fd8062767649ac83648286f23f'
      //           // itemStyle: { 可配置颜色
      //           //     normal: {
      //           //         color: "blue",
      //           //     }
      //           // }
      //         }, {
      //           name: '123.65.166.134'
      //         }, {
      //           name: '123.65.166.213'
      //         }, {
      //           name: '攻击网站数量'
      //         }, {
      //           name: '攻击用户数量'
      //         }, {
      //           name: '运营商'
      //         }],
      //         label: {
      //           normal: {
      //             show: true,
      //             textStyle: {
      //               fontSize: 12
      //             }
      //           }
      //         },
      //         force: {
      //           repulsion: 1000
      //         },
      //         tooltip: {
      //           formatter(node) { // 区分连线和节点，节点上额外显示其他数字
      //             if (!node.value) {
      //               return node.data.name
      //             } else {
      //               return node.data.name + ':' + node.data.showNum
      //             }
      //           }
      //         },
      //         lineStyle: {
      //           normal: {
      //             opacity: 0.9,
      //             width: 1,
      //             curveness: 0.3
      //           }
      //         },
      //         label: {
      //           normal: {
      //             show: true,
      //             position: 'top'
      //           }
      //         },
      //         data: [{
      //           name: '121.230.208.67',
      //           draggable: true, // 是否可以拖拽，默认false
      //           category: 0, // 这是种类，运维1测试2应用3实施4开发5
      //           number: 10, // 这是编号 非必须，目的仅为方便编写line
      //           value: 85, //图形大小
      //           showNum: 25 //节点需要显示的额外内容
      //         }, {
      //           name: 'e7bd1bde7bacc703243f8228cc93ea11',
      //           number: 1,
      //           category: 1,
      //           draggable: true,
      //           value: 60,
      //           showNum: 35
      //         }, {
      //           name: 'acc257fd8062767649ac83648286f23f',
      //           number: 2,
      //           category: 2,
      //           draggable: true,
      //           value: 65,
      //           showNum: 35
      //         }, {
      //           name: '123.65.166.134',
      //           number: 3,
      //           category: 3,
      //           draggable: true,
      //           value: 65,
      //           showNum: 35
      //         }, {
      //           name: '123.65.166.213',
      //           number: 4,
      //           category: 4,
      //           draggable: true,
      //           value: 65,
      //           showNum: 35
      //         }, {
      //           name: '攻击网站数量',
      //           number: 5,
      //           category: 5,
      //           draggable: true,
      //           value: 65,
      //           showNum: 35
      //         }, {
      //           name: '攻击用户数量',
      //           number: 6,
      //           category: 5,
      //           draggable: true,
      //           value: 55,
      //           showNum: 35
      //         }, {
      //           name: '运营商',
      //           number: 7,
      //           category: 5,
      //           draggable: true,
      //           value: 50,
      //           showNum: 35
      //         }],
      //         links: [{
      //           source: '121.230.208.67', // 可以用name 可以用number，但name不能重名
      //           target: 1
      //         }, {
      //           source: '121.230.208.67',
      //           target: 2
      //         }, {
      //           source: 1,
      //           target: 3
      //         }, {
      //           source: 2,
      //           target: 4
      //         }, {
      //           source: 3,
      //           target: 5
      //         }, {
      //           source: 3,
      //           target: 6
      //         }, {
      //           source: 3,
      //           target: 7
      //         }]
      //       }
      //     ]
      //   }
      //   graphChart.setOption(optionTest)
      // }
      const optionTest = {
        title: {
          text: 'testing'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        // legend: {
        //   x: "center",
        //   show: true,
        //   data: ["运维", "测试", '应用', '实施', '开发'] // 此处不显示根节点学生
        // },
        series: [

          {
            type: 'graph',
            layout: 'force',
            symbolSize(size) {
              return size
            },
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                }
              }
            },
            force: {
              repulsion: 1000
            },
            tooltip: {
              formatter(node) { // 区分连线和节点，节点上额外显示其他数字
                if (!node.value) {
                  return node.data.name
                } else {
                  return node.data.name + ':' + node.data.showNum
                }
              }
            },
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0.3
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: this.linkData,
            links: this.links
          }
        ]
      }
      graphChart.setOption(optionTest)
    }
  }
}
</script>

<style lang="css" scoped>
.chart-size {
  width: 100%;
  height: 600px;
}
</style>
