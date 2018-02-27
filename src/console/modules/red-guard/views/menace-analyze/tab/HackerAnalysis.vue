<template lang="html">
<div class="">
  <ul class="switch-button">
    <li v-bind:class="{active:isCountry}" @click="mapShow(true)">全国</li>
    <li v-bind:class="{active:!isCountry}" @click="mapShow(false)">全球</li>
  </ul>
  <div class="map-size" v-show="isCountry">
    <MapChart style="width:60%;" :mapData="mapData" mapType="china" :max="maxNative" />
    <ul class="circle-container">
      <li class="circle-title">攻击IP个数统计排名 Top5</li>
      <li>
        <PiePercentChart :realData="circleChina[0]" colorConfig="#6934ff" />
      </li>
      <li>
        <PiePercentChart :realData="circleChina[1]" colorConfig="#5c40f7" />
      </li>
      <li>
        <PiePercentChart :realData="circleChina[2]" colorConfig="#4b4fec" />
      </li>
      <li>
        <PiePercentChart :realData="circleChina[3]" colorConfig="#3564de" />
      </li>
      <li>
        <PiePercentChart :realData="circleChina[4]" colorConfig="#0e88c5" />
      </li>
      <!--v-for循环-->
    </ul>
  </div>
  <div class="map-size" v-show="!isCountry">
    <MapChart style="width:50%;" :mapData="worldData" mapType="world" :max="maxWorld" />
    <ul class="circle-container">
      <li class="circle-title">攻击IP个数统计排名 Top5</li>
      <li>
        <PiePercentChart :realData="circleWorld[0]" />
      </li>
      <li>
        <PiePercentChart :realData="circleWorld[1]" />
      </li>
      <li>
        <PiePercentChart :realData="circleWorld[2]" />
      </li>
      <li>
        <PiePercentChart :realData="circleWorld[3]" />
      </li>
      <li>
        <PiePercentChart :realData="circleWorld[4]" />
      </li>
      <!--v-for循环-->
    </ul>
  </div>
  <div class="table-box">
    <h3 class="table-title">近30天攻击IP列表</h3>
    <div class="search-box">
      <ul>
        <li>
          <el-input placeholder="攻击IP" icon="search" v-model="attackIpKey" @click="searchIp" @keyup.enter.native="searchIp">
          </el-input>
        </li>
      </ul>
    </div>
  </div>
  <el-table :data="attackData" style="width: 100%" v-loading="loading">
    <el-table-column prop="remote_addr" label="IP">
      <template scope="scope">
        <router-link :to="{ path: '/menaceAnalyze/hackerProfile', query: { ip:scope.row.remote_addr}}" append><p style="color: #2d90e6;">{{scope.row.remote_addr}}  ({{scope.row.country}}{{scope.row.province}})</p></router-link>
  </template>
    </el-table-column>
    <el-table-column label="风险等级">
      <template scope="scope">
        <i v-if="scope.row.risk_level==='高危'" class="yun-icon yun-table-icon yun-high-threat"></i>
        <i v-if="scope.row.risk_level==='中危'" class="yun-icon yun-table-icon yun-medium-threat"></i>
        <i v-if="scope.row.risk_level==='低危'" class="yun-icon yun-table-icon yun-low-threat"></i>
        <!-- <i v-bind:class="{high-level:scope.row.risk_level==='高危',mid-level:scope.row.risk_level==='中危',low-level:scope.row.risk_level==='低危'}"></i> -->
  </template>
    </el-table-column>
    <el-table-column prop="last_attack_time" label="最近一次攻击时间">
    </el-table-column>
    <el-table-column label="攻击网站">
      <template scope="scope">
        <ul>
          <li v-for="item in scope.row.attack_site">
            {{item}}
          </li>
        </ul>
  </template>
    </el-table-column>
    <el-table-column prop="attack_nums" label="攻击次数">
    </el-table-column>
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
  </el-pagination>
</div>
</template>

<script>
import SourceGuardResource from '../../../resource/SourceGuardResource'
import MapChart from '../../../components/chart-model/MapChart'
import PiePercentChart from '../../../components/chart-model/PiePercentChart'
export default {
  components: {
    MapChart,
    PiePercentChart
  },
  data() {
    return {
      maxNative: 0,
      maxWorld: 0,
      loading: false,
      attackIpKey: '',
      circleChina: [],
      circleWorld: [],
      mapData: [],
      worldData: [],
      attackData: [],
      pageData: [],
      unFormatData: [],
      pageSize: 5,
      totalPage: 0,
      isCountry: true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage: 1
    }
  },
  mounted() {
      SourceGuardResource.wafAttackIpTopProvince().then(response => {
      const data = response.data.data
      console.log(data, 'dattattta')
      this.formatData(data, this.circleChina)
      data.forEach(item => {
        this.maxNative = Math.max(this.maxNative, Number(item.count))
        this.mapData.push({
          name: item.country,
          value: item.count
        })
      })
    }).catch(error => {
      if (parseInt(error.code, 0) === 120001)
        this.$router.push('/menaceAnalyze/NormalAttack')
    })
    SourceGuardResource.getwafAttackIpTopCountry().then(response => {
      const data = response.data.data
      this.formatData(data, this.circleWorld)
      data.forEach(item => {
        this.maxWorld = Math.max(this.maxWorld, Number(item.count))
        this.worldData.push({
          name: item.country,
          value: item.count
        })
      })
    })
    this.getwafAttackIpListPage()
  },
  methods: {
    searchIp() {
      console.log(this.attackIpKey, '----')
      this.getwafAttackIpListPage(1, 5, this.attackIpKey)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      const current = this.currentPage - 1
      this.pageSize = val
      this.pageDataTotal = this.groupSplit(this.unFormatData, this.pageSize)
      this.attackData = this.pageDataTotal[current]
    },
    handleCurrentChange(val) {
      this.currentPage = val
      const current = this.currentPage - 1
      this.attackData = this.pageDataTotal[current]
    },
    mapShow(value) {
      this.isCountry = value
    },
    groupSplit(array, subGroupLength) {
      let index = 0
      const newArray = []

      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength))
      }
      console.log(newArray, 'neww')

      return newArray
    },
    formatData(data, dataPush) {
      console.log(data, '----data0000')
      for (const [i, item] of new Map(data.map((item, i) => [i, item]))) {
        console.log(i, item, 'i  item')
        if (i <= 4) {
          const other = 100 - parseInt(item.percent, 0)
          dataPush.push({
            name: item.country,
            realData: [{
              name: item.percent + '%',
              value: item.percent,
              count: item.count
            }, {
              name: '',
              value: other
            }]
          })
        }
      }
    },
    getwafAttackIpListPage(currentPage, size, keyword) {
      const pageCurrent = currentPage || 1
      const perSize = size || 5
      const params = {
        page: pageCurrent,
        per_page: perSize
      }
      this.loading = true
      if (keyword)
        params.remote_addr = keyword
      SourceGuardResource.getwafAttackIpList(params).then(response => {
        this.loading = false
        const data = response.data.data
        this.unFormatData = data.list
        this.pageDataTotal = this.groupSplit(data.list, this.pageSize)
        this.totalPage = data.total
        this.attackData = this.pageDataTotal[0]
      })
    }
  }
}
</script>

<style lang="css" scoped>
i {
  font-style: normal;
}

h3 {
  font-weight: 100;
  margin: 15px 0 10px;
}

a {
  color: #333;
}

a:link {
  text-decoration: none;
  /* 指正常的未被访问过的链接*/
}

a:visited {
  text-decoration: none;
  /*指已经访问过的链接*/
}

a:hover {
  text-decoration: none;
  color: #333;
  /*指鼠标在链接*/
}

a:active {
  text-decoration: none;
  /* 指正在点的链接*/
}

.map-size {
  width: 100%;
  /*height: 400px;*/
  background: #fff;
  border: 1px solid #D6D6D6;
  padding: 10px;
  box-sizing: border-box;
}

.map-size div {
  display: inline-block;
  vertical-align: top;
  height: 400px;
}

.circle-container {
  display: inline-block;
  width: 43%;
  li {
    float: left;
    width: 20%;
    height: 130px;
  }
}

.circle-container .circle-title {
  display: block;
  float: none;
  width: 100%;
  height: auto;
  font-size: 16px;
  margin-bottom: 10px;
}

.switch-button {
  li {
    padding: 5px 30px;
    font-size: 14px;
    background: #fff;
    border: 1px solid #D6D6D6;
    border-bottom: none;
    display: inline-block;
    cursor: pointer;
  }
  li+li {
    margin-left: -4px;
    border-left: none;
  }
  .active {
    border: 1px solid var(--primary-blue);
    border-bottom: none;
    background: #EEF6FC;
  }
}

.search-box {
  float: right;
  margin-top: 10px;
  /*width: 42%;*/
  ul {
    li {
      display: inline-block;
    }
  }
}

.table-box {
  margin: 10px 0;
}

.table-title {
  display: inline-block;
  font-weight: 100;
}

.yun-table-icon {
  width: 20px;
  height: 20px;
  margin-left: 14px;
}

</style><style>@media screen and (min-width:1199px) and (max-width:1501px) {
  html,
  .el-table,
  .el-radio__label,
  .el-switch__label,
  .el-switch__label * {
    font-size: 12px;
  }
  .map-size .circle-container {
    width: 25%;
  }
  .map-size .circle-container li {
    width: 50%;
  }
}
</style>
