<template>
<console-page-layout title="统计报表">
  <div slot="tab">
  </div>
  <div class="first-content">
    <ul>
      <li>
        <DataBox title="防护网站数量" colorName="blue" :displayData="defenseTotal" />
      </li>
      <li>
        <DataBox title="今日受攻击次数" colorName="orange" :displayData="attackTotal" />
      </li>
      <li>
        <DataBox title="今日受攻击IP个数" colorName="gray" :displayData="attackIp" />
      </li>
      <li>
        <DataBox title="今日受攻击类型数" colorName="slate-gray" :displayData="attackType" />
      </li>
    </ul>
  </div>
  <div class="web-list">
    <div class="list-display-container">
      <h3>近7天发现WebShell列表</h3>
      <ul>
        <li class="list-title"><span>WebShell</span><span>发现时间</span><span>最近一次访问时间</span></li>
        <!-- <li v-for="(item,index) in webShellList" v-if="index<4">
          <span><a href="#">{{item.url}}</a></span><span>{{item.time}}</span><span>{{item.visitTime}}</span>
        </li> -->
        <li class="empty-data"><span>暂无数据</span></li>
      </ul>
      <a class="distance" v-if="webShellList.length>9" href="/console/red-guard#/menaceAnalyze">更多</a>
    </div>
    <div class="list-display-container position-right">
      <h3>今日受攻击网站</h3>
      <ol>
        <li class="list-title"><span>网站</span><span>总攻击次数</span><span>总攻击类型</span></li>
        <li v-for="(item,index) in attackedSite" v-if="total">
          <span>{{item.domain}}</span><span>{{item.count.data}}{{item.count.unit}}</span><span>{{item.waf_attack_name_count.data}}{{item.waf_attack_name_count.unit}}</span>
        </li>
        <li class="empty-data" v-if="!total"><span>暂无数据</span></li>
      </ol>
    </div>
  </div>
  <div class="">
    <LineChart />
  </div>
  <div class="">
    <h3 class="table-title">今日攻击事件</h3>
    <el-table :data="logList" style="width: 100%" v-loading="loading">
      <el-table-column prop="Timestamp" label="攻击时间">
      </el-table-column>
      <el-table-column prop="remote_addr" label="攻击IP">
      </el-table-column>
      <el-table-column prop="waf_attack_name" label="攻击类型">
      </el-table-column>
      <el-table-column prop="request_url" label="攻击URL">
      </el-table-column>
      <el-table-column label="详情">
        <template scope="scope">
            <span class="detail-show" @click="boxShow(scope.row)">详情</span>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalLog">
    </el-pagination>
    <DetailBox :boxVisible="dialogVisible" :params="dialogParams" :ip="singleIp" />
  </div>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import SourceGuardResource from '../../resource/SourceGuardResource'
import LineChart from '../../components/chart-model/LineChart'
import DataBox from '../../components/common-components/DataBox'
import '../../assets/styles/common.css'
import DetailBox from '../../components/common-components/DetailBox'

export default {
  components: {
    ConsolePageLayout,
    LineChart,
    DataBox,
    DetailBox
  },
  mounted() {
    SourceGuardResource.getAttackTotal().then(response => {
      if (response.data.status.code === 1) {
        const totalData = response.data.data.waf_attack_total_times_format
        for (const i in totalData) {
          this.formatData(i, this.attackTotal, totalData, '次')
        }
        const typeData = response.data.data.waf_attack_name_times_format
        for (const i in typeData) {
          this.formatData(i, this.attackType, typeData, '种')
        }
      }
    })
    SourceGuardResource.getAttackIp().then(response => {
      if (response.data.status.code === 1) {
        const ipData = response.data.data.waf_attack_ip_times_format
        for (const i in ipData) {
          this.formatData(i, this.attackIp, ipData, '个')
        }
      }
    })
    SourceGuardResource.getDefenseCount().then(response => {
      if (response.data.status.code === 1) {
        const defenseData = response.data.data.count_format
        for (const i in defenseData) {
          this.formatData(i, this.defenseTotal, defenseData, '个')
        }
      }
    })
    SourceGuardResource.getWafAttackSite().then(response => {
      if (response.data.status.code === 1) {
        this.attackedSite = response.data.data.list
        this.total = response.data.data.total
      }
    })
    this.getLogPage()
  },
  data() {
    return {
      loading: false,
      total: '',
      singleIp: '',
      dialogParams: {},
      dialogVisible: {
        show: false
      },
      attackTotal: [],
      attackType: [],
      attackIp: [],
      defenseTotal: [],
      currentPage: 1,
      pageSize: 5,
      totalLog: 0,
      attackedSite: [],
      logList: [],
      webShellList: [{
        url: 'www.osh.com',
        time: '2017-09-09',
        visitTime: '2017-09-09'
      }, {
        url: 'www.osh.com',
        time: '2017-09-09',
        visitTime: '2017-09-09'
      }, {
        url: 'www.pcy.com',
        time: '2017-09-09',
        visitTime: '2017-09-09'
      }, {
        url: 'www.pcy.com',
        time: '2017-09-09',
        visitTime: '2017-09-09'
      }, {
        url: 'www.pcy.com',
        time: '2017-09-09',
        visitTime: '2017-09-09'
      }, {
        url: 'www.pcy.com',
        time: '2017-09-09',
        visitTime: '2017-09-09'
      }, {
        url: 'www.pcy.com',
        time: '2017-09-09',
        visitTime: '2017-09-09'
      }],
      targetWebList: [{
        url: 'www.osh.com',
        attackCount: 'x,xxx万次',
        attackType: '20种'
      }, {
        url: 'www.osh.com',
        attackCount: 'x,xxx万次',
        attackType: '20种'
      }, {
        url: 'www.osh.com',
        attackCount: 'x,xxx万次',
        attackType: '20种'
      }, {
        url: 'www.osh.com',
        attackCount: 'x,xxx万次',
        attackType: '20种'
      }]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getLogPage(this.currentPage, this.pageSize)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getLogPage(this.currentPage, this.pageSize)
    },
    boxShow(data) {
      this.dialogVisible.show = true
      console.log(this.dialogVisible, '---0-')
      this.dialogParams._id = data._id
      this.singleIp = data.remote_addr
    },
    getLogPage(currentPage, size, keyword) {
      const pageCurrent = currentPage || 1
      const perSize = size || 5

      const params = {
        page: pageCurrent,
        per_page: perSize
      }
      this.loading = true
      SourceGuardResource.getWafAttackLogs(params).then(response => {
        this.loading = false
        if (response.data.status.code === 1) {
          this.logList = response.data.data.list
          this.totalLog = parseInt(response.data.data.total, 0)
          this.logList.forEach(item => {
            item.remote_addr = item.remote_addr + '  (' + item.country + item.province + ')'
          })
        }
      })
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
    }
  }
}
</script>

<style lang="" scoped>
.table-title {
  font-weight: 100;
  margin: 15px 0 10px;
}

.first-content ul li {
  width: 24.2%;
  display: inline-block;
}

.first-content ul li+li {
  margin-left: 5px;
}

.web-list {
  margin: 20px 0;
}

.web-list div {
  width: 49%;
  height: 281px;
  overflow: auto;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  padding: 13px;
  border: 1px solid #D6D6D6;
  span {
    padding: 0 5px;
  }
}

.position-right {
  float: right;
}

.list-display-container {
  background: #fff;
  h3 {
    font-weight: 100;
    padding-bottom: 10px;
  }
  .list-title {
    background: #EAEAEA;
    height: 35px;
    line-height: 35px;
    padding: 0 10px;
  }
  li {
    span {
      display: inline-block;
      width: 30.5%;
    }
  }
  li+li {
    border-bottom: 1px solid #EAEAEA;
    height: 43px;
    line-height: 43px;
    padding: 0 8px;
  }
}

.detail-show {
  cursor: pointer;
}

.page-body {
  background: #F9F9F9;
}

.distance {
  margin-left: 12px;
}

.list-display-container .empty-data {
  text-align: center;
  margin-top: 50px;
  border-bottom: none;
}
</style>
