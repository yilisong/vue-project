<template lang="html">
<div class="">
  <div class="funnel-box">
    <!-- <FunnelChart :chartWidth=600 /> -->
    <h3>近30天共遭受{{hackerAttack.distinct_sum_remote_addr.data}}{{hackerAttack.distinct_sum_remote_addr.unit}}高级黑客{{hackerAttack.sum_times.data}}{{hackerAttack.sum_times.unit}}攻击</h3>
    <ul class="funnel-container">
      <li class="first-funnerl-data">{{hackerAttack.total_times.data}}{{hackerAttack.total_times.unit}}</li>
      <li class="second-funnerl-data">{{hackerAttack.sum_times.data}}{{hackerAttack.sum_times.unit}}</li>
      <li class="third-funnerl-data">{{hackerAttack.distinct_sum_remote_addr.data}}{{hackerAttack.distinct_sum_remote_addr.unit}}</li>
    </ul>
    <ul class="color-legend">
      <li class="first">普通攻击次数</li>
      <li class="second">高级攻击次数</li>
      <li class="third">高级黑客总数</li>
    </ul>
  </div>
  <div class="list-display-container">
    <h3>近7天发现WebShell列表</h3>
    <ul>
      <li class="list-title"><span>WebShell</span><span>发现时间</span><span>最近一次访问时间</span></li>
      <!-- <li v-for="(item,index) in webShellList" v-if="index<4">
        <span><a href="#">{{item.url}}</a></span><span>{{item.time}}</span><span>{{item.visitTime}}</span>
      </li> -->
      <li class="empty-data">
        <span>暂无数据</span>
      </li>
    </ul>
    <div class="" v-if="webShellList.length>9">
      <a href="/console/red-guard#/menaceAnalyze">更多</a>
    </div>
  </div>
  <div class="table-box">
    <h3 class="table-title">定向攻击分析</h3>
    <div class="search-box">
      <ul>
        <li>
          <el-input placeholder="攻击IP" icon="search" v-model="attackIpKey" @click="searchIp" @keyup.enter.native="searchIp">
          </el-input>
        </li>
      </ul>
    </div>
  </div>
  <div class="table-box">
    <el-table :data="APTData" style="width: 100%" v-loading="loading">
      <el-table-column prop="remote_addr" label="攻击IP" width="230">
        <template scope="scope">
          <router-link :to="{ path: '/menaceAnalyze/hackerProfile', query: { ip:scope.row.remote_addr}}" append><p style="color: #2d90e6;">{{scope.row.remote_addr}}  ({{scope.row.country}}{{scope.row.province}})</p></router-link>
    </template>
      </el-table-column>
      <el-table-column prop="top_http_host" label="攻击网站" width="180">
      </el-table-column>
      <el-table-column label="首次访问时间/访问URL">
        <template scope="scope">
      <p>{{scope.row.first_time}}</p>
      <p>{{scope.row.first_url}}</p>
    </template>
      </el-table-column>
      <el-table-column label="最近一次访问时间/访问URL">
        <template scope="scope">
      <p>{{scope.row.last_time}}</p>
      <p>{{scope.row.last_url}}</p>
    </template>
      </el-table-column>
      <el-table-column label="攻击手法">
        <template scope="scope">
      <ul>
        <li v-for="item in scope.row.top_attacks_class">{{item}}</li>
      </ul>
    </template>
      </el-table-column>
      <el-table-column label="攻击链路">
        <template scope="scope">
            <span class="detail-show" @click="boxShow(scope.row)">查看</span>
    </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
  </div>
  <AttackLine :boxVisible="dialogVisible" :ip="attackIp" :params="linkParams" :firstData="firstData" />
</div>
</template>

<script>
import FunnelChart from '../../../components/chart-model/FunnelChart'
import SourceGuardResource from '../../../resource/SourceGuardResource'
import AttackLine from '../../../components/common-components/AttackLine'
export default {
  components: {
    FunnelChart,
    AttackLine
  },
  data() {
    return {
      hackerAttack: {
        distinct_sum_remote_addr: {
          data: 0,
          unit: ''
        },
        sum_times: {
          data: 0,
          unit: ''
        },
        total_times: {
          data: 0,
          unit: ''
        }
      },
      attackIpKey: '',
      dialogVisible: {
        show: false
      },
      firstData: {},
      linkParams: {},
      attackIp: '',
      loading: false,
      APTData: [],
      totalCount: 0,
      pageSize: 0,
      currentPage: 0,
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
      currentPage4: 4
    }
  },
  mounted() {
    this.getwafAPTIpListPage()
    SourceGuardResource.getWafAttackSeniorTimes().then(response => {
      const data = response.data.data
      delete data.from_cache
      for (const i in data) {
        this.hackerAttack[i] = data[i]
      }
    }).catch(error => {
      if (parseInt(error.code, 0) === 120001)
        this.$router.push('/menaceAnalyze/NormalAttack')
    })
    SourceGuardResource.getwafAttackOrdinaryTimes().then(response => {
      const data = response.data.data
      delete data.from_cache
      for (const i in data) {
        this.hackerAttack[i] = data[i]
      }
    })
  },
  methods: {
    searchIp() {
      this.getwafAPTIpListPage(this.currentPage, this.pageSize, this.attackIpKey)
    },
    boxShow(data) {
      console.log(data, 'data')
      this.firstData.first_url = data.first_url
      this.firstData.first_time = data.first_time
      this.dialogVisible.show = true
      this.attackIp = data.remote_addr
      this.linkParams = {
        // start_time: data.first_time,
        // end_time: data.last_time,
        remote_addr: data.remote_addr
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getwafAPTIpListPage(this.currentPage, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getwafAPTIpListPage(this.currentPage, this.pageSize)
    },
    getwafAPTIpListPage(currentPage, size, keyword) {
      const pageCurrent = currentPage || 1
      const perSize = size || 5
      const params = {
        page: pageCurrent,
        per_page: perSize
      }
      if (keyword)
        params.remote_addr = keyword
      this.loading = true
      SourceGuardResource.getwafAPTIpList(params).then(response => {
        this.loading = false
        this.APTData = response.data.data.list
        this.totalCount = response.data.data.total
      })
    }
  }
}
</script>

<style lang="css" scoped>
a {
  color: #1f2d3d;
}

h3 {
  font-weight: 100;
  margin: 10px 0 5px;
}

.funnel-box {
  width: 34%;
  padding: 10px;
  box-sizing: border-box;
  height: 300px;
  display: inline-block;
  background: #fff;
  border: 1px solid #D6D6D6;
  text-align: right;
  position: relative;
}

.list-display-container {
  display: inline-block;
  vertical-align: top;
  padding: 10px;
  background: #fff;
  width: 65%;
  margin-left: 5px;
  height: 300px;
  box-sizing: border-box;
  border: 1px solid #D6D6D6;
  h3 {
    font-weight: 100;
    padding-bottom: 10px;
    margin: 0;
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
      width: 31%;
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

.list-display-container .empty-data {
  text-align: center;
  margin-top: 50px;
  border-bottom: none;
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

.funnel-container {
  position: relative;
  display: inline-block;
  background: url('../../../assets/images/tri_color.svg')center center no-repeat;
  width: 87%;
  height: 80%;
  margin-top: 10px;
  margin-right: 5px;
  li {
    display: inline-block;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    color: #fff;
    margin: 0 auto;
  }
}

.first-funnerl-data {
  top: 12%;
}

.second-funnerl-data {
  top: 44%;
}

.third-funnerl-data {
  top: 70%;
}

.funnel-box h3 {
  text-align: left;
  margin: 0;
}

.color-legend {
  position: absolute;
  bottom: 15px;
  font-size: 12px;
}

.color-legend li::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  margin-right: 4px;
}

.color-legend .first::before {
  background: #79d9e7;
}

.color-legend .second::before {
  background: #334d63;
}

.color-legend .third::before {
  background: #f92c2d;
}

</style><style>@media screen and (min-width:1199px) and (max-width:1501px) {
  .content-bg .funnel-box {
    width: 45%;
  }
  .content-bg .list-display-container {
    width: 54%;
  }
}
</style>
