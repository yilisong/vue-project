<template lang="html">
<console-page-layout title="节点列表">
  <div class="function_button">
    <button type="primary" @click="openBatchSendDialog">批量推送</button>
  </div>
  <ComboTable :total="pointTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getPonitList" @on-current-change="getPonitList">
    <div slot="body">
      <i-table ref="multipleTable" :data="pointList" border tooltip-effect="dark" style="width: 100%"></i-table>
    </div>
  </ComboTable>
  <send></send>
  <Batchsend></Batchsend>
</console-page-layout>
</template>


<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import Send from './dialogs/send'
import Batchsend from './dialogs/batchsend'
import { mapActions } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    Send,
    Batchsend
  },
  data() {
    return {
      pointTotal: 2,
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      pointList:[{
        id: '22',
        ip: '1.1.1.1',
        area: '中国',
        cpu: '8核',
        memory: '64G',
        broadband: '1G',
        status: '1',
        long: '22',
        packageName: '太极抗d',
        package: '0x007',
        websiteList: ['www.baidu.com','www.yundun.com']
      },{
        id: '25',
        ip: '1.1.1.1',
        area: '中国',
        cpu: '8核',
        memory: '64G',
        broadband: '1G',
        status: '2',
        long: '22',
        package: '太极抗d'
      },{
        id: '212',
        ip: '1.1.1.1',
        area: '中国',
        cpu: '8核',
        memory: '64G',
        broadband: '1G',
        status: '1',
        long: '22',
        package: '太极抗d'
      }]
    }
  },
  created() {},
  computed: {},
  watch: {},
  methods: {
    ...mapActions([
      'triggerSendSetVisible',
      'triggerBatchSendSetVisible'
    ]),
    getPonitList() {
      console.log(111)
    },
    openBatchSendDialog() {
      this.triggerBatchSendSetVisible(true)
    },
    openSendDialog(id) {
      console.log(id)
      this.triggerSendSetVisible(true)
    }
  }
}
</script>
<style scoped>
  .function_button {
    margin: 20px 0; 
  }
</style>
