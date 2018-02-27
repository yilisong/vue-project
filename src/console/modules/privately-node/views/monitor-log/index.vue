<template  lang="html">
<console-page-layout title="监控日志">
  <ComboTable :total="logListTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getlogList" @on-current-change="getlogList">
    <div slot="body">
      <el-table :data="logList" style="width: 100%">
        <el-table-column label="节点IP(归属地)" width="140" align="left">
          <template scope="scope">
            <span>{{scope.row.ip}}（{{scope.row.area}}）</span>
          </template>
        </el-table-column>
        <el-table-column prop="errorTime" label="故障时间"></el-table-column>
        <el-table-column prop="successTime" label="恢复时间" align="left"></el-table-column>
        <el-table-column prop="long" label="持续时间" align="left"></el-table-column>
        <el-table-column prop="package" label="影响服务" align="left"></el-table-column>
      </el-table>
    </div>
  </ComboTable>
</console-page-layout>
</template>
<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'

export default {
  components: {
    ConsolePageLayout,
    ComboTable
  },
  data() {
    return {
      logListTotal: 2,
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      logList:[{
        ip: '1.1.1.1',
        area: '中国',
        errorTime: '2017-11-16 13:15:55',
        successTime: '2017-11-16 13:16:11',
        long: '22',
        package: '太极抗d☯️'
      },{
        ip: '1.1.1.1',
        area: '中国',
        errorTime: '2017-11-16 13:15:55',
        successTime: '2017-11-16 13:16:11',
        long: '22',
        package: '太极抗d☯️'
      },{
        ip: '1.1.1.1',
        area: '中国',
        errorTime: '2017-11-16 13:15:55',
        successTime: '2017-11-16 13:16:11',
        long: '22',
        package: '太极抗d☯️'
      }]
    }
  },
  created() {},
  methods: {
    getlogList() {
      console.log(22)
    }
  }
}
</script>
<style scoped>

</style>
