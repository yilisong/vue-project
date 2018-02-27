<template lang="html">
<div class="">
  <el-dialog :title="info" :visible.sync="dialogVisible" size="small" :before-close="handleClose" @open="getDetails">
    <MultipleLineChart :xData="detailXaxisData" :yData="detailYaxisData" title="扫描详情" :unit="detailUnit" :legendData="detailLegendData"/>
  </el-dialog>
</div>
</template>

<script>
import SourceGuardResource from '../../resource/SourceGuardResource'
import MultipleLineChart from '../chart-model/MultipleLineChart'
export default {
  components: {
    MultipleLineChart
  },
  props: {
    boxVisible: {
      type: Object
    },
    params: {
      type: Object
    },
    ip: {
      type: String
    }
  },
  computed: {
    info() {
      return '扫描事件详情 - ' + this.ip
    },
    dialogVisible: {
      get() {
        return this.boxVisible.show
      },
      set(newValue) {
        this.boxVisible.show = newValue
      }
    }
  },
  data() {
    return {
      detailLegendData:[],
      detailYaxisData:[],
      detailXaxisData:[],
      detailUnit:''
    }
  },
  methods: {
    getDetails() {
      SourceGuardResource.getWafScanDetails(this.params).then(response => {
        this.detailLegendData = []
        this.detailYaxisData = []
        this.detailXaxisData = []
        const data = response.data.data
        delete data.from_cache
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
    handleClose(done) {
      this.boxVisible.show = false
    }
  }
}
</script>

<style lang="css" scoped>
.info-show {
  word-break: break-all;
}
</style>
