<template lang="html">
<console-page-layout title="下载日志">
  <div class="log_list_title">
    <el-select v-model="domainValue" placeholder="请选择">
      <el-option v-for="(item, index) in shownameValue" :key="index" :label="item.domain" :value="item.domain"></el-option>
    </el-select>
    <span class="wrapper">
      <i-button type="">今天</i-button>
      <i-button type="">昨天</i-button>
      <i-button type="">7天</i-button>
      <i-button type="">本月</i-button>
      <i-button type="">近六月</i-button>
    </span>
  </div>
  <div>
    <el-table :data="logList" fit stripe highlight-current-row style="width: 100%"  @selection-change="handleTableSelectionChange" v-loading="logListLoading" element-loading-text="拼命加载中">
      <el-table-column align="center" prop="end_time" label="日期"></el-table-column>
      <el-table-column prop="packgaeSize" label="文件大小"></el-table-column>
      <el-table-column label="下载方式">
          <template scope="scope">
            <div class="operation">
            使用<i-button type="text" size="small" @click="handleWebsiteOperate('console', scope.row)">迅雷下载</i-button>
              <i-button type="text" size="small" @click="handleWebsiteOperate('check', scope.row)">本地下载</i-button>
            </div>
          </template>
        </el-table-column>
    </el-table>
    <!-- 翻页 -->
    <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handlePaginationSizeChange" @current-change="handlePaginationCurrentPageChange" :page-sizes="paginationParam.pageSizes" :page-size="paginationParam.pageSize" :total="paginationParam.totalCount"
        :current-page="paginationParam.currentPage">
    </el-pagination>
  </div>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'

  export default {
    components: {
      ConsolePageLayout
    },
    data() {
      return {
        domainValue: '',
        shownameValue: '',
      	logList: [{
          end_time: '选项1',
          packgaeSize: '1TB',
          load_address: '使用    迅雷下载 | 本地下载'
        }, {
          end_time: '选项1',
          packgaeSize: '128MB',
          load_address: '使用    迅雷下载 | 本地下载'
        }, {
          end_time: '选项1',
          packgaeSize: '124GB',
          load_address: '使用    迅雷下载 | 本地下载'
        }],
        options: [],
	      paginationParam: {
	        pageSizes: [10, 30, 50],
	        pageSize: 10,
	        totalCount: 0,
	        currentPage: 0
      	},
        logListLoading: false
      }
    },
    created() {
      const params = {}
      this.fetchGet('Web.Domain.list' , params).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data) {
              this.shownameValue = res.data.list
            }
          })
        }
      }, e => {})
    },
    watch: {

    },
    methods: {
      handleButtonLogAdd() {
        this.logAddDialog.editForm = {}
        this.logAddDialog.visible = true
      },
      handleDropdownBatchOperation(command, item) {

      },
      handleSearch() {

      },
      handleTableSelectionChange(selection) {

      },
      handlePaginationSizeChange(size) {
        this.paginationParam.pageSize = size
        this.fetchLogList(true)
      },
      handlePaginationCurrentPageChange(currentPage) {
        this.paginationParam.currentPage = currentPage
        this.fetchLogList()
      },
      fetchLogList(resetPage = false) {
        this.paginationParam.currentPage = resetPage ? 1 : this.paginationParam.currentPage
        const params = {
          offset: this.paginationParam.currentPage,
          limit: this.paginationParam.pageSize,
          order: ''
        }
        this.fetchGet('', params).then(result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && (res.status.code === 1) && res.data) {
                console.log(res)
                this.logList = res.data
                this.paginationParam.totalCount = Number(res.data.total)
              }
            })
          }
        }, e => {})
      }
    }
  }
</script>

<style lang="css" scoped>
.log_list_title {
  float: right;
}

.active {
  background: #20a0ff;
  color: #fff;
  border-color: #20a0ff;
}
</style>
