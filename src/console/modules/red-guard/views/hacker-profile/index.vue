<template lang="html">
<div class="">
  <div class="">
    <div class="hacker-size">
      <BarChart :xData="barXaxisData" :yData="barYaxisData" title="攻击手法" :unit="barUnit" />
    </div>
    <div class="hacker-size position-right">
      <PieChart :xData="pieXaxisData" :yData="pieYaxisData" title="近30天攻击类型Top10" :unit="pieUnit" />
    </div>
  </div>
  <!-- <div class="line-chart">
    <LinkChart />
  </div> -->
  <div class="line-chart">
    <LineGridChart />
  </div>
</div>
</template>

<script>
import SourceGuardResource from '../../resource/SourceGuardResource'
import BarChart from '../../components/chart-model/BarChart'
import PieChart from '../../components/chart-model/PieChart'
import LineGridChart from '../../components/chart-model/LineGridChart'
import LinkChart from '../../components/chart-model/LinkChart'
export default {
  data() {
    return {
      barXaxisData: [],
      barYaxisData: [],
      pieXaxisData: [],
      pieYaxisData: [],
      barUnit: '',
      pieUnit: ''
    }
  },
  mounted() {
    console.log(this.$route.query.ip, 'iiippp')
    SourceGuardResource.getwafAttackTactics({
        remote_addr: this.$route.query.ip
      })
      .then(response => {
        const data = response.data.data.trend
        this.barUnit = data.y_data.unit
        this.barXaxisData = data.x_data
        this.barYaxisData = data.y_data.data
      })
    SourceGuardResource.getwafHackerAttackName({
      remote_addr: this.$route.query.ip
    }).then(response => {
      const data = response.data.data.top_waf_attack_name
      this.pieUnit = data[0].unit
      data.forEach(item => {
        this.pieXaxisData.push(item.attack_name)
        this.pieYaxisData.push({
          value: item.format_count,
          name: item.attack_name
        })
      })
    })
  },
  components: {
    BarChart,
    PieChart,
    LineGridChart,
    LinkChart
  }
}
</script>

<style lang="css" scoped>
.hacker-size {
  width: 49.5%;
  height: 365px;
  display: inline-block;
  background: #fff;
  border: 1px solid #D6D6D6;
  padding: 5px;
  box-sizing: border-box;
}

.line-chart {
  height: 682px;
  background: #fff;
  border: 1px solid #D6D6D6;
  padding: 10px;
}

.position-right {
  float: right;
}
</style>
