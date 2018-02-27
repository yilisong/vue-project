<template lang="html">
<div class="">
  <div class="">
    <el-select v-model="value" placeholder="请选择" multiple @visible-change="userSelect" @remove-tag="refreshData" @change="allCheck">
      <el-option v-for="item in webList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
      </el-option>
    </el-select>
    <el-date-picker class="date-width" v-model="valueDate" type="daterange" placeholder="选择日期范围" format="yyyy-MM-dd HH:mm:ss" @change="dateChange" :picker-options="pickerOptions">
    </el-date-picker>
  </div>
  <div class="attack-box">
    <ul>
      <li>
        <DataBox title="攻击总次数" :displayData="attackTotal" />
      </li>
      <li>
        <DataBox title="攻击类型总数" :displayData="attackName" />
      </li>
      <li>
        <DataBox title="攻击IP总数" :displayData="attackIp" />
      </li>
    </ul>
  </div>
  <div class="chart-box">
    <div class="chart-size chart-container little-size">
      <BarChart :chartWidth='400' :xData="barXaxisData" :yData="barYaxisData" title="攻击Ip Top5" :unit="barUnit" />
    </div>
    <div class="chart-size chart-container distance-right  little-size">
      <PieChart :xData="pieXaxisData" :yData="pieYaxisData" title="攻击类型Top 10" :unit="pieUnit" />
    </div>
  </div>
  <div class="chart-container distance-box multi-line-size">
    <MultiLineChart :xData="lineXaxisData" :yData="lineYaxisData" title="攻击趋势" :unit="lineUnit" :legendData="lineLegendData" />
  </div>
  <div class="table-box">
    <div class="table-title-box">
      <h3 class="table-title">攻击事件</h3>
      <div class="search-box clearfix">
        <ul>
          <li>
            <!-- <el-input placeholder="攻击类型" icon="search" v-model="attackTypeKey" @click="getAttackLogPage(this.attackCurrentPage, this.attackSize)">
            </el-input> -->
            <el-select v-model="attackTypeKey" placeholder="攻击类型" @change="selectType">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <el-input placeholder="攻击IP" icon="search" v-model="attackIpKey" @click="getAttackLogPage(this.attackCurrentPage, this.attackSize)" @keyup.enter.native="getAttackLogPage(this.attackCurrentPage, this.attackSize)">
            </el-input>
          </li>
          <li>
            <el-input placeholder="攻击域名" icon="search" v-model="attackDomainKey" @click="getAttackLogPage(this.attackCurrentPage, this.attackSize)" @keyup.enter.native="getAttackLogPage(this.attackCurrentPage, this.attackSize)">
            </el-input>
          </li>
        </ul>
      </div>
    </div>
    <el-table :data="attackLogList" style="width: 100%" v-loading="attackLoading">
      <el-table-column prop="Timestamp" label="攻击时间">
      </el-table-column>
      <el-table-column prop="remote_addr" label="攻击IP">
      </el-table-column>
      <el-table-column prop="waf_attack_name" label="攻击类型">
      </el-table-column>
      <el-table-column prop="path" label="攻击URL">
      </el-table-column>
      <el-table-column label="详情">
        <template scope="scope">
            <span class="detail-show" @click="boxShow(scope.row)">详情</span>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="attackSizeChange" @current-change="attackCurrentChange" :current-page="attackCurrentPage" :page-sizes="[5, 20, 50, 100]" :page-size="attackSize" layout="total, sizes, prev, pager, next, jumper" :total="attackTotalLog">
    </el-pagination>
  </div>
  <div class="table-box">
    <div class="table-title-box">
      <h3 class="table-title">扫描事件</h3>
      <div class="search-box clearfix">
        <!-- <el-select v-model="attackTypeKey" placeholder="攻击类型">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
          </el-select>-->
        <ul>
          <li>
            <el-input placeholder="攻击IP" icon="search" v-model="scanIpKey" @click="getWafScanLogPage(this.scanCurrentPage, this.scanSize)" @keyup.enter.native="getWafScanLogPage(this.scanCurrentPage, this.scanSize)">
            </el-input>
          </li>
          <li>
            <el-input placeholder="攻击域名" icon="search" v-model="scanDomainKey" @click="getWafScanLogPage(this.scanCurrentPage, this.scanSize)" @keyup.enter.native="getWafScanLogPage(this.scanCurrentPage, this.scanSize)">
            </el-input>
          </li>
        </ul>
      </div>
    </div>
    <el-table :data="scanLogList" style="width: 100%" v-loading="scanLoading">
      <el-table-column prop="remote_addr" label="扫描IP">
      </el-table-column>
      <el-table-column prop="startTime" label="起始时间">
      </el-table-column>
      <el-table-column prop="lastTime" label="结束时间">
      </el-table-column>
      <el-table-column prop="http_host" label="网站">
      </el-table-column>
      <el-table-column prop="scanner" label="扫描器类型">
      </el-table-column>
      <el-table-column prop="times" label="扫描次数">
      </el-table-column>
      <el-table-column prop="" label="事件分析">
        <template scope="scope">
            <span class="detail-show" @click="detailShow(scope.row)">详情</span>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="scanSizeChange" @current-change="scanCurrentChange" :current-page="scanCurrentPage" :page-sizes="[5, 20, 50, 100]" :page-size="scanSize" layout="total, sizes, prev, pager, next, jumper" :total="scanTotalLog" >
    </el-pagination>
  </div>
  <DetailBox :boxVisible="dialogVisible" :params="dialogParams" :ip="singleIp" />
  <ScanDetails :boxVisible="detailsVisible" :ip="detailsIp" :params="detailsParams" />
</div>
</template>

<script>
import 'src/common/assets/styles/helper-class.css'
import SourceGuardResource from '../../../resource/SourceGuardResource'
import DataBox from '../../../components/common-components/DataBox'
import BarChart from '../../../components/chart-model/BarChart'
import PieChart from '../../../components/chart-model/PieChart'
import MultiLineChart from '../../../components/chart-model/MultipleLineChart'
import DetailBox from '../../../components/common-components/DetailBox'
import ScanDetails from '../../../components/common-components/ScanDetails'
export default {
  components: {
    DetailBox,
    DataBox,
    BarChart,
    PieChart,
    MultiLineChart,
    ScanDetails
  },
  watch: {
    formatPage(newValue) {
      console.log(newValue, '0000new')
    },
    optionCheck(newValue) {
      // if (newValue)
      for (const [i, item] of new Map(this.webList.map((item, i) => [i, item])))
        if (item.value !== '') item.disabled = newValue
      if (newValue) this.value = ['']
    }
  },
  mounted() {
    SourceGuardResource.getWebsiteList().then(response => {
      const data = response.data.data.list
      data.forEach(item => {
        this.webList.push({
          value: item.domain,
          label: item.domain,
          disabled: false
        })
      })
    })
    this.initData()
    // this.getAttackLogPage()
    // this.getWafScanLogPage()
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 ||
            time.getTime() >= Date.now()
          )
        }
      },
      optionCheck: false,
      barXaxisData: [],
      barYaxisData: [],
      pieXaxisData: [],
      pieYaxisData: [],
      lineXaxisData: [],
      lineYaxisData: [],
      detailXaxisData: [],
      detailYaxisData: [],
      attackTotal: [],
      attackName: [],
      attackIp: [],
      singleIp: '',
      detailsIp: '',
      barUnit: '',
      pieUnit: '',
      lineUnit: '',
      lineLegendData: [],
      detailLegendData: [],
      dialogVisible: {
        show: false
      },
      detailsVisible: {
        show: false
      },
      attackLoading: false,
      scanLoading: false,
      attackTypeKey: '',
      attackIpKey: '',
      attackDomainKey: '',
      scanIpKey: '',
      scanDomainKey: '',
      typeOptions: [{
        value: '',
        label: '全部'
      }],
      value: '',
      dialogParams: {},
      userHandle: false,
      valueDate: '',
      domainValue: '',
      dateDataChange: '',
      attackLogList: [],
      attackTotalLog: 0,
      scanLogList: [],
      scanTotalLog: 0,
      attackCurrentPage: 0,
      scanCurrentPage: 0,
      attackSize: 0,
      scanSize: 0,
      attackKeyword: '',
      scanKeyword: '',
      webList: [{
        value: '',
        label: '全部'
      }],
      detailsParams: {}
    }
  },
  methods: {
    boxShow(data) {
      this.dialogVisible.show = true
      this.dialogParams._id = data._id
      this.singleIp = data.remote_addr
      this.dialogParams.start_time = data.Timestamp
      this.dialogParams.end_time = data.Timestamp
      // if (this.dateDataChange) {
      //   this.dialogParams.start_time = data.Timestamp
      //   this.dialogParams.end_time = data.Timestamp
      // }
      console.log(this.dialogParams, '---params')
    },
    detailShow(data) {
      this.detailsVisible.show = true
      this.detailsIp = data.remote_addr
      const params = {
        start_time: data.startTime,
        end_time: data.lastTime,
        remote_addr: data.remote_addr
      }
      this.detailsParams = params
      SourceGuardResource.getWafScanDetails(params).then(response => {
        this.detailLegendData = []
        this.detailYaxisData = []
        this.detailXaxisData = []
        const data = response.data.data
        delete data.from_cache
        console.log(data, 'data')
        for (const i in data) {
          this.detailLegendData.push(i)
          this.detailYaxisData.push({
            name: i,
            type: 'line',
            symbolSize: '8',
            smooth: false,
            data: data[i].trend.y_data.data
          })
          this.detailXaxisData = data[i].trend.x_data
          this.detailUnit = data[i].trend.y_data.unit
        }
      })
    },
    selectType(status) {
      // if (!status)
      this.getAttackLogPage(this.attackCurrentPage, this.attackSize)
    },
    attackSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.attackSize = val
      this.getAttackLogPage(this.attackCurrentPage, this.attackSize)
    },
    attackCurrentChange(val) {
      this.attackCurrentPage = val
      this.getAttackLogPage(this.attackCurrentPage, this.attackSize)
      console.log(`当前页: ${val}`)
    },
    scanSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.scanSize = val
      this.getWafScanLogPage(this.scanCurrentPage, this.scanSize)
    },
    scanCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.scanCurrentPage = val
      this.getWafScanLogPage(this.scanCurrentPage, this.scanSize)
    },
    getAttackLogPage(currentPage, size) {
      const pageCurrent = currentPage || 1
      const perSize = size || 5

      const params = {
        page: pageCurrent,
        per_page: perSize
      }
      if (this.attackTypeKey) params.waf_attack_name = this.attackTypeKey
      if (this.attackIpKey) params.remote_addr = this.attackIpKey
      if (this.attackDomainKey) params.http_host = this.attackDomainKey
      if (this.domainValue) params.sub_domain = this.domainValue
      if (this.dateDataChange) {
        params.start_time = this.dateDataChange[0]
        params.end_time = this.dateDataChange[1]
      }
      this.attackLoading = true
      console.log(params, 'ppppaarraam')
      SourceGuardResource.getWafAttackLogs(params).then(response => {
        this.attackLoading = false
        if (response.data.status.code === 1) {
          this.typeOptions = [{
            value: '',
            label: '全部'
          }]
          response.data.data.waf_attack_types.forEach(item => {
            this.typeOptions.push({
              value: item,
              label: item
            })
          })
          this.attackLogList = response.data.data.list
          this.attackTotalLog = response.data.data.total
          this.attackLogList.forEach(item => {
            item.remote_addr =
              item.remote_addr + '  (' + item.country + item.province + ')'
          })
        }
      })
    },
    getWafScanLogPage(currentPage, size) {
      const pageCurrent = currentPage || 1
      const perSize = size || 5
      const params = {
        page: pageCurrent,
        per_page: perSize
      }
      if (this.scanIpKey) params.remote_addr = this.scanIpKey
      if (this.scanDomainKey) params.http_host = this.scanDomainKey
      if (this.domainValue) params.sub_domain = this.domainValue
      if (this.dateDataChange) {
        params.start_time = this.dateDataChange[0]
        params.end_time = this.dateDataChange[1]
      }
      this.scanLoading = true
      SourceGuardResource.getWafScanLogs(params).then(response => {
        this.scanLoading = false
        this.scanTotalLog = response.data.data.total
        this.scanLogList = response.data.data.list
      })
    },
    initData(domainValue, dateValue) {
      const params = {}
      if (domainValue) params.sub_domain = domainValue
      if (dateValue) {
        params.start_time = dateValue[0]
        params.end_time = dateValue[1]
      }
      SourceGuardResource.getAttackTotal(params).then(response => {
        const data = response.data.data.waf_attack_total_times_format
        this.attackTotal = []
        for (const i in data) {
          this.formatData(i, this.attackTotal, data, '次')
        }
        const dataName = response.data.data.waf_attack_name_times_format
        this.attackName = []
        for (const i in dataName) {
          this.formatData(i, this.attackName, dataName, '种')
        }
      })
      SourceGuardResource.getAttackIp(params).then(response => {
        const data = response.data.data.waf_attack_ip_times_format
        this.attackIp = []
        for (const i in data) {
          this.formatData(i, this.attackIp, data, '个')
        }
      })
      SourceGuardResource.getAttackIpTopFive(params).then(response => {
        const data = response.data.data.top_remote_addr
        this.barXaxisData = []
        this.barYaxisData = []
        this.barUnit = data[0].unit
        data.forEach(item => {
          this.barXaxisData.push(item.ip)
          this.barYaxisData.push(item.format_count)
        })
      })
      SourceGuardResource.getAttackNameTopTen(params).then(response => {
        const data = response.data.data.top_waf_attack_name
        this.pieXaxisData = []
        this.pieYaxisData = []
        this.pieUnit = data[0].unit
        data.forEach(item => {
          this.pieXaxisData.push(item.attack_name)
          this.pieYaxisData.push({
            value: item.format_count,
            name: item.attack_name
          })
        })
      })
      SourceGuardResource.getWafAttackLine(params).then(response => {
        console.log(response, 'res')
        if (response.data.status.code === 1) {
          this.lineLegendData = []
          this.lineYaxisData = []
          this.lineXaxisData = []
          const data = response.data.data
          delete data.from_cache
          for (const i in data) {
            this.lineLegendData.push(i)
            this.lineYaxisData.push({
              name: i,
              type: 'line',
              symbolSize: '8',
              smooth: false,
              data: data[i].trend.y_data.data
            })
            this.lineXaxisData = data[i].trend.x_data
            this.lineUnit = data[i].trend.y_data.unit
          }
          // echarts.dispose(this.$el)
        }
      })
      this.getAttackLogPage()
      this.getWafScanLogPage()
    },
    userSelect(handle) {
      this.userHandle = handle
      if (!handle) {
        this.dataJudge()
        this.initData(this.domainValue, this.dateDataChange)
      }
    },
    dataJudge() {
      let isAll = false
      this.value.forEach(item => {
        if (item === '') isAll = true
      })
      if (!isAll) {
        this.domainValue = this.value.length === 1 ? this.value[0] : this.value
      } else {
        this.domainValue = ''
      }
    },
    refreshData() {
      this.dataJudge()
      this.initData(this.domainValue, this.dateDataChange)
    },
    allCheck() {
      console.log(this.value, '--vv---')
      this.optionCheck = false
      for (const [i, item] of new Map(this.value.map((item, i) => [i, item]))) {
        console.log(item, 'item')
        if (item === '') {
          this.optionCheck = true
        }
      }
    },
    dateChange(date) {
      this.dateDataChange = date.split(' - ')
      this.initData(this.domainValue, this.dateDataChange)
    },
    formatData(i, formatedData, resData, unitValue) {
      const realUnit = unitValue || '个'
      switch (i) {
        case 'Billion':
          formatedData.push({
            value: resData[i],
            unit: '亿'
          })
          break
        case 'ten_thousand':
          formatedData.push({
            value: resData[i],
            unit: '万'
          })
          break
        case 'single':
          formatedData.push({
            value: resData[i],
            unit: realUnit
          })
          break
      }
    },
    handleIconClick(key) {}
  }
}
</script>

<style scoped>
.attack-box {
  margin: 10px auto;
  ul {
    li {
      display: inline-block;
      width: 32.8%;
      /*height: 120px;*/
    }
    li+li {
      margin-left: 3px;
    }
  }
}

.date-width {
  width: 360px !important;
}

.chart-box {
  width: 100%;
}

.chart-size {
  display: inline-block;
  width: 49.3%;
  box-sizing: border-box;
  height: 300px;
}

.table-box {
  margin: 10px 0;
}

.table-title {
  display: inline-block;
  font-weight: 100;
  height: 36px;
  line-height: 36px;
}

.input-size {
  width: 20%;
  float: right;
}

.chart-container {
  background: #fff;
  border: 1px solid #D6D6D6;
  padding: 5px;
}

.distance-right {
  float: right;
}

.distance-box {
  padding: 10px;
}

.detail-show {
  cursor: pointer;
}

.search-box {
  float: right;
  /*width: 42%;*/
  ul {
    li {
      display: inline-block;
    }
  }
}

.table-title-box {
  margin-bottom: 8px;
}

</style><style media="screen">@media screen and (max-width:1440px) {
  .chart-box {
    height: 600px;
    margin-bottom: 20px;
  }
  .chart-box .little-size {
    display: block;
    width: 100%;
  }
  .little-size+.little-size {
    margin-top: 10px;
  }
}
</style>
