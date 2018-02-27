<template  lang="html">
<div>
  <div class="toolbar">
   <el-select v-model="selectValue" multiple filterable placeholder="默认所有域名" @change="changeDomain" @visible-change="searchInput($event)" id="searchInput_distribution">
      <el-option v-for="(item, index) in optionsList" :key="index" :label="item.domain" :value="item.domain"></el-option>
    </el-select>
    <span class="select-cunt-text">已选：<span class="select-cunt">{{ selectLength }}</span></span>
    <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
  </div>

  <div>
    <div class="top_charts">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="8" :lg="8">
          <div class="grid-content bg-purple-light">
            <div id="browserDistributionCharts" class="traffic_chart" v-loading="leidaLoading" element-loading-text="拼命加载中"></div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="8" :lg="8">
          <div class="grid-content bg-purple">
            <div id="ispDistributionCharts" class="traffic_chart" v-loading="leidaLoading" element-loading-text="拼命加载中"></div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="8" :lg="8">
          <div class="grid-content bg-purple">
            <div id="operatingSystemDistributionCharts" class="traffic_chart" v-loading="leidaLoading" element-loading-text="拼命加载中"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class='hot_banner bottom_charts' v-loading="nationalLoading" element-loading-text="拼命加载中">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全国分布" name="first">
          <div>
            <el-row :gutter="20">
              <el-col :span="16">
                <div class="grid-content bg-purple">
                  <div class="charts" id="nationalDistributionCharts"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple tongji_Banner">
                  <div class="top_title">请求次数统计排名 <span class="top_5">Top 5</span></div>
                  <div class="top_progress_bar" id="nationalTop0">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ nationalTop5[0] }}</el-col>
                      <el-col :span="12" class="textRight">{{nationalTip[0]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{nationalTipPercent[0]}}%</div>
                      <el-progress :text-inside="true" :stroke-width="16" :percentage="nationalTop5Percent[0]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                  <div class="top_progress_bar" id="nationalTop1">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ nationalTop5[1] }}</el-col>
                      <el-col :span="12" class="textRight">{{nationalTip[1]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{nationalTipPercent[1]}}%</div>
                      <el-progress :text-inside="false" :stroke-width="16" :percentage="nationalTop5Percent[1]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                  <div class="top_progress_bar" id="nationalTop2">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ nationalTop5[2] }}</el-col>
                      <el-col :span="12" class="textRight">{{nationalTip[2]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{nationalTipPercent[2]}}%</div>
                      <el-progress :text-inside="false" :stroke-width="16" :percentage="nationalTop5Percent[2]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                  <div class="top_progress_bar" id="nationalTop3">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ nationalTop5[3] }}</el-col>
                      <el-col :span="12" class="textRight">{{nationalTip[3]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{nationalTipPercent[3]}}%</div>
                      <el-progress :text-inside="false" :stroke-width="16" :percentage="nationalTop5Percent[3]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                  <div class="top_progress_bar" id="nationalTop4">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ nationalTop5[4] }}</el-col>
                      <el-col :span="12" class="textRight">{{nationalTip[4]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{nationalTipPercent[4]}}%</div>
                      <el-progress :text-inside="false" :stroke-width="16" :percentage="nationalTop5Percent[4]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="全球分布" name="second" ref="chartWidth">
          <div class="hot_banner"  v-loading="globalLoading" element-loading-text="拼命加载中">
            <el-row :gutter="20">
              <el-col :span="16">
                <div class="grid-content bg-purple">
                  <div class="charts" id="globalDistributionCharts"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple tongji_Banner">
                  <div class="top_title">请求次数统计排名 <span class="top_5">Top 5</span></div>
                  <div class="top_progress_bar" id="globalTop0">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ globalTop5[0] }}</el-col>
                      <el-col :span="12" class="textRight">{{globalTip[0]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{globalTipPercent[0]}}%</div>
                      <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[0]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                  <div class="top_progress_bar" id="globalTop1">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ globalTop5[1] }}</el-col>
                      <el-col :span="12" class="textRight">{{globalTip[1]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{globalTipPercent[1]}}%</div>
                      <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[1]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                  <div class="top_progress_bar" id="globalTop2">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ globalTop5[2] }}</el-col>
                      <el-col :span="12" class="textRight">{{globalTip[2]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{globalTipPercent[2]}}%</div>
                      <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[2]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                  <div class="top_progress_bar" id="globalTop3">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ globalTop5[3] }}</el-col>
                      <el-col :span="12" class="textRight">{{globalTip[3]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{globalTipPercent[3]}}%</div>
                      <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[3]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                  <div class="top_progress_bar" id="globalTop4">
                    <el-row :gutter="20">
                      <el-col :span="12">{{ globalTop5[4] }}</el-col>
                      <el-col :span="12" class="textRight">{{globalTip[4]}}</el-col>
                    </el-row>
                    <el-tooltip placement="top">
                      <div slot="content">占比总请求 {{globalTipPercent[4]}}%</div>
                      <el-progress :text-inside="false" :stroke-width="16" :percentage="globalTop5Percent[4]" status="success" :show-text="false"></el-progress>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</div>
</template>
<script>
import Echarts from 'echarts'
import EchartsChinaMap from 'echarts/map/js/china'
import EchartsWorldMap from 'echarts/map/js/world'
import DateSelection from 'common/components/DateSelect/date-selection'
import NameMapVal from 'common/config/nameMap'

export default {
  components: {
    DateSelection,
    Echarts,
    NameMapVal
  },
  data() {
    return {
      selectLength: '全部',
      startTimevalue: '',
      endTimevalue: '',
      optionsList: '',
      selectValue: [],
      activeName: 'first',
      leidaLoading: true,
      nationalLoading: true,
      globalLoading: true,
      globalDistributionChart: null,
      nationalDistributionChart: null,
      ispDistributionChart: null,
      browserDistributionChart: null,
      operatingSystemDistributionChart: null,
      topISP: [],
      topISPSeries: [],
      topOs: [],
      topBrowser: [],
      topBrowserSeries: [],
      nationalDistributionSeries: [],
      globalDistributionSeries: [],
      globalDistributionData: [],
      nationalTop5: [],
      nationalTip: [],
      nationalTop5Percent: [],
      nationalTipPercent:[],
      globalTop5: [],
      globalTip: [],
      globalTop5Percent: [],
      globalTipPercent: [],
      /*max最大值*/
      /*数据返回空时的数组*/
      emptyISP: [
        { name: '电信', max: 10 },
        { name: '移动', max: 10 },
        { name: '联通', max: 10 },
        { name: '铁通', max: 10 }
      ],
      emptyISPSeries: [0, 0, 0, 0],
      emptyBrowser: [
        { name: 'Chrome', max: 10 },
        { name: 'Firefox', max: 10 },
        { name: '360浏览器', max: 10 },
        { name: 'IE', max: 10 }
      ],
      emptyBrowserSeries: [0, 0, 0, 0],
      emptySystemSeries: [{ value: 0, name: '暂无数据' }]
    }
  },
  watch: {

  },
  created() {
    const params = { per_page:1000 }
    this.fetchGet('Web.Domain.list', params).then(result => {
      if (result.ok) {
        result.json().then(res => {
          if (res && (res.status.code === 1) && res.data) {
            this.optionsList = res.data.list
          }
        })
      }
    }, e => {})
  },
  methods: {
    handleClick(tab, event) {},
    searchInput(ev) {
      const search = document.getElementById('searchInput_distribution')
      const searchInput = search.childNodes[0].childNodes[1]
      if (ev === true) {
        searchInput.style.display = 'block'
      } else {
        searchInput.style.display = 'none'
      }
    },
    isEmpty(data) {
      for (const name in data) {
        if (data.propertyIsEnumerable(name)) {
          if (typeof(data[name] === 'object')) {
            // this.isEmpty(data[name])
            for (const i in data[name]) {
              if (data[name][i].length === 0) {
                return
              } else {
                return false
              }
            }
          } else {
            // console.log(data[name], 'butterfly')
          }
        }
      }
    },
    changeDomain() {
      this.leidaLoading = true
      this.nationalLoading = true
      this.globalLoading = true
      const params = {
        sub_domain: this.selectValue,
        start_time: this.startTimevalue,
        end_time: this.endTimevalue
      }
      this.selectLength = this.selectValue.length
      this.fetchDistributionRequest(params)
    },
    consoleTimeValue(startTimevalue, endTimevalue) {
      this.leidaLoading = true
      this.nationalLoading = true
      this.globalLoading = true
      this.startTimevalue = startTimevalue
      this.endTimevalue = endTimevalue
      const params = {
        sub_domain: this.selectValue,
        start_time: this.startTimevalue,
        end_time: this.endTimevalue
      }
      this.fetchDistributionRequest(params)
    },
    ispDistribution() {
      if (!document.getElementById('ispDistributionCharts')) {
        return
      }
      this.ispDistributionChart = Echarts.init(document.getElementById('ispDistributionCharts'))
      this.ispDistributionChart.setOption({
        title: {
          text: 'ISP 分布'
        },
        tooltip: {
          // algin: 'right'
        },
        radar: {
          indicator: this.topISP
        },
        series: [{
          name: 'ISP 分布',
          type: 'radar',
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default',
                color: '#7bca6a'
              },
              borderColor: '#7bca6a',
              color: '#7bca6a'
            }
          },
          data: [{
            value: this.topISPSeries,
            name: 'ISP 分布'
          }]
        }]
      })
    },
    browserDistribution() {
      if (!document.getElementById('browserDistributionCharts')) {
        return
      }
      this.browserDistributionChart = Echarts.init(document.getElementById('browserDistributionCharts'))
      this.browserDistributionChart.setOption({
        title: {
          text: '浏览器分布'
        },
        tooltip: {},
        radar: {
          // shape: 'circle',
          indicator: this.topBrowser
        },
        series: [{
          name: '浏览器分布',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [{
            value: this.topBrowserSeries,
            name: '浏览器分布'
          }]
        }]
      })
    },
    operatingSystemDistribution() {
      if (!document.getElementById('operatingSystemDistributionCharts')) {
        return
      }
      this.operatingSystemDistributionChart = Echarts.init(document.getElementById('operatingSystemDistributionCharts'))
      this.operatingSystemDistributionChart.setOption({
        title: {
          text: '操作系统分布'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        calculable: true,
        series: [{
          name: '操作系统分布',
          type: 'pie',
          radius: [30, 110],
          center: ['50%', '50%'],
          roseType: 'area',
          data: this.topOs
        }]
      })
    },
    nationalDistribution() {
      const vm = this
      if (!document.getElementById('nationalDistributionCharts')) {
        return
      }
      this.nationalDistributionChart = Echarts.init(document.getElementById('nationalDistributionCharts'))
      this.nationalDistributionChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter(params) {
            let percent = ''
            for (let i = 0; i < vm.nationalDistributionSeries.length; i++) {
              if (vm.nationalDistributionSeries[i].name === params.name) {
                percent = vm.nationalDistributionSeries[i].percent
              }
            }
            let res
            if (params.value) {
              res = '全国分布<br/>' + params.name + ': ' + params.value + '次<br/>占比: ' + percent + '%'
            } else {
              res = '全国分布<br/>暂无数据'
            }
            return res
          }
        },
        visualMap: {
          type: 'piecewise',
          min: 0,
          max: this.nationalDistributionSeries[0] ? this.nationalDistributionSeries[0].value : 100,
          left: 'left',
          top: 'bottom',
          color: ['#104da5', '#2d6fbc', '#6ebaef'],
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true
        },
        series: [{
          name: '全国分布',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: this.nationalDistributionSeries
        }]
      })
    },
    globalDistribution() {
      const vm = this
      if (!document.getElementById('globalDistributionCharts')) {
        return
      }
      this.globalDistributionChart = Echarts.init(document.getElementById('globalDistributionCharts'))
      this.globalDistributionChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter(params) {
            let percent = ''
            let value = (params.value + '').split('.')
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
            if (value === '' || value === 'NaN') {
              return params.seriesName + '<br/>暂无数据'
            } else {
              for (let i = 0; i < vm.globalDistributionSeries.length; i++) {
                if (vm.globalDistributionSeries[i].name === params.name) {
                  percent = vm.globalDistributionSeries[i].percent
                }
              }
              let res
              if (params.value) {
                res = '世界分布<br/>' + params.name + ': ' + params.value + '次<br/>占比: ' + percent + '%'
              } else {
                res = '世界分布<br/>暂无数据'
              }
              return res
            }
          }
        },
        visualMap: {
          type: 'piecewise',
          min: 0,
          max: this.globalDistributionSeries[0] ? this.globalDistributionSeries[0].value : 100,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#6ebaef', '#2d6fbc', '#104da5']
          }
        },
        series: [{
          name: '全球分布',
          type: 'map',
          mapType: 'world',
          roam: true,
          itemStyle: {
            emphasis: {
              label: {
                show: true
              }
            }
          },
          data: this.globalDistributionSeries,
          nameMap: NameMapVal.nameMap
        }]
      })
    },
    fetchDistributionRequest(params) {
      this.fetchPost('Web.Domain.Report.Request.overview', params)
      .then(result => {
        if (result.ok) {
          return result.json()
        }
      })
      .then(res => {
        if (res && res.status.code === 1 && res.data) {
          this.leidaLoading = false
          if (!this.isEmpty(res.data)) {
            const data = res.data
            if (data.top_os.list.length > 0) {
              this.topOs = data.top_os.list
            } else {
              this.topOs = this.emptySystemSeries
            }
            if (data.top_isp.shape_list.length > 0 && data.top_isp.series_list.length > 0) {
              this.topISP = data.top_isp.shape_list
              this.topISPSeries = data.top_isp.series_list
            } else {
              this.topISP = this.emptyISP
              this.topISPSeries = this.emptyISPSeries
            }
            if (data.top_browser.shape_list.length > 0 && data.top_browser.series_list.length > 0) {
              this.topBrowser = data.top_browser.shape_list
              this.topBrowserSeries = data.top_browser.series_list
            } else {
              this.topBrowser = this.emptyBrowser
              this.topBrowserSeries = this.emptyBrowserSeries
            }
          } else {
            this.topISP = this.emptyISP
            this.topISPSeries = this.emptyISPSeries
            this.topOs = this.emptySystemSeries
            this.topBrowser = this.emptyBrowser
            this.topBrowserSeries = this.emptyBrowserSeries
          }
        }
      })
      .then(res => {
        this.ispDistribution('ispDistributionCharts')
        this.browserDistribution('browserDistributionCharts') //0
        this.operatingSystemDistribution('operatingSystemDistributionCharts')
      })
      /*省份TOP10*/
      this.fetchPost('Web.Domain.Report.Request.province', params).then(result => {
        if (result.ok) {
          return result.json()
          }
        })
      .then(res => {
        if (res && res.status.code === 1 && res.data) {
          this.nationalTip = []
          this.nationalTop5 = []
          this.nationalTop5Percent = []
          this.nationalTipPercent = []
          this.nationalLoading = false
          function GetPercent(num, total) {
            return total <= 0 ? '0' : (Math.round(num / total * 10000) / 100.00)
          }
          this.nationalDistributionSeries = res.data.list
          if (res.data.list.length > 4) {
            const top0 = res.data.list[0].value
            const top1 = res.data.list[1].value
            const top2 = res.data.list[2].value
            const top3 = res.data.list[3].value
            const top4 = res.data.list[4].value
            const fiveTotal = Number(top0)
            for (let i = 0; i < 5; i++) {
              if (document.getElementById('nationalTop' + i)) {
                document.getElementById('nationalTop' + i).style.display = 'block'
              } else {
                return
              }
            }
            this.nationalTip[0] = top0 + '次'
            this.nationalTip[1] = top1 + '次'
            this.nationalTip[2] = top2 + '次'
            this.nationalTip[3] = top3 + '次'
            this.nationalTip[4] = top4 + '次'
            for (let i = 0; i < 5; i++) {
              this.nationalTop5[i] = res.data.list[i].name
              this.nationalTop5Percent[i] = GetPercent(res.data.list[i].value, fiveTotal)
              this.nationalTipPercent[i] = res.data.list[i].percent
            }
          } else if (res.data.list.length > 0 && res.data.list.length < 5) {
            for (let i = 0; i < 5; i++) {
              if (document.getElementById('nationalTop' + i)) {
                document.getElementById('nationalTop' + i).style.display = 'none'
              } else {
                return
              }
            }
            /*求和  百分比*/
            let totalArr = 0
            for (let i = 0; i < res.data.list.length; i++) {
              totalArr += res.data.list[i].value
            }
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].name) {
                this.nationalTop5[i] = res.data.list[i].name
                this.nationalTop5Percent[i] = GetPercent(res.data.list[i].value, totalArr)
                this.nationalTipPercent[i] = res.data.list[i].percent
                this.nationalTip[i] = res.data.list[i].value + '次'
                if (document.getElementById('nationalTop' + i)) {
                  document.getElementById('nationalTop' + i).style.display = 'block'
                } else {
                  return
                }
              }
            }
          } else {
            for (let i = 1; i < 5; i++) {
              if (document.getElementById('nationalTop' + i)) {
                document.getElementById('nationalTop' + i).style.display = 'none'
              } else {
                return
              }
            }
            this.nationalTop5Percent = [0, 0, 0, 0, 0]
            this.nationalTipPercent = [0, 0, 0, 0, 0]
            this.nationalTop5 = ['暂无数据']
            this.nationalTip = ['暂无']
            this.nationalDistributionSeries = [{ name: '南海诸岛', value: 0 }]
          }
        }
      })
      .then(res => {
        this.$nextTick(function(e) {
          this.nationalDistribution('nationalDistributionCharts')
        })
      })
      /*国家TOP10*/
      this.fetchPost('Web.Domain.Report.Request.country', params).then(result => {
        if (result.ok) {
          return result.json()
          }
        })
      .then(res => {
        if (res && res.status.code === 1 && res.data) {
          this.globalTip = []
          this.globalTop5 = []
          this.globalTop5Percent = []
          this.globalTipPercent = []
          this.globalLoading = false
          function GetPercent(num, total1) {
            return total1 <= 0 ? '0' : (Math.round(num / total1 * 10000) / 100.00)
          }
          this.globalDistributionSeries = res.data.list
          if (res.data.list.length > 4) {
            const top0 = res.data.list[0].value
            const top1 = res.data.list[1].value
            const top2 = res.data.list[2].value
            const top3 = res.data.list[3].value
            const top4 = res.data.list[4].value
            const fiveTotal = Number(top0)
            /**/
            for (let i = 0; i < 5; i++) {
              if (document.getElementById('globalTop' + i)) {
                document.getElementById('globalTop' + i).style.display = 'block'
              } else {
                return
              }
            }
            this.globalTip[0] = top0 + '次'
            this.globalTip[1] = top1 + '次'
            this.globalTip[2] = top2 + '次'
            this.globalTip[3] = top3 + '次'
            this.globalTip[4] = top4 + '次'
            for (let i = 0; i < 5; i++) {
              this.globalTop5[i] = res.data.list[i].name
              this.globalTop5Percent[i] = GetPercent(res.data.list[i].value, fiveTotal)
              this.globalTipPercent[i] = res.data.list[i].percent
            }
          } else if (res.data.list.length > 0 && res.data.list.length < 5) {
            for (let i = 0; i < 5; i++) {
              if (document.getElementById('globalTop' + i)) {
                document.getElementById('globalTop' + i).style.display = 'none'
              } else {
                return
              }
            }
            /*求和  百分比*/
            let totalArr = 0
            for (let i = 0; i < res.data.list.length; i++) {
              totalArr += res.data.list[i].value
            }
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].name) {
                this.globalTop5[i] = res.data.list[i].name
                this.globalTop5Percent[i] = GetPercent(res.data.list[i].value, totalArr)
                this.globalTipPercent[i] = res.data.list[i].percent
                this.globalTip[i] = res.data.list[i].value + '次'
                if (document.getElementById('globalTop' + i)) {
                  document.getElementById('globalTop' + i).style.display = 'block'
                } else {
                  return
                }
              }
            }
          } else {
            for (let i = 1; i < 5; i++) {
              if (document.getElementById('globalTop' + i)) {
                document.getElementById('globalTop' + i).style.display = 'none'
              } else {
                return
              }
            }
            this.globalTop5Percent = [0, 0, 0, 0, 0]
            this.globalTipPercent = [0, 0, 0, 0, 0]
            this.globalTop5 = ['暂无数据']
            this.globalTip = ['暂无']
            this.globalDistributionSeries = [{ name: '中国', value: 0 , percent:0 }]
          }
        }
      })
      .then(res => {
        this.$nextTick(function(e) {
          this.globalDistribution('globalDistributionCharts')
        })
      })
    }
  },
  mounted() {
    const w = document.getElementById('nationalDistributionCharts').clientWidth
    document.getElementById('globalDistributionCharts').style.width = w + 'px'
    document.getElementById('nationalDistributionCharts').style.width = w + 'px'
  }
}
</script>

<style lang="css" scoped>
.charts {
  width: 100%;
  height: 685px;
}

.top_charts .grid-content {
  height: 318px;
}

.traffic_chart {
  height: 310px;
}

.bottom_charts {
  margin-top: 29px;
}

.bottom_charts .el-tab-pane>div {
  border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px, rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;
}

.bottom_charts .grid-content {
  background: #fff;
  border: none;
}

.top_title {
  margin-top: 47px;
}

.top_5 {
  color: #fd0264;
  font-size: 20px;
}

.top_progress_bar {
  padding: 30px 10px;
  width: 80%;
  margin-top: 10px;
}

.top_progress_bar:hover {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}
.tongji_Banner .el-row {
  margin-bottom: 0px;
}
.tongji_Banner .el-row .textRight {
  text-align: right;
}
.el-select {
  /*width: 300px!important;*/
}
@media (max-width: 1280px) {
  .el-select {
    /*width: 167px!important;*/
  }
}
@media (max-width: 1366px) {
  .el-select {
    /*width: 240px!important;*/
  }
}
</style>
